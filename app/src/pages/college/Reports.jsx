import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Download, FileText, BarChart3, Award, Users } from 'lucide-react'

const REPORTS = [
  { title:'TNSDC Q2 2026 Compliance Report', type:'Compliance', date:'Aug 10, 2026', size:'2.4 MB', icon: FileText, color:'from-indigo-500 to-violet-600' },
  { title:'NM Credit Mapping — Sem 2026 (Odd)', type:'Credits', date:'Aug 15, 2026', size:'1.8 MB', icon: Award, color:'from-amber-500 to-orange-500' },
  { title:'Student Participation — Aug 2026', type:'Participation', date:'Aug 28, 2026', size:'3.1 MB', icon: Users, color:'from-emerald-500 to-teal-500' },
  { title:'Department Analytics Q3 2026', type:'Analytics', date:'Aug 25, 2026', size:'4.2 MB', icon: BarChart3, color:'from-pink-500 to-rose-600' },
]

export default function CollegeReports() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div><h1 className="font-outfit font-black text-2xl text-white">Generate Reports</h1><p className="text-white/35 text-sm">Export TNSDC compliance, credit, and participation reports</p></div>
          <motion.button whileHover={{ scale: 1.04 }} className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"><Download size={16} /> Generate New Report</motion.button>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4">
            {REPORTS.map((r, i) => {
              const Icon = r.icon
              return (
                <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/15 transition-all group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={"w-12 h-12 rounded-2xl bg-gradient-to-br " + r.color + " flex items-center justify-center shadow-lg flex-shrink-0"}><Icon size={22} className="text-white" /></div>
                    <div className="flex-1"><h3 className="font-outfit font-bold text-white text-sm leading-tight">{r.title}</h3><p className="text-white/35 text-xs mt-1">{r.type} · {r.date} · {r.size}</p></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:bg-white/8 hover:text-white/70 transition-all">
                    <Download size={13} /> Download PDF
                  </motion.button>
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
