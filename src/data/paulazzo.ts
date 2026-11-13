const baseProperties = [
  { title: 'Casa a estrenar en Santa Rita', location: 'Santa Rita, Villa Carlos Paz', zone: 'santa-rita', type: 'casa', image: 'santa-rita-1.webp', alt: 'Jardín y cochera de la casa a estrenar en Santa Rita.', price: 'USD 265.000', detail: '4 dormitorios · Pileta · A estrenar', description: 'Espacio para un nuevo comienzo: una casa a estrenar con cuatro dormitorios y pileta en el barrio Santa Rita.', href: '/propiedades/venta-casa-a-estrenar-de-cuatro-dormitorios-con-pileta-en-barrio-santa-rita/' },
  { title: 'Departamento amoblado en el centro', location: 'Centro, Villa Carlos Paz', zone: 'centro', type: 'departamento', image: 'centro-0.webp', alt: 'Balcones y pileta del edificio del departamento en el centro de Carlos Paz.', price: 'USD 89.000', detail: '1 dormitorio · Amoblado', description: 'Un departamento de un dormitorio, amoblado y en pleno centro de Villa Carlos Paz.', href: '/propiedades/venta-departamento-amoblado-de-un-dormitorio-en-pleno-centro-de-carlos-paz/' },
  { title: 'Departamento en Paseo Cibeles', location: 'Paseo Cibeles, Villa Carlos Paz', zone: 'cibeles', type: 'departamento', image: 'cibeles-0.webp', alt: 'Balcón con vistas abiertas del departamento en Paseo Cibeles.', price: 'USD 149.000', detail: '2 dormitorios', description: 'Dos dormitorios y una ubicación en Paseo Cibeles para seguir imaginando tu próxima etapa.', href: '/propiedades/venta-departamento-de-dos-dormitorios-en-paseo-cibeles-2/' },
];

