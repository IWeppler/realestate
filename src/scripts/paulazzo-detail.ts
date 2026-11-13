type Photo = { src: string; alt: string };
const gallery = document.querySelector<HTMLElement>('[data-gallery-images]')!;
const photos: Photo[] = JSON.parse(gallery.dataset.galleryImages!);
const dialog = document.querySelector<HTMLDialogElement>('.property-lightbox')!;
const image = dialog.querySelector<HTMLImageElement>('.lightbox-image')!;
const counter = dialog.querySelector<HTMLElement>('.lightbox-counter')!;
const caption = dialog.querySelector<HTMLElement>('.lightbox-caption')!;
const thumbnails = dialog.querySelector<HTMLElement>('.lightbox-thumbnails')!;
let index = 0;
const thumbnailButtons = photos.map((photo, i) => {
  const button = document.createElement('button');
  button.type = 'button';
  button.setAttribute('aria-label', `Ver foto ${i + 1}`);
  const thumbnail = document.createElement('img');
  thumbnail.src = photo.src; thumbnail.alt = ''; thumbnail.loading = 'lazy';
  button.append(thumbnail);
  button.addEventListener('click', () => show(i));
  thumbnails.append(button);
  return button;
});
function show(next: number) {
  index = (next + photos.length) % photos.length;
  image.src = photos[index].src;
  image.alt = photos[index].alt;
  counter.textContent = `${index + 1} / ${photos.length}`;
  caption.textContent = photos[index].alt;
  thumbnailButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
  if (dialog.open) thumbnailButtons[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
}
gallery.querySelectorAll<HTMLElement>('[data-gallery-index]').forEach(trigger => trigger.addEventListener('click', event => {
  event.preventDefault();
  show(Number(trigger.dataset.galleryIndex));
  dialog.showModal();
}));
dialog.querySelector('.lightbox-close')?.addEventListener('click', () => dialog.close());
dialog.querySelector('.lightbox-prev')?.addEventListener('click', () => show(index - 1));
dialog.querySelector('.lightbox-next')?.addEventListener('click', () => show(index + 1));
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1)); }
});
let touchStart: number | null = null;
image.addEventListener('touchstart', event => { touchStart = event.touches[0].clientX; }, { passive: true });
image.addEventListener('touchend', event => {
  if (touchStart === null) return;
  const delta = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(delta) > 50) show(index + (delta < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
const share = document.querySelector<HTMLButtonElement>('#share-property')!;
const shareStatus = document.querySelector<HTMLElement>('#share-status')!;
share.addEventListener('click', async () => {
  try {
    if (navigator.share && matchMedia('(max-width: 760px)').matches) await navigator.share({ title: document.title, url: location.href });
    else { await navigator.clipboard.writeText(location.href); shareStatus.textContent = 'Enlace copiado'; }
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError')) shareStatus.textContent = 'Podés copiar el enlace desde la barra de dirección.';
  }
});
const form = document.querySelector<HTMLFormElement>('#property-enquiry')!;
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const text = `Hola, soy ${String(data.get('name')).trim()}.\n\n${String(data.get('message')).trim()}\n\nPropiedad: ${form.dataset.propertyTitle}\n${form.dataset.propertySource}`;
  const url = `https://wa.me/5493541336769?text=${encodeURIComponent(text)}`;
  const fallback = document.querySelector<HTMLAnchorElement>('#enquiry-fallback')!;
  fallback.href = url; fallback.hidden = false;
  window.open(url, '_blank', 'noopener,noreferrer');
});
const mobileMenu = document.querySelector<HTMLDetailsElement>('.mobile-menu')!;
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileMenu.open = false; }));
document.addEventListener('keydown', event => { if (event.key === 'Escape') mobileMenu.open = false; });
