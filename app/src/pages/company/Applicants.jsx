import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Users, Star, MapPin, CheckCircle, XCircle, MessageCircle, ChevronDown, Filter, Search } from 'lucide-react'

const APPLICANTS = [
  {
    id: 1, name: 'Arjun Kumar', college: 'PSG Tech, Coimbatore', course: 'B.E. CSE — Sem 7',
    project: 'Analytics Dashboard — React & D3',
    matchScore: 92, skills: ['React.js', 'JavaScript', 'REST API', 'MongoDB'],
    missingSkills: ['D3.js'],
    nmCredits: 24, portfolio: 'psgtech.nmlearn/arjun', rating: 4.8,
    status: 'shortlisted',
    appliedDate: 'Aug 25, 2026',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=70',
    coverNote: 'I have built 2 React dashboards with Recharts. Eager to learn D3.js and contribute.',
  },
  {
    id: 2, name: 'Priya Nair', college: 'Anna University, Chennai', course: 'B.Tech IT — Sem 6',
    project: 'Analytics Dashboard — React & D3',
    matchScore: 85, skills: ['React.js', 'JavaScript', 'REST API'],
    missingSkills: ['D3.js', 'MongoDB'],
    nmCredits: 18, portfolio: 'annauniv.nmlearn/priya', rating: 4.9,
    status: 'pending',
    appliedDate: 'Aug 26, 2026',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=70',
    coverNote: 'Strong in React and REST APIs. Quick learner for D3 visualization.',
  },
  {
    id: 3, name: 'Karthik Selvam', college: 'VIT Vellore', course: 'B.Tech CSE — Sem 7',
    project: 'AI Chatbot Integration — Python NLP',
    matchScore: 88, skills: ['Python', 'NLP', 'FastAPI', 'TensorFlow'],
    missingSkills: ['React.js'],
    nmCredits: 20, portfolio: 'vit.nmlearn/karthik', rating: 4.7,
    status: 'pending',
    appliedDate: 'Aug 27, 2026',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=70',
    coverNote: 'Built 3 NLP pipelines using HuggingFace. Strong Python + FastAPI experience.',
  },
  {
    id: 4, name: 'Divya Mohan', college: 'NIT Trichy', course: 'B.Tech ECE — Sem 7',
    project: 'AI Chatbot Integration — Python NLP',
    matchScore: 76, skills: ['Python', 'NLP', 'TensorFlow'],
    missingSkills: ['FastAPI', 'React.js'],
    nmCredits: 16, portfolio: 'nit.nmlearn/divya', rating: 4.6,
    status: 'pending',
    appliedDate: 'Aug 28, 2026',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=70',
    coverNote: 'Deep learning project with custom NLP model. NIT innovation award recipient.',
  },
  {
    id: 5, name: 'Ramesh Vijay', college: 'Amrita, Coimbatore', course: 'B.E. CSE — Sem 8',
    project: 'IoT Smart Campus Dashboard',
    matchScore: 90, skills: ['Arduino', 'Node.js', 'MQTT', 'React.js'],
    missingSkills: [],
    nmCredits: 28, portfolio: 'amrita.nmlearn/ramesh', rating: 4.9,
    status: 'shortlisted',
    appliedDate: 'Aug 24, 2026',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=70',
    coverNote: 'Built IoT home automation with NodeMCU. 100% skill match for this role.',
  },
  {
    id: 6, name: 'Meera Krishnan', college: 'SRM Institute, Kattankulathur', course: 'B.Tech IT — Sem 6',
    project: 'Analytics Dashboard — React & D3',
    matchScore: 68, skills: ['React.js', 'JavaScript'],
    missingSkills: ['D3.js', 'MongoDB', 'REST API'],
    nmCredits: 12, portfolio: 'srm.nmlearn/meera', rating: 4.3,
    status: 'rejected',
    appliedDate: 'Aug 22, 2026',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=70',
    coverNote: 'React intern experience. Looking to grow in data visualization.',
  },
]

