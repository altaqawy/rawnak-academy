const { test } = require('node:test');
const assert = require('node:assert/strict');
const { academy, html } = require('./harness.cjs');

for (const locale of ['ar', 'en']) {
  test(`public pages and password-free previews in ${locale}`, async () => {
    const a = academy({ storage: { 'rawnak-academy-language': locale } });
    await a.flush();
    assert.equal(a.document.documentElement.lang, locale);
    assert.equal(a.document.documentElement.dir, locale === 'ar' ? 'rtl' : 'ltr');
    assert.equal(a.document.querySelectorAll('#v12-hero-title .v14-word').length > 2, true);
    assert.ok(a.document.querySelector('.v12-hero-actions .v14-arrow'));
    assert.equal(a.document.querySelector('#v12-hero-title').getAttribute('aria-label').includes(locale === 'ar' ? 'اتعلّم' : 'Build skills'), true);
    for (const link of a.document.querySelectorAll('[data-v7-scroll]')) assert.ok(a.document.getElementById(link.dataset.v7Scroll), link.dataset.v7Scroll);
    for (const route of ['login', 'signup', 'platform', 'privacy', 'support', 'unknown', '%E0%A4%A', 'book/%E0%A4%A']) {
      await a.visit(route);
      assert.ok(a.document.querySelector('#app main h1'), route);
      assert.equal(a.document.querySelectorAll('input[type="password"]').length, 0);
    }
    await a.visit('signup');
    assert.equal(a.document.querySelectorAll('[data-action="v7Demo"]').length, 3);
  });
}

test('language switching restores source text, heading labels and page title', async () => {
  const a = academy(); await a.flush();
  const original = a.document.querySelector('#app h1').getAttribute('aria-label');
  a.run("RawnakAcademyI18n.setLocale('en')"); await a.flush();
  assert.match(a.document.title, /^RAWNAK ACADEMY/);
  assert.match(a.document.querySelector('#app h1').getAttribute('aria-label'), /Build skills/);
  a.run("RawnakAcademyI18n.setLocale('ar')"); await a.flush();
  assert.equal(a.document.querySelector('#app h1').getAttribute('aria-label'), original);
  assert.match(a.document.title, /^RAWNAK ACADEMY/);
});

test('all student, educator and owner routes render without fabricated data', async () => {
  const a = academy(); await a.flush();
  const routes = {
    student: ['my-learning','courses','classroom','tools','wallet','leaderboard','book-library','split-study','study-planner','portfolio','onboarding','student-settings'],
    instructor: ['instructor','instructor-courses','instructor-students','instructor-earnings','instructor-books','instructor-qr-studio','instructor-question-bank','instructor-settings'],
    owner: ['owner','owner-courses','owner-instructors','owner-books','owner-analytics','owner-finance','owner-settings']
  };
  for (const [role, paths] of Object.entries(routes)) {
    await a.role(role);
    for (const route of paths) {
      await a.visit(route);
      assert.ok(a.document.querySelector('#app main'), route);
      assert.ok(a.document.querySelector('.v7-portal'), route);
      assert.doesNotMatch(a.document.getElementById('app').textContent, /420 credits|1,180 XP|q-seed-/);
      assert.equal(a.document.querySelectorAll('.v14-backup').length, route.endsWith('settings') ? 1 : 0);
    }
  }
});

test('unlinked educator books and questions save and survive reload', async () => {
  const a = academy(); await a.flush(); await a.role('instructor');
  await a.visit('instructor-books');
  a.submit('#v75-book-form', { title: 'QA workbook', edition: 'First', course: '', description: 'QA draft' });
  await a.flush();
  assert.equal(a.run('v75Books.length'), 1);
  assert.equal(a.run('v75Books[0].course'), '');
  await a.visit('instructor-question-bank');
  assert.equal(a.document.querySelector('select[name="level"] option').value, 'Easy');
  a.submit('#v75-question-form', { course: '', lesson: '-1', level: 'Easy', topic: 'QA', question: 'Which answer?', choiceA: 'First', choiceB: 'Second', choiceC: 'Third', correct: '0', explanation: 'Draft explanation' });
  await a.flush();
  assert.equal(a.run('v75Questions.length'), 1);
  assert.equal(a.run('v75Questions[0].lesson'), -1);
  const b = academy({ storage: Object.fromEntries(a.local) }); await b.flush();
  assert.equal(b.run('v75Books[0].title'), 'QA workbook');
  assert.equal(b.run('v75Questions[0].question'), 'Which answer?');
});

test('section links from a public information page navigate home then scroll', async () => {
  const a = academy({ route: 'privacy' }); await a.flush();
  const link = a.document.querySelector('[data-v7-scroll="smart-books"]');
  link.dispatchEvent(new a.context.Event('click', { bubbles: true, cancelable: true }));
  assert.equal(a.context.location.hash, '#/welcome');
  a.run('render()'); await a.flush();
  assert.ok(a.calls.scroll.includes('smart-books'));
});

test('modal status and buttons are translated outside the app root', async () => {
  const a = academy(); await a.flush();
  a.run("handleAction({dataset:{action:'v7WhatsApp'}})"); await a.flush();
  assert.match(a.document.querySelector('#v7-modal-layer').textContent, /التواصل لسه غير متاح/);
  a.document.dispatchEvent(Object.assign(new a.context.Event('keydown', { bubbles: true }), { key: 'Escape' }));
  await a.flush();
  assert.equal(a.document.querySelector('#v7-modal-layer').textContent, '');
});

