import { createFileRoute, Link } from "@tanstack/react-router";
import { CrownLogo } from "@/components/CrownLogo";
import { ArrowLeft, Phone, MapPin, Clock, Instagram, MessageCircle } from "lucide-react";

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
  const branches = [
    {
      name: "مطعم التاج",
      phone: "970590000001",
      phoneDisplay: "059-000-0001",
      instagram: "altaj_rest",
      address: "غزة — الرمال",
      hours: "١١ ص — ١٢ ص",
      whatsapp: "970590000001",
    },
    {
      name: "تاج مود كافيه",
      phone: "970590000002",
      phoneDisplay: "059-000-0002",
      instagram: "tajmood_cafe",
      address: "غزة — الرمال",
      hours: "4 ص — 12 ص",
      whatsapp: "970590000002",
    },
  ];

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
          <div className="crown-divider mb-4 max-w-xs mx-auto text-xs tracking-widest">CONTACT</div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[color:var(--color-foreground)]">
            تواصل مع <span className="text-[color:var(--color-accent)]">التاج</span>
          </h1>
          <p className="mt-4 text-[color:var(--color-muted-foreground)] max-w-xl mx-auto text-sm md:text-base">
            نحن هنا لخدمتكم. تواصلوا مع أي من فروعنا عبر الواتساب أو الهاتف.
          </p>
        </div>
      </section>

      {/* Branches */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {branches.map((b) => (
            <div
              key={b.name}
              className="bg-[color:var(--color-card)] border border-[color:var(--color-border)] rounded-2xl p-6 shadow-glow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-accent)]/10 flex items-center justify-center text-[color:var(--color-accent)]">
                  <CrownLogo size={24} />
                </div>
                <h2 className="text-xl font-bold text-[color:var(--color-foreground)]">{b.name}</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 text-[color:var(--color-muted-foreground)]">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[color:var(--color-accent)]" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[color:var(--color-muted-foreground)]">
                  <Phone className="w-4 h-4 shrink-0 text-[color:var(--color-accent)]" />
                  <a href={`tel:${b.phone}`} className="hover:text-[color:var(--color-foreground)] transition">{b.phoneDisplay}</a>
                </div>
                <div className="flex items-center gap-3 text-[color:var(--color-muted-foreground)]">
                  <Clock className="w-4 h-4 shrink-0 text-[color:var(--color-accent)]" />
                  <span>{b.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-[color:var(--color-muted-foreground)]">
                  <Instagram className="w-4 h-4 shrink-0 text-[color:var(--color-accent)]" />
                  <a href={`https://instagram.com/${b.instagram}`} target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-foreground)] transition">
                    @{b.instagram}
                  </a>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href={`https://wa.me/${b.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتساب
                </a>
                <a
                  href={`tel:${b.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[color:var(--color-primary)] text-[color:var(--color-primary-foreground)] py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
                >
                  <Phone className="w-4 h-4" />
                  اتصال
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="text-center">
          <h3 className="text-lg font-bold text-[color:var(--color-foreground)] mb-4">تابعونا</h3>
          <div className="flex justify-center gap-4">
            <a
              href="https://instagram.com/altaj_rest"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--color-card)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] hover:border-[color:var(--color-accent)] transition"
            >
              <Instagram className="w-4 h-4 text-[color:var(--color-accent)]" />
              @altaj_rest
            </a>
            <a
              href="https://instagram.com/tajmood_cafe"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[color:var(--color-card)] border border-[color:var(--color-border)] text-[color:var(--color-foreground)] hover:border-[color:var(--color-accent)] transition"
            >
              <Instagram className="w-4 h-4 text-[color:var(--color-accent)]" />
              @tajmood_cafe
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[color:var(--color-border)] mt-10">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-[color:var(--color-muted-foreground)]">
          <div className="flex justify-center items-center gap-2 mb-2">
            <CrownLogo size={22} className="text-[color:var(--color-accent)]" />
            <span className="font-bold text-[color:var(--color-foreground)]">مجموعة التاج</span>
          </div>
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
