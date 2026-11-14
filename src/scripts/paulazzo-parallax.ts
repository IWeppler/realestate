const hero = document.querySelector<HTMLElement>('.hero-shell');
const landscape = hero?.querySelector<HTMLImageElement>('.hero-landscape');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (hero && landscape) {
  let frame = 0;
  const update = () => {
    frame = 0;
    if (reducedMotion.matches) {
      landscape.style.removeProperty('--hero-parallax-y');
      return;
    }
    const bounds = hero.getBoundingClientRect();
    const distance = Math.min(36, Math.max(0, -bounds.top) * (innerWidth <= 760 ? .04 : .06));
    landscape.style.setProperty('--hero-parallax-y', `${distance.toFixed(2)}px`);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reducedMotion.addEventListener('change', schedule);
  update();
}
