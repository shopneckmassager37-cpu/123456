type MarqueeProps = {
  items: string[]
  reverse?: boolean
  speed?: 'normal' | 'slow'
  separator?: React.ReactNode
  className?: string
}

const Star = () => (
  <svg className="w-5 h-5 md:w-7 md:h-7 text-accent flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0l2.4 8.4L24 12l-9.6 3.6L12 24l-2.4-8.4L0 12l9.6-3.6z" />
  </svg>
)

export default function Marquee({ items, reverse = false, speed = 'normal', separator, className = '' }: MarqueeProps) {
  const sep = separator ?? <Star />
  const animClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'slow'
      ? 'animate-marquee-slow'
      : 'animate-marquee'

  // duplicate the list so the loop is seamless (-50% translate)
  const loop = [...items, ...items]

  return (
    <div className={`marquee-mask overflow-hidden ${className}`}>
      <div className={`marquee-track ${animClass}`}>
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-8 md:gap-12 pr-8 md:pr-12">
            <span className="font-display font-bold uppercase tracking-tight text-cream/90 whitespace-nowrap text-3xl md:text-5xl lg:text-6xl">
              {item}
            </span>
            {sep}
          </div>
        ))}
      </div>
    </div>
  )
}
