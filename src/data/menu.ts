export type Branch = "restaurant" | "cafe";

export interface MenuItem {
  id?: string;
  branch: Branch;
  category: string;
  title: string;
  desc?: string;
  price: string;
  image?: string;
}

const getImg = (name: string) => '/images/menu_4k/' + name;


export const menuData: MenuItem[] = [
  // ===== مطعم التاج =====
  { branch: "restaurant", category: "شاورما", title: "فرشوحة عادي", price: "20", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة دبل عادي", price: "22", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة دبل لحمة", price: "28", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة دبل دبل", price: "30", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "سوري دجاج", price: "32", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "صفيحة سادة", price: "35", image: getImg("meat_shawarma_arabi.jpg") },
  { branch: "restaurant", category: "شاورما", title: "صفيحة بالجبنة والزيتون", price: "38", image: getImg("meat_shawarma_arabi.jpg") },
  { branch: "restaurant", category: "شاورما", title: "شاورما صاروخ", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "شاورما عربية", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "شاورما نابلسية", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "وجبة شاورما", desc: "حجم عادي وكبير", price: "30-50", image: getImg("shawarma_wrap.jpg") },
  
  // شاورما حبش من الصورة
  { branch: "restaurant", category: "شاورما", title: "فرشوحة شاورما حبش", price: "30", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة شاورما حبش دبل عادي", price: "32", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة شاورما حبش دبل لحمة", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "فرشوحة شاورما حبش دبل دبل", price: "42", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "صاروخ شاورما حبش", price: "55", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "شاورما", title: "صفيحة شاورما حبش", price: "55", image: getImg("meat_shawarma_arabi.jpg") },
  { branch: "restaurant", category: "شاورما", title: "سوري شاورما حبش", price: "48", image: getImg("shawarma_wrap.jpg") },

  { branch: "restaurant", category: "مشاوي", title: "وجبة التاج (Mix Grill)", desc: "تشكيلة فاخرة من مشاوي البيت", price: "50" , image: getImg("mixed_grill.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "لفة كباب", price: "15" , image: getImg("meat_kebab.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "لفة شيش طاووق", price: "20" , image: getImg("shish_tawook.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "دجاج مشوي", price: "55" , image: getImg("grilled_chicken_half.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "جناح مشوي", price: "35" , image: getImg("chicken_wings.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "كيلو كباب", price: "75" , image: getImg("meat_kebab.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "كيلو شيش", price: "75" , image: getImg("shish_tawook.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "كيلو ستيك دجاج", price: "75" , image: getImg("broasted_chicken.jpg") },
  { branch: "restaurant", category: "مشاوي", title: "صينية دجاج مع أرز", price: "75" , image: getImg("grilled_chicken_half.jpg") },

  { branch: "restaurant", category: "ساندوتشات", title: "تشكن بيتزا", price: "30", image: getImg("cheese_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "دجاج بالذرة والجبنة", price: "30", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "بانيه عادي", price: "25" , image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "بانيه بالجبنة", price: "30", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "صفيحة زنجر", price: "35", image: getImg("chicken_zinger_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "مسحب بالجبنة", price: "35" , image: getImg("mozzarella_sticks.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "بيف برجر", price: "35", image: getImg("cheese_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "تشكن برجر", price: "35", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "الفطيرة الذهبية", price: "35" , image: getImg("falafel_plate.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "كالزوني التاج", price: "35", image: getImg("falafel_plate.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "تشكن ستردجنوف", price: "30", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "تشكن اسكالوبيني", price: "30", image: getImg("chicken_burger.jpg") },
  
  // كريب غربي مالح ومكس غربي
  { branch: "restaurant", category: "ساندوتشات", title: "كريب شاورما مالح", price: "38", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "كريب مسحب مالح", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "كريب كرسبي مالح", price: "40", image: getImg("shawarma_wrap.jpg") },
  { branch: "restaurant", category: "ساندوتشات", title: "مكس غربي", price: "45" , image: getImg("mixed_grill.jpg") },

  { branch: "restaurant", category: "وجبات", title: "وجبة اسكالوبيني", price: "65", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "وجبات", title: "وجبة كرسبي زنجر", price: "65", image: getImg("chicken_burger.jpg") },
  { branch: "restaurant", category: "وجبات", title: "وجبة بيكانتي", price: "65" , image: getImg("chicken_wings.jpg") },
  { branch: "restaurant", category: "وجبات", title: "وجبة ستيك دجاج بالصوص", price: "65" , image: getImg("grilled_chicken_half.jpg") },
  { branch: "restaurant", category: "وجبات", title: "وجبة تشكن بيتزا", price: "65", image: getImg("cheese_burger.jpg") },

  { branch: "restaurant", category: "بيتزا", title: "بيتزا خضار صغير", price: "15", image: getImg("vegetable_pizza.jpg") },
  { branch: "restaurant", category: "بيتزا", title: "بيتزا خضار وسط", price: "25", image: getImg("vegetable_pizza.jpg") },
  { branch: "restaurant", category: "بيتزا", title: "بيتزا خضار كبير", price: "40", image: getImg("vegetable_pizza.jpg") },
  { branch: "restaurant", category: "بيتزا", title: "بيتزا بأنواعها", desc: "حسب الطلب", price: "-" },

  { branch: "restaurant", category: "مقبلات", title: "سلطة سخنة", price: "10" , image: getImg("fatoush_salad.jpg") },
  { branch: "restaurant", category: "مقبلات", title: "سلطات مشكل", price: "10" , image: getImg("fatoush_salad.jpg") },
  { branch: "restaurant", category: "مقبلات", title: "شيبس", price: "10" , image: getImg("french_fries.jpg") },
  { branch: "restaurant", category: "مقبلات", title: "صوص جبنة وكرانشي", price: "10" , image: getImg("french_fries_with_cheese.jpg") },

  // ===== تاج مود كافيه =====
  { branch: "cafe", category: "مشروبات ساخنة", title: "قهوة اسبريسو", price: "10", image: getImg("arabic_coffee.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "قهوة تركي", price: "8", image: getImg("turkish_coffee.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "كابتشينو", price: "12", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "كافيه لاتيه", price: "12", image: getImg("pepsi.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "شاي نكهات", price: "7" , image: getImg("tea.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "نسكافيه", price: "10", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "هوت شوكلت", price: "12" , image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "زهرات بالعسل", price: "10" , image: getImg("pepsi.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "كافي موكا", price: "12", image: getImg("pepsi.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "كابوسا", price: "12" , image: getImg("pepsi.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "هوت نوتيلا", price: "12" , image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "مشروبات ساخنة", title: "هوت لوتس", price: "12" , image: getImg("cheesecake.jpg") },

  { branch: "cafe", category: "حلويات", title: "كريب نوتيلا", price: "35", image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كريب دبل", price: "35", image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كريب", price: "25", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كريب فوتتشيني", price: "25", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كريب سوشي", price: "25" , image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "لقيمات", price: "25" , image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "وافل", price: "25", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "بان كيك", price: "25", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "ميني بان كيك", price: "25", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "براونيز", price: "25", image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "حلويات", title: "مولتن كيك", price: "25", image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "حلويات", title: "مكس بليت", price: "40", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "عيش السرايا", price: "15", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "قشطوطة", price: "18", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "تشيز كيك بأنواعه", price: "15", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كنافة نوتيلا", price: "20", image: getImg("chocolate_cake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كنافة لوتس", price: "18", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "كنافة ايس كريم", price: "20", image: getImg("cheesecake.jpg") },
  { branch: "cafe", category: "حلويات", title: "سان سبستيان", price: "25", image: getImg("cheesecake.jpg") },

  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك فانيلا", price: "20", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك شوكولاتة", price: "20", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك فراولة", price: "20", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك كراميل", price: "20", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك نوتيلا", price: "25", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك لوتس", price: "25", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك بستاشيو", price: "25", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ميلك شيك", title: "ميلك شيك أوريو", price: "25", image: getImg("ice_cream.jpg") },

  { branch: "cafe", category: "مشروبات باردة", title: "عصائر طبيعية موسمية", price: "20", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "ليمون ونعنع", price: "15", image: getImg("water.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "أناناس", price: "15", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "أفوكادو", price: "30", image: getImg("water.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "فخفخينا التاج مود", price: "30", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "اسطنبولي", price: "25", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "سموذي", price: "20", image: getImg("fresh_orange_juice.jpg") },
  { branch: "cafe", category: "مشروبات باردة", title: "هرمون السعادة", price: "30", image: getImg("fresh_orange_juice.jpg") },

  { branch: "cafe", category: "موهيتو", title: "موهيتو XL", price: "15", image: getImg("7up.jpg") },
  { branch: "cafe", category: "موهيتو", title: "موهيتو سبرايت", price: "15", image: getImg("7up.jpg") },
  { branch: "cafe", category: "موهيتو", title: "موهيتو رد بول", price: "17", image: getImg("7up.jpg") },
  { branch: "cafe", category: "موهيتو", title: "موهيتو بلو", price: "15", image: getImg("water.jpg") },

  { branch: "cafe", category: "ايس كوفي", title: "ايس كافي", price: "20", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "ايس كوفي", title: "ايس موكا", price: "20", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "ايس كوفي", title: "ايس لاتيه نكهات", price: "20", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "ايس كوفي", title: "ايس امريكانو", price: "18", image: getImg("cappuccino.jpg") },
  { branch: "cafe", category: "ايس كوفي", title: "ايس سبانش لاتيه", price: "20", image: getImg("cappuccino.jpg") },

  { branch: "cafe", category: "ايس كريم", title: "ايس كريم سبيشل", desc: "قرطاس", price: "15", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ايس كريم", title: "ايس كريم عادي", desc: "قرطاس", price: "10", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ايس كريم", title: "براد صغير", price: "2", image: getImg("ice_cream.jpg") },
  { branch: "cafe", category: "ايس كريم", title: "براد مع بوظة", price: "15", image: getImg("ice_cream.jpg") },
];

export const categoryImages: Record<string, string> = {
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
};
