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
    <footer className="relative bg-[#0A0A0A] border-t border-cream/[0.07] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-20 pb-10">

        {/* Big CTA */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 pb-16">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase">Let's work together</span>
            <Link to="/contact" className="block mt-5 group">
              <h2 className="display-xl font-display font-bold text-cream leading-none">
                Got a project?
                <span className="block text-outline group-hover:text-cream transition-colors duration-500">Let's talk.</span>
              </h2>
            </Link>
          </div>

          <a
            href="mailto:danielgitlin2011@gmail.com"
            className="link-underline text-cream/60 hover:text-cream text-lg md:text-xl font-medium transition-colors duration-200 whitespace-nowrap"
          >
            danielgitlin2011@gmail.com
          </a>
        </div>

        <div className="hairline-solid" />

        {/* bottom row */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display text-base font-bold text-cream/60 hover:text-cream transition-colors">
            DAN<span className="text-accent">DEV</span>
          </Link>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            {NAV.map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="link-underline text-cream/40 hover:text-cream text-sm font-medium transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          <p className="text-cream/25 text-xs tracking-wide">
            © {new Date().getFullYear()} dandev · Daniel
          </p>
        </div>
      </div>
    </footer>
  )
}
