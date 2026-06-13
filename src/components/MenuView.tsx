import { useMemo, useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { 
  Search, ArrowRight, MessageCircle, ShoppingBag, Plus, Minus, 
  Trash2, X, MapPin, Phone, User, Clock, ClipboardList, Info, Instagram, Facebook 
} from "lucide-react";
import { useSharedCart } from "@/components/hooks/useSharedCart";
import { categoryImages, menuData, type Branch, type MenuItem } from "@/data/menu";
import { supabase } from "@/lib/supabase";
import { AnimatedLogoLoader } from "./AnimatedLogoLoader";

import pricingData from "../data/pricing.json";
import { escapeHtml, sanitizeInput, sanitizePhone, sanitizeUrl } from "@/lib/sanitize";

interface Props {
  branch: Branch;
  brandName: string;
  tagline: string;
  whatsapp: string;
  instagram: string;
  themeClass: string; // "theme-restaurant" | "theme-cafe"
}

interface CartItem {
  title: string;
  price: string;
  qty: number;
  notes: string;
  category: string;
}

export function MenuView({ branch, brandName, tagline, whatsapp, instagram, themeClass }: Props) {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Load initial items
  const [items, setItemsState] = useState<MenuItem[]>(menuData);

  // Custom pricing list state initialized with static pricingData
  const [pricingList, setPricingList] = useState<Array<{ id: number; area: string; price: number }>>(pricingData);

  // Load customized pricing from Supabase settings
  useEffect(() => {
    async function loadPricing() {
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("value")
          .eq("key", "taj_delivery_pricing")
          .single();

        if (error) throw error;
        if (data?.value) {
          const parsed = JSON.parse(data.value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPricingList(parsed);
            localStorage.setItem("taj_delivery_pricing", data.value);
          }
        }
      } catch (e) {
        console.error("Error loading delivery pricing from Supabase, using local cache:", e);
        const saved = localStorage.getItem("taj_delivery_pricing");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setPricingList(parsed);
            }
          } catch (err) {
            console.error("Error parsing local pricing:", err);
          }
        }
      }
    }
    loadPricing();
  }, []);

  // Time-based lock check (12:00 AM - 9:00 AM)
  const isStoreClosed = useMemo(() => {
    const hours = new Date().getHours();
    return hours >= 0 && hours < 9;
  }, []);
  
  // Cart state
  const { cart, setCart, addItem, changeItemQty, deleteItem } = useSharedCart();
  const [openCart, setOpenCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [itemNotes, setItemNotes] = useState("");
  const [itemQty, setItemQty] = useState(1);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [viewMode, setViewMode] = useState<"categories" | "items">("categories");

  // Customer order details
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    deliveryType: "delivery", // "delivery" | "pickup"
    areaId: "" as string | number, // selected pricing area ID
    detailedAddress: "",
    notes: ""
  });
  const [areaSearch, setAreaSearch] = useState("");

  // Load custom menu items from Supabase with auto-update check and localStorage fallback
  useEffect(() => {
    async function loadMenuItems() {
      try {
        const { data, error } = await supabase
          .from("menu_items")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const mappedItems: MenuItem[] = data.map((item: any) => ({
            branch: item.branch,
            category: item.category,
            title: item.title,
            desc: item.desc_text || undefined,
            price: item.price,
            image: item.image || undefined
          }));
          setItemsState(mappedItems);
        } else {
          setItemsState(menuData);
        }
      } catch (e) {
        console.error("Error loading menu items from Supabase, falling back to localStorage:", e);
        const saved = localStorage.getItem("taj_menu_items");
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setItemsState(parsed);
            }
          } catch (e) {
            setItemsState(menuData);
          }
        } else {
          setItemsState(menuData);
        }
      }
    }

    loadMenuItems();
  }, []);

  // Fetch customizable WhatsApp number from settings
  const [whatsappNum, setWhatsappNum] = useState(whatsapp);
  useEffect(() => {
    async function loadWhatsappSetting() {
      const key = branch === "restaurant" ? "taj_whatsapp_restaurant" : "taj_whatsapp_cafe";
      try {
        const { data, error } = await supabase
          .from("settings")
          .select("value")
          .eq("key", key)
          .single();

        if (error) throw error;

        if (data?.value) {
          setWhatsappNum(data.value);
        } else {
          setWhatsappNum(whatsapp);
        }
      } catch (e) {
        console.error("Error loading whatsapp from Supabase, falling back to localStorage:", e);
        const savedWhatsapp = localStorage.getItem(key);
        if (savedWhatsapp) {
          setWhatsappNum(savedWhatsapp);
        } else {
          setWhatsappNum(whatsapp);
        }
      }
    }

    loadWhatsappSetting();
  }, [branch, whatsapp]);

  // Switch to items view automatically when a search query is entered
  useEffect(() => {
    if (query.trim()) {
      setViewMode("items");
    }
  }, [query]);

  const branchItems = useMemo(() => items.filter((i) => i.branch === branch), [items, branch]);
  const categories = useMemo(() => Array.from(new Set(branchItems.map((i) => i.category))), [branchItems]);

  // Set active category to the first one when categories load
  useEffect(() => {
    if (categories.length > 0 && (!active || !categories.includes(active))) {
      setActive(categories[0]);
    }
  }, [categories, active]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = branchItems;
    if (q) {
      arr = arr.filter((i) => i.title.toLowerCase().includes(q) || i.category.toLowerCase().includes(q));
    } else {
      arr = arr.filter((i) => i.category === active);
    }
    return arr;
  }, [branchItems, query, active]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    map.set(query ? "نتائج البحث" : active, filtered);
    return map;
  }, [filtered, active, query]);

  // Cart helper functions
  const addToCart = (item: MenuItem, qty: number, notes: string) => {
    // Use shared hook to add item
    addItem(item, qty, notes);
    // Increment active carts simulation in localStorage (preserve existing behavior)
    const cartsCountKey = "taj_admin_live_carts_count";
    const count = parseInt(localStorage.getItem(cartsCountKey) || "3");
    localStorage.setItem(cartsCountKey, (count + 1).toString());
  };
  const cartTotalItems = useMemo(() => cart.reduce((acc, it) => acc + it.qty, 0), [cart]);
  
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, it) => {
      const isCustomPrice = it.price.includes("-");
      const priceNum = isCustomPrice || isNaN(parseFloat(it.price)) ? 0 : parseFloat(it.price);
      return acc + priceNum * it.qty;
    }, 0);
  }, [cart]);

  // Find selected delivery area
  const selectedArea = useMemo(() => {
    if (orderForm.deliveryType !== "delivery") return null;
    return pricingList.find((a) => a.id === Number(orderForm.areaId)) || null;
  }, [orderForm.deliveryType, orderForm.areaId, pricingList]);

  const deliveryFee = selectedArea ? selectedArea.price : 0;
  const cartTotal = cartSubtotal + deliveryFee;

  // Search filter for pricing areas
  const filteredAreas = useMemo(() => {
    const q = areaSearch.trim().toLowerCase();
    if (!q) return pricingList;
    return pricingList.filter((a) => a.area.toLowerCase().includes(q));
  }, [areaSearch, pricingList]);

  // Gaza mobile number validation: Starts with 059 or 056 and is exactly 10 digits total
  const validateGazaPhone = (phone: string) => {
    const cleanPhone = phone.replace(/[\s-]/g, "");
    return /^(059|056)\d{7}$/.test(cleanPhone);
  };

  const updateCartQty = (idx: number, change: number) => {
    changeItemQty(idx, change);
  };

  const removeFromCart = (idx: number) => {
    deleteItem(idx);
  };

  const openItemDetails = (item: MenuItem) => {
    setSelectedItem(item);
    setItemNotes("");
    setItemQty(1);
  };

  const handleConfirmAdd = () => {
    if (selectedItem) {
      addToCart(selectedItem, itemQty, itemNotes);
      setSelectedItem(null);
    }
  };

  // Client-side rate limiting for order submissions
  const orderTimestamps: number[] = [];
  const MAX_ORDERS_PER_MINUTE = 3;

  const checkClientRateLimit = (): boolean => {
    const now = Date.now();
    const windowMs = 60_000;
    const recent = orderTimestamps.filter(t => now - t < windowMs);
    orderTimestamps.length = 0;
    orderTimestamps.push(...recent, now);
    if (recent.length >= MAX_ORDERS_PER_MINUTE) {
      alert(`طلبات كثيرة جداً. الرجاء الانتظار ${Math.ceil((recent[0] + windowMs - now) / 1000)} ثانية قبل المحاولة مرة أخرى.`);
      return false;
    }
    return true;
  };

  const sendOrderToWhatsApp = () => {
    if (!checkClientRateLimit()) return;

    if (isStoreClosed) {
      alert("عذراً، نظام الطلبات مغلق حالياً. نستقبل طلباتكم يومياً من الساعة 9:00 صباحاً وحتى الساعة 12:00 منتصف الليل.");
      return;
    }
    if (!orderForm.name.trim() || orderForm.name.trim().length < 3) {
      alert("يرجى إدخال اسم صحيح وثلاثي على الأقل.");
      return;
    }

    if (!validateGazaPhone(orderForm.phone)) {
      alert("يرجى إدخال رقم جوال صحيح (يبدأ بـ 059 أو 056 ومكون من 10 أرقام فقط).");
      return;
    }

    if (orderForm.deliveryType === "delivery") {
      if (!orderForm.areaId) {
        alert("يرجى اختيار منطقة التوصيل لتحديد رسوم التوصيل.");
        return;
      }
      if (!orderForm.detailedAddress.trim() || orderForm.detailedAddress.trim().length < 5) {
        alert("يرجى إدخال العنوان التفصيلي للتوصيل بشكل واضح (الشارع، البناية).");
        return;
      }
    }

    const orderRef = `TAJ-${Math.floor(1000 + Math.random() * 9000)}`;
    const currentDate = new Date().toLocaleDateString("ar-EG", { year: "numeric", month: "2-digit", day: "2-digit" });

    // Category emoji helper
    const getCategoryEmoji = (category: string) => {
      const cat = category.trim();
      if (cat === "شاورما") return "🥙";
      if (cat === "مشاوي") return "🍖";
      if (cat === "بيتزا") return "🍕";
      if (cat === "ساندوتشات") return "🍔";
      if (cat === "وجبات") return "🍗";
      if (cat === "مقبلات") return "🍟";
      if (cat === "مشروبات ساخنة") return "☕";
      if (cat === "حلويات") return "🍰";
      if (cat === "ميلك شيك") return "🥤";
      if (cat === "مشروبات باردة") return "🍹";
      if (cat === "موهيتو") return "🍸";
      if (cat === "ايس كوفي") return "☕";
      if (cat === "ايس كريم") return "🍦";
      return "🍽️";
    };

    // Main header
    const headerEmoji = branch === "restaurant" ? "🍽️" : "☕";
    const headerText = `${headerEmoji} ${brandName}\n━━━━━━━━━━━━━━━━━━━━━━━━━\n        فاتورة طلب\n━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Customer & Delivery details
    const detailsText = [
      `🔢 رقم الفاتورة : #${orderRef}`,
      `📅 التاريخ       : ${currentDate}`,
      `👤 العميل        : ${orderForm.name.trim()}`,
      `📞 الجوال        : ${orderForm.phone.trim()}`,
      ``,
      `🛵 نوع الطلب : ${orderForm.deliveryType === "delivery" ? "توصيل للمنزل" : "استلام من الفرع"}`,
      `📍 العنوان   : ${orderForm.deliveryType === "delivery" 
        ? `${selectedArea?.area}\n               ${orderForm.detailedAddress.trim()}` 
        : "استلام من الفرع الرئيسي"}`
    ].join("\n");

    const itemsSectionHeader = `━━━━━━━━━━━━━━━━━━━━━━━━━\n        🧾 تفاصيل الطلب\n━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Format items
    const itemsText = cart.map(item => {
      const isCustomPrice = item.price.includes("-");
      const priceNum = isCustomPrice || isNaN(parseFloat(item.price)) ? 0 : parseFloat(item.price);
      const itemTotal = priceNum * item.qty;
      const emoji = getCategoryEmoji(item.category);
      const qtyUnit = item.qty === 1 ? "حبة" : (item.qty >= 3 && item.qty <= 10) ? "حبات" : "حبة";
      
      let line = `${emoji} ${item.title}\n   ${item.qty} ${qtyUnit} × ${isCustomPrice ? "حسب الطلب" : `${item.price} ₪`} = ${isCustomPrice ? "حسب الطلب" : `${itemTotal} ₪`}`;
      if (item.notes) {
        line += `\n   ملاحظة: _(${item.notes})_`;
      }
      return line;
    }).join("\n\n");

    const pricingSectionHeader = `━━━━━━━━━━━━━━━━━━━━━━━━━\n        💰 الحساب\n━━━━━━━━━━━━━━━━━━━━━━━━━`;

    // Format subtotal, delivery fee and total
    const priceText = [
      `المجموع الفرعي    : ${cartSubtotal} ₪`,
      `رسوم التوصيل     :  ${deliveryFee} ₪`,
      `─────────────────────────`,
      `💵 المجموع النهائي : ${cartTotal} ₪`
    ].join("\n");

    const notesText = orderForm.notes.trim() 
      ? `━━━━━━━━━━━━━━━━━━━━━━━━━\n        📝 ملاحظات عامة\n━━━━━━━━━━━━━━━━━━━━━━━━━\n_${orderForm.notes.trim()}_\n`
      : "";

    const thankYouText = `━━━━━━━━━━━━━━━━━━━━━━━━━\n   🌟 شكراً لطلبكم من\n      ${brandName} 👑\n━━━━━━━━━━━━━━━━━━━━━━━━━`;

    const messageParts = [
      headerText,
      "",
      detailsText,
      "",
      itemsSectionHeader,
      "",
      itemsText,
      "",
      pricingSectionHeader,
      "",
      priceText,
      "",
      notesText,
      thankYouText
    ];

    const textMessage = messageParts.filter(part => part !== "").join("\n");
    const encodedText = encodeURIComponent(textMessage);
    const cleanWhatsappNum = whatsappNum.replace(/[^\d]/g, "").slice(0, 15);
    const whatsappUrl = `https://wa.me/${cleanWhatsappNum}?text=${encodedText}`;

    // Note: Order is saved above with sanitized data
    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank");

    // Save order to Supabase with sanitized data
    const sanitizedName = escapeHtml(sanitizeInput(orderForm.name.trim()));
    const sanitizedPhone = sanitizePhone(orderForm.phone.trim());
    const sanitizedAddress = escapeHtml(sanitizeInput(
      orderForm.deliveryType === "delivery"
        ? `${selectedArea?.area} - ${orderForm.detailedAddress.trim()}`
        : "استلام من الفرع"
    ));
    const sanitizedNotes = escapeHtml(sanitizeInput(orderForm.notes.trim()));

    supabase.from("orders").insert({
      order_ref: orderRef,
      customer_name: sanitizedName,
      customer_phone: sanitizedPhone,
      delivery_type: orderForm.deliveryType,
      address: sanitizedAddress,
      items: cart,
      subtotal: cartSubtotal,
      delivery_fee: deliveryFee,
      total: cartTotal,
      notes: sanitizedNotes || null
    }).then(({ error }) => {
      if (error) console.error("Error saving order to Supabase:", error);
    });

    // Add to admin live logs in localStorage (as fallback/local logging)
    const orderTime = new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).split(" ")[0];
    const logKey = "taj_admin_live_orders_log";
    const existingLogs = JSON.parse(localStorage.getItem(logKey) || "[]");
    existingLogs.unshift({
      time: orderTime,
      event: `تم تأكيد طلب جديد للعميل ${orderForm.name.trim()} بقيمة ${cartTotal} ₪`
    });
    if (existingLogs.length > 15) existingLogs.pop();
    localStorage.setItem(logKey, JSON.stringify(existingLogs));

    // Increment orders count
    const ordersCountKey = "taj_admin_live_orders_count";
    const count = parseInt(localStorage.getItem(ordersCountKey) || "18");
    localStorage.setItem(ordersCountKey, (count + 1).toString());

    // Reset state
    setCart([]);
    setOpenCart(false);
    setCheckoutStep(1);
    setOrderForm({
      name: "",
      phone: "",
      deliveryType: "delivery",
      areaId: "",
      detailedAddress: "",
      notes: ""
    });

    alert("نشكرك على ثقتك بمجموعة التاج، جاري تحويلك للواتساب لإتمام طلبك.");
  };

  return (
    <div className={`${themeClass} min-h-screen relative`} dir="rtl">
      {isStoreClosed && (
        <div className="bg-red-950/90 border-b border-red-500/30 text-white text-center py-3.5 px-4 text-xs font-bold font-arabic flex items-center justify-center gap-2 relative z-50 animate-fade-down">
          <Clock className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span>عذراً، نظام الطلبات مغلق حالياً. نستقبل طلباتكم يومياً من الساعة 9:00 صباحاً وحتى الساعة 12:00 منتصف الليل. الفرع مغلق الآن وسنعاود الخدمة في تمام الساعة 9:00 صباحاً!</span>
        </div>
      )}
      <AnimatedLogoLoader isLoading={pageLoading} theme={branch} />
      {/* Header Container */}
      <div className="relative z-50 px-4 max-w-6xl mx-auto w-full transition-all mt-4">
        <header className="flex flex-col md:flex-row items-center justify-between bg-background/85 backdrop-blur-xl border border-border shadow-lg rounded-[1.5rem] md:rounded-full px-4 md:px-5 py-3 md:py-2.5 gap-3 md:gap-0">
          
          {/* Top Row for Mobile (Logo + Cart) / Left Section for Desktop */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img 
                src={branch === "cafe" ? "/logos/cafe-main.svg" : "/logos/rest-main.svg"} 
                alt={brandName} 
                className="h-10 md:h-12 object-contain drop-shadow-md"
              />
              {branch === "restaurant" && (
                <div className="text-right leading-tight hidden lg:block">
                  <div className="font-bold text-sm text-foreground">{brandName}</div>
                </div>
              )}
            </div>

            {/* Mobile Cart Button */}
            <button 
              onClick={() => setOpenCart(true)} 
              className="md:hidden flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-primary-foreground shadow-md text-xs font-semibold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>السلة</span>
              {cartTotalItems > 0 && (
                <span className="bg-background text-foreground px-1.5 py-0.5 rounded-full">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>

          {/* Navigation Links (Middle) */}
          <nav className="flex flex-wrap md:flex-nowrap items-center justify-center w-full md:w-auto gap-x-2.5 gap-y-2 md:gap-8 text-[11px] md:text-sm font-medium text-muted-foreground px-1 pt-2 md:pt-0 border-t border-border/50 md:border-t-0">
            <Link to="/" className="whitespace-nowrap flex items-center gap-1 px-3 md:px-5 py-1 md:py-2 rounded-full bg-primary text-primary-foreground shadow-md font-semibold hover:opacity-90 transition">
              <span>الفروع</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
            <Link to="/about" className="whitespace-nowrap hover:text-foreground transition">من نحن</Link>
            <Link to="/contact" className="whitespace-nowrap hover:text-foreground transition">تواصل معنا</Link>
            <Link to="/branch" className="whitespace-nowrap hover:text-foreground transition">موقع الفرع</Link>
          </nav>
          
          {/* Desktop Cart Button (Right) */}
          <button 
            onClick={() => setOpenCart(true)} 
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition shadow-md text-sm font-semibold"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>السلة</span>
            {cartTotalItems > 0 && (
              <span className="bg-background text-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {cartTotalItems}
              </span>
            )}
          </button>
          
        </header>
      </div>

      {/* Floating Action Button (Cart) */}
      {cartTotalItems > 0 && (
        <button 
          onClick={() => setOpenCart(true)} 
          className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 hover:shadow-accent/20 hover:shadow-2xl"
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="absolute -top-1 -left-1 bg-primary text-primary-foreground font-bold text-xs w-5.5 h-5.5 rounded-full flex items-center justify-center border-2 border-card shadow-md animate-bounce">
            {cartTotalItems}
          </span>
        </button>
      )}

      {/* Hero strip */}
      <section className="bg-hero relative overflow-hidden">
        {/* Subtle background logo watermark */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-[0.03] pointer-events-none">
          <img src={branch === "cafe" ? "/logos/cafe-main.svg" : "/logos/rest-main.svg"} className="w-[600px] h-[600px] object-contain" alt="" />
        </div>
        
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center relative z-10">
          <div className="flex justify-center mb-6 mt-4">
            <img 
              src={branch === "cafe" ? "/logos/cafe-main.svg" : "/logos/rest-main.svg"} 
              alt={brandName} 
              className="object-contain drop-shadow-[0_15px_30px_var(--color-primary)] opacity-90 animate-float-slow h-56 md:h-80 lg:h-[500px] xl:h-[600px]"
            />
          </div>
          <div className="crown-divider mb-4 max-w-xs mx-auto text-xs tracking-widest">
            <span className="font-bold opacity-80">MENU</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
            قائمة <span className="text-accent">{brandName}</span>
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            {tagline}
          </p>

          {/* Search */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن صنف..."
              className="w-full bg-card border border-border rounded-full pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Category chips (only visible in items list view mode) */}
      {viewMode === "items" && (
        <div className="z-30 bg-background/90 backdrop-blur border-b border-border transition-all duration-300">
          <div className="max-w-6xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActive(cat); setQuery(""); }}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition border ${
                  active === cat && !query
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-card text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {viewMode === "categories" ? (
          /* Categories Grid Mode (Grid of large adjacent image cards) */
          <div className="animate-fade-up text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-foreground drop-shadow-md">
              استكشف <span className="text-accent">الأقسام</span>
            </h2>
            
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-bold text-sm hover:opacity-90 transition mb-10 shadow-lg"
            >
              <ArrowRight className="w-4 h-4" />
              <span>تغيير الفرع الحالي</span>
            </Link>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {categories.map((cat) => {
                const imgUrl = categoryImages[cat] ?? categoryImages.default;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActive(cat);
                      setViewMode("items");
                    }}
                    className="group relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-glow hover:-translate-y-1.5 transition-all duration-500 w-full block focus:outline-none focus:ring-2 focus:ring-accent/50 border border-white/5"
                  >
                    {/* Background Image */}
                    <img
                      src={imgUrl}
                      alt={cat}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300" />
                    
                    {/* Title with underline */}
                    <div className="absolute inset-x-0 bottom-8 flex flex-col items-center justify-end z-10 text-white transition-all duration-300 group-hover:translate-y-[-4px]">
                      <h3 className="text-xl md:text-3xl font-extrabold tracking-wide mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-white">
                        {cat}
                      </h3>
                      <div className="w-12 h-1 bg-accent rounded-full"></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Detailed Items List Mode */
          <div className="animate-fade-up">
            {/* Header: Back button & Active Category Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border/50">
              <button
                onClick={() => {
                  setViewMode("categories");
                  setQuery("");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-muted text-xs font-bold transition border border-border text-foreground hover:text-accent w-max shadow-sm cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>العودة لجميع الأقسام</span>
              </button>
              
              {!query && (
                <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <span>القسم الحالي:</span>
                  <span className="text-accent font-extrabold">{active}</span>
                </div>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-50" />
                <p>لم يتم العثور على نتائج</p>
              </div>
            ) : (
              Array.from(grouped.entries()).map(([cat, list]) => (
                <section key={cat} className="mb-10 animate-fade-up">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <span className="w-1 h-6 rounded-full bg-accent" />
                    {cat}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {list.map((it, idx) => (
                      <article
                        key={it.title + idx}
                        onClick={() => openItemDetails(it)}
                        className="group bg-card border border-accent/10 rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.3)] hover:shadow-glow hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                          <img
                            src={it.image || categoryImages[it.category] || categoryImages.default}
                            alt={it.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-36">
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h3 className="font-bold text-base text-foreground leading-snug group-hover:text-accent transition-colors">{it.title}</h3>
                              <div className="shrink-0 text-accent font-extrabold">
                                {it.price === "-" ? <span className="text-xs">حسب الطلب</span> : <>{it.price} <span className="text-xs opacity-70">₪</span></>}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {it.desc || "مُحضّر بعناية بمكونات طازجة ليرضي ذائقتكم"}
                            </p>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); openItemDetails(it); }}
                            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            أضف للطلب
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        )}
      </main>

      {/* Item Detail Modal (Radix Dialog style) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div 
            onClick={() => setSelectedItem(null)} 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
          ></div>

          {/* Dialog Body */}
          <div className="relative liquid-glass rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl z-10 text-foreground animate-fade-up">
            <button 
              onClick={() => setSelectedItem(null)} 
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img 
                src={selectedItem.image || categoryImages[selectedItem.category] || categoryImages.default} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6">
              <span className="inline-block bg-accent/10 text-accent text-xxs font-bold px-3 py-1 rounded-full mb-3">
                {selectedItem.category}
              </span>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <span className="text-xl font-extrabold text-accent">
                  {selectedItem.price === "-" ? "حسب الطلب" : `${selectedItem.price} ₪`}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                {selectedItem.desc || "مُحضّر بعناية يومية وطريقة فاخرة تليق بعملائنا الكرام وبأعلى معايير الجودة."}
              </p>

              {/* Special Notes */}
              <div className="mb-6">
                <label className="block text-xs font-bold mb-2">ملاحظات خاصة (اختياري)</label>
                <textarea
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  placeholder="مثال: بدون بصل، زيادة صوص، نوع الخبز المفضل..."
                  className="w-full text-sm bg-background border border-border rounded-xl p-3 h-20 focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none text-foreground"
                />
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="flex items-center bg-muted border border-border rounded-xl px-2">
                  <button 
                    onClick={() => setItemQty(q => Math.max(1, q - 1))}
                    className="p-2 text-muted-foreground hover:text-foreground transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm min-w-8 text-center">{itemQty}</span>
                  <button 
                    onClick={() => setItemQty(q => q + 1)}
                    className="p-2 text-muted-foreground hover:text-foreground transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button 
                  onClick={handleConfirmAdd}
                  className="flex-1 bg-accent text-accent-foreground font-bold py-3.5 rounded-xl transition-all shadow-md text-sm hover:opacity-95"
                >
                  إضافة إلى السلة
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sheet Drawer */}
      {openCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            onClick={() => setOpenCart(false)} 
            className="absolute inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
          ></div>

          {/* Drawer Body */}
          <div className={`relative w-full max-w-md h-full flex flex-col shadow-2xl z-10 text-foreground animate-fade-left ${
            branch === "restaurant"
              ? "bg-[#0a0a0a] border-l-4 border-[#D4AF37] rounded-none"
              : "liquid-glass rounded-l-[2rem] border-l border-border"
          }`}>
            
            {/* Header */}
            <div className={`px-6 py-5 border-b flex items-center justify-between ${
              branch === "restaurant"
                ? "bg-black border-[#D4AF37]/30"
                : "bg-card/50 border-border"
            }`}>
              <div className="flex items-center gap-3">
                <ShoppingBag className={`w-5 h-5 ${branch === "restaurant" ? "text-[#D4AF37]" : "text-accent"}`} />
                <h2 className={`font-bold text-base ${branch === "restaurant" ? "text-[#D4AF37] font-serif" : ""}`}>
                  سلة طلباتك
                </h2>
              </div>
              <button 
                onClick={() => setOpenCart(false)} 
                className={`w-8 h-8 flex items-center justify-center transition ${
                  branch === "restaurant"
                    ? "rounded-none border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    : "rounded-full border border-border hover:bg-muted"
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart content */}
            <div className="flex-grow overflow-y-auto p-6 scrollbar-hide">
              {cart.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                    <img src={branch === "cafe" ? "/logos/cafe-yellow.svg" : "/logos/rest-21.svg"} className="w-full h-full object-contain filter drop-shadow-md" alt="Empty Cart" />
                  </div>
                  <h3 className="font-bold text-base mb-1">السلة فارغة حالياً</h3>
                  <p className="text-xs max-w-xs mx-auto leading-relaxed">تصفح قائمة الطعام المميزة وأضف الأطباق المفضلة لتظهر لك هنا.</p>
                  <button 
                    onClick={() => setOpenCart(false)}
                    className="mt-6 bg-primary text-primary-foreground py-2.5 px-6 rounded-xl text-xs font-semibold hover:opacity-90 transition"
                  >
                    تصفح المنيو
                  </button>
                </div>
              ) : checkoutStep === 1 ? (
                /* STEP 1: Edit list items */
                <div className="space-y-4">
                  <div className="text-xs text-muted-foreground flex justify-between items-center border-b border-border pb-2 mb-4">
                    <span>المنتج والكمية</span>
                    <span>الحساب الفرعي</span>
                  </div>

                  {cart.map((cartItem, index) => {
                    const isCustomPrice = cartItem.price.includes("-");
                    const priceNum = isCustomPrice || isNaN(parseFloat(cartItem.price)) ? 0 : parseFloat(cartItem.price);
                    const itemTotal = priceNum * cartItem.qty;

                    return (
                      <div 
                        key={index} 
                        className={`relative flex gap-3 items-start transition-colors p-4 ${
                          branch === "restaurant"
                            ? "bg-[#111] rounded-sm border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 shadow-lg"
                            : "bg-background rounded-2xl border border-border hover:border-accent/30"
                        }`}
                      >
                        {/* Remove item button */}
                        <button 
                          onClick={() => removeFromCart(index)}
                          className="absolute top-2 left-2 text-red-500 hover:bg-red-500/10 p-1 rounded-lg transition"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex-grow">
                          <h4 className="font-bold text-sm pr-6">{cartItem.title}</h4>
                          <span className="text-[10px] text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full inline-block mt-1">
                            {cartItem.category}
                          </span>
                          
                          {cartItem.notes && (
                            <p className="text-xxs text-accent mt-1.5 leading-relaxed bg-accent/5 px-2 py-1 rounded border border-accent/10">
                              ملاحظة: {cartItem.notes}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-3 bg-card border border-border rounded-lg w-max px-1 py-0.5">
                            <button 
                              onClick={() => updateCartQty(index, -1)}
                              className="p-1 hover:text-accent transition"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-2 font-bold text-xs min-w-6 text-center">{cartItem.qty}</span>
                            <button 
                              onClick={() => updateCartQty(index, 1)}
                              className="p-1 hover:text-accent transition"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="shrink-0 text-left font-bold text-xs pt-1">
                          {isCustomPrice ? "حسب الطلب" : `${itemTotal} ₪`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* STEP 2: Checkout Form details */
                <div className="space-y-4">
                  <button 
                    onClick={() => setCheckoutStep(1)} 
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition mb-2"
                  >
                    <ArrowRight className="w-3.5 h-3.5" /> العودة لمراجعة السلة
                  </button>

                  <h3 className="font-bold text-sm border-b border-border pb-2 mb-4">تفاصيل التوصيل والاتصال</h3>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5">الاسم ثلاثي</label>
                    <div className="relative">
                      <input 
                        type="text"
                        value={orderForm.name}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="أدخل اسمك ثلاثي"
                        className="w-full text-xs bg-background border border-border rounded-xl pr-9 pl-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-foreground"
                      />
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Customer Phone (Gaza specific validation) */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5">رقم الجوال (10 أرقام ويبدأ بـ 059 أو 056)</label>
                    <div className="relative">
                      <input 
                        type="tel"
                        maxLength={10}
                        value={orderForm.phone}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, "") }))}
                        placeholder="مثال: 0599000000"
                        className="w-full text-xs bg-background border border-border rounded-xl pr-9 pl-3 py-3 focus:outline-none focus:ring-1 focus:ring-accent text-foreground font-mono"
                      />
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                    {orderForm.phone.length > 0 && !validateGazaPhone(orderForm.phone) && (
                      <p className="text-[10px] text-red-500 mt-1">يجب إدخال 10 أرقام صحيحة تبدأ بـ 059 أو 056</p>
                    )}
                  </div>

                  {/* Delivery Type */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5">خيارات الاستلام</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        type="button"
                        onClick={() => setOrderForm(prev => ({ ...prev, deliveryType: "delivery" }))}
                        className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                          orderForm.deliveryType === "delivery"
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5" /> توصيل للمنزل
                      </button>
                      <button 
                        type="button"
                        onClick={() => setOrderForm(prev => ({ ...prev, deliveryType: "pickup" }))}
                        className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                          orderForm.deliveryType === "pickup"
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-background border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" /> استلام من الفرع
                      </button>
                    </div>
                  </div>

                  {/* Geolocation area pricing selector (if delivery chosen) */}
                  {orderForm.deliveryType === "delivery" && (
                    <div className="space-y-3 p-3 bg-background rounded-2xl border border-border animate-fade-up">
                      <div>
                        <label className="block text-xs font-bold mb-1.5">منطقة التوصيل (اختر منطقتك)</label>
                        
                        {/* Simple search bar inside dropdown for 91 regions */}
                        <div className="relative mb-2">
                          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                          <input 
                            type="text"
                            value={areaSearch}
                            onChange={(e) => setAreaSearch(e.target.value)}
                            placeholder="ابحث عن منطقتك..."
                            className="w-full text-xxs bg-card border border-border rounded-lg pr-8 pl-3 py-2 focus:outline-none text-foreground"
                          />
                        </div>

                        <select
                          value={orderForm.areaId}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, areaId: e.target.value }))}
                          className="w-full text-sm font-bold bg-card border-2 border-primary/50 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground cursor-pointer shadow-md transition-all appearance-none"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='gray' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'left 1rem center',
                            backgroundSize: '1.2em'
                          }}
                        >
                          <option value="">-- اختر المنطقة --</option>
                          {filteredAreas.map((area) => (
                            <option key={area.id} value={area.id}>
                              {area.area} (+ {area.price} ₪ توصيل)
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Detailed address text area */}
                      <div>
                        <label className="block text-xs font-bold mb-1.5">العنوان التفصيلي (الشارع، معالم قريبة، البناية)</label>
                        <textarea 
                          value={orderForm.detailedAddress}
                          onChange={(e) => setOrderForm(prev => ({ ...prev, detailedAddress: e.target.value }))}
                          placeholder="مثال: شارع الجلاء، بجانب برج الشروق، الطابق الثالث"
                          className="w-full text-xs bg-card border border-border rounded-xl p-3 h-16 focus:outline-none text-foreground resize-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* General order notes */}
                  <div>
                    <label className="block text-xs font-bold mb-1.5">ملاحظات عامة للطلب (اختياري)</label>
                    <textarea 
                      value={orderForm.notes}
                      onChange={(e) => setOrderForm(prev => ({ ...prev, notes: e.target.value }))}
                      placeholder="أي ملاحظات خاصة بالتسليم أو الطلب ككل..."
                      className="w-full text-xs bg-background border border-border rounded-xl p-3 h-16 focus:outline-none text-foreground resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer prices and actions */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-muted space-y-4">
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-muted-foreground">
                    <span>المجموع الفرعي:</span>
                    <span className="font-bold">{cartSubtotal} ₪</span>
                  </div>
                  {orderForm.deliveryType === "delivery" && selectedArea && (
                    <div className="flex justify-between items-center text-muted-foreground animate-fade-up">
                      <span>رسوم التوصيل ({selectedArea.area}):</span>
                      <span className="font-bold text-accent">+{deliveryFee} ₪</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm font-bold border-t border-border pt-2 text-foreground">
                    <span>الحساب النهائي:</span>
                    <span className="text-base font-extrabold text-accent">{cartTotal} ₪</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                  {isStoreClosed ? (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center text-xs font-bold font-arabic leading-relaxed">
                      عذراً، نظام الطلبات مغلق حالياً. الفرع يستقبل طلباتكم يومياً من الساعة 9:00 صباحاً وحتى الساعة 12:00 منتصف الليل.
                    </div>
                  ) : checkoutStep === 1 ? (
                    <button 
                      onClick={() => setCheckoutStep(2)}
                      className="w-full bg-accent text-accent-foreground font-bold py-3.5 rounded-xl transition-all shadow-md text-sm hover:opacity-95 flex items-center justify-center gap-2"
                    >
                      <ClipboardList className="w-4 h-4" />
                      <span>متابعة الطلب وإدخال البيانات</span>
                    </button>
                  ) : (
                    <button 
                      onClick={sendOrderToWhatsApp}
                      className="w-full bg-green-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-md text-sm hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>تأكيد وإرسال الفاتورة عبر الواتساب</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-muted-foreground">

          
          <div className="flex justify-center items-center gap-2 mb-2">
            <img src="/logos/taj-group.png" className="w-8 h-8 object-contain drop-shadow-md" alt="Taj Group" />
            <span className="font-bold text-foreground">{brandName}</span>
          </div>
          <div className="flex justify-center items-center gap-6 mt-4 mb-4 text-xs flex-wrap">
            <a className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition font-semibold" href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer">
              <Instagram className="w-4 h-4" />
              <span>إنستغرام</span>
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <a className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition font-semibold" href="https://www.facebook.com/altajRest/?locale=br_FR" target="_blank" rel="noreferrer">
              <Facebook className="w-4 h-4" />
              <span>فيسبوك</span>
            </a>
            <span className="w-1.5 h-1.5 rounded-full bg-border" />
            <a className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition font-semibold" href="https://www.tiktok.com/@tajrest" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
              <span>تيك توك</span>
            </a>
          </div>

          <p className="mt-3 opacity-70">© {new Date().getFullYear()} مجموعة التاج</p>
        </div>
      </footer>
    </div>
  );
}