const PROJECTS = ['All Projects', 'Analytics Dashboard — React & D3', 'AI Chatbot Integration — Python NLP', 'IoT Smart Campus Dashboard']
const STATUSES = ['All', 'Pending', 'Shortlisted', 'Rejected']

const STATUS_STYLE = {
  shortlisted: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  pending: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  rejected: 'bg-red-500/15 text-red-400 border-red-500/25',
}

function ApplicantCard({ a, onAction }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <motion.div layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img src={a.img} alt={a.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <h3 className="font-outfit font-bold text-white text-base leading-tight">{a.name}</h3>
                <p className="text-white/40 text-xs">{a.college} · {a.course}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${STATUS_STYLE[a.status]}`}>
                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-white/35 mb-2">
              <span>Applied: {a.appliedDate}</span>
              <span>NM Credits: {a.nmCredits}</span>
              <span className="flex items-center gap-0.5"><Star size={9} className="text-amber-400 fill-amber-400" /> {a.rating}</span>
            </div>
            {/* AI match bar */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${a.matchScore}%` }} transition={{ duration: 0.8, delay: 0.3 }}
                  className={`h-full rounded-full ${a.matchScore >= 85 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : a.matchScore >= 70 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} />
              </div>
              <span className={`text-xs font-bold ${a.matchScore >= 85 ? 'text-emerald-400' : a.matchScore >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{a.matchScore}%</span>
              <span className="text-white/25 text-[10px]">AI match</span>
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {a.skills.map(s => <span key={s} className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">✓ {s}</span>)}
              {a.missingSkills.map(s => <span key={s} className="text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5">✗ {s}</span>)}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mt-4 pt-4 border-t border-white/8">
              <p className="text-white/50 text-xs italic mb-4">"{a.coverNote}"</p>
              <div className="flex gap-2">
                {a.status !== 'shortlisted' && (
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => onAction(a.id, 'shortlisted')}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                    <CheckCircle size={12} /> Shortlist
                  </motion.button>
                )}
                <motion.button whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60">
                  <MessageCircle size={12} /> Message
                </motion.button>
                {a.status !== 'rejected' && (
                  <motion.button whileHover={{ scale: 1.03 }} onClick={() => onAction(a.id, 'rejected')}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 ml-auto">
                    <XCircle size={12} /> Decline
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-white/25 text-[10px] mt-3 hover:text-white/45 transition-colors">
          <ChevronDown size={11} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          {expanded ? 'Collapse' : 'View details & actions'}
        </button>
      </div>
    </motion.div>
  )
}

export default function CompanyApplicants() {
  const [data, setData] = useState(APPLICANTS)
  const [project, setProject] = useState('All Projects')
  const [status, setStatus] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = data.filter(a => {
    const pOk = project === 'All Projects' || a.project.includes(project.split(' — ')[0])
    const sOk = status === 'All' || a.status === status.toLowerCase()
    const qOk = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.college.toLowerCase().includes(search.toLowerCase())
    return pOk && sOk && qOk
  })

  const onAction = (id, newStatus) => setData(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a))

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Applicants</h1>
          <p className="text-white/35 text-sm">{data.filter(a => a.status === 'pending').length} pending review · {data.filter(a => a.status === 'shortlisted').length} shortlisted</p>
        </div>
        <div className="p-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[200px]">
              <Search size={13} className="text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or college…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
            <select value={project} onChange={e => setProject(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/60 text-sm rounded-xl px-3 py-2 outline-none">
              {PROJECTS.map(p => <option key={p} value={p} className="bg-[#0D0818]">{p}</option>)}
            </select>
            <div className="flex gap-1.5">
              {STATUSES.map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${status === s ? 'bg-orange-500 border-orange-400 text-black' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(a => <ApplicantCard key={a.id} a={a} onAction={onAction} />)}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
