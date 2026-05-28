import { Navbar, Footer } from "./Home";

export default function About() {
  return (
    <div className="bg-[#1a0a00] min-h-screen font-sans" dir="rtl">
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#f5a623]/7 rounded-full blur-[120px] pointer-events-none" />
        <span className="inline-block text-[#f5a623] text-xs font-semibold tracking-[0.2em] uppercase mb-4">הסיפור שלנו</span>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">אודות לבלבי</h1>
        <p className="text-white/40 text-lg max-w-xl mx-auto">לא רק חומוסייה. בית אוכל שנבנה על אהבה, מסורת ומרכיבים טריים.</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-28">

        {/* Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-white mb-5">מתל אביב למודיעין — סיפור משפחתי</h2>
            <div className="flex flex-col gap-4 text-white/55 text-base leading-relaxed">
              <p>
                עומר, הבעלים של חומוס לבלבי, גדל על ריח החומוס והפלאפל. אביו הקים פלאפלייה-חומוסייה בתל אביב שנים רבות לפני כן — וכשעומר ירש את הידע, הוא ידע בדיוק מה לעשות איתו.
              </p>
              <p>
                במשך תשע שנים, לבלבי פעלה בתל אביב ובנתה לעצמה קהל נאמן שחזר שוב ושוב. הטעם לא השתנה, המתכון נשמר — ועכשיו הוא הגיע למודיעין.
              </p>
              <p>
                עומר מכין בעצמו, מדי יום, את החומוס והפלאפל — בלי קיצורי דרך, בלי מוצרים מוכנים מראש. כי כשאתה אוהב את מה שאתה עושה, זה מרגישים בצלחת.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-[#f5a623]/20 bg-[#2d1200] p-10 text-center">
            <div className="text-7xl mb-5">🧆</div>
            <div className="text-[#f5a623] font-bold text-2xl mb-2">עומר</div>
            <div className="text-white/45 text-sm">בעלים ושף ראשי<br />חומוס לבלבי מודיעין</div>
            <div className="mt-5 pt-5 border-t border-white/8 text-white/30 text-xs italic">
              "אני מכין כל יום את מה שהייתי רוצה לאכול בעצמי."
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">מה מייחד אותנו</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { emoji: "🌿", title: "טרי בלבד", desc: "אין פה כלום מאתמול. החומוס, הפלאפל, הסלטים — הכל מוכן היום, בבוקר." },
              { emoji: "✡️", title: "כשר פרווה", desc: "בהשגחת רבנות מודיעין. כשרות מהדרין שאפשר לסמוך עליה." },
              { emoji: "🌾", title: "ללא גלוטן", desc: "החומוס והפלאפל מיוצרים ללא גלוטן — בטוח גם לרגישים." },
            ].map((v) => (
              <div key={v.title}
                className="rounded-2xl border border-[#f5a623]/15 bg-[#2d1200]/50 p-7 text-center hover:border-[#f5a623]/30 transition-all">
                <div className="text-4xl mb-4">{v.emoji}</div>
                <h3 className="text-white font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-10 text-center">הציר הזמן שלנו</h2>
          <div className="flex flex-col gap-0 relative">
            <div className="absolute right-[19px] top-0 bottom-0 w-px bg-[#f5a623]/15" />
            {[
              { year: "אבא", event: "פלאפלייה בתל אביב — המתכון המקורי נולד" },
              { year: "2015", event: "עומר פותח את לבלבי בתל אביב, ומביא את המתכון שלם" },
              { year: "2024", event: "חומוס לבלבי מגיע למודיעין — מרכז קייזר, קומה עליונה" },
              { year: "היום", event: "מגישים מדי יום לאלפי לקוחות מרוצים במודיעין והסביבה" },
            ].map((item) => (
              <div key={item.year} className="flex gap-6 items-start pb-10 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f5a623]/15 border border-[#f5a623]/30 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-[#f5a623]" />
                </div>
                <div className="pt-2">
                  <div className="text-[#f5a623] font-bold text-sm mb-1">{item.year}</div>
                  <div className="text-white/60 text-base">{item.event}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
