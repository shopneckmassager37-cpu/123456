import { useEffect, useRef, useState } from 'react'

type Props = {
  src: string
  alt: string
  /** Domain shown if the screenshot can't be fetched. */
  fallbackLabel: string
  className?: string
  /** Intrinsic size — reserves the box so the layout doesn't shift on load. */
  width?: number
  height?: number
  /** Above-the-fold images should load eagerly. */
  eager?: boolean
}

type State = 'loading' | 'ok' | 'error'

/**
 * Project screenshots come from a remote screenshot service, so they can be
 * slow or fail outright. This keeps the card intact either way: the box is
 * reserved up front, the image fades in when it lands, and a failure falls
 * back to a labelled panel instead of a broken-image icon.
 */
export default function ProjectImage({
  src,
  alt,
  fallbackLabel,
  className = '',
  width = 1280,
  height = 720,
  eager = false,
}: Props) {
  const [state, setState] = useState<State>('loading')
  const ref = useRef<HTMLImageElement>(null)

  // A cached image can finish before React attaches the handlers below.
  useEffect(() => {
    const el = ref.current
    if (el?.complete) setState(el.naturalWidth > 0 ? 'ok' : 'error')
  }, [])

  if (state === 'error') {
    return (
      <div
        role="img"
        aria-label={alt}
        className="relative w-full h-full flex flex-col items-center justify-center gap-3 bg-s2 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'radial-gradient(circle, #EDEAE3 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />
        <svg className="relative w-8 h-8 text-cream/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918" />
        </svg>
        <span className="relative text-cream/50 text-xs font-mono tracking-wide">{fallbackLabel}</span>
      </div>
    )
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onLoad={() => setState('ok')}
      onError={() => setState('error')}
      className={`${className} transition-opacity duration-500 ${state === 'ok' ? 'opacity-100' : 'opacity-0'}`}
    />
  )
}
