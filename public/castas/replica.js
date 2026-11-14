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

// Use the reference SVG instead of a font glyph in every circular arrow.
const arrowIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
document.querySelectorAll('[data-framer-name="Arrow"]').forEach(icon => {
  const channels = getComputedStyle(icon).backgroundColor.match(/[\d.]+/g)?.map(Number) || [26, 26, 26];
  const luminance = channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  icon.style.color = luminance < 128 ? '#fff' : '#1a1a1a';
  icon.innerHTML = arrowIcon;
});

// Expand the navigation from the existing floating bar, as in the reference.
const menu = document.createElement('dialog');
menu.className = 'castas-menu';
menu.id = 'castas-navigation';
menu.setAttribute('aria-label', 'Navegaci\u00f3n principal');
const logoSource = document.querySelector('#svg1962423472_1503');
const logo = logoSource ? '<svg viewBox="0 0 24 19" width="24" height="19" aria-hidden="true">' + logoSource.innerHTML + '</svg>' : '';
// Inline the symbol: exported SVG use references are unreliable in the static markup.
document.querySelectorAll('.framer-1lr65nu .svgContainer').forEach(container => { container.innerHTML = logo; });
menu.innerHTML = `<div class="castas-menu-header"><a href="/castas/" aria-label="Ana Costa &mdash; Inicio">${logo}</a><button class="castas-menu-toggle" type="button" aria-label="Cerrar men\u00fa"><span></span><span></span></button></div>
<div class="castas-menu-content">
<div class="castas-menu-contact"><a href="mailto:hello@anacosta.com">hello@anacosta.com</a><a href="tel:+8211248812">(821) 1248 812</a></div>
<nav aria-label="P\u00e1ginas"><a href="/castas/">Inicio</a><a href="/castas/listings/">Propiedades</a><a href="/castas/about/">Sobre m\u00ed</a><a href="/castas/insights/">Ideas</a></nav>
<a class="castas-menu-advisor" href="#contact"><img src="/castas/assets/d553d1acbda799e0.png" alt="Ana Costa" width="250" height="273"><div><p>Ana Costa</p><small>Asesora inmobiliaria</small><span><b aria-hidden="true">${arrowIcon}</b> Coordinemos una charla</span></div></a>
</div><div class="castas-menu-socials" aria-label="Redes sociales"></div>`;
for (const name of ['X (Twitter)', 'LinkedIn', 'Facebook', 'Instagram']) {
  const original = document.querySelector('a[aria-label="' + name + '"]');
  if (original) menu.querySelector('.castas-menu-socials').append(original.cloneNode(true));
}
document.body.append(menu);
let menuTrigger;
let menuClosing = false;
let menuTimer;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const triggers = [...document.querySelectorAll('[data-framer-name="Menu"][tabindex]')];
function setMenuOrigin(trigger) {
  const rect = trigger.closest('.framer-s67jn6').getBoundingClientRect();
  menu.style.setProperty('--menu-top', rect.top + 'px');
  menu.style.setProperty('--menu-right', (innerWidth - rect.right) + 'px');
  menu.style.setProperty('--menu-bottom', ((innerWidth <= 700 ? Math.min(626, innerHeight) : innerHeight) - rect.bottom) + 'px');
  menu.style.setProperty('--menu-left', rect.left + 'px');
}
function openMenu(trigger) {
  if (menu.open) return;
  clearTimeout(menuTimer);
  menuClosing = false;
  menuTrigger = trigger;
  setMenuOrigin(trigger);
  triggers.forEach(button => button.setAttribute('aria-expanded', 'true'));
  menu.showModal();
  document.documentElement.classList.add('castas-navigation-open');
  // Commit the collapsed shape before starting its expansion.
  menu.getBoundingClientRect();
  menu.classList.add('is-open');
  menu.querySelector('button').focus({ preventScroll: true });
}
function closeMenu() {
  if (!menu.open || menuClosing) return;
  menuClosing = true;
  setMenuOrigin(menuTrigger);
  menu.classList.remove('is-open');
  triggers.forEach(button => button.setAttribute('aria-expanded', 'false'));
  menuTimer = setTimeout(() => {
    menu.close();
    document.documentElement.classList.remove('castas-navigation-open');
    menuClosing = false;
    menuTrigger?.focus({ preventScroll: true });
  }, reducedMotion.matches ? 0 : 380);
}
menu.querySelector('button').addEventListener('click', closeMenu);
menu.addEventListener('cancel', event => { event.preventDefault(); closeMenu(); });
menu.addEventListener('click', event => { if (event.target === menu) closeMenu(); });
menu.querySelector('.castas-menu-advisor').addEventListener('click', event => {
  event.preventDefault();
  closeMenu();
  setTimeout(() => {
    const contact = document.querySelector('#contact');
    if (contact) contact.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    else location.href = '/castas/#contact';
  }, reducedMotion.matches ? 0 : 400);
});
triggers.forEach(trigger => {
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-label', 'Abrir men\u00fa');
  trigger.setAttribute('aria-controls', menu.id);
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.addEventListener('click', () => openMenu(trigger));
  trigger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openMenu(trigger); }
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
// The original static export preserves the shapes, but has no Framer runtime.
// Reconnect those shapes to scrolling without changing their document layout.
(() => {
  const entrySteps = document.querySelector('.framer-xekszl');
  const approach = document.querySelector('#scroll.framer-1qfopb9');
  if (!entrySteps || !approach) return;
  document.body.classList.add('castas-home');
  const exitSteps = approach.querySelector('.framer-p1klyu');
  const heroContents = [...document.querySelectorAll('.framer-M7nku .framer-1vepdnv')];
  const services = [...document.querySelectorAll('#services [data-framer-name="Service"]')].map(row => ({
    row,
    contents: [...row.querySelectorAll('[data-framer-name="Content"]')],
    titles: [...row.querySelectorAll('[data-framer-name="Title"]')],
  }));
  const words = [...approach.querySelectorAll('.framer-p1nokf-container [style*="font-family"] > span')].map(text => {
    const fragment = document.createDocumentFragment();
    const spans = [];
    for (const part of text.textContent.split(/(\s+)/)) {
      if (!part.trim()) { fragment.append(document.createTextNode(part)); continue; }
      const span = document.createElement('span');
      span.className = 'castas-word';
      span.textContent = part;
      spans.push(span);
      fragment.append(span);
    }
    text.replaceChildren(fragment);
    return { text, spans };
  });
  entrySteps.classList.add('castas-scroll-bar');
  exitSteps?.classList.add('castas-scroll-bar');
  heroContents.forEach(el => el.classList.add('castas-hero-content'));
  services.forEach(({ contents, titles }) => {
    contents.forEach(el => el.classList.add('castas-service-content'));
    titles.forEach(el => el.classList.add('castas-service-title'));
  });

  // These hairlines and fade entrances are explicitly marked in the export.
  const rules = [...document.querySelectorAll('[data-framer-name="Animated"]')];
  const reveals = [...document.querySelectorAll('[data-framer-appear-id], .framer-p1nokf-container, .framer-16ovfcl')]
    .filter(el => !el.closest('.framer-M7nku, [data-framer-name="Service"]') && /opacity:\s*0(?:[;.]|$)/.test(el.getAttribute('style') || ''));
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: .12 });
  rules.forEach(el => { el.classList.add('castas-rule'); observer.observe(el); });
  reveals.forEach(el => { el.classList.add('castas-reveal'); observer.observe(el); });

  const clamp = value => Math.max(0, Math.min(1, value));
  let queued = false;
  let previousScroll = scrollY;
  function render() {
    queued = false;
    const height = innerHeight;
    const reduce = reducedMotion.matches;
    const entryRect = entrySteps.getBoundingClientRect();
    const entryProgress = clamp((height * .87 - entryRect.top) / (height * .875));
    entrySteps.style.setProperty('--step-x', (reduce ? 0 : 2000 * (1 - entryProgress)) + 'px');
    if (exitSteps) {
      const exitRect = exitSteps.getBoundingClientRect();
      const exitProgress = clamp((height * 1.25 - exitRect.top) / (height * .875));
      exitSteps.style.setProperty('--step-x', (reduce ? 0 : -5000 * (1 - exitProgress)) + 'px');
    }
    heroContents.forEach(el => el.style.setProperty('--hero-y', (reduce ? 0 : -178 * entryProgress) + 'px'));
    for (const { row, contents, titles } of services) {
      const top = row.getBoundingClientRect().top;
      const progress = reduce ? 1 : clamp((height * .5 - top) / (height * .16));
      contents.forEach(el => el.style.setProperty('--service-x', (-150 * (1 - progress)) + 'px'));
      titles.forEach(el => el.style.setProperty('--service-opacity', .5 + .5 * progress));
    }
    for (const { text, spans } of words) {
      const rect = text.getBoundingClientRect();
      if (!rect.height) continue;
      const progress = reduce ? 1 : clamp((height * .75 - rect.top) / (rect.height + height * .15));
      spans.forEach((span, index) => {
        span.style.setProperty('--word-opacity', .3 + .7 * clamp(progress * (spans.length + 3) - index));
      });
    }
    const delta = scrollY - previousScroll;
    if (scrollY < 80 || delta < -3) document.body.classList.remove('castas-nav-hidden');
    else if (delta > 3 && !document.documentElement.classList.contains('castas-navigation-open')) document.body.classList.add('castas-nav-hidden');
    previousScroll = scrollY;
  }
  function schedule() {
    if (!queued) { queued = true; requestAnimationFrame(render); }
  }
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  document.fonts.ready.then(schedule);
  render();
})();
