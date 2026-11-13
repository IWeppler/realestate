import { readFile, writeFile, mkdir } from 'node:fs/promises';
const root = 'public/grounded/assets';
const entry = '63c56570ae87c00c54d9.js';
const seen = new Set();
async function download(file) {
  if (seen.has(file)) return;
  seen.add(file);
  const response = await fetch(`https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/${file}`);
  if (!response.ok) throw new Error(`${file}: ${response.status}`);
  const content = await response.text();
  await mkdir(`${root}/dist`, { recursive: true });
  await writeFile(`${root}/${file}`, content);
  await follow(content, file);
}
async function follow(content, file) {
  const refs = [...content.matchAll(/(?:from|import\(?)\s*["'](\.\/[^"']+\.js)["']/g)].map(m => m[1]);
  await Promise.all(refs.map(ref => download(file.startsWith('dist/') ? `dist/${ref.slice(2)}` : ref.slice(2))));
}
await follow(await readFile(`${root}/${entry}`, 'utf8'), entry);
console.log(`Downloaded ${seen.size} module dependencies`);
