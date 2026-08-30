import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, Clock, AlertCircle, Download, Filter } from 'lucide-react'

const PENDING = [
  { id:1, student:'Arjun Kumar', dept:'CSE', project:'Analytics Dashboard', company:'Zoho Corporation', credits:8, date:'Aug 25', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70' },
  { id:2, student:'Priya Nair', dept:'IT', project:'Mobile UI/UX Redesign', company:'PayU India', credits:4, date:'Aug 26', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=70' },
  { id:3, student:'Karthik Selvam', dept:'CSE', project:'Python Scraper Pipeline', company:'DataMinds', credits:5, date:'Aug 27', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70' },
  { id:4, student:'Divya Mohan', dept:'ECE', project:'IoT Smart Campus', company:'Hexaware', credits:6, date:'Aug 28', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=70' },
  { id:5, student:'Ramesh Vijay', dept:'CSE', project:'AI Chatbot', company:'Freshworks', credits:7, date:'Aug 29', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=70' },
  { id:6, student:'Meera K', dept:'IT', project:'React Dashboard', company:'Zoho', credits:8, date:'Aug 29', img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&q=70' },
  { id:7, student:'Suresh B', dept:'CSE', project:'Node.js API', company:'Hexaware', credits:6, date:'Aug 30', img:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&q=70' },
]

export default function CollegeCredits() {
  const [credits, setCredits] = useState(PENDING.map(c => ({ ...c, approved: false })))
  const approveOne = (id) => setCredits(p => p.map(c => c.id === id ? { ...c, approved: true } : c))
  const approveAll = () => setCredits(p => p.map(c => ({ ...c, approved: true })))
  const approved = credits.filter(c => c.approved).length
  const pending = credits.filter(c => !c.approved).length
  const totalCredits = credits.filter(c => c.approved).reduce((s, c) => s + c.credits, 0)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">NM Credit Mapping</h1>
            <p className="text-white/35 text-sm">{pending} credits pending TNSDC approval · {approved} approved</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/8">
              <Download size={13} /> Export Report
            </button>
            <motion.button whileHover={{ scale: 1.04 }} onClick={approveAll}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg">
              <CheckCircle size={16} /> Approve All Pending ({pending})
            </motion.button>
          </div>
        </div>

        <div className="p-8">
          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Pending Approval', val: pending, color: 'from-amber-500 to-orange-500', icon: Clock },
              { label: 'Credits Approved', val: totalCredits, color: 'from-emerald-500 to-teal-500', icon: CheckCircle },
              { label: 'Students Benefited', val: approved, color: 'from-indigo-500 to-violet-600', icon: CheckCircle },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.08 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0`}><s.icon size={18} className="text-white" /></div>
                <div><div className="font-outfit font-black text-2xl text-white">{s.val}</div><div className="text-white/35 text-xs">{s.label}</div></div>
              </motion.div>
            ))}
          </div>

          {/* Credit list */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  {['Student', 'Dept', 'Project', 'Company', 'Credits', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left text-white/30 text-[10px] font-bold uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {credits.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    className={`border-b border-white/5 transition-colors ${c.approved ? 'bg-emerald-500/3' : 'hover:bg-white/[0.015]'}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={c.img} alt={c.student} className="w-7 h-7 rounded-lg object-cover" />
                        <span className="text-white text-xs font-semibold">{c.student}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{c.dept}</td>
                    <td className="px-4 py-3 text-white/60 text-xs max-w-[160px] truncate">{c.project}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{c.company}</td>
                    <td className="px-4 py-3 text-amber-400 text-sm font-black">+{c.credits}</td>
                    <td className="px-4 py-3 text-white/30 text-xs">{c.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.approved ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                        {c.approved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {!c.approved ? (
                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => approveOne(c.id)}
                          className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md">
                          Approve
                        </motion.button>
                      ) : (
                        <CheckCircle size={14} className="text-emerald-400" />
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
