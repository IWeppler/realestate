export const projects = [
  { slug: 'casa-del-patio', name: 'Casa del Patio', location: 'San Salvador, El Salvador', image: 'casa-el-salvador.jpg' },
  { slug: 'casa-umbral', name: 'Casa Umbral', location: 'San Salvador, El Salvador', image: 'casa-arco-sereno.jpg' },
  { slug: 'casa-laurel', name: 'Casa Laurel', location: 'Ciudad de Guatemala, Guatemala', image: 'casa-valvere.jpg' },
  { slug: 'casa-del-jardin', name: 'Casa del Jardín', location: 'Ciudad de Guatemala, Guatemala', image: 'casa-san-isidro.jpg' },
  { slug: 'casa-jacaranda', name: 'Casa Jacaranda', location: 'Antigua Guatemala, Guatemala', image: 'casa-antigua-azul.jpg' },
  { slug: 'casa-del-lago', name: 'Casa del Lago', location: 'San Pedro, Atitlán, Guatemala', image: 'casa-valle-verde.jpg' },
];

const featuredSlugs = ['casa-del-patio', 'casa-umbral', 'casa-jacaranda', 'casa-del-lago'];
export const featuredProjects = projects.filter(project => featuredSlugs.includes(project.slug));
