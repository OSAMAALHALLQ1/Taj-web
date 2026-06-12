import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, Navigation, Map, Sparkles } from "lucide-react";

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
  const [restaurantWhatsapp, setRestaurantWhatsapp] = useState("970590000001");
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
      tagline: "نكهات أصيلة • مشاوي وشاورما بجودة فاخرة لجميع العائلات",
      address: "غزة، شارع الرمال الرئيسي، مقابل بنك فلسطين (الفرع الرئيسي)",
      hours: "يومياً: ١١:٠٠ صباحاً — ١٢:٠٠ منتصف الليل",
      phone: formatDisplayPhone(restaurantWhatsapp),
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
      tagline: "قهوة مختصة فاخرة • حلويات غربية • أجواء زجاجية هادئة",
      address: "غزة، شارع الرمال، بجوار المجلس التشريعي",
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

      <header className="sticky top-4 z-40 max-w-6xl mx-auto w-full px-4 mb-8">
        <div className="flex items-center justify-between bg-black/85 backdrop-blur-xl border border-white/10 shadow-lg rounded-full px-5 py-3">
          <Link to="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">الرئيسية</span>
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
                    <div className="flex items-center gap-3.5">
                      <Phone className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>الهاتف: <a href={`tel:${b.phone.replace(/-/g, "")}`} className="font-semibold hover:underline font-mono">{b.phone}</a></span>
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
                <h3 className="font-bold text-base font-display">خريطة الفروع الموحدة بالرمال</h3>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-light">
                تقع فروع مجموعة التاج في مواقع استراتيجية بمدينة غزة (حي الرمال الراقي)، مما يضمن سهولة الوصول وسرعة توصيل الطلبات الساخنة إلى منازلكم.
              </p>

              <div className="aspect-[4/3] w-full rounded-2xl border border-white/5 bg-black/60 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                <div className="absolute h-7 w-full bg-zinc-900/60 top-1/3 -rotate-3 border-y border-white/5 flex items-center justify-center">
                  <span className="text-[8px] text-zinc-500 font-extrabold tracking-widest font-arabic">شارع الرمال الرئيسي</span>
                </div>
                <div className="absolute w-7 h-full bg-zinc-900/60 right-1/4 rotate-6 border-x border-white/5 flex items-center justify-center">
                  <span className="text-[8px] text-zinc-500 font-extrabold tracking-widest rotate-90 font-arabic">مفترق المجلس التشريعي</span>
                </div>

                <div className="absolute top-1/4 right-1/3 flex flex-col items-center animate-bounce">
                  <div className="bg-[#D4AF37] w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <img src="/logos/rest-main.svg" className="w-4 h-4 object-contain" alt="" />
                  </div>
                  <span className="text-[9px] font-extrabold bg-black/90 px-2 py-0.5 rounded border border-[#D4AF37]/30 mt-1 shadow-md text-[#D4AF37] font-display">مطعم التاج</span>
                </div>

                <div className="absolute bottom-1/4 right-1/2 flex flex-col items-center animate-bounce" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-[#F9B219] w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <img src="/logos/cafe-main.svg" className="w-4 h-4 object-contain" alt="" />
                  </div>
                  <span className="text-[9px] font-extrabold bg-black/90 px-2 py-0.5 rounded border border-[#F9B219]/30 mt-1 shadow-md text-[#F9B219] font-display">تاج مود كافيه</span>
                </div>

                <div className="absolute top-1/2 right-1/6 flex items-center gap-1.5 opacity-50">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
                  <span className="text-[8px] text-zinc-500">بنك فلسطين</span>
                </div>
                <div className="absolute bottom-1/3 left-1/4 flex items-center gap-1.5 opacity-50">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
                  <span className="text-[8px] text-zinc-500">المجلس التشريعي</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-light">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-white" />
                <span>إحداثيات مدينة غزة - الرمال</span>
              </span>
              <span>رقم التوصيل الموحد: 0599000000</span>
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
