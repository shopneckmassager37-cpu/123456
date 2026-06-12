import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import Marquee from '../components/Marquee'
import MagneticButton from '../components/MagneticButton'

const CHEFALEH_URL = 'https://media.base44.com/images/public/69c17515a2c757d1070710f1/536b80201_2026-05-27203012.png'
const EQ_URL       = 'https://image.thum.io/get/width/1280/crop/720/https://eqcounselingtesting.vercel.app/'

const PROJECTS = [
  { img: CHEFALEH_URL, index: '01', name: 'Chefaleh', sub: 'Miami Catering', domain: 'chefaleh.com', url: 'https://www.chefaleh.com', tags: ['Luxury Brand', 'Web App', 'Live'] },
  { img: EQ_URL,       index: '02', name: 'EQ Counseling', sub: 'Mental Health Practice', domain: 'eqcounselingtesting.com', url: 'https://www.eqcounselingtesting.com', tags: ['Healthcare', 'Multi-page', 'Live'] },
]

const SERVICES_PREVIEW = [
  { title: 'Websites & Web Apps', desc: 'Fast, beautiful, fully responsive. From landing pages to complex web applications.' },
  { title: 'Mobile Apps',         desc: 'iPhone & Android apps built once, deployed everywhere. App Store ready.' },
  { title: 'Design & Interface',  desc: 'Clean, modern UI/UX that looks premium and feels natural on every device.' },
  { title: 'Launch & Support',    desc: 'Deployment, domain setup, speed optimisation — and ongoing support after launch.' },
]

const APPROACH = [
  { number: '01', title: 'Listen', desc: 'It starts with your idea. I learn what you want to build, who it’s for, and what success actually looks like for you.' },
  { number: '02', title: 'Design', desc: 'I shape the full look and feel before building anything — so we agree on every screen long before code.' },
  { number: '03', title: 'Build',  desc: 'I build it piece by piece, with regular updates and complete transparency. You see progress the whole way.' },
  { number: '04', title: 'Launch', desc: 'I get it live, fast, and polished — then stay around for updates and improvements after launch.' },
]

const STATS = [
  { value: 2,  suffix: '+',  label: 'Years building'   },
  { value: 10, suffix: '+',  label: 'Projects shipped'  },
  { value: 2,  suffix: '',   label: 'Live products'     },
  { value: 24, suffix: 'h',  label: 'Response time'     },
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

/* ---- Words that light up as you scroll ---- */
function ScrollLitText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [progress, setProgress] = useState(0)
  const words = text.split(' ')

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.85
      const end = vh * 0.4
      const p = (start - rect.top) / (start - end + rect.height)
      setProgress(Math.max(0, Math.min(1, p)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const lit = progress >= i / words.length
        return (
          <span
            key={i}
            style={{ opacity: lit ? 1 : 0.16, transition: 'opacity 0.35s ease' }}
          >
            {w}{' '}
          </span>
        )
      })}
    </p>
  )
}

/* ---- Big editorial statement ---- */
function Statement() {
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-40 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-10">
          <span className="section-index text-accent text-sm font-semibold tracking-widest">(00)</span>
          <span className="w-8 h-px bg-accent/40" />
          <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">The idea</span>
        </div>
        <ScrollLitText
          text="I design and build digital products from the first idea to the finished thing — live, fast, and exactly how you pictured it. One person, full ownership, zero handoffs."
          className="display-lg font-display font-bold text-cream max-w-5xl leading-[1.08]"
        />
      </div>
    </section>
  )
}

