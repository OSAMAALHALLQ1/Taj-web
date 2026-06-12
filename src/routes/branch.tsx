import { createFileRoute, Link } from "@tanstack/react-router";
import { CrownLogo } from "@/components/CrownLogo";
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, Navigation, Map } from "lucide-react";

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
  const branches = [
    {
      id: "restaurant",
      name: "مطعم التاج",
      tagline: "نكهات أصيلة • مشاوي وشاورما بجودة فاخرة",
      address: "غزة، شارع الرمال، مقابل بنك فلسطين (الفرع الرئيسي)",
      hours: "يومياً: ١١:٠٠ ص — ١٢:٠٠ م",
      phone: "059-000-0001",
      whatsapp: "970590000001",
      accent: "#D4AF37", // Gold
      themeClass: "theme-restaurant bg-card text-white border-border",
      menuLink: "/restaurant",
      instagram: "altaj_rest",
      mapCoords: "31.5167, 34.4500", // Gaza coordinates
    },
    {
      id: "cafe",
      name: "تاج مود كافيه",
      tagline: "قهوة مختصة • حلويات • أجواء دافئة",
      address: "غزة، شارع الرمال، بجوار المجلس التشريعي",
      hours: "يومياً: ٠٤:٠٠ ص — ١٢:٠٠ م",
      phone: "059-000-0002",
      whatsapp: "970590000002",
      accent: "#C97B63", // Rose-Gold
      themeClass: "theme-cafe bg-card text-foreground border-border",
      menuLink: "/cafe",
      instagram: "tajmood_cafe",
      mapCoords: "31.5180, 34.4520",
    }
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-950/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">الرئيسية</span>
          </Link>
          <div className="flex items-center gap-2">
            <CrownLogo size={30} className="text-[#D4AF37]" />
            <span className="font-bold text-lg tracking-wide">مجموعة التاج</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 text-center max-w-3xl mx-auto px-4">
        <div className="crown-divider mb-4 max-w-xs mx-auto text-xs tracking-widest text-[#D4AF37]">LOCATIONS</div>
        <h1 className="text-3xl md:text-5xl font-black mb-4">
          أين تجد فروع <span className="text-[#D4AF37]">التاج</span>؟
        </h1>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
          نهتم دائماً بتقديم أفضل نكهة وأجمل أجواء لعملائنا في غزة. تفضل بزيارة أحد فروعنا بالرمال واستمتع بوجباتك المفضلة أو كوب من القهوة الفاخرة.
        </p>
      </section>

      {/* Grid containing branches details */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          
          {/* Branch Details Cards */}
          <div className="md:col-span-6 space-y-6 flex flex-col justify-between">
            {branches.map((b) => (
              <div 
                key={b.id}
                className={`${b.themeClass} p-6 rounded-3xl border shadow-xl flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 relative overflow-hidden`}
              >
                {/* Decorative subtle border glow */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-2xl pointer-events-none"
                  style={{ backgroundColor: b.accent }}
                ></div>

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span 
                      className="text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                      style={{ backgroundColor: `${b.accent}15`, color: b.accent, border: `1px solid ${b.accent}30` }}
                    >
                      {b.id === "restaurant" ? "مطعم وعائلات" : "كافيه وقهوة مختصة"}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black mb-1 flex items-center gap-2">
                    <CrownLogo size={24} style={{ color: b.accent }} />
                    {b.name}
                  </h2>
                  <p className="text-xs opacity-75 mb-6">{b.tagline}</p>

                  <div className="space-y-4 text-xs md:text-sm font-light">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" style={{ color: b.accent }} />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>{b.hours}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>الهاتف: <a href={`tel:${b.phone.replace(/-/g, "")}`} className="font-bold hover:underline">{b.phone}</a></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 shrink-0" style={{ color: b.accent }} />
                      <span>واتساب: <a href={`https://wa.me/${b.whatsapp}`} target="_blank" rel="noreferrer" className="font-bold hover:underline">{b.phone}</a></span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                  <Link 
                    to={b.menuLink}
                    className="flex-1 text-center font-bold text-xs py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    style={{ backgroundColor: b.accent, color: "#000" }}
                  >
                    <span>استكشف المنيو واطلب</span>
                    <span>←</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Map Visual Representation */}
          <div className="md:col-span-6 bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Map className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="font-bold text-base">الموقع الجغرافي للفروع بالرمال</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                تقع فروع مجموعة التاج في أرقى مناطق مدينة غزة بالرمال، حيث يسهل الوصول إليها والتوصيل السريع لكافة مناطق قطاع غزة عبر أسطول التوصيل الخاص بنا.
              </p>

              {/* Map Graphic mockup */}
              <div className="aspect-[4/3] w-full rounded-2xl border border-white/5 bg-zinc-950 relative overflow-hidden flex items-center justify-center">
                {/* Simulated Grid Road Lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                
                {/* Main simulated road */}
                <div className="absolute h-6 w-full bg-zinc-900/60 top-1/3 -rotate-3 border-y border-white/5 flex items-center justify-center">
                  <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">شارع الرمال الرئيسي</span>
                </div>
                <div className="absolute w-6 h-full bg-zinc-900/60 right-1/4 rotate-6 border-x border-white/5 flex items-center justify-center">
                  <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest rotate-90">مفترق الرمال</span>
                </div>

                {/* Branch Pin 1 (Restaurant) */}
                <div className="absolute top-1/4 right-1/3 flex flex-col items-center animate-bounce">
                  <div className="bg-[#D4AF37] text-black w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <CrownLogo size={16} />
                  </div>
                  <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded border border-white/10 mt-1 shadow-md text-[#D4AF37]">مطعم التاج</span>
                </div>

                {/* Branch Pin 2 (Cafe) */}
                <div className="absolute bottom-1/4 right-1/2 flex flex-col items-center animate-bounce" style={{ animationDelay: "0.2s" }}>
                  <div className="bg-[#C97B63] text-white w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                    <CrownLogo size={16} />
                  </div>
                  <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded border border-white/10 mt-1 shadow-md text-[#C97B63]">تاج مود كافيه</span>
                </div>

                {/* Other simulated landmark pin */}
                <div className="absolute top-1/2 right-1/6 flex items-center gap-1.5 opacity-65">
                  <div className="w-2.5 h-2.5 bg-zinc-500 rounded-full"></div>
                  <span className="text-[9px] text-zinc-400">بنك فلسطين</span>
                </div>
                <div className="absolute bottom-1/3 left-1/4 flex items-center gap-1.5 opacity-65">
                  <div className="w-2.5 h-2.5 bg-zinc-500 rounded-full"></div>
                  <span className="text-[9px] text-zinc-400">المجلس التشريعي</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>إحداثيات غزة، الرمال</span>
              </span>
              <span>رقم التوصيل الموحد: *5555</span>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
          <div className="flex justify-center items-center gap-2 mb-2">
            <CrownLogo size={22} className="text-[#D4AF37]" />
            <span className="font-bold text-white">مجموعة التاج</span>
          </div>
          <p className="mt-1 opacity-70">© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة التاج</p>
        </div>
      </footer>
    </div>
  );
}

