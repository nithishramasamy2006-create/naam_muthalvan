import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Mic, MicOff, Volume2, VolumeX, Bot, User, ChevronDown, Sparkles, Zap } from 'lucide-react'

// ─────────────────────────────────────────────
// FREE API: Google Gemini 2.0 Flash (free tier)
// Get your free key at: https://aistudio.google.com/app/apikey
// ─────────────────────────────────────────────
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyDemo_Replace_With_Your_Free_Key'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `You are NM AI Assistant — the official smart assistant for Naan Muthalvan MicroLearn platform by TNSDC (Tamil Nadu Skill Development Corporation).

Your role is to help students, companies, and college admins with:
- AI-powered job recommendations based on certificates and skills
- Skill gap analysis and learning pathways
- NM Credit tracking (Bronze 0-9, Silver 10-29, Gold 30+)
- TN Skill Events: bootcamps, hackathons, career fairs
- Project applications and status
- Certificate verification and issuance
- TNSDC compliance for colleges
- Company onboarding and project posting

Always be helpful, concise, and encouraging. Use bullet points for lists. Mention Tamil Nadu context where relevant. If you don't know something specific, guide users to the relevant portal section. Keep responses under 200 words.`

async function callGemini(messages) {
  const contents = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'model',
    parts: [{ text: m.text }]
  }))

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
    })
  })

  if (!res.ok) throw new Error(`API error ${res.status}`)
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'I had trouble connecting. Please try again!'
}

// Fallback when API key not set
const FALLBACK_RESPONSES = {
  default: `I'm your NM AI Assistant! 🎓\n\nI can help with:\n• 💼 Job recommendations from your certificates\n• 📊 Skill gap analysis\n• 🏆 NM Credit tracking\n• 🎯 TN Skill events & hackathons\n• 📜 Certificate status\n\nSet VITE_GEMINI_API_KEY in your .env for real AI responses!\n\nFor now, try: "What jobs suit me?" or "Show my skill gaps"`
}

// ─── Twinkling Stars Canvas ───
function StarField({ active }) {
  const stars = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 2,
    duration: 1.2 + Math.random() * 1.5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
      {stars.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={active ? {
            opacity: [0, 1, 0.3, 1, 0],
            scale: [0.5, 1.4, 0.8, 1.2, 0.5],
          } : { opacity: [0, 0.6, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ─── Orbital Ring ───
function OrbitalRing({ active }) {
  return (
    <motion.div
      className="absolute inset-[-6px] rounded-full border border-violet-400/30"
      animate={active ? { rotate: 360, scale: [1, 1.06, 1] } : { rotate: 360 }}
      transition={{ rotate: { duration: 4, repeat: Infinity, ease: 'linear' }, scale: { duration: 2, repeat: Infinity } }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/60" />
    </motion.div>
  )
}

// ─── Typing Indicator ───
function TypingDots() {
  return (
    <div className="flex gap-1.5 px-4 py-3">
      {[0, 0.18, 0.36].map((d, i) => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-violet-400"
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 0.75, delay: d }} />
      ))}
    </div>
  )
}

// ─── Voice Waveform ───
function VoiceWave() {
  return (
    <div className="flex items-center gap-0.5 px-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.div key={i}
          className="w-0.5 bg-red-400 rounded-full"
          animate={{ height: [4, 10 + Math.random() * 14, 4] }}
          transition={{ duration: 0.4 + Math.random() * 0.3, repeat: Infinity, delay: i * 0.06 }} />
      ))}
    </div>
  )
}