/* ---- Featured work — large editorial cards ---- */
function FeaturedWork() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 reveal">
              <span className="section-index text-accent text-sm font-semibold tracking-widest">(01)</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">Featured Work</span>
            </div>
            <h2 className="display-lg font-display font-bold text-cream reveal">
              Selected <span className="text-outline">projects</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="reveal flex-shrink-0 link-underline inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm font-medium transition-colors duration-200"
          >
            View all work →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((p, i) => (
            <a
              key={p.domain}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal reveal-d${i + 1} group relative rounded-2xl border border-cream/[0.08] overflow-hidden hover:border-cream/25 transition-all duration-500`}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                {/* dark gradient + hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-[#0A0A0A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-6 py-3 rounded-full bg-accent text-[#0A0A0A] text-sm font-semibold translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                    View Live Site ↗
                  </span>
                </div>
                {/* big index */}
                <span className="absolute top-5 left-6 font-display text-2xl font-bold text-cream/80 section-index">
                  {p.index}
                </span>
              </div>

              <div className="p-6 md:p-7 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream leading-none mb-2">{p.name}</h3>
                  <p className="text-cream/40 text-sm">{p.sub}</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-end max-w-[55%]">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 rounded-full border border-cream/10 text-cream/40 text-xs font-medium whitespace-nowrap">{t}</span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Approach — sticky pinned ---- */
function Approach() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden border-t border-cream/[0.07]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* sticky title */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-6 reveal">
                <span className="section-index text-accent text-sm font-semibold tracking-widest">(02)</span>
                <span className="w-8 h-px bg-accent/40" />
                <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">How I work</span>
              </div>
              <h2 className="display-lg font-display font-bold text-cream reveal mb-8">
                A simple way <br /><span className="text-outline">to build.</span>
              </h2>
              <p className="text-cream/40 text-lg leading-relaxed max-w-sm reveal mb-10">
                No agencies, no endless meetings. Four clear steps from your idea to a finished, live product.
              </p>
              <MagneticButton to="/about" variant="outline">The full process →</MagneticButton>
            </div>
          </div>

          {/* scrolling steps */}
          <div className="lg:col-span-7">
            <div className="border-t border-cream/[0.07]">
              {APPROACH.map((s, i) => (
                <div
                  key={s.number}
                  className={`reveal reveal-d${i + 1} group py-10 border-b border-cream/[0.07] hover:bg-surface/40 transition-colors duration-300 px-2 md:px-4`}
                >
                  <div className="flex items-baseline gap-6">
                    <span className="font-display text-4xl md:text-5xl font-bold text-cream/12 group-hover:text-accent transition-colors duration-300 leading-none section-index">
                      {s.number}
                    </span>
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-3">{s.title}</h3>
                      <p className="text-cream/45 text-base leading-relaxed max-w-md">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Services strip ---- */
function ServicesStrip() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6 reveal">
              <span className="section-index text-accent text-sm font-semibold tracking-widest">(03)</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">Services</span>
            </div>
            <h2 className="display-lg font-display font-bold text-cream reveal">
              Everything, <span className="text-outline">one roof.</span>
            </h2>
          </div>
          <Link to="/what-i-do" className="reveal flex-shrink-0 link-underline inline-flex items-center gap-2 text-cream/60 hover:text-cream text-sm font-medium transition-colors duration-200">
            All services →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {SERVICES_PREVIEW.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-d${i + 1} group bg-[#0A0A0A] p-8 flex flex-col gap-6 min-h-[230px] hover:bg-surface transition-colors duration-300`}
            >
              <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent transition-colors duration-300">0{i + 1}</span>
              <div className="mt-auto">
                <h3 className="font-display text-xl font-bold text-cream mb-2 group-hover:-translate-y-0.5 transition-transform duration-300">{s.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Stats with count-up ---- */
function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now()
        const dur = 1400
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * value))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(value)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  return (
    <div ref={ref} className="bg-[#0A0A0A] px-6 py-12 md:py-16 text-center hover:bg-surface transition-colors duration-200">
      <div className="font-display text-5xl md:text-7xl font-bold text-cream mb-3 tabular-nums leading-none">
        {count}<span className="text-accent">{suffix}</span>
      </div>
      <div className="text-cream/35 text-sm font-medium tracking-wide">{label}</div>
    </div>
  )
}

function Stats() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.07] border-y border-cream/[0.07] reveal">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Big CTA ---- */
function HomeCTA() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 md:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-accent/[0.06] rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 text-center reveal-scale">
        <span className="block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">Got an idea?</span>
        <h2 className="display-hero font-display font-bold text-cream leading-[0.95] mb-12">
          Let's build it.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton to="/contact" variant="fill">Get In Touch →</MagneticButton>
          <MagneticButton to="/work" variant="outline">See My Work</MagneticButton>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="py-8 border-y border-cream/[0.07] bg-[#0A0A0A]">
        <Marquee items={['Websites', 'Mobile Apps', 'UI Design', 'Web Apps', 'Launch']} />
      </div>
      <Statement />
      <FeaturedWork />
      <Approach />
      <ServicesStrip />
      <Stats />
      <div className="py-8 border-y border-cream/[0.07] bg-[#0A0A0A]">
        <Marquee items={["Let's build", 'Something great', 'Together']} reverse speed="slow" />
      </div>
      <HomeCTA />
      <Footer />
    </>
  )
}
