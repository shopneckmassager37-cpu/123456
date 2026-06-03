import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function useRevealSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-scale')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    )
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return ref
}

const QUICK_ANSWERS = [
  {
    q: 'How much does a project cost?',
    a: 'Every project is different. A simple landing page starts from a few hundred dollars; a full web app or mobile product varies based on scope. Tell me what you need and I\'ll give you an honest quote — no inflated agency pricing.',
  },
  {
    q: 'How quickly can we start?',
    a: "I'm usually available to kick off within a week of our first call. Once we agree on scope and terms, I start immediately. Most projects are live within 1–2 weeks.",
  },
  {
    q: 'What if I only have an idea, no specs?',
    a: "That's the most common starting point. Bring your idea — I'll ask the right questions to define scope, suggest the right approach, and give you a clear picture of what we'd build.",
  },
]

const WAYS_TO_REACH = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    value: 'danielgitlin2011@gmail.com',
    href: 'mailto:danielgitlin2011@gmail.com',
    sub: 'Preferred — reply within 24h',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Availability',
    value: 'Sun – Thu, 09:00 – 21:00 IST',
    href: null,
    sub: 'GMT+3 · Israel Standard Time',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Location',
    value: 'Israel — Remote Worldwide',
    href: null,
    sub: 'Working with clients globally',
  },
]

function ContactPageHero() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] pt-32 pb-10 overflow-hidden" ref={ref}>
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/8 rounded-full blur-[130px]" />
      </div>
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff12 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 mb-8 reveal">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-dot-pulse" />
          <span className="text-green-400 text-xs font-semibold tracking-[0.18em] uppercase">Open for projects</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6 reveal">
          Let's build <span className="gradient-text">together.</span>
        </h1>
        <p className="text-white/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal">
          Got a project in mind? Send a message or drop me an email directly.
          Free consultation, no obligations.
        </p>
      </div>
    </section>
  )
}

function WaysToReach() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-20 overflow-hidden" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {WAYS_TO_REACH.map((w, i) => (
            <div
              key={w.label}
              className={`reveal reveal-d${i + 1} group rounded-2xl border border-white/8 bg-[#111] p-6 hover:border-accent/30 transition-all duration-300`}
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                {w.icon}
              </div>
              <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1">{w.label}</div>
              {w.href ? (
                <a
                  href={w.href}
                  className="block text-white text-sm font-semibold hover:text-accent transition-colors duration-200 mb-1 break-all"
                >
                  {w.value}
                </a>
              ) : (
                <div className="text-white text-sm font-semibold mb-1">{w.value}</div>
              )}
              <div className="text-white/30 text-xs">{w.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuickFAQ() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-24 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Quick Answers</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">
            Before you reach out
          </h2>
        </div>

        <div className="space-y-4">
          {QUICK_ANSWERS.map((item, i) => (
            <div
              key={item.q}
              className={`reveal reveal-d${i + 1} rounded-2xl border border-white/8 bg-[#111] p-7 hover:border-accent/25 transition-colors duration-300`}
            >
              <h3 className="font-display text-base font-bold text-white mb-3">{item.q}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <p className="text-white/35 text-sm">
            More questions?{' '}
            <Link to="/about" className="text-accent hover:text-white transition-colors duration-200 font-medium">
              Check the full FAQ →
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default function ContactPage() {
  return (
    <>
      <ContactPageHero />
      <WaysToReach />
      <Contact />
      <QuickFAQ />
      <Footer />
    </>
  )
}
