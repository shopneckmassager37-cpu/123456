import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Work',      id: 'work'      },
  { label: 'Expertise', id: 'expertise' },
  { label: 'Contact',   id: 'contact'   },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (id: string) => {
    setMenuOpen(false)
    setTimeout(() => scrollTo(id), menuOpen ? 300 : 0)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_0_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display text-lg font-bold tracking-tight text-white hover:opacity-80 transition-opacity"
            aria-label="dandev home"
          >
            dan<span className="text-accent">dev</span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className="px-4 py-2 text-sm font-medium text-white/55 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="ml-3 px-5 py-2 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim active:scale-95 transition-all duration-200 shadow-[0_0_20px_rgba(212,168,83,0.25)]"
            >
              Let's Talk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-200 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 origin-center ${
                menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-[#0A0A0A]/98 backdrop-blur-2xl flex flex-col justify-center transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-8 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, id }, i) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`text-left text-4xl font-display font-bold py-3 text-white/40 hover:text-white transition-all duration-200 border-b border-white/5 last:border-0 ${
                menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: menuOpen ? `${i * 60 + 100}ms` : '0ms' }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('contact')}
            className={`mt-8 w-full py-4 bg-accent text-[#0A0A0A] font-semibold text-lg rounded-full hover:bg-accent-dim active:scale-95 transition-all duration-200 ${
              menuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDelay: menuOpen ? '280ms' : '0ms' }}
          >
            Let's Talk
          </button>
        </div>
      </div>
    </>
  )
}
