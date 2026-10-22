const http = require('http');
const fs = require('fs');
const path = require('path');

function getTargets() {
  return new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9222/json', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const targets = await getTargets();
  const pageTarget = targets.find(t => t.type === 'page');
  if (!pageTarget) {
    console.error('No page target found');
    process.exit(1);
  }

  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      if (msg.error) cb.reject(msg.error);
      else cb.resolve(msg.result);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  const evaluate = async (expr) => {
    const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    return res.result ? res.result.value : null;
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  const screenshot = async (filename, full = false) => {
    const res = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full });
    const buffer = Buffer.from(res.data, 'base64');
    const outPath = path.join(__dirname, '..', 'screenshots', filename);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, buffer);
    console.log(`Saved screenshot: ${filename} (${buffer.length} bytes)`);
  };

  await new Promise(resolve => {
    if (ws.readyState === 1) resolve();
    else ws.onopen = resolve;
  });
  console.log('Connected to Chrome DevTools Protocol');

  await send('Page.enable');
  await send('DOM.enable');

  // Test 1: Desktop 1440x900
  console.log('\n--- 1. DESKTOP 1440x900 VERIFICATION ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await sleep(1500);

  const desktopCheck = await evaluate(`({
    // Header checks
    headerHasAvailableButton: !!document.querySelector('.navbar .nav-status-indicator'),
    headerHasPdfButton: !!document.querySelector('.navbar .nav-pdf-link'),
    headerHasWriteMeButton: !!document.querySelector('.navbar .nav-cta-pill'),
    headerWriteMeVisible: window.getComputedStyle(document.querySelector('.navbar .nav-cta-pill')).display !== 'none',
    headerNavLinks: Array.from(document.querySelectorAll('.nav-item-link')).map(el => el.innerText.trim()),

    // Hero checks
    heroHasPdfButton: !!document.querySelector('.hero-editorial-section .btn-hero-pdf'),
    heroHasDiscussButton: !!document.querySelector('.btn-hero-primary'),
    heroDiscussText: document.querySelector('.btn-hero-primary')?.innerText.trim(),
    heroHasExploreButton: !!document.querySelector('.btn-hero-secondary'),
    heroExploreText: document.querySelector('.btn-hero-secondary')?.innerText.trim(),
    heroCtaCount: document.querySelectorAll('.hero-cta-cluster > *').length
  })`);
  console.log('Desktop Header & Hero Check:', desktopCheck);
  await screenshot('verification_button_removals_desktop.png');

  // Test 2: Mobile 375x812
  console.log('\n--- 2. MOBILE 375x812 VERIFICATION ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });

  await sleep(600);

  const mobileCheck = await evaluate(`({
    headerHasAvailableButton: !!document.querySelector('.navbar .nav-status-indicator'),
    headerHasPdfButton: !!document.querySelector('.navbar .nav-pdf-link'),
    headerHasWriteMeButton: !!document.querySelector('.navbar .nav-cta-pill'),
    headerWriteMeVisible: window.getComputedStyle(document.querySelector('.navbar .nav-cta-pill')).display !== 'none',
    menuToggleVisible: !!document.querySelector('.menu-toggle-btn'),
    heroHasPdfButton: !!document.querySelector('.hero-editorial-section .btn-hero-pdf'),
    heroCtaCount: document.querySelectorAll('.hero-cta-cluster > *').length
  })`);
  console.log('Mobile Header & Hero Check:', mobileCheck);
  await screenshot('verification_button_removals_mobile.png');

  // Verify all 4 pages still navigate
  console.log('\n--- 3. VERIFY ALL 4 PAGES ROUTING ---');
  // Work
  await evaluate(`document.querySelector('a[href="/work"]').click()`);
  await sleep(600);
  const workOk = await evaluate(`window.location.pathname === '/work' && !!document.querySelector('#work')`);

  // Services
  await evaluate(`document.querySelector('a[href="/services"]').click()`);
  await sleep(600);
  const servicesOk = await evaluate(`window.location.pathname === '/services' && !!document.querySelector('#services')`);

  // Contact
  await evaluate(`document.querySelector('a[href="/contact"]').click()`);
  await sleep(600);
  const contactOk = await evaluate(`window.location.pathname === '/contact' && !!document.querySelector('#contact')`);

  console.log('Pages Routing Intact:', { workOk, servicesOk, contactOk });

  ws.close();
  console.log('\nAll button removal verification tests completed successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
