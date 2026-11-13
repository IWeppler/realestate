import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { copyFile } from 'node:fs/promises';
const run = promisify(execFile);
await mkdir('public/paulazzo', { recursive: true });
const base = 'https://inmobiliariapaulazzo.com.ar';
const assets = {
  'logo.png': '/wp-content/uploads/2020/09/logo.png',
  'carlos-paz-2.jpg': '/wp-content/uploads/2025/04/vcp2.jpg',
  'carlos-paz-9.jpg': '/wp-content/uploads/2025/04/vcp9.jpg',
  'carlos-paz-8.jpg': '/wp-content/uploads/2025/04/vcp8.jpg',
  'carlos-paz-7.jpg': '/wp-content/uploads/2025/04/vcp7.jpg',
  'carlos-paz-6.jpg': '/wp-content/uploads/2025/04/vcp6.jpg',
};
async function download(url) {
  const { stdout } = await run('curl.exe', ['-f', '-sS', '-L', '--retry', '2', '--retry-all-errors', '--connect-timeout', '10', '--max-time', '35', url], { encoding: 'buffer', windowsHide: true, maxBuffer: 20000000 });
  return stdout;
}
await Promise.all(Object.entries(assets).map(async ([name, path]) => {
  const filename = 'public/paulazzo/' + name;
  if (!await readFile(filename).catch(() => null)) await writeFile(filename, await download(base + path));
  console.log(name);
}));
const routes = [
  ['santa-rita', 'venta-casa-a-estrenar-de-cuatro-dormitorios-con-pileta-en-barrio-santa-rita'],
  ['centro', 'venta-departamento-amoblado-de-un-dormitorio-en-pleno-centro-de-carlos-paz'],
  ['cibeles', 'venta-departamento-de-dos-dormitorios-en-paseo-cibeles-2'],
];
const sources = { original: base, downloaded: new Date().toISOString(), assets, properties: [] };
await Promise.all(routes.map(async ([name, slug]) => {
  const file = `scripts/paulazzo-${name}-reference.html`;
  let html = await readFile(file, 'utf8').catch(() => null);
  if (!html) { html = (await download(`${base}/propiedades/${slug}/`)).toString('utf8'); await writeFile(file, html); }
  const images = [...new Set([...html.matchAll(/(?:href|src)=["'](https:\/\/[^"']*\/uploads\/[^"']*\.(?:jpe?g|png|webp))["']/gi)].map(m => m[1]))]
    .filter(url => !/logo|icon|VENTA|estrella|diamante|HOME-|cropped|dispacher|-\d+x\d+\./i.test(url));
  sources.properties.push({ name, url: `${base}/propiedades/${slug}/`, images });
  await Promise.all(images.slice(0, 3).map(async (url, i) => {
    const extension = url.match(/\.[^.]+$/)[0];
    await writeFile(`public/paulazzo/${name}-${i}${extension}`, await download(url));
    console.log(`${name}-${i}${extension}`);
  }));
}));
await writeFile('public/paulazzo/sources.json', JSON.stringify(sources, null, 2));
for (const name of ['carlos-paz-8.jpg', 'carlos-paz-6.jpg', 'santa-rita-1.png', 'centro-0.png', 'cibeles-0.png']) {
  await sharp('public/paulazzo/' + name).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 83 }).toFile('public/paulazzo/' + name.replace(/\.[^.]+$/, '.webp'));
}
await copyFile('public/castas/assets/c58bdda1d01901eb.woff2', 'public/paulazzo/geist-regular.woff2');
await copyFile('public/castas/assets/61511d8dc68c60d7.woff2', 'public/paulazzo/geist-medium.woff2');
await import('./prepare-paulazzo-hero.mjs');
