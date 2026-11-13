import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
try {
  const page = await browser.newPage();
  const { pages } = JSON.parse(await readFile('public/grounded/sources.json', 'utf8'));
  for (const route of pages) {
    const response = await page.request.get(`http://localhost:4321/grounded${route === '/' ? '/' : route + '/'}`);
    if (response.status() !== 200) throw new Error(`${route}: ${response.status()}`);
  }
  await page.goto('http://localhost:4321/grounded/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000);
  await page.locator('.menu-open-close-container').click();
  await page.waitForTimeout(1200);
  const link = page.locator('.nav-big-link').filter({ hasText: 'Proyectos' }).first();
  await link.click();
  await page.waitForURL('**/grounded/builds/');
  console.log('15 rutas respondieron 200; el menú animado navega a Proyectos.');
} finally { await browser.close(); }
