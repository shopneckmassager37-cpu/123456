import { useEffect, useState } from 'react'

const LETTERS = ['D', 'A', 'N', 'D', 'E', 'V']
const COLUMNS = [0, 1, 2, 3, 4]

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t0 = setTimeout(() => setMounted(true), 80)
    const t1 = setTimeout(() => setExiting(true), 1850)
    const t2 = setTimeout(() => {
      document.body.style.overflow = ''
      onDone()
    }, 1850 + 950)
    return () => {
      clearTimeout(t0); clearTimeout(t1); clearTimeout(t2)
      document.body.style.overflow = ''
    }
  }, [onDone])

  return (
    <div className={`fixed inset-0 z-[100] ${exiting ? 'pointer-events-none' : ''}`}>

      {/* Curtain columns — slide up staggered on exit */}
      <div className="absolute inset-0 flex">
        {COLUMNS.map((i) => (
          <div
            key={i}
            className="flex-1 bg-[#0A0A0A] transition-transform duration-[850ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{
              transform: exiting ? 'translateY(-101%)' : 'translateY(0)',
              transitionDelay: exiting ? `${i * 75}ms` : '0ms',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-[450ms] ease-out"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? 'translateY(-30px)' : 'translateY(0)',
        }}
      >
        {/* Wordmark — letters rise one by one */}
        <div className="flex overflow-hidden pb-[0.08em]">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="font-display font-bold leading-none transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                letterSpacing: '-0.03em',
                transform: mounted ? 'translateY(0)' : 'translateY(115%)',
                transitionDelay: `${i * 75 + 100}ms`,
              }}
            >
              <span className={i >= 3 ? 'text-accent' : 'text-cream'}>{l}</span>
            </span>
          ))}
        </div>

        {/* Line draws across */}
        <div
          className="mt-7 h-px bg-cream/25 transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: mounted ? 'min(58vw, 440px)' : '0px', transitionDelay: '550ms' }}
        />

        {/* Tagline */}
        <div
          className="mt-6 flex items-center gap-3 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transitionDelay: '800ms',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-dot-pulse" />
          <span className="text-cream/40 text-xs font-medium tracking-[0.28em] uppercase">
            Ideas → Real Products
          </span>
        </div>
      </div>
    </div>
  )
}
