import { readdir, readFile, writeFile } from 'node:fs/promises';

const lines = `
Contemporary Courtyard Villa|Villa del Patio
5 Bedrooms · 6 Bathrooms · 540 m²|5 dormitorios · 6 baños · 540 m²
12 Bedrooms · 9 Bathrooms · 1540 m²|12 dormitorios · 9 baños · 1540 m²
6 Bedrooms · 3 Bathrooms · 1540 m²|6 dormitorios · 3 baños · 1540 m²
Property details|Ver propiedad
I help people find homes, investments, and places that genuinely fit their lives. Every property I represent is chosen with care based on location, quality, and long-term value.|Te ayudo a encontrar una casa, una inversión y un lugar que acompañe tu forma de vivir. Cada propiedad se elige con cuidado, por su ubicación, su calidad y su valor a futuro.
WELCOME. I’M ANA COSTA.|HOLA. SOY ANA COSTA.
I work with intention. The right place changes how you live and how you think. I stay closely involved at every step, prioritizing clarity, trust, and decisions that last.|El lugar indicado transforma tu manera de vivir. Te acompaño en cada paso, con claridad, confianza y una mirada puesta en decisiones que perduren.
I represent a curated selection of residences, investments, and opportunities shaped by place and purpose.|Una selección de viviendas e inversiones elegidas por su lugar, su carácter y su potencial.
services|servicios
Clear guidance for buying and selling property, without pressure or shortcuts.|Asesoramiento claro para comprar y vender, a tu ritmo y con confianza.
Strategic Property Sourcing|Búsqueda estratégica
Acquisition|Adquisición
Listing & Market Positioning|Presentación y posicionamiento
Positioning|Posicionamiento
Client & Investor Alignment|Objetivos e inversión
Alignment|Afinidad
Negotiation & Closing|Negociación y cierre
Execution|Concreción
A More Human Way to Buy and Sell Property|Una forma más humana de comprar y vender
Trust Over Transactions.|Primero, la confianza.
My role is to guide people through complex decisions with honesty, discretion, and a deep respect for what this moment actually means in their lives.|Mi trabajo es acompañarte en decisiones importantes con honestidad, discreción y respeto por lo que este momento significa para vos.
Every client comes with a different story — a family relocating, an investor protecting long-term value, a couple searching for a first home, or an owner ready to move on from a place full of memories.|Cada persona llega con una historia: una familia que se muda, alguien que quiere invertir, una pareja que busca su primer hogar o quien se despide de una casa llena de recuerdos.
About me|Sobre mí
Featured|Destacadas
Selected for its architectural clarity, livability, and long-term investment potential.|Elegidas por su arquitectura, su calidad de vida y su valor a largo plazo.
Listings|Propiedades
Coastal Private Residence|Residencia de la Costa
Price contact us|Precio a consultar
Cliffside Contemporary Villa|Villa del Acantilado
Modern Hillside Retreat|Refugio de la Ladera
Urban Luxury Penthouse|Ático Urbano
Countryside Estate|Finca del Campo
why us|por qué elegirnos
A personal approach designed around trust, clarity, and results.|Una mirada personal, basada en la confianza, la claridad y los resultados.
Properties Advised|Propiedades asesoradas
Transaction Volume|Volumen de operaciones
Client Retention|Clientes que vuelven
Proven Approach|Experiencia que acompaña
Trusted by 120+ clients|Más de 120 clientes nos eligieron
Behind every number is a series of deliberate decisions. From sourcing opportunities to evaluating risk and potential, each step is guided by insight, experience, and a focus on outcomes that hold up over time.|Detrás de cada número hay decisiones cuidadosas. Desde la búsqueda hasta la evaluación de cada oportunidad, te acompaño con experiencia y una mirada de largo plazo.
Schedule a call|Coordinemos una charla
how it works|cómo trabajamos
Every Move Begins With a Conversation|Todo empieza con una conversación
Discover|Descubrir
We start with a conversation.Understanding what matters to you, beyond just specs and price.|Empezamos por escucharte. Queremos entender qué te importa, más allá de los metros y el precio.
refine|seleccionar
From there, we narrow things down. Filtering locations, properties, and opportunities that actually fit your lifestyle, pace, and long-term plans.|Seleccionamos ubicaciones y propiedades que acompañen tu estilo de vida, tus tiempos y tus planes.
secure|concretar
When it feels right, move with clarity. Handling negotiations, legal steps, and every detail in between—so you can move forward with confidence, not pressure.|Cuando encontrás el lugar indicado, te acompañamos en la negociación y en cada detalle del proceso para que avances con tranquilidad.
View properties|Ver propiedades
Built to guide property decisions with clarity, strategy, and confidence across every stage from sourcing to successful closing|Claridad, estrategia y confianza en cada etapa, desde la primera búsqueda hasta el cierre.
TESTIMONIALS|TESTIMONIOS
The Experience|La experiencia
Real experiences from buyers and sellers who value discretion, clarity, and a more thoughtful way to navigate important property decisions.|Historias de quienes valoran la discreción, la claridad y el acompañamiento en sus decisiones inmobiliarias.
“Everything was handled with discretion and care.” From viewings to final documents, Ana stayed involved and attentive.|«Todo se manejó con discreción y cuidado». Ana estuvo presente desde las visitas hasta la documentación final.
“Clear, responsive, and very easy to work with.” Ana kept communication simple and honest throughout the process.|«Clara, atenta y muy fácil de tratar». Ana mantuvo una comunicación sencilla y honesta durante todo el proceso.
Happy clients|Clientes satisfechos
Where trust is earned and results are delivered.|La confianza se construye con hechos.
“Buying a property felt overwhelming at first, but Ana made every step clear and manageable.”|«Comprar una propiedad parecía abrumador, pero Ana hizo que cada paso fuera claro y posible».
“Ana understood exactly what we were looking for — even the things we couldn’t clearly articulate. Every recommendation felt intentional.”|«Ana entendió lo que buscábamos, incluso lo que no sabíamos explicar. Cada recomendación tenía sentido».
San Javier, Spain|San Javier, España
Madrid, Spain|Madrid, España
Salamanca, Spain|Salamanca, España
Burgos, Spain|Burgos, España
FEATURED IN|PUBLICACIONES
insights|ideas
Insights|Ideas
Articles & Insights.|Artículos e ideas.
See all|Ver todos
Why the Right Home Is About More Than Square Meters|Un hogar es mucho más que metros cuadrados
Why Advisory Beats Brokerage|El valor de un buen asesoramiento
The Difference Between a House and a Home|La diferencia entre una casa y un hogar
Why Location Still Beats Everything Else|Por qué la ubicación sigue siendo clave
When to Buy, When to Wait|Cuándo comprar y cuándo esperar
The Quiet Costs of a “Great Deal”|Los costos ocultos de una gran oferta
Buying Property Without Regret|Comprar con confianza
How lifestyle, timing, and long-term value quietly shape the smartest property decisions.|Cómo tu estilo de vida, tus tiempos y tus planes influyen en la elección de una propiedad.
The case for guidance over transactions in high-stakes property decisions.|Por qué el acompañamiento importa tanto al tomar una decisión inmobiliaria.
Why emotional alignment matters just as much as financial logic.|La afinidad con un lugar también forma parte de una buena decisión.
Even in a remote world, geography remains the single biggest variable in property value.|Incluso en un mundo conectado, el lugar sigue marcando la diferencia.
How timing actually works in real estate — and why most people get it wrong.|Cómo encontrar tu momento para dar el próximo paso.
Why the cheapest property is often the most expensive one you’ll ever own.|Los detalles que conviene mirar más allá del precio publicado.
A practical framework for making confident, long-term real estate decisions.|Una guía para elegir con claridad y una mirada de largo plazo.
newsletter|novedades
Step inside|Pasá y conocé
Join the list for early access to new properties, private viewings, and market insights.|Recibí novedades de propiedades, visitas privadas e ideas para tu próxima búsqueda.
FAQ|PREGUNTAS FRECUENTES
Your Questions, Answered|Respuestas a tus preguntas
Let’s talk.|Conversemos.
I represent selected homes, developments, and land opportunities across focused locations.|Una selección de viviendas, desarrollos y terrenos en ubicaciones con carácter.
Name|Nombre
Jane Smith|Tu nombre
Jane@smith.com|tu@email.com
Tell me what kind of property you’re looking for…|Contanos qué tipo de propiedad estás buscando…
submit|Suscribirme
Email|Correo electrónico
Message|Mensaje
Submit|Enviar consulta
Contact|Contacto
We’re Here to Help|Estamos para acompañarte
Home|Inicio
about|sobre mí
Luxury Property, Advised Properly|Propiedades especiales. Asesoramiento personal.
© 2026 Ana Costa. All rights reserved.|© 2026 Ignacio Weppler. Adaptación y desarrollo web.
Privacy Policy|Política de privacidad
Terms & Conditions|Términos de uso
Property Advisor|Asesora inmobiliaria
Book a call|Coordiná una charla
Checkout|Demostración
Buy template|Ver portfolio
Each transaction is handled with the same standards of discretion, strategy, and personal involvement — regardless of size or visibility.|Cada operación recibe el mismo cuidado: discreción, estrategia y acompañamiento personal.
See details|Ver detalles
My Story|Mi historia
The story behind how I work, what I believe about real estate, and what clients can expect when we work together.|Mi manera de trabajar, mi mirada sobre el mercado y lo que podés esperar de este acompañamiento.
A Different Way to Work in Real Estate|Otra forma de entender el mundo inmobiliario
real estate consultant|asesora inmobiliaria
experience|experiencia
Experience, Trust, and Measurable Progress|Experiencia, confianza y una trayectoria compartida
Ana Costa Advisory|Asesoramiento Ana Costa
Private Client Advisor of the Year|Asesora de clientes privados del año
European Property Networkhe Year|Red Europea de Propiedades
€50M+ Annual Transaction Volume|Más de 50 millones de euros en operaciones anuales
Independent Milestone|Trayectoria independiente
Top 5% Client Satisfaction Rating|Entre las mejores valoraciones de clientes
Private Client Reviews|Opiniones de clientes
International Client Advisory|Asesoramiento internacional
Expansion Into Cross-Border Transactions|Expansión a operaciones internacionales
Portugal & Spain Markets|Mercados de Portugal y España
Luxury Residential Advisory|Asesoramiento residencial de alta gama
Off-Market Transaction Specialist|Especialista en operaciones privadas
Private Client Mandatesgerian Legal Awards|Representación de clientes privados
100th Client Milestone|Los primeros 100 clientes
Independent Practice|Práctica independiente
Private Seller Representation|Representación de propietarios
Discreet €8.5M Property Sale|Venta privada por 8,5 millones de euros
Coastal Portugal|Costa de Portugal
Relocation Advisory|Asesoramiento para mudanzas
International Buyer Specialist|Especialista en compradores internacionales
Madrid & Lisbon|Madrid y Lisboa
70% Referral-Based Clients|70 % de clientes por recomendación
Client Retention Metric|Relaciones de largo plazo
All images|Ver todas las fotos
Restored farmhouse with guest house and landscaped grounds.|Casa de campo restaurada, con alojamiento de invitados y jardines.
Type|Tipo
Farmhouse|Casa de campo
Plot Size|Superficie del terreno
Built Size|Superficie construida
Ownership|Titularidad
Private|Privada
Energy label|Calificación energética
Bedrooms|Dormitorios
Bathrooms|Baños
Facilities|Comodidades
Swimming Pool, Private Garden, Gym, 24/7 Security, Double Garage|Pileta, jardín privado, gimnasio, seguridad y cochera doble
Swimming Pool, Private Garden, Gym, 24/7 Security, Smart Home System, Double Garage|Pileta, jardín privado, gimnasio, seguridad, domótica y cochera doble
About property|Sobre la propiedad
other properties|otras propiedades
Contemporary villa with open views and architectural clarity.|Villa contemporánea con vistas abiertas y una arquitectura serena.
Villa|Villa
Penthouse|Ático
Family|Familiar
Mike Family|Familia Mike
Modern Luxury Villa|Villa contemporánea
Mediterranean villa|Villa mediterránea
Top-floor apartment with private terrace and city views.|Departamento en la última planta, con terraza privada y vistas a la ciudad.
A refined top-floor residence designed around light, privacy, and uninterrupted sea views. Clean interiors with a layout that prioritizes calm and openness.|Una residencia pensada alrededor de la luz, la privacidad y las vistas al mar. Interiores serenos y una distribución abierta.
Four-bedroom villa with panoramic sea views and full privacy.|Villa de cuatro dormitorios con vistas panorámicas al mar y privacidad.
A modern villa positioned above the coastline, offering open living spaces, natural light throughout, and uninterrupted ocean views. Designed for privacy and long-term comfort.|Una villa contemporánea sobre la costa, con ambientes abiertos, luz natural y vistas al océano. Diseñada para la privacidad y el confort.
Featured|Destacadas
See solutions|Conocé más
All|Todas
Apartment|Departamento
Plot|Terreno
Filtered for Quality|Elegidas con criterio
More Than a Property.|Mucho más que una propiedad.
Every home we represent is chosen for more than its location. We look at light, flow, craftsmanship, and the feeling it creates when you walk through the door. Because the right property doesn’t just fit your budget — it fits your life.|Miramos la luz, la distribución, los materiales y lo que sentís al entrar. La propiedad indicada acompaña tu presupuesto y también tu forma de vivir.
Get matched privately|Encontrá tu lugar
Posted|Publicado
Jan 23, 2026|23 de enero de 2026
Jan 13, 2026|13 de enero de 2026
Jan 21, 2026|21 de enero de 2026
Jan 14, 2026|14 de enero de 2026
Jan 10, 2026|10 de enero de 2026
Jan 22, 2026|22 de enero de 2026
What areas do you specialize in?|¿En qué zonas trabajás?
Do you work with both buyers and sellers?|¿Acompañás a compradores y vendedores?
How is working with you different from a typical agency?|¿Qué diferencia este acompañamiento del de una inmobiliaria?
Do you only handle luxury properties?|¿Trabajás solo con propiedades de alta gama?
How do you price a property for sale?|¿Cómo definís el precio de venta?
Can you help with off-market or private listings?|¿También ofrecés propiedades fuera del mercado público?
What’s your process for buyers?|¿Cómo es el proceso para comprar?
`;
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replaceAll('&nbsp;', ' ');
const plain = value => decode(value.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const dictionary = new Map(lines.trim().split('\n').map(line => { const split = line.indexOf('|'); return [line.slice(0, split), line.slice(split + 1)]; }));
const paragraphs = JSON.parse(await readFile('scripts/castas-paragraphs-es.json', 'utf8'));
const translate = value => dictionary.get(value) || Object.entries(paragraphs).find(([prefix]) => value.startsWith(prefix))?.[1];

for (const file of (await readdir('src/data/castas', { recursive: true })).filter(file => file.endsWith('.html'))) {
  const filename = 'src/data/castas/' + file;
  let html = await readFile(filename, 'utf8');
  html = html.replace('lang="en"', 'lang="es-AR"')
    .replace(/<(p|h[1-6])\b([^>]*)>([\s\S]*?)<\/\1>/g, (all, tag, attrs, inner) => {
      const translated = translate(plain(inner));
      return translated ? `<${tag}${attrs}>${escape(translated)}</${tag}>` : all;
    })
    .replace(/<div([^>]*)>((?:[^<]|<\/?span\b[^>]*>|<br\b[^>]*>)*)<\/div>/g, (all, attrs, inner) => {
      const translated = translate(plain(inner));
      return translated ? `<div${attrs}><span style="color:#d1ccbf">${escape(translated)}</span></div>` : all;
    })
    .replace(/>([^<>]+)</g, (all, text) => { const translated = translate(plain(text)); return translated ? `>${escape(translated)}<` : all; })
    .replace(/\b(placeholder|aria-label|value)="([^"]*)"/g, (all, key, value) => {
      const translated = translate(decode(value));
      return translated ? `${key}="${escape(translated)}"` : all;
    })
    .replace(/href="https:\/\/(?:calendly\.com|buy\.polar\.sh)[^"]*"/g, 'href="#contact"')
    .replace(/href="(?:tel:|mailto:)[^"]*"/g, 'href="https://ignacioweppler.dev"')
    .replace(/href="https:\/\/(?:x|linkedin|facebook|instagram)\.com[^"]*"/g, 'href="https://ignacioweppler.dev"')
    .replaceAll('hello@anacosta.com', 'ignacioweppler.dev')
    .replaceAll('anacosta@gmail.com', 'ignacioweppler.dev')
    .replaceAll('(821) 1248 812', 'Conocé mi trabajo')
    .replaceAll('821 1248 812', 'Ver portfolio');
  html = html.replaceAll('loading="lazy"', 'loading="eager"');
  html = html.replace(/\balt="([^"]*)"/g, (all, value) => {
    if (!value || /[áéíóúñ]/i.test(value)) return all;
    const description = /portrait|woman|women|businessman/i.test(value) ? 'Retrato de una persona de la comunidad Castas.'
      : /abstract|geometric|visualization/i.test(value) ? 'Composición de luz, texturas y formas arquitectónicas.'
      : /laptop|handshake|documents/i.test(value) ? 'Asesoramiento personal y revisión de documentación.'
      : /aerial|neighborhood/i.test(value) ? 'Vista aérea del barrio y su entorno.'
      : /village|coastal|sea|ocean/i.test(value) ? 'Arquitectura y paisaje junto a la costa.'
      : 'Propiedad contemporánea con materiales naturales y espacios abiertos al paisaje.';
    return `alt="${description}"`;
  });
  const title = file === 'index.html' ? 'Propiedades con carácter' : plain(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] || 'Propiedades con carácter');
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)} — Castas</title>`);
  html = html.replace(/(<meta[^>]*(?:name|property)="(?:description|og:description|twitter:description)"[^>]*content=")[^"]*(")/g, '$1Propiedades con carácter. Una mirada personal sobre la arquitectura, la calidad de vida y el lugar que elegís habitar.$2');
  if (!html.includes('class="castas-credit"')) html = html.replace('</body>', '<aside class="castas-credit">Adaptación y desarrollo por <a href="https://ignacioweppler.dev" target="_blank" rel="noopener">Ignacio Weppler</a> · <a href="/">Volver a Arquitect</a>. Sitio de demostración: propiedades, cifras y testimonios ilustrativos. Los formularios no envían datos.</aside></body>');
  await writeFile(filename, html);
}
console.log('Castas adaptado al español, con créditos de Ignacio Weppler.');
