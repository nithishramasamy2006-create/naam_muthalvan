import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import StatWidget from '../../components/StatWidget'
import AIChatbot from '../../components/AIChatbot'
import { getJobRecommendations, DEMO_STUDENT_PROFILE } from '../../lib/aiJobs'
import { Award, TrendingUp, FolderOpen, Sparkles, ArrowRight, CheckCircle, Clock, Star, Zap, ChevronRight } from 'lucide-react'

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } } }

const recentActivities = [
  { icon: '🏆', label: 'Certificate Issued', detail: 'Mobile App UI/UX Design — PayU India', time: '2 days ago', color: 'text-amber-400' },
  { icon: '✅', label: 'Task Completed', detail: 'Chart integration on Analytics Dashboard', time: '3 days ago', color: 'text-emerald-400' },
  { icon: '💬', label: 'Mentor Message', detail: 'Kavitha Rajan: "You\'re on track!"', time: '4 days ago', color: 'text-indigo-400' },
  { icon: '🎯', label: 'Application Shortlisted', detail: 'IoT Smart Home System — Hexaware', time: '5 days ago', color: 'text-violet-400' },
]

const projects = [
  { name: 'Analytics Dashboard', company: 'Zoho Corp', progress: 65, deadline: 'Sep 10', status: 'In Progress', color: 'from-indigo-500 to-violet-500' },
  { name: 'API Integration Module', company: 'TechBridge', progress: 30, deadline: 'Sep 18', status: 'Early Stage', color: 'from-orange-500 to-red-500' },
]

