const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const entry = path.join(root, 'index.html');
const html = fs.readFileSync(entry, 'utf8').replace(/(src|href)="([^"?]+\.(?:js|css))(?:\?v=[^"]*)?"/g, (match, attr, asset) => {
  if (/^https?:/.test(asset)) return match;
  const hash = crypto.createHash('sha256').update(fs.readFileSync(path.join(root, asset))).digest('hex').slice(0, 12);
  return `${attr}="${asset}?v=${hash}"`;
});
fs.writeFileSync(entry, html);
console.log('Updated browser asset hashes.');
