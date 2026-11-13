document.addEventListener('submit', event => {
  event.preventDefault();
  event.stopImmediatePropagation();
  let message = event.target.querySelector('.castas-demo-status');
  if (!message) {
    message = document.createElement('p');
    message.className = 'castas-demo-status';
    message.setAttribute('role', 'status');
    event.target.append(message);
  }
  message.textContent = 'Esta es una demostración. No se enviaron tus datos.';
}, true);

const menu = document.createElement('dialog');
menu.className = 'castas-menu';
menu.setAttribute('aria-label', 'Navegación principal');
menu.innerHTML = `<button class="castas-close" type="button">Cerrar ×</button><nav><a href="/castas/">Inicio</a><a href="/castas/listings/">Propiedades</a><a href="/castas/about/">Sobre mí</a><a href="/castas/insights/">Ideas</a><a href="#contact">Conversemos</a></nav><small>Adaptación y desarrollo por <a href="https://ignacioweppler.dev">Ignacio Weppler</a></small>`;
document.body.append(menu);
menu.querySelector('button').addEventListener('click', () => menu.close());
menu.addEventListener('click', event => { if (event.target === menu) menu.close(); });
menu.querySelector('a[href="#contact"]').addEventListener('click', () => menu.close());
document.querySelectorAll('[data-framer-name="Menu"][tabindex]').forEach(trigger => {
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'Abrir menú');
  trigger.addEventListener('click', () => menu.showModal());
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); menu.showModal(); }
  });
});

const faqAnswers = [
  'Esta propuesta presenta propiedades en distintas zonas de España y Portugal. En una búsqueda real, el primer paso sería definir juntos los lugares que te interesan.',
  'Sí. El acompañamiento se adapta tanto a quienes buscan un lugar como a quienes quieren vender una propiedad.',
  'El foco está en escuchar, seleccionar con criterio y acompañar cada decisión de forma personal, con claridad y sin apuro.',
  'La selección prioriza la calidad del espacio, su ubicación y su relación con las necesidades de cada persona.',
  'Se evalúan la ubicación, el estado, la superficie, las características del inmueble y las referencias comparables del mercado.',
  'La búsqueda puede incluir oportunidades de presentación privada, siempre de acuerdo con las preferencias del propietario.',
  'Empezamos con una conversación, definimos prioridades, seleccionamos opciones y acompañamos las visitas y los pasos siguientes. Este sitio muestra ese proceso como demostración.',
];
document.querySelectorAll('#faq button[aria-expanded]').forEach((button, index) => {
  const answer = document.createElement('div');
  answer.className = 'castas-faq-answer';
  answer.id = `castas-answer-${index}`;
  answer.hidden = true;
  answer.textContent = faqAnswers[index % faqAnswers.length];
  button.setAttribute('aria-controls', answer.id);
  button.after(answer);
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    answer.hidden = expanded;
  });
});

const contactHeading = [...document.querySelectorAll('h1,h2,h3')].find(el => el.textContent.trim() === 'Conversemos.' && el.getClientRects().length);
if (contactHeading) {
  let container = contactHeading.parentElement;
  while (container && !container.querySelector('form')) container = container.parentElement;
  (container || contactHeading).id = 'contact';
}
document.querySelectorAll('a[href="#contact"]').forEach(link => link.removeAttribute('target'));
document.querySelectorAll('button[type="submit"][aria-label="submit"]').forEach(button => { button.setAttribute('aria-label', 'Suscribirme'); button.textContent = '→'; });

const gallery = document.createElement('dialog');
gallery.className = 'castas-gallery';
gallery.setAttribute('aria-label', 'Galería de la propiedad');
gallery.innerHTML = '<button type="button" class="castas-close">Cerrar ×</button><div></div>';
document.body.append(gallery);
gallery.querySelector('button').addEventListener('click', () => gallery.close());
gallery.addEventListener('click', event => { if (event.target === gallery) gallery.close(); });
document.querySelectorAll('[data-highlight="true"]').forEach(trigger => {
  if (trigger.textContent.trim() !== 'Ver todas las fotos') return;
  trigger.setAttribute('role', 'button'); trigger.tabIndex = 0;
  const show = () => {
    const container = gallery.querySelector('div'); container.replaceChildren();
    const images = [...new Map([...document.querySelectorAll('main img,section img')].filter(img => img.width > 180).map(img => [img.src, img])).values()];
    images.slice(0, 12).forEach(image => { const copy = image.cloneNode(); copy.removeAttribute('style'); container.append(copy); });
    gallery.showModal();
  };
  trigger.addEventListener('click', event => { event.preventDefault(); show(); });
  trigger.addEventListener('keydown', event => { if (event.key === 'Enter') show(); });
});

const propertyCards = [...document.querySelectorAll('a[href^="/castas/listings/"]')].filter(link => link.querySelector('img') && link.querySelector('p'));
const emptyProperties = document.createElement('p');
emptyProperties.className = 'castas-empty-properties';
emptyProperties.setAttribute('role', 'status');
emptyProperties.textContent = 'No hay propiedades de esta categoría en la selección. Probá con otra opción.';
emptyProperties.hidden = true;
document.querySelector('[data-framer-name="filters"]')?.after(emptyProperties);
document.querySelectorAll('[data-framer-name="filters"] [data-highlight="true"]').forEach(filter => {
  filter.setAttribute('role', 'button');
  const apply = () => {
    const category = filter.textContent.trim();
    document.querySelectorAll('.castas-selected').forEach(el => el.classList.remove('castas-selected'));
    filter.classList.add('castas-selected');
    let matches = 0;
    propertyCards.forEach(card => {
      const isApartment = card.href.includes('urban-luxury-penthouse');
      const isFarm = card.href.includes('countryside-estate');
      const isVilla = !isApartment && !isFarm;
      const visible = category === 'Todas' || (['Departamento', 'Ático'].includes(category) && isApartment) || (category === 'Villa' && isVilla) || (category === 'Casa de campo' && isFarm);
      const wrapper = card.closest('[class$="-container"]') || card;
      wrapper.style.display = visible ? '' : 'none';
      if (visible) matches++;
    });
    emptyProperties.hidden = matches > 0;
  };
  filter.addEventListener('click', apply);
  filter.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); apply(); } });
});

const updateAdvisor = () => document.body.classList.toggle('castas-advisor-visible', scrollY > innerHeight * .8);
window.addEventListener('scroll', updateAdvisor, { passive: true });
updateAdvisor();
document.querySelectorAll('.framer-98dovt-container p').forEach(el => {
  if (el.textContent.trim() === 'Coordiná una charla') el.textContent = 'Hablemos';
});

// Illustrative figures, as identified by the demonstration notice in the footer.
const counters = [...document.querySelectorAll('span')].filter(el => /^0[+%]$/.test(el.textContent.trim()) && el.children.length === 0);
const targets = [{ value: 120, suffix: '+' }, { value: 50, prefix: '€', suffix: 'M+' }, { value: 98, suffix: '%' }, { value: 120, suffix: '+' }];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  const element = entry.target;
  const target = targets[counters.indexOf(element) % targets.length];
  counterObserver.unobserve(element);
  const start = performance.now();
  const animate = now => {
    const progress = reduced ? 1 : Math.min(1, (now - start) / 1100);
    element.textContent = `${target.prefix || ''}${Math.round(target.value * (1 - (1 - progress) ** 3))}${target.suffix}`;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}), { threshold: .4 });
counters.forEach(counter => counterObserver.observe(counter));
