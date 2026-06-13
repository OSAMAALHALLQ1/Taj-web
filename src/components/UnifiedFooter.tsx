import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin, Mail, Globe, ArrowLeft } from "lucide-react";

export function UnifiedFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-black/45 backdrop-blur-xl text-zinc-400 py-16 font-arabic overflow-hidden">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#D4AF37]/5 blur-[100px]" />
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-[#C97B63]/5 blur-[100px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-5 text-right">
            <Link to="/" className="inline-flex items-center gap-3">
              <img 
                src="/logos/taj-group.png" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" 
                alt="Taj Group" 
              />
              <div className="text-right leading-tight">
                <span className="font-extrabold text-white text-lg tracking-wide font-display">مجموعة التاج</span>
                <p className="text-[9px] text-zinc-500 tracking-[0.2em] font-mono">AL TAJ GROUP</p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400 font-light max-w-sm">
              مجموعة التاج الفاخرة تقدم لكم أرقى تجارب الضيافة والمذاق الملوكي الأصيل عبر مطعم التاج للأكلات الشرقية والغربية وتاج مود كافيه للقهوة المختصة والحلويات الفاخرة في قطاع غزة.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-4 text-right">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display relative pb-2 w-max after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-[#D4AF37]">
              روابط سريعة
            </h4>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link to="/" className="hover:text-white transition flex items-center gap-1.5 justify-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition flex items-center gap-1.5 justify-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition" />
                  <span>من نحن</span>
                </Link>
              </li>
              <li>
                <Link to="/branch" className="hover:text-white transition flex items-center gap-1.5 justify-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition" />
                  <span>موقع الفروع</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition flex items-center gap-1.5 justify-start group">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover:bg-[#D4AF37] transition" />
                  <span>تواصل معنا</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="md:col-span-3 space-y-4 text-right">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display relative pb-2 w-max after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-[#D4AF37]">
              معلومات الاتصال
            </h4>
            <ul className="space-y-3 text-xs font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
                <span className="leading-relaxed">غزة، الرمال، شارع اليرموك (شرق مفترق الزهارنة - عمارة التاج هوم 1)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                <div className="flex flex-col gap-0.5">
                  <span>جوال: <a href="tel:0593104000" className="hover:text-white transition font-mono font-medium">059-310-4000</a></span>
                  <span>وطنية: <a href="tel:0566914914" className="hover:text-white transition font-mono font-medium">056-691-4914</a></span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4.5 h-4.5 text-[#D4AF37] shrink-0" />
                <a href="mailto:tajres2020@gmail.com" className="hover:text-white transition font-mono">
                  tajres2020@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Channels */}
          <div className="md:col-span-2 space-y-4 text-right">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-display relative pb-2 w-max after:absolute after:bottom-0 after:right-0 after:w-8 after:h-0.5 after:bg-[#D4AF37]">
              تابعونا
            </h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <a 
                href="https://instagram.com/altaj_rest" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Instagram className="w-4 h-4 text-[#D4AF37]" />
                <span>مطعم التاج</span>
              </a>
              <a 
                href="https://instagram.com/tajmood_cafe" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Instagram className="w-4 h-4 text-[#C97B63]" />
                <span>تاج مود كافيه</span>
              </a>
              <a 
                href="https://www.facebook.com/altajRest/?locale=br_FR" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Facebook className="w-4 h-4 text-blue-500" />
                <span>فيسبوك</span>
              </a>
              <a 
                href="https://www.tiktok.com/@tajrest" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 hover:text-white transition"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-[#ff0050]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                <span>تيك توك</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <p className="text-[10px] font-light text-zinc-500">
            © {currentYear} مجموعة التاج الفاخرة. جميع الحقوق محفوظة. تم التطوير والتحسين بكل حب.
          </p>
          <div className="flex gap-4 text-[10px]">
            <Link to="/restaurant" className="hover:text-white transition text-[#D4AF37] font-bold">منيو المطعم</Link>
            <span className="text-zinc-700">|</span>
            <Link to="/cafe" className="hover:text-white transition text-[#C97B63] font-bold">منيو الكافيه</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}