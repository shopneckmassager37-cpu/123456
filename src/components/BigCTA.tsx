import { ReactNode } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import MagneticButton from './MagneticButton'

type BigCTAProps = {
  eyebrow: string
  title: ReactNode
  primary: { to: string; label: string }
  secondary?: { to: string; label: string }
}

export default function BigCTA({ eyebrow, title, primary, secondary }: BigCTAProps) {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] py-32 md:py-44 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[350px] bg-accent/[0.06] rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10 text-center reveal-scale">
        <span className="block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-8">{eyebrow}</span>
        <h2 className="display-hero font-display font-bold text-cream leading-[0.95] mb-12">
          {title}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton to={primary.to} variant="fill">{primary.label}</MagneticButton>
          {secondary && <MagneticButton to={secondary.to} variant="outline">{secondary.label}</MagneticButton>}
        </div>
      </div>
    </section>
  )
}