const details = {
  'santa-rita': {
    category: 'Casa', area: '206 m²', bedrooms: '4', bathrooms: '3', land: '480 m²',
    subtitle: 'Una sola planta. Espacios para compartir. Un jardín para disfrutar.',
    paragraphs: [
      'Una casa a estrenar, moderna y funcional, en Santa Rita, a pocas cuadras de la costanera de Villa Carlos Paz. Sus espacios se distribuyen en una sola planta, con un living comedor amplio y una cocina equipada.',
      'Tiene cuatro dormitorios, uno de ellos en suite con vestidor, tres baños completos y lavadero independiente. Afuera, el jardín con pileta y el quincho pergolado con asador y kitchenette invitan a disfrutar la casa durante todo el año.',
    ],
    features: ['Dormitorio principal en suite', 'Vestidor', 'Cocina equipada', 'Lavadero independiente', 'Cochera cubierta', 'Pileta', 'Quincho con asador y kitchenette', 'Aberturas con doble vidrio', 'Calefacción por radiadores', 'Caldera dual y gas natural'],
    facts: [{ label: 'Superficie cubierta', value: '206 m²' }, { label: 'Terreno', value: '480 m²' }, { label: 'Distribución', value: 'Una planta' }, { label: 'Estado', value: 'A estrenar' }, { label: 'Cochera', value: 'Cubierta' }, { label: 'Documentación publicada', value: 'Escritura inmediata' }],
    conditions: 'La publicación indica que es apta crédito y que existe la posibilidad de financiar una parte del valor. Consultá los requisitos y las condiciones vigentes con la inmobiliaria.',
    address: 'Barrio Santa Rita, Villa Carlos Paz',
    locationNote: 'A pocas cuadras de la costanera. La ubicación del barrio es orientativa; consultá la dirección exacta para coordinar una visita.',
    mapQuery: 'Barrio Santa Rita Villa Carlos Paz Cordoba',
    galleryOrder: [1, 8, 7, 2, 0, 6, 4, 3, 5],
    imageLabels: ['Plano de distribución de la casa', 'Jardín y cochera cubierta', 'Baño con doble bacha', 'Baño y paso hacia el dormitorio', 'Vestidor con estantes y espacio de guardado', 'Otra vista del vestidor', 'Circulación y acceso a los ambientes', 'Habitación con ventana al jardín', 'Ambiente luminoso con vistas al jardín'],
  },
  centro: {
    category: 'Departamento', area: '39 m²', bedrooms: '1', bathrooms: '1', land: '',
    subtitle: 'Amoblado y listo para empezar una nueva etapa en el centro.',
    paragraphs: [
      'En el edificio Lake Tower, sobre Lisandro de la Torre, a una cuadra de la peatonal y de la costanera. Un departamento de 39 m² en el segundo piso, con balcón hacia la pileta y vistas a las sierras.',
      'Cuenta con un dormitorio con placard, antebaño y baño completo. Se ofrece totalmente amoblado, con muebles nuevos, aires acondicionados, televisores y conexión para lavarropas. El edificio dispone de tres piletas, SUM, parrillas y seguridad.',
    ],
    features: ['Totalmente amoblado', 'Balcón', 'Vista a la pileta y las sierras', 'Placard completo', 'Aires acondicionados', 'Televisores', 'Conexión para lavarropas', 'Tres piletas', 'SUM y parrillas', 'Seguridad'],
    facts: [{ label: 'Superficie publicada', value: '39 m²' }, { label: 'Edificio', value: 'Lake Tower' }, { label: 'Piso', value: 'Segundo' }, { label: 'Dormitorio', value: 'Con placard' }, { label: 'Amoblamiento', value: 'Incluido' }, { label: 'Cochera', value: 'Opcional' }],
    conditions: 'La cochera se ofrece por separado por USD 10.000. La ficha informa expensas aproximadas de $250.000; los importes y las condiciones deben confirmarse al consultar.',
    address: 'Lisandro de la Torre, centro de Villa Carlos Paz',
    locationNote: 'A una cuadra de la peatonal y de la costanera. Consultá la dirección exacta con la inmobiliaria.',
    mapQuery: 'Lisandro de la Torre Villa Carlos Paz Cordoba',
    galleryOrder: [0, 4, 6, 3, 8, 1, 2, 5, 7],
    imageLabels: ['Edificio Lake Tower y sus piletas', 'Acceso y hall del edificio', 'Vista de las piletas desde el balcón', 'Balcón amoblado con vista a la pileta', 'Estar y acceso al dormitorio', 'Otra vista del balcón y las piletas', 'Cocina integrada y barra', 'Mesada y bacha junto al paso al dormitorio', 'Baño completo con ducha'],
  },
  cibeles: {
    category: 'Departamento', area: '73,36 m²', bedrooms: '2', bathrooms: '2', land: '',
    subtitle: 'Dos dormitorios, balcón al frente y la vida de la ciudad a pasos.',
    paragraphs: [
      'En Paseo Cibeles, sobre Juan B. Justo 155, a dos cuadras de la peatonal de Villa Carlos Paz. Una unidad en el primer piso, al frente, con 73,36 m² de superficie y cochera incluida.',
      'La distribución integra el living comedor con la cocina y se completa con dos dormitorios, dos baños y balcón. La publicación también menciona otra unidad en el segundo piso con la misma distribución; consultá su disponibilidad.',
    ],
    features: ['Dos dormitorios', 'Dos baños', 'Living comedor', 'Cocina integrada', 'Balcón al frente', 'Cochera incluida', 'Primer piso', 'A dos cuadras de la peatonal'],
    facts: [{ label: 'Superficie publicada', value: '73,36 m²' }, { label: 'Edificio', value: 'Paseo Cibeles' }, { label: 'Piso', value: 'Primero' }, { label: 'Orientación de la unidad', value: 'Al frente' }, { label: 'Cochera', value: 'Incluida' }, { label: 'Documentación publicada', value: 'Boleto de compraventa' }],
    conditions: 'La ficha informa expensas de $250.000 mensuales y venta mediante boleto de compraventa. Confirmá los importes, la documentación y la disponibilidad con la inmobiliaria.',
    address: 'Juan B. Justo 155, Villa Carlos Paz',
    locationNote: 'En pleno centro, a dos cuadras de la peatonal.',
    mapQuery: 'Juan B Justo 155 Villa Carlos Paz Cordoba',
    galleryOrder: [0, 7, 2, 6, 3, 4, 5, 1, 8],
    imageLabels: ['Balcón al frente de Paseo Cibeles', 'Parrilla y terraza del edificio', 'Dormitorio con placard', 'Salón de usos múltiples con parrilla y terraza', 'Dormitorio con ventana al exterior', 'Paso de acceso al dormitorio', 'Baño con revestimientos de piedra clara', 'Cocina integrada con barra y salida al balcón', 'Otra vista de la cocina y el estar'],
  },
};

export const properties = baseProperties.map(property => ({
  ...property,
  ...details[property.zone as keyof typeof details],
  slug: property.zone,
  path: `/paulazzo/propiedades/${property.zone}/`,
  source: `https://inmobiliariapaulazzo.com.ar${property.href}`,
  gallery: details[property.zone as keyof typeof details].galleryOrder.map(index => ({ src: `/paulazzo/${property.zone}-${index}.webp`, alt: details[property.zone as keyof typeof details].imageLabels[index] })),
}));
