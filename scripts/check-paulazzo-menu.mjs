import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  for (const path of ['/paulazzo/', '/paulazzo/propiedades/santa-rita/']) {
    await page.goto(`http://localhost:4321${path}`, { waitUntil: 'networkidle' });
    const trigger = page.locator('.mobile-menu summary');
    await trigger.click();
    await page.waitForTimeout(100);
    if (await trigger.getAttribute('aria-expanded') !== 'true') throw Error('Expanded state missing');
    const panel = await page.locator('.mobile-menu-panel').boundingBox();
    if (panel.x !== 0 || panel.y !== 0 || panel.width !== 390 || panel.height !== 844) throw Error('Panel does not cover viewport');
    if (await page.evaluate(() => getComputedStyle(document.documentElement).overflow) !== 'hidden') throw Error('Scroll is not locked');
    await trigger.focus();
    await page.keyboard.press('Shift+Tab');
    if (!await page.locator('.mobile-menu-phone').evaluate(el => el === document.activeElement)) throw Error('Focus did not wrap');
    await page.keyboard.press('Tab');
    if (!await trigger.evaluate(el => el === document.activeElement)) throw Error('Focus did not return');
    await page.screenshot({ path: `scripts/paulazzo-menu${path.includes('propiedades') ? '-detail' : ''}.jpg` });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(100);
    if (await trigger.getAttribute('aria-expanded') !== 'false') throw Error('Escape did not close');
    await trigger.click();
    await page.locator('.mobile-menu nav a').first().click();
    await page.waitForTimeout(100);
    if (await page.locator('.mobile-menu').getAttribute('open') !== null) throw Error('Navigation did not close');
    if (await page.evaluate(() => document.documentElement.classList.contains('paulazzo-menu-open'))) throw Error('Scroll remained locked');
  }
  console.log('Menú verificado en landing y ficha: pantalla completa, foco, Escape, enlaces y bloqueo de scroll.');
} finally { await browser.close(); }
