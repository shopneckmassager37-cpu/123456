import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'

const SKILLS = [
  {
    title: 'Websites & Web Apps',
    description:
      'Complete websites and web apps — from the homepage you see to everything that runs behind it.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: 'Design & Interface',
    description:
      'Clean, modern designs that look great and feel natural to use — whether on a phone or a big screen.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: 'Fast & Modern Tech',
    description:
      'Built with the same tools used by the world\'s top apps — so your product is fast, smooth, and ready to grow.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Connections & Integrations',
    description:
      'I connect your app to whatever it needs — payments, emails, maps, calendars, or any other tool you use.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
  {
    title: 'Launch & Ongoing Support',
    description:
      'I get your product live, make sure it loads fast, and stay available for updates and improvements after launch.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
]

export default function Expertise({ index = '01' }: { index?: string }) {
  const sectionRef = useScrollReveal()

  return (
    <section id="expertise" className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader index={index} label="What I Do" title={<>My Expertise</>} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {SKILLS.map(({ title, description, icon }, i) => (
            <div
              key={title}
              className={`reveal reveal-d${(i % 3) + 1} group bg-[#0A0A0A] p-9 flex flex-col gap-5 hover:bg-surface transition-colors duration-300 cursor-default`}
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl bg-cream/[0.04] border border-cream/10 flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300">
                  {icon}
                </div>
                <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent/40 transition-colors duration-300">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="text-cream font-semibold text-lg mb-2 leading-snug">{title}</h3>
                <p className="text-cream/60 text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
          {/* 5 cards over a 2- or 3-column grid leaves one orphan slot; without
              a filler the grid's hairline background shows through as a block. */}
          <div className="hidden sm:block bg-[#0A0A0A]" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
