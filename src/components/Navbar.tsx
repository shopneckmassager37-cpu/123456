import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'What I Do', path: '/what-i-do' },
  { label: 'My Work',   path: '/work'      },
  { label: 'About',     path: '/about'     },
]

const LOGO_URL = 'https://media.base44.com/images/public/69c17515a2c757d1070710f1/0c8a8e3df_2026-05-27193417.png'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

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
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            aria-label="dandev home"
            className="flex items-center gap-2.5 hover:opacity-85 transition-opacity"
          >
            <img
              src={LOGO_URL}
              alt="dandev logo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="font-display text-sm font-bold tracking-wide text-white hidden sm:block">
              DAN_DEV
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  location.pathname === path
                    ? 'text-white bg-white/8'
                    : 'text-white/55 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 px-5 py-2 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(212,168,83,0.25)]"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-center transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-8 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, path }, i) => (
            <Link
              key={path}
              to={path}
              className={`text-left text-4xl font-display font-bold py-3 hover:text-white transition-all duration-200 border-b border-white/5 last:border-0 ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              } ${location.pathname === path ? 'text-white' : 'text-white/40'}`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={`mt-8 w-full py-4 bg-accent text-[#0A0A0A] font-semibold text-lg rounded-full hover:bg-accent-dim active:scale-95 transition-all duration-200 text-center ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '280ms' : '0ms' }}
          >
            Let's Talk
          </Link>
        </div>
      </div>
    </>
  )
}
