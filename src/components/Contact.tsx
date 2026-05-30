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
  { label: '🌐 Web App',    value: 'Web Development Project' },
  { label: '📱 Mobile App', value: 'Mobile App Development'  },
  { label: '💬 Other',      value: 'Other'                   },
]

const API_ENDPOINT = 'https://app-070710f1.base44.app/functions/saveMessage'

export default function Contact() {
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

  const inputBase   = 'w-full bg-[#0D0D0D] border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all duration-200 focus:ring-1'
  const inputNormal = `${inputBase} border-white/10 focus:border-accent/50 focus:ring-accent/20 hover:border-white/20`
  const inputError  = `${inputBase} border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20`

  return (
    <section id="contact" className="relative bg-[#0A0A0A] py-32 overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-accent/6 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />

      <div className="max-w-3xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Get In Touch
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-5 leading-tight">
            Let's build something<br />
            <span className="gradient-text">great together.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Have a project in mind? Whether it's a web app, a mobile product,
            or an idea you want to bring to life — I'd love to hear about it.
          </p>

          {/* Trust row */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/35">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-dot-pulse" />
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Reply within 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
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
            <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">
              Thanks for reaching out. I'll get back to you within 24 hours.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 px-6 py-2.5 border border-white/10 text-white/60 text-sm rounded-full hover:border-white/25 hover:text-white transition-all"
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
                <label className="block text-white/45 text-xs font-medium mb-3 uppercase tracking-wider">
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
                          : 'border-white/10 text-white/40 hover:border-white/25 hover:text-white/70'
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
                  <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Name</label>
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
                  <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Email</label>
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
                <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">
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

              <p className="text-center text-white/20 text-xs">
                No spam, no commitment. Just a conversation.
              </p>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}
