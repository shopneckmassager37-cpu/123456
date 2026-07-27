import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'

const services = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    title: 'Websites & Web Apps',
    desc: 'Beautiful, fast websites that look great on every phone, tablet, and computer — built to impress and easy to use.',
    tags: ['Websites', 'Web Apps', 'Mobile-Friendly'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: 'Smart Features & Logic',
    desc: 'User accounts, payments, contact forms, bookings — all the smart stuff that runs in the background and makes your product work.',
    tags: ['User Accounts', 'Payments', 'Bookings'],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'From Idea to Live',
    desc: "No need to manage five different people. I take care of design, building, and launching — you just show up with your idea.",
    tags: ['Design', 'Build', 'Launch'],
  },
]

export default function Services() {
  const sectionRef = useScrollReveal()

  return (
    <section id="services" className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="02"
          label="Services"
          title={<>What I <span className="text-outline">build</span></>}
          subtitle="Whatever you need built — I can take it from idea to finished product."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/[0.07] border-y border-cream/[0.07]">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-d${i + 1} group relative bg-[#0A0A0A] p-8 flex flex-col gap-5 hover:bg-surface transition-colors duration-300`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-cream/[0.04] border border-cream/10 flex items-center justify-center text-accent group-hover:border-accent/40 group-hover:-translate-y-1 transition-all duration-300">
                  {s.icon}
                </div>
                <span className="section-index text-cream/15 text-sm font-semibold group-hover:text-accent/40 transition-colors duration-300">0{i + 1}</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">{s.title}</h3>
                <p className="text-cream/45 text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-cream/[0.07]">
                {s.tags.map((tag) => (
                  <span key={tag} className="text-xs text-cream/30 font-medium group-hover:text-cream/55 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
