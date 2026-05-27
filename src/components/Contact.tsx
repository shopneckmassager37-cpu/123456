import { useState, FormEvent } from 'react'

type FormState = {
  name:    string
  email:   string
  subject: string
  message: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const SUBJECTS = [
  'Web Development Project',
  'Mobile App Development',
  'General Inquiry',
  'Other',
]

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<FormState>>({})

  const validate = (): boolean => {
    const next: Partial<FormState> = {}
    if (!form.name.trim())    next.name    = 'Name is required.'
    if (!form.email.trim())   next.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              next.email   = 'Enter a valid email address.'
    if (!form.subject)        next.subject = 'Please select a subject.'
    if (!form.message.trim()) next.message = 'Message is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('loading')
    // Client-side mock — wire to your backend / email service here
    setTimeout(() => {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1200)
  }

  const inputBase =
    'w-full bg-surface border rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm outline-none transition-all duration-200 focus:ring-1'
  const inputNormal = `${inputBase} border-white/10 focus:border-accent/50 focus:ring-accent/20`
  const inputError  = `${inputBase} border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20`

  return (
    <section id="contact" className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — info */}
          <div className="flex flex-col justify-center">
            <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              Let's build something<br />
              <span className="text-accent">great together.</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-12">
              Have a project in mind? Whether it's a web app, a mobile product,
              or an idea you want to turn into reality — I'd love to hear about it.
            </p>

            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mb-0.5">Email</div>
                  <a
                    href="mailto:daniel@dandev.io"
                    className="text-white text-sm font-medium hover:text-accent transition-colors"
                  >
                    daniel@dandev.io
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/50 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mb-0.5">LinkedIn</div>
                  <a
                    href="https://linkedin.com/in/dandev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white text-sm font-medium hover:text-accent transition-colors"
                  >
                    linkedin.com/in/dandev
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center rounded-2xl border border-accent/20 bg-surface p-12 gap-5">
                <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
                <p className="text-white/45 text-sm leading-relaxed max-w-xs">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 border border-white/10 text-white/60 text-sm rounded-full hover:border-white/25 hover:text-white transition-all"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-white/8 bg-surface p-8 flex flex-col gap-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Daniel"
                      className={errors.name ? inputError : inputNormal}
                    />
                    {errors.name && <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={errors.email ? inputError : inputNormal}
                    />
                    {errors.email && <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`${errors.subject ? inputError : inputNormal} appearance-none`}
                  >
                    <option value="" disabled>Select a topic…</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s} className="bg-surface text-white">{s}</option>
                    ))}
                  </select>
                  {errors.subject && <p className="mt-1.5 text-red-400 text-xs">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project…"
                    className={`${errors.message ? inputError : inputNormal} resize-none`}
                  />
                  {errors.message && <p className="mt-1.5 text-red-400 text-xs">{errors.message}</p>}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 bg-accent text-[#0A0A0A] font-semibold rounded-xl hover:bg-accent-dim hover:shadow-[0_0_24px_rgba(212,168,83,0.3)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
