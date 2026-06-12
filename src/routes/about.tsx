import { createFileRoute, Link } from "@tanstack/react-router";
import { CrownLogo } from "@/components/CrownLogo";
import { ArrowLeft, Instagram, Utensils, Coffee, Award, Heart } from "lucide-react";

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
    <div dir="rtl" className="theme-restaurant min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[color:var(--color-background)]/80 border-b border-[color:var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-[color:var(--color-muted-foreground)] hover:text-[color:var(--color-foreground)] transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">الرئيسية</span>
          </Link>
          <div className="flex items-center gap-2">
            <CrownLogo size={28} className="text-[color:var(--color-accent)]" />
            <span className="font-bold text-[color:var(--color-foreground)]">مجموعة التاج</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-hero">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <div className="crown-divider mb-4 max-w-xs mx-auto text-xs tracking-widest">ABOUT US</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[color:var(--color-foreground)]">
            قصة <span className="text-[color:var(--color-accent)]">التاج</span>
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            منذ البداية، كانت رؤيتنا واضحة: أن نقدم تجربة طعام لا تُنسى تجمع بين الأصالة والفخامة. 
            اليوم، مجموعة التاج تفخر بفرعيها: مطعم التاج وتاج مود كافيه.
          </p>
        </div>
      </section>

      {/* Story */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[color:var(--color-foreground)]">بداية مميزة</h2>
            <p className="text-[color:var(--color-muted-foreground)] leading-relaxed text-sm">
              انطلقت مجموعة التاج برؤية بسيطة: تقديم أجود المأكولات والمشروبات في أجواء تليق بعملائنا.
              بدأنا بمطعم التاج لنقدم نكهات أصيلة من الشاورما والمشاوي، ثم أضفنا تاج مود كافيه لمحبي القهوة المختصة والحلويات.
            </p>
            <p className="text-[color:var(--color-muted-foreground)] leading-relaxed text-sm">
              كل صنف نقدمه يحمل بصمتنا الخاصة، من اختيار المكونات الطازجة إلى التقديم بأناقة.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[color:var(--color-border)] shadow-glow">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c1?q=80&w=800&auto=format&fit=crop"
              alt="مطعم التاج"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { icon: Award, title: "جودة عالية", desc: "مكونات طازجة يومياً" },
            { icon: Heart, title: "من القلب", desc: "نحضر كل صنف بحب وعناية" },
            { icon: Utensils, title: "نكهات أصيلة", desc: "وصفات تقليدية بإبداع حديث" },
            { icon: Coffee, title: "أجواء فاخرة", desc: "تجربة تليق بذائقتكم" },
          ].map((val, i) => (
            <div
              key={i}
              className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 shadow-glow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[color:var(--color-accent)]/10 text-[color:var(--color-accent)] mb-4">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[color:var(--color-foreground)] mb-1">{val.title}</h3>
              <p className="text-xs text-[color:var(--color-muted-foreground)]">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Branches */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link to="/restaurant" className="group block relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] shadow-glow">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop"
                alt="مطعم التاج"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-5">
              <h3 className="text-xl font-bold text-white mb-1">مطعم التاج</h3>
              <p className="text-white/70 text-sm">شاورما • مشاوي • ساندوتشات • بيتزا</p>
            </div>
          </Link>

          <Link to="/cafe" className="group block relative overflow-hidden rounded-2xl border border-[color:var(--color-border)] shadow-glow">
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
                alt="تاج مود كافيه"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 right-0 left-0 p-5">
              <h3 className="text-xl font-bold text-white mb-1">تاج مود كافيه</h3>
              <p className="text-white/70 text-sm">قهوة مختصة • حلويات • ميلك شيك • موهيتو</p>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[color:var(--color-border)]">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-[color:var(--color-muted-foreground)]">
          <div className="flex justify-center items-center gap-2 mb-2">
            <CrownLogo size={22} className="text-[color:var(--color-accent)]" />
            <span className="font-bold text-[color:var(--color-foreground)]">مجموعة التاج</span>
          </div>
          <p>
            تابعنا على إنستغرام:{" "}
            <a className="text-[color:var(--color-accent)] hover:underline" href="https://instagram.com/altaj_rest" target="_blank" rel="noreferrer">@altaj_rest</a>
            {" | "}
            <a className="text-[color:var(--color-accent)] hover:underline" href="https://instagram.com/tajmood_cafe" target="_blank" rel="noreferrer">@tajmood_cafe</a>
          </p>
          <p className="mt-1 opacity-70">© {new Date().getFullYear()} جميع الحقوق محفوظة</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs">
            <Link to="/about" className="hover:text-[color:var(--color-foreground)] transition">من نحن</Link>
            <Link to="/contact" className="hover:text-[color:var(--color-foreground)] transition">تواصل معنا</Link>
            <Link to="/branch" className="hover:text-[color:var(--color-foreground)] transition">موقع الفرع</Link>
            <Link to="/admin" className="hover:text-[color:var(--color-foreground)] transition">لوحة التحكم</Link>
            <Link to="/" className="hover:text-[color:var(--color-foreground)] transition">الفروع</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
