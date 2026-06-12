import { createFileRoute, Link } from "@tanstack/react-router";
import restaurantHero from "@/assets/restaurant-hero.jpg";
import cafeHero from "@/assets/cafe-hero.jpg";

import { Instagram, MapPin, Sparkles, UtensilsCrossed, Coffee } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "التاج | مطعم وكافيه — اختر الفرع" },
      { name: "description", content: "منيو إلكتروني فاخر لمطعم التاج وتاج مود كافيه. اختر فرعك واستمتع بتجربة مميزة." },
      { property: "og:title", content: "التاج | مطعم وكافيه" },
      { property: "og:description", content: "منيو إلكتروني فاخر لمطعم التاج وتاج مود كافيه." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div dir="rtl" className="landing-luxury min-h-screen bg-black text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-[1] premium-noise" />
      <div className="pointer-events-none absolute -top-24 right-1/2 h-80 w-80 rounded-full bg-[#D4AF37]/20 blur-[100px] animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-28 -left-16 h-96 w-96 rounded-full bg-[#7A1221]/35 blur-[110px] animate-float-slow animation-delay-700" />
      <div className="pointer-events-none absolute inset-x-0 top-28 z-[2] mx-auto hidden h-px max-w-4xl bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-transparent md:block" />
      {/* Top brand */}
      <header className="absolute top-0 inset-x-0 z-20 px-6 py-5 flex items-center justify-center">
        <div className="brand-pill flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-5 py-3 shadow-2xl backdrop-blur-xl">
          <img src="/logos/taj-group.png" className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" alt="Taj Group" />
          <div className="text-center leading-tight">
            <div className="text-2xl font-extrabold tracking-wide">التاج</div>
            <div className="text-[11px] text-white/60 tracking-[0.3em]">AL TAJ GROUP</div>
          </div>
        </div>
      </header>

      {/* Centered title for mobile */}
      <div className="md:hidden relative z-10 pt-28 pb-6 text-center px-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/25 bg-white/10 px-4 py-2 text-xs text-[#F7E7A0] backdrop-blur-xl">
          <Sparkles className="h-3.5 w-3.5" />
          أهلاً بك — اختر وجهتك
        </div>
      </div>

      <div className="grid md:grid-cols-2 min-h-screen">
        {/* Restaurant side */}
        <BranchHalf
          href="/restaurant"
          image={restaurantHero}
          title="مطعم التاج"
          subtitle="أشهى الأكل الشرقي والغربي"
          accent="#D4AF37"
          overlayFrom="rgba(80,0,16,0.55)"
          overlayTo="rgba(0,0,0,0.85)"
          ctaLabel="ابدأ تجربة المطعم"
          instagram="altaj_rest"
          icon="restaurant"
        />

        {/* Cafe side */}
        <BranchHalf
          href="/cafe"
          image={cafeHero}
          title="تاج مود كافيه"
          subtitle="تاج مود .. لكل مود😍 بار - كافي - جلسات هادئة"
          accent="#C97B63"
          overlayFrom="rgba(255, 220, 200, 0.25)"
          overlayTo="rgba(80, 40, 30, 0.7)"
          ctaLabel="ابدأ تجربة الكافيه"
          instagram="tajmood_cafe"
          icon="cafe"
          light
        />
      </div>

      {/* Divider crown center on desktop */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-10">
        <div className="bg-black border border-[#D4AF37]/40 rounded-full p-4 shadow-2xl">
          <img src="/logos/taj-group.png" className="w-14 h-14 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" alt="Taj Group" />
        </div>
      </div>

      {/* Bottom nav links */}
      <div className="absolute bottom-0 inset-x-0 z-20 px-6 py-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65 backdrop-blur-sm">
        <Link to="/about" className="hover:text-[#D4AF37] transition">من نحن</Link>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <Link to="/branch" className="hover:text-[#D4AF37] transition">موقع الفرع</Link>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <Link to="/contact" className="hover:text-[#D4AF37] transition">تواصل معنا</Link>
        <span className="w-1 h-1 rounded-full bg-white/30" />
        <Link to="/admin" className="hover:text-[#D4AF37] transition">لوحة التحكم</Link>
      </div>
    </div>
  );
}

function BranchHalf({
  href, image, title, subtitle, accent, overlayFrom, overlayTo, ctaLabel, instagram, icon, light,
}: {
  href: "/restaurant" | "/cafe";
  image: string;
  title: string;
  subtitle: string;
  accent: string;
  overlayFrom: string;
  overlayTo: string;
  ctaLabel: string;
  instagram: string;
  icon: "restaurant" | "cafe";
  light?: boolean;
}) {
  return (
    <Link
      to={href}
      className="group branch-panel relative flex items-center justify-center min-h-[60vh] md:min-h-screen overflow-hidden"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-110"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, ${overlayFrom}, ${overlayTo})` }}
      />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 50% 48%, ${accent}35, transparent 38%)` }} />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,.12)_45%,transparent_60%)] opacity-0 translate-x-full transition-all duration-1000 group-hover:opacity-100 group-hover:-translate-x-full" />
      <div className="relative z-10 text-center px-6 py-10 max-w-md animate-fade-up flex flex-col items-center">
        <div className="mb-6 inline-flex items-center justify-center rounded-[2.5rem] border bg-black/40 p-5 shadow-[0_0_50px_rgba(255,255,255,.15)] backdrop-blur-md transition-transform duration-500 group-hover:scale-110" style={{ borderColor: accent + "80" }}>
          <img 
            src={icon === "restaurant" ? "/logos/rest-main.svg" : "/logos/cafe-main.svg"} 
            alt={title} 
            className="w-28 h-28 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]" 
          />
        </div>
        <h2
          className="text-4xl md:text-5xl font-extrabold mb-2"
          style={{ color: light ? "#fff" : "#fff", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          {title}
        </h2>
        <p className="text-white/85 mb-6 text-sm md:text-base">{subtitle}</p>
        <div className="mb-6 flex items-center justify-center gap-3 text-[11px] text-white/70">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">صور حقيقية</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">طلب واتساب</span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 backdrop-blur">تحديث مباشر</span>
        </div>
        <span
          className="premium-cta inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all group-hover:gap-4 group-hover:scale-105"
          style={{ background: accent, color: "#0a0a0a" }}
        >
          {ctaLabel}
          <span>←</span>
        </span>
        <div className="mt-6 flex items-center justify-center gap-4 text-white/70 text-xs">
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 hover:text-white"
          >
            <Instagram className="w-3.5 h-3.5" /> @{instagram}
          </a>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> فرع رئيسي
          </span>
        </div>
      </div>
    </Link>
  );
}

