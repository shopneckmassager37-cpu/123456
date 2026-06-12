import { useRef, MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type CommonProps = {
  children: ReactNode
  className?: string
  variant?: 'fill' | 'outline'
  strength?: number
}

type AsLink = CommonProps & { to: string; href?: never; onClick?: never }
type AsAnchor = CommonProps & { href: string; to?: never; onClick?: never; target?: string; rel?: string }
type AsButton = CommonProps & { onClick: () => void; to?: never; href?: never }

type MagneticButtonProps = AsLink | AsAnchor | AsButton

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform'

const variants = {
  fill: 'bg-accent text-[#0A0A0A] hover:bg-accent-dim',
  outline: 'border border-cream/20 text-cream hover:border-cream/50 hover:bg-cream/5',
}

export default function MagneticButton(props: MagneticButtonProps) {
  const { children, className = '', variant = 'fill', strength = 0.35 } = props
  const ref = useRef<HTMLSpanElement>(null)

  const handleMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const handleLeave = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  const inner = <span className="relative z-10 flex items-center gap-2.5">{children}</span>
  const cls = `${base} ${variants[variant]} ${className}`
  const wrapStyle = { transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)' }

  if ('to' in props && props.to) {
    return (
      <span ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block" style={wrapStyle}>
        <Link to={props.to} className={cls}>{inner}</Link>
      </span>
    )
  }

  if ('href' in props && props.href) {
    return (
      <span ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block" style={wrapStyle}>
        <a href={props.href} target={props.target} rel={props.rel} className={cls}>{inner}</a>
      </span>
    )
  }

  return (
    <span ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className="inline-block" style={wrapStyle}>
      <button onClick={(props as AsButton).onClick} className={cls}>{inner}</button>
    </span>
  )
}
