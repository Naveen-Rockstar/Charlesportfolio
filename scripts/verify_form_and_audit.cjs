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

  await new Promise(r => ws.onopen = r);

  console.log('Connected to Chrome DevTools Protocol');
  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');

  // Reload fresh bundle
  await send('Page.reload', { ignoreCache: true });
  await new Promise(r => setTimeout(r, 1500));

  // Navigate or scroll to start-project
  await send('Runtime.evaluate', {
    expression: `window.location.hash = '#start-project';`
  });
  await new Promise(r => setTimeout(r, 800));

  // Track console errors
  const consoleErrors = [];
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
      consoleErrors.push(msg.params.args.map(a => a.value || a.description).join(' '));
    }
  });

  const viewports = [
    { width: 1440, height: 900, name: 'desktop-1440' },
    { width: 1280, height: 800, name: 'desktop-1280' },
    { width: 768, height: 1024, name: 'tablet-768' },
    { width: 430, height: 932, name: 'mobile-430' },
    { width: 390, height: 844, name: 'mobile-390' },
    { width: 375, height: 667, name: 'mobile-375' },
    { width: 320, height: 568, name: 'mobile-320' },
  ];

  fs.mkdirSync('screenshots/audit-verification', { recursive: true });

  console.log('\n--- Viewport Audit & Screenshot Capture ---');
  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 768
    });

    // Scroll directly to the enquiry form card
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const el = document.querySelector('#start-project .enquiry-form-card') || document.querySelector('#start-project');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
        })()
      `
    });

    await new Promise(r => setTimeout(r, 500));

    // Check horizontal overflow
    const overflowCheck = await send('Runtime.evaluate', {
      expression: `
        (() => {
          return {
            scrollWidth: document.documentElement.scrollWidth,
            innerWidth: window.innerWidth,
            hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
          };
        })()
      `,
      returnByValue: true
    });

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`screenshots/audit-verification/form-${vp.name}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`[PASS] form-${vp.name}.png (${vp.width}x${vp.height}) - Overflow: ${overflowCheck.result.value.hasHorizontalOverflow}`);
  }

  // Test form validation:
  console.log('\n--- Testing Form Validation ---');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const form = document.querySelector('#start-project form');
        if (form) form.requestSubmit();
      })()
    `
  });

  await new Promise(r => setTimeout(r, 400));

  const validationResult = await send('Runtime.evaluate', {
    expression: `
      (() => {
        return Array.from(document.querySelectorAll('#start-project .error-note')).map(e => e.textContent.trim());
      })()
    `,
    returnByValue: true
  });
  console.log('Validation errors on empty submit:', validationResult.result.value);

  // Test form filling and submission:
  console.log('\n--- Testing Form Submission & Dispatch Links ---');
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const nameInput = document.querySelector('#enquiry-name');
        const phoneInput = document.querySelector('#enquiry-phone');
        const detailsInput = document.querySelector('#enquiry-details');
        const form = document.querySelector('#start-project form');

        const setVal = (el, val) => {
          if (!el) return;
          const proto = Object.getPrototypeOf(el);
          const set = Object.getOwnPropertyDescriptor(proto, 'value').set;
          set.call(el, val);
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setVal(nameInput, 'Rajesh Kumar');
        setVal(phoneInput, '9876543210');
        setVal(detailsInput, 'Need a corporate clinic website with appointment booking.');

        setTimeout(() => {
          if (form) form.requestSubmit();
        }, 150);
      })()
    `
  });

  await new Promise(r => setTimeout(r, 1000));

  const submissionState = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const successHeading = document.querySelector('#start-project .success-heading')?.textContent.trim();
        const waLink = document.querySelector('#start-project a[href*="wa.me"]')?.href;
        const mailLink = document.querySelector('#start-project a[href*="mailto:"]')?.href;
        const previewText = document.querySelector('#start-project .brief-preview-pre')?.textContent;
        return { successHeading, waLink, mailLink, previewText };
      })()
    `,
    returnByValue: true
  });

  const res = submissionState.result.value;
  console.log('Submission Result:', res.successHeading);
  console.log('WhatsApp Dispatch URL:', res.waLink);
  console.log('Email Dispatch URL:', res.mailLink);
  console.log('Formatted Brief Preview:\n' + res.previewText);

  // Capture screenshot of the confirmed submitted state
  const confirmedShot = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('screenshots/audit-verification/form-submitted-state.png', Buffer.from(confirmedShot.data, 'base64'));
  console.log('Captured: form-submitted-state.png');

  console.log('\nConsole Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Errors found:', consoleErrors);
  }

  ws.close();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
