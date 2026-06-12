-- =========================================
-- 1. CREATE TABLES & SECURITY POLICIES
-- =========================================

-- Create table for menu items
CREATE TABLE IF NOT EXISTS public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    branch TEXT NOT NULL,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    desc_text TEXT,
    price TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on menu_items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read menu_items" ON public.menu_items;
CREATE POLICY "Allow public read menu_items" ON public.menu_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public write menu_items" ON public.menu_items;
CREATE POLICY "Allow public write menu_items" ON public.menu_items FOR ALL USING (true);

-- Create table for settings
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read settings" ON public.settings;
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public write settings" ON public.settings;
CREATE POLICY "Allow public write settings" ON public.settings FOR ALL USING (true);

-- Seed default settings
INSERT INTO public.settings (key, value) VALUES 
('taj_whatsapp_restaurant', '970590000001'),
('taj_whatsapp_cafe', '970590000002'),
('taj_delivery_fee', '10')
ON CONFLICT (key) DO NOTHING;

-- Create table for orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    delivery_type TEXT NOT NULL,
    address TEXT,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL,
    delivery_fee NUMERIC NOT NULL,
    total NUMERIC NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert orders" ON public.orders;
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public read orders" ON public.orders;
CREATE POLICY "Allow public read orders" ON public.orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public write orders" ON public.orders;
CREATE POLICY "Allow public write orders" ON public.orders FOR ALL USING (true);

-- =========================================
-- 2. SEED DEFAULT MENU ITEMS
-- =========================================

