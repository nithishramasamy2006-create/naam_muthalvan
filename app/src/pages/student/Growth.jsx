import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { TrendingUp, Award, Star, Zap, Target, ArrowRight, Lock } from 'lucide-react'

const LEVELS = [
  { name: 'Bronze',   min: 0,  max: 9,  color: 'from-orange-700 to-amber-800', glow: 'shadow-orange-700/20', icon: '🥉', perks: ['Access to all micro-projects', 'NM student profile', 'Basic job matching'] },
  { name: 'Silver',   min: 10, max: 29, color: 'from-slate-400 to-slate-500',  glow: 'shadow-slate-400/20', icon: '🥈', perks: ['Priority application review', 'AI skill gap analysis', 'Silver badge on profile', 'Access to exclusive projects'] },
  { name: 'Gold',     min: 30, max: 59, color: 'from-amber-400 to-yellow-500', glow: 'shadow-amber-400/20', icon: '🥇', perks: ['Gold badge + TNSDC recognition', 'Direct company shortlisting', 'Featured in placement drives', 'Gold certificate from TNSDC'] },
  { name: 'Platinum', min: 60, max: 999,color: 'from-violet-400 to-purple-500',glow: 'shadow-violet-400/20', icon: '💎', perks: ['Platinum LinkedIn badge', 'Guaranteed interview slots', 'Personal NM mentor', 'Govt. internship pathway'] },
]

const ACHIEVEMENTS = [
  { title: 'First Project',     desc: 'Completed your first micro-project', earned: true,  icon: '🚀', credits: 0 },
  { title: 'Triple Verified',   desc: '3 NM-verified certificates earned',  earned: true,  icon: '📜', credits: 0 },
  { title: 'Top Rated',         desc: 'Avg mentor rating above 4.8',        earned: true,  icon: '⭐', credits: 0 },
  { title: 'Industry Ready',    desc: '5 industry skills validated',        earned: false, icon: '🏭', credits: 5 },
  { title: 'Hackathon Hero',    desc: 'Participated in a TN Skill event',  earned: false, icon: '🏆', credits: 3 },
  { title: 'Gold Achiever',     desc: 'Reach Gold Level (30 credits)',      earned: false, icon: '🥇', credits: 0 },
]

export default function Growth() {
  const currentCredits = 24
  const currentLevel = LEVELS.find(l => currentCredits >= l.min && currentCredits <= l.max)
  const nextLevel = LEVELS[LEVELS.findIndex(l => l.name === currentLevel?.name) + 1]
  const progress = nextLevel ? ((currentCredits - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100 : 100

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Growth & Achievements</h1>
          <p className="text-white/35 text-sm">NM Level progression · Achievements · Rewards</p>
        </div>

        <div className="p-8">
          {/* Current Level Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-8 p-6 rounded-3xl bg-gradient-to-br ${currentLevel?.color} relative overflow-hidden shadow-2xl ${currentLevel?.glow}`}>
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative flex items-center gap-6">
              <div className="text-6xl filter drop-shadow-xl">{currentLevel?.icon}</div>
              <div className="flex-1">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Current Level</p>
                <h2 className="font-outfit font-black text-4xl text-white mb-1">{currentLevel?.name} Level</h2>
                <p className="text-white/70 text-sm mb-4">{currentCredits} NM Credits earned</p>
                {nextLevel && (
                  <>
                    <div className="flex justify-between text-xs text-white/60 mb-1.5">
                      <span>{currentCredits} credits</span>
                      <span>{nextLevel.min} credits needed for {nextLevel.name}</span>
                    </div>
                    <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                        className="h-full bg-white rounded-full shadow-lg" />
                    </div>
                    <p className="text-white/60 text-xs mt-2">
                      {nextLevel.min - currentCredits} more credits to {nextLevel.name} Level 🎯
                    </p>
                  </>
                )}
              </div>
              <Link to="/student/ai-jobs">
                <motion.div whileHover={{ scale: 1.06 }}
                  className="flex items-center gap-2 bg-white/15 border border-white/25 backdrop-blur-sm text-white text-xs font-bold px-4 py-2.5 rounded-2xl cursor-pointer hover:bg-white/25 transition-all">
                  <Zap size={14} /> View AI Job Matches <ArrowRight size={12} />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {/* Level ladder */}
            <div>
              <h2 className="font-outfit font-bold text-white text-lg mb-4 flex items-center gap-2"><Target size={18} className="text-violet-400" /> Level Ladder</h2>
              <div className="flex flex-col gap-3">
                {LEVELS.map((lvl, i) => {
                  const isCurrentLevel = lvl.name === currentLevel?.name
                  const isPassed = LEVELS.findIndex(l => l.name === currentLevel?.name) > i
                  return (
                    <motion.div key={lvl.name} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                      className={`p-4 rounded-2xl border transition-all ${isCurrentLevel ? 'border-white/25 bg-white/8 shadow-lg' : isPassed ? 'border-white/10 bg-white/3' : 'border-white/5 bg-white/[0.015] opacity-60'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-lg shadow-lg ${lvl.glow}`}>
                          {isPassed || isCurrentLevel ? lvl.icon : <Lock size={16} className="text-white/40" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-outfit font-bold text-white text-sm">{lvl.name} Level</p>
                            {isCurrentLevel && <span className="text-[9px] bg-white/15 text-white px-2 py-0.5 rounded-full font-bold">YOU ARE HERE</span>}
                            {isPassed && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">✓ Completed</span>}
                          </div>
                          <p className="text-white/35 text-xs">{lvl.min}–{lvl.max === 999 ? '∞' : lvl.max} NM Credits</p>
                        </div>
                      </div>
                      {(isCurrentLevel || isPassed) && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {lvl.perks.map(p => (
                            <span key={p} className="text-[10px] text-white/45 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">✓ {p}</span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h2 className="font-outfit font-bold text-white text-lg mb-4 flex items-center gap-2"><Award size={18} className="text-amber-400" /> Achievements</h2>
              <div className="grid grid-cols-2 gap-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <motion.div key={a.title} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.08 }}
                    className={`p-4 rounded-2xl border text-center transition-all ${a.earned ? 'border-amber-500/25 bg-amber-500/8 shadow-lg shadow-amber-500/5' : 'border-white/6 bg-white/[0.015] opacity-50'}`}>
                    <div className={`text-3xl mb-2 ${!a.earned ? 'grayscale opacity-30' : 'filter drop-shadow-lg'}`}>{a.icon}</div>
                    <p className={`font-outfit font-bold text-xs mb-1 ${a.earned ? 'text-white' : 'text-white/30'}`}>{a.title}</p>
                    <p className="text-white/25 text-[10px] leading-tight">{a.desc}</p>
                    {!a.earned && a.credits > 0 && <p className="text-amber-400/60 text-[9px] mt-1">+{a.credits} NM Credits on unlock</p>}
                    {a.earned && <div className="flex items-center justify-center gap-1 mt-1.5 text-amber-400"><Star size={9} className="fill-amber-400" /><span className="text-[9px] font-bold">Earned</span></div>}
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
