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

const API_ENDPOINT =  + API_URL + 

export default function Contact() {
  const [form, setForm]     = useState<FormState>({ name: '', email: '', subject: '', message: '' })
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputBase   = 'w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all duration-200 focus:ring-1'
  const inputNormal = `${inputBase} border-white/10 focus:border-accent/50 focus:ring-accent/20`
  const inputError  = `${inputBase} border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20`

  return (
    <section id="contact" className="relative bg-[#0A0A0A] py-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="inline-block text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-4">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight mb-5 leading-tight">
            Let's build something<br />
            <span className="text-accent">great together.</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed max-w-xl mx-auto">
            Have a project in mind? Whether it's a web app, a mobile product,
            or an idea you want to bring to life — I'd love to hear about it.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-accent/20 bg-surface p-14 gap-5">
            <div className="w-14 h-14 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center">
              <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 className="font-display text-2xl font-bold text-white">Message Sent!</h3>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">Thanks for reaching out. I'll get back to you within 24 hours.</p>
            <button onClick={() => setStatus('idle')} className="mt-2 px-6 py-2.5 border border-white/10 text-white/60 text-sm rounded-full hover:border-white/25 hover:text-white transition-all">
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-white/8 bg-surface p-8 md:p-10 flex flex-col gap-5">
            {status === 'error' && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                Something went wrong. Please try again.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Daniel" className={errors.name ? inputError : inputNormal} />
                {errors.name && <p className="mt-1.5 text-red-400 text-xs">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="daniel@example.com" className={errors.email ? inputError : inputNormal} />
                {errors.email && <p className="mt-1.5 text-red-400 text-xs">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Subject</label>
              <select name="subject" value={form.subject} onChange={handleChange} className={errors.subject ? inputError : inputNormal}>
                <option value="">Select a subject…</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              {errors.subject && <p className="mt-1.5 text-red-400 text-xs">{errors.subject}</p>}
            </div>
            <div>
              <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project…" rows={5} className={`${errors.message ? inputError : inputNormal} resize-none`} />
              {errors.message && <p className="mt-1.5 text-red-400 text-xs">{errors.message}</p>}
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full py-3.5 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim hover:shadow-[0_0_28px_rgba(212,168,83,0.3)] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Sending…
                </>
              ) : 'Send Message →'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
