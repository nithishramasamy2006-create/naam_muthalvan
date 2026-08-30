import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, Clock, Star, GitBranch, ExternalLink, MessageCircle, FileText, AlertCircle } from 'lucide-react'

const SUBMISSIONS = [
  {
    id: 1, student: 'Arjun Kumar', studentImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=70',
    college: 'PSG Tech', project: 'Analytics Dashboard — React & D3',
    submittedAt: 'Aug 28, 2026', status: 'submitted',
    githubUrl: 'github.com/arjun/analytics-dash', demoUrl: 'analytics-dash.netlify.app',
    desc: 'Completed all 5 milestones. Dashboard has 8 chart types with real-time MongoDB Atlas integration. Deployed on Netlify.',
    files: ['report.pdf', 'screenshots.zip'], revisions: 0,
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70',
  },
  {
    id: 2, student: 'Ramesh Vijay', studentImg: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=70',
    college: 'Amrita, Coimbatore', project: 'IoT Smart Campus Dashboard',
    submittedAt: 'Aug 26, 2026', status: 'under_review',
    githubUrl: 'github.com/ramesh/iot-campus', demoUrl: null,
    desc: 'Hardware prototype with 12 sensor nodes deployed. Dashboard shows real-time data via MQTT broker.',
    files: ['demo_video.mp4', 'circuit_diagram.pdf', 'code.zip'], revisions: 1,
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=70',
  },
  {
    id: 3, student: 'Priya Nair', studentImg: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70',
    college: 'Anna University', project: 'Mobile UI/UX Redesign',
    submittedAt: 'Aug 20, 2026', status: 'approved',
    githubUrl: null, demoUrl: 'figma.com/proto/priya-mobile',
    desc: 'Complete Figma prototype with 52 screens, user journey maps, and accessibility report.',
    files: ['portfolio.pdf'], revisions: 0, rating: 4.9,
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=70',
  },
]

const STATUS_STYLE = {
  submitted:    { label: 'Awaiting Review',  cls: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25' },
  under_review: { label: 'Under Review',     cls: 'bg-amber-500/15 text-amber-300 border-amber-500/25' },
  approved:     { label: 'Approved ✓',       cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25' },
  revision_requested: { label: 'Needs Revision', cls: 'bg-red-500/15 text-red-400 border-red-500/25' },
}

export default function CompanySubmissions() {
  const [selected, setSelected] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(5)

  const approve = (id) => {
    alert(`Certificate issued! NM-2026-CSE-${String(id).padStart(5,'0')} generated.`)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 flex overflow-hidden">
        {/* Left: list */}
        <div className={`${selected ? 'w-80' : 'flex-1'} border-r border-white/5 flex flex-col transition-all duration-300`}>
          <div className="sticky top-0 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5">
            <h1 className="font-outfit font-black text-xl text-white">Review Submissions</h1>
            <p className="text-white/35 text-sm">{SUBMISSIONS.filter(s => s.status === 'submitted').length} awaiting · {SUBMISSIONS.filter(s => s.status === 'approved').length} approved</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {SUBMISSIONS.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                onClick={() => setSelected(s)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all hover:border-white/15 ${selected?.id === s.id ? 'border-orange-500/40 bg-orange-500/5' : 'border-white/8 bg-white/[0.025]'}`}>
                <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                  <img src={s.img} alt={s.project} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLE[s.status].cls}`}>
                    {STATUS_STYLE[s.status].label}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <img src={s.studentImg} alt={s.student} className="w-7 h-7 rounded-lg object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{s.student}</p>
                    <p className="text-white/30 text-[10px]">{s.college}</p>
                  </div>
                </div>
                <p className="text-white/50 text-xs mt-1">{s.project}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/25 text-[10px] flex items-center gap-1"><Clock size={8} />{s.submittedAt}</span>
                  <span className="text-white/30 text-[10px]">{s.files.length} files</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: review panel */}
        {selected && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 overflow-y-auto">
            <div className="sticky top-0 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-outfit font-bold text-white text-base">{selected.project}</h2>
                <p className="text-white/35 text-xs">by {selected.student} · {selected.college}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/60 text-xs">← Back</button>
            </div>
            <div className="p-6">
              {/* Submission details */}
              <div className="mb-5 p-4 rounded-2xl bg-white/3 border border-white/8">
                <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">Student Note</h3>
                <p className="text-white/65 text-sm leading-relaxed">{selected.desc}</p>
              </div>
              {/* Links */}
              <div className="flex gap-3 mb-5">
                {selected.githubUrl && (
                  <a href={`https://${selected.githubUrl}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/60 hover:bg-white/10">
                    <GitBranch size={11} /> View GitHub
                  </a>
                )}
                {selected.demoUrl && (
                  <a href={`https://${selected.demoUrl}`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/60 hover:bg-white/10">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
              {/* Files */}
              <div className="flex gap-2 flex-wrap mb-6">
                {selected.files.map(f => (
                  <div key={f} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/4 border border-white/8 text-white/50 text-xs">
                    <FileText size={11} /> {f}
                  </div>
                ))}
              </div>
              {/* Rating */}
              <div className="mb-4">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Mentor Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setRating(n)}
                      className={`w-9 h-9 rounded-xl font-bold text-sm transition-all ${n <= rating ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/25' : 'bg-white/8 text-white/30'}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              {/* Feedback */}
              <div className="mb-5">
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Feedback for Student</label>
                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={3}
                  placeholder="Write your feedback here…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/25 focus:border-white/20 transition-colors resize-none" />
              </div>
              {/* Actions */}
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => approve(selected.id)}
                  className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex-1 justify-center">
                  <CheckCircle size={16} /> Approve & Issue Certificate
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-300">
                  <AlertCircle size={16} /> Request Revision
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <AIChatbot />
    </div>
  )
}
