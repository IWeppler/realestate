import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({
  executablePath: 'C:/Users/ignac/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe',
  headless: true,
});
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto('http://localhost:4321/castas/', { waitUntil: 'networkidle' });
    const trigger = page.getByRole('button', { name: 'Abrir men\u00fa' }).filter({ visible: true }).first();
    await trigger.focus();
    await page.keyboard.press('Enter');
    const menu = page.getByRole('dialog', { name: 'Navegaci\u00f3n principal' });
    await page.waitForTimeout(700);
    if (!await menu.isVisible()) throw new Error('Keyboard opening failed');
    if (await menu.locator('nav a').count() !== 4) throw new Error('Missing navigation links');
    if (await menu.locator('.castas-menu-socials a').count() !== 4) throw new Error('Missing social links');
    if (await menu.evaluate(el => el.scrollWidth > el.clientWidth)) throw new Error('Menu overflows horizontally');
    await page.screenshot({ path: `scripts/castas-nav-${width}.jpg`, quality: 85 });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(450);
    if (await menu.isVisible()) throw new Error('Escape did not close');
    if (!await trigger.evaluate(el => el === document.activeElement)) throw new Error('Focus was not restored');
    if (await trigger.getAttribute('aria-expanded') !== 'false') throw new Error('Expanded state was not reset');
    await trigger.click();
    await page.waitForTimeout(450);
    await page.getByRole('button', { name: 'Cerrar men\u00fa' }).click();
    await page.waitForTimeout(450);
    if (await menu.isVisible()) throw new Error('Close button failed');
    console.log(`Navigation verified at ${width}px`);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Abrir men\u00fa' }).filter({ visible: true }).first().click();
  const menu = page.locator('#castas-navigation');
  if (await menu.evaluate(el => getComputedStyle(el).transitionDuration) !== '0s') throw new Error('Reduced motion ignored');
  await menu.locator('nav a[href="/castas/about/"]').click();
  await page.waitForURL('**/castas/about/');
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Reduced motion, navigation, and browser errors verified');
} finally {
  await browser.close();
}
