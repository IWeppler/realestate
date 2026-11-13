import { readFile, writeFile, readdir } from 'node:fs/promises';

const translations = `
Scroll down|Deslizá para explorar
Menu|Menú
menu|menú
Builds|Proyectos
Studio|Estudio
Services|Servicios
Contact|Contacto
Get a Quote|Solicitá una propuesta
follow us|seguinos
Explore|Explorar
Contact us|Contactanos
Contact Us|Contactanos
Architecture|Arquitectura
That Belongs.|en su lugar.
En su lugar.|en su lugar.
Grounded – Architecture That Belongs|Grounded – Arquitectura en su lugar
our why|nuestra razón de ser
We design buildings that respond to landscape, material, and light. Not in spite of where they are, but because of it.|Diseñamos espacios que responden al paisaje, los materiales y la luz. Cada proyecto nace del lugar que habita.
Years of Practice|Años de experiencia
Projects Completed|Proyectos realizados
Industry Awards|Reconocimientos
our services|nuestros servicios
Residential|Residencial
Commercial|Comercial
Commerial|Comercial
Planning Applications|Trámites y permisos
Planning Application|Trámites y permisos
Design Development|Desarrollo del proyecto
Construction Documentation|Documentación de obra
Contract Admin|Dirección de obra
Contract Administration|Dirección de obra
We take projects from first concept through to construction. Handling design, planning, documentation, and on-site administration along the way.|Acompañamos cada proyecto desde la primera idea hasta la obra terminada. Nos ocupamos del diseño, los permisos, la documentación y la dirección de obra.
see our Services|Conocé nuestros servicios
Our Builds|Nuestros proyectos
our builds|nuestros proyectos
Good buildings don't shout. They settle into their surroundings, age gracefully, and make the people inside them feel at ease. These projects are our attempt at exactly that.|La buena arquitectura se integra a su entorno, envejece con dignidad y hace que las personas se sientan a gusto. Estos proyectos expresan esa búsqueda.
Good buildings don’t shout. They settle into their surroundings, age gracefully, and make the people inside them feel at ease. These are ours.|La buena arquitectura se integra a su entorno, envejece con dignidad y hace que las personas se sientan a gusto. Estos son nuestros proyectos.
Karri Valley Retreat|Refugio Karri
The Dune House|Casa Duna
Dune House|Casa Duna
Swan Valley Studio|Estudio Swan Valley
Residential Property|Vivienda residencial
Explore All Projects|Explorá todos los proyectos
Featured in|Publicaciones
Our Process|Nuestro proceso
We don't impose. We listen to the land. Every site has a logic. A grain, a light, a material memory. Our work starts there. The result is architecture that feels inevitable rather than placed.|Escuchamos al lugar. Cada terreno tiene su lógica: una textura, una luz, una memoria material. Nuestro trabajo empieza ahí. El resultado es una arquitectura que parece haber estado siempre.
We Listen|Escuchamos
Listen|Escuchar
Starting with your site, your brief, and your budget. No assumptions are ever made.|Empezamos por tu terreno, tus necesidades y tu presupuesto. Cada decisión nace de escucharte.
learn more|Conocé más
Design|Diseñamos
Iterative, collaborative, and grounded in what the site and client is asking for.|Un proceso colaborativo que evoluciona con las necesidades de cada persona y cada lugar.
Deliver|Construimos
We stay involved through construction. The finer detail matters just as much as the initial concept.|Acompañamos toda la obra. El último detalle importa tanto como la primera idea.
Client Perspective|La mirada de quienes habitan
Home Owners|Propietarios
Bakehouse owners|Dueños de la panadería
Winery Owner|Propietaria de la bodega
The Nguyen Family|Familia Nguyen
RECOGNITION|RECONOCIMIENTOS
Award|Premio
New house over 200m²|Vivienda nueva de más de 200 m²
Shortlisted|Finalista
Best new residential|Mejor vivienda nueva
Commendation|Mención
Sustainable architecture|Arquitectura sustentable
Small project of the year|Proyecto pequeño del año
Featured|Publicado
Design & architecture|Diseño y arquitectura
House of the year|Casa del año
Living well|Calidad de vida
Commercial architecture|Arquitectura comercial
Regional practice spotlight|Estudio regional destacado
Material & craft|Materiales y oficio
Architecture & design|Arquitectura y diseño
Australian residential|Vivienda australiana
Got a project in mind?|¿Tenés un proyecto en mente?
We’d love to hear about it.|Nos encantaría conocerlo.
Let's Talk|Hablemos
Grounded is a concept website by|Adaptación y desarrollo web por
Jake Bougouneau.|Ignacio Weppler.
Jake Bougouneau|Ignacio Weppler
Want a site like this? Get in touch.|¿Querés una web para tu estudio? Hablemos.
All images AI-generated, all awards fictional.|Sitio conceptual. Imágenes generadas con IA y premios ficticios.
Linkedin: Jake Bougouneau|Portfolio de Ignacio Weppler
jake@neauflow.com|Ver mi trabajo
www.neauflow.com|ignacioweppler.dev
https://www.neauflow.com|https://ignacioweppler.dev
Privacy Policy|Política de privacidad
Terms of Service|Términos de uso
© 2026 Neauflow. All rights reserved.|© 2026 Ignacio Weppler. Adaptación y desarrollo web.
Builds /|Proyectos /
Studio /|Estudio /
The Silver House|Casa Plateada
Silver House|Casa Plateada
The Ridge House|Casa de la Ladera
Ridge House|Casa de la Ladera
Inlet River House|Casa del Estuario
The Inlet|Casa del Estuario
WA Bakehouse|Panadería Wheatbelt
Wheatbelt Bakehouse|Panadería Wheatbelt
The Heath House|Casa del Matorral
Heath House|Casa del Matorral
Got a project in mind? Grounded is currently taking enquiries for 2026 projects, so get in touch to secure your spot.|¿Tenés un proyecto en mente? Contanos qué imaginás y conversemos sobre cómo hacerlo realidad.
Get in Touch|Conversemos
Where to find us|Dónde estamos
Have a project in mind?|Contanos tu proyecto
First name|Nombre
Last name|Apellido
Email|Correo electrónico
Phone number|Teléfono
Which services do you require?|¿Qué servicios necesitás?
Approximate construction budget?|¿Cuál es tu presupuesto aproximado de obra?
Under $100K|Menos de USD 100 mil
$500K – $1M|USD 500 mil a 1 millón
$100K – $250K|USD 100 mil a 250 mil
$1M – $2.5M|USD 1 millón a 2,5 millones
$250K – $500K|USD 250 mil a 500 mil
$2.5M +|Más de USD 2,5 millones
Prefer not to say|Prefiero no indicarlo
Message|Mensaje
I accept the|Acepto los
Terms|términos de uso
Thank you! Your submission has been received!|Esta es una demostración. No se enviaron tus datos.
Oops! Something went wrong while submitting the form.|No se pudo completar la acción. Volvé a intentarlo.
Type your message...|Contanos sobre tu proyecto…
Submit|Enviar consulta
Last updated:|Última actualización:
August 2026|Agosto de 2026
Grounded is a fictional brand created as a design and development portfolio project by|Grounded es una marca ficticia. Adaptación y desarrollo de esta versión por
, founder of Neauflow.|, desarrollador web.
This website exists solely to demonstrate branding, UX, UI design, copywriting and Webflow development. It does not represent a real architecture practice or commercial business.|Este sitio muestra una propuesta de identidad, experiencia de usuario y desarrollo web. No representa un estudio de arquitectura ni una empresa real.
Information We Collect|Información que recopilamos
If you choose to contact us through the website, we may collect information you voluntarily provide, such as:|El formulario es una demostración: la información que ingresás permanece en tu navegador y no se envía. Sus campos incluyen:
Your name|Tu nombre
Email address|Correo electrónico
Any information included in your message|La información incluida en tu mensaje
We may also collect anonymous website usage information through analytics tools to understand how visitors use the site and to improve the experience.|Esta versión no incluye las herramientas de análisis de visitas del sitio de referencia.
How Your Information Is Used|Uso de la información
Any information collected is used only to:|En esta demostración no se procesan consultas. Los campos permiten explorar cómo sería:
Respond to enquiries|Realizar una consulta
Improve the website|Compartir las necesidades de un proyecto
Monitor website performance and usage|Indicar un presupuesto aproximado
We do not sell or rent your personal information.|No vendemos ni alquilamos información personal.
This website may use cookies and similar technologies to improve performance, understand visitor behaviour and provide analytics.|El sitio utiliza almacenamiento de sesión para recordar si ya viste la animación de entrada.
You can disable cookies through your browser settings if you prefer.|Podés borrar los datos del sitio desde la configuración de tu navegador.
Third-Party Services|Servicios de terceros
The website may use trusted third-party services such as hosting, analytics or embedded content. These providers may process limited information necessary to provide their services.|Los enlaces externos te llevan a sitios de terceros, que tienen sus propias políticas de privacidad.
Fictional Content|Contenido conceptual
Grounded is a fictional company created for portfolio purposes.|Grounded es una empresa ficticia presentada como ejercicio de diseño web.
Unless explicitly stated otherwise:|Salvo que se indique lo contrario:
All projects are fictional.|Los proyectos son ficticios.
All awards, recognitions and industry claims are fictional.|Los premios, reconocimientos y afirmaciones profesionales son ficticios.
All testimonials are fictional.|Los testimonios son ficticios.
All statistics and business claims are illustrative.|Las estadísticas y cifras son ilustrativas.
Images throughout the website are AI-generated or digitally created for demonstration purposes.|Las imágenes fueron generadas con IA o creadas digitalmente con fines de demostración.
Nothing on this website should be interpreted as representing a real business, client relationship or commercial offering.|El contenido no representa una empresa real, una relación con clientes ni una oferta de servicios de arquitectura.
Your Rights|Tus datos
If you have submitted personal information and would like it updated or removed, please get in touch and we will respond within a reasonable timeframe.|El formulario no transmite ni guarda información personal. Si querés consultar sobre este sitio, podés hacerlo a través del portfolio del desarrollador.
Creator|Desarrollo de esta versión
This project was created by|Esta adaptación fue desarrollada por
as a portfolio piece.|como parte de su portfolio.
To learn more about Jake or his client work, visit|Para conocer más trabajos de Ignacio, visitá
For questions about this Privacy Policy, please contact Jake through Neauflow.|Para consultas sobre esta versión, contactá a Ignacio a través de su portfolio.
Our Services|Nuestros servicios
Everything you need to take a project from first idea to finished building. Nothing you don’t.|Todo lo que necesitás para llevar un proyecto de la primera idea a la obra terminada.
We offer a full suite of architectural services, structured to take on as much or as little of the process as your project requires. Most clients engage us end-to-end. Some come to us mid-project.|Ofrecemos servicios de arquitectura que se adaptan a cada proyecto. Podemos acompañarte de principio a fin o sumarnos en una etapa específica.
Residential Design|Diseño residencial
Commercial Design|Diseño comercial
Our core work. New homes, extensions, and alterations for private clients who want architecture that’s genuinely responsive to where they live and how they live in it. We take on a small number of residential projects each year to make sure each one gets the attention it deserves.|Diseñamos viviendas, ampliaciones y reformas que responden al lugar y a la vida de quienes las habitan. Trabajamos en pocos proyectos a la vez para dedicarle a cada uno la atención que merece.
Workplaces, hospitality venues, and mixed-use buildings that work hard for the people who use them every day. We bring the same material honesty and site-responsiveness to commercial work that we bring to houses — the scale changes, but the approach doesn’t.|Creamos espacios de trabajo, locales gastronómicos y edificios de usos mixtos pensados para quienes los usan todos los días. Cambia la escala, pero se mantienen el cuidado de los materiales y el diálogo con el entorno.
The planning process is rarely straightforward. We manage it from first submission through to approval — preparing documentation, liaising with council, and handling objections when they arise. We know how to present a project in a way that answers the questions planners will ask before they ask them.|Gestionamos los permisos desde la presentación hasta la aprobación. Preparamos la documentación, coordinamos con las autoridades y resolvemos las observaciones para que el proyecto pueda avanzar.
The planning process is rarely straightforward. We manage it from first submission through to approval — preparing documentation, liaising with council, and handling objections when they arise. We know how to present a project in a way that answers the questions planners will ask before they do.|Gestionamos los permisos desde la presentación hasta la aprobación. Preparamos la documentación, coordinamos con las autoridades y resolvemos las observaciones para que el proyecto pueda avanzar.
The stage where a concept becomes a building. We work through structure, materials, and detail in close collaboration with the client and consultants until every decision is resolved. This is where most of the important work happens — well before a builder is appointed.|Es la etapa en la que una idea se convierte en un edificio. Definimos estructura, materiales y detalles junto al cliente y los especialistas, hasta resolver cada decisión antes de empezar la obra.
Complete, coordinated drawing packages that give builders everything they need to price accurately and build with confidence. We invest the time here so there are fewer surprises on site. Good documentation is one of the most effective cost controls on any project.|Preparamos planos completos y coordinados para presupuestar con precisión y construir con claridad. Una buena documentación reduce imprevistos y ayuda a controlar los costos de la obra.
We stay involved through construction because the detail matters as much as the concept. We review progress against the drawings, manage variations, certify payments, and act as your advocate on site — making sure what’s built matches what was designed.|Acompañamos la construcción porque cada detalle importa. Revisamos los avances, gestionamos cambios, certificamos trabajos y cuidamos tus intereses para que la obra responda al proyecto.
We start with your site, your brief, your budget. No assumptions. Before a line is drawn we spend time on site, reading the light, the views, what's worth preserving. That listening is where the architecture begins.|Empezamos por tu terreno, tus necesidades y tu presupuesto. Antes de dibujar, recorremos el lugar para entender la luz, las vistas y lo que vale la pena conservar. Ahí empieza la arquitectura.
Iterative and grounded in what the site and client ask for. We work in close dialogue — sharing ideas early, testing them honestly, changing direction when something isn't right. By documentation, every decision has been resolved.|Trabajamos en diálogo con vos y con el lugar. Compartimos ideas desde el principio, las ponemos a prueba y ajustamos el rumbo cuando hace falta. Cada decisión queda resuelta en la documentación.
We stay involved through construction — the detail matters as much as the concept. We visit site, review progress against the drawings, act as your advocate when decisions need to be made fast. Our job finishes when the building works exactly as designed.|Seguimos presentes durante la obra: visitamos el lugar, revisamos los avances y te acompañamos en las decisiones. Nuestro trabajo termina cuando el edificio funciona tal como fue pensado.
The Studio|El estudio
We don’t impose. We only listen to the land. Every site has a logic. A grain, a light, a material memory.|Escuchamos al lugar. Cada terreno tiene su lógica, una textura, una luz y una memoria material.
Studio Origin|Nuestro origen
Grounded began in 2004 when founder Tom Alcott returned from three years working with a practice in rural Japan. He came back with a conviction that architecture in Australia had become too concerned with how buildings looked from the road, and not nearly concerned enough with how they felt to live in — and how they sat in the landscape around them. The first project was a small timber house in the Pemberton forest. It won nothing. But the clients still live in it and haven’t changed a thing.|Grounded nació en 2004, cuando Tom Alcott volvió de trabajar tres años en un estudio rural de Japón. Regresó con una convicción: la arquitectura debía prestar más atención a cómo se vive un espacio y a su relación con el paisaje. El primer proyecto fue una pequeña casa de madera en el bosque de Pemberton. No ganó premios, pero sus habitantes siguen viviendo allí sin haber cambiado nada.
Why we exist|Por qué hacemos lo que hacemos
Because most buildings fight their sites. We exist to change that. To make architecture that starts with the land, reads its grain and light and material logic, and responds rather than imposes. The result is buildings that feel like they belong — to their place, their climate, and the people who inhabit them.|Creemos en una arquitectura que nace del terreno. Leemos sus texturas, su luz y sus materiales para crear edificios que pertenezcan al lugar, a su clima y a las personas que los habitan.
Our Values|Nuestros valores
material|materialidad
We use materials for what they are, not what they can be made to look like. Timber weathers. Concrete marks. Steel rusts at the edges. We design for that, not against it.|Elegimos los materiales por lo que son. La madera cambia con el tiempo, el hormigón guarda marcas y el acero se oxida. Diseñamos acompañando esas transformaciones.
Restraint|Mesura
The best building on any site is usually the quietest one. We resist the urge to add more and ask instead what can be taken away without loss.|Muchas veces, el mejor edificio es el más silencioso. Antes de sumar, nos preguntamos qué podemos quitar sin perder lo esencial.
Understanding|Comprensión
Every client knows something about what they want that they haven’t said yet. Every site has a logic that reveals itself slowly. Our job is to be patient enough to hear both.|Cada persona guarda deseos que todavía no pudo expresar. Cada terreno revela su lógica de a poco. Nuestro trabajo es tener la paciencia para escuchar a ambos.
our people|nuestro equipo
A small team of eight architects and designers. We work closely, share credit generously, and take collective responsibility for everything that leaves the studio under the Grounded name.|Un equipo de ocho arquitectos y diseñadores. Trabajamos en colaboración, compartimos los logros y asumimos juntos la responsabilidad de cada proyecto del estudio.
Our Team|Nuestro equipo
Founder & Principal Architect|Fundador y director
Senior Architect|Arquitecta sénior
Associate Architect|Arquitecta asociada
Senior Architectural Designer|Diseñadora de arquitectura sénior
Project Architect|Arquitecto de proyecto
Architectural Designer|Diseñadora de arquitectura
Graduate Architect|Arquitecto
Studio Dog|Compañero del estudio
the proof|nuestra trayectoria
Twenty years of practice. Over 140 completed projects across residential, commercial, and public sectors. A small but growing list of awards from the institutions we respect most.|Veinte años de práctica y más de 140 proyectos residenciales, comerciales y públicos. Una trayectoria ilustrativa que forma parte de este estudio conceptual.
Credentials|Reconocimientos
Welcome to Grounded.|Te damos la bienvenida a Grounded.
By using this website, you agree to the following terms.|El uso de este sitio está sujeto a los siguientes términos.
Portfolio Project|Proyecto de portfolio
Grounded is a fictional brand created solely as a portfolio project by|Grounded es una marca ficticia. Esta versión fue adaptada y desarrollada por
The website demonstrates branding, web design, copywriting, animation and Webflow development skills.|El sitio presenta una propuesta de identidad, diseño web, contenidos, animación y desarrollo.
It is not a real business and does not provide commercial architectural services.|No representa una empresa real ni ofrece servicios profesionales de arquitectura.
Unless clearly identified otherwise:|Salvo indicación expresa:
Grounded is fictional.|Grounded es una marca ficticia.
Projects are fictional.|Los proyectos son ficticios.
Awards, certifications, testimonials and industry recognition are fictional.|Los premios, certificaciones, testimonios y reconocimientos son ficticios.
Business history, achievements and claims are fictional.|La historia del estudio, sus logros y afirmaciones son ficticios.
Team members may be fictional or AI-generated.|Los integrantes del equipo pueden ser ficticios o generados con IA.
Images throughout the website are AI-generated or created for illustrative purposes.|Las imágenes fueron generadas con IA o creadas con fines ilustrativos.
The content has been created to showcase design capability rather than document a real organisation.|El contenido presenta una propuesta de diseño y no documenta una organización real.
Intellectual Property|Propiedad intelectual
The design, layout, copy, branding, graphics and code remain the intellectual property of Jake Bougouneau unless otherwise stated.|Esta versión adapta una referencia visual existente. Los recursos y elementos preexistentes conservan los derechos de sus respectivos titulares; la adaptación y el desarrollo de esta versión corresponden a Ignacio Weppler.
You may browse this website for personal reference but may not copy, reproduce or redistribute substantial portions of the work without written permission.|Podés explorar este sitio como referencia personal. La reutilización de sus recursos está sujeta a los derechos de sus respectivos titulares.
Accuracy|Información del sitio
Although care has been taken to produce a realistic experience, the information presented is intentionally fictional.|Aunque la experiencia busca ser realista, la información presentada es ficticia.
Nothing on this website should be relied upon as factual business information or professional advice.|El contenido no debe interpretarse como información empresarial real ni asesoramiento profesional.
External Links|Enlaces externos
Links to third-party websites are provided for convenience only. We are not responsible for their content or privacy practices.|Los enlaces a sitios de terceros se incluyen como referencia. Cada sitio es responsable de su contenido y sus prácticas de privacidad.
Limitation of Liability|Alcance de la demostración
This website is provided "as is" without warranties of any kind.|Este sitio se presenta como una demostración de diseño y desarrollo web.
To the fullest extent permitted by law, Jake Bougouneau and Neauflow accept no liability arising from the use of this website or reliance on its content.|El contenido es ilustrativo y no sustituye el asesoramiento de un profesional para un proyecto real.
Changes|Cambios
These Terms may be updated from time to time without prior notice. Continued use of the website constitutes acceptance of the updated Terms.|Estos términos pueden actualizarse a medida que evoluciona el sitio. Podés consultar esta página para conocer la versión vigente.
Grounded was conceived, designed and developed by|Adaptación y desarrollo de esta versión por
To view commercial work or get in touch, visit|Para conocer otros trabajos o ponerte en contacto, visitá
Next Project|Proyecto siguiente
Previous Project|Proyecto anterior
Project overview|Sobre el proyecto
Project|Proyecto
Location|Ubicación
Client|Cliente
Completion date|Fecha de entrega
project duration|duración del proyecto
Status|Estado
Complete|Finalizado
Sector|Sector
Architect|Arquitecto
Living room|Estar
Living Room|Estar
View from the deck|Vista desde la terraza
Kitchen|Cocina
The Design thinking|La idea del proyecto
The Challenge|El desafío
The Approach|La propuesta
The Solution|La solución
Concept > Complete|De la idea a la obra
Other Case Studies|Otros proyectos
October 2025|Octubre de 2025
April 2025|Abril de 2025
August 2025|Agosto de 2025
January 2026|Enero de 2026
February 2026|Febrero de 2026
March 2026|Marzo de 2026
June 2026|Junio de 2026
September 2025|Septiembre de 2025
20 Months|20 meses
18 Months|18 meses
18 months|18 meses
16 Months|16 meses
25 Months|25 meses
22 Months|22 meses
14 Months|14 meses
Wine Bar|Barra de degustación
Rammed Earth Wall|Muro de tierra apisonada
Wine Cellar|Cava
Courtyard|Patio
Bathroom|Baño
Hallway|Pasillo
Pool with a view|Pileta con vista
River deck|Terraza sobre el río
Bedroom|Dormitorio
Hospitality|Gastronomía
Dinning Area|Salón
Fresh Bread|Pan recién horneado
Bakehouse Kitchen|Cocina de la panadería
Grounded — Residential & Commercial Architecture, WA|Grounded — Arquitectura residencial y comercial
Our Builds \u007c Grounded Architecture Case Studies, WA|Proyectos — Grounded Arquitectura
Contact Grounded \u007c Fremantle Architecture Studio|Contacto — Grounded Arquitectura
Architectural Services \u007c Grounded, Western Australia|Servicios — Grounded Arquitectura
About the Studio \u007c Grounded Architecture, Fremantle|El estudio — Grounded Arquitectura
`;

