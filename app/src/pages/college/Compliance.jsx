import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, AlertCircle, Clock, Shield, Download, RefreshCw } from 'lucide-react'

const CHECKLIST = [
  { id:1, item:'Student enrollment list submitted to TNSDC portal', status:'done', date:'Aug 1, 2026' },
  { id:2, item:'NM Credit mapping report Q2 2026 uploaded', status:'done', date:'Aug 10, 2026' },
  { id:3, item:'Industry partner verification documents submitted', status:'done', date:'Aug 15, 2026' },
  { id:4, item:'Q3 2026 student participation report (Sep 30 deadline)', status:'pending', date:'Sep 30, 2026' },
  { id:5, item:'Semester-end certificate audit report', status:'pending', date:'Oct 15, 2026' },
  { id:6, item:'Annual TNSDC compliance statement FY 2026-27', status:'overdue', date:'Aug 28, 2026' },
]

const STATUS_STYLE = {
  done:    { icon: CheckCircle, cls: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  pending: { icon: Clock,       cls: 'text-amber-400',   bg: 'bg-amber-500/10 border-amber-500/20' },
  overdue: { icon: AlertCircle, cls: 'text-red-400',     bg: 'bg-red-500/10 border-red-500/20' },
}

const complianceScore = Math.round((CHECKLIST.filter(c => c.status === 'done').length / CHECKLIST.length) * 100)

export default function CollegeCompliance() {
  const [list, setList] = useState(CHECKLIST)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">TNSDC Compliance</h1>
            <p className="text-white/35 text-sm">Naan Mudhalvan scheme compliance dashboard · PSG College of Technology</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/8">
              <RefreshCw size={13} /> Sync with TNSDC
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 hover:bg-emerald-500/25">
              <Download size={13} /> Export Compliance Report
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-emerald-900/30 to-teal-900/20 border border-emerald-500/20 flex items-center gap-8">
            <div className="relative w-28 h-28 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <motion.circle cx="50" cy="50" r="42" fill="none" stroke="url(#cGrad)" strokeWidth="8"
                  strokeLinecap="round" pathLength="100"
                  initial={{ strokeDasharray: '0 100' }} animate={{ strokeDasharray: `${complianceScore} 100` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                  strokeDasharray={`${complianceScore} 100`} />
                <defs><linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#14b8a6" /></linearGradient></defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-outfit font-black text-3xl text-white">{complianceScore}%</span>
                <span className="text-white/35 text-[9px]">Compliance</span>
              </div>
            </div>
            <div>
              <h2 className="font-outfit font-black text-2xl text-white mb-1">
                {complianceScore >= 80 ? 'Compliant ✓' : complianceScore >= 60 ? 'Partially Compliant' : 'Non-Compliant ✗'}
              </h2>
              <p className="text-white/40 text-sm mb-3">PSG College of Technology · TNSDC Code: TNSDC-001</p>
              <div className="flex gap-3 text-xs">
                <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-full font-semibold">{list.filter(c=>c.status==='done').length} Completed</span>
                <span className="bg-amber-500/15 text-amber-400 border border-amber-500/25 px-3 py-1 rounded-full font-semibold">{list.filter(c=>c.status==='pending').length} Pending</span>
                <span className="bg-red-500/15 text-red-400 border border-red-500/25 px-3 py-1 rounded-full font-semibold">{list.filter(c=>c.status==='overdue').length} Overdue</span>
              </div>
            </div>
          </motion.div>

          {/* Checklist */}
          <h2 className="font-outfit font-bold text-white text-lg mb-4">Compliance Checklist</h2>
          <div className="flex flex-col gap-3">
            {list.map((c, i) => {
              const { icon: Icon, cls, bg } = STATUS_STYLE[c.status]
              return (
                <motion.div key={c.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border ${bg}`}>
                  <Icon size={20} className={`${cls} flex-shrink-0`} />
                  <div className="flex-1">
                    <p className="text-white/75 text-sm font-medium">{c.item}</p>
                    <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1"><Clock size={9} />Due: {c.date}</p>
                  </div>
                  {c.status !== 'done' && (
                    <button onClick={() => setList(p => p.map(x => x.id===c.id ? {...x, status:'done'} : x))}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl ${c.status === 'overdue' ? 'bg-red-500 text-white' : 'bg-amber-500 text-black'}`}>
                      {c.status === 'overdue' ? 'Submit Now' : 'Mark Done'}
                    </button>
                  )}
                  {c.status === 'done' && <span className="text-emerald-400 text-xs font-semibold">Submitted</span>}
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
