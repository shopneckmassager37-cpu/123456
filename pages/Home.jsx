import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { label: "בית", to: "/" },
  { label: "תפריט", to: "/menu" },
  { label: "אודות", to: "/about" },
  { label: "ביקורות", to: "/reviews" },
  { label: "צור קשר", to: "/contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled || open ? "bg-[#1a0a00]/95 backdrop-blur-xl border-b border-[#c8860a]/20 shadow-lg" : "bg-transparent"}`} dir="rtl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#f5a623] to-[#c8860a] flex items-center justify-center text-xl shadow-[0_0_20px_rgba(245,166,35,0.4)]">
              🧆
            </div>
            <div>
              <div className="font-bold text-white text-lg leading-tight tracking-wide">חומוס לבלבי</div>
              <div className="text-[#f5a623] text-xs font-medium">מודיעין</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, to }) => (
              <Link key={to} to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === to ? "bg-[#f5a623]/15 text-[#f5a623]" : "text-white/70 hover:text-white hover:bg-white/5"}`}>
                {label}
              </Link>
            ))}
            <a href="tel:072-3930492"
              className="mr-3 px-5 py-2 bg-[#f5a623] text-[#1a0a00] text-sm font-bold rounded-full hover:bg-[#ffc045] hover:shadow-[0_0_20px_rgba(245,166,35,0.5)] active:scale-95 transition-all duration-200">
              072-3930492
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]">
            <span className={`block w-5 h-[2px] bg-white rounded transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white rounded transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[2px] bg-white rounded transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-[#1a0a00]/98 flex flex-col justify-center items-center gap-4 md:hidden" dir="rtl">
          {NAV.map(({ label, to }) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}
              className="text-3xl font-bold text-white/80 hover:text-[#f5a623] transition-colors py-2">
              {label}
            </Link>
          ))}
          <a href="tel:072-3930492" className="mt-4 px-8 py-3 bg-[#f5a623] text-[#1a0a00] font-bold text-lg rounded-full">
            התקשרו עכשיו
          </a>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1a0a00]">
      {/* BG gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0a00] via-[#2d1200] to-[#1a0a00]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#f5a623]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#c8860a]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Dots pattern */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, #f5a62320 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" dir="rtl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#f5a623]/30 bg-[#f5a623]/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" />
          <span className="text-[#f5a623] text-xs font-semibold tracking-widest">כשר פרווה · ללא גלוטן · מרכז קייזר מודיעין</span>
        </div>

        <h1 className="font-bold leading-tight mb-6">
          <span className="block text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2">חומוס לבלבי</span>
          <span className="block text-[#f5a623] text-3xl sm:text-4xl md:text-5xl">הטעם האמיתי של פעם</span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          חומוס טרי שמוכן מדי יום, פלאפל פריך, וסלטים ביתיים —<br />
          מתכון משפחתי שעבר דורות, מוגש באהבה אמיתית.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/menu"
            className="w-full sm:w-auto px-8 py-4 bg-[#f5a623] text-[#1a0a00] font-bold text-base rounded-full hover:bg-[#ffc045] hover:shadow-[0_0_32px_rgba(245,166,35,0.5)] active:scale-95 transition-all duration-200">
            לתפריט המלא ←
          </Link>
          <Link to="/contact"
            className="w-full sm:w-auto px-8 py-4 border border-white/15 text-white font-medium text-base rounded-full hover:border-[#f5a623]/40 hover:bg-white/5 transition-all duration-200">
            איך מגיעים?
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 flex items-center justify-center gap-12 sm:gap-20">
          {[
            { v: "9+", l: "שנות ניסיון" },
            { v: "טרי", l: "כל יום" },
            { v: "ללא\nגלוטן", l: "חומוס ופלאפל" },
          ].map(({ v, l }) => (
            <div key={l} className="text-center">
              <div className="text-[#f5a623] text-2xl sm:text-3xl font-bold whitespace-pre-line leading-tight">{v}</div>
              <div className="text-white/35 text-xs sm:text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    { emoji: "🧆", title: "פלאפל ביתי", desc: "מוכן מדי בוקר מחומוס טרי, פריך מבחוץ ורך מבפנים. המתכון של אבא." },
    { emoji: "🥣", title: "חומוס טרי", desc: "נטחן על הרגע מגרגרים איכותיים. לא מאתמול, לא מקופסה — תמיד טרי." },
    { emoji: "🫙", title: "סלטים ביתיים", desc: "מבחר סלטים שמוכנים כל יום במטבח. תוספות שמשלימות כל מנה." },
    { emoji: "🫓", title: "פיתה חמה", desc: "פיתות טריות שיוצאות ישירות מהתנור ומגיעות אליך חמות." },
  ];

  return (
    <section className="bg-[#1a0a00] py-28 overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#f5a623] text-xs font-semibold tracking-[0.2em] uppercase mb-4 block">מה אנחנו מגישים</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">האוכל שמדברים עליו</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">כל מה שעל הצלחת — עשוי בידיים, מכל הלב.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div key={item.title}
              className="rounded-2xl border border-[#f5a623]/15 bg-[#2d1200]/60 p-7 flex flex-col gap-4 hover:border-[#f5a623]/35 hover:bg-[#2d1200] transition-all duration-300">
              <div className="text-4xl">{item.emoji}</div>
              <h3 className="text-white font-bold text-lg">{item.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-[#2d1200] py-24 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f5a623]/5 via-transparent to-[#f5a623]/5" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">מגיעים לקייזר סנטר? <span className="text-[#f5a623]">עצרו אצלנו.</span></h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">קומה עליונה, מרכז קייזר, מודיעין. פתוחים ראשון עד שישי.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:072-3930492"
            className="px-8 py-4 bg-[#f5a623] text-[#1a0a00] font-bold rounded-full hover:bg-[#ffc045] hover:shadow-[0_0_24px_rgba(245,166,35,0.4)] transition-all">
            📞 072-3930492
          </a>
          <a href="https://wolt.com/he/isr/modiin/restaurant/hummus-lablabi" target="_blank" rel="noopener noreferrer"
            className="px-8 py-4 border border-[#f5a623]/30 text-[#f5a623] font-medium rounded-full hover:bg-[#f5a623]/10 transition-all">
            הזמינו דרך וולט 🛵
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#100500] border-t border-[#f5a623]/10 py-12" dir="rtl">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
        <div>
          <div className="text-white font-bold text-lg mb-1">חומוס לבלבי מודיעין</div>
          <div className="text-white/35 text-sm">עמק זבולון 24, מרכז קייזר, קומה עליונה</div>
        </div>
        <div className="text-white/25 text-sm">
          א׳-ה׳: 11:00-19:30 | שישי: 10:00-15:00<br />
          כשר פרווה · ללא גלוטן · בהשגחת רבנות מודיעין
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.facebook.com/humuslablabi" target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-[#f5a623] transition-colors text-sm">Facebook</a>
          <a href="https://www.instagram.com/hummus_lablabi/" target="_blank" rel="noopener noreferrer"
            className="text-white/30 hover:text-[#f5a623] transition-colors text-sm">Instagram</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-[#1a0a00] min-h-screen font-sans">
      <Navbar />
      <Hero />
      <Highlights />
      <CTA />
      <Footer />
    </div>
  );
}

export { Navbar, Footer };
