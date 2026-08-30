import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { TrendingUp, Users, Award, BarChart3 } from 'lucide-react'

const DEPTS = [
  { name:'CSE', students:210, completed:198, credits:1240, rate:94 },
  { name:'IT', students:180, completed:162, credits:980, rate:90 },
  { name:'ECE', students:150, completed:120, credits:720, rate:80 },
  { name:'MECH', students:90, completed:63, credits:378, rate:70 },
  { name:'CIVIL', students:80, completed:52, credits:312, rate:65 },
]
const MONTHS = [
  { m:'Jun', certs:42 },{ m:'Jul', certs:78 },{ m:'Aug', certs:124 },
]
const maxCerts = Math.max(...MONTHS.map(m => m.certs))

export default function CollegeAnalytics() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Participation Analytics</h1>
          <p className="text-white/35 text-sm">PSG College of Technology · Department-wise performance · 2026</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[{l:'Total Students',v:'842',c:'from-indigo-500 to-violet-600',i:Users},{l:'Projects Completed',v:'595',c:'from-emerald-500 to-teal-500',i:TrendingUp},{l:'NM Credits Issued',v:'3,630',c:'from-amber-500 to-orange-500',i:Award},{l:'Completion Rate',v:'94%',c:'from-pink-500 to-rose-600',i:BarChart3}].map((s,i) => (
              <motion.div key={s.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.08 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={"w-10 h-10 rounded-xl bg-gradient-to-br " + s.c + " flex items-center justify-center"}><s.i size={18} className="text-white" /></div>
                <div><div className="font-outfit font-black text-xl text-white">{s.v}</div><div className="text-white/35 text-[11px]">{s.l}</div></div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
              <h2 className="font-outfit font-bold text-white text-base mb-5">Department Completion Rates</h2>
              <div className="flex flex-col gap-4">
                {DEPTS.map((d,i) => (
                  <div key={d.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-white/60 font-semibold">{d.name}</span>
                      <div className="flex gap-3 text-white/35">
                        <span>{d.students} students</span>
                        <span>{d.credits} credits</span>
                        <span className={"font-bold " + (d.rate>=90?'text-emerald-400':d.rate>=75?'text-amber-400':'text-red-400')}>{d.rate}%</span>
                      </div>
                    </div>
                    <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: d.rate+'%' }} transition={{ duration: 0.8, delay: i*0.1+0.3 }}
                        className={"h-full rounded-full " + (d.rate>=90?'bg-gradient-to-r from-emerald-500 to-teal-500':d.rate>=75?'bg-gradient-to-r from-amber-500 to-orange-500':'bg-gradient-to-r from-red-500 to-rose-500')} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.025] border border-white/8">
              <h2 className="font-outfit font-bold text-white text-base mb-5">Certificates Issued by Month</h2>
              <div className="flex items-end gap-6 h-40 justify-center">
                {MONTHS.map((m,i) => (
                  <div key={m.m} className="flex flex-col items-center gap-2 flex-1">
                    <span className="text-white/40 text-xs">{m.certs}</span>
                    <motion.div initial={{ height: 0 }} animate={{ height: (m.certs/maxCerts*100)+'px' }} transition={{ duration: 0.8, delay: i*0.12+0.3 }}
                      className="w-full max-w-[60px] rounded-t-xl bg-gradient-to-t from-emerald-500 to-teal-400" />
                    <span className="text-white/35 text-xs">{m.m}</span>
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
