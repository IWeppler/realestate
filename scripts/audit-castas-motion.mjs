import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/estel/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const kind = process.argv[2] || 'reference';
const browser = await chromium.launch({ executablePath:'C:/Users/ignac/AppData/Local/ms-playwright/chromium-1228/chrome-win64/chrome.exe', headless:true });
await mkdir('scripts/castas-cache/motion',{recursive:true});
try {
 const page = await browser.newPage({viewport:{width:1440,height:1000}});
 await page.goto(kind==='reference'?'https://castas.framer.website/':'http://localhost:4321/castas/',{waitUntil:'domcontentloaded'});
 await page.waitForTimeout(2500);
 const tree=await page.evaluate(()=>{
 const describe=e=>({tag:e.tagName,cls:e.className,name:e.getAttribute('data-framer-name'),style:e.getAttribute('style'),rect:e.getBoundingClientRect().toJSON(),text:e.children.length?undefined:e.textContent.slice(0,80)});
 const walk=(e,depth)=>({ ...describe(e),children:depth?[...e.children].map(c=>walk(c,depth-1)):undefined });
 return {sections:[...document.querySelectorAll('section,footer')].map(describe),hero:walk(document.querySelector('section').parentElement.parentElement,4),services:walk(document.querySelector('#services'),4),footer:walk(document.querySelector('footer').parentElement.parentElement,3)};
 });
 await writeFile(`scripts/castas-cache/motion/${kind}-tree.json`,JSON.stringify(tree,null,2));
 const snapshots=[];
 for(const y of [0,250,500,750,1000,1250,1500,1800,2100,2400,2700,3000,3300]){
  await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await page.waitForTimeout(500);
  await page.screenshot({path:`scripts/castas-cache/motion/${kind}-${y}.jpg`,quality:75});
  snapshots.push(await page.evaluate(()=>({y:scrollY,elements:[...document.querySelectorAll('section:first-of-type *,[data-framer-name="Service"] *')].filter(e=>{const s=e.getAttribute('style')||'';return /transform|opacity|clip/.test(s)}).map(e=>({cls:e.className,name:e.getAttribute('data-framer-name'),style:e.getAttribute('style'),transform:getComputedStyle(e).transform,opacity:getComputedStyle(e).opacity,rect:e.getBoundingClientRect().toJSON()}))})));
 }
 await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(500);
 const hero=page.locator('a').filter({hasText:kind==='reference'?'Contemporary Courtyard Villa':'Villa del Patio'}).filter({visible:true}).first();
 await hero.hover();await page.waitForTimeout(600);await page.screenshot({path:`scripts/castas-cache/motion/${kind}-hover.jpg`});await writeFile(`scripts/castas-cache/motion/${kind}-hover.html`,await hero.evaluate(e=>e.outerHTML));
 await page.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));await page.waitForTimeout(700);await page.screenshot({path:`scripts/castas-cache/motion/${kind}-end.jpg`});
 await writeFile(`scripts/castas-cache/motion/${kind}-snapshots.json`,JSON.stringify(snapshots,null,2));
 console.log(JSON.stringify(tree.sections,null,2));
}finally{await browser.close()}
