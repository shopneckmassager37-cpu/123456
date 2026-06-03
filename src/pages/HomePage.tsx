import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Footer from '../components/Footer'

const CHEFALEH_URL = 'https://media.base44.com/images/public/69c17515a2c757d1070710f1/536b80201_2026-05-27203012.png'
const EQ_URL       = 'https://image.thum.io/get/width/1280/crop/720/https://eqcounselingtesting.vercel.app/'

const SERVICES_PREVIEW = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Websites & Web Apps',
    desc: 'Fast, beautiful, fully responsive. From landing pages to complex web applications.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h3" />
      </svg>
    ),
    title: 'Mobile Apps',
    desc: 'iPhone & Android apps built once, deployed everywhere. App Store ready.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Design & Interface',
    desc: 'Clean, modern UI/UX that looks premium and feels natural on every device.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    title: 'Launch & Support',
    desc: 'Deployment, domain setup, speed optimisation — and ongoing support after launch.',
  },
]

const REASONS = [
  {
    number: '01',
    title: 'One person, full ownership',
    desc: "You deal with one developer who owns everything — design, code, deployment. No middlemen, no missed handoffs, no 'that's not my job'.",
  },
  {
    number: '02',
    title: 'Ship in days, not months',
    desc: 'Most projects are live within 1–2 weeks. I move fast without cutting corners — clean code, proper structure, ready to scale.',
  },
  {
    number: '03',
    title: 'Built to impress, not just function',
    desc: "Every detail is intentional. Animations, spacing, typography — your product will look like it came from a top-tier studio.",
  },
]

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

function FeaturedWork() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-10 left-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16 reveal">
          <div>
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Featured Work</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
              Real projects. <span className="gradient-text">Real results.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-white/12 text-white/60 text-sm font-medium rounded-full hover:border-white/30 hover:text-white transition-all duration-200"
          >
            View all work
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { img: CHEFALEH_URL, name: 'Chefaleh — Miami Catering', domain: 'chefaleh.com', url: 'https://www.chefaleh.com', tags: ['Luxury Brand', 'Web App', 'Live'] },
            { img: EQ_URL,       name: 'EQ Counseling & Testing',   domain: 'eqcounselingtesting.com', url: 'https://www.eqcounselingtesting.com', tags: ['Healthcare', 'Multi-page', 'Live'] },
          ].map((p, i) => (
            <article
              key={p.domain}
              className={`reveal reveal-d${i + 1} group relative rounded-2xl border border-white/8 overflow-hidden hover:border-accent/40 hover:shadow-[0_0_60px_rgba(212,168,83,0.1)] transition-all duration-500`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#111]/60 to-transparent flex items-center px-4 gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-3 flex-1 bg-white/10 rounded-sm h-4 max-w-[220px] flex items-center px-2">
                    <span className="text-white/40 text-[9px] font-mono truncate">{p.domain}</span>
                  </span>
                </div>
              </div>
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{p.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full border border-white/10 text-white/40 text-xs font-medium">{t}</span>
                    ))}
                  </div>
                </div>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-10 h-10 rounded-full border border-accent/30 bg-accent/10 flex items-center justify-center text-accent hover:bg-accent hover:text-[#0A0A0A] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServicesStrip() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Services</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Everything you need, <br className="hidden sm:block" />
            <span className="gradient-text">under one roof.</span>
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
            From first wireframe to live deployment — I handle the full stack so you don't have to.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES_PREVIEW.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-d${i + 1} group relative rounded-2xl border border-white/8 bg-[#111] p-7 flex flex-col gap-4 hover:border-accent/40 hover:bg-accent/4 hover:shadow-[0_0_40px_rgba(212,168,83,0.08)] transition-all duration-300`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                {s.icon}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Link
            to="/what-i-do"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/12 text-white text-sm font-medium rounded-full hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            See full list of services
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

function WhyMe() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Why Daniel</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why work with me?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <div
              key={r.number}
              className={`reveal reveal-d${i + 1} group relative rounded-2xl border border-white/8 bg-[#111] p-8 hover:border-accent/30 hover:bg-accent/3 transition-all duration-400`}
            >
              <div className="font-display text-6xl font-bold text-accent/15 group-hover:text-accent/25 transition-colors duration-300 leading-none mb-6 select-none">
                {r.number}
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">{r.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 reveal">
          {[
            { value: '2+',  label: 'Years building'   },
            { value: '10+', label: 'Projects shipped'  },
            { value: '2',   label: 'Live products'     },
            { value: '24h', label: 'Response time'     },
          ].map(({ value, label }) => (
            <div key={label} className="bg-[#0A0A0A] px-8 py-10 text-center hover:bg-[#111] transition-colors duration-200">
              <div className="font-display text-4xl font-bold text-white mb-2">{value}</div>
              <div className="text-white/35 text-sm font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeCTA() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-accent/7 rounded-full blur-[140px] animate-glow-pulse" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center reveal-scale">
        <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">Ready?</span>
        <h2 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Let's build something <span className="gradient-text">great.</span>
        </h2>
        <p className="text-white/40 text-xl leading-relaxed max-w-xl mx-auto mb-12">
          Got an idea? I'll turn it into a real product — fast, clean, and exactly how you imagined it.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-4 bg-accent text-[#0A0A0A] text-base font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_48px_rgba(212,168,83,0.5)] active:scale-95 transition-all duration-200"
          >
            Get In Touch →
          </Link>
          <Link
            to="/work"
            className="w-full sm:w-auto px-10 py-4 border border-white/12 text-white text-base font-medium rounded-full hover:border-white/30 hover:bg-white/5 active:scale-95 transition-all duration-200"
          >
            See My Work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesStrip />
      <WhyMe />
      <HomeCTA />
      <Footer />
    </>
  )
}
