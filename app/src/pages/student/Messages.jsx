import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Send, Bot, Paperclip, Search, MoreVertical, Circle } from 'lucide-react'

const CONTACTS = [
  { id: 1, name: 'Kavitha Rajan', role: 'Mentor · Analytics Dashboard', avatar: 'KR', online: true, color: 'from-emerald-500 to-teal-600', unread: 1, last: 'Push the PR by Thursday ✓' },
  { id: 2, name: 'NM AI Assistant', role: 'AI · Career Guidance', avatar: '🤖', online: true, color: 'from-violet-500 to-indigo-600', unread: 0, last: 'Your top job match is Zoho...' },
  { id: 3, name: 'Rahul Sharma', role: 'Mentor · UI/UX (Completed)', avatar: 'RS', online: false, color: 'from-pink-500 to-rose-500', unread: 0, last: 'Certificate issued! Great work.' },
  { id: 4, name: 'Priya Nair', role: 'Peer · CSE-B Batch', avatar: 'PN', online: true, color: 'from-blue-500 to-indigo-500', unread: 2, last: 'Are you attending the hackathon?' },
]

const INIT_MESSAGES = {
  1: [
    { from: 'other', text: 'Hi Arjun! The Chart.js integration looks smooth. Add loading skeletons for better UX.', time: '10:30 AM' },
    { from: 'me', text: 'Thanks! Should I switch to Recharts?', time: '10:45 AM' },
    { from: 'other', text: 'Yes! Recharts is more idiomatic in React. Push a PR by Thursday.', time: '11:00 AM' },
  ],
  2: [
    { from: 'other', text: 'Hi Arjun! 👋 Based on your 3 certificates, your top job match is **Full Stack Developer at Zoho** with an 82% match score!', time: '9:00 AM' },
    { from: 'other', text: 'Your strongest gap to close is MongoDB. Completing one project with MongoDB will push you to 95% match!', time: '9:01 AM' },
  ],
  3: [
    { from: 'other', text: 'Certificate issued! You scored 5.0/5.0. Great work on the UI/UX project! 🏆', time: 'Aug 20' },
    { from: 'me', text: 'Thank you so much Rahul!', time: 'Aug 20' },
  ],
  4: [
    { from: 'other', text: 'Arjun! Are you attending the Full Stack Hackathon on Sep 12?', time: 'Yesterday' },
    { from: 'other', text: 'We need one more person for the team — interested?', time: 'Yesterday' },
  ],
}

export default function Messages() {
  const [activeContact, setActiveContact] = useState(1)
  const [messages, setMessages] = useState(INIT_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  const contact = CONTACTS.find(c => c.id === activeContact)
  const currentMsgs = messages[activeContact] || []

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeContact])

  const send = () => {
    if (!input.trim()) return
    setMessages(prev => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), { from: 'me', text: input, time: 'Now' }]
    }))
    setInput('')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />

      <main className="flex-1 flex overflow-hidden">
        {/* Contact list */}
        <div className="w-72 border-r border-white/5 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-white/5">
            <h1 className="font-outfit font-bold text-white text-lg mb-3">Messages</h1>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <Search size={13} className="text-white/30" />
              <input placeholder="Search…" className="bg-transparent text-white text-xs outline-none placeholder-white/25 flex-1" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            {CONTACTS.map(c => (
              <motion.button key={c.id} whileHover={{ x: 3 }}
                onClick={() => setActiveContact(c.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${activeContact === c.id ? 'bg-white/8' : 'hover:bg-white/4'}`}>
                <div className="relative flex-shrink-0">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center font-outfit font-bold text-white text-sm shadow-md`}>
                    {typeof c.avatar === 'string' && c.avatar.length <= 2 ? c.avatar : <Bot size={16} />}
                  </div>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0D0818]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm font-semibold truncate">{c.name}</span>
                    {c.unread > 0 && <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">{c.unread}</span>}
                  </div>
                  <div className="text-white/30 text-[11px] truncate">{c.role}</div>
                  <div className="text-white/20 text-[10px] truncate mt-0.5">{c.last}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3 bg-[#06030F]/90 backdrop-blur-xl">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center font-outfit font-bold text-white text-sm shadow-lg`}>
              {typeof contact.avatar === 'string' && contact.avatar.length <= 2 ? contact.avatar : <Bot size={16} />}
            </div>
            <div>
              <div className="font-outfit font-bold text-white text-sm">{contact.name}</div>
              <div className="flex items-center gap-1.5">
                <Circle size={7} className={contact.online ? 'text-emerald-400 fill-emerald-400' : 'text-white/20 fill-white/20'} />
                <span className="text-white/35 text-xs">{contact.role}</span>
              </div>
            </div>
            <div className="ml-auto">
              <button className="p-2 rounded-xl text-white/25 hover:text-white/50 hover:bg-white/5 transition-all">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
            {currentMsgs.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className={`flex items-end gap-2 ${m.from === 'me' ? 'flex-row-reverse' : ''}`}>
                {m.from !== 'me' && (
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center font-outfit font-bold text-white text-[10px] flex-shrink-0`}>
                    {typeof contact.avatar === 'string' && contact.avatar.length <= 2 ? contact.avatar : <Bot size={12} />}
                  </div>
                )}
                <div className={`max-w-[65%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed
                  ${m.from === 'me'
                    ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/15'
                    : 'bg-white/8 border border-white/10 text-white/80 rounded-bl-sm'}`}>
                  {m.text.split(/\*\*(.*?)\*\*/g).map((p, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p
                  )}
                  <div className={`text-[9px] mt-1 ${m.from === 'me' ? 'text-white/40' : 'text-white/20'}`}>{m.time}</div>
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-6 pb-5 pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors">
              <button className="text-white/25 hover:text-white/50 transition-colors"><Paperclip size={15} /></button>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder={`Message ${contact.name}…`}
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
              <motion.button whileTap={{ scale: 0.9 }} onClick={send}
                className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                <Send size={14} />
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      <AIChatbot />
    </div>
  )
}
