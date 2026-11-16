
/* Menu is native <details> for keyboard and no-JS fallback. */
document.addEventListener('click', function (event) {
  const openMenu = document.querySelector('.v76-public .v8-nav-dropdown[open]');
  if (!openMenu) return;
  const inside = event.target.closest('.v8-nav-dropdown');
  if (!inside || event.target.closest('.v8-mobile-links a, .v8-mobile-links button')) openMenu.open = false;
});
document.addEventListener('keydown', function (event) {
  if (event.key !== 'Escape') return;
  const openMenu = document.querySelector('.v76-public .v8-nav-dropdown[open]');
  if (openMenu) { openMenu.open=false; openMenu.querySelector('summary')?.focus(); }
});
