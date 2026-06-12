import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import PageHero from '../components/PageHero'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const QUICK_ANSWERS = [
  {
    q: 'How much does a project cost?',
    a: 'Every project is different. A simple landing page starts from a few hundred dollars; a full web app or mobile product varies based on scope. Tell me what you need and I\'ll give you an honest quote — no inflated agency pricing.',
  },
  {
    q: 'How quickly can we start?',
    a: "Usually within a week of our first conversation. Once we agree on scope and terms, I start immediately. Most projects are live within 1–2 weeks.",
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
    label: 'Response time',
    value: 'Within 24 hours',
    href: null,
    sub: 'Usually much faster',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    label: 'Work style',
    value: 'Fully remote',
    href: null,
    sub: 'Working with clients worldwide',
  },
]

function WaysToReach() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {WAYS_TO_REACH.map((w, i) => (
            <div
              key={w.label}
              className={`reveal reveal-d${i + 1} group bg-[#0A0A0A] p-8 md:p-10 hover:bg-surface transition-colors duration-300`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-11 h-11 rounded-xl bg-cream/[0.04] border border-cream/10 flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300">
                  {w.icon}
                </div>
                <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent/40 transition-colors duration-300">0{i + 1}</span>
              </div>
              <div className="text-cream/40 text-xs font-semibold uppercase tracking-[0.2em] mb-2">{w.label}</div>
              {w.href ? (
                <a
                  href={w.href}
                  className="link-underline inline-block text-cream text-base md:text-lg font-semibold hover:text-accent transition-colors duration-200 mb-1 break-all"
                >
                  {w.value}
                </a>
              ) : (
                <div className="text-cream text-base md:text-lg font-semibold mb-1">{w.value}</div>
              )}
              <div className="text-cream/30 text-xs">{w.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function QuickFAQ() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-6 reveal">
          <span className="section-index text-accent text-sm font-semibold tracking-widest">(07)</span>
          <span className="w-8 h-px bg-accent/40" />
          <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">Quick Answers</span>
        </div>
        <h2 className="display-lg font-display font-bold text-cream reveal mb-14">
          Before you <span className="text-outline">reach out</span>
        </h2>

        <div className="border-t border-cream/[0.07]">
          {QUICK_ANSWERS.map((item, i) => (
            <div
              key={item.q}
              className={`reveal reveal-d${i + 1} group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-10 border-b border-cream/[0.07] px-2 md:px-4 hover:bg-surface/40 transition-colors duration-300`}
            >
              <div className="md:col-span-5 flex items-start gap-5">
                <span className="section-index font-display text-2xl font-bold text-cream/12 group-hover:text-accent transition-colors duration-300 leading-none">
                  0{i + 1}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-cream leading-snug">{item.q}</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-cream/50 text-base leading-relaxed max-w-xl">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 reveal">
          <p className="text-cream/35 text-sm">
            More questions?{' '}
            <Link to="/about" className="link-underline text-accent hover:text-cream transition-colors duration-200 font-medium">
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
      <PageHero
        label="Open for projects"
        meta="Free consultation"
        dot="green"
        lines={["Let's build", <span key="l2"><span className="gradient-text">together.</span></span>]}
        sub="Got a project in mind? Send a message or drop me an email directly. Free consultation, no obligations."
      />
      <WaysToReach />
      <Contact />
      <QuickFAQ />
      <Footer />
    </>
  )
}
