import { useState, useEffect, useRef } from 'react'

function useCounter(target: number, running: boolean, duration = 1300) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!running) return
    let startTs = 0
    const step = (ts: number) => {
      if (!startTs) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [running, target, duration])
  return count
}

const STATS = [
  { target: 2,  suffix: '+', label: 'Years Building'    },
  { target: 10, suffix: '+', label: 'Projects Shipped'  },
  { target: 2,  suffix: '',  label: 'Live Products'     },
]

const PARTICLES = [
  { top: '18%', left: '8%',  size: 3, delay: 0,   duration: 5 },
  { top: '35%', left: '92%', size: 2, delay: 1.2, duration: 6 },
  { top: '60%', left: '5%',  size: 2, delay: 2.1, duration: 4.5 },
  { top: '72%', left: '88%', size: 3, delay: 0.7, duration: 5.5 },
  { top: '25%', left: '78%', size: 2, delay: 3,   duration: 7 },
  { top: '50%', left: '15%', size: 2, delay: 1.8, duration: 5 },
  { top: '82%', left: '45%', size: 3, delay: 0.4, duration: 6.5 },
  { top: '12%', left: '55%', size: 2, delay: 2.5, duration: 4 },
]

export default function Hero() {
  const scrollToWork    = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })

  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [statsRunning, setStatsRunning] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setStatsRunning(true); obs.disconnect() }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff14 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Parallax glow — top center */}
      <div
        className="absolute top-0 w-[900px] h-[550px] rounded-full bg-accent/10 blur-[130px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          left: '50%',
          transform: `translate(calc(-50% + ${mouse.x * 35}px), ${mouse.y * 25}px)`,
        }}
      />

      {/* Secondary glow — bottom left */}
      <div
        className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-accent/6 blur-[110px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -15}px)` }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-accent"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: 0.18 + (i % 4) * 0.07,
              animation: `float ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

        {/* Badge */}
        <div
          className="opacity-0-init animate-fade-in animation-delay-100 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-10"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse" />
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
            <span className="gradient-text">real products.</span>
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
            onClick={scrollToContact}
            className="relative w-full sm:w-auto px-8 py-3.5 bg-accent text-[#0A0A0A] text-base font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_40px_rgba(212,168,83,0.5)] active:scale-95 transition-all duration-200 overflow-hidden group"
          >
            <span className="relative z-10">Get In Touch →</span>
            <span className="absolute inset-0 bg-gradient-to-r from-accent-dim to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button
            onClick={scrollToWork}
            className="w-full sm:w-auto px-8 py-3.5 border border-white/12 text-white text-base font-medium rounded-full hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            View My Work
          </button>
        </div>

        {/* Trust row */}
        <div
          className="opacity-0-init animate-fade-up animation-delay-700 mt-8 flex items-center gap-5 text-white/30 text-xs"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-green-400" />
            Free consultation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-accent" />
            Fast turnaround
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-blue-400" />
            Remote-friendly
          </span>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="opacity-0-init animate-fade-up animation-delay-700 mt-16 flex items-center gap-10 sm:gap-16"
          style={{ animationFillMode: 'forwards' }}
        >
          {STATS.map(({ target, suffix, label }) => (
            <StatItem key={label} target={target} suffix={suffix} label={label} running={statsRunning} />
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

function StatItem({ target, suffix, label, running }: { target: number; suffix: string; label: string; running: boolean }) {
  const count = useCounter(target, running)
  return (
    <div className="text-center">
      <div className="font-display text-2xl sm:text-3xl font-bold text-white tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-white/35 text-xs sm:text-sm font-medium mt-1 tracking-wide">{label}</div>
    </div>
  )
}
