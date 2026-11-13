import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('http://localhost:4321/castas/', { waitUntil: 'networkidle' });
  console.log(JSON.stringify(await page.locator('#listing img').first().evaluate(img => ({ src: img.src, current: img.currentSrc, complete: img.complete, naturalWidth: img.naturalWidth, ancestors: [img, img.parentElement, img.parentElement.parentElement, img.parentElement.parentElement.parentElement].map(el => ({ style: el.getAttribute('style'), computed: { display: getComputedStyle(el).display, opacity: getComputedStyle(el).opacity, visibility: getComputedStyle(el).visibility, transform: getComputedStyle(el).transform, clip: getComputedStyle(el).clipPath }, rect: el.getBoundingClientRect().toJSON() })) })), null, 2));
  await page.getByRole('button', { name: 'Abrir menú' }).filter({ visible: true }).first().click();
  await page.getByRole('dialog', { name: 'Navegación principal' }).waitFor({ state: 'visible' });
  await page.getByRole('button', { name: 'Cerrar ×' }).first().click();
  const question = page.locator('#faq button').first();
  await question.click();
  if (await question.getAttribute('aria-expanded') !== 'true') throw new Error('FAQ did not open');
  await page.locator('#listing').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'scripts/castas-properties.jpg', quality: 80 });
  const source = JSON.parse(await readFile('public/castas/sources.json', 'utf8'));
  for (const route of source.pages) {
    const response = await page.request.get(`http://localhost:4321/castas${route === '/' ? '/' : route + '/'}`);
    if (response.status() !== 200) throw new Error(`${route}: ${response.status()}`);
  }
  console.log('19 páginas respondieron 200. Menú y preguntas frecuentes funcionan.');
  await page.goto('http://localhost:4321/castas/listings/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Terreno', exact: true }).click();
  if (!await page.locator('.castas-empty-properties').isVisible()) throw new Error('Missing empty filter message');
  await page.getByRole('button', { name: 'Ático', exact: true }).click();
  if (await page.locator('a[href="/castas/listings/urban-luxury-penthouse/"]').filter({ visible:true }).count() < 1) throw new Error('Apartment filter failed');
  await page.goto('http://localhost:4321/castas/listings/contemporary-courtyard-villa/', { waitUntil: 'networkidle' });
  const galleryTrigger = page.getByText('Ver todas las fotos', { exact: true }).filter({ visible: true }).first();
  await galleryTrigger.click();
  const gallery = page.getByRole('dialog', { name: 'Galería de la propiedad' });
  if (!await gallery.isVisible() || await gallery.locator('img').count() === 0) throw new Error('Gallery failed');
  await gallery.getByRole('button', { name: 'Cerrar ×' }).click();
  const form = page.locator('#contact form').filter({ visible: true }).first();
  await form.locator('input[type="text"]:not([aria-hidden="true"])').first().fill('Prueba de demostración');
  await form.locator('input[type="email"]').fill('demo@example.com');
  await form.locator('textarea').fill('Consulta de prueba local.');
  await form.locator('button[type="submit"]').click();
  if (!await form.locator('.castas-demo-status').isVisible()) throw new Error('Demo form failed');
  console.log('Filtros, galería y formulario de demostración verificados.');
} finally { await browser.close(); }
