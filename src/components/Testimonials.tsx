const testimonials = [
  {
    name: 'Yael Cohen',
    role: 'Founder, Chefaleh',
    avatar: 'YC',
    text: 'Daniel delivered a website that completely transformed how our clients see us. The design is stunning and it actually converts. Best investment we made.',
  },
  {
    name: 'Oren Levi',
    role: 'CEO, TechStart',
    avatar: 'OL',
    text: 'Fast, reliable, and communicates like a pro. Daniel built our MVP in 3 weeks and we launched on time. Would work with him again without hesitation.',
  },
  {
    name: 'Maya Shapiro',
    role: 'Product Manager, Nexus',
    avatar: 'MS',
    text: 'What sets Daniel apart is that he thinks like a product person, not just a developer. He caught UX issues before we even noticed them.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Client Love
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            What People Say
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            Don't take my word for it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border border-white/8 bg-surface p-8 flex flex-col gap-6 hover:border-accent/25 transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="text-accent/20 font-display text-6xl font-bold leading-none select-none">"</div>

              <p className="text-white/60 text-sm leading-relaxed -mt-4">{t.text}</p>

              <div className="flex items-center gap-3 mt-auto pt-5 border-t border-white/6">
                <div className="w-9 h-9 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center text-accent text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">{t.name}</div>
                  <div className="text-white/35 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
