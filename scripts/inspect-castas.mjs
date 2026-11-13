import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto('https://castas.framer.website/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(3500);
  await page.screenshot({ path: 'scripts/castas-reference.jpg', fullPage: true, quality: 75 });
  const details = await page.evaluate(() => ({
    images: [...document.images].filter(img => img.getBoundingClientRect().width > 30).map(img => ({ src: img.currentSrc, alt: img.alt, y: Math.round(img.getBoundingClientRect().top + scrollY), width: Math.round(img.getBoundingClientRect().width) })),
    fonts: [...new Set([...document.querySelectorAll('h1,h2,h3,p')].map(el => getComputedStyle(el).fontFamily))],
    colors: [...new Set([...document.querySelectorAll('main,section,header,footer,h1,h2,p')].map(el => getComputedStyle(el).color))],
    text: document.body.innerText,
  }));
  await writeFile('scripts/castas-inspection.json', JSON.stringify(details, null, 2));
  console.log(JSON.stringify(details, null, 2));
} finally { await browser.close(); }
