import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60)
    return () => clearTimeout(t)
  }, [])

  // subtle parallax on the giant heading
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const line = (text: string, delay: number) => (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <span
        className="block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: mounted ? 'translateY(0)' : 'translateY(110%)',
          transitionDelay: `${delay}ms`,
        }}
      >
        {text}
      </span>
    </span>
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0A0A0A] flex flex-col justify-center overflow-hidden pt-24"
    >
      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(circle, #EDEAE3 1px, transparent 1px)',
          backgroundSize: '46px 46px',
        }}
      />
      {/* single soft accent wash, very subtle */}
      <div className="absolute -top-40 right-0 w-[700px] h-[700px] bg-accent/[0.05] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1600px] mx-auto w-full px-6 md:px-10" ref={wrapRef}>

        {/* top meta row */}
        <div
          className="flex items-center justify-between mb-10 transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-dot-pulse" />
            <span className="text-cream/50 text-xs font-medium tracking-[0.2em] uppercase">Available for new projects</span>
          </div>
          <span className="text-cream/55 text-xs font-medium tracking-[0.2em] uppercase hidden sm:block section-index">
            Full-Stack Developer
          </span>
        </div>

        {/* Giant headline */}
        <h1
          className="display-hero font-display font-bold text-cream"
          style={{ transform: `translateY(${offset * -0.04}px)` }}
        >
          {line('I turn ideas', 150)}
          <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <span
              className="block transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: mounted ? 'translateY(0)' : 'translateY(110%)', transitionDelay: '260ms' }}
            >
              into <span className="gradient-text">real products.</span>
            </span>
          </span>
        </h1>

        {/* bottom row: sub + CTAs */}
        <div className="mt-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <p
            className="text-cream/60 text-lg md:text-xl max-w-md leading-relaxed transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '450ms',
            }}
          >
            I build websites and web apps — from the first idea to the finished product,
            live and ready to use. Fast, clean, and exactly how you imagined it.
          </p>

          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '560ms',
            }}
          >
            <MagneticButton onClick={() => navigate('/contact')} variant="fill">
              Get In Touch →
            </MagneticButton>
            <MagneticButton onClick={() => navigate('/work')} variant="outline">
              View My Work
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* bottom scroll cue */}
      <div
        className="absolute bottom-8 left-6 md:left-10 flex items-center gap-3 transition-opacity duration-700"
        style={{ opacity: mounted ? 1 : 0, transitionDelay: '700ms' }}
      >
        <span className="text-cream/50 text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <span className="w-10 h-px bg-cream/20" />
      </div>
    </section>
  )
}
