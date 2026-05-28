import { Navbar, Footer } from "./Home";

const sections = [
  {
    title: "חומוס",
    emoji: "🥣",
    items: [
      { name: "חומוס רגיל", desc: "חומוס טרי עם שמן זית, פפריקה ופטרוזיליה", price: "₪28" },
      { name: "חומוס עם פול", desc: "חומוס עם פול חם מתובל ושמן זית", price: "₪32" },
      { name: "חומוס מסבחה", desc: "גרגרי חומוס שלמים מעל חומוס טחון עם לימון וכמון", price: "₪34" },
      { name: "חומוס עם ביצה", desc: "חומוס קרמי עם ביצה קשה חצויה", price: "₪30" },
    ],
  },
  {
    title: "פלאפל",
    emoji: "🧆",
    items: [
      { name: "מנת פלאפל", desc: "6 כדורי פלאפל ביתי עם פיתה, חומוס וסלטים", price: "₪38" },
      { name: "פלאפל בפיתה", desc: "פיתה חמה עם פלאפל, ירקות וטחינה", price: "₪22" },
      { name: "פלאפל על חומוס", desc: "כדורי פלאפל על מיטת חומוס טרי", price: "₪40" },
    ],
  },
  {
    title: "סלטים ותוספות",
    emoji: "🫙",
    items: [
      { name: "סלט ירקות קצוץ", desc: "עגבניות, מלפפון, פלפל — תבלונים ביתיים", price: "₪14" },
      { name: "חציל קלוי", desc: "חציל עם שום, לימון ושמן זית", price: "₪16" },
      { name: "חמוצים ביתיים", desc: "כרוב, מלפפון, גזר — כבישה בית", price: "₪12" },
      { name: "טחינה ביתית", desc: "טחינה גולמית עם שום ולימון", price: "₪10" },
    ],
  },
  {
    title: "שתייה",
    emoji: "🥤",
    items: [
      { name: "מיץ לימון טרי", desc: "סחוט במקום", price: "₪12" },
      { name: "קולה / ספרייט / פנטה", desc: "בקבוק 500 מ״ל", price: "₪10" },
      { name: "מים מינרלים", desc: "בקבוק 500 מ״ל", price: "₪7" },
    ],
  },
];

export default function Menu() {
  return (
    <div className="bg-[#1a0a00] min-h-screen font-sans" dir="rtl">
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#f5a623]/7 rounded-full blur-[120px] pointer-events-none" />
        <span className="inline-block text-[#f5a623] text-xs font-semibold tracking-[0.2em] uppercase mb-4">הכל טרי, הכל ביתי</span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">התפריט שלנו</h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto">מוכן מדי יום, עם אהבה ומרכיבים טריים בלבד.</p>
        <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#f5a623]/25 bg-[#f5a623]/8">
          <span className="text-[#f5a623] text-xs font-medium">✓ כשר פרווה · ✓ ללא גלוטן · ✓ בהשגחת רבנות מודיעין</span>
        </div>
      </div>

      {/* Menu sections */}
      <div className="max-w-5xl mx-auto px-6 pb-28 flex flex-col gap-16">
        {sections.map((sec) => (
          <div key={sec.title}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{sec.emoji}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">{sec.title}</h2>
              <div className="flex-1 h-px bg-[#f5a623]/10 mr-3" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sec.items.map((item) => (
                <div key={item.name}
                  className="rounded-2xl border border-white/8 bg-[#2d1200]/50 p-6 flex items-start justify-between gap-4 hover:border-[#f5a623]/25 transition-all duration-200">
                  <div>
                    <div className="text-white font-semibold mb-1">{item.name}</div>
                    <div className="text-white/40 text-sm leading-relaxed">{item.desc}</div>
                  </div>
                  <div className="flex-shrink-0 text-[#f5a623] font-bold text-lg">{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Family meal */}
        <div className="rounded-2xl border border-[#f5a623]/30 bg-gradient-to-br from-[#f5a623]/10 to-[#2d1200] p-8 text-center">
          <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
          <h3 className="text-white font-bold text-2xl mb-3">ארוחה משפחתית</h3>
          <p className="text-white/55 text-base mb-5 max-w-md mx-auto">מגוון מנות חומוס, פלאפל, סלטים ופיתות לכל המשפחה — ב-199 ₪ בלבד!</p>
          <a href="tel:072-3930492"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#f5a623] text-[#1a0a00] font-bold rounded-full hover:bg-[#ffc045] transition-all">
            הזמינו עכשיו: 072-3930492
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
