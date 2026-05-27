const NAV = ['Work', 'Expertise', 'Contact']

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <button
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="font-display text-base font-bold text-white/60 hover:text-white transition-colors"
        >
          dan<span className="text-accent">dev</span>
        </button>

        {/* Nav */}
        <div className="flex items-center gap-6">
          {NAV.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-white/35 hover:text-white text-sm font-medium transition-colors"
            >
              {item}
            </button>
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
