import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, MicOff, Bot, User, ChevronDown, Sparkles } from 'lucide-react'

const AI_RESPONSES = {
  greet: [
    "Hello! I'm your NM AI Assistant. Ask me about job recommendations, skill gaps, events, certificates, or anything about NM MicroLearn!"
  ],
  jobs: [
    "Based on your 3 certificates (UI/UX, React Dashboard, Python Scraper), your top matches are:\n\n• Full Stack Developer at Zoho — 82% match, ₹6–12 LPA\n• UI/UX Designer at Freshworks — 78% match, ₹5–9 LPA\n• Backend Developer at HealthConnect — 71% match, ₹5–10 LPA\n\nWould you like details on any role?"
  ],
  skills: [
    "Your current skill stack has 10 verified skills:\nReact.js, JavaScript, HTML5/CSS3, REST API, Python, Figma, UI/UX, Responsive Design, Pandas, Node.js\n\nTop gaps to close:\n• MongoDB — bridges 3 more job matches\n• TypeScript — needed for 4 senior roles\n• Docker — DevOps roles require this"
  ],
  events: [
    "Upcoming TN Skill Events:\n\n• LIVE — AI & ML Bootcamp, Sep 5, Chennai\n• Sep 12 — Full Stack Hackathon, Coimbatore (Register by Sep 8)\n• Sep 18 — TNSDC Career Fair, Chennai (500+ companies)\n• Oct 3 — IoT Innovation Challenge (₹50,000 prize)\n\nShall I register you for any?"
  ],
  certificates: [
    "You have 3 NM-verified certificates with 24 NM Credits:\n\n• Mobile App UI/UX Design — PayU India — 5.0 rating\n• E-Commerce React Dashboard — Zoho Corp — 4.9 rating\n• Python Web Scraper — DataMinds — 4.8 rating\n\nYou need 6 more credits to reach Gold Level!"
  ],
  projects: [
    "Top Projects for You Right Now:\n\n1. Analytics Dashboard — Zoho Corp (React, MongoDB) — ₹8,000\n2. AI Chatbot Integration — Freshworks (Python, NLP) — ₹6,500\n3. IoT Dashboard — Hexaware (Node.js, React) — ₹7,000\n\nProject #1 has a 96% skill match with your profile!"
  ],
  credits: [
    "Your NM Credit status:\n\nCurrent: 24 credits (Silver Level)\nGold Level requires: 30 credits\nNeeded: 6 more credits\n\nAt Gold Level you get priority review by companies and a TNSDC Gold Badge!"
  ],
  company: [
    "For companies, NM MicroLearn offers:\n\n• Post micro-projects (4-8 week durations)\n• AI-powered student screening\n• Issue QR-verified certificates\n• Direct placement pipeline from Tamil Nadu's top colleges"
  ],
  college: [
    "College portal features:\n\n• Track student NM credit accumulation\n• One-click TNSDC compliance reports\n• Monitor completion rates by department\n• Approve credits for TNSDC submission"
  ],
  fallback: [
    "I can help with:\n• Job recommendations based on your certificates\n• Skill gap analysis\n• Upcoming TN Skill events\n• NM credit tracking\n• Project recommendations\n\nTry: 'What jobs suit me?' or 'Show upcoming events'"
  ]
}

function getAIResponse(msg) {
  const m = msg.toLowerCase()
  if (m.match(/hi|hello|hey|namaste|start/)) return AI_RESPONSES.greet
  if (m.match(/job|role|career|salary|hire|placement|work|recommend/)) return AI_RESPONSES.jobs
  if (m.match(/skill|gap|learn|missing|need|knowledge|improve/)) return AI_RESPONSES.skills
  if (m.match(/event|hackathon|bootcamp|fair|tn skill|compet/)) return AI_RESPONSES.events
  if (m.match(/certif|badge|award|credential|verify/)) return AI_RESPONSES.certificates
  if (m.match(/project|task|apply|stipend|browse/)) return AI_RESPONSES.projects
  if (m.match(/credit|point|xp|level|gold|silver/)) return AI_RESPONSES.credits
  if (m.match(/company|business|recruit|hire|employer/)) return AI_RESPONSES.company
  if (m.match(/college|university|institution|campus/)) return AI_RESPONSES.college
  return AI_RESPONSES.fallback
}

