import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Users/ignac/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  await page.addInitScript(() => sessionStorage.setItem('grounded_loaded', '1'));
  for (const route of ['', 'services/']) {
    for (const width of [320, 390, 600, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`http://localhost:4321/grounded/${route}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3500);
      await page.locator('.menu-open-close-container').click();
      await page.waitForTimeout(1200);
      // Check the glyphs themselves: flex item bounds alone can miss overflowing text.
      const failures = await page.evaluate(() => {
        const panel = document.querySelector('.nav-menu-fixed-container').getBoundingClientRect();
        return [...document.querySelectorAll('.nav-big-link')].filter(el => {
          const range = document.createRange();
          range.selectNodeContents(el);
          const r = range.getBoundingClientRect();
          return r.left < Math.max(0, panel.left) || r.right > Math.min(innerWidth, panel.right) || r.top < 0 || r.bottom > panel.bottom;
        }).map(el => el.textContent);
      });
      if (failures.length) throw new Error(`${route} ${width}px: ${failures.join(', ')}`);
      console.log(`${route || 'home'} ${width}px: glyphs inside menu`);
    }
  }
} finally { await browser.close(); }
