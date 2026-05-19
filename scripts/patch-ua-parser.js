const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'node_modules', 'next', 'dist', 'compiled', 'ua-parser-js', 'ua-parser.js');

if (!fs.existsSync(filePath)) {
  console.log('[patch-ua-parser] File not found, skipping.');
  process.exit(0);
}

let content = fs.readFileSync(filePath, 'utf8');

const original = 'if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";';
const patched = 'if(typeof __nccwpck_require__!=="undefined"&&typeof __dirname!=="undefined")__nccwpck_require__.ab=__dirname+"/";';

if (content.includes(patched)) {
  console.log('[patch-ua-parser] Already patched, skipping.');
  process.exit(0);
}

if (!content.includes(original)) {
  console.log('[patch-ua-parser] Target line not found, skipping.');
  process.exit(0);
}

content = content.replace(original, patched);
fs.writeFileSync(filePath, content);
console.log('[patch-ua-parser] Patched ua-parser-js for Edge Runtime compatibility.');
