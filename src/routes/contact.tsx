import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Phone, MapPin, Clock, Instagram, MessageCircle, Mail, Sparkles } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | مجموعة التاج" },
      { name: "description", content: "تواصل مع مطعم التاج وتاج مود كافيه. أرقام الهاتف، الموقع، وساعات العمل." },
      { property: "og:title", content: "تواصل معنا | مجموعة التاج" },
      { property: "og:description", content: "تواصل مع مطعم التاج وتاج مود كافيه." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [restaurantWhatsapp, setRestaurantWhatsapp] = useState("970593104000");
  const [cafeWhatsapp, setCafeWhatsapp] = useState("970590000002");

  useEffect(() => {
    async function loadSettings() {
      try {
        const { data, error } = await supabase.from("settings").select("*");
        if (error) throw error;
        if (data) {
          const restW = data.find(s => s.key === "taj_whatsapp_restaurant")?.value;
          const cafeW = data.find(s => s.key === "taj_whatsapp_cafe")?.value;
          if (restW) setRestaurantWhatsapp(restW);
          if (cafeW) setCafeWhatsapp(cafeW);
        }
      } catch (e) {
        console.error("Error loading settings in contact page:", e);
        const restW = localStorage.getItem("taj_whatsapp_restaurant");
        const cafeW = localStorage.getItem("taj_whatsapp_cafe");
        if (restW) setRestaurantWhatsapp(restW);
        if (cafeW) setCafeWhatsapp(cafeW);
      }
    }
    loadSettings();
  }, []);

  const formatDisplayPhone = (rawPhone: string) => {
    if (rawPhone.startsWith("970")) {
      return "0" + rawPhone.slice(3, 6) + "-" + rawPhone.slice(6, 9) + "-" + rawPhone.slice(9);
    }
    return rawPhone;
  };

  const branches = [
    {
      id: "restaurant",
      name: "مطعم التاج",
      instagram: "altaj_rest",
      address: "غزة — الرمال — شارع اليرموك (شرق مفترق الزهارنة - عمارة التاج هوم 1)",
      hours: "١١:٠٠ صباحاً — ١٢:٠٠ منتصف الليل",
      whatsapp: restaurantWhatsapp,
      phone: restaurantWhatsapp,
      phoneAlt: "056-691-4914",
      accent: "#D4AF37",
      hoverBorder: "hover:border-[#D4AF37]/50",
      iconSrc: "/logos/rest-main.svg"
    },
    {
      id: "cafe",
      name: "تاج مود كافيه",
      instagram: "tajmood_cafe",
      address: "غزة — شارع اليرموك (بجوار مطعم التاج)",
      hours: "٠٤:٠٠ صباحاً — ١٢:٠٠ منتصف الليل",
      whatsapp: cafeWhatsapp,
      phone: cafeWhatsapp,
      accent: "#F9B219",
      hoverBorder: "hover:border-[#F9B219]/50",
      iconSrc: "/logos/cafe-main.svg"
    },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white font-arabic relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[1] premium-noise" />
      <div className="pointer-events-none absolute top-0 right-0 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[100px] animate-float-slow -z-10"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#C97B63]/10 rounded-full blur-[100px] animate-float-slow -z-10"></div>

      <header className="sticky top-4 z-40 max-w-6xl mx-auto w-full px-4 mb-8">
        <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/10 shadow-lg rounded-full px-5 py-3">
          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-[#D4AF37]/30 transition-all shadow-md">
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold font-arabic">العودة للرئيسية</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <img 
              src="/logos/taj-group.png" 
              className="w-8 h-8 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" 
              alt="Taj Group" 
            />
            <span className="font-extrabold text-sm tracking-wide bg-gradient-to-l from-white to-zinc-400 bg-clip-text text-transparent">
              مجموعة التاج
            </span>
          </div>
        </div>
      </header>

      <section className="relative py-16 text-center max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4 py-1.5 text-[10px] text-[#F7E7A0] backdrop-blur-lg mb-6">
          <Sparkles className="h-3 w-3 text-[#D4AF37] animate-pulse" />
          <span>خدمة العملاء والاتصال المباشر</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-display">
          تواصل مع <span className="bg-gradient-to-l from-[#D4AF37] to-[#F9B219] bg-clip-text text-transparent">التاج</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light max-w-xl mx-auto">
          يسعدنا استقبال آرائكم واستفساراتكم، وتلبية طلباتكم من خلال قنوات الاتصال المباشرة الخاصة بفروعنا.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-8 items-stretch mb-16">
          {branches.map((b) => (
            <div
              key={b.name}
              className={`liquid-glass border border-white/10 ${b.hoverBorder} rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group`}
            >
              <div 
                className="absolute top-0 right-0 w-36 h-36 opacity-[0.02] rounded-full blur-3xl pointer-events-none group-hover:opacity-[0.06] transition-opacity"
                style={{ backgroundColor: b.accent }}
              ></div>

              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border transition-all"
                    style={{ backgroundColor: `${b.accent}08`, borderColor: `${b.accent}20` }}
                  >
                    <img 
                      src={b.iconSrc} 
                      className="w-6 h-6 object-contain"
                      alt={b.name}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white tracking-wide font-display">{b.name}</h2>
                </div>

                <div className="space-y-4.5 text-xs md:text-sm font-light">
                  <div className="flex items-start gap-3.5 text-zinc-400">
                    <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                    <span>{b.address}</span>
                  </div>
                  <div className="flex items-start gap-3.5 text-zinc-400">
                    <Phone className="w-5 h-5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                    <div className="flex flex-col gap-1">
                      <span>جوال: <a href={`tel:${b.phone}`} className="hover:text-white transition font-mono font-medium">{formatDisplayPhone(b.phone)}</a></span>
                      {b.phoneAlt && (
                        <span>وطنية: <a href={`tel:${b.phoneAlt.replace(/-/g, "")}`} className="hover:text-white transition font-mono font-medium">{b.phoneAlt}</a></span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3.5 text-zinc-400">
                    <Clock className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                    <span>{b.hours}</span>
                  </div>
                  <div className="flex items-center gap-3.5 text-zinc-400">
                    <Instagram className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                    <a href={`https://instagram.com/${b.instagram}`} target="_blank" rel="noreferrer" className="hover:text-white transition">
                      @{b.instagram}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba56] text-black font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg shadow-[#25D366]/10"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>مراسلة واتساب</span>
                </a>
                <a
                  href={`tel:${b.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-3.5 rounded-xl text-xs transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>اتصال هاتفي</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="liquid-glass border border-white/10 rounded-3xl p-6 md:p-8 text-center max-w-xl mx-auto shadow-2xl backdrop-blur-2xl">
          <Mail className="w-8 h-8 mx-auto mb-4 text-[#D4AF37]" />
          <h3 className="text-lg font-bold mb-2 font-display">الاستفسارات العامة والشكاوى</h3>
          <p className="text-xs text-[#E5D5CB]/70 font-light mb-4.5">
            إذا كانت لديك أي ملاحظات حول الخدمة أو ترغب في إرسال مقترح للإدارة العامة لمجموعة التاج:
          </p>
          <a href="mailto:info@taj-group.com" className="text-sm font-semibold text-white hover:underline font-mono">
            info@taj-group.com
          </a>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black/85 relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-10 text-center text-xs text-zinc-500">
          <div className="flex justify-center items-center gap-2.5 mb-4">
            <img 
              src="/logos/taj-group.png" 
              className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" 
              alt="Taj Group" 
            />
            <span className="font-extrabold text-white text-sm">مجموعة التاج</span>
          </div>
          <p className="mb-4">
            تابعونا على إنستغرام:{" "}
            <a className="text-white font-medium hover:underline" href="https://instagram.com/altaj_rest" target="_blank" rel="noreferrer">@altaj_rest</a>
            {" | "}
            <a className="text-white font-medium hover:underline" href="https://instagram.com/tajmood_cafe" target="_blank" rel="noreferrer">@tajmood_cafe</a>
          </p>
          <p className="opacity-60">© {new Date().getFullYear()} جميع الحقوق محفوظة لمجموعة التاج</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10px] text-zinc-400">
            <Link to="/about" className="hover:text-white transition">من نحن</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/contact" className="hover:text-white transition">تواصل معنا</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/branch" className="hover:text-white transition">موقع الفرع</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/admin" className="hover:text-white transition">لوحة التحكم</Link>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <Link to="/" className="hover:text-white transition">الفروع</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
