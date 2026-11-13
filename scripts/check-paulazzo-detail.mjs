import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  for (const [slug, price] of [['santa-rita', 'USD 265.000'], ['centro', 'USD 89.000'], ['cibeles', 'USD 149.000']]) {
    const response = await page.goto(`http://localhost:4321/paulazzo/propiedades/${slug}/`, { waitUntil: 'networkidle' });
    if (response.status() !== 200 || !await page.locator('.enquiry-price').textContent().then(text => text === price)) throw new Error(`Invalid property: ${slug}`);
    await page.getByRole('button', { name: 'Ver las 9 fotos' }).click();
    const dialog = page.getByRole('dialog', { name: 'Galería de fotos de la propiedad' });
    if (!await dialog.isVisible()) throw new Error('Gallery did not open');
    await page.keyboard.press('ArrowRight');
    if (await page.locator('.lightbox-counter').innerText() !== '2 / 9') throw new Error('Gallery next failed');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    if (await page.locator('.lightbox-counter').innerText() !== '9 / 9') throw new Error('Gallery wrap failed');
    await page.keyboard.press('Escape');
    if (await dialog.isVisible()) throw new Error('Gallery Escape failed');
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => { window.__copiedLink = text; } } });
      window.open = url => { window.__enquiryUrl = String(url); return null; };
    });
    await page.getByRole('button', { name: 'Compartir' }).click();
    if (!(await page.evaluate(() => window.__copiedLink))?.includes(`/propiedades/${slug}/`)) throw new Error('Share failed');
    await page.getByLabel('Tu nombre').fill('Prueba local');
    await page.getByRole('button', { name: 'Continuar en WhatsApp' }).click();
    const target = await page.evaluate(() => window.__enquiryUrl);
    if (!target.startsWith('https://wa.me/5493541336769?text=') || !decodeURIComponent(target).includes('Prueba local')) throw new Error('Enquiry failed');
  }
  await page.goto('http://localhost:4321/paulazzo/propiedades/santa-rita/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/paulazzo-detail-desktop.jpg', quality: 85 });
  await page.screenshot({ path: 'scripts/paulazzo-detail-full.jpg', fullPage: true, quality: 75 });
  await page.getByRole('button', { name: 'Ver las 9 fotos' }).click();
  await page.screenshot({ path: 'scripts/paulazzo-detail-gallery.jpg', quality: 85 });
  await page.keyboard.press('Escape');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/paulazzo-detail-mobile.jpg', fullPage: true, quality: 75 });
  const dimensions = await page.evaluate(() => ({ viewport: innerWidth, width: document.documentElement.scrollWidth }));
  if (dimensions.width > dimensions.viewport) throw new Error('Mobile overflow');
  await page.getByRole('button', { name: 'Ver las 9 fotos' }).click();
  if (!await page.getByRole('button', { name: 'Foto siguiente' }).isVisible()) throw new Error('Mobile gallery controls hidden');
  await page.getByRole('button', { name: 'Cerrar galería' }).click();
  await page.goto('http://localhost:4321/paulazzo/', { waitUntil: 'networkidle' });
  const link = page.locator('[data-property] a.property-photo').first();
  await link.click();
  await page.waitForURL('**/paulazzo/propiedades/santa-rita/');
  if (errors.length) throw new Error(errors.join('\n'));
  console.log('Tres fichas verificadas: datos, navegación desde la landing, galería con teclado y Escape, compartir, consulta por WhatsApp sin envío y vista móvil.');
} finally { await browser.close(); }
