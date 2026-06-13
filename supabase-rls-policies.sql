-- ============================================================
-- Supabase Row-Level Security (RLS) Policies
-- قواعد أمان الصفوف لقاعدة بيانات مجموعة التاج
-- ============================================================
-- قم بتشغيل هذا الملف في SQL Editor في Supabase Dashboard
-- أو عبر psql: psql $DATABASE_URL -f supabase-rls-policies.sql
-- ============================================================

-- ===========================================
-- 1. جدول menu_items
-- ===========================================
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- الجميع يستطيع قراءة قائمة الطعام (الزبائن)
CREATE POLICY "allow_read_menu_items" ON menu_items
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- فقط المسؤول (المصادق عبر الخادم) يستطيع الإضافة
-- ملاحظة: يتم استخدام service_role key من الخادم لتجاوز RLS
-- أو يمكن استخدام authenticated role مع شرط
CREATE POLICY "allow_insert_menu_items_admin" ON menu_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "allow_update_menu_items_admin" ON menu_items
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "allow_delete_menu_items_admin" ON menu_items
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

-- ===========================================
-- 2. جدول settings
-- ===========================================
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- الزبائن يستطيعون قراءة الإعدادات العامة فقط
CREATE POLICY "allow_read_settings_public" ON settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- فقط المسؤول يستطيع تعديل الإعدادات
CREATE POLICY "allow_update_settings_admin" ON settings
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "allow_insert_settings_admin" ON settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "allow_delete_settings_admin" ON settings
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

-- ===========================================
-- 3. جدول orders - أكثر حساسية
-- ===========================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- الزبون يستطيع إدراج طلبه فقط
CREATE POLICY "allow_insert_own_order" ON orders
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
  -- ملاحظة: لا يمكن التحقق من ملكية الطلب للمستخدم المجهول بسهولة
  -- في الإصدارات المستقبلية: استخدم auth.uid() للمستخدمين المسجلين

-- لا يمكن للزبون قراءة الطلبات (حماية خصوصية العملاء)
-- فقط المسؤول أو service_role يستطيع القراءة
CREATE POLICY "allow_read_orders_admin" ON orders
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

-- فقط المسؤول يستطيع التعديل والحذف
CREATE POLICY "allow_update_orders_admin" ON orders
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin')
  WITH CHECK (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

CREATE POLICY "allow_delete_orders_admin" ON orders
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin');

-- ===========================================
-- 4. Supabase Storage (Bucket: menu_images)
-- ===========================================
-- سياسات تخزين الصور

-- أي شخص يستطيع قراءة الصور العامة
CREATE POLICY "allow_read_menu_images" ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'menu_images');

-- المسؤول فقط يستطيع رفع الصور
CREATE POLICY "allow_upload_menu_images_admin" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'menu_images'
    AND (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin')
  );

-- المسؤول فقط يستطيع حذف الصور
CREATE POLICY "allow_delete_menu_images_admin" ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'menu_images'
    AND (auth.role() = 'service_role' OR auth.jwt()->>'role' = 'admin')
  );

-- ===========================================
-- تعليمات إضافية
-- ===========================================
-- لاستخدام policies مع authenticated role من الخادم:
-- 1. أنشئ مستخدم مسؤول في Supabase Auth
-- 2. استخدم service_role key في الخادم (وليس anon key)
-- 3. أضف JWT claim: role: admin للمستخدم المسؤول
--
-- لإنشاء مستخدم مسؤول:
--    await supabase.auth.signUp({ email: "admin@taj-group.com", password: "..." })
-- ثم أضف claim role=admin عبر SQL:
--    INSERT INTO auth.users (id, email, role)
--    VALUES ('user-id', 'admin@taj-group.com', 'admin');
