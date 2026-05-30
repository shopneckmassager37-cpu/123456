import { useScrollReveal } from '../hooks/useScrollReveal'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'We start with a conversation. I learn about your goals, your users, and what success looks like for your project.',
  },
  {
    number: '02',
    title: 'Design',
    desc: "Before writing a single line of code, I map out the UX flow and visual direction — so we're aligned from day one.",
  },
  {
    number: '03',
    title: 'Build',
    desc: 'I develop the product with clean, maintainable code. You get regular updates and can give feedback at every step.',
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
    <section id="process" className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            How I Work
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            My Process
          </h2>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            No surprises. A clear process from first call to final launch.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className={`reveal reveal-d${i + 1} relative flex flex-col gap-5`}>
                {/* Number badge */}
                <div className="relative z-10 w-20 h-20 rounded-2xl border border-accent/25 bg-[#0A0A0A] flex items-center justify-center hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 group">
                  <span className="font-display text-2xl font-bold text-accent group-hover:scale-110 transition-transform duration-300 inline-block">
                    {step.number}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {/* Arrow between steps */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 z-20">
                    <svg className="w-8 h-8 text-accent/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
