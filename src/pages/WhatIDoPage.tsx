import { useScrollReveal } from '../hooks/useScrollReveal'
import PageHero from '../components/PageHero'
import Marquee from '../components/Marquee'
import MagneticButton from '../components/MagneticButton'
import SectionHeader from '../components/SectionHeader'
import Expertise from '../components/Expertise'
import Services from '../components/Services'
import BigCTA from '../components/BigCTA'
import Footer from '../components/Footer'

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

const DELIVERABLES = [
  'Full source code — yours to keep',
  'Deployed and live on your domain',
  'Mobile-friendly on every screen size',
  'SEO-ready and fast-loading',
  '30-day post-launch support included',
  'Clear contract before any work starts',
]

function CapabilitiesGrid() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="03"
          label="Capabilities"
          title={<>Anything you <span className="text-outline">need</span></>}
          subtitle="Whether it's a simple website or a complex product with custom features — I've built it."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.name}
              className={`reveal reveal-d${(i % 6) + 1} group bg-[#0A0A0A] px-4 py-9 flex flex-col items-center gap-3 hover:bg-surface transition-colors duration-300 cursor-default`}
            >
              <span className="text-2xl group-hover:-translate-y-1 transition-transform duration-300 select-none">{c.icon}</span>
              <span className="text-cream/50 text-xs font-medium text-center group-hover:text-cream transition-colors duration-200">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Deliverables() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden border-t border-cream/[0.07]" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

          {/* sticky left */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-6 reveal">
                <span className="section-index text-accent text-sm font-semibold tracking-widest">(04)</span>
                <span className="w-8 h-px bg-accent/40" />
                <span className="text-cream/45 text-xs font-semibold tracking-[0.2em] uppercase">Every project includes</span>
              </div>
              <h2 className="display-lg font-display font-bold text-cream reveal mb-8">
                What you <br /><span className="text-outline">always get.</span>
              </h2>
              <p className="text-cream/40 text-lg leading-relaxed max-w-sm reveal mb-10">
                No matter the size of the project — these come standard. Always.
              </p>
              <MagneticButton to="/contact" variant="fill">Start a Project →</MagneticButton>
            </div>
          </div>

          {/* numbered checklist */}
          <div className="lg:col-span-7">
            <div className="border-t border-cream/[0.07]">
              {DELIVERABLES.map((text, i) => (
                <div
                  key={text}
                  className={`reveal reveal-d${Math.min(i + 1, 6)} group flex items-center gap-6 py-8 border-b border-cream/[0.07] px-2 md:px-4 hover:bg-surface/40 transition-colors duration-300`}
                >
                  <span className="section-index font-display text-2xl font-bold text-cream/12 group-hover:text-accent transition-colors duration-300">
                    0{i + 1}
                  </span>
                  <span className="text-cream/70 group-hover:text-cream text-base md:text-lg font-medium transition-colors duration-300">
                    {text}
                  </span>
                  <svg className="ml-auto w-5 h-5 text-accent/50 group-hover:text-accent flex-shrink-0 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
              ))}
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
      <PageHero
        label="Services & Expertise"
        meta="What I Do"
        lines={['What I do,', <span key="l2">start to <span className="gradient-text">finish.</span></span>]}
        sub="Websites, web apps, and mobile apps — designed, built, and launched by one person who owns the whole thing."
      />
      <div className="py-8 border-y border-cream/[0.07] bg-[#0A0A0A]">
        <Marquee items={['Design', 'Build', 'Launch', 'Support']} />
      </div>
      <Expertise />
      <Services />
      <CapabilitiesGrid />
      <Deliverables />
      <BigCTA
        eyebrow="Have something in mind?"
        title={<>Let's make it <span className="gradient-text">real.</span></>}
        primary={{ to: '/contact', label: 'Get In Touch →' }}
        secondary={{ to: '/work', label: 'See My Work' }}
      />
      <Footer />
    </>
  )
}
