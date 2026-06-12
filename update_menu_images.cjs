const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let menuContent = fs.readFileSync(menuPath, 'utf-8');

// Change getImg implementation
menuContent = menuContent.replace(
  /const images.*?;\nconst getImg.*?;/,
  `const getImg = (name: string) => '/images/menu_4k/' + name;`
);

// Map old image names or titles to new ones
const replacements = [
  { match: /getImg\("shawarma(?:_wrap(?:_1)?)?\.jpg"\)/g, replace: 'getImg("shawarma_wrap.jpg")' },
  { match: /getImg\("kibbeh\.jpg"\)/g, replace: 'getImg("meat_shawarma_arabi.jpg")' },
  { match: /getImg\("mixed_grill\.jpg"\)/g, replace: 'getImg("mixed_grill.jpg")' },
  { match: /getImg\("kofta\.jpg"\)/g, replace: 'getImg("meat_kebab.jpg")' },
  { match: /getImg\("shish_tawook\.jpg"\)/g, replace: 'getImg("shish_tawook.jpg")' },
  { match: /getImg\("grilled_chicken_ar\.jpg"\)/g, replace: 'getImg("grilled_chicken_half.jpg")' },
  { match: /getImg\("chicken_wings\.jpg"\)/g, replace: 'getImg("chicken_wings.jpg")' },
  { match: /getImg\("grilled_chicken_1\.jpg"\)/g, replace: 'getImg("broasted_chicken.jpg")' },
  { match: /getImg\("cheese_burger\.jpg"\)/g, replace: 'getImg("cheese_burger.jpg")' },
  { match: /getImg\("chicken_sandwich(?:_1)?\.jpg"\)/g, replace: 'getImg("chicken_burger.jpg")' },
  { match: /getImg\("burger_1\.jpg"\)/g, replace: 'getImg("chicken_zinger_burger.jpg")' },
  { match: /getImg\("mozzarella_sticks\.jpg"\)/g, replace: 'getImg("mozzarella_sticks.jpg")' },
  { match: /getImg\("beef_sandwich\.jpg"\)/g, replace: 'getImg("cheese_burger.jpg")' },
  { match: /getImg\("chicken_burger\.jpg"\)/g, replace: 'getImg("chicken_burger.jpg")' },
  { match: /getImg\("falafel\.jpg"\)/g, replace: 'getImg("falafel_plate.jpg")' },
  { match: /getImg\("spicy_wings\.jpg"\)/g, replace: 'getImg("chicken_wings.jpg")' },
  { match: /"https:\/\/images\.unsplash\.com\/photo-1513104890138-7c749659a591\?q=80&w=600&auto=format&fit=crop"/g, replace: 'getImg("vegetable_pizza.jpg")' },
  { match: /getImg\("salad(?:_1)?\.jpg"\)/g, replace: 'getImg("fatoush_salad.jpg")' },
  { match: /getImg\("french_fries\.jpg"\)/g, replace: 'getImg("french_fries.jpg")' },
  { match: /getImg\("cheese_fries\.jpg"\)/g, replace: 'getImg("french_fries_with_cheese.jpg")' },
  
  // Cafe
  { match: /title: "قهوة تركي", price: "8", image: getImg\(".*?"\)/g, replace: 'title: "قهوة تركي", price: "8", image: getImg("turkish_coffee.jpg")' },
  { match: /title: "قهوة اسبريسو", price: "10", image: getImg\(".*?"\)/g, replace: 'title: "قهوة اسبريسو", price: "10", image: getImg("arabic_coffee.jpg")' },
  { match: /title: "نسكافيه", price: "10", image: getImg\(".*?"\)/g, replace: 'title: "نسكافيه", price: "10", image: getImg("cappuccino.jpg")' },
  { match: /title: "كابتشينو", price: "12", image: getImg\(".*?"\)/g, replace: 'title: "كابتشينو", price: "12", image: getImg("cappuccino.jpg")' },
  { match: /title: "شاي نكهات", price: "7" , image: getImg\(".*?"\)/g, replace: 'title: "شاي نكهات", price: "7" , image: getImg("tea.jpg")' },
  { match: /getImg\("coca_cola\.jpg"\)/g, replace: 'getImg("pepsi.jpg")' }, // default replacements
  { match: /getImg\("chocolate_cake\.jpg"\)/g, replace: 'getImg("chocolate_cake.jpg")' },
  { match: /getImg\("cheesecake\.jpg"\)/g, replace: 'getImg("cheesecake.jpg")' },
  { match: /getImg\("water(?:_1)?\.jpg"\)/g, replace: 'getImg("water.jpg")' },
  { match: /getImg\("orange_juice(?:_1)?\.jpg"\)/g, replace: 'getImg("fresh_orange_juice.jpg")' },
  { match: /getImg\("cola_1\.jpg"\)/g, replace: 'getImg("pepsi.jpg")' },
  { match: /getImg\("7up\.jpg"\)/g, replace: 'getImg("7up.jpg")' },
  { match: /getImg\("mirinda\.jpg"\)/g, replace: 'getImg("7up.jpg")' },
];

for (const r of replacements) {
  menuContent = menuContent.replace(r.match, r.replace);
}

// Ensure pizza 1 and 2 and 3 are correct
menuContent = menuContent.replace(/بيتزا خضار وسط.*?"15"/g, 'بيتزا خضار وسط", price: "15"');

const categoryImagesReplace = `export const categoryImages: Record<string, string> = {
  "شاورما": "/images/menu_4k/shawarma_wrap.jpg",
  "مشاوي": "/images/menu_4k/mixed_grill.jpg",
  "ساندوتشات": "/images/menu_4k/chicken_fajita_sandwich.jpg",
  "وجبات": "/images/menu_4k/broasted_chicken.jpg",
  "بيتزا": "/images/menu_4k/margherita_pizza.jpg",
  "مقبلات": "/images/menu_4k/hummus.jpg",
  "مشروبات ساخنة": "/images/menu_4k/cappuccino.jpg",
  "حلويات": "/images/menu_4k/cheesecake.jpg",
  "ميلك شيك": "/images/menu_4k/ice_cream.jpg",
  "مشروبات باردة": "/images/menu_4k/fresh_orange_juice.jpg",
  "موهيتو": "/images/menu_4k/7up.jpg",
  "ايس كوفي": "/images/menu_4k/cappuccino.jpg",
  "ايس كريم": "/images/menu_4k/ice_cream.jpg",
  default: "/images/menu_4k/cheese_burger.jpg",
};`;

menuContent = menuContent.replace(/export const categoryImages[\s\S]*?};/, categoryImagesReplace);

fs.writeFileSync(menuPath, menuContent);
console.log('menu.ts updated successfully!');
