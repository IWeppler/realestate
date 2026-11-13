import { mkdir, writeFile, stat } from 'node:fs/promises';

const base = 'https://deszelle.servitec.com.gt';
const assets = {
  'service-architecture.jpg': '/images/servicios_iconos/03_servicios_iconos_foto01_786x982.jpg',
  'service-interiors.jpg': '/images/servicios_iconos/03_servicios_iconos_foto02_786x982.jpg',
  'service-planning.jpg': '/images/servicios_iconos/03_servicios_iconos_foto03_786x982.jpg',
  'hero.jpg': '/images/casa_arco_sereno/06_casa_arco_sereno_foto01_1672x941.jpg',
  'casa-el-salvador.jpg': '/images/casa_el_salvador/05_casa_el_salvador_foto01_1448x1086.jpg',
  'casa-arco-sereno.jpg': '/images/casa_arco_sereno/06_casa_arco_sereno_foto03_898x1122.jpg',
  'casa-valvere.jpg': '/images/casa_valvere/07_casa_valvere_foto03_898x1122.jpg',
  'casa-san-isidro.jpg': '/images/casa_san_isidro/09_casa_san_isidro_foto02_898x1122.jpg',
  'casa-antigua-azul.jpg': '/images/casa_antigua_azul/10_casa_antigua_azul_foto03_896x1200.jpg',
  'casa-valle-verde.jpg': '/images/casa_valle_verde/11_casa_valle_verde_foto04_1255x1680.jpg',
  'studio.jpg': '/images/quienes_somos/01_quienes_somos_foto01_2800x1706.jpg',
  'archivo-medium.ttf': '/_next/static/media/Archivo_Medium-s.p.028o8u5etzqbc.ttf',
  'archivo-bold.ttf': '/_next/static/media/Archivo_Bold-s.p.1tutexw9ag72c.ttf',
};
await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
const pending = Object.entries(assets);
async function worker() {
  while (pending.length) {
    const [name, path] = pending.shift();
    const target = `public/${name.endsWith('.ttf') ? 'fonts' : 'images'}/${name}`;
    if (await stat(target).catch(() => null)) continue;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(base + path, { signal: AbortSignal.timeout(90000) });
        if (!response.ok) throw new Error(`${name}: ${response.status}`);
        await writeFile(target, Buffer.from(await response.arrayBuffer()));
        console.log(`Downloaded ${name}`);
        break;
      } catch (error) {
        if (attempt === 3) throw error;
        console.log(`Retrying ${name}`);
      }
    }
  }
}
await Promise.all([worker(), worker()]);
