import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Users, FolderOpen, Award, TrendingUp, BarChart3, ArrowRight, Clock, CheckCircle, Star, ChevronRight, Zap } from 'lucide-react'

const STATS = [
  { label: 'Active Projects', val: '8', change: '+2 this month', icon: FolderOpen, color: 'from-orange-500 to-red-500' },
  { label: 'Total Applicants', val: '247', change: '8 awaiting review', icon: Users, color: 'from-blue-500 to-indigo-500' },
  { label: 'Hired via Platform', val: '34', change: '↑ 12% this quarter', icon: Award, color: 'from-emerald-500 to-teal-500' },
  { label: 'Avg Project Rating', val: '4.8★', change: 'Top 5% nationally', icon: Star, color: 'from-amber-500 to-orange-500' },
]

const PROJECTS = [
  {
    id: 1, title: 'Analytics Dashboard — React & D3',
    domain: 'Web Development', stipend: '₹8,000', duration: '4 weeks',
    applicants: 42, shortlisted: 3, status: 'active',
    deadline: 'Sep 15, 2026',
    skills: ['React.js', 'D3.js', 'MongoDB', 'REST API'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70',
  },
  {
    id: 2, title: 'AI Chatbot Integration — Python NLP',
    domain: 'Data Science', stipend: '₹6,500', duration: '3 weeks',
    applicants: 28, shortlisted: 5, status: 'active',
    deadline: 'Sep 20, 2026',
    skills: ['Python', 'NLP', 'FastAPI', 'React.js'],
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=70',
  },
  {
    id: 3, title: 'IoT Smart Campus Dashboard',
    domain: 'IoT', stipend: '₹7,000', duration: '5 weeks',
    applicants: 15, shortlisted: 2, status: 'draft',
    deadline: 'Oct 5, 2026',
    skills: ['Arduino', 'Node.js', 'MQTT', 'React.js'],
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=70',
  },
]

const RECENT = [
  { action: 'New application received', detail: 'Arjun Kumar applied for Analytics Dashboard', time: '2 hours ago', color: 'bg-indigo-500' },
  { action: 'Submission reviewed', detail: 'Priya Nair — Mobile UI — Approved', time: '5 hours ago', color: 'bg-emerald-500' },
  { action: 'Certificate issued', detail: 'Karthik Selvam — Python Scraper project', time: 'Yesterday', color: 'bg-amber-500' },
  { action: 'New shortlist action', detail: '3 candidates shortlisted for IoT project', time: 'Yesterday', color: 'bg-violet-500' },
]

export default function CompanyDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-xl text-white">Company Dashboard</h1>
            <p className="text-white/35 text-sm">Hexaware Technologies · Verified Partner · Chennai, TN</p>
          </div>
          <Link to="/company/post">
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-orange-500/25">
              + Post New Project
            </motion.button>
          </Link>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 relative overflow-hidden group hover:border-white/15 transition-all">
                  <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
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
            {/* Projects list */}
            <div className="col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-outfit font-bold text-white text-lg">Active Projects</h2>
                <Link to="/company/projects" className="text-orange-400 text-xs font-semibold flex items-center gap-1 hover:text-orange-300">
                  All projects <ChevronRight size={12} />
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                {PROJECTS.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 hover:bg-white/[0.05] transition-all group">
                    <img src={p.img} alt={p.title} className="w-20 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-outfit font-bold text-white text-sm leading-tight">{p.title}</h3>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${p.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'}`}>
                          {p.status === 'active' ? 'LIVE' : 'DRAFT'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-white/35 mb-2">
                        <span>{p.domain}</span><span>{p.stipend}</span><span>{p.duration}</span>
                        <span className="flex items-center gap-1"><Clock size={9} />{p.deadline}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-indigo-400 text-xs font-semibold">{p.applicants} applicants</span>
                        <span className="text-amber-400 text-xs font-semibold">{p.shortlisted} shortlisted</span>
                        <Link to="/company/applicants" className="ml-auto text-orange-400 text-xs flex items-center gap-1 hover:text-orange-300">
                          Review <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: activity + quick links */}
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-outfit font-bold text-white text-lg mb-3">Recent Activity</h2>
                <div className="flex flex-col gap-1">
                  {RECENT.map((r, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.07 }}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors">
                      <div className={`w-2 h-2 rounded-full ${r.color} flex-shrink-0 mt-1.5`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-xs font-semibold">{r.action}</p>
                        <p className="text-white/30 text-[10px] truncate">{r.detail}</p>
                      </div>
                      <span className="text-white/20 text-[9px] flex-shrink-0">{r.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-outfit font-bold text-white text-base mb-3">Quick Actions</h2>
                {[
                  { label: 'Review 8 Applicants', to: '/company/applicants', icon: Users, color: 'from-blue-500 to-indigo-500' },
                  { label: 'Check Submissions', to: '/company/submissions', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
                  { label: 'Issue Certificates', to: '/company/certificates', icon: Award, color: 'from-amber-500 to-orange-500' },
                  { label: 'View Analytics', to: '/company/analytics', icon: BarChart3, color: 'from-violet-500 to-purple-500' },
                ].map(q => (
                  <Link key={q.to} to={q.to}>
                    <motion.div whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-colors group mb-1">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center flex-shrink-0`}>
                        <q.icon size={13} className="text-white" />
                      </div>
                      <span className="text-white/50 text-xs font-medium group-hover:text-white/75">{q.label}</span>
                      <ChevronRight size={12} className="text-white/20 ml-auto group-hover:text-white/40" />
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
