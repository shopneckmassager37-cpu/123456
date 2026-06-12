import { useScrollReveal } from '../hooks/useScrollReveal'
import PageHero from '../components/PageHero'
import Marquee from '../components/Marquee'
import SectionHeader from '../components/SectionHeader'
import Process from '../components/Process'
import FAQ from '../components/FAQ'
import BigCTA from '../components/BigCTA'
import Footer from '../components/Footer'

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
    desc: "Fast turnaround doesn't mean cutting corners. I ship quickly because I'm focused — not because I rush. Clean work, proper structure, every time.",
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

const STORY = [
  "I'm a full-stack developer who builds websites and apps for clients around the world. I've been doing this for over two years and I genuinely love what I do.",
  'I started building because I wanted to create products — not just complete tasks. Every project I take on is something I believe in: a real user, a real problem, and a real purpose.',
  'What sets me apart is that I care about the entire product — not just my slice of it. I think about the experience, the performance, and the business goals, not just what I was asked to build.',
  'I work remotely and move fast. Most projects are live within 1–2 weeks, and I stay in close contact with every client throughout the process.',
]

const SKILLS = ['Web Apps', 'Mobile Apps', 'UI Design', 'Payments', 'Databases', 'Deployment']

function AboutDaniel() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* sticky portrait */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32 flex justify-center lg:justify-start reveal-scale">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl border border-cream/10 bg-surface overflow-hidden">
                  <img src={LOGO_URL} alt="Daniel" className="w-full h-full object-cover" />
                </div>

                {/* floating badge */}
                <div className="absolute -bottom-5 -right-5 bg-[#0E0E0E] border border-cream/10 rounded-xl px-5 py-3.5">
                  <div className="text-accent font-display text-2xl font-bold leading-none">2+</div>
                  <div className="text-cream/50 text-xs font-medium mt-1.5">Years Building</div>
                </div>

                {/* status pill */}
                <div className="absolute -top-3 -left-3 flex items-center gap-2 bg-[#0E0E0E] border border-cream/10 rounded-full px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-dot-pulse" />
                  <span className="text-cream/60 text-xs font-medium">Available for projects</span>
                </div>
              </div>
            </div>
          </div>

          {/* story */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6 reveal">
              <span className="section-index text-accent text-sm font-semibold tracking-widest">(01)</span>
              <span className="w-8 h-px bg-accent/40" />
              <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">Who I am</span>
            </div>
            <h2 className="display-lg font-display font-bold text-cream reveal mb-10">
              Hi, I'm <span className="gradient-text">Daniel.</span>
            </h2>

            <div className="space-y-6">
              {STORY.map((p, i) => (
                <p key={i} className={`reveal reveal-d${i + 1} text-cream/55 text-base md:text-lg leading-relaxed max-w-2xl`}>
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-3 reveal">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full border border-cream/10 text-cream/50 text-sm font-medium hover:border-accent/40 hover:text-cream transition-colors duration-200 cursor-default"
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
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="02"
          label="Values"
          title={<>How I <span className="text-outline">work</span></>}
          subtitle="Three principles that guide every project I take on."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`reveal reveal-d${i + 1} group bg-[#0A0A0A] p-9 flex flex-col gap-6 min-h-[300px] hover:bg-surface transition-colors duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cream/[0.04] border border-cream/10 flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300">
                  {v.icon}
                </div>
                <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent/40 transition-colors duration-300">0{i + 1}</span>
              </div>
              <div className="mt-auto">
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

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        meta="The human behind it"
        lines={['The person', <span key="l2">behind <span className="gradient-text">the code.</span></span>]}
        sub="How I work, what I stand for, and what you can expect when we build something together."
      />
      <AboutDaniel />
      <CoreValues />
      <Process />
      <FAQ />
      <div className="py-8 border-y border-cream/[0.07] bg-[#0A0A0A]">
        <Marquee items={['Transparent', 'Fast', 'Yours to keep']} reverse speed="slow" />
      </div>
      <BigCTA
        eyebrow="Let's talk"
        title={<>Sound like <span className="gradient-text">a fit?</span></>}
        primary={{ to: '/contact', label: 'Get In Touch →' }}
        secondary={{ to: '/work', label: 'See My Work' }}
      />
      <Footer />
    </>
  )
}
