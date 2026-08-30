import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Users, Plus, ExternalLink } from 'lucide-react'

const PROJECTS = [
  { id: 1, title: 'Analytics Dashboard — React & D3.js', domain: 'Web Development', status: 'open', applicants: 42, shortlisted: 3, deadline: 'Sep 15', stipend: '₹8,000', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70', color: 'from-blue-500 to-indigo-600' },
  { id: 2, title: 'AI Chatbot Integration — Python NLP', domain: 'Data Science', status: 'open', applicants: 28, shortlisted: 5, deadline: 'Sep 20', stipend: '₹6,500', img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=70', color: 'from-violet-500 to-purple-600' },
  { id: 3, title: 'Mobile UI/UX Redesign', domain: 'UI/UX Design', status: 'in_progress', applicants: 56, shortlisted: 2, deadline: 'Sep 25', stipend: '₹5,500', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=70', color: 'from-pink-500 to-rose-500' },
  { id: 4, title: 'IoT Smart Campus Dashboard', domain: 'IoT', status: 'completed', applicants: 15, shortlisted: 1, deadline: 'Aug 10', stipend: '₹7,000', img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=70', color: 'from-cyan-500 to-teal-600' },
]

const STATUS_STYLE = {
  open: 'bg-emerald-500/15 text-emerald-300',
  in_progress: 'bg-amber-500/15 text-amber-300',
  completed: 'bg-white/10 text-white/40',
  draft: 'bg-indigo-500/15 text-indigo-300',
}

export default function MyProjects() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">My Projects</h1>
            <p className="text-white/35 text-sm">{PROJECTS.length} projects · {PROJECTS.filter(p => p.status === 'open').length} open</p>
          </div>
          <Link to="/company/post">
            <motion.button whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25">
              <Plus size={16} /> Post New Project
            </motion.button>
          </Link>
        </div>

        <div className="p-8 grid grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden">
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] to-transparent" />
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.color}`} />
                <span className={`absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[p.status]}`}>
                  {p.status.replace('_', ' ')}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-outfit font-bold text-white text-sm mb-1">{p.title}</h3>
                <p className="text-white/35 text-xs mb-3">{p.domain} · Deadline: {p.deadline} · {p.stipend}/student</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1 text-white/40"><Users size={11} />{p.applicants} applied</span>
                  <span className="text-emerald-400 font-semibold">{p.shortlisted} shortlisted</span>
                  <Link to="/company/applicants" className="ml-auto text-orange-400 hover:text-orange-300 flex items-center gap-1 font-semibold transition-colors">
                    Manage <ExternalLink size={10} />
                  </Link>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-white/8 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((p.applicants / 60) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${p.color}`} />
                </div>
                <p className="text-white/20 text-[9px] mt-1">{p.applicants}/60 applications</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