export default function StudentDashboard() {
  const recommendations = getJobRecommendations(DEMO_STUDENT_PROFILE)
  const topJobs = recommendations.slice(0, 3)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />

      <main className="flex-1 overflow-y-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-xl text-white">Good morning, Arjun 👋</h1>
            <p className="text-white/35 text-sm">PSG College of Technology • CSE-B • Sem 7</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/student/ai-jobs">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/25">
                <Sparkles size={14} /> AI Job Match
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="p-8">
          {/* Stat widgets */}
          <motion.div variants={stagger} initial="hidden" animate="show"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatWidget value="1,420" label="Total XP Points" change="↑ +120 this week" icon={Star} gradient="bg-gradient-to-br from-amber-400 to-orange-500" delay={0} />
            <StatWidget value="24" label="NM Credits Earned" change="↑ +6 this month" icon={Award} gradient="bg-gradient-to-br from-indigo-500 to-violet-600" delay={0.08} />
            <StatWidget value="4/10" label="Projects Completed" change="2 in progress" icon={FolderOpen} gradient="bg-gradient-to-br from-emerald-500 to-teal-600" delay={0.16} />
            <StatWidget value="4.8 ★" label="Avg Mentor Rating" change="↑ Top 10%" icon={TrendingUp} gradient="bg-gradient-to-br from-pink-500 to-rose-500" delay={0.24} />
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {/* Left col */}
            <div className="col-span-2 flex flex-col gap-6">
              {/* Active Projects */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-outfit font-bold text-white text-lg">Active Projects</h2>
                  <Link to="/student/workspace" className="text-indigo-400 text-xs font-semibold flex items-center gap-1 hover:text-indigo-300">View workspace <ChevronRight size={12} /></Link>
                </div>
                <div className="flex flex-col gap-3">
                  {projects.map((p, i) => (
                    <motion.div key={p.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 + i * 0.1, duration: 0.5 }}
                      className="p-4 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-outfit font-semibold text-white text-sm">{p.name}</div>
                          <div className="text-white/35 text-xs">{p.company}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-white/30 text-xs flex items-center gap-1"><Clock size={10} /> {p.deadline}</span>
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full
                            ${p.status === 'In Progress' ? 'bg-indigo-500/15 text-indigo-400' : 'bg-amber-500/15 text-amber-400'}`}>
                            {p.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <motion.div className={`h-full bg-gradient-to-r ${p.color} rounded-full`}
                            initial={{ width: 0 }} animate={{ width: `${p.progress}%` }}
                            transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }} />
                        </div>
                        <span className="text-white/40 text-xs font-medium">{p.progress}%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* AI Job Snapshot */}
              <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.45 }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                      <Sparkles size={11} className="text-white" />
                    </div>
                    <h2 className="font-outfit font-bold text-white text-lg">AI Job Matches</h2>
                  </div>
                  <Link to="/student/ai-jobs" className="text-violet-400 text-xs font-semibold flex items-center gap-1 hover:text-violet-300">See all {recommendations.length} <ArrowRight size={12} /></Link>
                </div>
                <div className="flex flex-col gap-2">
                  {topJobs.map((job, i) => (
                    <motion.div key={job.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.45 }}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all group cursor-pointer">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-lg shadow-md flex-shrink-0`}>
                        {job.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-outfit font-semibold text-white text-sm truncate">{job.title}</div>
                        <div className="text-white/35 text-xs">{job.company} · ₹{job.salaryMin}–{job.salaryMax} LPA</div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="h-1 w-20 bg-white/8 rounded-full overflow-hidden">
                          <motion.div className={`h-full bg-gradient-to-r ${job.color} rounded-full`}
                            initial={{ width: 0 }} animate={{ width: `${job.score}%` }}
                            transition={{ delay: 0.6 + i * 0.08, duration: 0.7 }} />
                        </div>
                        <span className={`font-outfit font-bold text-sm ${job.score >= 75 ? 'text-emerald-400' : job.score >= 50 ? 'text-amber-400' : 'text-indigo-400'}`}>
                          {job.score}%
                        </span>
                      </div>
                      <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
                    </motion.div>
                  ))}
                </div>

                {/* Skill gap teaser */}
                <Link to="/student/ai-jobs">
                  <motion.div whileHover={{ scale: 1.01 }} className="mt-3 p-4 rounded-xl bg-gradient-to-r from-violet-900/30 to-indigo-900/20 border border-violet-500/20 flex items-center gap-3 cursor-pointer">
                    <Zap size={16} className="text-amber-400 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-white/70 text-sm font-medium">Top gap to close: <span className="text-amber-400">MongoDB</span></div>
                      <div className="text-white/30 text-xs">Add MongoDB to your profile → +8% match on 3 roles</div>
                    </div>
                    <ArrowRight size={14} className="text-white/30" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>

            {/* Right col */}
            <div className="flex flex-col gap-6">
              {/* NM Credit ring */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
                className="p-5 rounded-2xl bg-gradient-to-br from-indigo-900/40 to-violet-900/20 border border-indigo-500/20">
                <div className="font-outfit font-bold text-white text-sm mb-3">NM Credit Progress</div>
                <div className="flex items-center justify-center my-3">
                  <div className="relative w-24 h-24">
                    <svg width="96" height="96" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="48" cy="48" r="40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                      <motion.circle cx="48" cy="48" r="40" fill="none" stroke="url(#cgrad)" strokeWidth="8"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: 251 }}
                        animate={{ strokeDashoffset: 251 - (24 / 30) * 251 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        style={{ strokeDasharray: 251 }} />
                      <defs>
                        <linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#4F46E5" />
                          <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="font-outfit font-black text-xl text-white">24</div>
                      <div className="text-white/30 text-[10px]">/ 30 Gold</div>
                    </div>
                  </div>
                </div>
                <div className="text-white/40 text-xs text-center">6 more credits to reach Gold Level 🥇</div>
                <Link to="/student/certificates">
                  <button className="w-full mt-3 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold hover:bg-indigo-500/25 transition-colors">
                    View Certificates →
                  </button>
                </Link>
              </motion.div>

              {/* Activity feed */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col gap-1">
                <div className="font-outfit font-bold text-white text-sm mb-3">Recent Activity</div>
                {recentActivities.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55 + i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                    <span className="text-base flex-shrink-0 mt-0.5">{a.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold ${a.color}`}>{a.label}</div>
                      <div className="text-white/35 text-xs truncate">{a.detail}</div>
                    </div>
                    <div className="text-white/20 text-[10px] flex-shrink-0">{a.time}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick links */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                className="flex flex-col gap-2">
                {[
                  { label: 'Browse New Projects', to: '/student/projects', icon: FolderOpen, color: 'from-indigo-600 to-violet-600' },
                  { label: 'Skill Gap Analysis', to: '/student/skill-gap', icon: TrendingUp, color: 'from-emerald-600 to-teal-600' },
                  { label: 'My Portfolio', to: '/student/portfolio', icon: CheckCircle, color: 'from-pink-600 to-rose-600' },
                ].map(link => (
                  <Link key={link.to} to={link.to}>
                    <motion.div whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/6 hover:bg-white/5 hover:border-white/12 transition-all">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0`}>
                        <link.icon size={13} className="text-white" />
                      </div>
                      <span className="text-white/60 text-xs font-medium hover:text-white/80 transition-colors">{link.label}</span>
                      <ChevronRight size={12} className="text-white/20 ml-auto" />
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
