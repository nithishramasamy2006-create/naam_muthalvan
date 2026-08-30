import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { TrendingUp, Target, CheckCircle, AlertCircle, Zap, ArrowRight, BookOpen, Star } from 'lucide-react'

const SKILL_DATA = [
  { skill: 'React.js',       have: 90, need: 85, status: 'strong',  domain: 'Frontend' },
  { skill: 'JavaScript',     have: 88, need: 90, status: 'close',   domain: 'Frontend' },
  { skill: 'Node.js',        have: 60, need: 80, status: 'gap',     domain: 'Backend' },
  { skill: 'MongoDB',        have: 45, need: 75, status: 'gap',     domain: 'Backend' },
  { skill: 'Python',         have: 75, need: 70, status: 'strong',  domain: 'Data' },
  { skill: 'TensorFlow',     have: 30, need: 65, status: 'gap',     domain: 'Data' },
  { skill: 'Figma',          have: 80, need: 70, status: 'strong',  domain: 'Design' },
  { skill: 'TypeScript',     have: 20, need: 70, status: 'gap',     domain: 'Frontend' },
  { skill: 'Docker',         have: 15, need: 60, status: 'gap',     domain: 'DevOps' },
  { skill: 'REST API',       have: 85, need: 80, status: 'strong',  domain: 'Backend' },
  { skill: 'SQL',            have: 55, need: 70, status: 'close',   domain: 'Backend' },
  { skill: 'Git',            have: 82, need: 80, status: 'strong',  domain: 'DevOps' },
]

const RECOMMENDED = [
  { title: 'MongoDB Basics to Advanced', type: 'Project', company: 'Hexaware', credits: 6, img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=70', match: '+14% match after completion' },
  { title: 'Node.js REST API Development', type: 'Bootcamp', company: 'TN Events', credits: 8, img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&q=70', match: '+12% match after completion' },
  { title: 'TypeScript Crash Course', type: 'Workshop', company: 'Freshworks', credits: 4, img: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=300&q=70', match: '+10% match after completion' },
]

const STATUS_COLOR = { strong: 'bg-emerald-500', close: 'bg-amber-400', gap: 'bg-red-500' }
const STATUS_TEXT  = { strong: 'text-emerald-400', close: 'text-amber-400', gap: 'text-red-400' }
const STATUS_LABEL = { strong: 'Strong', close: 'Almost', gap: 'Gap' }

export default function SkillGap() {
  const [domain, setDomain] = useState('All')
  const domains = ['All', 'Frontend', 'Backend', 'Data', 'Design', 'DevOps']

  const filtered = SKILL_DATA.filter(s => domain === 'All' || s.domain === domain)
  const gaps    = SKILL_DATA.filter(s => s.status === 'gap').length
  const strongs = SKILL_DATA.filter(s => s.status === 'strong').length
  const overallScore = Math.round(SKILL_DATA.reduce((sum, s) => sum + Math.min(s.have / s.need, 1), 0) / SKILL_DATA.length * 100)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Skill Gap Analysis</h1>
          <p className="text-white/35 text-sm">Mapped against NM Skill Taxonomy v2.4 · Industry Benchmarks 2026</p>
        </div>

        <div className="p-8">
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Overall Readiness', val: `${overallScore}%`, icon: Target, color: 'from-indigo-500 to-violet-600' },
              { label: 'Strong Skills',     val: strongs,            icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
              { label: 'Skill Gaps',        val: gaps,               icon: AlertCircle, color: 'from-red-500 to-rose-600' },
              { label: 'Skills Tracked',    val: SKILL_DATA.length,  icon: BookOpen, color: 'from-amber-500 to-orange-500' },
            ].map((s, i) => (
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

          <div className="grid grid-cols-3 gap-6">
            {/* Skill bars */}
            <div className="col-span-2">
              {/* Domain filter */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {domains.map(d => (
                  <button key={d} onClick={() => setDomain(d)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${domain === d ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                    {d}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                {filtered.map((s, i) => {
                  const pct = Math.min(s.have, 100)
                  const needPct = Math.min(s.need, 100)
                  return (
                    <motion.div key={s.skill} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/12 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-outfit font-bold text-white text-sm">{s.skill}</span>
                          <span className="text-[9px] text-white/30 bg-white/5 px-1.5 py-0.5 rounded-full">{s.domain}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${STATUS_TEXT[s.status]}`}>{STATUS_LABEL[s.status]}</span>
                          <span className="text-white/40 text-xs">{s.have}% / {s.need}% needed</span>
                        </div>
                      </div>
                      {/* Progress bar */}
                      <div className="relative h-2 bg-white/8 rounded-full overflow-hidden">
                        {/* Need marker */}
                        <div className="absolute top-0 bottom-0 w-0.5 bg-white/30 z-10" style={{ left: `${needPct}%` }} />
                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, delay: 0.2 + i * 0.04 }}
                          className={`h-full rounded-full ${STATUS_COLOR[s.status]}`} />
                      </div>
                      {s.status === 'gap' && (
                        <p className="text-red-400/70 text-[10px] mt-1 flex items-center gap-1">
                          <Zap size={9} /> Close this gap to unlock {s.need - s.have}% more job matches
                        </p>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Right: recommended bridge projects */}
            <div>
              <h2 className="font-outfit font-bold text-white text-base mb-4">Bridge the Gap</h2>
              <p className="text-white/35 text-xs mb-4">AI recommends these to close your top skill gaps:</p>
              <div className="flex flex-col gap-3">
                {RECOMMENDED.map((r, i) => (
                  <motion.div key={r.title} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                    className="rounded-2xl border border-white/8 overflow-hidden hover:border-white/15 transition-all group cursor-pointer">
                    <div className="relative h-24 overflow-hidden">
                      <img src={r.img} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] to-transparent" />
                      <span className="absolute top-2 right-2 text-[9px] bg-indigo-600 text-white px-2 py-0.5 rounded-full font-bold">{r.type}</span>
                      <span className="absolute bottom-2 left-2 text-[9px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-bold">+{r.credits} NM Credits</span>
                    </div>
                    <div className="p-3">
                      <p className="text-white/80 text-xs font-semibold leading-tight mb-1">{r.title}</p>
                      <p className="text-white/30 text-[10px]">{r.company}</p>
                      <p className="text-emerald-400 text-[10px] mt-1 flex items-center gap-1"><TrendingUp size={9} />{r.match}</p>
                    </div>
                  </motion.div>
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
