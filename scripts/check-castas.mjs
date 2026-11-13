import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  await page.goto('http://localhost:4321/castas/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'public/previews/castas.jpg', quality: 85 });
  await page.screenshot({ path: 'scripts/castas-local-full.jpg', fullPage: true, quality: 70 });
  await writeFile('scripts/castas-local-inspection.json', JSON.stringify(await page.evaluate(() => ({
    text: document.body.innerText,
    buttons: [...document.querySelectorAll('button')].map(el => ({text: el.textContent, html: el.outerHTML.slice(0, 400)})),
    fixed: [...document.querySelectorAll('body *')].filter(el => getComputedStyle(el).position === 'fixed').map(el => ({ name: el.getAttribute('data-framer-name'), class: el.className, text: el.textContent.slice(0, 100) })),
    images: [...document.images].filter(el => el.getBoundingClientRect().width > 80).map(el => ({ src: el.currentSrc, y: el.getBoundingClientRect().y, w: el.getBoundingClientRect().width })),
  })), null, 2));
  console.log(JSON.stringify({ title: await page.title(), errors, height: await page.evaluate(() => document.body.scrollHeight) }));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: 'networkidle' });
  await page.screenshot({ path: 'scripts/castas-mobile.jpg', quality: 80 });
  console.log('Mobile: ' + await page.evaluate(() => JSON.stringify({ viewport: innerWidth, width: document.documentElement.scrollWidth })));
} finally { await browser.close(); }
