// Progressive enhancement: native selects remain the form's source of truth.
const controls: { close: () => void }[] = [];
document.querySelectorAll<HTMLSelectElement>('#property-search .search-field select, #contact-form .contact-select select').forEach(select => {
  const field = select.parentElement!;
  const name = select.name;
  const prefix = select.form?.id === 'contact-form' ? 'contact' : 'search';
  const options = [...select.options];
  let active = select.selectedIndex;
  let typeahead = '';
  let lastTyped = 0;
  field.classList.add('enhanced-select');
  field.dataset.control = name;
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'select-trigger';
  trigger.setAttribute('role', 'combobox');
  trigger.setAttribute('aria-haspopup', 'listbox');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', `${prefix}-${name}-options`);
  trigger.setAttribute('aria-labelledby', `${prefix}-${name}-label ${prefix}-${name}-value`);
  trigger.innerHTML = `<span id="${prefix}-${name}-value"></span><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m6 9 6 6 6-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const list = document.createElement('ul');
  list.className = 'select-options';
  list.id = `${prefix}-${name}-options`;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-labelledby', `${prefix}-${name}-label`);
  list.hidden = true;
  const items = options.map((option, index) => {
    const item = document.createElement('li');
    item.id = `${prefix}-${name}-option-${index}`;
    item.setAttribute('role', 'option');
    item.textContent = option.textContent;
    item.addEventListener('pointermove', () => highlight(index));
    item.addEventListener('click', () => commit(index));
    list.append(item);
    return item;
  });
  field.append(trigger, list);
  // Hide only after the replacement is ready; no-JS visitors keep the native UI.
  select.hidden = true;
  function sync() {
    trigger.querySelector('span')!.textContent = options[select.selectedIndex].textContent;
    items.forEach((item, index) => item.setAttribute('aria-selected', String(index === select.selectedIndex)));
  }
  function highlight(index: number) {
    active = (index + items.length) % items.length;
    items.forEach((item, i) => item.toggleAttribute('data-active', i === active));
    trigger.setAttribute('aria-activedescendant', items[active].id);
    items[active].scrollIntoView({ block: 'nearest' });
  }
  function close() {
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.removeAttribute('aria-activedescendant');
    field.classList.remove('select-open');
  }
  function open() {
    controls.forEach(control => control.close());
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    field.classList.add('select-open');
    field.dataset.side = 'below';
    const rect = trigger.getBoundingClientRect();
    if (rect.bottom + list.offsetHeight + 16 > innerHeight && rect.top > list.offsetHeight + 24) field.dataset.side = 'above';
    highlight(select.selectedIndex);
  }
  function commit(index: number) {
    select.selectedIndex = index;
    sync();
    select.dispatchEvent(new Event('change', { bubbles: true }));
    close();
    trigger.focus({ preventScroll: true });
  }
  controls.push({ close });
  trigger.addEventListener('click', () => list.hidden ? open() : close());
  trigger.addEventListener('keydown', event => {
    if (['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      const wasClosed = list.hidden;
      if (wasClosed) open();
      if (event.key === 'ArrowDown' && !wasClosed) highlight(active + 1);
      if (event.key === 'ArrowUp') highlight(wasClosed ? items.length - 1 : active - 1);
      if (event.key === 'Home') highlight(0);
      if (event.key === 'End') highlight(items.length - 1);
      if ((event.key === 'Enter' || event.key === ' ') && !wasClosed) commit(active);
    } else if (event.key === 'Escape') {
      if (!list.hidden) event.stopPropagation();
      close();
    } else if (event.key === 'Tab') close();
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      event.preventDefault();
      typeahead = performance.now() - lastTyped < 600 ? typeahead + event.key : event.key;
      lastTyped = performance.now();
      if (list.hidden) open();
      const match = options.findIndex(option => option.text.toLocaleLowerCase().startsWith(typeahead.toLocaleLowerCase()));
      if (match >= 0) highlight(match);
    }
  });
  document.addEventListener('pointerdown', event => { if (!field.contains(event.target as Node)) close(); });
  select.addEventListener('change', sync);
  select.form?.addEventListener('sync-selects', sync);
  select.form?.addEventListener('reset', () => { close(); setTimeout(sync, 0); });
  sync();
});
