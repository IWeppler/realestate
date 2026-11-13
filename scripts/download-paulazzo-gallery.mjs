import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import sharp from 'sharp';
const run = promisify(execFile);
const sources = JSON.parse(await readFile('public/paulazzo/sources.json', 'utf8'));
await mkdir('scripts/paulazzo-photo-candidates', { recursive: true });
const pending = sources.properties.flatMap(property => property.images.slice(0, 9).map((url, index) => ({ name: property.name, url, index })));
async function worker() {
  while (pending.length) {
    const { name, url, index } = pending.shift();
    const target = `public/paulazzo/${name}-${index}.webp`;
    if (await readFile(target).catch(() => null)) continue;
    const existing = await readFile(`public/paulazzo/${name}-${index}.png`).catch(() => null);
    let bytes = existing;
    if (!bytes) {
      const cache = `scripts/paulazzo-photo-candidates/${name}-${index}.png`;
      bytes = await readFile(cache).catch(() => null);
      if (!bytes) {
        const result = await run('curl.exe', ['-f', '-sS', '-L', '--retry', '2', '--retry-all-errors', '--connect-timeout', '10', '--max-time', '40', url], { encoding: 'buffer', maxBuffer: 20000000, windowsHide: true });
        bytes = result.stdout;
        await writeFile(cache, bytes);
      }
    }
    await sharp(bytes).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 85 }).toFile(target);
    console.log(`${name}-${index}`);
  }
}
await Promise.all([worker(), worker(), worker()]);
