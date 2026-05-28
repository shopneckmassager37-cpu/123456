import { useState, useEffect } from 'react'

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  created_date: string
}

const API_BASE = 'https://app-070710f1.base44.app'

export default function Admin() {
  const [messages, setMessages]   = useState<Message[]>([])
  const [loading, setLoading]     = useState(true)
  const [selected, setSelected]   = useState<Message | null>(null)
  const [password, setPassword]   = useState('')
  const [authed, setAuthed]       = useState(false)
  const [pwError, setPwError]     = useState(false)

  const ADMIN_PASS = 'dandev2024'

  const login = () => {
    if (password === ADMIN_PASS) {
      setAuthed(true)
      setPwError(false)
    } else {
      setPwError(true)
    }
  }

  useEffect(() => {
    if (!authed) return
    fetch(`${API_BASE}/functions/getMessages`)
      .then(r => r.json())
      .then(data => {
        setMessages(data.messages || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [authed])

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-surface p-8 flex flex-col gap-5">
          <div className="text-center">
            <div className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">Admin Panel</div>
            <h2 className="font-display text-2xl font-bold text-white">Sign In</h2>
          </div>
          <div>
            <label className="block text-white/45 text-xs font-medium mb-2 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setPwError(false) }}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Enter admin password"
              className={`w-full bg-[#0A0A0A] border rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm outline-none transition-all focus:ring-1 ${pwError ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-accent/50 focus:ring-accent/20'}`}
            />
            {pwError && <p className="mt-1.5 text-red-400 text-xs">Incorrect password.</p>}
          </div>
          <button onClick={login} className="w-full py-3 bg-accent text-[#0A0A0A] font-semibold rounded-full hover:bg-accent-dim transition-all">
            Enter
          </button>
        </div>
      </div>
    )
  }

  const unread = messages.filter(m => !m.read).length

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-2 block">Admin</span>
            <h1 className="font-display text-4xl font-bold text-white">Inbox</h1>
          </div>
          <div className="flex items-center gap-3">
            {unread > 0 && (
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold border border-accent/30">
                {unread} unread
              </span>
            )}
            <span className="text-white/30 text-sm">{messages.length} total</span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <svg className="animate-spin w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-32 text-white/30">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg">No messages yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* List */}
            <div className="flex flex-col gap-3">
              {messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`text-left rounded-xl border p-5 transition-all duration-200 ${selected?.id === msg.id ? 'border-accent/40 bg-accent/5' : 'border-white/8 bg-surface hover:border-white/15'}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                      <span className="font-semibold text-white text-sm">{msg.name}</span>
                    </div>
                    <span className="text-white/25 text-xs flex-shrink-0">
                      {new Date(msg.created_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-accent text-xs mb-1">{msg.subject}</div>
                  <div className="text-white/40 text-sm truncate">{msg.message}</div>
                  <div className="text-white/25 text-xs mt-1">{msg.email}</div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:sticky lg:top-20 lg:self-start">
              {selected ? (
                <div className="rounded-2xl border border-white/10 bg-surface p-7">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display text-xl font-bold text-white">{selected.subject}</h3>
                    <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white transition-colors text-lg">✕</button>
                  </div>
                  <div className="flex flex-col gap-2 mb-6 pb-6 border-b border-white/8">
                    <div className="flex gap-2 text-sm"><span className="text-white/40 w-16">From</span><span className="text-white">{selected.name}</span></div>
                    <div className="flex gap-2 text-sm"><span className="text-white/40 w-16">Email</span><a href={`mailto:${selected.email}`} className="text-accent hover:underline">{selected.email}</a></div>
                    <div className="flex gap-2 text-sm"><span className="text-white/40 w-16">Date</span><span className="text-white/60">{new Date(selected.created_date).toLocaleString()}</span></div>
                  </div>
                  <p className="text-white/70 leading-relaxed text-sm whitespace-pre-wrap">{selected.message}</p>
                  <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-[#0A0A0A] text-sm font-semibold rounded-full hover:bg-accent-dim transition-all">
                    Reply via Email
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  </a>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/8 p-7 text-center text-white/25">
                  <div className="text-4xl mb-3">👈</div>
                  <p>Select a message to read it</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
