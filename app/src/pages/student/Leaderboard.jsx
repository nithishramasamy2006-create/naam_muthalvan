import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Trophy, Star, TrendingUp, Award, Users, Crown, Medal } from 'lucide-react'

const LEADERS = [
  { rank: 1, name: 'Ramesh Vijay', college: 'Amrita, Coimbatore', dept: 'CSE', credits: 28, projects: 4, rating: 4.9, level: 'Silver', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=70', badge: '👑' },
  { rank: 2, name: 'Arjun Kumar', college: 'PSG Tech, Coimbatore', dept: 'CSE', credits: 24, projects: 3, rating: 4.85, level: 'Silver', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=70', badge: '🥈' },
  { rank: 3, name: 'Karthik Selvam', college: 'VIT Vellore', dept: 'CSE', credits: 20, projects: 2, rating: 4.7, level: 'Silver', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=70', badge: '🥉' },
  { rank: 4, name: 'Priya Nair', college: 'Anna University', dept: 'IT', credits: 18, projects: 2, rating: 4.9, level: 'Silver', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70', badge: '' },
  { rank: 5, name: 'Divya Mohan', college: 'NIT Trichy', dept: 'ECE', credits: 16, projects: 2, rating: 4.6, level: 'Silver', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=70', badge: '' },
  { rank: 6, name: 'Suresh Babu', college: 'SASTRA, Thanjavur', dept: 'IT', credits: 15, projects: 2, rating: 4.5, level: 'Silver', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=70', badge: '' },
  { rank: 7, name: 'Anitha Raj', college: 'Coimbatore Institute of Tech', dept: 'CSE', credits: 14, projects: 2, rating: 4.7, level: 'Bronze', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=70', badge: '' },
  { rank: 8, name: 'Vijay Kumar', college: 'SRM Institute', dept: 'CSE', credits: 13, projects: 1, rating: 4.8, level: 'Bronze', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=70', badge: '' },
  { rank: 9, name: 'Meera Krishnan', college: 'SRM Institute', dept: 'IT', credits: 12, projects: 1, rating: 4.3, level: 'Bronze', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=70', badge: '' },
  { rank: 10, name: 'Ravi Shankar', college: 'Anna University', dept: 'MECH', credits: 10, projects: 1, rating: 4.4, level: 'Bronze', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=70', badge: '' },
]

const RANK_STYLE = {
  1: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black',
  2: 'bg-gradient-to-r from-slate-300 to-slate-400 text-black',
  3: 'bg-gradient-to-r from-orange-500 to-amber-600 text-white',
}

export default function Leaderboard() {
  const [filter, setFilter] = useState('All TN')
  const podium = LEADERS.slice(0, 3)
  const rest = LEADERS.slice(3)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Leaderboard</h1>
          <p className="text-white/35 text-sm">Tamil Nadu NM Credit Rankings · Semester 2026</p>
        </div>
        <div className="p-8">
          {/* Filter tabs */}
          <div className="flex gap-2 mb-8">
            {['All TN', 'My College', 'My Department', 'This Month'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all ${filter === f ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Podium — top 3 */}
          <div className="flex items-end justify-center gap-4 mb-10">
            {[podium[1], podium[0], podium[2]].map((p, i) => {
              const heights = ['h-28', 'h-36', 'h-24']
              const pos = [2, 1, 3]
              return (
                <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }}
                  className="flex flex-col items-center gap-2">
                  <img src={p.img} alt={p.name} className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20 shadow-xl" />
                  <div className="text-center">
                    <p className="font-outfit font-bold text-white text-sm">{p.name}</p>
                    <p className="text-white/35 text-[10px]">{p.college}</p>
                    <p className="text-amber-400 font-black text-sm">{p.credits} credits</p>
                  </div>
                  <div className={`w-24 ${heights[i]} rounded-t-2xl flex items-start justify-center pt-3 font-outfit font-black text-2xl ${RANK_STYLE[pos[i]] || 'bg-white/10 text-white'}`}>
                    {pos[i]}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Ranks 4–10 */}
          <div className="flex flex-col gap-2">
            {rest.map((s, i) => (
              <motion.div key={s.rank} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all hover:border-white/15
                  ${s.name === 'Arjun Kumar' ? 'bg-indigo-500/10 border-indigo-500/25' : 'bg-white/[0.025] border-white/8'}`}>
                <div className="w-8 h-8 rounded-xl bg-white/8 flex items-center justify-center font-outfit font-black text-white/50 text-sm flex-shrink-0">{s.rank}</div>
                <img src={s.img} alt={s.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-outfit font-bold text-white text-sm">{s.name}</p>
                    {s.name === 'Arjun Kumar' && <span className="text-[9px] bg-indigo-500 text-white px-1.5 py-0.5 rounded-full font-bold">YOU</span>}
                  </div>
                  <p className="text-white/35 text-xs">{s.college} · {s.dept}</p>
                </div>
                <div className="flex items-center gap-6 text-right">
                  <div><p className="text-amber-400 font-black text-sm">{s.credits}</p><p className="text-white/25 text-[9px]">credits</p></div>
                  <div><p className="text-white/60 text-sm font-semibold">{s.projects}</p><p className="text-white/25 text-[9px]">projects</p></div>
                  <div className="flex items-center gap-1"><Star size={10} className="text-amber-400 fill-amber-400" /><span className="text-white/60 text-xs font-semibold">{s.rating}</span></div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.level === 'Silver' ? 'bg-slate-500/20 text-slate-300' : 'bg-amber-900/30 text-amber-600'}`}>{s.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
