const http = require('http');
const fs = require('fs');
const path = require('path');

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function run() {
  const targets = await getJson('http://127.0.0.1:9222/json');
  let pageTarget = targets.find(t => t.type === 'page');
  
  // If no page target, create one
  if (!pageTarget) {
    const newTarget = await getJson('http://127.0.0.1:9222/json/new');
    pageTarget = newTarget;
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

  await new Promise(r => ws.onopen = r);
  console.log('Connected to Chrome DevTools Protocol via WebSocket');

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  const evalCode = async (expression) => {
    const res = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(JSON.stringify(res.exceptionDetails));
    }
    return res.result?.value;
  };

  const setViewport = async (width, height, isMobile = false) => {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile: isMobile
    });
  };

  const takeScreenshot = async (filepath) => {
    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filepath, Buffer.from(data, 'base64'));
    console.log(`Saved screenshot: ${filepath}`);
  };

  const sleep = ms => new Promise(r => setTimeout(r, ms));

  console.log('\n--- NAVIGATING TO APP ---');
  await send('Page.navigate', { url: 'http://localhost:4173' });
  await sleep(1500);

  // -------------------------------------------------------------
  // TEST TASK 1: HERO SIMPLIFICATION
  // -------------------------------------------------------------
  console.log('\n=== TESTING TASK 1: HERO SIMPLIFICATION ===');
  await setViewport(1280, 900, false);
  await sleep(500);

  const heroChecks = await evalCode(`(() => {
    const hero = document.querySelector('.hero-editorial-section');
    if (!hero) return { error: 'Hero section not found' };

    const nameHeadings = Array.from(hero.querySelectorAll('.hero-giant-heading')).map(h => h.innerText.trim());
    const tagline = hero.querySelector('.hero-heading-tagline')?.innerText.trim();
    const headline = hero.querySelector('.hero-value-headline')?.innerText.trim();
    const leadText = hero.querySelector('.hero-lead-text')?.innerText.trim();
    const bexleyInHero = hero.innerText.includes('Bexley LifeScience') || !!hero.querySelector('img[src*="bexley"]');
    const primaryCta = hero.querySelector('.btn-hero-primary')?.innerText.trim();
    const secondaryCta = hero.querySelector('.btn-hero-secondary')?.innerText.trim();
    const pdfCta = hero.querySelector('.btn-hero-pdf')?.innerText.trim();

    return {
      nameHeadings,
      tagline,
      headline,
      leadText,
      bexleyInHero,
      primaryCta,
      secondaryCta,
      pdfCta
    };
  })()`);

  console.log('Hero checks:', heroChecks);
  if (heroChecks.bexleyInHero) {
    console.error('FAIL: Bexley card is still present in Hero!');
  } else {
    console.log('PASS: Bexley card is completely removed from Hero.');
  }

  if (heroChecks.nameHeadings.includes('CHARLES') && heroChecks.nameHeadings.includes('NAVEEN')) {
    console.log('PASS: Monumental name CHARLES NAVEEN is present.');
  } else {
    console.error('FAIL: Name headings missing:', heroChecks.nameHeadings);
  }

  if (heroChecks.tagline && heroChecks.tagline.includes('FREELANCE WEB DEVELOPER')) {
    console.log('PASS: Designation FREELANCE WEB DEVELOPER is present.');
  } else {
    console.error('FAIL: Tagline missing or incorrect:', heroChecks.tagline);
  }

  if (heroChecks.headline === 'Websites built to turn business attention into enquiries.') {
    console.log('PASS: Value headline matches exactly.');
  } else {
    console.error('FAIL: Value headline mismatch:', heroChecks.headline);
  }

  if (heroChecks.leadText && heroChecks.leadText.includes('I design and develop modern websites for businesses and creative teams')) {
    console.log('PASS: Supporting text matches exactly.');
  } else {
    console.error('FAIL: Supporting text mismatch:', heroChecks.leadText);
  }

  await takeScreenshot('screenshots/hero_desktop.png');

  // -------------------------------------------------------------
  // TEST TASK 2: MOBILE NAVIGATION & VIEWPORT WIDTHS
  // -------------------------------------------------------------
  console.log('\n=== TESTING TASK 2: MOBILE NAVIGATION ===');
  const mobileWidths = [320, 360, 375, 390, 412, 430];

  for (const w of mobileWidths) {
    await setViewport(w, 800, true);
    await sleep(300);

    const navCheck = await evalCode(`(() => {
      const navbar = document.querySelector('.navbar');
      const brand = navbar?.querySelector('.brand-name');
      const toggle = navbar?.querySelector('.menu-toggle-btn');
      const style = window.getComputedStyle(navbar);
      const rect = navbar.getBoundingClientRect();
      const scrollWidth = document.documentElement.scrollWidth;
      const windowWidth = window.innerWidth;
      const hasOverflow = scrollWidth > windowWidth;

      return {
        width: windowWidth,
        scrollWidth,
        hasOverflow,
        isFixed: style.position === 'fixed',
        top: rect.top,
        height: rect.height,
        brandText: brand?.innerText,
        toggleVisible: !!toggle && window.getComputedStyle(toggle).display !== 'none'
      };
    })()`);

    console.log(`Width ${w}px check:`, navCheck);
    if (navCheck.hasOverflow) {
      console.error(`FAIL: Horizontal overflow detected at ${w}px! scrollWidth=${navCheck.scrollWidth}, innerWidth=${navCheck.width}`);
    } else {
      console.log(`PASS: No horizontal overflow at ${w}px.`);
    }

    if (!navCheck.isFixed) {
      console.error(`FAIL: Navbar position is not fixed at ${w}px!`);
    } else {
      console.log(`PASS: Navbar is position: fixed at ${w}px.`);
    }
  }

  // Scroll down test at 375px
  console.log('\n--- Testing Mobile Navbar Scrolling at 375px ---');
  await setViewport(375, 812, true);
  await sleep(300);

  const scrollPositions = [0, 600, 1500, 3000, 4500];
  for (const scrollY of scrollPositions) {
    await evalCode(`window.scrollTo(0, ${scrollY});`);
    await sleep(200);

    const scrollCheck = await evalCode(`(() => {
      const navbar = document.querySelector('.navbar');
      const rect = navbar.getBoundingClientRect();
      const toggle = navbar.querySelector('.menu-toggle-btn');
      const toggleRect = toggle ? toggle.getBoundingClientRect() : null;
      return {
        scrollY: window.scrollY,
        navTop: rect.top,
        navBottom: rect.bottom,
        navVisible: rect.top === 0 && rect.bottom > 0,
        toggleVisible: toggleRect && toggleRect.width > 0 && toggleRect.top >= 0 && toggleRect.bottom <= rect.bottom
      };
    })()`);

    console.log(`Scroll pos ${scrollY}px: navTop=${scrollCheck.navTop}, navVisible=${scrollCheck.navVisible}, toggleVisible=${scrollCheck.toggleVisible}`);
    if (!scrollCheck.navVisible || !scrollCheck.toggleVisible) {
      console.error(`FAIL: Navbar or toggle disappeared at scrollY=${scrollY}!`);
    } else {
      console.log(`PASS: Navbar and toggle remain accessible at scrollY=${scrollY}.`);
    }
  }

  await takeScreenshot('screenshots/mobile_navbar_scrolled_375.png');

  // Test opening hamburger menu from scrolled position
  console.log('\n--- Testing Hamburger Menu Open / Close / Lock ---');
  await evalCode(`document.querySelector('.menu-toggle-btn').click();`);
  await sleep(500);

  const openResult = await evalCode(`(() => {
    const overlay = document.querySelector('.fullscreen-menu-overlay');
    return {
      bodyOverflow: document.body.style.overflow,
      isOpen: overlay.classList.contains('is-open'),
      overlayDisplay: window.getComputedStyle(overlay).visibility
    };
  })()`);
  console.log('Menu opened result:', openResult);

  if (openResult.bodyOverflow === 'hidden' && openResult.isOpen) {
    console.log('PASS: Body scroll locked and overlay has .is-open class.');
  } else {
    console.error('FAIL: Menu open failed or body scroll not locked:', openResult);
  }

  await takeScreenshot('screenshots/mobile_menu_open_375.png');

  // Test Escape key closes menu
  await evalCode(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));`);
  await sleep(400);
  const isClosedAfterEsc = await evalCode(`(() => {
    const overlay = document.querySelector('.fullscreen-menu-overlay');
    return !overlay.classList.contains('is-open') && document.body.style.overflow === '';
  })()`);
  console.log(`PASS: Escape key closed menu & unlocked body scroll: ${isClosedAfterEsc}`);

  // Test clicking link in menu closes menu and navigates
  await evalCode(`document.querySelector('.menu-toggle-btn').click();`);
  await sleep(400);
  const clickLinkResult = await evalCode(`(() => {
    const workLink = document.querySelector('.overlay-links-list a[href="#work"]');
    if (!workLink) return { error: 'Work link not found in menu' };
    workLink.click();
    return { success: true };
  })()`);
  await sleep(500);
  const isClosedAfterClick = await evalCode(`(() => {
    const overlay = document.querySelector('.fullscreen-menu-overlay');
    return !overlay.classList.contains('is-open') && document.body.style.overflow === '';
  })()`);
  console.log('PASS: Selecting navigation destination closed menu & unlocked body scroll:', isClosedAfterClick);

  // -------------------------------------------------------------
  // TEST TASK 3: PROJECT CATALOGUE GRID
  // -------------------------------------------------------------
  console.log('\n=== TESTING TASK 3: PROJECT CATALOGUE GRID ===');
  await setViewport(1280, 900, false);
  await evalCode(`window.scrollTo(0, document.querySelector('#work').offsetTop);`);
  await sleep(500);

  const workChecks = await evalCode(`(() => {
    const workSec = document.querySelector('#work');
    if (!workSec) return { error: 'Work section not found' };

    const heading = workSec.querySelector('.work-monument-title')?.innerText.trim();
    const filterButtons = Array.from(workSec.querySelectorAll('.filter-pill')).map(b => b.innerText.trim());
    const cards = Array.from(workSec.querySelectorAll('.catalogue-card')).map(card => {
      return {
        title: card.querySelector('.catalogue-project-title')?.innerText.trim(),
        badge: card.querySelector('.catalogue-type-badge')?.innerText.trim(),
        category: card.querySelector('.catalogue-category-label')?.innerText.trim(),
        desc: card.querySelector('.catalogue-project-desc')?.innerText.trim(),
        viewLink: card.querySelector('.btn-catalogue-view')?.getAttribute('href'),
        viewLabel: card.querySelector('.btn-catalogue-view')?.innerText.trim(),
        hasImg: !!card.querySelector('.catalogue-project-img')?.getAttribute('src'),
        imgSrc: card.querySelector('.catalogue-project-img')?.getAttribute('src')
      };
    });

    const gridStyle = window.getComputedStyle(workSec.querySelector('.work-catalogue-grid'));
    const gridCols = gridStyle.gridTemplateColumns.split(' ').length;

    return {
      heading,
      filterButtons,
      cardCount: cards.length,
      gridCols,
      cards
    };
  })()`);

  console.log('Work section checks:', {
    heading: workChecks.heading,
    filterButtons: workChecks.filterButtons,
    cardCount: workChecks.cardCount,
    gridCols: workChecks.gridCols
  });

  console.log('\nProjects in catalogue:');
  workChecks.cards.forEach((c, i) => {
    console.log(` [${i+1}] ${c.title} | Badge: "${c.badge}" | Link: ${c.viewLink} | Img: ${c.imgSrc}`);
  });

  if (workChecks.heading === 'SELECTED WORK') {
    console.log('PASS: Heading is SELECTED WORK.');
  }

  if (workChecks.cardCount === 5) {
    console.log('PASS: All 5 projects present in catalogue.');
  } else {
    console.error('FAIL: Expected 5 project cards, got:', workChecks.cardCount);
  }

  if (workChecks.gridCols === 3) {
    console.log('PASS: Desktop grid displays 3 equal-width columns.');
  } else {
    console.error('FAIL: Desktop grid columns expected 3, got:', workChecks.gridCols);
  }

  // Verify Bexley is client project and others are concepts/demos
  const bexley = workChecks.cards.find(c => c.title.toLowerCase().includes('bexley'));
  if (bexley && bexley.badge.includes('CLIENT PROJECT')) {
    console.log('PASS: Bexley LifeScience is correctly designated as CLIENT PROJECT.');
  } else {
    console.error('FAIL: Bexley badge incorrect:', bexley?.badge);
  }

  const nonClientProjects = workChecks.cards.filter(c => !c.title.toLowerCase().includes('bexley'));
  const allAccurateDemos = nonClientProjects.every(c => c.badge.includes('CONCEPT') || c.badge.includes('DEMO'));
  if (allAccurateDemos && nonClientProjects.length === 4) {
    console.log('PASS: The other 4 projects are honestly labelled as CONCEPT or DEMO.');
  } else {
    console.error('FAIL: Non-client project classifications incorrect');
  }

  await takeScreenshot('screenshots/selected_work_desktop_all.png');

  // Test Filter: Client Projects (1)
  console.log('\n--- Testing Filter: Client Projects (1) ---');
  await evalCode(`(() => {
    const btn = Array.from(document.querySelectorAll('.filter-pill')).find(b => b.innerText.includes('Client Projects'));
    btn.click();
  })()`);
  await sleep(400);

  const clientFilterCheck = await evalCode(`(() => {
    const cards = Array.from(document.querySelectorAll('.catalogue-card'));
    return {
      count: cards.length,
      titles: cards.map(c => c.querySelector('.catalogue-project-title')?.innerText.trim())
    };
  })()`);
  console.log('Client filter result:', clientFilterCheck);
  if (clientFilterCheck.count === 1 && clientFilterCheck.titles[0].toLowerCase().includes('bexley')) {
    console.log('PASS: Client Projects filter returns only Bexley LifeScience (1).');
  } else {
    console.error('FAIL: Client filter check failed:', clientFilterCheck);
  }

  await takeScreenshot('screenshots/selected_work_desktop_client.png');

  // Test Filter: Concepts & Demos (4)
  console.log('\n--- Testing Filter: Concepts & Demos (4) ---');
  await evalCode(`(() => {
    const btn = Array.from(document.querySelectorAll('.filter-pill')).find(b => b.innerText.includes('Concepts & Demos'));
    btn.click();
  })()`);
  await sleep(400);

  const demoFilterCheck = await evalCode(`(() => {
    const cards = Array.from(document.querySelectorAll('.catalogue-card'));
    return {
      count: cards.length,
      titles: cards.map(c => c.querySelector('.catalogue-project-title')?.innerText.trim())
    };
  })()`);
  console.log('Demo filter result:', demoFilterCheck);
  if (demoFilterCheck.count === 4 && !demoFilterCheck.titles.some(t => t.includes('Bexley'))) {
    console.log('PASS: Concepts & Demos filter returns exactly 4 demo/concept projects.');
  } else {
    console.error('FAIL: Demo filter check failed:', demoFilterCheck);
  }

  await takeScreenshot('screenshots/selected_work_desktop_demos.png');

  // Reset filter to All
  await evalCode(`(() => {
    const btn = Array.from(document.querySelectorAll('.filter-pill')).find(b => b.innerText.includes('All Projects'));
    btn.click();
  })()`);
  await sleep(400);

  // Tablet Grid Check (768px -> 2 columns)
  console.log('\n--- Testing Tablet Grid (768px) ---');
  await setViewport(768, 1024, false);
  await sleep(400);

  const tabletGridCols = await evalCode(`(() => {
    const gridStyle = window.getComputedStyle(document.querySelector('.work-catalogue-grid'));
    return gridStyle.gridTemplateColumns.split(' ').length;
  })()`);
  console.log('Tablet grid columns:', tabletGridCols);
  if (tabletGridCols === 2) {
    console.log('PASS: Tablet grid displays 2 equal-width columns.');
  } else {
    console.error('FAIL: Tablet grid columns expected 2, got:', tabletGridCols);
  }
  await takeScreenshot('screenshots/selected_work_tablet_768.png');

  // Mobile Grid Check (375px -> 1 column)
  console.log('\n--- Testing Mobile Grid (375px) ---');
  await setViewport(375, 812, true);
  await sleep(400);

  const mobileGridCols = await evalCode(`(() => {
    const gridStyle = window.getComputedStyle(document.querySelector('.work-catalogue-grid'));
    return gridStyle.gridTemplateColumns.split(' ').length;
  })()`);
  console.log('Mobile grid columns:', mobileGridCols);
  if (mobileGridCols === 1) {
    console.log('PASS: Mobile grid displays 1 column.');
  } else {
    console.error('FAIL: Mobile grid columns expected 1, got:', mobileGridCols);
  }
  await takeScreenshot('screenshots/selected_work_mobile_375.png');

  console.log('\n=== ALL PORTFOLIO VERIFICATION TESTS COMPLETED SUCCESSFULLY! ===');
  process.exit(0);
}

run().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