test('backup includes drafts and omits contacts and preview sessions', async () => {
  const a = academy({ storage: {
    'rawnak_academy_v7_notes': JSON.stringify('My notes'),
    'rawnak_academy_v7_profile': JSON.stringify({ email: 'private@example.test' }),
    'rawnak_academy_v7_signups': JSON.stringify([{ name: 'Contact' }])
  } });
  await a.flush(); await a.role('student'); await a.visit('student-settings');
  a.document.querySelector('[data-academy-backup]').dispatchEvent(new a.context.Event('click', { bubbles: true }));
  assert.equal(a.blobs.length, 1);
  const data = JSON.parse(await a.blobs[0].text());
  assert.equal(data.records.rawnak_academy_v7_notes, 'My notes');
  assert.equal(data.records.rawnak_academy_v7_profile, undefined);
  assert.equal(data.records.rawnak_academy_v7_session, undefined);
  assert.equal(data.records.rawnak_academy_v7_signups, undefined);
});

test('invalid saved preview roles do not crash or expose a workspace', async () => {
  const a = academy({ storage: { 'rawnak_academy_v7_session': JSON.stringify({ role: 'administrator', profile: [] }) } });
  await a.flush();
  assert.equal(a.run('v7role()'), null);
  assert.ok(a.document.querySelector('.v12-public'));
});

test('content drafts escape markup instead of executing it', async () => {
  const a = academy(); await a.flush(); await a.role('owner'); await a.visit('owner-courses');
  a.submit('#v7-course-form', { name: '<img src=x onerror=alert(1)>', category: 'Design' }); await a.flush();
  assert.equal(a.document.querySelectorAll('img[onerror]').length, 0);
  assert.match(a.document.getElementById('app').textContent, /<img src=x onerror=alert\(1\)>/);
  a.submit('#v7-course-form', { name: 'Design', category: 'Design' }); await a.flush();
  assert.ok([...a.document.querySelectorAll('td[translate="no"]')].some(td => td.textContent === 'Design'));
});

test('reduced motion and saved motion-off expose readable headings', async () => {
  const a = academy({ reduced: true }); await a.flush();
  assert.equal(a.document.documentElement.dataset.rawnakMotion, 'off');
  const b = academy({ storage: { 'rawnak_academy_v3_v4Motion': '"off"' } }); await b.flush();
  assert.equal(b.document.documentElement.dataset.rawnakMotion, 'off');
  assert.ok(b.document.querySelector('#app h1').textContent.length);
});

test('entry document executes no inline scripts under its CSP', () => {
  assert.equal([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].some(m => m[2].trim()), false);
  assert.match(html, /script-src 'self'/);
  assert.match(html, /form-action 'none'/);
});

test('English wordmark and alpha-preserving negative footer identity survive locale changes', async () => {
  const a = academy(); await a.flush();
  for (const lang of ['ar', 'en', 'ar']) {
    a.run(`RawnakAcademyI18n.setLocale('${lang}')`); await a.flush();
    for (const brand of a.document.querySelectorAll('.v15-brand')) {
      assert.equal(brand.querySelector('strong').textContent, 'RAWNAK');
      assert.equal(brand.querySelector('small').textContent, 'ACADEMY');
      assert.equal(brand.getAttribute('dir'), 'ltr');
      assert.equal(brand.getAttribute('translate'), 'no');
    }
    assert.equal(a.document.querySelector('footer .v15-brand img').getAttribute('src'), 'assets/rawnak-academy-negative-hd.svg');
    assert.doesNotMatch(a.document.querySelector('#app').textContent, /رونق\s+[أا]كاد(?:يم|م)[يى]/);
    assert.doesNotMatch(a.document.querySelector('.v12-kicker').textContent, /أكاديمي/);
  }
  await a.role('student'); await a.visit('student-settings');
  assert.equal(a.document.querySelector('.v7-sidebar .v15-brand strong').textContent, 'RAWNAK');
  await a.visit('privacy');
  assert.ok(a.document.querySelector('.v15-nav'));
  assert.ok(a.document.querySelector('footer .v15-brand-negative'));
});

test('Academy mobile panel closes on Escape and section navigation and restores background access', async () => {
  const a = academy(); await a.flush();
  const toggle = () => a.document.querySelector('[data-v15-toggle]');
  const click = el => el.dispatchEvent(new a.context.Event('click', { bubbles: true, cancelable: true }));
  click(toggle()); await a.flush();
  assert.equal(toggle().getAttribute('aria-expanded'), 'true');
  assert.equal(a.document.querySelector('[data-v15-menu]').hidden, false);
  assert.equal(a.document.querySelector('#app main').inert, true);
  a.document.dispatchEvent(Object.assign(new a.context.Event('keydown', { bubbles: true }), { key: 'Escape' }));
  assert.equal(toggle().getAttribute('aria-expanded'), 'false');
  assert.equal(a.document.querySelector('[data-v15-menu]').hidden, true);
  assert.equal(a.document.querySelector('#app main').inert, false);
  click(toggle());
  click(a.document.querySelector('.v15-menu-panel [data-v7-scroll="courses"]'));
  await a.flush();
  assert.equal(toggle().getAttribute('aria-expanded'), 'false');
  assert.equal(a.document.querySelector('#app main').inert, false);
  assert.ok(a.calls.scroll.includes('courses'));
  assert.equal(a.context.document.body.style.overflow, '');
});