const decode = text => text.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&nbsp;/g, ' ');
const normalize = text => decode(text).replace(/\s+/g, ' ').trim();
const dictionary = new Map(translations.trim().split('\n').map(line => {
  const split = line.lastIndexOf('|');
  return [normalize(line.slice(0, split)), line.slice(split + 1)];
}));
const encode = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const projectNames = {
  'karri-valley-retreat': 'Refugio Karri', 'swan-valley-studio': 'Estudio Swan Valley',
  'the-dune-house': 'Casa Duna', 'the-heath-house': 'Casa del Matorral',
  'the-inlet': 'Casa del Estuario', 'the-ridge-house': 'Casa de la Ladera',
  'the-silver-house': 'Casa Plateada', 'wheatbelt-bakehouse': 'Panadería Wheatbelt',
};
const imageDescriptions = [
  [/Modern angular concrete building/i, 'Edificio de hormigón con grandes ventanales, rodeado de plantas y rocas bajo un cielo nublado.'],
  [/placeholder/i, ''],
  [/dog|Australian Shepherd/i, 'Banjo, el perro del estudio, sentado junto a una pared de hormigón.'],
  [/sketch/i, 'Boceto del proyecto y su relación con el paisaje.'],
  [/floor plan|blueprint/i, 'Plano de arquitectura con la distribución y los detalles del proyecto.'],
  [/architect|reviewing|review .*plans|people at a table|people.*review/i, 'El equipo de arquitectura revisa planos, maquetas y materiales en el estudio.'],
  [/drawing.*plans/i, 'Dibujo de planos sobre papel de calcar junto a una maqueta del proyecto.'],
  [/hand.*model/i, 'Trabajo manual sobre una maqueta de arquitectura en el estudio.'],
  [/people standing/i, 'El equipo observa los detalles de una vivienda de madera oscura.'],
  [/family/i, 'Una familia entre los árboles del bosque.'],
  [/couple.*bakery/i, 'Una pareja frente a su panadería.'],
  [/couple.*river|couple.*trees/i, 'Una pareja junto a los árboles y el río.'],
  [/couple.*beach/i, 'Una pareja en la playa con Casa Duna al fondo.'],
  [/couple.*mountain/i, 'Una pareja con las montañas al fondo.'],
  [/couple.*heath/i, 'Una pareja entre la vegetación costera, con vista al mar.'],
  [/couple.*brush/i, 'Una pareja junto al bosque.'],
  [/woman.*vineyard/i, 'La propietaria de la bodega entre las vides y la sala de degustación.'],
  [/salt-and-pepper|dark turtleneck/i, 'Retrato de Tom Alcott, fundador y director del estudio.'],
  [/white blazer/i, 'Retrato de Maya Osei, arquitecta sénior.'],
  [/short dark hair.*green shirt/i, 'Retrato de Claire Nguyen, arquitecta asociada.'],
  [/blond hair/i, 'Retrato de Nadia Volkov, diseñadora de arquitectura.'],
  [/curly brown hair/i, 'Retrato de Daniel Marsh, arquitecto de proyecto.'],
  [/rust-colored shirt/i, 'Retrato de Priya Nair, diseñadora de arquitectura.'],
  [/tousled brown hair/i, 'Retrato de Lachlan Webb, arquitecto del equipo.'],
  [/young man.*white shirt/i, 'Retrato de James Alcott, arquitecto del equipo.'],
  [/bread/i, 'Pan recién horneado en la panadería.'],
  [/oven/i, 'Horno de piedra en la cocina de la panadería.'],
  [/bakery.*counter/i, 'Mostrador de la panadería iluminado con luz cálida.'],
  [/bakery.*kitchen|bakehouse kitchen/i, 'Cocina de producción de la panadería.'],
  [/bakery|bakehouse/i, 'Panadería rural con revestimiento de chapa y luz cálida en su interior.'],
  [/wine cellar/i, 'Cava abovedada con botellas en las paredes y una mesa de degustación central.'],
  [/tasting bar/i, 'Barra de degustación en la bodega.'],
  [/earth wall.*wine/i, 'Muro de tierra apisonada con nichos para exhibir vinos.'],
  [/vine tree/i, 'Raíces de una vid en la tierra del viñedo.'],
  [/vineyard|winery|winey/i, 'La bodega y sus viñedos integrados al paisaje del valle.'],
  [/tree bark/i, 'Detalle de la corteza de los árboles del bosque que inspiraron la vivienda.'],
  [/wooden plank|wood grain/i, 'Detalle de una tabla de madera al natural, con su veta y textura.'],
  [/old wooden wall/i, 'Muro de madera sobre una base de piedra, entre árboles y pastos secos.'],
  [/packed earth wall/i, 'Detalle de las capas y la textura de un muro de tierra apisonada.'],
  [/metal clad exterior detail/i, 'Detalle del revestimiento exterior de chapa.'],
  [/sky light/i, 'Lucernario integrado a la vegetación de la cubierta.'],
  [/concrete walls.*heath/i, 'Detalle de los muros de hormigón y la cubierta vegetal.'],
  [/studio office/i, 'Interior del estudio, con grandes ventanas, escritorios y personas trabajando.'],
  [/dry forest|sunlit woodland|dry grassy/i, 'Árboles y pastos secos iluminados por la luz cálida del sol.'],
  [/swimming pool|pool/i, 'Pileta exterior con vistas a la costa y al océano.'],
  [/bathroom|bath room/i, 'Baño con materiales naturales y vistas al paisaje.'],
  [/bedroom/i, 'Dormitorio abierto a las vistas del entorno.'],
  [/living room/i, 'Estar con grandes ventanales, materiales cálidos y vistas al paisaje.'],
  [/kitchen|kitechen/i, 'Cocina de madera y materiales naturales, conectada con el paisaje.'],
  [/court ?yard/i, 'Patio protegido con vegetación y luz natural.'],
  [/deck|balcony|veranda/i, 'Terraza exterior con vistas al paisaje y al agua.'],
  [/canopy/i, 'Vista de las copas de los árboles desde la terraza.'],
  [/path|walk ?way|entrance|entry way|all way/i, 'Recorrido de acceso a la vivienda entre rocas, árboles y vegetación.'],
  [/forest|woodland|trees|greenery/i, 'Vivienda de madera y vidrio integrada al bosque.'],
  [/river|lake|water/i, 'Vivienda junto al agua, con grandes ventanas y reflejos en la superficie.'],
  [/beach|dune|ocean|sea|coastal|heath/i, 'Vivienda costera integrada a las dunas y la vegetación, con vistas al mar.'],
  [/hill|ridge|mountain|rocky/i, 'Vivienda integrada a una ladera rocosa, abierta hacia las montañas.'],
  [/barn/i, 'Vivienda de madera con techo a dos aguas, integrada al paisaje.'],
];

