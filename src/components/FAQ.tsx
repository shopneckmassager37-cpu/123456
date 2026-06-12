import { useState, useRef, useEffect } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeader from './SectionHeader'

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
    a: 'Just a clear idea of what you want to build, who it\'s for, and any examples you like the look of. I take care of everything else — design, building, and going live.',
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
    <div className={`border-b border-cream/[0.07] transition-colors duration-300 ${isOpen ? 'bg-surface/40' : 'hover:bg-surface/20'}`}>
      <button
        onClick={onToggle}
        className="w-full px-2 md:px-4 py-6 flex items-center justify-between gap-4 text-left"
      >
        <span className="text-cream font-medium text-base sm:text-lg">{faq.q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? 'border-accent/50 text-accent rotate-45' : 'border-cream/15 text-cream/40'}`}>
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div
        ref={bodyRef}
        style={{ maxHeight: 0, opacity: 0, overflow: 'hidden', transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease' }}
      >
        <div className="px-2 md:px-4 pb-7">
          <p className="text-cream/50 text-sm sm:text-base leading-relaxed max-w-2xl">{faq.a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const sectionRef = useScrollReveal()

  return (
    <section id="faq" className="relative bg-[#0A0A0A] py-28 md:py-36 overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-10">
        <SectionHeader
          index="05"
          label="FAQ"
          title={<>Common <span className="text-outline">questions</span></>}
          subtitle="Everything you need to know before we start working together."
        />

        <div className="border-t border-cream/[0.07]">
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
