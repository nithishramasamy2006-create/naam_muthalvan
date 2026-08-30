import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Sidebar from '../../components/Sidebar'
import { getJobRecommendations, DEMO_STUDENT_PROFILE } from '../../lib/aiJobs'
import { Sparkles, MapPin, Briefcase, TrendingUp, CheckCircle, XCircle, ArrowRight, Filter, Users, Trophy, Star, Zap } from 'lucide-react'

const DOMAINS = ['All', 'Web Development', 'Data Science', 'Mobile Development', 'Cloud & DevOps', 'IoT & Embedded', 'Design', 'Cybersecurity']

function MatchRing({ score, size = 80 }) {
  const r = (size / 2) - 8
  const circumference = 2 * Math.PI * r
  const dash = (score / 100) * circumference
  const color = score >= 75 ? '#10B981' : score >= 50 ? '#F59E0B' : score >= 30 ? '#4F46E5' : '#94A3B8'

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-outfit font-black text-white text-sm leading-none">{score}%</span>
        <span className="text-white/30 text-[9px]">match</span>
      </div>
    </div>
  )
}

function SkillPill({ skill, matched }) {
  return (
    <span className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border
      ${matched
        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25'
        : 'bg-rose-500/10 text-rose-400 border-rose-500/25'}`}>
      {matched ? <CheckCircle size={10} /> : <XCircle size={10} />}
      {skill}
    </span>
  )
}

function JobCard({ job, index }) {
  const [expanded, setExpanded] = useState(false)

  const scoreBg = job.score >= 75 ? 'from-emerald-900/40 to-emerald-900/10 border-emerald-500/20'
    : job.score >= 50 ? 'from-amber-900/30 to-amber-900/10 border-amber-500/20'
    : 'from-indigo-900/30 to-indigo-900/10 border-indigo-500/15'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative rounded-2xl border bg-gradient-to-br ${scoreBg} backdrop-blur-sm overflow-hidden cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Top accent line based on match */}
      <div className={`h-0.5 w-full bg-gradient-to-r ${job.color}`} />

      <div className="p-5">
        <div className="flex items-start gap-4">
          {/* Logo */}
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
            {job.logo}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <div>
                <h3 className="font-outfit font-bold text-white text-base leading-tight">{job.title}</h3>
                <p className="text-white/50 text-sm">{job.company}</p>
              </div>
              <MatchRing score={job.score} size={64} />
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-white/40 mb-3">
              <span className="flex items-center gap-1"><MapPin size={10} />{job.location}</span>
              <span className="flex items-center gap-1"><Briefcase size={10} />{job.type}</span>
              <span className="flex items-center gap-1"><Users size={10} />{job.openings} openings</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">₹{job.salaryMin}–{job.salaryMax} LPA</span>
            </div>

            {/* AI Insight */}
            <div className="flex items-start gap-2 bg-white/5 border border-white/8 rounded-xl p-3 mb-3">
              <Sparkles size={13} className="text-violet-400 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-xs leading-relaxed">{job.insight}</p>
            </div>

            {/* Skill pills - preview */}
            <div className="flex flex-wrap gap-1.5">
              {job.matched.slice(0, 3).map(s => <SkillPill key={s} skill={s} matched />)}
              {job.missing.slice(0, 2).map(s => <SkillPill key={s} skill={s} matched={false} />)}
              {(job.matched.length + job.missing.length > 5) && (
                <span className="text-xs text-white/30 px-2 py-1">+{job.matched.length + job.missing.length - 5} more</span>
              )}
            </div>
          </div>
        </div>

        {/* Expanded section */}
        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="mt-4 pt-4 border-t border-white/8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Required Skills</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.matched.map(s => <SkillPill key={s} skill={s} matched />)}
                      {job.missing.map(s => <SkillPill key={s} skill={s} matched={false} />)}
                    </div>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">Nice to Have</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.niceMatched.map(s => <SkillPill key={s} skill={s} matched />)}
                      {(job.niceToHave || []).filter(s => !job.niceMatched.includes(s)).map(s => (
                        <span key={s} className="text-xs font-medium px-2.5 py-1 rounded-full border bg-white/5 text-white/30 border-white/10">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 mb-4 flex items-start gap-2">
                  <Zap size={13} className="text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-amber-300 text-xs font-semibold mb-0.5">Bridge Suggestion</div>
                    <p className="text-white/55 text-xs">{job.bridgeProject}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-white/40">
                    <Trophy size={12} className="text-amber-400" />
                    {job.nmCreditsRequired} NM Credits required
                    {job.creditsOk ? <span className="text-emerald-400 ml-1">✓ You qualify</span> : <span className="text-rose-400 ml-1">You need {job.nmCreditsRequired - DEMO_STUDENT_PROFILE.nmCredits} more credits</span>}
                  </div>
                  <motion.a href="#" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className={`ml-auto flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r ${job.color} text-white shadow-lg`}
                    onClick={e => e.stopPropagation()}>
                    Apply Now <ArrowRight size={12} />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expand hint */}
        <div className="text-center mt-3">
          <span className="text-white/20 text-[10px]">{expanded ? '▲ collapse' : '▼ click for details'}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function AIJobs() {
  const [domain, setDomain] = useState('All')
  const [minMatch, setMinMatch] = useState(0)

  const recommendations = useMemo(() => getJobRecommendations(DEMO_STUDENT_PROFILE), [])
  const filtered = useMemo(() => recommendations.filter(j =>
    (domain === 'All' || j.domain === domain) && j.score >= minMatch
  ), [recommendations, domain, minMatch])

  const topJob = recommendations[0]
  const avgScore = Math.round(recommendations.reduce((s, j) => s + j.score, 0) / recommendations.length)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">AI Powered</span>
              </div>
              <h1 className="font-outfit font-black text-2xl text-white">Job Recommendations</h1>
              <p className="text-white/35 text-sm">Matched against your 3 certificates &bull; {DEMO_STUDENT_PROFILE.nmCredits} NM Credits &bull; {DEMO_STUDENT_PROFILE.skills.length} skills</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="font-outfit font-black text-3xl text-white">{recommendations.length}</div>
                <div className="text-white/30 text-xs">job matches</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Top match hero card */}
          {topJob && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="relative mb-8 p-6 rounded-3xl border border-white/10 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.08))' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-violet-600/5" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="relative z-10 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topJob.color} flex items-center justify-center text-3xl shadow-2xl`}>
                  {topJob.logo}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">🏆 Your Best Match</span>
                  </div>
                  <h2 className="font-outfit font-black text-xl text-white mb-1">{topJob.title} at {topJob.company}</h2>
                  <p className="text-white/45 text-sm">{topJob.insight}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <MatchRing score={topJob.score} size={90} />
                </div>
              </div>

              {/* Progress bar */}
              <div className="relative z-10 mt-4">
                <div className="flex justify-between text-xs text-white/30 mb-1.5">
                  <span>Skill Match Progress</span>
                  <span>{topJob.matched.length}/{topJob.requiredSkills.length} required skills met</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div className={`h-full bg-gradient-to-r ${topJob.color} rounded-full`}
                    initial={{ width: 0 }} animate={{ width: `${topJob.score}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Avg Match Score', value: `${avgScore}%`, icon: TrendingUp, color: 'text-indigo-400' },
              { label: 'Roles You Qualify', value: recommendations.filter(j => j.score >= 50).length, icon: CheckCircle, color: 'text-emerald-400' },
              { label: 'Skills Gaps to Close', value: [...new Set(recommendations.flatMap(j => j.missing))].length, icon: Star, color: 'text-amber-400' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                className="p-4 rounded-2xl bg-white/3 border border-white/8 flex items-center gap-4">
                <s.icon size={22} className={s.color} />
                <div>
                  <div className={`font-outfit font-black text-2xl ${s.color}`}>{s.value}</div>
                  <div className="text-white/35 text-xs">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Filter size={14} className="text-white/30" />
            <div className="flex flex-wrap gap-2">
              {DOMAINS.map(d => (
                <button key={d} onClick={() => setDomain(d)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                    ${domain === d ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-3 text-xs text-white/40">
              <span>Min match:</span>
              {[0, 30, 50, 75].map(v => (
                <button key={v} onClick={() => setMinMatch(v)}
                  className={`px-2 py-1 rounded-lg border transition-all ${minMatch === v ? 'border-violet-500 text-violet-300 bg-violet-500/15' : 'border-white/10 hover:border-white/20'}`}>
                  {v === 0 ? 'All' : `${v}%+`}
                </button>
              ))}
            </div>
          </div>

          {/* Job cards */}
          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-16 text-white/30">
                  <div className="text-5xl mb-4">🔍</div>
                  <div className="font-outfit font-bold text-lg text-white/50">No matches for this filter</div>
                  <div className="text-sm mt-1">Try lowering the minimum match score</div>
                </motion.div>
              ) : filtered.map((job, i) => (
                <JobCard key={job.id} job={job} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Swiper - Quick job cards carousel at bottom */}
          <div className="mt-12">
            <h2 className="font-outfit font-bold text-white text-lg mb-4">🎯 Trending Roles in Tamil Nadu</h2>
            <Swiper modules={[Navigation, Pagination]} slidesPerView={1} spaceBetween={16}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              pagination={{ clickable: true }} className="pb-10">
              {recommendations.slice(0, 6).map(job => (
                <SwiperSlide key={job.id}>
                  <motion.div whileHover={{ y: -4 }} className={`p-4 rounded-2xl border bg-gradient-to-br ${job.color.replace('from-', 'from-').replace(' to-', '/20 to-').replace(/-\d+/g, m => m.replace(/\d+/, n => Math.max(5, parseInt(n) - 35)))} border-white/10`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{job.logo}</span>
                      <span className={`font-outfit font-black text-lg ${job.score >= 75 ? 'text-emerald-400' : job.score >= 50 ? 'text-amber-400' : 'text-indigo-400'}`}>{job.score}%</span>
                    </div>
                    <h4 className="font-outfit font-bold text-white text-sm mb-1">{job.title}</h4>
                    <p className="text-white/40 text-xs mb-3">{job.company} · ₹{job.salaryMin}–{job.salaryMax} LPA</p>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${job.color} rounded-full`} style={{ width: `${job.score}%` }} />
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  )
}
