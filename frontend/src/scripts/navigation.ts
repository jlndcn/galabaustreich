const menu = document.querySelector<HTMLDialogElement>('#mobile-menu');
const trigger = document.querySelector<HTMLButtonElement>(
  '[data-testid="header-mobile-menu-button"]',
);
if (menu && trigger) {
  trigger.hidden = false;
  const close = () => menu.close();
  trigger.addEventListener('click', () => {
    menu.showModal();
    document.documentElement.classList.add('menu-open');
  });
  menu.querySelector('[data-close-menu]')?.addEventListener('click', close);
  menu.querySelectorAll('a').forEach((link) => {
    // WebKit otherwise skips links when full keyboard access is disabled.
    link.tabIndex = 0;
    link.addEventListener('click', close);
  });
  menu.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const items = [...menu.querySelectorAll<HTMLElement>('a[href], button')];
    const first = items[0];
    const last = items.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target === menu) {
      const rect = menu.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        close();
    }
  });
  menu.addEventListener('close', () => {
    document.documentElement.classList.remove('menu-open');
    trigger.focus({ preventScroll: true });
  });
  matchMedia('(min-width: 1100px)').addEventListener('change', (event) => {
    if (event.matches && menu.open) close();
  });
}
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
