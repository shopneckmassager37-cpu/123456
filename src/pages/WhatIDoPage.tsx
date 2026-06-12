import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Expertise from '../components/Expertise'
import Services from '../components/Services'
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

const CAPABILITIES = [
  { name: 'Websites',        icon: '🌐' },
  { name: 'Web Apps',        icon: '⚡' },
  { name: 'Mobile Apps',     icon: '📱' },
  { name: 'UI / UX Design',  icon: '🎨' },
  { name: 'Online Stores',   icon: '🛒' },
  { name: 'Booking Systems', icon: '📅' },
  { name: 'User Accounts',   icon: '👤' },
  { name: 'Payment Systems', icon: '💳' },
  { name: 'Admin Dashboards',icon: '📊' },
  { name: 'Email Automation',icon: '✉️'  },
  { name: 'Maps & Location', icon: '📍' },
  { name: 'Live Deployment', icon: '🚀' },
]

const PROCESS_STEPS = [
  { number: '01', title: 'First conversation', desc: "We talk about your idea, your goals, and what success looks like. Free, no obligation." },
  { number: '02', title: 'Design first',        desc: 'I design the full look and feel before building anything — so we agree upfront.' },
  { number: '03', title: 'Build & iterate',     desc: 'Regular updates, quick iterations, and full transparency throughout the build.' },
  { number: '04', title: 'Launch & handoff',    desc: 'Deployed, live, and fully yours — plus a walkthrough so you know how to manage it.' },
]

const DELIVERABLES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: 'Full source code — yours to keep',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: 'Deployed and live on your domain',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: 'Mobile-friendly on every screen size',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: 'SEO-ready and fast-loading',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: '30-day post-launch support included',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    text: 'Clear contract before any work starts',
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
          <span className="text-accent text-xs font-semibold tracking-[0.18em] uppercase">Services & Expertise</span>
        </div>
        <h1 className="display-xl font-display font-bold text-cream mb-6 reveal">
          What I <span className="gradient-text">Build</span>
        </h1>
        <p className="text-cream/45 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed reveal">
          Full-stack development from idea to deployment. Websites, web apps, and mobile apps —
          built with modern tools and attention to every detail.
        </p>
      </div>
    </section>
  )
}

function CapabilitiesGrid() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-24 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Capabilities</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-cream tracking-tight mb-4">
            What I can build for you
          </h2>
          <p className="text-cream/40 text-base max-w-lg mx-auto leading-relaxed">
            Whether it's a simple website or a complex product with custom features — I've built it.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.name}
              className={`reveal reveal-d${(i % 6) + 1} group flex flex-col items-center gap-2.5 rounded-xl border border-cream/6 bg-[#111] px-4 py-5 hover:border-accent/25 hover:bg-accent/4 transition-all duration-200 cursor-default`}
            >
              <span className="text-xl group-hover:scale-125 transition-transform duration-200 select-none">{c.icon}</span>
              <span className="text-cream/50 text-xs font-medium text-center group-hover:text-cream/80 transition-colors duration-200">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const ref = useRevealSection()
  return (
    <section className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cream/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — text */}
          <div>
            <div className="reveal">
              <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">How It Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream tracking-tight mb-6">
                From first message <br />to launch in four steps.
              </h2>
              <p className="text-cream/40 text-lg leading-relaxed mb-10">
                No guesswork, no surprises. A simple, transparent process that keeps you in the loop from day one.
              </p>
            </div>

            <div className="space-y-6">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.number} className={`reveal reveal-d${i + 1} flex gap-5 group`}>
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl border border-accent/25 bg-[#111] flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/8 transition-all duration-300">
                    <span className="font-display text-sm font-bold text-accent">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream mb-1">{step.title}</h3>
                    <p className="text-cream/40 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — deliverables card */}
          <div className="reveal-scale">
            <div className="glow-card p-8 md:p-10">
              <div className="mb-8">
                <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Every project includes</span>
                <h3 className="font-display text-2xl font-bold text-cream mt-3">What you always get</h3>
              </div>
              <div className="space-y-4">
                {DELIVERABLES.map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/25 flex items-center justify-center text-accent flex-shrink-0">
                      {icon}
                    </div>
                    <span className="text-cream/70 text-sm font-medium">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-cream/8">
                <Link
                  to="/contact"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-[#0A0A0A] text-sm font-bold rounded-full hover:bg-accent-dim hover:shadow-[0_0_36px_rgba(212,168,83,0.4)] active:scale-[0.98] transition-all duration-200"
                >
                  Start a Project — It's Free →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function WhatIDoPage() {
  return (
    <>
      <PageHero />
      <Expertise />
      <Services />
      <CapabilitiesGrid />
      <HowItWorks />
      <Footer />
    </>
  )
}
