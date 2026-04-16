const fs = require('fs');
const code = fs.readFileSync('bain-products.txt','utf8');
const dupes = [
  'hydrating-cream-masque-final-sublimateur',
  'mix-pink-conditionner-bi-phase',
  'bio-energy-plus-masque-pre-bain',
  'bain-pro-shampoing-doux-tous-pelages',
  'aquadolce-apres-shampoing-chien',
  'extra-body-cream-masque-final-volumisant',
  'glossy-pose'
];
let lines = code.split('\n');
let result = [];
let skip = false;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes("id:'")) {
    const id = line.match(/id:'([^']+)'/);
    if (id && dupes.includes(id[1])) {
      skip = true;
      console.log('Removing duplicate: ' + id[1]);
    } else {
      skip = false;
    }
  }
  if (!skip) result.push(line);
}
fs.writeFileSync('bain-products.txt', result.join('\n'), 'utf8');
const remaining = result.filter(l => l.includes("id:'")).length;
console.log('Remaining products: ' + remaining);
