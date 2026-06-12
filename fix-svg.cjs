const fs = require('fs');
const file = './src/components/AnimatedLogoLoader.tsx';
let txt = fs.readFileSync(file, 'utf8');
txt = txt.replace(/style="stop-color:(.*?)"/g, "style={{ stopColor: '$1' }}");
txt = txt.replace(/style="fill:(.*?);?"/g, "style={{ fill: '$1' }}");
fs.writeFileSync(file, txt);
console.log('Fixed SVG styles');
