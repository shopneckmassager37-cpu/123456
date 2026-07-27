import { useState, FormEvent } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type FormState = {
  name:    string
  email:   string
  subject: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  { label: '🌐 Website',    value: 'Web Development Project' },
  { label: '⚡ Web App',    value: 'Web App Development'      },
  { label: '💬 Other',      value: 'Other'                   },
]

const API_ENDPOINT = '/api/contact'

export default function Contact({ index = '01' }: { index?: string }) {
  const sectionRef = useScrollReveal()

  const [form, setForm]     = useState<FormState>({ name: '', email: '', subject: 'Web Development Project', message: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!form.name.trim())    next.name    = 'Name is required.'
    if (!form.email.trim())   next.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              next.email   = 'Enter a valid email address.'
    if (!form.message.trim()) next.message = 'Tell me about your project.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: 'Web Development Project', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase   = 'w-full bg-[#0D0D0D] border rounded-xl px-4 py-3 text-cream placeholder-cream/50 text-sm outline-none transition-all duration-200 focus:ring-1'
  const inputNormal = `${inputBase} border-cream/10 focus:border-accent/50 focus:ring-accent/20 hover:border-cream/20`
  const inputError  = `${inputBase} border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20`

  return (
    <section id="contact" className="relative bg-[#0D0D0D] py-28 md:py-36 overflow-hidden" ref={sectionRef}>
      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="section-index text-accent text-sm font-semibold tracking-widest">({index})</span>
            <span className="w-8 h-px bg-accent/40" />
            <span className="text-cream/60 text-xs font-semibold tracking-[0.2em] uppercase">Get In Touch</span>
          </div>
          <h2 className="display-lg font-display font-bold text-cream mb-6 leading-tight">
            Let's build something<br />
            great together.
          </h2>
          <p className="text-cream/60 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Have a project in mind? Whether it's a simple website, a full web app,
            or an idea you want to bring to life — I'd love to hear about it.
          </p>

          {/* Email direct */}
          <div className="mb-6">
            <a
              href="mailto:danielgitlin2011@gmail.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-accent/30 bg-accent/8 text-accent text-sm font-semibold hover:bg-accent/15 hover:border-accent/50 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              danielgitlin2011@gmail.com
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/55">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-pulse" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Reply within 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cream/40" />
              No obligation
            </span>
          </div>
        </div>

        {/* Form card */}
        {status === 'success' ? (
          <div className="reveal reveal-scale flex flex-col items-center justify-center text-center rounded-2xl border border-accent/25 bg-surface p-14 gap-5">
            <div className="w-16 h-16 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-cream">Message Sent!</h3>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 px-6 py-2.5 border border-cream/10 text-cream/60 text-sm rounded-full hover:border-cream/25 hover:text-cream transition-all"
            >
              Send another message
            </button>
          </div>
        ) : (
          <div className="reveal glow-card">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="p-8 md:p-10 flex flex-col gap-5"
            >
              {status === 'error' && (
                <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  Something went wrong. Please try again.
                </div>
              )}

              {/* Subject pills */}
              <div>
                <label className="block text-cream/60 text-xs font-medium mb-3 uppercase tracking-wider">
                  What can I help with?
                </label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(({ label, value }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, subject: value }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                        form.subject === value
                          ? 'bg-accent/15 border-accent/50 text-accent'
                          : 'border-cream/10 text-cream/60 hover:border-cream/25 hover:text-cream/70'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-cream/60 text-xs font-medium mb-2 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className={errors.name ? inputError : inputNormal}
                  />
                  {errors.name && <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-cream/60 text-xs font-medium mb-2 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={errors.email ? inputError : inputNormal}
                  />
                  {errors.email && <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-cream/60 text-xs font-medium mb-2 uppercase tracking-wider">
                  Tell me about your project
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What are you building? What's the goal? Any timeline or budget in mind?"
                  rows={5}
                  className={`${errors.message ? inputError : inputNormal} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-red-400 text-xs">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-accent text-[#0A0A0A] text-sm font-bold rounded-full hover:bg-accent-dim hover:shadow-[0_0_36px_rgba(212,168,83,0.4)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send Message — It\'s Free →'
                )}
              </button>

              <p className="text-center text-cream/50 text-xs">
                No spam, no commitment. Just a conversation.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
