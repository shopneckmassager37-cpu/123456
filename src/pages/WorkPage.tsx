import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Work from '../components/Work'
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

const PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Performance first',
    desc: 'Every project is optimised for Lighthouse scores above 90. Fast load times, lazy loading, and minimal bundle sizes — because slow sites lose users.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Premium design',
    desc: "Design isn't decoration — it's conversion. Every product I ship looks intentional, premium, and trustworthy. The kind of quality that makes visitors stay.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Clean, scalable code',
    desc: 'Well-structured, easy to extend, and simple to hand off. Any developer can jump in and understand it immediately — no magic, no mess.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h3" />
      </svg>
    ),
    title: 'Mobile by default',
    desc: 'Every layout is built mobile-first. Tested on real devices across multiple screen sizes — not just resized desktop designs.',
  },
]

function PageHero() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] pt-40 pb-24 overflow-hidden" ref={ref}>
      <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-accent/[0.05] rounded-full blur-[150px]" />
      </div>
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'radial-gradient(circle, #EDEAE310 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 mb-8 reveal">
          <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse" />
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">Portfolio</span>
        </div>
        <h1 className="display-xl font-display font-bold text-cream mb-6 reveal">
          Products I've <span className="gradient-text">Built</span>
        </h1>
        <p className="text-cream/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal">
          Real projects, shipped to production. From concept to launch —
          every product here is live and actively used by real people.
        </p>
      </div>
    </section>
  )
}

function QualityPillars() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Quality</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight mb-4">
            What goes into <br className="hidden sm:block" />every build
          </h2>
          <p className="text-cream/40 text-lg max-w-xl leading-relaxed">
            Every project I ship meets the same high bar — whether it's a landing page or a full web app.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-d${i + 1} group rounded-2xl border border-cream/8 bg-[#111] p-7 flex flex-col gap-5 hover:border-accent/35 hover:bg-accent/4 hover:shadow-[0_0_40px_rgba(212,168,83,0.08)] transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                {p.icon}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-cream mb-2">{p.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkStats() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-24 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-2xl border border-cream/8 bg-[#111] overflow-hidden reveal-scale">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/5">
            {[
              { value: '2+',   label: 'Years of experience',  desc: 'Building for real clients'   },
              { value: '10+',  label: 'Projects shipped',      desc: 'Across web and mobile'       },
              { value: '100%', label: 'Client satisfaction',   desc: 'No project abandoned'        },
              { value: '1–2w', label: 'Average delivery',      desc: 'From kick-off to launch'     },
            ].map(({ value, label, desc }) => (
              <div key={label} className="bg-[#111] px-8 py-10 text-center hover:bg-[#161616] transition-colors duration-200">
                <div className="font-display text-3xl md:text-4xl font-bold text-cream mb-1">{value}</div>
                <div className="text-cream/60 text-sm font-semibold mb-1">{label}</div>
                <div className="text-cream/30 text-xs">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkCTA() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-accent/7 rounded-full blur-[130px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="reveal-scale">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">Your turn</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-cream tracking-tight mb-6 leading-tight">
            Want your product <br />to be <span className="gradient-text">next?</span>
          </h2>
          <p className="text-cream/40 text-lg leading-relaxed max-w-lg mx-auto mb-10">
            I'm open to new projects. Tell me what you're building and let's see if we're a good fit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-10 py-4 bg-accent text-[#0A0A0A] text-base font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_48px_rgba(212,168,83,0.5)] active:scale-95 transition-all duration-200"
            >
              Start a Project →
            </Link>
            <Link
              to="/what-i-do"
              className="w-full sm:w-auto px-10 py-4 border border-cream/12 text-cream text-base font-medium rounded-full hover:border-cream/30 hover:bg-cream/5 active:scale-95 transition-all duration-200"
            >
              See what I build
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function WorkPage() {
  return (
    <>
      <PageHero />
      <Work />
      <QualityPillars />
      <WorkStats />
      <WorkCTA />
      <Footer />
    </>
  )
}
