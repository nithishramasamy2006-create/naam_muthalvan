import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Users, Award, CheckCircle, TrendingUp, ChevronRight, Star, Clock, BarChart3, FileText } from 'lucide-react'

const STATS = [
  { label: 'Enrolled Students', val: '842', change: '↑ 68 this month', color: 'from-emerald-500 to-teal-500', icon: Users },
  { label: 'NM Credits Issued', val: '4,218', change: '↑ 12% vs last sem', color: 'from-indigo-500 to-violet-500', icon: Award },
  { label: 'Projects Completed', val: '1,240', change: '94% completion rate', color: 'from-amber-500 to-orange-500', icon: CheckCircle },
  { label: 'Department Rank', val: '#3 / 65', change: '↑ from #7 last quarter', color: 'from-pink-500 to-rose-500', icon: Star },
]

const DEPARTMENTS = [
  { name: 'CSE', students: 210, completed: 198, credits: 1240, rate: 94 },
  { name: 'IT', students: 180, completed: 162, credits: 980, rate: 90 },
  { name: 'ECE', students: 150, completed: 120, credits: 720, rate: 80 },
  { name: 'MECH', students: 90, completed: 63, credits: 378, rate: 70 },
  { name: 'CIVIL', students: 80, completed: 52, credits: 312, rate: 65 },
]

const PENDING_CREDITS = [
  { name: 'Arjun Kumar', project: 'Analytics Dashboard — Zoho', credits: 8, date: 'Aug 25', dept: 'CSE', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70' },
  { name: 'Priya Nair', project: 'Mobile UI/UX — PayU India', credits: 4, date: 'Aug 26', dept: 'IT', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=70' },
  { name: 'Karthik Selvam', project: 'Python Scraper — DataMinds', credits: 5, date: 'Aug 27', dept: 'CSE', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70' },
  { name: 'Divya Mohan', project: 'IoT System — Hexaware', credits: 6, date: 'Aug 28', dept: 'ECE', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=70' },
]

export default function CollegeDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-xl text-white">College Dashboard</h1>
            <p className="text-white/35 text-sm">PSG College of Technology · Coimbatore · TNSDC Affiliated</p>
          </div>
          <Link to="/college/reports">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25">
              Generate Report
            </motion.button>
          </Link>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 relative overflow-hidden hover:border-white/15 transition-all">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <Icon size={16} className="text-white" />
                  </div>
                  <div className="font-outfit font-black text-2xl text-white mb-0.5">{s.val}</div>
                  <div className="text-white/35 text-xs mb-1">{s.label}</div>
                  <div className="text-emerald-400 text-[10px] font-semibold">{s.change}</div>
                </motion.div>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Department breakdown */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-outfit font-bold text-white text-lg">Department Performance</h2>
                <Link to="/college/analytics" className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  Full analytics <ChevronRight size={12} />
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {DEPARTMENTS.map((d, i) => (
                  <motion.div key={d.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-outfit font-bold text-white text-sm">{d.name}</span>
                      <div className="flex gap-4 text-xs text-white/40">
                        <span>{d.students} students</span>
                        <span>{d.credits} credits</span>
                        <span className={`font-bold ${d.rate >= 90 ? 'text-emerald-400' : d.rate >= 75 ? 'text-amber-400' : 'text-red-400'}`}>{d.rate}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${d.rate}%` }} transition={{ duration: 0.8, delay: 0.4 + i * 0.08 }}
                        className={`h-full rounded-full ${d.rate >= 90 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : d.rate >= 75 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-rose-500'}`} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Pending credits + quick links */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-outfit font-bold text-white text-base">Pending NM Credits</h2>
                  <Link to="/college/credits" className="text-xs text-amber-400 font-semibold flex items-center gap-1">12 pending <ChevronRight size={10} /></Link>
                </div>
                <div className="flex flex-col gap-2">
                  {PENDING_CREDITS.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:border-white/12 transition-all">
                      <img src={c.img} alt={c.name} className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/75 text-xs font-semibold truncate">{c.name}</p>
                        <p className="text-white/30 text-[10px] truncate">{c.project}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-emerald-400 text-xs font-bold">+{c.credits}</p>
                        <p className="text-white/20 text-[9px]">{c.dept}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link to="/college/credits">
                  <button className="w-full mt-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/20 transition-colors">
                    Approve All Pending Credits →
                  </button>
                </Link>
              </div>

              <div>
                <h2 className="font-outfit font-bold text-white text-base mb-3">Quick Links</h2>
                {[
                  { label: 'Student Onboarding', to: '/college/onboarding', icon: Users, color: 'from-emerald-500 to-teal-500' },
                  { label: 'TNSDC Compliance', to: '/college/tnsdc', icon: FileText, color: 'from-indigo-500 to-violet-500' },
                  { label: 'Generate Reports', to: '/college/reports', icon: BarChart3, color: 'from-amber-500 to-orange-500' },
                ].map(q => (
                  <Link key={q.to} to={q.to}>
                    <motion.div whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-colors group mb-1">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center flex-shrink-0`}>
                        <q.icon size={13} className="text-white" />
                      </div>
                      <span className="text-white/50 text-xs font-medium group-hover:text-white/75">{q.label}</span>
                      <ChevronRight size={12} className="text-white/20 ml-auto" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
