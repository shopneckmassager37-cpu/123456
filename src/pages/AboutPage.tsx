import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Process from '../components/Process'
import FAQ from '../components/FAQ'
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

const LOGO_URL = 'https://media.base44.com/images/public/69c17515a2c757d1070710f1/0c8a8e3df_2026-05-27193417.png'

const VALUES = [
  {
    title: 'Transparency',
    desc: 'You always know where your project stands. No vague updates, no hidden costs. Clear timelines, honest estimates, and direct communication.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Speed without shortcuts',
    desc: "Fast turnaround doesn't mean cutting corners. I ship quickly because I'm focused — not because I rush. Clean code, proper structure, every time.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'You own everything',
    desc: "Your code, your domain, your product. Nothing is locked behind subscriptions or proprietary platforms. I hand over everything and you're fully independent.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
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
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">About</span>
        </div>
        <h1 className="display-xl font-display font-bold text-cream mb-6 reveal">
          The person <span className="gradient-text">behind the code</span>
        </h1>
        <p className="text-cream/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal">
          How I work, what I stand for, and what you can expect when we build something together.
        </p>
      </div>
    </section>
  )
}

function AboutDaniel() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — avatar + badge */}
          <div className="flex justify-center lg:justify-start reveal-scale">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl border border-accent/20 bg-[#111] overflow-hidden shadow-[0_0_80px_rgba(212,168,83,0.15)]">
                <img
                  src={LOGO_URL}
                  alt="Daniel"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -right-5 bg-[#111] border border-accent/30 rounded-2xl px-5 py-3.5 shadow-xl">
                <div className="text-accent font-display text-2xl font-bold">2+</div>
                <div className="text-cream/50 text-xs font-medium mt-0.5">Years Building</div>
              </div>

              {/* Status dot */}
              <div className="absolute -top-3 -left-3 flex items-center gap-2 bg-[#111] border border-cream/10 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-dot-pulse" />
                <span className="text-cream/60 text-xs font-medium">Available for projects</span>
              </div>
            </div>
          </div>

          {/* Right — story */}
          <div className="reveal">
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">About me</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight mb-6">
              Hi, I'm Daniel.
            </h2>

            <div className="space-y-5 text-cream/55 text-base leading-relaxed">
              <p>
                I'm a full-stack developer who builds websites and apps for clients around the world.
                I've been doing this for over two years and I genuinely love what I do.
              </p>
              <p>
                I started building because I wanted to create products — not just complete tasks. Every project I take on is
                something I believe in: a real user, a real problem, and a real purpose.
              </p>
              <p>
                What sets me apart is that I care about the entire product — not just my slice of it. I think about the
                experience, the performance, and the business goals, not just what I was asked to build.
              </p>
              <p>
                I work remotely and move fast. Most projects are live within 1–2 weeks, and I stay in close contact with
                every client throughout the process.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {['Web Apps', 'Mobile Apps', 'UI Design', 'Payments', 'Databases', 'Deployment'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-cream/10 text-cream/50 text-sm font-medium hover:border-accent/30 hover:text-cream/70 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CoreValues() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Values</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight mb-4">
            How I work
          </h2>
          <p className="text-cream/40 text-lg max-w-lg mx-auto leading-relaxed">
            Three principles that guide every project I take on.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-d${i + 1} group relative rounded-2xl border border-cream/8 bg-[#111] p-8 hover:border-accent/30 hover:bg-accent/3 transition-all duration-400 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent/4 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 group-hover:bg-accent/20 group-hover:border-accent/40 group-hover:scale-110 transition-all duration-300">
                  {v.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-cream mb-3">{v.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCTA() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-accent/7 rounded-full blur-[130px]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 text-center reveal-scale">
        <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-6">Let's talk</span>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-cream tracking-tight mb-6 leading-tight">
          Sound like a <span className="gradient-text">good fit?</span>
        </h2>
        <p className="text-cream/40 text-lg leading-relaxed max-w-lg mx-auto mb-10">
          I'd love to hear about your project. No commitments — just a conversation about what you want to build.
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
            className="w-full sm:w-auto px-10 py-4 border border-cream/12 text-cream text-base font-medium rounded-full hover:border-cream/30 hover:bg-cream/5 active:scale-95 transition-all duration-200"
          >
            See My Work
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero />
      <AboutDaniel />
      <CoreValues />
      <Process />
      <FAQ />
      <AboutCTA />
      <Footer />
    </>
  )
}
