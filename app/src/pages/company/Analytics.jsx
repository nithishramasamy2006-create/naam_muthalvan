import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { TrendingUp, Users, Award, Star } from 'lucide-react'

const BARS = [
  { month:'Jun', apps:18, hired:3 },{ month:'Jul', apps:34, hired:6 },{ month:'Aug', apps:48, hired:8 },
]
const DOMAINS = [
  { domain:'Web Development', count:42 },{ domain:'Data Science', count:28 },{ domain:'UI/UX Design', count:22 },{ domain:'IoT', count:15 },
]

export default function CompanyAnalytics() {
  const maxApps = Math.max(...BARS.map(b => b.apps))
  const maxDomain = Math.max(...DOMAINS.map(d => d.count))
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Company Analytics</h1>
          <p className="text-white/35 text-sm">Project performance · Hiring metrics · Q3 2026</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[{l:'Total Applications',v:'141',c:'from-indigo-500 to-violet-600',i:Users},{l:'Students Hired',v:'17',c:'from-emerald-500 to-teal-500',i:TrendingUp},{l:'Certs Issued',v:'12',c:'from-amber-500 to-orange-500',i:Award},{l:'Avg Rating',v:'4.8 ★',c:'from-pink-500 to-rose-600',i:Star}].map((s,i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.08 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={"w-10 h-10 rounded-xl bg-gradient-to-br " + s.c + " flex items-center justify-center flex-shrink-0"}><s.i size={18} className="text-white" /></div>
                <div><div className="font-outfit font-black text-xl text-white">{s.v}</div><div className="text-white/35 text-[11px]">{s.l}</div></div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
              <h2 className="font-outfit font-bold text-white text-base mb-5">Applications by Month</h2>
              <div className="flex items-end gap-4 h-40">
                {BARS.map((b, i) => (
                  <div key={b.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1" style={{ height: '120px', justifyContent: 'flex-end' }}>
                      <motion.div initial={{ height: 0 }} animate={{ height: (b.hired/b.apps)*100+'%' }} transition={{ duration: 0.8, delay: i*0.1+0.3 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400" style={{ minHeight: '8px' }} />
                      <motion.div initial={{ height: 0 }} animate={{ height: ((b.apps-b.hired)/maxApps)*80+'px' }} transition={{ duration: 0.8, delay: i*0.1+0.2 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500/40 to-indigo-400/20" style={{ minHeight: '8px' }} />
                    </div>
                    <span className="text-white/35 text-xs">{b.month}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-3 text-xs"><span className="flex items-center gap-1.5 text-white/40"><div className="w-3 h-3 rounded bg-indigo-500/40" />Applications</span><span className="flex items-center gap-1.5 text-white/40"><div className="w-3 h-3 rounded bg-emerald-500" />Hired</span></div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
              <h2 className="font-outfit font-bold text-white text-base mb-5">Applications by Domain</h2>
              <div className="flex flex-col gap-3">
                {DOMAINS.map((d,i) => (
                  <div key={d.domain}>
                    <div className="flex justify-between text-xs mb-1"><span className="text-white/55">{d.domain}</span><span className="text-white/35">{d.count}</span></div>
                    <div className="h-2 bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: (d.count/maxDomain*100)+'%' }} transition={{ duration: 0.7, delay: i*0.08+0.4 }}
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                    </div>
                  </div>
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
