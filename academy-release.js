/* Release hardening for the static Academy preview. No account or payment API. */
(function () {
  'use strict';
  const root = document.documentElement;
  const app = document.getElementById('app');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const t = (en, ar) => root.lang === 'ar' ? ar : en;
  let previousRoute = '', sectionTarget = '', sectionFrame = 0;
  let returnFocus = null, activeDialog = null;

  function footer() {
    const foot = app.querySelector('footer');
    if (!foot || foot.querySelector('.v14-footer-links')) return;
    const nav = document.createElement('nav');
    nav.className = 'v14-footer-links';
    nav.setAttribute('aria-label', t('Academy information', 'معلومات الأكاديمية'));
    nav.setAttribute('data-i18n-ignore', '');
    for (const [route, en, ar] of [
      ['platform', 'Platform status', 'حالة المنصة'],
      ['privacy', 'Privacy in this preview', 'الخصوصية في المعاينة'],
      ['support', 'Help & contact', 'المساعدة والتواصل']
    ]) {
      const link = document.createElement('a');
      link.href = '#/' + route;
      link.textContent = t(en, ar);
      nav.appendChild(link);
    }
    foot.appendChild(nav);
  }

  function backupCard() {
    const settings = app.querySelector('.v7-settings');
    if (!settings || settings.querySelector('.v14-backup')) return;
    const card = document.createElement('section');
    card.className = 'v7-panel v14-backup';
    card.setAttribute('data-i18n-ignore', '');
    card.innerHTML = '<h2>' + t('Keep a copy of your work.', 'احتفظ بنسخة من شغلك') + '</h2><p>' +
      t('Export notes, study plans, portfolio and content drafts from this browser as JSON. This is a local backup, not cloud sync.',
        'صدّر الملاحظات وخطط المذاكرة وملف الأعمال ومسودات المحتوى من المتصفح كملف JSON دي نسخة احتياطية محلية') +
      '</p><button type="button" class="btn outline" data-academy-backup>' +
      t('Download draft backup', 'نزّل نسخة من المسودات') + ' ↗</button>';
    settings.appendChild(card);
  }

  function exportDrafts() {
    const records = {};
    try {
      // Deliberately omit old profiles, contact lists, signups and role sessions.
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (/^rawnak_academy_v74_/.test(key) ||
            /^rawnak_academy_v75_(books|questions)$/.test(key) ||
            /^rawnak_academy_v7_(notes|courseDrafts)$/.test(key) ||
            key === 'rawnak_academy_v3_notes') {
          const raw = localStorage.getItem(key);
          try { records[key] = JSON.parse(raw); } catch { records[key] = raw; }
        }
      }
      const blob = new Blob([JSON.stringify({
        schema: 'rawnak-academy-local-drafts-v1',
        exportedAt: new Date().toISOString(), records
      }, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rawnak-academy-drafts-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify(t('Draft backup downloaded.', 'تم تنزيل نسخة المسودات'));
    } catch {
      notify(t('Backup could not be created. Check browser storage permissions.',
        'تعذر إنشاء النسخة راجع صلاحيات التخزين في المتصفح'));
    }
  }

  function arrowIcons() {
    const angles = { '↗': 0, '↘': 90, '↙': 180, '↖': 270, '→': 45, '↓': 135, '←': 225, '↑': 315 };
    app.querySelectorAll('span,b,i').forEach(el => {
      const mark = el.textContent.trim();
      if (el.children.length || !(mark in angles)) return;
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = '<svg class="v14-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(' + angles[mark] + 'deg)" aria-hidden="true" focusable="false"><path d="M5 19 19 5M7 5h12v12"/></svg>';
    });
  }

  function imageFallback(img) {
    if (img.classList.contains('v14-image-unavailable')) return;
    img.classList.add('v14-image-unavailable');
    // A local brand asset keeps the layout useful when a photo host is blocked.
    img.src = 'assets/rawnak-academy-logo.webp';
    img.alt = t('RAWNAK Academy — photograph unavailable', 'رونق أكاديمي — الصورة غير متاحة');
  }

  function scrollToSection() {
    sectionFrame = 0;
    if (!sectionTarget || activeRoute() !== 'welcome') return;
    const target = document.getElementById(sectionTarget);
    sectionTarget = '';
    if (!target) return;
    target.scrollIntoView({ behavior: reduced.matches || root.dataset.motion === 'off' ? 'instant' : 'smooth', block: 'start' });
    const heading = target.querySelector('h1,h2,h3') || target;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }

  function mount() {
    if (!app.firstElementChild) return;
    const main = app.querySelector('main');
    if (main && !main.id) main.id = 'academy-main';
    let skip = document.getElementById('academy-skip');
    if (!skip) {
      skip = document.createElement('a');
      skip.id = 'academy-skip';
      skip.className = 'v14-skip';
      skip.setAttribute('data-i18n-ignore', '');
      document.body.insertBefore(skip, document.body.firstChild);
    }
    skip.href = '#' + (main?.id || 'academy-main');
    skip.textContent = t('Skip to content', 'انتقل للمحتوى');
    const banner = app.querySelector('.v11-announcement');
    if (banner) {
      banner.setAttribute('data-i18n-ignore', '');
      banner.innerHTML = '<span>RAWNAK ACADEMY</span><a href="#/platform">' +
        t('Explore before launch · See what’s ready', 'استكشف قبل الإطلاق · اعرف المتاح حاليًا') +
        '</a><span>© ' + new Date().getFullYear() + '</span>';
    }
    // Generic public headers previously linked to sections removed by later redesigns.
    const aliases = { experience: 'how-it-works', 'gift-learning': 'learning-options' };
    app.querySelectorAll('[data-v7-scroll]').forEach(link => {
      if (aliases[link.dataset.v7Scroll]) link.dataset.v7Scroll = aliases[link.dataset.v7Scroll];
    });
    footer();
    backupCard();
    arrowIcons();
    app.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => imageFallback(img), { once: true });
      if (img.complete && img.naturalWidth === 0) imageFallback(img);
    });
    app.querySelectorAll('a[target="_blank"]').forEach(link => link.rel = 'noopener noreferrer');
    const route = activeRoute();
    if (route !== previousRoute) {
      document.getElementById('v7-modal-layer').replaceChildren();
      activeDialog = null;
      document.body.style.overflow = '';
      if (previousRoute && main && !sectionTarget) {
        main.setAttribute('tabindex', '-1');
        main.focus({ preventScroll: true });
      }
      previousRoute = route;
    }
    if (sectionTarget) {
      cancelAnimationFrame(sectionFrame);
      // hashchange's legacy scroll-to-top runs before this frame.
      sectionFrame = requestAnimationFrame(scrollToSection);
    }
  }

  document.addEventListener('click', event => {
    const skip = event.target.closest('#academy-skip');
    if (skip) {
      event.preventDefault();
      const main = app.querySelector('main');
      if (main) { main.setAttribute('tabindex', '-1'); main.focus(); }
      return;
    }
    if (event.target.closest('[data-academy-backup]')) { exportDrafts(); return; }
    const link = event.target.closest('[data-v7-scroll]');
    if (!link) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    document.dispatchEvent(new Event('rawnak:section-navigation'));
    sectionTarget = link.dataset.v7Scroll;
    document.querySelectorAll('details.v11-menu[open],details.v8-nav-dropdown[open]').forEach(menu => menu.open = false);
    if (activeRoute() !== 'welcome') navigate('welcome');
    else scrollToSection();
  }, true);

  const focusable = dialog => [...dialog.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"]')]
    .filter(el => !el.disabled && !el.closest('[hidden]') && el.getClientRects().length);
  function syncDialog() {
    const dialog = document.querySelector('#v7-modal-layer [role="dialog"], .v9-menu-overlay:not([hidden]) [role="dialog"]');
    if (dialog === activeDialog) return;
    if (dialog) {
      returnFocus = document.activeElement;
      activeDialog = dialog;
      const first = focusable(dialog)[0];
      if (first) first.focus();
      else { dialog.tabIndex = -1; dialog.focus(); }
    } else {
      activeDialog = null;
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
      returnFocus = null;
    }
  }
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const menu = document.querySelector('.v11-menu[open],.v8-nav-dropdown[open]');
      if (menu) { menu.open = false; menu.querySelector('summary')?.focus(); }
      if (document.querySelector('#v7-modal-layer .v7-small-modal')) {
        handleAction({ dataset: { action: 'v7ModalClose' } });
        event.preventDefault();
      }
    }
    if (event.key !== 'Tab' || !activeDialog?.isConnected) return;
    const items = focusable(activeDialog);
    if (!items.length) { event.preventDefault(); return; }
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) {
      last.focus(); event.preventDefault();
    } else if (!event.shiftKey && (document.activeElement === last || !activeDialog.contains(document.activeElement))) {
      first.focus(); event.preventDefault();
    }
  });
  const dialogs = new MutationObserver(syncDialog);
  dialogs.observe(document.getElementById('v7-modal-layer'), { childList: true, subtree: true });
  dialogs.observe(app, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] });
  const before = render;
  render = function () { before(); mount(); };
  // Replace any initial legacy auth screen and apply this release on direct links.
  render();
})();
