import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: "Most projects are completed within 1–2 weeks. I'll give you an honest timeline after our first call.",
  },
  {
    q: 'Do you work with startups and small businesses?',
    a: 'Absolutely. Most of my clients are early-stage startups and small businesses who need a strong digital presence without a bloated agency budget.',
  },
  {
    q: 'What do you need from me to get started?',
    a: 'Just a clear idea of what you want to build, your target audience, and any references or inspiration you like. I handle the rest — design, code, deployment.',
  },
  {
    q: 'Do you offer ongoing support after launch?',
    a: 'Yes. I offer maintenance packages for bug fixes, updates, and new features. Most clients stay with me long-term after their first project.',
  },
  {
    q: 'How do payments work?',
    a: "50% upfront, 50% on delivery. For longer projects, we can split into milestones. I'll send you a clear contract before any work begins.",
  },
]

function AccordionItem({ faq, isOpen, onToggle }: {
  faq: { q: string; a: string }
  isOpen: boolean
  onToggle: () => void
}) {
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0'
      el.style.opacity = '0'
    }
  }, [isOpen])

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-accent/30 bg-accent/4' : 'border-white/8 bg-surface hover:border-white/15'}`}>
      <button
        onClick={onToggle}
        className="w-full px-7 py-5 flex items-center justify-between gap-4 text-left"
      >
        <span className="text-white font-medium text-sm sm:text-base">{faq.q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-accent/40 text-accent rotate-45' : 'border-white/15 text-white/40'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: 0, opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }}
      >
        <div className="px-7 pb-6">
          <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const sectionRef = useScrollReveal()

  return (
    <section id="faq" className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16 text-center reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            FAQ
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
            Common Questions
          </h2>
          <p className="text-white/40 text-lg leading-relaxed">
            Everything you need to know before we start working together.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`reveal reveal-d${Math.min(i + 1, 6)}`}>
              <AccordionItem
                faq={faq}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
