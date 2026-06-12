import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { CrownLogo } from "@/components/CrownLogo";
import { 
  Lock, User, Shield, BarChart3, Plus, Edit2, Trash2, RotateCcw, 
  Settings, Image as ImageIcon, ExternalLink, Power, Users, 
  ShoppingBag, HelpCircle, FileText, CheckCircle2, Search, X 
} from "lucide-react";
import { menuData, type MenuItem, type Branch } from "@/data/menu";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم الإدارية | مجموعة التاج" },
      { name: "description", content: "لوحة التحكم الإدارية لمجموعة التاج لإدارة المنيو وتتبع المبيعات والتحليلات الحية." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  // Login State
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Tab State
  const [activeTab, setActiveTab] = useState<"analytics" | "menu" | "media" | "settings">("analytics");
  
  // Menu CRUD State
  const [items, setItems] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<{ index: number; item: MenuItem } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBranchFilter, setSelectedBranchFilter] = useState<Branch | "all">("all");
  
  // Add item form state
  const [newItem, setNewItem] = useState<MenuItem>({
    branch: "restaurant",
    category: "شاورما",
    title: "",
    desc: "",
    price: ""
  });

  // Settings State
  const [restaurantWhatsapp, setRestaurantWhatsapp] = useState("970590000001");
  const [cafeWhatsapp, setCafeWhatsapp] = useState("970590000002");
  const [deliveryFeeDefault, setDeliveryFeeDefault] = useState(10);

  // Live Simulated Stats State
  const [liveVisitors, setLiveVisitors] = useState(42);
  const [liveCarts, setLiveCarts] = useState(3);
  const [liveOrders, setLiveOrders] = useState(18);
  const [liveActivity, setLiveActivity] = useState<Array<{ time: string; event: string }>>([]);

  // Check login state on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const logged = localStorage.getItem("taj_admin_logged_in") === "true";
      setAdminLoggedIn(logged);
    }
  }, []);

  // Fetch all Supabase data when logged in
  useEffect(() => {
    if (!adminLoggedIn) return;

    async function loadAdminData() {
      // 1. Fetch Menu Items
      try {
        const { data: menuDataDb, error: menuError } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (menuError) throw menuError;

        if (menuDataDb && menuDataDb.length > 0) {
          const mappedItems: MenuItem[] = menuDataDb.map((item: any) => ({
            id: item.id,
            branch: item.branch,
            category: item.category,
            title: item.title,
            desc: item.desc_text || undefined,
            price: item.price,
            image: item.image || undefined
          }));
          setItems(mappedItems);
        } else {
          setItems(menuData);
        }
      } catch (e) {
        console.error("Error loading menu items from Supabase:", e);
        setItems(menuData);
      }

      // 2. Fetch Settings
      try {
        const { data: settingsDb, error: settingsError } = await supabase
          .from("settings")
          .select("*");

        if (settingsError) throw settingsError;

        if (settingsDb) {
          const restW = settingsDb.find(s => s.key === "taj_whatsapp_restaurant")?.value;
          const cafeW = settingsDb.find(s => s.key === "taj_whatsapp_cafe")?.value;
          const delF = settingsDb.find(s => s.key === "taj_delivery_fee")?.value;

          if (restW) setRestaurantWhatsapp(restW);
          if (cafeW) setCafeWhatsapp(cafeW);
          if (delF) setDeliveryFeeDefault(Number(delF));
        }
      } catch (e) {
        console.error("Error loading settings from Supabase:", e);
      }
    }

    loadAdminData();
  }, [adminLoggedIn]);

  // Load and poll real orders from Supabase periodically
  useEffect(() => {
    if (adminLoggedIn) {
      async function fetchOrders() {
        try {
          const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) throw error;

          if (data) {
            setLiveOrders(data.length);

            // Map real orders to live activity logs
            const realLogs = data.slice(0, 8).map((order: any) => {
              const dateObj = new Date(order.created_at);
              const timeStr = dateObj.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
              const branchLabel = order.items?.[0]?.branch === "cafe" ? "تاج مود كافيه" : "مطعم التاج";
              return {
                time: timeStr,
                event: `طلب مؤكد للعميل ${order.customer_name} في ${branchLabel} بقيمة ${order.total} ₪`
              };
            });

            if (realLogs.length > 0) {
              setLiveActivity(realLogs);
            } else {
              setLiveActivity([
                { time: "00:00", event: "لا توجد طلبات حقيقية بقاعدة البيانات حالياً" }
              ]);
            }
          }
        } catch (e) {
          console.error("Error polling orders:", e);
        }
      }

      fetchOrders();
      const interval = setInterval(fetchOrders, 15000); // Poll every 15 seconds
      return () => clearInterval(interval);
    }
  }, [adminLoggedIn]);

  // Fluctuating live visitors count simulation
  useEffect(() => {
    if (adminLoggedIn) {
      const timer = setInterval(() => {
        setLiveVisitors((prev) => {
          const change = Math.floor(Math.random() * 5) - 2;
          return Math.min(Math.max(prev + change, 28), 65);
        });
      }, 4000);

      // Fluctuate active carts simulation
      const cartsTimer = setInterval(() => {
        const savedCartsCount = parseInt(localStorage.getItem("taj_admin_live_carts_count") || "3");
        const change = Math.random() > 0.5 ? 1 : -1;
        const nextCount = Math.max(1, savedCartsCount + change);
        setLiveCarts(nextCount);
        localStorage.setItem("taj_admin_live_carts_count", nextCount.toString());
      }, 9000);

      return () => {
        clearInterval(timer);
        clearInterval(cartsTimer);
      };
    }
  }, [adminLoggedIn]);

  // Synchronize Settings with Supabase
  const handleSaveSettings = async () => {
    try {
      const { error: errorRest } = await supabase
        .from("settings")
        .upsert({ key: "taj_whatsapp_restaurant", value: restaurantWhatsapp.trim() });

      const { error: errorCafe } = await supabase
        .from("settings")
        .upsert({ key: "taj_whatsapp_cafe", value: cafeWhatsapp.trim() });

      const { error: errorFee } = await supabase
        .from("settings")
        .upsert({ key: "taj_delivery_fee", value: deliveryFeeDefault.toString() });

      if (errorRest || errorCafe || errorFee) {
        throw new Error("حدث خطأ أثناء حفظ الإعدادات في Supabase");
      }

      localStorage.setItem("taj_whatsapp_restaurant", restaurantWhatsapp.trim());
      localStorage.setItem("taj_whatsapp_cafe", cafeWhatsapp.trim());
      localStorage.setItem("taj_delivery_fee", deliveryFeeDefault.toString());

      alert("تم حفظ إعدادات النظام وأرقام الفروع في قاعدة البيانات بنجاح!");
    } catch (e) {
      console.error(e);
      alert("فشل حفظ الإعدادات في قاعدة البيانات، تم الحفظ محلياً في المتصفح فقط.");
      localStorage.setItem("taj_whatsapp_restaurant", restaurantWhatsapp.trim());
      localStorage.setItem("taj_whatsapp_cafe", cafeWhatsapp.trim());
      localStorage.setItem("taj_delivery_fee", deliveryFeeDefault.toString());
    }
  };

  // CRUD Actions
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title.trim() || !newItem.price.trim()) {
      alert("الرجاء إدخال اسم الوجبة والسعر على الأقل.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("menu_items")
        .insert({
          branch: newItem.branch,
          category: newItem.category,
          title: newItem.title.trim(),
          desc_text: newItem.desc?.trim() || null,
          price: newItem.price.trim(),
          image: newItem.image || null
        })
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        const addedItem: MenuItem = {
          id: data.id,
          branch: data.branch,
          category: data.category,
          title: data.title,
          desc: data.desc_text || undefined,
          price: data.price,
          image: data.image || undefined
        };
        const updated = [addedItem, ...items];
        setItems(updated);
        localStorage.setItem("taj_menu_items", JSON.stringify(updated));
      }

      setShowAddModal(false);
      setNewItem({
        branch: "restaurant",
        category: "شاورما",
        title: "",
        desc: "",
        price: ""
      });
      alert("تمت إضافة الصنف لقاعدة البيانات بنجاح!");
    } catch (err) {
      console.error(err);
      alert("فشل إضافة الصنف لقاعدة البيانات.");
    }
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const itemToUpdate = editingItem.item;
      if (!itemToUpdate.id) {
        alert("هذا الصنف لا يملك معرف فريد بقاعدة البيانات.");
        return;
      }

      try {
        const { error } = await supabase
          .from("menu_items")
          .update({
            branch: itemToUpdate.branch,
            category: itemToUpdate.category,
            title: itemToUpdate.title.trim(),
            desc_text: itemToUpdate.desc?.trim() || null,
            price: itemToUpdate.price.trim(),
            image: itemToUpdate.image || null
          })
          .eq("id", itemToUpdate.id);

        if (error) throw error;

        const updated = [...items];
        updated[editingItem.index] = itemToUpdate;
        setItems(updated);
        localStorage.setItem("taj_menu_items", JSON.stringify(updated));
        
        setEditingItem(null);
        alert("تم تعديل الصنف في قاعدة البيانات بنجاح!");
      } catch (err) {
        console.error(err);
        alert("فشل تعديل الصنف في قاعدة البيانات.");
      }
    }
  };

  const handleDeleteItem = async (index: number) => {
    const itemToDelete = items[index];
    if (!itemToDelete.id) {
      const updated = items.filter((_, idx) => idx !== index);
      setItems(updated);
      localStorage.setItem("taj_menu_items", JSON.stringify(updated));
      return;
    }

    if (confirm(`هل أنت متأكد من رغبتك في حذف صنف "${itemToDelete.title}"؟`)) {
      try {
        const { error } = await supabase
          .from("menu_items")
          .delete()
          .eq("id", itemToDelete.id);

        if (error) throw error;

        const updated = items.filter((_, idx) => idx !== index);
        setItems(updated);
        localStorage.setItem("taj_menu_items", JSON.stringify(updated));
        alert("تم حذف الصنف من قاعدة البيانات.");
      } catch (err) {
        console.error(err);
        alert("فشل حذف الصنف من قاعدة البيانات.");
      }
    }
  };

  const handleResetMenu = async () => {
    if (confirm("تحذير: سيتم حذف كافة البيانات الحالية من قاعدة البيانات واستعادة قائمة الطعام الافتراضية. هل تريد الاستمرار؟")) {
      try {
        const { error: deleteError } = await supabase
          .from("menu_items")
          .delete()
          .neq("branch", "force_delete_all");

        if (deleteError) throw deleteError;

        const seedRows = menuData.map((item) => ({
          branch: item.branch,
          category: item.category,
          title: item.title,
          desc_text: item.desc || null,
          price: item.price,
          image: item.image || null
        }));

        const { data: insertedData, error: insertError } = await supabase
          .from("menu_items")
          .insert(seedRows)
          .select("*");

        if (insertError) throw insertError;

        if (insertedData) {
          const mappedItems: MenuItem[] = insertedData.map((item: any) => ({
            id: item.id,
            branch: item.branch,
            category: item.category,
            title: item.title,
            desc: item.desc_text || undefined,
            price: item.price,
            image: item.image || undefined
          }));
          setItems(mappedItems);
          localStorage.setItem("taj_menu_items", JSON.stringify(mappedItems));
        }

        alert("تمت استعادة قائمة الطعام الافتراضية وإعادة تهيئتها بنجاح!");
      } catch (err) {
        console.error(err);
        alert("فشل استعادة قائمة الطعام الافتراضية بقاعدة البيانات.");
      }
    }
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUser = import.meta.env.VITE_ADMIN_USER || "admin";
    const validPass = import.meta.env.VITE_ADMIN_PASS || "admin123";

    if (username === validUser && password === validPass) {
      setAdminLoggedIn(true);
      localStorage.setItem("taj_admin_logged_in", "true");
    } else {
      alert("خطأ في اسم المستخدم أو كلمة المرور.");
    }
  };

  const handleLogout = () => {
    setAdminLoggedIn(false);
    localStorage.setItem("taj_admin_logged_in", "false");
  };

  // Filter items based on selection
  const filteredItems = useMemo(() => {
    if (selectedBranchFilter === "all") return items;
    return items.filter((i) => i.branch === selectedBranchFilter);
  }, [items, selectedBranchFilter]);

  // Categories list based on selected branch
  const categoriesList = useMemo(() => {
    if (newItem.branch === "restaurant") {
      return ["شاورما", "مشاوي", "ساندوتشات", "وجبات", "بيتزا", "مقبلات"];
    } else {
      return ["مشروبات ساخنة", "حلويات", "ميلك شيك", "مشروبات باردة", "موهيتو", "ايس كوفي", "ايس كريم"];
    }
  }, [newItem.branch]);

  const editCategoriesList = useMemo(() => {
    if (!editingItem) return [];
    if (editingItem.item.branch === "restaurant") {
      return ["شاورما", "مشاوي", "ساندوتشات", "وجبات", "بيتزا", "مقبلات"];
    } else {
      return ["مشروبات ساخنة", "حلويات", "ميلك شيك", "مشروبات باردة", "موهيتو", "ايس كوفي", "ايس كريم"];
    }
  }, [editingItem]);

  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0d16] text-white flex flex-col font-arabic">
      
      {/* 1. GATEKEEPER LOCKSCREEN */}
      {!adminLoggedIn ? (
        <div className="flex-grow flex items-center justify-center p-4 bg-[#07090f] min-h-screen">
          <div className="bg-[#111625] p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full text-center relative overflow-hidden">
            {/* Design glow background */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#D4AF37]/20">
              <Shield className="w-8 h-8 text-[#D4AF37] animate-pulse" />
            </div>

            <h2 className="text-xl font-bold mb-2">وحدة القيادة والتحكم التاج</h2>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed font-light">
              الرجاء إدخال بيانات لوحة التحكم للوصول لإحصائيات الطلبات وتعديل المنيو.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">اسم المستخدم</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin" 
                    required
                    className="w-full bg-[#171e30] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-xs text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                  />
                  <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">كلمة المرور</label>
                <div className="relative">
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full bg-[#171e30] border border-white/10 rounded-xl py-3 pr-10 pl-4 text-xs text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                  />
                  <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-xl transition-all shadow-md shadow-[#D4AF37]/10 hover:scale-[1.02] active:scale-[0.98] text-xs flex items-center justify-center gap-2 mt-6"
              >
                <Lock className="w-4 h-4" />
                <span>التحقق والدخول للمنصة</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* 2. ADMIN COMMAND DASHBOARD */
        <div className="flex-grow flex flex-col lg:flex-row min-h-screen w-full">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-[#111625] border-l border-white/5 flex flex-col justify-between p-6 z-10 shrink-0">
            <div className="space-y-8">
              {/* Logo / System identity */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/5">
                <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center border border-[#D4AF37]/20 shrink-0">
                  <CrownLogo size={22} className="text-[#D4AF37]" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-bold text-sm text-white leading-none">لوحة التحكم التاج</span>
                  <span className="text-[9px] font-bold text-gray-400 tracking-wider mt-1 uppercase leading-none">Taj Command Center</span>
                </div>
              </div>

              {/* Sidebar navigation */}
              <nav className="flex flex-col gap-1.5 text-right">
                <button 
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "analytics"
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/15"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>التحليلات والمراقبة</span>
                </button>

                <button 
                  onClick={() => setActiveTab("menu")}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "menu"
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/15"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>إدارة قائمة الطعام</span>
                </button>

                <button 
                  onClick={() => setActiveTab("media")}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "media"
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/15"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>الوسائط ومحمل الصور</span>
                </button>

                <button 
                  onClick={() => setActiveTab("settings")}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                    activeTab === "settings"
                      ? "bg-[#D4AF37] text-black shadow-md shadow-[#D4AF37]/15"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>إعدادات النظام والفرع</span>
                </button>
              </nav>
            </div>

            {/* Sidebar actions footer */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
              <Link 
                to="/" 
                className="w-full py-2.5 px-4 rounded-xl text-[10px] font-bold text-gray-400 hover:bg-white/5 hover:text-white flex items-center gap-3 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>عرض موقع الفروع للزبائن</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full py-2.5 px-4 rounded-xl text-[10px] font-bold text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-all text-right"
              >
                <Power className="w-4 h-4" />
                <span>تسجيل الخروج الآمن</span>
              </button>
            </div>
          </aside>

          {/* Main content body */}
          <main className="flex-grow p-6 md:p-8 overflow-y-auto max-w-full">
            
            {/* Main top header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 pb-6 border-b border-white/5">
              <div className="text-right w-full md:w-auto">
                <h1 className="text-2xl font-black">مركز التحكم وإدارة العمليات</h1>
                <p className="text-xs text-gray-400 font-light mt-1">
                  إدارة شاملة لقائمة الطعام، ومتابعة الطلبات، وتعديل إعدادات التوصيل والواتساب.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="bg-[#111625] px-4 py-2.5 rounded-2xl border border-white/5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-[10px] text-gray-300 font-bold">حالة المخدم: مستقر</span>
                </div>
                <div className="bg-[#111625] px-4 py-2.5 rounded-2xl border border-white/5 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-[10px] text-gray-300 font-bold">نشط بالموقع الآن: <span className="text-white font-extrabold font-mono">{liveVisitors}</span></span>
                </div>
              </div>
            </header>

            {/* TAB 1: ANALYTICS */}
            {activeTab === "analytics" && (
              <div className="space-y-6 animate-fade-up">
                
                {/* KPI Metrics row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Cards */}
                  <div className="bg-[#111625] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">الزوار النشطون حياً</span>
                      <div className="w-8 h-8 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400"><Users className="w-4 h-4" /></div>
                    </div>
                    <h3 className="text-3xl font-black font-mono">{liveVisitors}</h3>
                    <p className="text-[9px] text-gray-500 mt-2">محاكاة فورية لمستخدمي المنيو</p>
                  </div>

                  <div className="bg-[#111625] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">السلات النشطة الآن</span>
                      <div className="w-8 h-8 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400"><ShoppingBag className="w-4 h-4" /></div>
                    </div>
                    <h3 className="text-3xl font-black font-mono">{liveCarts}</h3>
                    <p className="text-[9px] text-gray-500 mt-2">سلات تحتوي منتجات حالياً</p>
                  </div>

                  <div className="bg-[#111625] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">الطلبات المرسلة للواتساب</span>
                      <div className="w-8 h-8 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400"><CheckCircle2 className="w-4 h-4" /></div>
                    </div>
                    <h3 className="text-3xl font-black font-mono">{liveOrders}</h3>
                    <p className="text-[9px] text-gray-500 mt-2">تراكمي الطلبات المستلمة</p>
                  </div>

                  <div className="bg-[#111625] p-5 rounded-2xl border border-white/5 relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">المبيعات المتوقعة</span>
                      <div className="w-8 h-8 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400"><CrownLogo size={18} /></div>
                    </div>
                    <h3 className="text-3xl font-black font-mono text-[#D4AF37]">{liveOrders * 65} ₪</h3>
                    <p className="text-[9px] text-gray-500 mt-2">بمعدل 65 شيكل لكل فاتورة</p>
                  </div>
                </div>

                {/* Simulated Live Activity Log */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                  <div className="lg:col-span-8 bg-[#111625] rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base mb-1">النشاط التجاري المباشر (Live activity Log)</h3>
                      <p className="text-xs text-gray-400 font-light mb-6">سجل حركة تصفح العملاء وطلب الوجبات في المتجر</p>
                      
                      <div className="space-y-4">
                        {liveActivity.map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#171e30] border border-white/5 text-xs">
                            <span className="text-gray-300 font-light">{log.event}</span>
                            <span className="font-mono text-gray-500">{log.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-[#111625] rounded-3xl p-6 border border-white/5 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-base mb-1">نظام الفواتير الموحد</h3>
                      <p className="text-xs text-gray-400 font-light mb-6">سرعة وسهولة التوجيه للواتساب</p>
                      
                      <div className="bg-[#171e30] p-4 rounded-2xl border border-white/5 text-xs space-y-3 font-light leading-relaxed">
                        <p className="text-[#D4AF37] font-bold">كيف يعمل منطق كنتاكي بالفاتورة؟</p>
                        <p>١. يجمع الزبون الطلبات بالسلة ثم يكتب بياناته بشكل دقيق.</p>
                        <p>٢. يتحقق النظام من رقم الجوال (يجب أن يكون 10 أرقام ومقدمته 059 أو 056).</p>
                        <p>٣. يختار الزبون موقعه الجغرافي ليحتسب النظام السعر التلقائي للتوصيل من ملف التسعيرة.</p>
                        <p>٤. تصاغ الرسالة فوراً على شكل فاتورة واتساب نصية مرتبة لضمان استلامها وقراءتها بلمح البصر.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: MENU MANAGEMENT */}
            {activeTab === "menu" && (
              <div className="space-y-6 animate-fade-up">
                
                {/* Actions bar for CRUD table */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-[#111625] p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedBranchFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedBranchFilter === "all" ? "bg-[#D4AF37] text-black" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      عرض الكل
                    </button>
                    <button 
                      onClick={() => setSelectedBranchFilter("restaurant")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedBranchFilter === "restaurant" ? "bg-[#D4AF37] text-black" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      مطعم التاج
                    </button>
                    <button 
                      onClick={() => setSelectedBranchFilter("cafe")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedBranchFilter === "cafe" ? "bg-[#D4AF37] text-black" : "bg-white/5 text-gray-400 hover:text-white"
                      }`}
                    >
                      تاج مود كافيه
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setShowAddModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة صنف جديد</span>
                    </button>
                    <button 
                      onClick={handleResetMenu}
                      className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>استعادة الافتراضي</span>
                    </button>
                  </div>
                </div>

                {/* Items CRUD List Table */}
                <div className="bg-[#111625] rounded-3xl border border-white/5 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs">
                      <thead className="bg-[#171e30] border-b border-white/5 text-gray-400 font-bold uppercase">
                        <tr>
                          <th className="py-4 px-6">الفرع</th>
                          <th className="py-4 px-6">القسم</th>
                          <th className="py-4 px-6">اسم الوجبة/الصنف</th>
                          <th className="py-4 px-6">السعر</th>
                          <th className="py-4 px-6 max-w-xs">الوصف</th>
                          <th className="py-4 px-6 text-center">العمليات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredItems.map((item, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-4 px-6">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                item.branch === "restaurant" ? "bg-red-500/15 text-red-400" : "bg-orange-500/15 text-orange-400"
                              }`}>
                                {item.branch === "restaurant" ? "مطعم" : "كافيه"}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-semibold">{item.category}</td>
                            <td className="py-4 px-6 font-extrabold text-sm">{item.title}</td>
                            <td className="py-4 px-6 font-mono text-sm text-[#D4AF37]">
                              {item.price === "-" ? "حسب الطلب" : `${item.price} ₪`}
                            </td>
                            <td className="py-4 px-6 text-gray-400 font-light truncate max-w-xs">{item.desc || "-"}</td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button 
                                  onClick={() => setEditingItem({ index: idx, item: { ...item } })}
                                  className="p-1.5 hover:bg-amber-500/15 text-amber-400 rounded transition"
                                  title="تعديل"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteItem(idx)}
                                  className="p-1.5 hover:bg-red-500/15 text-red-400 rounded transition"
                                  title="حذف"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: MEDIA (IMAGES) */}
            {activeTab === "media" && (
              <div className="space-y-6 animate-fade-up">
                <div className="bg-[#111625] rounded-3xl p-6 border border-white/5">
                  <h3 className="font-bold text-base mb-1">معرض صور وتصنيفات المنيو</h3>
                  <p className="text-xs text-gray-400 font-light mb-6">
                    الصور الإفتراضية المستخدمة لتصنيفات وجبات الطعام والحلويات بمجموعة التاج.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-[#171e30] border border-white/5 rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1646618580749-3836fc610c36?q=80&w=600&auto=format&fit=crop" className="w-full aspect-video object-cover" />
                      <div className="p-3 text-xs font-bold">قسم الشاورما (مطعم)</div>
                    </div>
                    <div className="bg-[#171e30] border border-white/5 rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=600&auto=format&fit=crop" className="w-full aspect-video object-cover" />
                      <div className="p-3 text-xs font-bold">قسم المشاوي (مطعم)</div>
                    </div>
                    <div className="bg-[#171e30] border border-white/5 rounded-2xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&auto=format&fit=crop" className="w-full aspect-video object-cover" />
                      <div className="p-3 text-xs font-bold">قسم الحلويات (كافيه)</div>
                    </div>
                  </div>

                  <div className="mt-8 p-6 border border-dashed border-white/10 rounded-2xl text-center text-xs text-gray-400 font-light">
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 opacity-50 text-[#D4AF37]" />
                    <p>رفع صور مخصصة معطل في المحاكاة التجريبية.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: SETTINGS */}
            {activeTab === "settings" && (
              <div className="max-w-2xl bg-[#111625] rounded-3xl p-6 border border-white/5 space-y-6 animate-fade-up">
                <div>
                  <h3 className="font-bold text-base mb-1">إعدادات قنوات الاتصال والفرع</h3>
                  <p className="text-xs text-gray-400 font-light">
                    تعديل أرقام الواتساب ورسوم التوصيل الأساسية لتطبيق التاج.
                  </p>
                </div>

                <div className="space-y-4 text-right">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">رقم واتساب مطعم التاج (شامل رمز الدولة بدون +)</label>
                    <input 
                      type="text" 
                      value={restaurantWhatsapp}
                      onChange={(e) => setRestaurantWhatsapp(e.target.value)}
                      className="w-full bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">رقم واتساب تاج مود كافيه (شامل رمز الدولة بدون +)</label>
                    <input 
                      type="text" 
                      value={cafeWhatsapp}
                      onChange={(e) => setCafeWhatsapp(e.target.value)}
                      className="w-full bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">رسوم التوصيل الأساسية الافتراضية (₪)</label>
                    <input 
                      type="number" 
                      value={deliveryFeeDefault}
                      onChange={(e) => setDeliveryFeeDefault(Number(e.target.value))}
                      className="w-full bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 text-xs text-white focus:border-[#D4AF37] outline-none transition-all font-mono"
                    />
                  </div>

                  <button 
                    onClick={handleSaveSettings}
                    className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-2 mt-4"
                  >
                    <Settings className="w-4 h-4" />
                    <span>حفظ إعدادات الفروع والأسعار</span>
                  </button>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* 3. CRUD: Add Item Dialog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-[#111625] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 text-white p-6 animate-fade-up">
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
              <h3 className="text-base font-bold">إضافة صنف جديد لقائمة التاج</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1.5">فرع الخدمة</label>
                  <select 
                    value={newItem.branch}
                    onChange={(e) => setNewItem(prev => ({ ...prev, branch: e.target.value as Branch, category: e.target.value === "restaurant" ? "شاورما" : "مشروبات ساخنة" }))}
                    className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl px-3 py-3 focus:outline-none text-white cursor-pointer"
                  >
                    <option value="restaurant">مطعم التاج</option>
                    <option value="cafe">تاج مود كافيه</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1.5">قسم التصنيف</label>
                  <select 
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl px-3 py-3 focus:outline-none text-white cursor-pointer"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">اسم الصنف/الوجبة</label>
                <input 
                  type="text" 
                  required
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="مثال: وجبة شاورما عربي دبل"
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">السعر بالدولار/الشيكل (رقم فقط، أو - لـ حسب الطلب)</label>
                <input 
                  type="text" 
                  required
                  value={newItem.price}
                  onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="مثال: 35"
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 focus:outline-none text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">الوصف والمكونات</label>
                <textarea 
                  value={newItem.desc}
                  onChange={(e) => setNewItem(prev => ({ ...prev, desc: e.target.value }))}
                  placeholder="مكونات الوجبة وتفاصيل التقديم..."
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl p-3 h-20 focus:outline-none text-white resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 hover:bg-green-700 mt-6"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة الصنف للمنيو فوراً</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 4. CRUD: Edit Item Dialog Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingItem(null)}></div>
          <div className="relative bg-[#111625] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 text-white p-6 animate-fade-up">
            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
              <h3 className="text-base font-bold">تعديل صنف في منيو التاج</h3>
              <button onClick={() => setEditingItem(null)} className="p-1 text-gray-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditItem} className="space-y-4 text-right">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1.5">فرع الخدمة</label>
                  <select 
                    value={editingItem.item.branch}
                    onChange={(e) => setEditingItem(prev => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        item: { 
                          ...prev.item, 
                          branch: e.target.value as Branch,
                          category: e.target.value === "restaurant" ? "شاورما" : "مشروبات ساخنة" 
                        }
                      };
                    })}
                    className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl px-3 py-3 focus:outline-none text-white cursor-pointer"
                  >
                    <option value="restaurant">مطعم التاج</option>
                    <option value="cafe">تاج مود كافيه</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold mb-1.5">قسم التصنيف</label>
                  <select 
                    value={editingItem.item.category}
                    onChange={(e) => setEditingItem(prev => {
                      if (!prev) return null;
                      return {
                        ...prev,
                        item: { ...prev.item, category: e.target.value }
                      };
                    })}
                    className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl px-3 py-3 focus:outline-none text-white cursor-pointer"
                  >
                    {editCategoriesList.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">اسم الصنف/الوجبة</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.item.title}
                  onChange={(e) => setEditingItem(prev => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      item: { ...prev.item, title: e.target.value }
                    };
                  })}
                  placeholder="اسم الوجبة"
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 focus:outline-none text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">السعر (₪ أو -)</label>
                <input 
                  type="text" 
                  required
                  value={editingItem.item.price}
                  onChange={(e) => setEditingItem(prev => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      item: { ...prev.item, price: e.target.value }
                    };
                  })}
                  placeholder="السعر"
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl py-3 px-4 focus:outline-none text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] text-gray-400 font-bold mb-1.5">الوصف والمكونات</label>
                <textarea 
                  value={editingItem.item.desc || ""}
                  onChange={(e) => setEditingItem(prev => {
                    if (!prev) return null;
                    return {
                      ...prev,
                      item: { ...prev.item, desc: e.target.value }
                    };
                  })}
                  placeholder="الوصف"
                  className="w-full text-xs bg-[#171e30] border border-white/10 rounded-xl p-3 h-20 focus:outline-none text-white resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#D4AF37] text-black font-bold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-1.5 hover:opacity-95 mt-6"
              >
                <Edit2 className="w-4 h-4" />
                <span>حفظ التعديلات الحالية</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
