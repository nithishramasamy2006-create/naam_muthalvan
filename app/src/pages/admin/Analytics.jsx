import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { TrendingUp, Users, Building2, GraduationCap, Award } from 'lucide-react'

const BY_DOMAIN = [
  { domain:'Web Development', projects:42, apps:312 },
  { domain:'Data Science', projects:28, apps:198 },
  { domain:'UI/UX Design', projects:22, apps:176 },
  { domain:'IoT', projects:15, apps:98 },
  { domain:'Mobile Dev', projects:10, apps:82 },
]
const maxApps = Math.max(...BY_DOMAIN.map(d => d.apps))

export default function AdminAnalytics() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Analytics Dashboard</h1>
          <p className="text-white/35 text-sm">Platform-wide metrics · Tamil Nadu · 2026</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[{l:'Total NM Credits',v:'48,218',c:'from-amber-500 to-orange-500',i:Award},{l:'Students (TN)',v:'4,218',c:'from-indigo-500 to-violet-600',i:Users},{l:'Partner Companies',v:'120',c:'from-orange-500 to-red-500',i:Building2},{l:'Colleges',v:'65',c:'from-emerald-500 to-teal-500',i:GraduationCap}].map((s,i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.08 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={"w-10 h-10 rounded-xl bg-gradient-to-br " + s.c + " flex items-center justify-center"}><s.i size={18} className="text-white" /></div>
                <div><div className="font-outfit font-black text-xl text-white">{s.v}</div><div className="text-white/35 text-[11px]">{s.l}</div></div>
              </motion.div>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
            <h2 className="font-outfit font-bold text-white text-base mb-6">Applications by Domain (Platform-wide)</h2>
            <div className="flex flex-col gap-4">
              {BY_DOMAIN.map((d, i) => (
                <div key={d.domain}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/60 font-semibold">{d.domain}</span>
                    <div className="flex gap-4 text-white/35"><span>{d.projects} projects</span><span className="text-purple-400 font-bold">{d.apps} applications</span></div>
                  </div>
                  <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: (d.apps/maxApps*100)+'%' }} transition={{ duration: 0.8, delay: i*0.1+0.3 }}
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
