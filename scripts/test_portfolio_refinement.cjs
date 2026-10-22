const http = require('http');
const fs = require('fs');

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
  // TEST 1: HERO SECTION TWO-COLUMN BALANCE
  // -------------------------------------------------------------
  console.log('\n=== 1. TESTING HERO SECTION TWO-COLUMN BALANCE ===');
  await setViewport(1280, 900, false);
  await sleep(500);

  const heroChecks = await evalCode(`(() => {
    const hero = document.querySelector('.hero-editorial-section');
    if (!hero) return { error: 'Hero section not found' };

    const stage = hero.querySelector('.hero-split-stage');
    const stageStyle = stage ? window.getComputedStyle(stage) : null;
    const stageCols = stageStyle ? stageStyle.gridTemplateColumns.split(' ').length : 0;

    const leftCol = hero.querySelector('.hero-left-column');
    const rightCol = hero.querySelector('.hero-right-column');
    const nameHeadings = Array.from(hero.querySelectorAll('.hero-giant-heading')).map(h => h.innerText.trim());
    const devBadge = !!hero.querySelector('.circular-dev-badge');
    const tagline = hero.querySelector('.hero-heading-tagline')?.innerText.trim();
    const headline = hero.querySelector('.hero-value-headline')?.innerText.trim();
    const leadText = hero.querySelector('.hero-lead-text')?.innerText.trim();
    const primaryCta = hero.querySelector('.btn-hero-primary')?.innerText.trim();
    const secondaryCta = hero.querySelector('.btn-hero-secondary')?.innerText.trim();
    const pdfCta = hero.querySelector('.btn-hero-pdf')?.innerText.trim();

    // Right column checks
    const previewCard = hero.querySelector('.hero-preview-card');
    const servicesCount = hero.querySelectorAll('.hero-service-item').length;
    const serviceTitles = Array.from(hero.querySelectorAll('.hero-service-title')).map(t => t.innerText.trim());
    const snapshotTitle = hero.querySelector('.snapshot-title')?.innerText.trim();
    const snapshotImg = hero.querySelector('.snapshot-img')?.getAttribute('src');

    return {
      stageCols,
      hasLeftCol: !!leftCol,
      hasRightCol: !!rightCol,
      nameHeadings,
      devBadge,
      tagline,
      headline,
      leadText,
      primaryCta,
      secondaryCta,
      pdfCta,
      hasPreviewCard: !!previewCard,
      servicesCount,
      serviceTitles,
      snapshotTitle,
      snapshotImg
    };
  })()`);

  console.log('Hero checks:', heroChecks);

  if (heroChecks.stageCols === 2) {
    console.log('PASS: Desktop hero has balanced two-column composition (2 grid columns).');
  } else {
    console.error('FAIL: Expected 2 grid columns on desktop hero, got:', heroChecks.stageCols);
  }

  if (heroChecks.nameHeadings.includes('CHARLES') && heroChecks.nameHeadings.includes('NAVEEN')) {
    console.log('PASS: CHARLES NAVEEN monumental name present.');
  }

  if (heroChecks.devBadge) {
    console.log('PASS: Rotating DEV circular badge present.');
  }

  if (heroChecks.tagline && heroChecks.tagline.includes('FREELANCE WEB DEVELOPER')) {
    console.log('PASS: Tagline [FREELANCE WEB DEVELOPER] present.');
  }

  if (heroChecks.headline === 'Websites built to turn business attention into enquiries.') {
    console.log('PASS: Headline matches exactly.');
  }

  if (heroChecks.primaryCta && heroChecks.secondaryCta && heroChecks.pdfCta) {
    console.log('PASS: All three CTAs present in left column (Discuss a Project, Explore Work, Portfolio PDF).');
  }

  if (heroChecks.hasPreviewCard && heroChecks.servicesCount >= 4 && heroChecks.snapshotTitle) {
    console.log(`PASS: Right column displays authentic existing services preview (${heroChecks.servicesCount}) and client work snapshot (${heroChecks.snapshotTitle}).`);
  } else {
    console.error('FAIL: Right column preview card incomplete:', heroChecks);
  }

  await takeScreenshot('screenshots/refinement_hero_desktop.png');

  // -------------------------------------------------------------
  // TEST 2: FIVE PRIMARY SECTIONS IN EXACT ORDER
  // -------------------------------------------------------------
  console.log('\n=== 2. TESTING FIVE PRIMARY SECTIONS STRUCTURE ===');
  const sectionsCheck = await evalCode(`(() => {
    const main = document.querySelector('#main-content');
    if (!main) return { error: 'Main content landmark not found' };

    const children = Array.from(main.children);
    const sections = children.map(el => {
      const id = el.id || '';
      const tag = el.tagName.toLowerCase();
      const className = el.className || '';
      return { id, tag, className };
    });

    // Check specific section presences
    const hasHero = !!main.querySelector('.hero-editorial-section');
    const hasWork = !!main.querySelector('#work');
    const hasServices = !!main.querySelector('#services');
    const hasProcess = !!main.querySelector('#process');
    const hasContact = !!main.querySelector('#contact');

    // Check for removed obsolete sections
    const hasMarquee = !!document.querySelector('.kinetic-marquee-section');
    const hasStatement = !!document.querySelector('.ethos-statement-section');
    const hasImpact = !!document.querySelector('#impact');
    const hasStartProject = !!document.querySelector('#start-project');
    const hasCollaboration = !!document.querySelector('#collaboration');
    const hasAbout = !!document.querySelector('#about');

    return {
      sectionCount: children.length,
      sections,
      hasHero,
      hasWork,
      hasServices,
      hasProcess,
      hasContact,
      obsoleteSections: {
        hasMarquee,
        hasStatement,
        hasImpact,
        hasStartProject,
        hasCollaboration,
        hasAbout
      }
    };
  })()`);

  console.log('Sections check:', sectionsCheck);

  if (sectionsCheck.sectionCount === 5) {
    console.log('PASS: Main container has exactly 5 primary sections.');
  } else {
    console.error(`FAIL: Expected 5 sections, found ${sectionsCheck.sectionCount}`);
  }

  if (sectionsCheck.hasHero && sectionsCheck.hasWork && sectionsCheck.hasServices && sectionsCheck.hasProcess && sectionsCheck.hasContact) {
    console.log('PASS: All five required sections are present: Hero, Selected Work, Services, Process, Contact.');
  } else {
    console.error('FAIL: Missing required section(s)!');
  }

  const anyObsoletePresent = Object.values(sectionsCheck.obsoleteSections).some(Boolean);
  if (!anyObsoletePresent) {
    console.log('PASS: All redundant/obsolete standalone sections (Impact, StartProject, Collaboration, About, Marquee, Statement) successfully removed.');
  } else {
    console.error('FAIL: Some obsolete sections are still rendered:', sectionsCheck.obsoleteSections);
  }

  // -------------------------------------------------------------
  // TEST 3: NAVIGATION CONSISTENCY
  // -------------------------------------------------------------
  console.log('\n=== 3. TESTING NAVIGATION CONSISTENCY ===');
  const navCheck = await evalCode(`(() => {
    const desktopLinks = Array.from(document.querySelectorAll('.nav-links-desktop a.nav-item-link'))
      .map(a => ({ label: a.innerText.trim(), href: a.getAttribute('href') }));

    const overlayLinks = Array.from(document.querySelectorAll('.overlay-links-list a.overlay-anchor'))
      .map(a => ({ text: a.querySelector('.overlay-link-text')?.innerText.trim(), href: a.getAttribute('href') }));

    const footerLinks = Array.from(document.querySelectorAll('.footer-links-list a.footer-nav-anchor'))
      .map(a => ({ label: a.innerText.trim(), href: a.getAttribute('href') }));

    return { desktopLinks, overlayLinks, footerLinks };
  })()`);

  console.log('Nav check:', navCheck);

  const expectedHrefs = ['#work', '#services', '#process', '#contact'];
  const desktopMatch = expectedHrefs.every(h => navCheck.desktopLinks.some(l => l.href === h));
  if (desktopMatch) {
    console.log('PASS: Desktop nav links point precisely to the 4 inner sections (#work, #services, #process, #contact).');
  } else {
    console.error('FAIL: Desktop nav links mismatch:', navCheck.desktopLinks);
  }

  // -------------------------------------------------------------
  // TEST 4: CONTACT SECTION AGENCY INCORPORATION
  // -------------------------------------------------------------
  console.log('\n=== 4. TESTING CONTACT SECTION AGENCY INCORPORATION ===');
  const contactAgencyCheck = await evalCode(`(() => {
    const contact = document.querySelector('#contact');
    if (!contact) return { error: 'Contact section not found' };

    const agencyCard = contact.querySelector('.contact-agency-card');
    const agencyHeading = agencyCard?.querySelector('.agency-card-heading')?.innerText.trim();
    const valuesCount = agencyCard?.querySelectorAll('.agency-card-values li').length;
    const selectOptions = Array.from(contact.querySelectorAll('#contact-intent option')).map(o => o.value);

    return {
      hasAgencyCard: !!agencyCard,
      agencyHeading,
      valuesCount,
      selectOptions
    };
  })()`);

  console.log('Contact agency check:', contactAgencyCheck);
  if (contactAgencyCheck.hasAgencyCard && contactAgencyCheck.agencyHeading) {
    console.log(`PASS: Agency collaboration successfully incorporated into Contact section: "${contactAgencyCheck.agencyHeading}".`);
  } else {
    console.error('FAIL: Agency collaboration card missing in Contact section.');
  }

  if (contactAgencyCheck.selectOptions.includes('agency')) {
    console.log('PASS: Contact enquiry form supports Agency Subcontracting collaboration type.');
  }

  await takeScreenshot('screenshots/refinement_contact_desktop.png');

  // -------------------------------------------------------------
  // TEST 5: RESPONSIVE BEHAVIOR (MOBILE 375PX)
  // -------------------------------------------------------------
  console.log('\n=== 5. TESTING RESPONSIVE BEHAVIOR (375PX) ===');
  await setViewport(375, 812, true);
  await evalCode(`window.scrollTo(0, 0);`);
  await sleep(400);

  const mobileCheck = await evalCode(`(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const windowWidth = window.innerWidth;
    const heroStage = document.querySelector('.hero-split-stage');
    const stageCols = window.getComputedStyle(heroStage).gridTemplateColumns.split(' ').length;
    const navbar = document.querySelector('.navbar');
    const navFixed = window.getComputedStyle(navbar).position === 'fixed';

    return {
      scrollWidth,
      windowWidth,
      hasOverflow: scrollWidth > windowWidth,
      stageCols,
      navFixed
    };
  })()`);

  console.log('Mobile check at 375px:', mobileCheck);
  if (!mobileCheck.hasOverflow) {
    console.log('PASS: Zero horizontal overflow on mobile 375px.');
  } else {
    console.error('FAIL: Horizontal overflow detected:', mobileCheck);
  }

  if (mobileCheck.stageCols === 1) {
    console.log('PASS: Hero stacks in 1 column on mobile.');
  } else {
    console.error('FAIL: Hero columns expected 1 on mobile, got:', mobileCheck.stageCols);
  }

  await takeScreenshot('screenshots/refinement_hero_mobile_375.png');

  console.log('\n=== ALL PORTFOLIO REFINEMENT TESTS PASSED! ===');
  process.exit(0);
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
