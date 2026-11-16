const { parseHTML } = require('linkedom');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
function academy(options = {}) {
  const { window } = parseHTML(html);
  const local = new Map(Object.entries(options.storage || {}));
  const frames = new Map(), timers = new Map(), listeners = new Map(), blobs = [];
  let next = 1;
  const calls = { scroll: [], downloads: [] };
  const location = { hash: '#/' + (options.route || 'welcome'), origin: 'https://academy.test', href: 'https://academy.test/' };
  const context = {
    window: null, document: window.document, location,
    localStorage: { getItem: k => local.get(k) ?? null, setItem: (k, v) => local.set(k, String(v)), key: i => [...local.keys()][i], get length() { return local.size; } },
    console, structuredClone, Node: window.Node, Element: window.Element, HTMLElement: window.HTMLElement,
    NodeFilter: { SHOW_TEXT: 4 }, MutationObserver: window.MutationObserver, Event: window.Event,
    URL: class extends URL { static createObjectURL(blob) { blobs.push(blob); return 'blob:test'; } static revokeObjectURL() {} }, Blob,
    setTimeout: fn => { timers.set(next, fn); return next++; }, clearTimeout: id => timers.delete(id),
    setInterval: () => next++, clearInterval() {},
    requestAnimationFrame: fn => { frames.set(next, fn); return next++; }, cancelAnimationFrame: id => frames.delete(id),
    matchMedia: query => ({ matches: query.includes('prefers-reduced-motion') ? !!options.reduced : false, addEventListener() {}, removeEventListener() {} }),
    addEventListener: (name, fn) => { if (!listeners.has(name)) listeners.set(name, []); listeners.get(name).push(fn); },
    removeEventListener() {}, scrollTo() {}, innerWidth: 1440, innerHeight: 900, scrollY: 0,
    navigator: { language: 'en' }, performance: { now: () => 0 },
    getComputedStyle: () => ({ getPropertyValue: () => '', display: 'block' }),
    FormData: class { constructor(form) { this.form = form; } get(name) { return this.form.querySelector(`[name="${name}"]`)?.value ?? null; } }
  };
  context.window = context;
  window.HTMLElement.prototype.scrollIntoView = function () { calls.scroll.push(this.id); };
  window.HTMLElement.prototype.focus = function () {};
  window.HTMLElement.prototype.getBoundingClientRect = () => ({ top: 0, left: 0, width: 100, height: 100, bottom: 100 });
  window.HTMLElement.prototype.getClientRects = () => [{}];
  window.HTMLAnchorElement.prototype.click = function () { calls.downloads.push(this.download); };
  vm.createContext(context);
  function run(code) { return vm.runInContext(code, context); }
  for (const [, src] of html.matchAll(/<script src="([^"]+)"/g)) {
    vm.runInContext(fs.readFileSync(path.join(root, src.split('?')[0]), 'utf8'), context, { filename: src });
  }
  async function flush() {
    for (let i = 0; i < 12; i++) {
      await Promise.resolve();
      const pending = [...frames.values()]; frames.clear();
      for (const fn of pending) fn();
      if (!pending.length && i > 2) return;
    }
    if (frames.size) throw new Error('Render did not settle');
  }
  async function visit(route) { location.hash = '#/' + route; run('render()'); await flush(); }
  async function role(value) { run(`handleAction({dataset:{action:'v7Demo',role:${JSON.stringify(value)}}})`); await flush(); }
  function submit(selector, fields) {
    const form = context.document.querySelector(selector);
    if (!form) throw new Error('Missing form: ' + selector);
    for (const [name, value] of Object.entries(fields)) {
      const input = form.querySelector(`[name="${name}"]`);
      if (!input) throw new Error('Missing field: ' + name);
      if (input.tagName === 'SELECT') for (const option of input.querySelectorAll('option')) option.selected = option.value === value;
      else input.value = value;
    }
    form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  }
  return { context, document: context.document, local, run, flush, visit, role, submit, calls, blobs };
}
module.exports = { academy, root, html };
