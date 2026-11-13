# Arquitect

Colección de sitios de arquitectura e inmobiliarias, con ejemplos conceptuales y propuestas independientes de rediseño, desarrollada por Ignacio Weppler.

## Ejemplos

- `/`: portada de la colección.
- `/paulazzo/`: landing original para una propuesta independiente de rediseño de Belén Paulazzo Inmobiliaria. Incluye datos y fotos del sitio real, búsqueda sobre tres propiedades destacadas, enlaces a las fichas oficiales y preparación de consultas por WhatsApp. No envía mensajes automáticamente. Diseño y desarrollo: Ignacio Weppler. Fuentes en `public/paulazzo/sources.json`; descarga y optimización en `scripts/download-paulazzo.mjs`.
- `/paulazzo/propiedades/santa-rita/`, `/paulazzo/propiedades/centro/` y `/paulazzo/propiedades/cibeles/`: fichas locales con galería de nueve fotos, características verificadas en las publicaciones originales, ubicación, consulta por WhatsApp y propiedades relacionadas. Las tarjetas de la landing abren estas fichas. Los datos compartidos están en `src/data/paulazzo.ts`; `scripts/download-paulazzo-gallery.mjs` descarga y optimiza las fotos adicionales. La ubicación de Santa Rita y del departamento de Lisandro de la Torre es orientativa; no se inventan direcciones exactas.

Paulazzo utiliza una paleta azul petr?leo, con acciones y filtros en el mismo tono. El buscador incorpora selectores personalizados accesibles con una alternativa nativa sin JavaScript. La selección de propiedades se adapta a tres tarjetas, dos columnas o una ficha horizontal según la cantidad de resultados. La portada usa una panorámica de archivo de Gonce, de 4320 × 2762 píxeles, bajo CC BY-SA 4.0. La atribución está en el pie y en `public/paulazzo/hero-attribution.json`. `scripts/prepare-paulazzo-hero.mjs` genera variantes WebP hasta 3840 píxeles sin ampliar el original.
- `/castas/`: adaptación al español de Castas, con diecinueve páginas, propiedades, artículos, menú, filtros, galería y preguntas frecuentes. Créditos de adaptación y desarrollo: Ignacio Weppler. Referencia: https://castas.framer.website/. Los precios, cifras y testimonios son ilustrativos; los formularios no envían datos.
- `/grounded/`: adaptación al español de Grounded 2026, con quince páginas, recursos locales y animaciones. Créditos de adaptación y desarrollo: Ignacio Weppler, con enlace a su portfolio. Referencia original: Jake Bougouneau / Neauflow. Sus imágenes son generadas con IA y los premios son ficticios. Los formularios no envían información.
- `/ladera/`: arquitectura residencial e interiorismo. Conserva la composición fotográfica, los servicios y el proceso del primer diseño.
- `/ladera/proyectos/`: selección completa y seis fichas conceptuales.
- `/estudio-sur/`: segunda identidad, con tipografía serif, azul y una composición centrada en arquitectura y paisaje.

Ladera, Estudio Sur, Grounded y Castas son ejemplos conceptuales. Sus formularios no envían datos. Paulazzo es una propuesta de rediseño de una inmobiliaria real: conserva su matrícula, dirección y teléfono públicos, y abre WhatsApp con un mensaje que la persona puede revisar antes de enviar. Las fichas y los precios se tomaron del catálogo público el 13 de noviembre de 2026 y deben confirmarse con la inmobiliaria.

Instagram: https://www.instagram.com/ignacioweppler/
Portfolio y crédito: https://ignacioweppler.dev

## Desarrollo

```sh
npm install
npm run dev -- --background
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
npm run build
```

Vista local: http://localhost:4321. La compilación genera cuarenta y ocho páginas estáticas en `dist/`.

## Agregar ejemplos

Crear una página o carpeta bajo `src/pages/<nombre>/` y registrar la propuesta en `src/data/studios.ts`. Las tarjetas de la colección leen ese registro. Guardar una captura de portada en `public/previews/` y usar el footer compartido para conservar los créditos y la identificación como demostración.

Los componentes de Ladera se encuentran en `src/components/`. `Footer.astro`, `ActionLink.astro`, `DemoConsultation.astro` y `Layout.astro` se comparten entre ejemplos. Las obras de Ladera están en `src/data/projects.ts`. Los estilos de la colección y Estudio Sur están en `src/styles/showcase.css`.

## Recursos

Las fotografías y fuentes se tomaron de la referencia visual usada durante el desarrollo. Se conservan localmente en `public/images` y `public/fonts`; `scripts/download-reference-assets.mjs` registra su procedencia. El esquema de planificación y los símbolos de marca son ilustraciones SVG del ejemplo. No se presentan como planos ejecutivos ni como trabajos de un estudio real.

El desplazamiento con mouse y trackpad usa Lenis, sin alterar los gestos táctiles. Se respeta el movimiento reducido. El proceso de Ladera funciona con teclado y usa HTML nativo como alternativa sin JavaScript.

## Entrada de Ladera

La portada de Ladera muestra su símbolo y una doble persiana petróleo y naranja durante unos dos segundos. Se reproduce en la primera visita de la sesión y al recargar explícitamente. Volver desde los proyectos o entrar a un enlace con sección no repite la secuencia.

`EntryReveal.astro` y `entry-reveal.css` contienen la animación. `BrandSymbol.astro` comparte el símbolo con la marca del sitio. Escape o Tab permiten saltarla; movimiento reducido y navegación sin JavaScript muestran el contenido directamente. Un límite de cuatro segundos libera la página si no se puede iniciar la mejora.
