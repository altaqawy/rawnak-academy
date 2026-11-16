const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
let count = 0;
for (const file of fs.readdirSync(root).filter(name => name.endsWith('.js'))) {
  new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file }); count++;
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [, asset] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(asset)) continue;
  const [file, query] = asset.split('?');
  if (!fs.existsSync(path.join(root, file))) throw new Error('Missing asset: ' + asset);
  if (/\.(js|css)$/.test(file)) {
    const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex').slice(0, 12);
    if (query !== 'v=' + hash) throw new Error('Stale asset URL, run npm run version-assets: ' + file);
  }
}
for (const file of fs.readdirSync(root).filter(name => name.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(root, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  if ((css.match(/\{/g) || []).length !== (css.match(/\}/g) || []).length) throw new Error('Unbalanced CSS: ' + file);
}
console.log(`Validated ${count} scripts, entry assets and stylesheet structure.`);
