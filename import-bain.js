const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const MARKUP = 1.5;
const IMG_DIR = path.join(__dirname, 'images');
let imgCounter = 367; // start after last existing image

// Existing product IDs from script.js
const existingIds = new Set([
  'aquarosa-pro','hydrating-cream','mix-pink','bio-energy-plus','bain-pro',
  'aqua-dolce','huiles-4-elements','hygro-fluid','extra-body-cream',
  'villanelle-creme-ultra-demelan','glossy-pose-pour-plomber-allou'
]);

// Skip non-product items
const skipHandles = new Set([
  'catalogue-special-one-download'
]);

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJSON(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch(e) { reject(new Error('JSON parse error: ' + e.message)); }
      });
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    const attempt = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error('Too many redirects'));
      mod.get(u, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return attempt(res.headers.location, redirects + 1);
        }
        if (res.statusCode !== 200) return reject(new Error('HTTP ' + res.statusCode));
        const ws = fs.createWriteStream(filepath);
        res.pipe(ws);
        ws.on('finish', () => { ws.close(); resolve(); });
        ws.on('error', reject);
      }).on('error', reject);
    };
    attempt(url);
  });
}

function getCosType(product) {
  const tags = (product.tags || []).join(' ').toLowerCase();
  const title = product.title.toLowerCase();
  if (tags.includes('shampoings') || title.includes('shampoo') || title.includes('shampoing')) return 'shampoo';
  if (tags.includes('masques') || title.includes('mask') || title.includes('masque') || title.includes('cream') || title.includes('crème')) return 'mask';
  if (tags.includes('huiles') || tags.includes('serum') || title.includes('oil') || title.includes('serum') || title.includes('huile')) return 'serum';
  if (tags.includes('stylers') || tags.includes('finition') || title.includes('spray') || title.includes('style') || title.includes('lacquer') || title.includes('laque') || title.includes('fix')) return 'spray';
  if (tags.includes('hygiène') || title.includes('ear') || title.includes('eye') || title.includes('hygiene') || title.includes('rinse')) return 'other';
  if (tags.includes('poudre') || title.includes('powder')) return 'other';
  if (title.includes('perfume') || title.includes('parfum')) return 'spray';
  if (title.includes('color') || title.includes('couleur') || title.includes('mod c')) return 'other';
  return 'shampoo';
}

function sanitizeText(text) {
  if (!text) return '';
  // Remove HTML tags
  let clean = text.replace(/<[^>]+>/g, ' ');
  // Decode HTML entities
  clean = clean.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');
  // Collapse whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  // Truncate 
  if (clean.length > 200) clean = clean.substring(0, 197) + '...';
  // Escape single quotes for JS string
  clean = clean.replace(/'/g, "\\'");
  return clean;
}

async function main() {
  console.log('Fetching bain collection products...');
  const data = await fetchJSON('https://petdesign.fr/en/collections/bain/products.json?limit=250');
  const products = data.products;
  console.log(`Found ${products.length} products in bain collection`);

  const newProducts = [];

  for (const p of products) {
    // Skip catalogue and non-products
    if (skipHandles.has(p.handle)) {
      console.log(`  SKIP (not a product): ${p.title}`);
      continue;
    }

    // Check if product handle matches any existing ID
    const handle = p.handle;
    if (existingIds.has(handle)) {
      console.log(`  SKIP (already exists by handle): ${p.title}`);
      continue;
    }

    // Check availability
    const available = p.variants.some(v => v.available);
    if (!available) {
      console.log(`  SKIP (unavailable): ${p.title}`);
      continue;
    }

    // Get cheapest available variant price with 50% markup
    const availableVariants = p.variants.filter(v => v.available);
    const minPrice = Math.min(...availableVariants.map(v => parseFloat(v.price)));
    const markedUpPrice = Math.round(minPrice * MARKUP);

    // Get dimensions/sizes from variants
    const dimensions = availableVariants.map(v => v.title).filter(t => t !== 'Default Title');

    // Get images (max 5)
    const imageUrls = (p.images || []).slice(0, 5).map(img => img.src);
    if (imageUrls.length === 0) {
      console.log(`  SKIP (no images): ${p.title}`);
      continue;
    }

    // Download images
    const imagePaths = [];
    for (const imgUrl of imageUrls) {
      const ext = imgUrl.match(/\.(png|jpg|jpeg|webp)/i)?.[1] || 'jpg';
      const filename = `${imgCounter}.${ext}`;
      const filepath = path.join(IMG_DIR, filename);
      try {
        await downloadImage(imgUrl.replace(/\?.*/, ''), filepath); // Remove query params for cleaner download
        imagePaths.push(`images/${filename}`);
        imgCounter++;
        process.stdout.write('.');
      } catch(e) {
        console.log(`\n  Warning: failed to download ${imgUrl}: ${e.message}`);
      }
    }
    if (imagePaths.length === 0) {
      console.log(`  SKIP (image download failed): ${p.title}`);
      continue;
    }

    const description = sanitizeText(p.body_html);
    const cosType = getCosType(p);

    // Truncate handle for ID if > 40 chars
    let productId = handle;
    if (productId.length > 40) productId = productId.substring(0, 40);

    newProducts.push({
      id: productId,
      title: p.title,
      description,
      price: markedUpPrice,
      image: imagePaths[0],
      images: imagePaths,
      cosType,
      dimensions
    });

    console.log(`\n  OK: ${p.title} → €${markedUpPrice} (${cosType}) [${imagePaths.length} imgs]`);
  }

  console.log(`\n\nTotal new products: ${newProducts.length}`);

  // Generate code
  let code = '\n  // ── COSMETICS - Bain Collection (PetDesign) ──\n';
  for (const p of newProducts) {
    const dimStr = p.dimensions.length > 0 ? `, dimensions:[${p.dimensions.map(d => `'${d}'`).join(',')}]` : '';
    const imagesStr = p.images.length > 1 ? `, images:[${p.images.map(i => `'${i}'`).join(',')}]` : '';
    code += `  { id:'${p.id}', category:'cosmetics', section:'new-arrivals',\n`;
    code += `    name:{ ru:'${p.title.replace(/'/g, "\\'")}', en:'${p.title.replace(/'/g, "\\'")}', sr:'${p.title.replace(/'/g, "\\'")}' },\n`;
    code += `    description:{ ru:'${p.description}', en:'${p.description}', sr:'${p.description}' },\n`;
    code += `    price:${p.price}, image:'${p.image}'${imagesStr},\n`;
    code += `    rating:4.8, cosType:'${p.cosType}'${dimStr} },\n`;
  }

  fs.writeFileSync(path.join(__dirname, 'bain-products.txt'), code, 'utf8');
  console.log('Product code saved to bain-products.txt');
}

main().catch(e => console.error(e));
