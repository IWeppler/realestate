const preference = matchMedia('(prefers-reduced-motion: reduce)');
const targets = [...document.querySelectorAll<HTMLElement>(
  '.landing-content .section-heading > div, .intro-brand, .intro-main, .place-copy, .owners-heading, .owner-services article, .contact-copy',
)];
const pending = new Set<HTMLElement>();
const animations = new Map<HTMLElement, Animation>();

if (!preference.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target as HTMLElement;
      observer.unobserve(element);
      pending.delete(element);
      element.style.removeProperty('opacity');
      const animation = element.animate([
        { opacity: 0, transform: 'translateY(32px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 1200, easing: 'cubic-bezier(.22, .61, .36, 1)' });
      animations.set(element, animation);
      animation.onfinish = () => animations.delete(element);
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

  targets.forEach(element => {
    // La página visible y los destinos de enlaces se leen sin esperar una entrada.
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.style.opacity = '0';
    pending.add(element);
    observer.observe(element);
  });

  document.addEventListener('focusin', event => {
    const focused = event.target as Node;
    [...pending].forEach(element => {
      if (!element.contains(focused)) return;
      observer.unobserve(element);
      pending.delete(element);
      element.style.removeProperty('opacity');
    });
    animations.forEach((animation, element) => {
      if (element.contains(focused)) animation.finish();
    });
  });

  const finish = () => {
    observer.disconnect();
    pending.forEach(element => element.style.removeProperty('opacity'));
    pending.clear();
    animations.forEach(animation => animation.finish());
    animations.clear();
  };
  preference.addEventListener('change', () => { if (preference.matches) finish(); });
  window.addEventListener('beforeprint', finish);
  window.addEventListener('pagehide', finish, { once: true });
}
