import { useEffect, useRef, useState } from 'react'

const WORDS = ['Websites', 'Apps', 'Products']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [wordIdx, setWordIdx] = useState(0)
  const rafRef = useRef<number>()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const start = performance.now()
    const duration = 2000

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * 100))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(100)
        // hold, then curtain up
        setTimeout(() => setLeaving(true), 280)
        setTimeout(() => {
          document.body.style.overflow = ''
          onDone()
        }, 280 + 1000)
      }
    }
    rafRef.current = requestAnimationFrame(tick)

    // cycle words
    const wordTimer = setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length)
    }, 560)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearInterval(wordTimer)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col justify-between px-6 md:px-10 py-8 md:py-10 transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: leaving ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #EDEAE3 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />

      {/* top row — brand */}
      <div className="relative flex items-center justify-between">
        <span className="font-display text-sm md:text-base font-bold tracking-tight text-cream">
          DAN<span className="text-accent">DEV</span>
        </span>
        <span className="text-cream/40 text-xs tracking-[0.2em] uppercase section-index hidden sm:block">
          Portfolio · 2026
        </span>
      </div>

      {/* center — rotating word */}
      <div className="relative flex-1 flex items-center">
        <div className="overflow-hidden h-[1.1em]">
          <span
            key={wordIdx}
            className="block display-lg font-display font-bold text-cream"
            style={{ animation: 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards' }}
          >
            {WORDS[wordIdx]}
          </span>
        </div>
      </div>

      {/* bottom — progress + counter */}
      <div className="relative">
        <div className="flex items-end justify-between mb-4">
          <span className="text-cream/40 text-xs tracking-[0.2em] uppercase">Loading</span>
          <span className="font-display font-bold text-cream tabular-nums leading-none text-6xl sm:text-7xl md:text-8xl">
            {count}
            <span className="text-accent">%</span>
          </span>
        </div>
        {/* progress line */}
        <div className="h-px w-full bg-cream/10 overflow-hidden">
          <div
            className="h-full bg-accent transition-[width] duration-100 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  )
}
