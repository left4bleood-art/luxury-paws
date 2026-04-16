const fs = require('fs');

let code = fs.readFileSync('script.js', 'utf8');

function hideHalf(code, sectionName) {
  const regex = new RegExp(`\\{ id:'([^']+)', category:'([^']+)', section:'${sectionName}'`, 'g');
  const all = [];
  let m;
  while ((m = regex.exec(code)) !== null) {
    all.push({ id: m[1], category: m[2] });
  }
  console.log(`${sectionName}: ${all.length} total`);

  // Take every other one to hide
  const toHide = [];
  for (let i = 1; i < all.length; i += 2) {
    toHide.push(all[i].id);
  }
  console.log(`  Hiding ${toHide.length} from homepage`);

  let count = 0;
  for (const id of toHide) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const r = new RegExp(`(\\{ id:'${escaped}', category:'[^']+', section:)'${sectionName}'`);
    if (r.test(code)) {
      code = code.replace(r, "$1''");
      count++;
    }
  }
  console.log(`  Changed: ${count}`);
  return code;
}

code = hideHalf(code, 'best-sellers');
code = hideHalf(code, 'new-arrivals');

fs.writeFileSync('script.js', code, 'utf8');

// Final counts
const secMatches = code.match(/section:'[^']*'/g) || [];
const secs = {};
for (const m of secMatches) {
  const sec = m.match(/section:'([^']*)'/)[1] || '(empty)';
  secs[sec] = (secs[sec] || 0) + 1;
}
console.log('\nFinal homepage counts:');
for (const [k,v] of Object.entries(secs).sort()) {
  console.log(`  ${k || '(hidden)'}: ${v}`);
}
