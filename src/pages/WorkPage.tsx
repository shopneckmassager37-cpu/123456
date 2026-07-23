import { useScrollReveal } from '../hooks/useScrollReveal'
import PageHero from '../components/PageHero'
import Marquee from '../components/Marquee'
import SectionHeader from '../components/SectionHeader'
import Work from '../components/Work'
import StatsBand from '../components/StatsBand'
import BigCTA from '../components/BigCTA'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const PILLARS = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Performance first',
    desc: 'Every project is optimised for top speed scores. Fast load times and lean pages — because slow sites lose users.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Premium design',
    desc: "Design isn't decoration — it's conversion. Every product I ship looks intentional, premium, and trustworthy.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Built to last',
    desc: 'Well-structured, easy to extend, and simple to hand off. Your product stays maintainable as it grows.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 15h3" />
      </svg>
    ),
    title: 'Mobile by default',
    desc: 'Every layout is built mobile-first and tested on real devices — not just resized desktop designs.',
  },
]

function QualityPillars() {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="04"
          label="Quality"
          title={<>What goes into <span className="text-outline">every build</span></>}
          subtitle="Every project I ship meets the same high bar — whether it's a landing page or a full product."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`reveal reveal-d${i + 1} group bg-[#0A0A0A] p-8 flex flex-col gap-6 min-h-[260px] hover:bg-surface transition-colors duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cream/[0.04] border border-cream/10 flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300">
                  {p.icon}
                </div>
                <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent/40 transition-colors duration-300">0{i + 1}</span>
              </div>
              <div className="mt-auto">
                <h3 className="font-display text-lg font-bold text-cream mb-2">{p.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WorkPage() {
  return (
    <>
      <SEO
        title="My Work | Web & Mobile App Portfolio — dandev"
        description="Real projects, live in production and used by real people. Browse a portfolio of websites and apps built from concept to launch."
        path="/work"
      />
      <PageHero
        label="Portfolio"
        meta="Selected Work"
        lines={["Products I've", <span key="l2">built & <span className="gradient-text">shipped.</span></span>]}
        sub="Real projects, live in production and used by real people. From concept to launch — every one of them."
      />
      <div className="py-8 border-y border-cream/[0.07] bg-[#0A0A0A]">
        <Marquee items={['Real projects', 'Live products', 'Shipped']} />
      </div>
      <Work />
      <QualityPillars />
      <StatsBand
        stats={[
          { value: 2,   suffix: '+', label: 'Years of experience',  desc: 'Building for real clients' },
          { value: 10,  suffix: '+', label: 'Projects shipped',      desc: 'Across web and mobile'     },
          { value: 100, suffix: '%', label: 'Client satisfaction',   desc: 'No project abandoned'      },
          { value: 2,   suffix: '',  label: 'Live products',         desc: 'In production right now'   },
        ]}
      />
      <BigCTA
        eyebrow="Your turn"
        title={<>Want yours <span className="gradient-text">next?</span></>}
        primary={{ to: '/contact', label: 'Start a Project →' }}
        secondary={{ to: '/what-i-do', label: 'See What I Build' }}
      />
      <Footer />
    </>
  )
}
