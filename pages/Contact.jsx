import { Navbar, Footer } from "./Home";

export default function Contact() {
  return (
    <div className="bg-[#1a0a00] min-h-screen font-sans" dir="rtl">
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f5a623]/7 rounded-full blur-[120px] pointer-events-none" />
        <span className="inline-block text-[#f5a623] text-xs font-semibold tracking-[0.2em] uppercase mb-4">מידע ויצירת קשר</span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">איך מוצאים אותנו</h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto">מרכז קייזר סנטר, קומה עליונה — מחכים לכם!</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Info cards */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "📍",
                title: "כתובת",
                lines: ["עמק זבולון 24", "מרכז קייזר סנטר, קומה עליונה", "מודיעין מכבים רעות"],
                action: { label: "פתחו בווייז", href: "https://waze.com/ul?q=חומוס+לבלבי+מודיעין" },
              },
              {
                icon: "⏰",
                title: "שעות פתיחה",
                lines: ["ראשון–חמישי: 11:00–19:30", "שישי: 10:00–15:00", "שבת: סגור"],
              },
              {
                icon: "📞",
                title: "טלפון",
                lines: ["072-3930492"],
                action: { label: "התקשרו עכשיו", href: "tel:072-3930492" },
              },
              {
                icon: "🚗",
                title: "חנייה",
                lines: ["חנייה חינם בחניון מרכז קייזר", "כניסה מהצד הדרומי של רחוב עמק זבולון"],
              },
            ].map((card) => (
              <div key={card.title}
                className="rounded-2xl border border-white/8 bg-[#2d1200]/50 p-7 hover:border-[#f5a623]/25 transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{card.icon}</div>
                  <div className="flex-1">
                    <div className="text-[#f5a623] font-bold text-sm mb-2">{card.title}</div>
                    {card.lines.map((l) => (
                      <div key={l} className="text-white/65 text-sm mb-0.5">{l}</div>
                    ))}
                    {card.action && (
                      <a href={card.action.href} target="_blank" rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs px-4 py-1.5 rounded-full bg-[#f5a623]/15 text-[#f5a623] border border-[#f5a623]/25 hover:bg-[#f5a623]/25 transition-all">
                        {card.action.label} ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social + Order */}
          <div className="flex flex-col gap-5">
            {/* Map placeholder */}
            <div className="rounded-2xl border border-[#f5a623]/15 bg-[#2d1200]/60 overflow-hidden h-48 flex items-center justify-center">
              <a href="https://waze.com/ul?q=חומוס+לבלבי+מודיעין" target="_blank" rel="noopener noreferrer"
                className="text-center flex flex-col items-center gap-3 text-white/40 hover:text-white/70 transition-colors">
                <span className="text-5xl">🗺️</span>
                <span className="text-sm">פתחו במפות</span>
              </a>
            </div>

            {/* Wolt */}
            <div className="rounded-2xl border border-[#f5a623]/20 bg-gradient-to-br from-[#f5a623]/10 to-[#2d1200] p-7 text-center">
              <div className="text-4xl mb-3">🛵</div>
              <h3 className="text-white font-bold text-xl mb-2">הזמינו משלוח</h3>
              <p className="text-white/45 text-sm mb-5">חומוס טרי עד הבית — דרך וולט</p>
              <a href="https://wolt.com/he/isr/modiin/restaurant/hummus-lablabi" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#f5a623] text-[#1a0a00] font-bold rounded-full hover:bg-[#ffc045] transition-all">
                הזמינו דרך וולט ←
              </a>
            </div>

            {/* Social */}
            <div className="rounded-2xl border border-white/8 bg-[#2d1200]/50 p-7">
              <h3 className="text-white font-bold text-base mb-4">עקבו אחרינו</h3>
              <div className="flex gap-3">
                <a href="https://www.facebook.com/humuslablabi" target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 text-sm text-center hover:border-[#f5a623]/30 hover:text-[#f5a623] transition-all">
                  📘 Facebook
                </a>
                <a href="https://www.instagram.com/hummus_lablabi/" target="_blank" rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 text-sm text-center hover:border-[#f5a623]/30 hover:text-[#f5a623] transition-all">
                  📸 Instagram
                </a>
              </div>
            </div>

            {/* Kosher badge */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 flex items-center gap-4">
              <span className="text-3xl">✡️</span>
              <div>
                <div className="text-white font-semibold text-sm">כשר פרווה</div>
                <div className="text-white/40 text-xs mt-0.5">בהשגחת רבנות מודיעין | ללא גלוטן</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