const QUICK_PROMPTS = [
  { label: '💼 Jobs for me', msg: 'What job roles suit my certificates and skills?' },
  { label: '📊 Skill gaps', msg: 'Analyze my skill gaps and what I should learn next' },
  { label: '🎯 TN Events', msg: 'Show upcoming TN Skill events and hackathons' },
  { label: '🏆 NM Credits', msg: 'Explain the NM credit system and my current level' },
  { label: '📜 Certificates', msg: 'How do I get NM certificates issued?' },
]

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([
    { role: 'ai', text: "Hi! I'm your NM AI Assistant powered by Gemini AI 🌟\n\nAsk me anything about jobs, skills, events, or your NM journey!" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [unread, setUnread] = useState(1)
  const [hovered, setHovered] = useState(false)

  const endRef = useRef(null)
  const inputRef = useRef(null)
  const recognitionRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, typing])

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 200) }
  }, [open])

  const speak = useCallback((text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(
      text.replace(/[•*#]/g, '').replace(/\n+/g, '. ').substring(0, 240)
    )
    u.rate = 1.05; u.pitch = 1.0; u.lang = 'en-IN'
    const voices = window.speechSynthesis.getVoices()
    const indiaVoice = voices.find(v => v.lang.includes('en-IN') || v.name.includes('India'))
    if (indiaVoice) u.voice = indiaVoice
    u.onstart = () => setSpeaking(true)
    u.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(u)
  }, [voiceEnabled])

  const send = useCallback(async (text) => {
    const t = (text || input).trim()
    if (!t || typing) return
    setInput('')
    const newMsgs = [...msgs, { role: 'user', text: t }]
    setMsgs(newMsgs)
    setTyping(true)

    try {
      let reply
      const isKeySet = GEMINI_API_KEY && !GEMINI_API_KEY.includes('Demo_Replace')
      if (isKeySet) {
        reply = await callGemini(newMsgs)
      } else {
        await new Promise(r => setTimeout(r, 900))
        reply = FALLBACK_RESPONSES.default
      }
      setMsgs(p => [...p, { role: 'ai', text: reply }])
      if (!open) setUnread(n => n + 1)
      speak(reply)
    } catch {
      const errMsg = "I'm having trouble connecting. Please check your internet connection or API key setup."
      setMsgs(p => [...p, { role: 'ai', text: errMsg }])
    } finally {
      setTyping(false)
    }
  }, [input, msgs, typing, open, speak])

  const toggleVoiceInput = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { alert('Voice recognition not supported in this browser. Try Chrome.'); return }

    if (listening) {
      recognitionRef.current?.abort()
      setListening(false)
      return
    }

    const r = new SR()
    recognitionRef.current = r
    r.lang = 'en-IN'
    r.interimResults = false
    r.maxAlternatives = 1
    setListening(true)
    r.start()
    r.onresult = e => {
      const transcript = e.results[0][0].transcript
      setListening(false)
      send(transcript)
    }
    r.onerror = r.onend = () => setListening(false)
  }

  const toggleSpeaker = () => {
    if (speaking) window.speechSynthesis.cancel()
    setVoiceEnabled(v => !v)
  }

  return (
    <>
      {/* ───── CIRCULAR FLOATING BUTTON ───── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip / label */}
        <AnimatePresence>
          {!open && (hovered || unread > 0) && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 bg-[#0F0A1E]/95 backdrop-blur-xl border border-violet-500/30 text-white text-xs rounded-2xl px-4 py-2.5 shadow-2xl shadow-black/50 mr-1"
            >
              <Sparkles size={12} className="text-violet-400" />
              <span className="font-semibold">Chat with NM AI</span>
              {unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-[9px] font-black flex items-center justify-center shadow-lg shadow-red-500/40">
                  {unread}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Circular button with stars */}
        <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-[-4px] rounded-full"
            animate={open || hovered ? {
              boxShadow: ['0 0 20px 4px rgba(139,92,246,0.4)', '0 0 35px 8px rgba(99,102,241,0.5)', '0 0 20px 4px rgba(139,92,246,0.4)']
            } : {
              boxShadow: ['0 0 10px 2px rgba(139,92,246,0.2)', '0 0 18px 4px rgba(139,92,246,0.3)', '0 0 10px 2px rgba(139,92,246,0.2)']
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbital ring */}
          {(open || hovered) && <OrbitalRing active={open} />}

          {/* Main circular button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => { setOpen(o => !o); setUnread(0) }}
            className="relative w-16 h-16 rounded-full overflow-hidden shadow-2xl shadow-violet-500/40 border border-white/20 flex-shrink-0"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700" />

            {/* Star field */}
            <StarField active={open || hovered} />

            {/* Nebula center glow */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={open ? { rotate: [0, 10, -10, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-full blur-md"
                  animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <AnimatePresence mode="wait">
                  {open ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown size={24} className="text-white relative z-10 drop-shadow-lg" />
                    </motion.div>
                  ) : (
                    <motion.div key="ai" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sparkles size={24} className="text-white relative z-10 drop-shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Unread badge */}
            {!open && unread > 0 && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-[#06030F] text-[9px] font-black text-white flex items-center justify-center shadow-lg shadow-red-500/50 z-20"
              >
                {unread}
              </motion.div>
            )}
          </motion.button>
        </div>
      </div>

      {/* ───── CHAT PANEL ───── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-[100px] right-6 z-50 w-[380px] h-[560px] flex flex-col rounded-3xl overflow-hidden shadow-2xl shadow-black/70"
            style={{ backdropFilter: 'blur(24px)' }}
          >
            {/* Glass background layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#12083A]/95 to-[#07030F]/98 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-indigo-900/10 rounded-3xl pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

            {/* Decorative stars in panel bg */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none opacity-30">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div key={i}
                  className="absolute rounded-full bg-white"
                  style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: 1 + Math.random() * 1.5, height: 1 + Math.random() * 1.5 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2 + Math.random() * 3, delay: Math.random() * 3, repeat: Infinity }}
                />
              ))}
            </div>

            {/* ── Header ── */}
            <div className="relative flex items-center gap-3 px-4 py-3.5 border-b border-white/8 flex-shrink-0">
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/30 overflow-hidden">
                  <StarField active />
                  <Bot size={18} className="text-white relative z-10" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#12083A] shadow-lg shadow-emerald-400/50 flex items-center justify-center">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }} />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-outfit font-bold text-white text-sm">NM AI Assistant</p>
                  <span className="text-[9px] bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-2 py-0.5 rounded-full font-bold">Gemini</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={9} className="text-amber-400" />
                  <span className="text-white/40 text-[10px]">Powered by Google AI · Voice enabled</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Speaker toggle */}
                <motion.button whileHover={{ scale: 1.1 }} onClick={toggleSpeaker}
                  className={`p-2 rounded-xl transition-all ${voiceEnabled ? 'text-violet-400 bg-violet-500/10' : 'text-white/20 hover:text-white/40'}`}>
                  {voiceEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </motion.button>
                <motion.button whileHover={{ scale: 1.1 }} onClick={() => setOpen(false)}
                  className="p-2 rounded-xl text-white/30 hover:text-white/70 hover:bg-white/8 transition-all">
                  <X size={14} />
                </motion.button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div className="relative flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
              {msgs.map((m, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-end gap-2.5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden
                    ${m.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/20'
                      : 'bg-gradient-to-br from-violet-600 to-pink-600 shadow-violet-500/20'}`}
                  >
                    {m.role === 'ai' && <StarField active />}
                    {m.role === 'user' ? <User size={12} className="text-white relative z-10" /> : <Bot size={12} className="text-white relative z-10" />}
                  </div>

                  {/* Bubble */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-wrap relative
                      ${m.role === 'user'
                        ? 'bg-gradient-to-br from-indigo-600 to-violet-700 text-white rounded-br-sm shadow-lg shadow-indigo-500/20'
                        : 'bg-white/8 border border-white/10 text-white/85 rounded-bl-sm backdrop-blur-sm'}`}
                  >
                    {m.text}
                    {m.role === 'ai' && (
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/8 border-l border-b border-white/10 rounded-bl-sm" />
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Typing */}
              {typing && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-end gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center overflow-hidden">
                    <StarField active />
                    <Bot size={12} className="text-white relative z-10" />
                  </div>
                  <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm backdrop-blur-sm">
                    <TypingDots />
                  </div>
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            {/* ── Quick Prompts ── */}
            <div className="relative px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none flex-shrink-0">
              {QUICK_PROMPTS.map(q => (
                <motion.button key={q.label} onClick={() => send(q.msg)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex-shrink-0 text-[10px] font-semibold text-white/50 border border-white/10 rounded-full px-3 py-1.5 hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/8 transition-all whitespace-nowrap">
                  {q.label}
                </motion.button>
              ))}
            </div>

            {/* ── Input ── */}
            <div className="relative px-3 pb-4 flex-shrink-0">
              <div className={`flex items-center gap-2 rounded-2xl px-3 py-2.5 border transition-all duration-300
                ${listening
                  ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/10'
                  : 'bg-white/5 border-white/10 focus-within:border-violet-500/40 focus-within:bg-violet-500/5 focus-within:shadow-lg focus-within:shadow-violet-500/10'}`}
              >
                {listening && <VoiceWave />}
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
                  placeholder={listening ? '🎙️ Listening…' : 'Ask about jobs, skills, events…'}
                  className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder-white/20 min-w-0"
                />

                {/* Voice button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVoiceInput}
                  className={`p-2 rounded-xl transition-all flex-shrink-0 ${listening
                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/40'
                    : 'text-white/30 hover:text-violet-400 hover:bg-violet-500/10'}`}
                >
                  {listening ? <MicOff size={14} /> : <Mic size={14} />}
                </motion.button>

                {/* Send button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => send()}
                  disabled={!input.trim() || typing}
                  className="p-2 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white disabled:opacity-25 hover:shadow-lg hover:shadow-violet-500/30 transition-all flex-shrink-0"
                >
                  <Send size={13} />
                </motion.button>
              </div>

              {speaking && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute -top-6 right-4 flex items-center gap-1.5 text-[10px] text-violet-400">
                  <Volume2 size={10} className="animate-pulse" />
                  <span>Speaking…</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
