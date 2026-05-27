export default function Hero() {
  const scrollToWork    = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Subtle dot-grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff12 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Warm amber radial glow — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />

      {/* Secondary glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Badge */}
        <div
          className="opacity-0-init animate-fade-in animation-delay-100 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/8 mb-10"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">
            Available for new projects
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="opacity-0-init animate-fade-up animation-delay-200 font-display font-bold leading-[1.06] tracking-tight mb-6"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="block text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2">
            Hi, I'm Daniel.
          </span>
          <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="text-white">I turn ideas into </span>
            <br className="hidden sm:block" />
            <span className="text-accent">real products.</span>
          </span>
        </h1>

        {/* Sub-headline */}
        <p
          className="opacity-0-init animate-fade-up animation-delay-300 text-white/45 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
          style={{ animationFillMode: 'forwards' }}
        >
          Full-stack web & mobile development — from the first line of code to
          a live, polished product. No shortcuts, no compromises.
        </p>

        {/* CTA buttons */}
        <div
          className="opacity-0-init animate-fade-up animation-delay-500 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          style={{ animationFillMode: 'forwards' }}
        >
          <button
            onClick={scrollToWork}
            className="w-full sm:w-auto px-8 py-3.5 bg-accent text-[#0A0A0A] text-base font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_32px_rgba(212,168,83,0.4)] active:scale-95 transition-all duration-200"
          >
            View My Work
          </button>
          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/12 text-white text-base font-medium rounded-full hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            Get In Touch
          </button>
        </div>

        {/* Stats row */}
        <div
          className="opacity-0-init animate-fade-up animation-delay-700 mt-20 flex items-center gap-10 sm:gap-16"
          style={{ animationFillMode: 'forwards' }}
        >
          {[
            { value: '2+',  label: 'Years Building' },
            { value: '10+', label: 'Projects Shipped' },
            { value: '2',   label: 'Live Products' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">{value}</div>
              <div className="text-white/35 text-xs sm:text-sm font-medium mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/25 text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <svg className="w-4 h-4 text-white/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
