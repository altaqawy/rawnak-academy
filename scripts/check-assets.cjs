const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
let count = 0;
for (const file of fs.readdirSync(root).filter(name => name.endsWith('.js'))) {
  new vm.Script(fs.readFileSync(path.join(root, file), 'utf8'), { filename: file }); count++;
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
for (const [, asset] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (/^(https?:|data:)/.test(asset)) continue;
  if (!fs.existsSync(path.join(root, asset))) throw new Error('Missing asset: ' + asset);
}
for (const file of fs.readdirSync(root).filter(name => name.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(root, file), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  if ((css.match(/\{/g) || []).length !== (css.match(/\}/g) || []).length) throw new Error('Unbalanced CSS: ' + file);
}
console.log(`Validated ${count} scripts, entry assets and stylesheet structure.`);