// Longer project narratives are separate so they remain easy to edit.
const narratives = JSON.parse(await readFile('scripts/grounded-narratives-es.json', 'utf8'));
for (const [english, spanish] of Object.entries(narratives)) dictionary.set(normalize(english), spanish);

for (const file of (await readdir('src/data/grounded', { recursive: true })).filter(file => file.endsWith('.html'))) {
  const filename = `src/data/grounded/${file}`;
  let html = await readFile(filename, 'utf8');
  html = html.replace(/lang="en"/, 'lang="es-AR"');
  // The reference draws the English word “scroll” as vector paths.
  html = html.replace(/<div class="scroll-lottie"[^>]*data-animation-type="lottie"[^>]*><\/div>/g,
    '<div class="scroll-lottie" style="display:flex;align-items:center;justify-content:center;font-size:11px;letter-spacing:.08em">Explorá ↓</div>');
  html = html.replace(/<div id="awwwards"[^>]*>[\s\S]*?<\/a><\/div>/g, '');
  html = html.replace(/<aside class="replica-credit">[\s\S]*?<\/aside>/g, '<aside class="replica-credit">Adaptación y desarrollo por <a href="https://ignacioweppler.dev" target="_blank" rel="noopener">Ignacio Weppler</a> · <a href="/">Volver a Arquitect</a>. Sitio conceptual; imágenes generadas con IA y premios ficticios.</aside>');
  html = html.replace(/<!--[\s\S]*?-->|<script\b[\s\S]*?<\/script>|<style\b[\s\S]*?<\/style>|<[^>]+>|[^<]+/gi, token => {
    if (/^<(script|style)\b/i.test(token)) return token.replace('This is a website replica for demonstration. No information has been sent.', 'Esta es una demostración. No se enviaron tus datos.');
    if (token.startsWith('<!--')) return token;
    if (token.startsWith('<')) return token.replace(/\b(alt|placeholder|aria-label|value|content|data-wait)="([^"]*)"/g, (match, attribute, value) => {
      if (attribute === 'alt' && value && !/[áéíóúñ¿]/i.test(value)) {
        const description = imageDescriptions.find(([pattern]) => pattern.test(decode(value)));
        if (description) return `alt="${encode(description[1])}"`;
      }
      if (attribute === 'data-wait') return 'data-wait="Un momento…"';
      const translated = dictionary.get(normalize(value));
      return translated ? `${attribute}="${encode(translated)}"` : match;
    });
    const translated = dictionary.get(normalize(token));
    return translated ? token.replace(/\S[\s\S]*\S|\S/, encode(translated)) : token;
  });
  const project = Object.entries(projectNames).find(([slug]) => file.replaceAll('\\', '/').includes(`projects/${slug}/`));
  if (project) {
    const title = `${project[1]} — Grounded Arquitectura`;
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
      .replace(/(<meta[^>]*content=")[^"]*("[^>]*(?:property|name)="(?:og:title|twitter:title)"[^>]*>)/g, `$1${title}$2`);
  }
  html = html.replace(/(<meta[^>]*content=")[^"]*("[^>]*(?:property|name)="(?:description|og:description|twitter:description)"[^>]*>)/g,
    `$1${project ? `Conocé ${project[1]}: arquitectura, materiales y paisaje en diálogo.` : 'Grounded: arquitectura residencial y comercial en diálogo con el paisaje, los materiales y la luz.'}$2`);
  html = html.replaceAll('https://www.linkedin.com/in/jakebougouneau', 'https://ignacioweppler.dev')
    .replaceAll('href="https://link"', 'href="https://ignacioweppler.dev"')
    .replaceAll('https://www.neauflow.com/', 'https://ignacioweppler.dev')
    .replaceAll('https://www.neauflow.com', 'https://ignacioweppler.dev')
    .replace(/mailto:jake@neauflow\.com[^"<>]*/g, 'https://ignacioweppler.dev')
    .replace(/mailto:(?:sales@grounded\.com|hello@grounded\.com\.au)/g, 'https://ignacioweppler.dev')
    .replaceAll('sales@grounded.com', 'Conocé mi trabajo')
    .replaceAll('hello@grounded.com.au', 'ignacioweppler.dev');
  await writeFile(filename, html);
}
console.log('Textos y créditos actualizados en las 15 páginas de Grounded.');