INSERT INTO public.menu_items (branch, category, title, desc_text, price, image) VALUES
('restaurant', 'شاورما', 'فرشوحة عادي', NULL, '20', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة دبل عادي', NULL, '22', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة دبل لحمة', NULL, '28', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة دبل دبل', NULL, '30', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'سوري دجاج', NULL, '32', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'صفيحة سادة', NULL, '35', '/images/menu_4k/meat_shawarma_arabi.jpg'),
('restaurant', 'شاورما', 'صفيحة بالجبنة والزيتون', NULL, '38', '/images/menu_4k/meat_shawarma_arabi.jpg'),
('restaurant', 'شاورما', 'شاورما صاروخ', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'شاورما عربية', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'شاورما نابلسية', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'وجبة شاورما', 'حجم عادي وكبير', '30-50', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة شاورما حبش', NULL, '30', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة شاورما حبش دبل عادي', NULL, '32', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة شاورما حبش دبل لحمة', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'فرشوحة شاورما حبش دبل دبل', NULL, '42', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'صاروخ شاورما حبش', NULL, '55', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'شاورما', 'صفيحة شاورما حبش', NULL, '55', '/images/menu_4k/meat_shawarma_arabi.jpg'),
('restaurant', 'شاورما', 'سوري شاورما حبش', NULL, '48', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'مشاوي', 'وجبة التاج (Mix Grill)', 'تشكيلة فاخرة من مشاوي البيت', '50', '/images/menu_4k/mixed_grill.jpg'),
('restaurant', 'مشاوي', 'لفة كباب', NULL, '15', '/images/menu_4k/meat_kebab.jpg'),
('restaurant', 'مشاوي', 'لفة شيش طاووق', NULL, '20', '/images/menu_4k/shish_tawook.jpg'),
('restaurant', 'مشاوي', 'دجاج مشوي', NULL, '55', '/images/menu_4k/grilled_chicken_half.jpg'),
('restaurant', 'مشاوي', 'جناح مشوي', NULL, '35', '/images/menu_4k/chicken_wings.jpg'),
('restaurant', 'مشاوي', 'كيلو كباب', NULL, '75', '/images/menu_4k/meat_kebab.jpg'),
('restaurant', 'مشاوي', 'كيلو شيش', NULL, '75', '/images/menu_4k/shish_tawook.jpg'),
('restaurant', 'مشاوي', 'كيلو ستيك دجاج', NULL, '75', '/images/menu_4k/broasted_chicken.jpg'),
('restaurant', 'مشاوي', 'صينية دجاج مع أرز', NULL, '75', '/images/menu_4k/grilled_chicken_half.jpg'),
('restaurant', 'ساندوتشات', 'تشكن بيتزا', NULL, '30', '/images/menu_4k/cheese_burger.jpg'),
('restaurant', 'ساندوتشات', 'دجاج بالذرة والجبنة', NULL, '30', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'بانيه عادي', NULL, '25', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'بانيه بالجبنة', NULL, '30', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'صفيحة زنجر', NULL, '35', '/images/menu_4k/chicken_zinger_burger.jpg'),
('restaurant', 'ساندوتشات', 'مسحب بالجبنة', NULL, '35', '/images/menu_4k/mozzarella_sticks.jpg'),
('restaurant', 'ساندوتشات', 'بيف برجر', NULL, '35', '/images/menu_4k/cheese_burger.jpg'),
('restaurant', 'ساندوتشات', 'تشكن برجر', NULL, '35', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'الفطيرة الذهبية', NULL, '35', '/images/menu_4k/falafel_plate.jpg'),
('restaurant', 'ساندوتشات', 'كالزوني التاج', NULL, '35', '/images/menu_4k/falafel_plate.jpg'),
('restaurant', 'ساندوتشات', 'تشكن ستردجنوف', NULL, '30', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'تشكن اسكالوبيني', NULL, '30', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'ساندوتشات', 'كريب شاورما مالح', NULL, '38', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'ساندوتشات', 'كريب مسحب مالح', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'ساندوتشات', 'كريب كرسبي مالح', NULL, '40', '/images/menu_4k/shawarma_wrap.jpg'),
('restaurant', 'ساندوتشات', 'مكس غربي', NULL, '45', '/images/menu_4k/mixed_grill.jpg'),
('restaurant', 'وجبات', 'وجبة اسكالوبيني', NULL, '65', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'وجبات', 'وجبة كرسبي زنجر', NULL, '65', '/images/menu_4k/chicken_burger.jpg'),
('restaurant', 'وجبات', 'وجبة بيكانتي', NULL, '65', '/images/menu_4k/chicken_wings.jpg'),
('restaurant', 'وجبات', 'وجبة ستيك دجاج بالصوص', NULL, '65', '/images/menu_4k/grilled_chicken_half.jpg'),
('restaurant', 'وجبات', 'وجبة تشكن بيتزا', NULL, '65', '/images/menu_4k/cheese_burger.jpg'),
('restaurant', 'بيتزا', 'بيتزا خضار صغير', NULL, '15', '/images/menu_4k/vegetable_pizza.jpg'),
('restaurant', 'بيتزا', 'بيتزا خضار وسط', NULL, '25', '/images/menu_4k/vegetable_pizza.jpg'),
('restaurant', 'بيتزا', 'بيتزا خضار كبير', NULL, '40', '/images/menu_4k/vegetable_pizza.jpg'),
('restaurant', 'بيتزا', 'بيتزا بأنواعها', 'حسب الطلب', '-', NULL),
('restaurant', 'مقبلات', 'سلطة سخنة', NULL, '10', '/images/menu_4k/fatoush_salad.jpg'),
('restaurant', 'مقبلات', 'سلطات مشكل', NULL, '10', '/images/menu_4k/fatoush_salad.jpg'),
('restaurant', 'مقبلات', 'شيبس', NULL, '10', '/images/menu_4k/french_fries.jpg'),
('restaurant', 'مقبلات', 'صوص جبنة وكرانشي', NULL, '10', '/images/menu_4k/french_fries_with_cheese.jpg'),
('cafe', 'مشروبات ساخنة', 'قهوة اسبريسو', NULL, '10', '/images/menu_4k/arabic_coffee.jpg'),
('cafe', 'مشروبات ساخنة', 'قهوة تركي', NULL, '8', '/images/menu_4k/turkish_coffee.jpg'),
('cafe', 'مشروبات ساخنة', 'كابتشينو', NULL, '12', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'مشروبات ساخنة', 'كافيه لاتيه', NULL, '12', '/images/menu_4k/pepsi.jpg'),
('cafe', 'مشروبات ساخنة', 'شاي نكهات', NULL, '7', '/images/menu_4k/tea.jpg'),
('cafe', 'مشروبات ساخنة', 'نسكافيه', NULL, '10', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'مشروبات ساخنة', 'هوت شوكلت', NULL, '12', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'مشروبات ساخنة', 'زهرات بالعسل', NULL, '10', '/images/menu_4k/pepsi.jpg'),
('cafe', 'مشروبات ساخنة', 'كافي موكا', NULL, '12', '/images/menu_4k/pepsi.jpg'),
('cafe', 'مشروبات ساخنة', 'كابوسا', NULL, '12', '/images/menu_4k/pepsi.jpg'),
('cafe', 'مشروبات ساخنة', 'هوت نوتيلا', NULL, '12', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'مشروبات ساخنة', 'هوت لوتس', NULL, '12', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'كريب نوتيلا', NULL, '35', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'حلويات', 'كريب دبل', NULL, '35', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'حلويات', 'كريب', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'كريب فوتتشيني', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'كريب سوشي', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'لقيمات', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'وافل', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'بان كيك', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'ميني بان كيك', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'براونيز', NULL, '25', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'حلويات', 'مولتن كيك', NULL, '25', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'حلويات', 'مكس بليت', NULL, '40', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'عيش السرايا', NULL, '15', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'قشطوطة', NULL, '18', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'تشيز كيك بأنواعه', NULL, '15', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'كنافة نوتيلا', NULL, '20', '/images/menu_4k/chocolate_cake.jpg'),
('cafe', 'حلويات', 'كنافة لوتس', NULL, '18', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'كنافة ايس كريم', NULL, '20', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'حلويات', 'سان سبستيان', NULL, '25', '/images/menu_4k/cheesecake.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك فانيلا', NULL, '20', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك شوكولاتة', NULL, '20', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك فراولة', NULL, '20', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك كراميل', NULL, '20', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك نوتيلا', NULL, '25', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك لوتس', NULL, '25', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك بستاشيو', NULL, '25', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ميلك شيك', 'ميلك شيك أوريو', NULL, '25', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'مشروبات باردة', 'عصائر طبيعية موسمية', NULL, '20', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'مشروبات باردة', 'ليمون ونعنع', NULL, '15', '/images/menu_4k/water.jpg'),
('cafe', 'مشروبات باردة', 'أناناس', NULL, '15', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'مشروبات باردة', 'أفوكادو', NULL, '30', '/images/menu_4k/water.jpg'),
('cafe', 'مشروبات باردة', 'فخفخينا التاج مود', NULL, '30', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'مشروبات باردة', 'اسطنبولي', NULL, '25', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'مشروبات باردة', 'سموذي', NULL, '20', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'مشروبات باردة', 'هرمون السعادة', NULL, '30', '/images/menu_4k/fresh_orange_juice.jpg'),
('cafe', 'موهيتو', 'موهيتو XL', NULL, '15', '/images/menu_4k/7up.jpg'),
('cafe', 'موهيتو', 'موهيتو سبرايت', NULL, '15', '/images/menu_4k/7up.jpg'),
('cafe', 'موهيتو', 'موهيتو رد بول', NULL, '17', '/images/menu_4k/7up.jpg'),
('cafe', 'موهيتو', 'موهيتو بلو', NULL, '15', '/images/menu_4k/water.jpg'),
('cafe', 'ايس كوفي', 'ايس كافي', NULL, '20', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'ايس كوفي', 'ايس موكا', NULL, '20', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'ايس كوفي', 'ايس لاتيه نكهات', NULL, '20', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'ايس كوفي', 'ايس امريكانو', NULL, '18', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'ايس كوفي', 'ايس سبانش لاتيه', NULL, '20', '/images/menu_4k/cappuccino.jpg'),
('cafe', 'ايس كريم', 'ايس كريم سبيشل', 'قرطاس', '15', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ايس كريم', 'ايس كريم عادي', 'قرطاس', '10', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ايس كريم', 'براد صغير', NULL, '2', '/images/menu_4k/ice_cream.jpg'),
('cafe', 'ايس كريم', 'براد مع بوظة', NULL, '15', '/images/menu_4k/ice_cream.jpg');
