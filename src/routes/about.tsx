import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Award, Heart, Utensils, Coffee, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | مجموعة التاج" },
      { name: "description", content: "تعرف على قصة مطعم التاج وتاج مود كافيه. نكهات أصيلة وأجواء فاخرة منذ البداية." },
      { property: "og:title", content: "من نحن | مجموعة التاج" },
      { property: "og:description", content: "تعرف على قصة مطعم التاج وتاج مود كافيه." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-black text-white font-arabic relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[1] premium-noise" />
      <div className="pointer-events-none absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[120px] animate-float-slow -z-10"></div>
      <div className="pointer-events-none absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-[#C97B63]/10 rounded-full blur-[120px] animate-float-slow -z-10"></div>

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
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#D4AF37]/5 px-4.5 py-1.5 text-[10px] text-[#F7E7A0] backdrop-blur-lg mb-6">
          <Sparkles className="h-3 w-3 text-[#D4AF37]" />
          <span>قصتنا وقيمنا</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight font-display">
          حكاية الفخامة و <span className="bg-gradient-to-l from-[#D4AF37] to-[#F9B219] bg-clip-text text-transparent">الأصالة</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto font-light">
          منذ اللحظة الأولى، وضعنا التميز نُصب أعيننا لتكون مجموعة التاج الخيار الأول لعشاق المذاق الأصيل والأجواء الفاخرة، جامعاً بين عراقة الشرق وحداثة الغرب.
        </p>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6 text-right">
            <div className="w-10 h-1 bg-[#D4AF37] rounded-full"></div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">بدايةٌ كُتبت بالتميز</h2>
            <p className="text-zinc-400 leading-relaxed text-sm font-light">
              انطلقت مجموعة التاج برؤية استثنائية: إعادة تعريف تجربة الطعام والضيافة في غزة. بدأنا بـ 
              <span className="text-white font-medium"> مطعم التاج </span> لنقدم نكهات الشاورما والمشاوي بلمستنا الخاصة، ومن ثم تم تأسيس 
              <span className="text-white font-medium"> تاج مود كافيه </span> لنكون الملاذ المثالي لعشاق القهوة المختصة والحلويات الفاخرة.
            </p>
            <p className="text-zinc-400 leading-relaxed text-sm font-light">
              نحن نؤمن بأن كل وجبة هي تجربة متكاملة، لذلك نحرص على انتقاء أفضل المكونات الطازجة يومياً وتقديمها بطرق مبتكرة تليق بعملائنا وتمنحهم طابعاً ملوكياً فريداً.
            </p>
          </div>
          <div className="relative group aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-75"></div>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c1?q=80&w=800&auto=format&fit=crop"
              alt="أجواء مطعم التاج"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black mb-2 font-display">القيم التي نرتكز عليها</h2>
          <p className="text-xs text-zinc-500 font-light">نلتزم بأعلى معايير الجودة والضيافة لضمان رضاكم الدائم</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Award, title: "جودة ملوكية", desc: "ننتقي أجود المكونات الطازجة واللحوم البلدية يومياً." },
            { icon: Heart, title: "شغف بالتحضير", desc: "نصنع كل طبق وحلوى بحب وشغف وبعناية فائقة." },
            { icon: Utensils, title: "أصالة وإبداع", desc: "نمزج الوصفات الشرقية التقليدية بأساليب تقديم عصرية." },
            { icon: Coffee, title: "ضيافة فاخرة", desc: "نقدم أجواء راقية وتصاميم زجاجية مريحة وممتعة." },
          ].map((val, i) => (
            <div
              key={i}
              className="liquid-glass border border-white/10 rounded-3xl p-6 text-center hover:scale-[1.03] transition-all duration-300 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.03] transition-all"></div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white mb-5 transition-transform duration-300 group-hover:rotate-6 group-hover:border-[#D4AF37]/50">
                <val.icon className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-bold text-sm text-white mb-2 font-display">{val.title}</h3>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-black mb-2 font-display">استكشف فروع مجموعة التاج</h2>
          <p className="text-xs text-zinc-500 font-light">اضغط على الفرع للدخول إلى قائمة الطعام المخصصة له</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Link to="/restaurant" className="group block relative overflow-hidden rounded-3xl border border-white/10 hover:border-[#D4AF37]/40 shadow-2xl transition-all duration-300">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                alt="مطعم التاج"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-6">
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 mb-2 inline-block">فرع المطعم</span>
              <h3 className="text-xl font-bold text-white mb-1 font-display">مطعم التاج</h3>
              <p className="text-white/70 text-xs font-light">مشاوي فاخرة • شاورما على الفحم • ساندوتشات وبيتزا</p>
            </div>
          </Link>

          <Link to="/cafe" className="group block relative overflow-hidden rounded-3xl border border-white/10 hover:border-[#C97B63]/40 shadow-2xl transition-all duration-300">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
                alt="تاج مود كافيه"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-6">
              <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full bg-[#C97B63]/15 text-[#C97B63] border border-[#C97B63]/30 mb-2 inline-block">فرع الكافيه</span>
              <h3 className="text-xl font-bold text-white mb-1 font-display">تاج مود كافيه</h3>
              <p className="text-white/70 text-xs font-light">قهوة مختصة • كريب ووافل • ميلك شيك وموهيتو بارد</p>
            </div>
          </Link>
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
