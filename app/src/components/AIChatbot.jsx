import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Mic, MicOff, Sparkles, Bot, User, Volume2 } from 'lucide-react'

// AI Knowledge base — real data responses
const AI_RESPONSES = {
  greet: ['Hello! 👋 I\'m your NM MicroLearn AI assistant. I can help you with job recommendations, skill gaps, project matching, and TN Skill events. What would you like to know?', 'Hi there! I\'m here to help with your career journey. Ask me about jobs, skills, events, or your certificates! 🚀'],
  jobs: [
    'Based on your **3 certificates** (UI/UX, React Dashboard, Python Scraper), your top matches are:\n\n🥇 **Full Stack Developer** at Zoho — 82% match, ₹6–12 LPA\n🥈 **UI/UX Designer** at Freshworks — 78% match, ₹5–9 LPA\n🥉 **Backend Developer** at HealthConnect — 71% match, ₹5–10 LPA\n\nWant details on any role?',
    'You qualify for **6 out of 8** job roles on the platform. Your strongest domain is **Web Development** (82% avg match). Earning a Node.js certificate would boost your Full Stack match to 95%!'
  ],
  skills: [
    'Your current skill stack has **10 verified skills**:\n✅ React.js, JavaScript, HTML5/CSS3, REST API, Python, Figma, UI/UX, Responsive Design, Pandas, Node.js\n\n⚠️ Top gaps: **MongoDB**, **TypeScript**, **Docker**\n\nI recommend taking the "MongoDB Atlas Integration" project on the platform to close your #1 gap!',
    'Skill analysis complete! You are **strong in Frontend** (React, Figma, CSS) but have gaps in **Backend & DevOps**. Adding Docker and MongoDB will unlock 3 more job matches.'
  ],
  events: [
    '📅 Upcoming **TN Skill Events**:\n\n🔴 **LIVE** — AI & ML Bootcamp, Sep 5, Chennai\n🟡 Sep 12 — Full Stack Hackathon, Coimbatore (Register by Sep 8)\n🟢 Sep 18 — TNSDC Career Fair, Chennai (500+ companies)\n🔵 Oct 3 — IoT Innovation Challenge (₹50,000 prize)\n\nShall I register you for any?',
    'The next big event is the **Full Stack Hackathon** on Sep 12 in Coimbatore. It offers **NM Credits + certificate + ₹25,000 prize** for winners. Teams of 3-4. Interested?'
  ],
  certificates: [
    'You have **3 NM-verified certificates** with **24 NM Credits**:\n\n🏆 Mobile App UI/UX Design — PayU India — ⭐ 5.0 (4 credits)\n🏆 E-Commerce React Dashboard — Zoho Corp — ⭐ 4.9 (8 credits)\n🏆 Python Web Scraper — DataMinds — ⭐ 4.8 (5 credits)\n\nYou need **6 more credits** to reach Gold Level 🥇',
    'Your certificates are **QR-verified** and accepted by 120+ companies on the platform. Your best rated cert is your **UI/UX Design** with a perfect 5.0 mentor rating!'
  ],
  projects: [
    '🔥 **Top Projects for You Right Now:**\n\n1. Analytics Dashboard — Zoho Corp (React, MongoDB) — ₹8,000 stipend — Deadline Sep 15\n2. AI Chatbot Integration — Freshworks (Python, NLP) — ₹6,500 — Deadline Sep 20\n3. IoT Dashboard — Hexaware (Node.js, React) — ₹7,000 — Deadline Oct 1\n\nBased on your skills, project #1 has a **96% skill match**!',
    'There are currently **384 live projects** on the platform. I filtered 12 that match your skills. The highest paying is the **AI Chatbot Integration** at Freshworks (₹6,500 stipend, Python + NLP required).'
  ],
  credits: [
    'Your NM Credit status:\n\n📊 Current: **24 credits**\n🥈 Silver Level (20+ credits) ✅\n🥇 Gold Level: Need **6 more** credits\n\nAt Gold Level you unlock **priority application review** by companies and a **TNSDC Gold Badge** on your profile!',
    'NM Credits are earned by completing projects. Each project gives 4-8 credits based on complexity. You\'re on track for Gold Level — just complete 1 more medium project!'
  ],
  fallback: [
    'I can help with: **job recommendations**, **skill gap analysis**, **upcoming events**, **certificates**, **projects**, and **NM credits**. Try asking: "What jobs suit me?" or "Show upcoming events"',
    'Great question! Try asking me:\n• "What jobs suit my certificates?"\n• "Show my skill gaps"\n• "Upcoming TN Skill events"\n• "How many NM credits do I have?"',
  ]
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.match(/hi|hello|hey|namaste/)) return AI_RESPONSES.greet
  if (lower.match(/job|role|career|salary|hire|placement|work/)) return AI_RESPONSES.jobs
  if (lower.match(/skill|gap|learn|missing|need|knowledge/)) return AI_RESPONSES.skills
  if (lower.match(/event|hackathon|bootcamp|fair|tn skill|competition/)) return AI_RESPONSES.events
  if (lower.match(/certif|badge|award|credential/)) return AI_RESPONSES.certificates
  if (lower.match(/project|work|task|apply|stipend/)) return AI_RESPONSES.projects
  if (lower.match(/credit|point|xp|level|gold|silver/)) return AI_RESPONSES.credits
  return AI_RESPONSES.fallback
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 0.2, 0.4].map((d, i) => (
        <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-violet-400"
          animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: d }} />
      ))}
    </div>
  )
}

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mb-1
        ${isUser ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-gradient-to-br from-violet-600 to-pink-500'}`}>
        {isUser ? <User size={11} className="text-white" /> : <Bot size={11} className="text-white" />}
      </div>

      {/* Bubble */}
      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-wrap
        ${isUser
          ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/20'
          : 'bg-white/8 border border-white/10 text-white/85 rounded-bl-sm'}`}>
        {/* Render markdown-lite bold */}
        {msg.text.split(/\*\*(.*?)\*\*/g).map((part, i) =>
          i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part
        )}
      </div>
    </motion.div>
  )
}

const QUICK_PROMPTS = [
  'What jobs suit me?',
  'Show my skill gaps',
  'Upcoming TN events',
  'My NM credits',
]

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 0, role: 'ai', text: "Hi Arjun! 👋 I'm your NM AI Assistant. Ask me about jobs, skills, events, or your certificates!" }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [listening, setListening] = useState(false)
  const [unread, setUnread] = useState(0)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const sendMessage = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = { id: Date.now(), role: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    // Simulate AI thinking (600-1200ms)
    const delay = 600 + Math.random() * 600
    setTimeout(() => {
      const responses = getAIResponse(trimmed)
      const reply = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: reply }])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
      // Speak the response
      if ('speechSynthesis' in window) {
        const plain = reply.replace(/\*\*/g, '').replace(/\n/g, ' ').substring(0, 200)
        const utterance = new SpeechSynthesisUtterance(plain)
        utterance.rate = 1.05
        utterance.pitch = 1.0
        window.speechSynthesis.speak(utterance)
      }
    }, delay)
  }

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition not supported in this browser. Try Chrome.')
      return
    }
    if (listening) {
      setListening(false)
      return
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SR()
    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    setListening(true)
    recognition.start()
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript
      setListening(false)
      sendMessage(transcript)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }

  const handleOpen = () => {
    setOpen(true)
    setUnread(0)
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  return (
    <>
      {/* FAB button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => open ? setOpen(false) : handleOpen()}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-shadow"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} className="text-white" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Sparkles size={22} className="text-white" /></motion.div>
          }
        </AnimatePresence>
        {unread > 0 && !open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
            {unread}
          </span>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[360px] h-[520px] rounded-3xl bg-[#0F0A1E] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-900/80 to-indigo-900/80 border-b border-white/8 px-4 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <Bot size={18} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-outfit font-bold text-white text-sm">NM AI Assistant</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 text-[10px] font-medium">Online · Real-time</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all">
                  <Volume2 size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
                    <Bot size={11} className="text-white" />
                  </div>
                  <div className="bg-white/8 border border-white/10 rounded-2xl rounded-bl-sm">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick prompts */}
            <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto scrollbar-none">
              {QUICK_PROMPTS.map(q => (
                <button key={q} onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-[10px] font-medium text-white/50 border border-white/10 rounded-full px-2.5 py-1 hover:border-violet-500/40 hover:text-violet-300 hover:bg-violet-500/8 transition-all whitespace-nowrap">
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-3 pb-3">
              <div className={`flex items-center gap-2 bg-white/5 border rounded-2xl px-3 py-2 transition-all ${listening ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 focus-within:border-violet-500/40'}`}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage(input)}
                  placeholder={listening ? '🎤 Listening...' : 'Ask about jobs, skills, events...'}
                  className="flex-1 bg-transparent text-white text-[13px] outline-none placeholder-white/25"
                />
                {/* Voice button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleVoice}
                  className={`p-1.5 rounded-xl transition-all ${listening ? 'bg-red-500 text-white animate-pulse' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                >
                  {listening ? <MicOff size={15} /> : <Mic size={15} />}
                </motion.button>
                {/* Send */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                  className="p-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-violet-500/25 transition-all"
                >
                  <Send size={14} />
                </motion.button>
              </div>
              <p className="text-white/15 text-[9px] text-center mt-1.5">AI voice + text · Real-time NM data</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
