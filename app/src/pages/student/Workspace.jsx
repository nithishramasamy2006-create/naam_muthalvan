import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Upload, MessageCircle, CheckCircle, Clock, AlertCircle, Star, FileText, Link2, Send } from 'lucide-react'

const KANBAN = {
  todo: [
    { id: 1, title: 'Set up project repo & folder structure', priority: 'high', project: 'Analytics Dashboard' },
    { id: 2, title: 'Review Figma wireframes from mentor', priority: 'medium', project: 'Analytics Dashboard' },
  ],
  inprogress: [
    { id: 3, title: 'Build Chart.js D3 integration component', priority: 'high', project: 'Analytics Dashboard' },
    { id: 4, title: 'Connect MongoDB Atlas API endpoints', priority: 'high', project: 'Analytics Dashboard' },
  ],
  review: [
    { id: 5, title: 'Responsive layout for mobile view', priority: 'medium', project: 'Analytics Dashboard' },
  ],
  done: [
    { id: 6, title: 'Initial React project setup (Vite)', priority: 'low', project: 'Analytics Dashboard', completed: true },
    { id: 7, title: 'Color system & Tailwind config', priority: 'low', project: 'Analytics Dashboard', completed: true },
  ],
}

const PRIORITY_STYLE = {
  high: 'text-red-400 bg-red-500/10 border-red-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
}

const MENTOR_MESSAGES = [
  { from: 'mentor', name: 'Kavitha Rajan', text: 'Hi Arjun! Great progress on the dashboard. The Chart.js integration looks smooth. One suggestion — add loading skeleton states for better UX.', time: '10:30 AM', avatar: 'KR' },
  { from: 'student', name: 'Arjun', text: 'Thanks Kavitha! I\'ll add skeletons today. Also, should I use Recharts instead of Chart.js for better React integration?', time: '10:45 AM', avatar: 'AK' },
  { from: 'mentor', name: 'Kavitha Rajan', text: 'Great thinking! Yes, Recharts is more idiomatic in React. Switch to it — it will make state management much cleaner. I\'ll share a reference.', time: '11:00 AM', avatar: 'KR' },
  { from: 'mentor', name: 'Kavitha Rajan', text: 'Here\'s the Recharts docs: recharts.org. Focus on the LineChart and BarChart components first. Push a PR by Thursday.', time: '11:02 AM', avatar: 'KR' },
  { from: 'student', name: 'Arjun', text: 'Perfect! Will switch to Recharts and push the PR by Thursday. Should I also write unit tests?', time: '11:15 AM', avatar: 'AK' },
]

function TaskCard({ task }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} layout
      className="p-3 rounded-xl bg-white/5 border border-white/8 hover:border-white/15 cursor-grab active:cursor-grabbing transition-all">
      <p className="text-white/75 text-xs leading-relaxed mb-2">{task.title}</p>
      <div className="flex items-center justify-between">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${PRIORITY_STYLE[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        {task.completed && <CheckCircle size={12} className="text-emerald-400" />}
      </div>
    </motion.div>
  )
}

const COLS = [
  { key: 'todo', label: 'To Do', icon: AlertCircle, color: 'text-slate-400', count: KANBAN.todo.length },
  { key: 'inprogress', label: 'In Progress', icon: Clock, color: 'text-amber-400', count: KANBAN.inprogress.length },
  { key: 'review', label: 'In Review', icon: Star, color: 'text-indigo-400', count: KANBAN.review.length },
  { key: 'done', label: 'Done', icon: CheckCircle, color: 'text-emerald-400', count: KANBAN.done.length },
]

export default function Workspace() {
  const [msgInput, setMsgInput] = useState('')
  const [msgs, setMsgs] = useState(MENTOR_MESSAGES)
  const [tab, setTab] = useState('kanban')

  const send = () => {
    if (!msgInput.trim()) return
    setMsgs(prev => [...prev, { from: 'student', name: 'Arjun', text: msgInput, time: 'Now', avatar: 'AK' }])
    setMsgInput('')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-outfit font-black text-xl text-white">Project Workspace</h1>
              <p className="text-white/35 text-sm">Analytics Dashboard · Zoho Corporation · Mentor: Kavitha Rajan ⭐ 4.9</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 w-32 bg-white/8 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{ width: '65%' }} />
              </div>
              <span className="text-white/50 text-xs">65% complete</span>
              <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white ml-3">
                <Upload size={12} /> Submit Work
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-3">
            {[['kanban', 'Kanban Board'], ['chat', 'Mentor Chat'], ['files', 'Files & Links']].map(([k, l]) => (
              <button key={k} onClick={() => setTab(k)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-lg transition-all ${tab === k ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/55'}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* ── KANBAN ── */}
        {tab === 'kanban' && (
          <div className="flex-1 overflow-x-auto p-6">
            <div className="flex gap-4 min-w-max h-full">
              {COLS.map(col => {
                const Icon = col.icon
                return (
                  <div key={col.key} className="w-64 flex flex-col">
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <Icon size={14} className={col.color} />
                      <span className="text-white/60 text-xs font-bold uppercase tracking-wide">{col.label}</span>
                      <span className="ml-auto text-white/25 text-xs bg-white/5 px-2 py-0.5 rounded-full">{col.count}</span>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      {KANBAN[col.key].map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── MENTOR CHAT ── */}
        {tab === 'chat' && (
          <div className="flex-1 flex flex-col overflow-hidden p-6">
            <div className="flex-1 overflow-y-auto flex flex-col gap-3 mb-4">
              {msgs.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${m.from === 'student' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0
                    ${m.from === 'mentor' ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-indigo-500 to-violet-600'}`}>
                    {m.avatar}
                  </div>
                  <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed
                    ${m.from === 'mentor'
                      ? 'bg-white/8 border border-white/10 text-white/80 rounded-bl-sm'
                      : 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-sm shadow-lg shadow-indigo-500/20'}`}>
                    {m.text}
                    <div className={`text-[9px] mt-1 ${m.from === 'mentor' ? 'text-white/25' : 'text-white/40'}`}>{m.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:border-white/20 transition-colors">
              <input value={msgInput} onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Message Kavitha…"
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder-white/25" />
              <button onClick={send} className="p-2 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white hover:shadow-lg transition-all">
                <Send size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ── FILES ── */}
        {tab === 'files' && (
          <div className="flex-1 p-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Project Brief.pdf', size: '1.2 MB', icon: FileText, color: 'text-red-400' },
                { name: 'Figma Wireframes', size: 'Link', icon: Link2, color: 'text-purple-400' },
                { name: 'Analytics_v1.zip', size: '4.8 MB', icon: FileText, color: 'text-blue-400' },
                { name: 'Recharts Docs', size: 'Link', icon: Link2, color: 'text-green-400' },
              ].map(f => (
                <div key={f.name} className="flex items-center gap-3 p-4 rounded-xl bg-white/3 border border-white/8 hover:bg-white/5 cursor-pointer transition-colors">
                  <f.icon size={20} className={f.color} />
                  <div>
                    <div className="text-white/75 text-sm font-medium">{f.name}</div>
                    <div className="text-white/30 text-xs">{f.size}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-8 rounded-2xl border-2 border-dashed border-white/10 text-center hover:border-white/20 hover:bg-white/2 transition-all cursor-pointer">
              <Upload size={28} className="text-white/20 mx-auto mb-2" />
              <p className="text-white/40 text-sm font-medium">Drop files or click to upload</p>
              <p className="text-white/20 text-xs mt-1">PDF, ZIP, images up to 50MB</p>
            </div>
          </div>
        )}
      </main>
      <AIChatbot />
    </div>
  )
}
