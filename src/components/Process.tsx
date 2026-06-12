import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We start with a conversation. I learn about your goals, your users, and what success looks like for your project.',
  },
  {
    number: '02',
    title: 'Design',
    desc: "Before touching anything technical, I map out how it looks and how it flows — so we're both on the same page from day one.",
  },
  {
    number: '03',
    title: 'Build',
    desc: "I build the product step by step. You get regular updates along the way and can give feedback at any point.",
  },
  {
    number: '04',
    title: 'Launch',
    desc: 'Deployment, domain setup, final QA — I make sure everything is live, fast, and running smooth.',
  },
]

export default function Process() {
  const sectionRef = useScrollReveal()

  return (
    <section id="process" className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="04"
          label="How I Work"
          title={<>My <span className="text-outline">process</span></>}
          subtitle="No surprises. A clear process from first message to final launch."
        />

        <div className="border-t border-cream/[0.07]">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal reveal-d${i + 1} group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start py-10 border-b border-cream/[0.07] hover:bg-surface/40 transition-colors duration-300 px-2 md:px-4`}
            >
              <div className="md:col-span-2 flex items-center gap-4">
                <span className="font-display text-5xl md:text-6xl font-bold text-cream/10 group-hover:text-accent transition-colors duration-300 leading-none">
                  {step.number}
                </span>
              </div>
              <div className="md:col-span-3">
                <h3 className="font-display text-2xl font-bold text-cream">{step.title}</h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-cream/45 text-base leading-relaxed max-w-xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
