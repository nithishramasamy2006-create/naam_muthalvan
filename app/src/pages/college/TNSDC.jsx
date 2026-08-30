import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { FileText, Download, CheckCircle, Clock, AlertCircle, Shield, Award, Users, BarChart3 } from 'lucide-react'

const CHECKLIST = [
  { id:1, item:'Student enrollment list submitted to TNSDC portal', status:'done', date:'Aug 1, 2026', category:'Enrollment' },
  { id:2, item:'NM Credit mapping report Q2 2026 uploaded', status:'done', date:'Aug 10, 2026', category:'Credits' },
  { id:3, item:'Industry partner verification documents submitted', status:'done', date:'Aug 15, 2026', category:'Verification' },
  { id:4, item:'Q3 2026 student participation report (Sep 30 deadline)', status:'pending', date:'Sep 30, 2026', category:'Participation' },
  { id:5, item:'Semester-end certificate audit report', status:'pending', date:'Oct 15, 2026', category:'Audit' },
  { id:6, item:'Annual TNSDC compliance statement FY 2026-27', status:'overdue', date:'Aug 28, 2026', category:'Compliance' },
]

const SCHEME_STATS = [
  { label: 'Total Students Enrolled', val: '842', icon: Users, color: 'from-indigo-500 to-violet-600' },
  { label: 'NM Credits Mapped', val: '4,218', icon: Award, color: 'from-amber-500 to-orange-500' },
  { label: 'Industry Partners', val: '12', icon: Shield, color: 'from-emerald-500 to-teal-500' },
  { label: 'Reports Submitted', val: '8/10', icon: BarChart3, color: 'from-pink-500 to-rose-600' },
]

const STATUS_CONFIG = {
  done:    { icon: CheckCircle, cls: 'text-emerald-400', bg: 'border-emerald-500/20 bg-emerald-500/5' },
  pending: { icon: Clock,       cls: 'text-amber-400',   bg: 'border-amber-500/20 bg-amber-500/5' },
  overdue: { icon: AlertCircle, cls: 'text-red-400',     bg: 'border-red-500/20 bg-red-500/5' },
}

export default function CollegeTNSDC() {
  const [list, setList] = useState(CHECKLIST)
  const markDone = (id) => setList(p => p.map(c => c.id === id ? { ...c, status: 'done' } : c))
  const score = Math.round((list.filter(c => c.status === 'done').length / list.length) * 100)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">TNSDC Compliance</h1>
            <p className="text-white/35 text-sm">Naan Mudhalvan scheme compliance · TNSDC Code: TNSDC-001</p>
          </div>
          <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25 transition-colors">
            <Download size={13} /> Export Full Report
          </button>
        </div>

        <div className="p-8">
          {/* Scheme Stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {SCHEME_STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}>
                  <s.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-outfit font-black text-xl text-white">{s.val}</div>
                  <div className="text-white/35 text-[11px]">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Score Banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 flex items-center gap-6">
            <div className="relative w-20 h-20 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <motion.circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10"
                  strokeLinecap="round" pathLength="100"
                  initial={{ strokeDasharray: '0 100' }}
                  animate={{ strokeDasharray: `${score} 100` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-outfit font-black text-2xl text-white">{score}%</span>
              </div>
            </div>
            <div>
              <h2 className="font-outfit font-black text-xl text-white mb-1">
                {score >= 80 ? '✅ Compliant — Good Standing' : score >= 60 ? '⚠️ Partially Compliant' : '❌ Non-Compliant'}
              </h2>
              <p className="text-white/40 text-sm">
                {list.filter(c => c.status === 'done').length} of {list.length} TNSDC requirements met
              </p>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="text-emerald-400 font-semibold">{list.filter(c => c.status === 'done').length} Completed</span>
                <span className="text-amber-400 font-semibold">{list.filter(c => c.status === 'pending').length} Pending</span>
                <span className="text-red-400 font-semibold">{list.filter(c => c.status === 'overdue').length} Overdue</span>
              </div>
            </div>
          </motion.div>

          {/* Checklist */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-outfit font-bold text-white text-lg">TNSDC Requirement Checklist</h2>
            <span className="text-white/30 text-xs">FY 2026-27</span>
          </div>

          <div className="flex flex-col gap-3">
            {list.map((c, i) => {
              const { icon: Icon, cls, bg } = STATUS_CONFIG[c.status]
              return (
                <motion.div key={c.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.07 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${bg} transition-all`}>
                  <Icon size={20} className={`${cls} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-white/75 text-sm font-medium">{c.item}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-white/30 text-[10px] flex items-center gap-1"><Clock size={9} />Due: {c.date}</span>
                      <span className="text-white/20 text-[10px] bg-white/5 px-2 py-0.5 rounded-full">{c.category}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {c.status === 'done' && (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-semibold">Submitted</span>
                        <button className="ml-2 text-[10px] text-white/30 hover:text-white/50 flex items-center gap-1">
                          <FileText size={10} /> View
                        </button>
                      </div>
                    )}
                    {c.status !== 'done' && (
                      <motion.button whileHover={{ scale: 1.05 }} onClick={() => markDone(c.id)}
                        className={`text-xs font-bold px-3 py-2 rounded-xl ${c.status === 'overdue' ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' : 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'}`}>
                        {c.status === 'overdue' ? '⚠️ Submit Now' : 'Mark Submitted'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
