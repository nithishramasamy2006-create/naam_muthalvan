import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Search, Trophy, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const COLLEGES = [
  { rank:1, name:'PSG College of Technology', dist:'Coimbatore', students:842, credits:4218, rate:94, change:'up', type:'Autonomous' },
  { rank:2, name:'Anna University', dist:'Chennai', students:760, credits:3820, rate:90, change:'up', type:'Government' },
  { rank:3, name:'NIT Trichy', dist:'Trichy', students:680, credits:3200, rate:85, change:'same', type:'NIT' },
  { rank:4, name:'VIT Vellore', dist:'Vellore', students:620, credits:2980, rate:83, change:'up', type:'Deemed' },
  { rank:5, name:'Amrita, Coimbatore', dist:'Coimbatore', students:540, credits:2640, rate:80, change:'down', type:'Deemed' },
  { rank:6, name:'SASTRA Thanjavur', dist:'Thanjavur', students:480, credits:2310, rate:77, change:'up', type:'Deemed' },
  { rank:7, name:'SRM Institute, Chennai', dist:'Chennai', students:420, credits:1980, rate:72, change:'down', type:'Deemed' },
  { rank:8, name:'Coimbatore Inst. of Tech.', dist:'Coimbatore', students:380, credits:1740, rate:70, change:'same', type:'Self-Financing' },
]

const RANK_STYLE = { 1:'bg-amber-400 text-black', 2:'bg-slate-300 text-black', 3:'bg-orange-600 text-white' }

export default function AdminColleges() {
  const [search, setSearch] = useState('')
  const filtered = COLLEGES.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.dist.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Colleges Management</h1>
          <p className="text-white/35 text-sm">65 TNSDC-affiliated colleges across Tamil Nadu · Ranked by NM Credits</p>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mt-3 max-w-md">
            <Search size={13} className="text-white/30" />
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search colleges or districts…"
              className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
          </div>
        </div>
        <div className="p-8">
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  {['Rank','College','District','Type','Students','NM Credits','Completion','Trend'].map(h => (
                    <th key={h} className="text-left text-white/30 text-[10px] font-bold uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((c,i) => (
                  <motion.tr key={c.rank} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className={"w-8 h-8 rounded-xl flex items-center justify-center font-outfit font-black text-sm " + (RANK_STYLE[c.rank] || 'bg-white/8 text-white/50')}>{c.rank}</div>
                    </td>
                    <td className="px-4 py-3"><p className="text-white text-sm font-semibold">{c.name}</p></td>
                    <td className="px-4 py-3 text-white/40 text-xs">{c.dist}</td>
                    <td className="px-4 py-3 text-white/40 text-xs">{c.type}</td>
                    <td className="px-4 py-3 text-white/60 text-xs font-semibold">{c.students}</td>
                    <td className="px-4 py-3 text-amber-400 text-sm font-black">{c.credits.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-white/8 rounded-full overflow-hidden"><div className={"h-full rounded-full " + (c.rate>=90?'bg-emerald-500':c.rate>=75?'bg-amber-500':'bg-red-500')} style={{ width: c.rate+'%' }} /></div>
                        <span className={"text-xs font-bold " + (c.rate>=90?'text-emerald-400':c.rate>=75?'text-amber-400':'text-red-400')}>{c.rate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {c.change==='up' && <TrendingUp size={14} className="text-emerald-400" />}
                      {c.change==='down' && <TrendingDown size={14} className="text-red-400" />}
                      {c.change==='same' && <Minus size={14} className="text-white/30" />}
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
