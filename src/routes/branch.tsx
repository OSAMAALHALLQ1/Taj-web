import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowRight, MapPin, Clock, Phone, MessageCircle, Navigation, Map, Sparkles } from "lucide-react";

export const Route = createFileRoute("/branch")({
  head: () => ({
    meta: [
      { title: "موقع الفروع | مجموعة التاج" },
      { name: "description", content: "تفضل بزيارة فروع مجموعة التاج في غزة: مطعم التاج وتاج مود كافيه. تعرف على الفروع وساعات العمل." },
      { property: "og:title", content: "موقع الفروع | مجموعة التاج" },
      { property: "og:description", content: "تعرف على موقع فروعنا وساعات عملها." },
    ],
  }),
  component: BranchPage,
});

function BranchPage() {
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
        console.error("Error loading settings in branch page:", e);
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
      tagline: "مطعم التاج لأشهى الأكل الشرقي والغربي",
      address: "غزة، الرمال، شارع اليرموك، شرق مفترق الزهارنة، عمارة التاج هوم 1",
      hours: "يومياً: ١١:٠٠ صباحاً — ١٢:٠٠ منتصف الليل",
      phone: formatDisplayPhone(restaurantWhatsapp),
      phoneAlt: "056-691-4914",
      whatsapp: restaurantWhatsapp,
      accent: "#D4AF37",
      hoverBorder: "hover:border-[#D4AF37]/50",
      themeClass: "liquid-glass border-white/5 text-white hover:border-[#D4AF37]/35",
      menuLink: "/restaurant",
      instagram: "altaj_rest",
      iconSrc: "/logos/rest-main.svg"
    },
    {
      id: "cafe",
      name: "تاج مود كافيه",
      tagline: "تاج مود .. لكل مود😍 بار - كافي - جلسات هادئة",
      address: "غزة، شارع اليرموك، بجوار مطعم التاج",
      hours: "يومياً: ٠٤:٠٠ صباحاً — ١٢:٠٠ منتصف الليل",
      phone: formatDisplayPhone(cafeWhatsapp),
      whatsapp: cafeWhatsapp,
      accent: "#F9B219",
      hoverBorder: "hover:border-[#F9B219]/50",
      themeClass: "liquid-glass border-white/5 text-white hover:border-[#F9B219]/35",
      menuLink: "/cafe",
      instagram: "tajmood_cafe",
      iconSrc: "/logos/cafe-main.svg"
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white font-arabic relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[1] premium-noise" />
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-slow"></div>
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#C97B63]/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float-slow"></div>

      <div className="relative z-50 px-4 max-w-6xl mx-auto w-full transition-all mt-4 mb-8">
        <header className="flex flex-col md:flex-row items-center justify-between bg-black/85 backdrop-blur-xl border border-white/10 shadow-lg rounded-[1.5rem] md:rounded-full px-4 md:px-5 py-3 md:py-2.5 gap-3 md:gap-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="/logos/taj-group.png" 
                alt="مجموعة التاج" 
                className="h-10 md:h-12 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              />
              <div className="text-right leading-tight hidden lg:block">
                <div className="font-extrabold text-sm tracking-wide bg-gradient-to-l from-white to-zinc-400 bg-clip-text text-transparent">مجموعة التاج</div>
              </div>
            </Link>
          </div>
          <nav className="flex flex-wrap md:flex-nowrap items-center justify-center w-full md:w-auto gap-x-2.5 gap-y-2 md:gap-8 text-[11px] md:text-sm font-medium text-zinc-400 px-1 pt-2 md:pt-0 border-t border-white/10 md:border-t-0">
            <Link to="/" className="whitespace-nowrap flex items-center gap-1 px-3 md:px-5 py-1 md:py-2 rounded-full bg-[#D4AF37] text-black shadow-md font-bold hover:opacity-90 transition">
              <span>الرئيسية</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </Link>
            <Link to="/about" className="whitespace-nowrap hover:text-white transition">من نحن</Link>
            <Link to="/contact" className="whitespace-nowrap hover:text-white transition">تواصل معنا</Link>
            <Link to="/branch" className="whitespace-nowrap text-white font-bold transition">موقع الفروع</Link>
          </nav>
        </header>
      </div>

      <section className="relative py-16 text-center max-w-3xl mx-auto px-6">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4.5 py-1.5 text-[10px] text-[#F7E7A0] backdrop-blur-lg mb-6">
          <Sparkles className="h-3 w-3 text-[#D4AF37] animate-pulse" />
          <span>مواقعنا الجغرافية وفروعنا</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight font-display">
          أين تجد فروع <span className="bg-gradient-to-l from-[#D4AF37] to-[#F9B219] bg-clip-text text-transparent">التاج</span>؟
        </h1>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-light max-w-xl mx-auto">
          نهتم دائماً بتقديم أفضل نكهة وأجمل أجواء لعملائنا في غزة. تفضل بزيارة فروعنا الراقية بالرمال وعِش معنا المود الفاخر.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
            {branches.map((b) => (
              <div 
                key={b.id}
                className={`${b.themeClass} ${b.hoverBorder} p-6 md:p-8 rounded-3xl border shadow-2xl flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group`}
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-[0.01] rounded-full blur-2xl pointer-events-none group-hover:opacity-[0.05] transition-opacity"
                  style={{ backgroundColor: b.accent }}
                ></div>

                <div>
                  <div className="flex justify-between items-start mb-5">
                    <span 
                      className="text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: `${b.accent}15`, color: b.accent, border: `1px solid ${b.accent}30` }}
                    >
                      {b.id === "restaurant" ? "مطعم وعائلات" : "كافيه وقهوة مختصة"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black mb-2 flex items-center gap-3 font-display">
                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center border"
                      style={{ backgroundColor: `${b.accent}08`, borderColor: `${b.accent}20` }}
                    >
                      <img 
                        src={b.iconSrc} 
                        className="w-5 h-5 object-contain"
                        alt={b.name}
                      />
                    </div>
                    {b.name}
                  </h2>
                  <p className="text-xs text-zinc-400 font-light mb-6 leading-relaxed">{b.tagline}</p>

                  <div className="space-y-4 text-xs md:text-sm font-light text-zinc-300">
                    <div className="flex items-start gap-3.5">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <Clock className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>{b.hours}</span>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <Phone className="w-5 h-5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                      <div className="flex flex-col gap-1">
                        <span>جوال: <a href={`tel:${b.phone.replace(/-/g, "")}`} className="font-semibold hover:underline font-mono">{b.phone}</a></span>
                        {b.phoneAlt && (
                          <span>وطنية: <a href={`tel:${b.phoneAlt.replace(/-/g, "")}`} className="font-semibold hover:underline font-mono">{b.phoneAlt}</a></span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <MessageCircle className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>واتساب: <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" className="font-semibold hover:underline font-mono">{b.phone}</a></span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                  <Link 
                    to={b.menuLink}
                    className="flex-1 text-center font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 hover:opacity-95"
                    style={{ backgroundColor: b.accent, color: "#000" }}
                  >
                    <span>استكشف المنيو واطلب الآن</span>
                    <span>←</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-6 bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Map className="w-5 h-5 text-white" />
                <h3 className="font-bold text-base font-display">خريطة الفروع على Google Maps</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">
                تقع فروع مجموعة التاج في شارع الرمال - شارع اليرموك بمدينة غزة، مما يضمن سهولة الوصول وسرعة توصيل الطلبات الساخنة إلى منازلكم.
              </p>

              <div className="aspect-[4/3] w-full rounded-2xl border border-white/10 bg-black overflow-hidden relative shadow-2xl">
                <iframe 
                  src="https://maps.google.com/maps?q=Yarmouk%20Street,%20Gaza&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(120%) brightness(90%)" }} 
                  allowFullScreen={false} 
                  loading="lazy"
                  title="موقع فروع مجموعة التاج على الخريطة"
                ></iframe>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-light font-arabic">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-white" />
                <span>غزة، شارع اليرموك</span>
              </span>
              <span>الرقم الموحد: 059-310-4000</span>
            </div>

          </div>

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
          <p className="opacity-60">© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة مجموعة التاج</p>
        </div>
      </footer>
    </div>
  );
}
