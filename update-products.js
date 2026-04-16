const fs = require('fs');

// Products to REMOVE (redundant/duplicates from new-arrivals)
const removeIds = new Set([
  // Redundant microfiber mats (keep original + mat-3 which is different price range)
  'microfiber-mat-2','microfiber-mat-4','microfiber-mat-5','microfiber-mat-6',
  'microfiber-mat-7','microfiber-mat-8','microfiber-mat-9','microfiber-mat-10',
  'microfiber-mat-11','microfiber-mat-12','microfiber-mat-13','microfiber-mat-14',
  // Redundant winter-trees beds (keep original + bed-3 which has 3 sizes)
  'winter-trees-bed-2','winter-trees-bed-4','winter-trees-bed-5',
  // Similar cheap toys (keep the most interesting/unique ones)
  'ball-with-playful-elastic-laun','rubber-dog-play-bone-shape-10-',
  'dog-play-ball-diameter-6cm-dog','toy-with-tied-cord','smiling-spiked-ball',
  'dog-game-in-the-shape-of-a-rub','stick-with-rope-toy','reward-fillable-egg-dog-toy',
  'bone-toy-with-fabric-cord','dog-toy-bone-twister-13cm','bone-with-relief-mini-pics-15-',
  'colorful-balloon-with-fabric-c','ball-with-knotted-fabric-cord','floating-rugby-ball',
  'multicolored-rotating-rings-ga','gear-shaped-dog-toy','game-for-dogs-assembled-rings',
  'throwing-cloth-bow-ball','rooster-fai-main-natural-fun','tug-bag-shape-natural-fun',
  // Redundant dog coats (keep 2-3 best ones, remove similar breathe-comfort variants)
  'dog-coat-green-trek-breathe-co','safe-breathe-comfort-jacket-re',
  'dog-coat-fuchsia-trek-breathe-','dog-coat-sky-blue-trek-breathe',
  'trendy-breathe-comfort-blue-do','dog-coat-gray-trek-breathe-com',
  'scott-breathe-comfort-dog-coat','dog-coat-blue-zip-breathe-comf',
]);

let code = fs.readFileSync('script.js', 'utf8');

// Remove products by finding their blocks
let removedCount = 0;
for (const id of removeIds) {
  // Match from {id:'...' to the closing },\n (next line with { or ])
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(
    `  \\{ id:'${escapedId}'[\\s\\S]*?rating:[\\d.]+[^}]*\\},?\\n`,
    'g'
  );
  const before = code.length;
  code = code.replace(regex, '');
  if (code.length < before) {
    removedCount++;
  } else {
    console.log('WARNING: Could not find product to remove: ' + id);
  }
}
console.log(`Removed ${removedCount} products`);

// Insert new bain products before the closing ];
const bainCode = fs.readFileSync('bain-products.txt', 'utf8');
code = code.replace(
  /(\s*\n\];\n\nconst collections)/,
  bainCode + '\n];\n\nconst collections'
);

fs.writeFileSync('script.js', code, 'utf8');

// Count products by category and section
const productMatches = code.match(/id:'[^']+', category:'[^']+', section:'[^']+'/g) || [];
const stats = {};
for (const m of productMatches) {
  const cat = m.match(/category:'([^']+)'/)[1];
  const sec = m.match(/section:'([^']+)'/)[1];
  const key = `${cat}/${sec}`;
  stats[key] = (stats[key] || 0) + 1;
}
console.log('\nProduct counts:');
let total = 0;
for (const [k, v] of Object.entries(stats).sort()) {
  console.log(`  ${k}: ${v}`);
  total += v;
}
console.log(`  TOTAL: ${total}`);

const naCount = Object.entries(stats).filter(([k]) => k.includes('new-arrivals')).reduce((s, [,v]) => s + v, 0);
console.log(`  new-arrivals total: ${naCount}`);
