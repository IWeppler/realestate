import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { extname } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const origin = 'https://castas.framer.website';
const pages = new Map([['/', await readFile('scripts/castas-reference.html', 'utf8')]]);
const assets = new Map();
await mkdir('public/castas/assets', { recursive: true });
await mkdir('scripts/castas-cache', { recursive: true });
async function fetchText(url) {
  const cache = 'scripts/castas-cache/' + createHash('sha256').update(url).digest('hex');
  let stdout = await readFile(cache).catch(() => null);
  if (!stdout) {
    ({ stdout } = await promisify(execFile)('curl.exe', ['-f', '-sS', '-L', '--retry', '4', '--retry-all-errors', '--connect-timeout', '10', '--max-time', '30', url], { encoding: 'buffer', maxBuffer: 25000000, windowsHide: true }));
    await writeFile(cache, stdout);
  }
  return { text: async () => stdout.toString('utf8'), arrayBuffer: async () => stdout };
}
for (const [route, html] of pages) {
  for (const match of html.matchAll(/href="\.\/([^"?#]+)"/g)) {
    let path = '/' + match[1].replace(/\/$/, '');
    if (!/^\/(about|listings|insights|legal)(\/|$)/.test(path)) {
      if (route.startsWith('/listings')) path = '/listings' + path;
      else if (route.startsWith('/insights')) path = '/insights' + path;
      else if (route.startsWith('/legal')) path = '/legal' + path;
      else continue;
    }
    if (pages.has(path) || extname(path)) continue;
    pages.set(path, await (await fetchText(origin + path)).text());
    console.log(`Page ${path}`);
  }
}
async function download(raw) {
  const url = raw.replaceAll('&amp;', '&');
  const parsed = new URL(url);
  if (!/^(framerusercontent\.com|fonts\.gstatic\.com)$/.test(parsed.hostname)) return raw;
  if (!/\.(webp|png|jpe?g|svg|woff2?|ttf|avif)$/i.test(parsed.pathname)) return raw;
  // One appropriately sized local image replaces Framer's many generated variants.
  parsed.search = /\.(webp|png|jpe?g|avif)$/i.test(parsed.pathname) ? '?width=1920' : '';
  const key = parsed.href;
  if (assets.has(key)) return assets.get(key);
  const local = '/castas/assets/' + createHash('sha256').update(key).digest('hex').slice(0, 16) + extname(parsed.pathname);
  assets.set(key, local);
  const response = await fetchText(key);
  await writeFile('public' + local, Buffer.from(await response.arrayBuffer()));
  return local;
}
for (const [route, source] of pages) {
  let html = source.replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]*rel="(?:modulepreload|canonical|preconnect)"[^>]*>/g, '')
    .replace(/\s+srcset="[^"]*"/g, '')
    .replace(/<meta[^>]*name="framer-search-index[^>]*>/g, '');
  const refs = [...new Set([...html.matchAll(/https:\/\/[^\s"'<>\)]+/g)].map(m => m[0]))];
  // Download in bounded batches; writes happen once per canonical asset URL.
  for (let start = 0; start < refs.length; start += 6) {
    const batch = refs.slice(start, start + 6);
    const downloaded = await Promise.all(batch.map(ref => download(ref)));
    batch.forEach((ref, i) => { html = html.replaceAll(ref, downloaded[i]); });
  }
  html = html.replace(/href="\.\/([^"#]*)/g, (_, path) => {
    const normalized = path.replace(/\/$/, '');
    const target = pages.has('/' + normalized) ? '/' + normalized : [...pages.keys()].find(page => page.endsWith('/' + normalized));
    return `href="/castas${target && target !== '/' ? target + '/' : '/'}`;
  });
  html = html.replace('</head>', '<meta name="robots" content="noindex,nofollow"/><link rel="stylesheet" href="/castas/replica.css"/><script src="/castas/replica.js" defer></script></head>');
  const dir = 'src/data/castas' + (route === '/' ? '' : route);
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, html);
  console.log(`Saved ${route}`);
}
await writeFile('public/castas/sources.json', JSON.stringify({ original: origin, pages: [...pages.keys()], assets: Object.fromEntries(assets) }, null, 2));
console.log(`Saved ${pages.size} pages; ${assets.size} local assets.`);
await import('./localize-castas.mjs');
