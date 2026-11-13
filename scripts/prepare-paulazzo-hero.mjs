import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const assets = [
  { file: 'VCP.png', usage: 'desktop', width: 1672, height: 941 },
  { file: 'VCP-MOBILE.png', usage: 'mobile, viewport <= 760px', width: 941, height: 1672 },
];
for (const asset of assets) {
  const metadata = await sharp('public/paulazzo/' + asset.file).metadata();
  if (metadata.width !== asset.width || metadata.height !== asset.height) throw new Error(`Unexpected dimensions: ${asset.file}`);
}
const attribution = { source: 'User-provided images', assets, changes: 'Original PNG files used directly with responsive picture sources. Display crop and overlay applied with CSS.' };
await writeFile('public/paulazzo/hero-attribution.json', JSON.stringify(attribution, null, 2));
const sources = JSON.parse(await readFile('public/paulazzo/sources.json', 'utf8'));
sources.hero = attribution;
await writeFile('public/paulazzo/sources.json', JSON.stringify(sources, null, 2));
console.log('Hero: VCP.png desktop; VCP-MOBILE.png mobile.');
