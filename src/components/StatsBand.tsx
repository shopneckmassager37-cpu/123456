import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

export type Stat = { value: number; suffix: string; label: string; desc?: string }

function StatItem({ value, suffix, label, desc }: Stat) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now()
        const dur = 1400
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * value))
          if (p < 1) requestAnimationFrame(tick)
          else setCount(value)
        }
        requestAnimationFrame(tick)
        obs.disconnect()
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div ref={ref} className="bg-[#0A0A0A] px-6 py-12 md:py-16 text-center hover:bg-surface transition-colors duration-200">
      <div className="font-display text-5xl md:text-7xl font-bold text-cream mb-3 tabular-nums leading-none">
        {count}<span className="text-accent">{suffix}</span>
      </div>
      <div className="text-cream/45 text-sm font-semibold tracking-wide">{label}</div>
      {desc && <div className="text-cream/25 text-xs mt-1">{desc}</div>}
    </div>
  )
}

export default function StatsBand({ stats }: { stats: Stat[] }) {
  const ref = useScrollReveal<HTMLElement>()
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cream/[0.07] border-y border-cream/[0.07] reveal">
          {stats.map((s) => <StatItem key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}
