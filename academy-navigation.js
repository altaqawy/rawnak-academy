/* Transparent, backdrop-inverting RAWNAK navigation with a shared HD identity. */
(function () {
  'use strict';
  const app = document.getElementById('app');
  const t = (en, ar) => document.documentElement.lang === 'ar' ? ar : en;
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M5 19 19 5M7 5h12v12"/></svg>';
  const globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/></svg>';
  const destinations = [['mission', 'Home', 'الرئيسية'], ['courses', 'Programs', 'البرامج'], ['for-educators', 'Educators', 'للمدرسين'], ['about', 'About', 'عن الأكاديمية']];
  let header = null, selected = null, menuOpen = false, scrollFrame = 0, trayEngaged = false;
  let inertBefore = [];

  function brand(negative = false) {
    return '<span class="v15-brand-symbol"><img src="assets/rawnak-academy-' + (negative ? 'negative-hd.svg' : 'logo-hd.webp') + '" width="48" height="48" alt="" decoding="async"></span>' +
      '<span class="v15-wordmark"><strong>RAWNAK</strong><small>ACADEMY</small></span>';
  }
  function normalizeBrands() {
    app.querySelectorAll('a.logo,a.v11-brand,a.v15-brand').forEach(link => {
      const negative = !!link.closest('footer,.v15-nav');
      link.classList.add('v15-brand');
      link.classList.toggle('v15-brand-negative', negative);
      link.setAttribute('translate', 'no');
      link.setAttribute('data-i18n-ignore', '');
      link.setAttribute('dir', 'ltr');
      link.setAttribute('lang', 'en');
      link.setAttribute('aria-label', 'RAWNAK ACADEMY');
      if (!link.hasAttribute('data-v15-brand')) {
        link.innerHTML = brand(negative);
        link.setAttribute('data-v15-brand', '');
      }
    });
  }
  function languageButton() {
    return '<button type="button" class="academy-lang-toggle v15-language" data-academy-lang-toggle aria-label="' +
      t('Switch to Arabic', 'Switch to English') + '"><span class="academy-lang-icon">' + globe + '</span>' +
      '<span class="academy-lang-label">' + t('العربية', 'English') + '</span><span class="academy-lang-compact">' + t('ع', 'EN') + '</span></button>';
  }
  function destinationLinks(mobile) {
    return destinations.map(([id, en, ar], i) => '<a class="' + (mobile ? 'v15-panel-link' : 'v15-nav-link') +
      '" href="#/welcome" data-v7-scroll="' + id + '">' + (mobile ? '<span class="v15-link-index">0' + (i + 1) + '</span>' : '') +
      '<span>' + t(en, ar) + '</span>' + (mobile ? arrow : '') + '</a>').join('');
  }
  function clearInert() {
    inertBefore.forEach(([node, value]) => { if (node.isConnected) node.inert = value; });
    inertBefore = [];
  }
  function closeMenu(restoreFocus = true) {
    if (!menuOpen) return;
    menuOpen = false;
    document.body.style.overflow = '';
    clearInert();
    if (!header?.isConnected) return;
    header.classList.remove('v15-is-open');
    header.querySelector('[data-v15-menu]').hidden = true;
    header.querySelector('[data-v15-dismiss]').hidden = true;
    const trigger = header.querySelector('[data-v15-toggle]');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', t('Open Academy menu', 'افتح قائمة الأكاديمية'));
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }
  function openMenu() {
    if (!header?.isConnected) return;
    menuOpen = true;
    header.classList.add('v15-is-open');
    header.querySelector('[data-v15-menu]').hidden = false;
    header.querySelector('[data-v15-dismiss]').hidden = false;
    const trigger = header.querySelector('[data-v15-toggle]');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', t('Close Academy menu', 'اقفل قائمة الأكاديمية'));
    inertBefore = [...app.querySelectorAll('main,footer')].map(node => [node, !!node.inert]);
    inertBefore.forEach(([node]) => node.inert = true);
    document.body.style.overflow = 'hidden';
    header.querySelector('.v15-panel-link')?.focus({ preventScroll: true });
  }
  function highlight(link) {
    if (!header?.isConnected) return;
    const tray = header.querySelector('.v15-desktop-links');
    tray.querySelectorAll('.v15-nav-link').forEach(item => item.classList.toggle('v15-is-lit', item === link));
    tray.classList.toggle('v15-has-highlight', !!link);
    if (!link) return;
    const a = tray.getBoundingClientRect(), b = link.getBoundingClientRect();
    tray.style.setProperty('--pill-x', (b.left - a.left) + 'px');
    tray.style.setProperty('--pill-width', b.width + 'px');
  }
  function selectedLink() {
    return header?.querySelector('.v15-desktop-links [data-v7-scroll="' + selected + '"]') || null;
  }
  function updateScroll() {
    scrollFrame = 0;
    if (!header?.isConnected) return;
    header.classList.toggle('v15-is-scrolled', window.scrollY > 24);
    if (activeRoute() === 'welcome') {
      selected = 'mission';
      let nearest = -Infinity;
      destinations.forEach(([id]) => {
        const section = document.getElementById(id);
        if (!section) return;
        const top = section.getBoundingClientRect().top;
        if (top <= 220 && top > nearest) { selected = id; nearest = top; }
      });
    } else selected = null;
    header.querySelectorAll('.v15-nav-link').forEach(link => {
      if (link.dataset.v7Scroll === selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    if (!trayEngaged) highlight(selectedLink());
  }
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  function mount() {
    closeMenu(false);
    const page = app.querySelector('.v7-public');
    const oldHeader = page?.querySelector('.v7-guest-head');
    header = null;
    trayEngaged = false;
    if (oldHeader) {
      page.classList.add('v15-public');
      const role = typeof v7role === 'function' ? v7role() : null;
      const route = role ? v7homeOf(role) : 'signup';
      const cta = role ? t('My workspace', 'مساحتي') : t('Explore Academy', 'استكشف الأكاديمية');
      header = document.createElement('header');
      header.className = 'v7-guest-head v15-nav' + (page.querySelector('.v11-announcement') ? ' v15-with-announcement' : '');
      header.setAttribute('data-v15-navigation', '');
      header.innerHTML = '<div class="v15-nav-shell"><a class="v15-brand" href="#/welcome" data-v7-scroll="mission" translate="no" dir="ltr" lang="en" aria-label="RAWNAK ACADEMY">' + brand(true) + '</a>' +
        '<nav class="v15-desktop-links" aria-label="' + t('Main navigation', 'القائمة الرئيسية') + '"><span class="v15-nav-highlight" aria-hidden="true"></span>' + destinationLinks(false) + '</nav>' +
        '<div class="v7-guest-actions v15-nav-actions">' + languageButton() + '<button type="button" class="v15-nav-cta" data-nav="' + route + '"><span>' + cta + '</span><i>' + arrow + '</i></button>' +
        '<button type="button" class="v15-menu-trigger" data-v15-toggle aria-expanded="false" aria-controls="academy-navigation-panel" aria-label="' + t('Open Academy menu', 'افتح قائمة الأكاديمية') + '"><span></span><span></span></button></div></div>' +
        '<div class="v15-nav-shade" data-v15-dismiss hidden aria-hidden="true"></div><section class="v15-menu-panel" id="academy-navigation-panel" data-v15-menu role="dialog" aria-modal="true" aria-label="' + t('Academy navigation', 'قائمة الأكاديمية') + '" hidden>' +
        '<div class="v15-panel-heading"><span>' + t('A world of learning', 'عالم من التعلّم') + '</span><button type="button" data-v15-close aria-label="' + t('Close menu', 'اقفل القائمة') + '">×</button></div>' +
        '<nav aria-label="' + t('Explore the Academy', 'استكشف الأكاديمية') + '">' + destinationLinks(true) + '</nav><div class="v15-panel-bottom"><a href="#/support">' + t('Help & contact', 'المساعدة والتواصل') + '</a><button type="button" data-nav="' + route + '">' + cta + arrow + '</button></div></section>';
      oldHeader.replaceWith(header);
      updateScroll();
    }
    normalizeBrands();
  }
  document.addEventListener('click', event => {
    if (event.target.closest('[data-v15-toggle]')) { menuOpen ? closeMenu() : openMenu(); return; }
    if (event.target.closest('[data-v15-close],[data-v15-dismiss]')) { closeMenu(); return; }
    if (menuOpen && event.target.closest('.v15-menu-panel a,.v15-menu-panel [data-nav]')) closeMenu(false);
    if (menuOpen && !event.target.closest('.v15-nav')) closeMenu();
  });
  document.addEventListener('rawnak:section-navigation', () => closeMenu(false));
  // Language switches also clear any open panel before the next render.
  document.addEventListener('click', event => {
    if (menuOpen && event.target.closest('[data-v7-scroll],[data-academy-lang-toggle]')) closeMenu(false);
  }, true);
  document.addEventListener('pointerover', event => {
    const link = event.target.closest('.v15-nav-link');
    if (link) { trayEngaged = true; highlight(link); }
  });
  document.addEventListener('pointerout', event => {
    if (event.target.closest('.v15-desktop-links') && !event.relatedTarget?.closest?.('.v15-desktop-links')) { trayEngaged = false; highlight(selectedLink()); }
  });
  document.addEventListener('focusin', event => {
    const link = event.target.closest('.v15-nav-link');
    if (link) { trayEngaged = true; highlight(link); }
  });
  document.addEventListener('focusout', event => {
    if (event.target.closest('.v15-desktop-links') && !event.relatedTarget?.closest?.('.v15-desktop-links')) { trayEngaged = false; highlight(selectedLink()); }
  });
  document.addEventListener('keydown', event => {
    if (!menuOpen) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return; }
    if (event.key !== 'Tab') return;
    const panel = header.querySelector('[data-v15-menu]');
    const items = [...panel.querySelectorAll('a[href],button')].filter(el => !el.disabled && el.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if (!first) { event.preventDefault(); return; }
    if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) { last.focus(); event.preventDefault(); }
    else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) { first.focus(); event.preventDefault(); }
  });
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', () => { if (window.innerWidth > 1000) closeMenu(false); scheduleScroll(); }, { passive: true });
  document.fonts?.ready?.then(scheduleScroll);
  const previous = render;
  render = function () { previous(); mount(); };
  mount();
})();
