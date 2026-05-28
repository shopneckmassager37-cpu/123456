export default function Work() {
  return (
    <section id="work" className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-accent/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Products I\'ve Built
          </h2>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            Real projects, shipped to production. From concept to launch.
          </p>
        </div>

        <article className="group relative rounded-2xl border border-accent/20 bg-gradient-to-br from-surface to-[#0A0A0A] overflow-hidden hover:border-accent/35 transition-all duration-500">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/8 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative overflow-hidden bg-s3 w-full" style={{ aspectRatio: '16/8' }}>
            <img
              src="https://media.base44.com/images/public/69c17515a2c757d1070710f1/536b80201_2026-05-27203012.png"
              alt="Chefaleh catering website homepage"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#111]/60 to-transparent flex items-center px-4 gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 flex-1 bg-white/10 rounded-sm h-4 max-w-[280px] flex items-center px-2">
                <span className="text-white/40 text-[9px] font-mono truncate">chefaleh.com</span>
              </span>
            </div>
            <div className="absolute top-10 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm bg-accent/20 text-accent border border-accent/30">
                Web Development
              </span>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="max-w-2xl">
              <h3 className="font-display text-2xl md:text-4xl font-bold text-white mb-3 leading-tight">
                Chefaleh — Miami Catering
              </h3>
              <p className="text-white/50 text-base leading-relaxed mb-6">
                A high-end catering service website built for a Miami-based brand. Warm, premium
                aesthetic with a focus on showcasing the menu, driving bookings, and converting
                high-value clients — built from design to live deployment.
              </p>
              <div className="flex flex-wrap gap-2">
                {[\'React\', \'Tailwind CSS\', \'Luxury Brand\', \'Responsive\', \'Live\'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://www.chefaleh.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_28px_rgba(212,168,83,0.4)] active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                View Live Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
