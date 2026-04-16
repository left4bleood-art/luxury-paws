const fs = require('fs');

const HIST = process.env.HOME + '/Library/Application Support/Code/User/History/-a05e5ff/pzQD.js';

// IDs that were deleted by update-products.js
const removeIds = [
  'microfiber-mat-2','microfiber-mat-4','microfiber-mat-5','microfiber-mat-6',
  'microfiber-mat-7','microfiber-mat-8','microfiber-mat-9','microfiber-mat-10',
  'microfiber-mat-11','microfiber-mat-12','microfiber-mat-13','microfiber-mat-14',
  'winter-trees-bed-2','winter-trees-bed-4','winter-trees-bed-5',
  'ball-with-playful-elastic-laun','rubber-dog-play-bone-shape-10-',
  'dog-play-ball-diameter-6cm-dog','toy-with-tied-cord','smiling-spiked-ball',
  'dog-game-in-the-shape-of-a-rub','stick-with-rope-toy','reward-fillable-egg-dog-toy',
  'bone-toy-with-fabric-cord','dog-toy-bone-twister-13cm','bone-with-relief-mini-pics-15-',
  'colorful-balloon-with-fabric-c','ball-with-knotted-fabric-cord','floating-rugby-ball',
  'multicolored-rotating-rings-ga','gear-shaped-dog-toy','game-for-dogs-assembled-rings',
  'throwing-cloth-bow-ball','rooster-fai-main-natural-fun','tug-bag-shape-natural-fun',
  'dog-coat-green-trek-breathe-co','safe-breathe-comfort-jacket-re',
  'dog-coat-fuchsia-trek-breathe-','dog-coat-sky-blue-trek-breathe',
  'trendy-breathe-comfort-blue-do','dog-coat-gray-trek-breathe-com',
  'scott-breathe-comfort-dog-coat','dog-coat-blue-zip-breathe-comf',
];

const backup = fs.readFileSync(HIST, 'utf8');

// Extract each deleted product block from backup
const extracted = [];
for (const id of removeIds) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match product block: starts with { id:'...' and ends with rating:X.X, ...},
  const regex = new RegExp(
    `(  \\{ id:'${escapedId}'[\\s\\S]*?rating:[\\d.]+[^}]*\\})`,
  );
  const m = backup.match(regex);
  if (m) {
    // Change section to '' so product shows in tabs but NOT on homepage
    let block = m[1].replace(/section:'new-arrivals'/, "section:''");
    block = block.replace(/section:'best-sellers'/, "section:''");
    extracted.push(block);
  } else {
    console.log('WARNING: Could not find product in backup: ' + id);
  }
}

console.log(`Extracted ${extracted.length} products from backup`);

// Now insert them into current script.js, before the bain products (or at end of products array)
let code = fs.readFileSync('script.js', 'utf8');

// Find the position just before ];  const collections
const insertPoint = code.indexOf("];\n\nconst collections");
if (insertPoint === -1) {
  console.log('ERROR: Could not find insertion point');
  process.exit(1);
}

const insertCode = extracted.join(',\n') + ',\n';
code = code.slice(0, insertPoint) + insertCode + code.slice(insertPoint);

fs.writeFileSync('script.js', code, 'utf8');

// Verify
const productMatches = code.match(/{ id:'[^']+', category:'[^']+'/g) || [];
console.log(`Total products now: ${productMatches.length}`);

// Count by category
const cats = {};
for (const m of productMatches) {
  const cat = m.match(/category:'([^']+)'/)[1];
  cats[cat] = (cats[cat] || 0) + 1;
}
for (const [k,v] of Object.entries(cats).sort()) {
  console.log(`  ${k}: ${v}`);
}

// Count by section
const secMatches = code.match(/section:'[^']*'/g) || [];
const secs = {};
for (const m of secMatches) {
  const sec = m.match(/section:'([^']*)'/)[1] || '(empty)';
  secs[sec] = (secs[sec] || 0) + 1;
}
console.log('\nBy section:');
for (const [k,v] of Object.entries(secs).sort()) {
  console.log(`  ${k || '(empty)'}: ${v}`);
}
