const PROJECTS = [
  {
    id:          'chefaleh',
    category:    'Web Development',
    title:       'Chefaleh — Miami Catering',
    description:
      'A high-end catering service website built for a Miami-based brand. Warm, premium aesthetic with a focus on showcasing the menu, driving bookings, and converting high-value clients. Built from design to live deployment.',
    tags:        ['React', 'Tailwind CSS', 'Luxury Brand', 'Responsive'],
    liveUrl:     'https://www.chefaleh.com',
    cta:         'View Live Site',
    badge:       null,
    imgAlt:      'Chefaleh catering website — desktop browser mockup showing the homepage',
    imgHint:     '1600×900 · browser mockup · chefaleh.com homepage screenshot',
    accent:      true,
    reverse:     false,
  },
  {
    id:          'mobile-app',
    category:    'Mobile App Development',
    title:       'Mobile App — In Launch',
    description:
      'A custom mobile application currently being launched to the App Store and Google Play. Built with React Native for a seamless cross-platform experience, with a polished UI and real-world production architecture.',
    tags:        ['React Native', 'iOS & Android', 'Cross-Platform', 'In Launch'],
    liveUrl:     null,
    cta:         null,
    badge:       'Coming to App Stores',
    imgAlt:      'Mobile app — iPhone mockup showing the app interface',
    imgHint:     '800×1600 · phone mockup · mobile app screenshot',
    accent:      false,
    reverse:     true,
  },
]

export default function Work() {
  return (
    <section id="work" className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Selected Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Products I've Built
          </h2>
          <p className="text-white/40 text-lg max-w-xl leading-relaxed">
            Real projects, shipped to production. From concept to launch.
          </p>
        </div>

        {/* Project cards */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project) => (
            <article
              key={project.id}
              className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                project.accent
                  ? 'border-accent/20 bg-gradient-to-br from-surface to-[#0A0A0A]'
                  : 'border-white/8 bg-surface'
              } hover:border-white/15`}
            >
              {/* Glow for accent card */}
              {project.accent && (
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
              )}

              <div className={`flex flex-col ${project.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

                {/* Image pane */}
                <div className="lg:w-3/5 relative overflow-hidden bg-s3 min-h-[260px] sm:min-h-[320px] lg:min-h-[420px]">
                  <img
                    src="https://placehold.co/1200x800/1a1a1a/333333?text=Your+Screenshot+Here"
                    alt={project.imgAlt}
                    title={`Replace with: ${project.imgHint}`}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category badge overlay */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      project.accent
                        ? 'bg-accent/20 text-accent border border-accent/30'
                        : 'bg-white/10 text-white/70 border border-white/15'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content pane */}
                <div className="lg:w-2/5 flex flex-col justify-between p-8 lg:p-12">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-white/50 text-base leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-10">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(212,168,83,0.35)] active:scale-95 transition-all duration-200"
                      >
                        {project.cta}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                    )}
                    {project.badge && (
                      <span className="inline-flex items-center gap-2 px-6 py-3 border border-white/12 text-white/50 text-sm font-medium rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        {project.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
