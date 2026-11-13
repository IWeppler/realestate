import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname } from 'node:path';

// Original concept and design: Jake Bougouneau / Neauflow.
// Keep attribution in each page. This is a local study of the reference.
const origin = 'https://www.grounded2026.com';
const root = 'public/grounded';
await mkdir(`${root}/assets`, { recursive: true });
const pages = new Map([['/', await readFile('scripts/grounded-reference.html', 'utf8')]]);
const assets = new Map();
const allowed = /^(cdn\.prod\.website-files\.com|d3e54v103j8qbb\.cloudfront\.net|ajax\.googleapis\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|cdn\.jsdelivr\.net)$/;
async function get(url) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      return response;
    } catch (error) { if (attempt === 2) throw error; }
  }
}
function references(html) {
  return [...html.matchAll(/href="(\/(?!\/)[^"?#]*)/g)].map(m => m[1]);
}
for (const [route, html] of pages) {
  for (const link of references(html)) {
    if (pages.has(link) || /\.[a-z]+$/i.test(link)) continue;
    const response = await get(origin + link);
    pages.set(link, await response.text());
    console.log(`Page ${link}`);
  }
}
async function localAsset(raw) {
  const url = raw.replaceAll('&amp;', '&');
  let parsed;
  try { parsed = new URL(url); } catch { return raw; }
  if (!allowed.test(parsed.hostname)) return raw;
  if (parsed.pathname === '/') return raw;
  if (assets.has(url)) return assets.get(url);
  const extension = extname(parsed.pathname) || (parsed.hostname === 'fonts.googleapis.com' ? '.css' : '.bin');
  const filename = createHash('sha256').update(url).digest('hex').slice(0, 20) + extension;
  const local = `/grounded/assets/${filename}`;
  assets.set(url, local);
  const response = await get(url);
  if (/\.(css|js|json)$/.test(extension)) {
    let content = await response.text();
    if (extension === '.css') {
      const refs = [...new Set([...content.matchAll(/https:\/\/[^\s"'<>\)]+/g)].map(m => m[0]))];
      for (const ref of refs) content = content.replaceAll(ref, await localAsset(ref));
    }
    await writeFile(`${root}/assets/${filename}`, content);
  } else await writeFile(`${root}/assets/${filename}`, Buffer.from(await response.arrayBuffer()));
  return local;
}
for (const [route, source] of pages) {
  let html = source
    .replace(/<script[^>]*src="https:\/\/www\.googletagmanager\.com[^>]*><\/script>/g, '')
    .replace(/<script>\s*window\.dataLayer[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*rel="canonical"[^>]*>/g, '')
    .replace(/\s+integrity="[^"]*"/g, '');
  const refs = [...new Set([...html.matchAll(/https:\/\/[^\s"'<>\)]+/g)].map(m => m[0]))];
  // Sequential assets keep downloads bounded and make the source map deterministic.
  for (const ref of refs) html = html.replaceAll(ref, await localAsset(ref));
  html = html.replace(/href="(\/(?!\/)[^"?#]*)([^" ]*)"/g, (all, path, suffix) =>
    pages.has(path) ? `href="/grounded${path === '/' ? '/' : path + '/'}${suffix}"` : all);
  html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow"/><style>:focus-visible{outline:2px solid currentColor;outline-offset:5px}.replica-credit{position:relative;z-index:5;padding:16px 5%;background:#e7e7e2;color:#262822;font:12px/1.6 Arial,sans-serif}.replica-credit a{text-decoration:underline}</style></head>');
  html = html.replace('</body>', '<aside class="replica-credit">Réplica de estudio · Diseño original: <a href="https://www.neauflow.com/" target="_blank" rel="noopener">Jake Bougouneau / Neauflow</a> · <a href="/">Volver a Arquitect</a>. Sitio conceptual; imágenes generadas con IA y premios ficticios.</aside></body>');
  html = html.replace('</head>', `<script>document.addEventListener('submit',function(event){event.preventDefault();event.stopImmediatePropagation();let message=event.target.querySelector('[data-demo-message]');if(!message){message=document.createElement('p');message.dataset.demoMessage='';message.setAttribute('role','status');event.target.appendChild(message)}message.textContent='This is a website replica for demonstration. No information has been sent.';},true);</script></head>`);
  const directory = route === '/' ? 'src/data/grounded' : 'src/data/grounded' + route;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
}
await writeFile(`${root}/sources.json`, JSON.stringify({ original: origin, author: 'Jake Bougouneau / Neauflow', pages: [...pages.keys()], assets: Object.fromEntries(assets) }, null, 2));
console.log(`Saved ${pages.size} pages and ${assets.size} local assets.`);
await import('./grounded-modules.mjs');
await import('./grounded-es.mjs');
