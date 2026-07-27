import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'What I Do', path: '/what-i-do' },
  { label: 'My Work',   path: '/work'      },
  { label: 'About',     path: '/about'     },
]

const LOGO_URL = 'https://media.base44.com/images/public/69c17515a2c757d1070710f1/0c8a8e3df_2026-05-27193417.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-cream/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            aria-label="dandev home"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src={LOGO_URL}
              alt="dandev logo"
              width={36}
              height={36}
              decoding="async"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-display text-base font-bold tracking-tight text-cream hidden sm:block">
              DAN<span className="text-accent">DEV</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map(({ label, path }, i) => (
              <Link
                key={path}
                to={path}
                className={`link-underline text-sm font-medium tracking-wide transition-colors duration-200 ${
                  location.pathname === path ? 'text-cream' : 'text-cream/50 hover:text-cream'
                }`}
              >
                <span className="text-accent/60 text-[10px] mr-1.5 section-index align-top">0{i + 1}</span>
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-6 py-2.5 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim active:scale-95 transition-all duration-200"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-cream/5 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-[1.5px] bg-cream rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-cream rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-cream rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#0A0A0A] flex flex-col justify-center transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-8 flex flex-col">
          {[{ label: 'Home', path: '/' }, ...NAV_LINKS].map(({ label, path }, i) => (
            <Link
              key={path}
              to={path}
              className={`flex items-baseline gap-4 text-5xl font-display font-bold py-4 transition-all duration-300 border-b border-cream/[0.07] ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0'
              } ${location.pathname === path ? 'text-cream' : 'text-cream/55 hover:text-cream'}`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              <span className="text-accent/50 text-base section-index">0{i + 1}</span>
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`mt-10 w-full py-5 bg-accent text-[#0A0A0A] font-semibold text-lg rounded-full text-center transition-all duration-300 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
            style={{ transitionDelay: menuOpen ? '380ms' : '0ms' }}
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  )
}
