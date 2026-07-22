document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('.nav-bar');
  const toggle = document.querySelector('.nav-toggle');

  if (!navBar || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = navBar.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.list-bar a, .list-bar .nav-btn').forEach((link) => {
    link.addEventListener('click', () => {
      navBar.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