function TypingDots() {
  return (
    <div className="flex gap-1 px-3 py-2">
      {[0, 0.15, 0.3].map((d, i) => (
        <motion.span key={i} className="w-2 h-2 rounded-full bg-violet-400"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.7, delay: d }} />
      ))}
    </div>
  )
}

const QUICK = ['Jobs for me', 'My skill gaps', 'TN events', 'NM credits']

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { role: 'ai', text: "Hi! I'm your NM AI Assistant. Ask me about jobs, skills, events, or certificates!" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [unread, setUnread] = useState(1)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  const send = (text) => {
    const t = (text || input).trim()
    if (!t) return
    setMsgs(p => [...p, { role: 'user', text: t }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const res = getAIResponse(t)
      const reply = res[Math.floor(Math.random() * res.length)]
      setMsgs(p => [...p, { role: 'ai', text: reply }])
      setTyping(false)
      if ('speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(reply.replace(/\n•/g, ',').substring(0, 160))
        u.rate = 1.0; u.lang = 'en-IN'
        window.speechSynthesis.speak(u)
      }
    }, 700 + Math.random() * 500)
  }

  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    if (listening) { setListening(false); return }
    const r = new SR(); r.lang = 'en-IN'; r.interimResults = false
    setListening(true)
    r.start()
    r.onresult = e => { setListening(false); send(e.results[0][0].transcript) }
    r.onerror = r.onend = () => setListening(false)
  }

  return (
    <>
      {/* ── TEXT CHAT BUTTON (bottom-right) ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-[#0F0A1E] border border-violet-500/30 text-violet-300 text-xs rounded-xl px-3 py-2 shadow-xl max-w-[180px]">
              Chat with AI Assistant ✨
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(o => !o); setUnread(0) }}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-outfit font-bold text-sm shadow-2xl transition-all duration-300
            ${open
              ? 'bg-white/10 border border-white/15 text-white backdrop-blur-xl'
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-violet-500/40 hover:shadow-violet-500/60'}`}
        >
          {open ? (
            <><ChevronDown size={16} /> Close Chat</>
          ) : (
            <><Sparkles size={16} /> Chat with AI {unread > 0 && <span className="w-4 h-4 rounded-full bg-red-500 text-[9px] font-black flex items-center justify-center">{unread}</span>}</>
          )}
        </motion.button>
      </div>

      {/* ── CHAT PANEL ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-[74px] right-6 z-50 w-[360px] h-[500px] rounded-3xl bg-[#0D0818] border border-white/10 shadow-2xl shadow-black/70 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-900/80 to-indigo-900/80 border-b border-white/8 px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-outfit font-bold text-white text-sm leading-none">NM AI Assistant</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[10px] font-semibold">Live · Voice enabled</span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0
                    ${m.role === 'user' ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-gradient-to-br from-violet-600 to-pink-500'}`}>
                    {m.role === 'user' ? <User size={10} className="text-white" /> : <Bot size={10} className="text-white" />}
                  </div>
                  <div className={`max-w-[82%] px-3 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap
                    ${m.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm'
                      : 'bg-white/8 border border-white/8 text-white/80 rounded-bl-sm'}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                    <Bot size={10} className="text-white" />
                  </div>
                  <div className="bg-white/8 border border-white/8 rounded-2xl rounded-bl-sm">
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)}
                  className="flex-shrink-0 text-[10px] text-white/40 border border-white/10 rounded-full px-2.5 py-1 hover:border-violet-500/40 hover:text-violet-300 transition-all whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3">
              <div className={`flex items-center gap-2 bg-white/5 border rounded-2xl px-3 py-2.5 transition-all
                ${listening ? 'border-red-500/50' : 'border-white/10 focus-within:border-violet-500/40'}`}>
                <input ref={inputRef} value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                  placeholder={listening ? 'Listening...' : 'Ask about jobs, skills, events...'}
                  className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder-white/20" />
                <button onClick={toggleVoice}
                  className={`p-1.5 rounded-xl transition-all ${listening ? 'bg-red-500 text-white animate-pulse' : 'text-white/25 hover:text-white/55 hover:bg-white/5'}`}>
                  {listening ? <MicOff size={14} /> : <Mic size={14} />}
                </button>
                <button onClick={() => send()}
                  disabled={!input.trim()}
                  className="p-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white disabled:opacity-30 hover:shadow-lg transition-all">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
