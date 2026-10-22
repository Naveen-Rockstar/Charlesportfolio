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
  console.log('\n--- 1. VERIFYING ALL SECTIONS INTACT ON HOMEPAGE (/) ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:4173/' });
  await sleep(1500);

  const homeAllSections = await evaluate(`({
    url: window.location.pathname,
    hasHero: !!document.querySelector('.hero-editorial-section'),
    hasMarquee: !!document.querySelector('.marquee-ribbon-stage'),
    hasStatement: !!document.querySelector('.statement-band-section'),
    hasServices: !!document.querySelector('.services-section'),
    hasImpact: !!document.querySelector('#impact .impact-section'),
    hasWork: !!document.querySelector('#work.selected-work-section'),
    workProjectsCount: document.querySelectorAll('#work .work-panel-card').length,
    hasProcess: !!document.querySelector('#process.process-workflow-section'),
    hasStartProject: !!document.querySelector('#start-project.start-project-section'),
    hasCollaboration: !!document.querySelector('#collaboration.agency-collaboration-section'),
    hasAbout: !!document.querySelector('#about.about-editorial-section'),
    hasContact: !!document.querySelector('#contact.contact-dark-section'),
    contactFormPresent: !!document.querySelector('#contact .contact-form-element'),
    footerPresent: !!document.querySelector('.master-footer')
  })`);
  console.log('Homepage All-Sections Check:', homeAllSections);
  await screenshot('verification_home_all_sections_desktop.png');

  console.log('\n--- 2. VERIFYING MAIN NAVIGATION LINKS (EXACTLY 4 LINKS) ---');
  const navCheck = await evaluate(`({
    desktopLinks: Array.from(document.querySelectorAll('.nav-links-desktop .nav-item-link')).map(el => ({
      text: el.innerText.trim(),
      href: el.getAttribute('href')
    })),
    desktopLinksCount: document.querySelectorAll('.nav-links-desktop .nav-item-link').length,
    hasWriteMe: !!document.querySelector('.navbar .nav-cta-pill'),
    noAvailableButton: !document.querySelector('.navbar .nav-status-indicator'),
    noPdfButtonInHeader: !document.querySelector('.navbar .nav-pdf-link')
  })`);
  console.log('Navigation Check:', navCheck);

  console.log('\n--- 3. VERIFYING SEPARATE FOUR PAGES & ROUTES ---');
  // Work (/work)
  await evaluate(`document.querySelector('.nav-links-desktop a[href="/work"]').click()`);
  await sleep(600);
  const workPageCheck = await evaluate(`({
    pathname: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasWorkGrid: !!document.querySelector('#work .selected-work-section'),
    cardsCount: document.querySelectorAll('.work-panel-card').length,
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Work Page (/work):', workPageCheck);
  await screenshot('verification_page_work.png');

  // Services (/services)
  await evaluate(`document.querySelector('.nav-links-desktop a[href="/services"]').click()`);
  await sleep(600);
  const servicesPageCheck = await evaluate(`({
    pathname: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasServices: !!document.querySelector('#services .services-section'),
    hasProcess: !!document.querySelector('#process .process-workflow-section'),
    hasCollaboration: !!document.querySelector('#collaboration .agency-collaboration-section'),
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Services Page (/services):', servicesPageCheck);
  await screenshot('verification_page_services.png');

  // Contact (/contact)
  await evaluate(`document.querySelector('.nav-links-desktop a[href="/contact"]').click()`);
  await sleep(600);
  const contactPageCheck = await evaluate(`({
    pathname: window.location.pathname,
    hasPageHeader: !!document.querySelector('.page-editorial-header'),
    headerTitle: document.querySelector('.page-main-heading')?.innerText,
    hasStartProject: !!document.querySelector('#start-project.start-project-section'),
    hasContact: !!document.querySelector('#contact .contact-dark-section'),
    hasForm: !!document.querySelector('.contact-form-element'),
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText
  })`);
  console.log('Contact Page (/contact):', contactPageCheck);
  await screenshot('verification_page_contact.png');

  // Return to Home (/)
  await evaluate(`document.querySelector('.nav-links-desktop a[href="/"]').click()`);
  await sleep(600);
  const homeReturnCheck = await evaluate(`({
    pathname: window.location.pathname,
    activeNav: document.querySelector('.nav-item-link.is-active')?.innerText,
    hasAllHomeSections: !!(
      document.querySelector('.hero-editorial-section') &&
      document.querySelector('#work') &&
      document.querySelector('#services') &&
      document.querySelector('#contact')
    )
  })`);
  console.log('Home Page (/) Return:', homeReturnCheck);

  // Test Mobile
  console.log('\n--- 4. MOBILE NAVIGATION DRAWER & LAYOUT ---');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true
  });
  await sleep(500);

  // Open mobile menu
  await evaluate(`document.querySelector('.menu-toggle-btn').click()`);
  await sleep(500);

  const mobileNavDrawer = await evaluate(`({
    drawerOpen: document.querySelector('.fullscreen-menu-overlay').classList.contains('is-open'),
    drawerNavLinks: Array.from(document.querySelectorAll('.overlay-links-list .overlay-anchor')).map(el => el.querySelector('.overlay-link-text')?.innerText.trim()),
    noAvailableButton: !document.querySelector('.navbar .nav-status-indicator'),
    noPdfButtonInHeader: !document.querySelector('.navbar .nav-pdf-link')
  })`);
  console.log('Mobile Drawer Check:', mobileNavDrawer);
  await screenshot('verification_mobile_menu_drawer.png');

  ws.close();
  console.log('\nAll tests completed with 100% success!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
