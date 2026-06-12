const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let content = fs.readFileSync(menuPath, 'utf-8');

const replacements = [
  { match: /category: "ايس كوفي", title: "(.*?)", price: "(.*?)", image: getImg\("pepsi\.jpg"\)/g, replace: 'category: "ايس كوفي", title: "$1", price: "$2", image: getImg("cappuccino.jpg")' },
  { match: /category: "ميلك شيك", title: "(.*?)", price: "(.*?)", image: getImg\("pepsi\.jpg"\)/g, replace: 'category: "ميلك شيك", title: "$1", price: "$2", image: getImg("ice_cream.jpg")' },
  { match: /category: "ميلك شيك", title: "(.*?)", price: "(.*?)", image: getImg\("water\.jpg"\)/g, replace: 'category: "ميلك شيك", title: "$1", price: "$2", image: getImg("ice_cream.jpg")' },
  { match: /category: "ايس كريم", title: "(.*?)", desc: "(.*?)", price: "(.*?)", image: getImg\("cheesecake\.jpg"\)/g, replace: 'category: "ايس كريم", title: "$1", desc: "$2", price: "$3", image: getImg("ice_cream.jpg")' },
  { match: /category: "ايس كريم", title: "براد صغير", price: "2", image: getImg\("water\.jpg"\)/g, replace: 'category: "ايس كريم", title: "براد صغير", price: "2", image: getImg("ice_cream.jpg")' },
  { match: /category: "ايس كريم", title: "براد مع بوظة", price: "15", image: getImg\("water\.jpg"\)/g, replace: 'category: "ايس كريم", title: "براد مع بوظة", price: "15", image: getImg("ice_cream.jpg")' },
];

for (const r of replacements) {
  content = content.replace(r.match, r.replace);
}

fs.writeFileSync(menuPath, content);
console.log("Menu polished!");
