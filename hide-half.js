const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

// Find all new-arrivals products
const regex = /\{ id:'([^']+)', category:'([^']+)', section:'new-arrivals'/g;
const allNA = [];
let m;
while ((m = regex.exec(code)) !== null) {
  allNA.push({ id: m[1], category: m[2], pos: m.index });
}

console.log(`Total new-arrivals: ${allNA.length}`);

// Group by category
const byCat = {};
for (const p of allNA) {
  (byCat[p.category] = byCat[p.category] || []).push(p);
}
for (const [cat, items] of Object.entries(byCat)) {
  console.log(`  ${cat}: ${items.length}`);
}

// Take every other product from each category to hide (keep variety)
const toHide = [];
for (const [cat, items] of Object.entries(byCat)) {
  for (let i = 1; i < items.length; i += 2) {
    toHide.push(items[i].id);
  }
}

console.log(`\nWill hide ${toHide.length} products from homepage (change new-arrivals to empty):`);
for (const id of toHide) {
  console.log(`  - ${id}`);
}

// Apply changes
let count = 0;
for (const id of toHide) {
  const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const r = new RegExp(`(\\{ id:'${escaped}', category:'[^']+', section:)'new-arrivals'`);
  if (r.test(code)) {
    code = code.replace(r, "$1''");
    count++;
  } else {
    console.log(`  WARNING: could not find ${id}`);
  }
}

console.log(`\nChanged ${count} products`);
fs.writeFileSync('script.js', code, 'utf8');

// Final counts
const secMatches = code.match(/section:'[^']*'/g) || [];
const secs = {};
for (const m of secMatches) {
  const sec = m.match(/section:'([^']*)'/)[1] || '(empty)';
  secs[sec] = (secs[sec] || 0) + 1;
}
console.log('\nFinal section counts:');
for (const [k,v] of Object.entries(secs).sort()) {
  console.log(`  ${k || '(empty)'}: ${v}`);
}
