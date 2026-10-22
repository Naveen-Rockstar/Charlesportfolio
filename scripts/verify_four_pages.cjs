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

  // Test Desktop 1440x900
  console.log('\n--- 1. TESTING DESKTOP 1440x900 ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // PAGE 1: Home Page
  console.log('\nNavigating to Home Page (/)');
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await sleep(1500);

  const homeCheck = await evaluate(`({
    title: document.title,
    hasHero: !!document.querySelector('.hero-editorial-section'),
    hasSplitStage: !!document.querySelector('.hero-split-stage'),
    hasMarquee: !!document.querySelector('.marquee-ribbon-stage'),
    hasStatement: !!document.querySelector('.statement-band-section'),
    hasImpact: !!document.querySelector('#impact'),
    hasAbout: !!document.querySelector('#about'),
    heroHeading: document.querySelector('.hero-giant-heading')?.innerText,
    hasDevBadge: !!document.querySelector('.circular-dev-badge'),
    hasPreviewCard: !!document.querySelector('.hero-preview-card'),
    hasBexleyHeroImg: !!document.querySelector('.hero-editorial-section img[src*="bexley"]'),
    ctaCount: document.querySelectorAll('.hero-cta-cluster a, .hero-cta-cluster button').length,
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Home Page Check:', homeCheck);
  await screenshot('four_pages_01_home_desktop.png');

  // PAGE 2: Selected Work
  console.log('\nNavigating to Selected Work (/work)');
  await evaluate(`document.querySelector('a[href="/work"]').click()`);
  await sleep(1000);

  const workCheck = await evaluate(`({
    url: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasProjectGrid: !!document.querySelector('.selected-work-section'),
    projectCardsCount: document.querySelectorAll('.work-panel-card').length,
    hasBexleyCard: !!document.querySelector('img[src*="bexley"]'),
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Work Page Check:', workCheck);
  await screenshot('four_pages_02_work_desktop.png');

  // PAGE 3: Services & Process
  console.log('\nNavigating to Services (/services)');
  await evaluate(`document.querySelector('a[href="/services"]').click()`);
  await sleep(1000);

  const servicesCheck = await evaluate(`({
    url: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasServices: !!document.querySelector('#services'),
    hasProcess: !!document.querySelector('#process'),
    hasCollaboration: !!document.querySelector('#collaboration'),
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Services Page Check:', servicesCheck);
  await screenshot('four_pages_03_services_desktop.png');

  // PAGE 4: Contact & Start a Project
  console.log('\nNavigating to Contact (/contact)');
  await evaluate(`document.querySelector('a[href="/contact"]').click()`);
  await sleep(1000);

  const contactCheck = await evaluate(`({
    url: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasStartProject: !!document.querySelector('#start-project'),
    hasContact: !!document.querySelector('#contact'),
    hasForm: !!document.querySelector('.contact-form-element'),
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Contact Page Check:', contactCheck);
  await screenshot('four_pages_04_contact_desktop.png');

  // Test Mobile 375x812 (iPhone X/12)
  console.log('\n--- 2. TESTING MOBILE 375x812 & NAVBAR ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });

  // Navigate back to Home
  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await sleep(1200);

  // Check initial mobile navbar
  const mobileNavInitial = await evaluate(`({
    navbarPosition: window.getComputedStyle(document.querySelector('.navbar')).position,
    navbarVisible: !!document.querySelector('.navbar'),
    menuToggleVisible: !!document.querySelector('.menu-toggle-btn')
  })`);
  console.log('Mobile Navbar Initial:', mobileNavInitial);

  // Scroll down 600px
  await evaluate(`window.scrollTo(0, 600)`);
  await sleep(500);

  const mobileNavScrolled = await evaluate(`({
    scrollY: window.scrollY,
    navbarFixed: window.getComputedStyle(document.querySelector('.navbar')).position === 'fixed',
    navbarTop: document.querySelector('.navbar').getBoundingClientRect().top,
    navbarHeight: document.querySelector('.navbar').getBoundingClientRect().height
  })`);
  console.log('Mobile Navbar Scrolled:', mobileNavScrolled);
  await screenshot('four_pages_mobile_navbar_scrolled.png');

  // Open mobile menu
  await evaluate(`document.querySelector('.menu-toggle-btn').click()`);
  await sleep(600);

  const mobileMenuOpenCheck = await evaluate(`({
    isOpen: document.querySelector('.fullscreen-menu-overlay').classList.contains('is-open'),
    bodyOverflow: document.body.style.overflow,
    overlayLinksCount: document.querySelectorAll('.overlay-link-item').length
  })`);
  console.log('Mobile Menu Open Check:', mobileMenuOpenCheck);
  await screenshot('four_pages_mobile_menu_open.png');

  // Click Work from mobile overlay
  await evaluate(`document.querySelector('.overlay-anchor[href="/work"]').click()`);
  await sleep(1000);

  const mobileWorkCheck = await evaluate(`({
    url: window.location.pathname,
    menuClosed: !document.querySelector('.fullscreen-menu-overlay').classList.contains('is-open'),
    bodyOverflowRestored: document.body.style.overflow === '',
    hasWorkHeading: !!document.querySelector('.page-main-heading')
  })`);
  console.log('Mobile Work Navigation Check:', mobileWorkCheck);
  await screenshot('four_pages_mobile_work_page.png');

  ws.close();
  console.log('\nAll checks completed successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
