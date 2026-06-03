import { Link } from 'react-router-dom'

const NAV = [
  { label: 'Home',       path: '/'          },
  { label: 'What I Do',  path: '/what-i-do' },
  { label: 'My Work',    path: '/work'      },
  { label: 'About',      path: '/about'     },
  { label: 'Contact',    path: '/contact'   },
]

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="font-display text-base font-bold text-white/60 hover:text-white transition-colors"
        >
          dan<span className="text-accent">dev</span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {NAV.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="text-white/35 hover:text-white text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} dandev · Daniel
        </p>
      </div>
    </footer>
  )
}
