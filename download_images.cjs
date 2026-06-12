const fs = require('fs');
const path = require('path');
const https = require('https');

const txtPath = 'c:\\Users\\M.S.I\\Downloads\\Unsplash_4k_Menu_Images.txt';
const publicImagesDir = path.join(__dirname, 'public', 'images', 'menu_4k');

if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const content = fs.readFileSync(txtPath, 'utf-8');
const lines = content.split('\n');

const imagesToDownload = [];

for (const line of lines) {
  const match = line.match(/^- (.*?)\s*\((.*?)\):\s*(http.*)/);
  if (match) {
    const arName = match[1].trim();
    const enName = match[2].trim();
    const url = match[3].trim();
    
    // Slugify enName
    const filename = enName.toLowerCase().replace(/[^a-z0-9]+/g, '_') + '.jpg';
    imagesToDownload.push({ arName, enName, url, filename });
  }
}

console.log(`Found ${imagesToDownload.length} images to download.`);

fs.writeFileSync(path.join(__dirname, 'downloaded_mapping.json'), JSON.stringify(imagesToDownload, null, 2));

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else if (res.statusCode === 302 || res.statusCode === 301) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const item of imagesToDownload) {
    const filepath = path.join(publicImagesDir, item.filename);
    if (fs.existsSync(filepath)) {
      console.log(`[SKIP] ${item.filename} already exists.`);
      continue;
    }
    console.log(`Downloading ${item.enName}...`);
    try {
      await downloadImage(item.url, filepath);
      console.log(`[OK] Saved to ${item.filename}`);
    } catch (e) {
      console.error(`[ERROR] Failed to download ${item.enName}:`, e.message);
    }
  }
  console.log('All downloads finished.');
}

run();
