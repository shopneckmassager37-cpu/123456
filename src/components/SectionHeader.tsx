import { ReactNode } from 'react'

type SectionHeaderProps = {
  index: string          // e.g. "01"
  label: string          // small uppercase eyebrow
  title: ReactNode       // the big heading
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ index, label, title, subtitle, align = 'left' }: SectionHeaderProps) {
  const isCenter = align === 'center'
  return (
    <div className={`mb-16 ${isCenter ? 'text-center' : ''}`}>
      <div className={`flex items-center gap-3 mb-6 reveal ${isCenter ? 'justify-center' : ''}`}>
        <span className="section-index text-accent text-sm font-semibold tracking-widest">({index})</span>
        <span className="w-8 h-px bg-accent/40" />
        <span className="text-cream/60 text-xs font-semibold tracking-[0.2em] uppercase">{label}</span>
      </div>
      <h2 className={`display-lg font-display font-bold text-cream reveal ${isCenter ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-cream/60 text-lg leading-relaxed mt-6 reveal ${isCenter ? 'max-w-xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
