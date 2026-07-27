import { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type PageHeroProps = {
  label: string
  meta?: string
  lines: ReactNode[]
  sub?: string
  dot?: 'accent' | 'green'
}

export default function PageHero({ label, meta, lines, sub, dot = 'accent' }: PageHeroProps) {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden" ref={ref}>
      {/* fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: 'radial-gradient(circle, #EDEAE3 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">

        {/* meta row */}
        <div className="flex items-center justify-between mb-10 reveal">
          <div className="flex items-center gap-2.5">
            <span className={`w-2 h-2 rounded-full animate-dot-pulse ${dot === 'green' ? 'bg-green-400' : 'bg-accent'}`} />
            <span className="text-cream/50 text-xs font-medium tracking-[0.2em] uppercase">{label}</span>
          </div>
          {meta && (
            <span className="text-cream/55 text-xs font-medium tracking-[0.2em] uppercase hidden sm:block section-index">
              {meta}
            </span>
          )}
        </div>

        {/* giant masked headline */}
        <h1 className="display-hero font-display font-bold text-cream">
          {lines.map((line, i) => (
            <span key={i} className={`reveal-mask block pb-[0.12em] -mb-[0.12em] rm-d${Math.min(i + 1, 3)}`}>
              <span>{line}</span>
            </span>
          ))}
        </h1>

        {sub && (
          <p className="mt-10 text-cream/60 text-lg md:text-xl max-w-xl leading-relaxed reveal">
            {sub}
          </p>
        )}
      </div>
    </section>
  )
}
