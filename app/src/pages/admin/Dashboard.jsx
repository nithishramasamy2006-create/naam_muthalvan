import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Building2, GraduationCap, Users, AlertCircle, CheckCircle, TrendingUp, ChevronRight, Shield, BarChart3, Star, Clock } from 'lucide-react'

const PLATFORM_STATS = [
  { label: 'Total Students', val: '4,218', change: '↑ 842 this month', color: 'from-indigo-500 to-violet-500', icon: Users },
  { label: 'Partner Companies', val: '120', change: '↑ 12 verified', color: 'from-orange-500 to-red-500', icon: Building2 },
  { label: 'Colleges Enrolled', val: '65', change: '↑ 8 this semester', color: 'from-emerald-500 to-teal-500', icon: GraduationCap },
  { label: 'Active Disputes', val: '3', change: '↓ 2 resolved today', color: 'from-red-500 to-rose-500', icon: AlertCircle },
]

const PENDING_VERIFICATIONS = [
  { company: 'TechBridge Solutions', type: 'Startup', location: 'Chennai', projects: 3, applied: 'Aug 28', status: 'pending', img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&q=70' },
  { company: 'InnovateTN Pvt Ltd', type: 'SME', location: 'Coimbatore', projects: 5, applied: 'Aug 27', status: 'docs_pending', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=70' },
  { company: 'HealthConnect Systems', type: 'Enterprise', location: 'Madurai', projects: 8, applied: 'Aug 26', status: 'pending', img: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&q=70' },
  { company: 'AgriSmart India', type: 'Startup', location: 'Salem', projects: 2, applied: 'Aug 25', status: 'pending', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&q=70' },
  { company: 'SecureLogic Labs', type: 'Startup', location: 'Chennai', projects: 4, applied: 'Aug 24', status: 'docs_pending', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&q=70' },
]

const TOP_COLLEGES = [
  { name: 'PSG College of Technology', dist: 'Coimbatore', students: 842, credits: 4218, rank: 1, change: '↑' },
  { name: 'Anna University', dist: 'Chennai', students: 760, credits: 3820, rank: 2, change: '↑' },
  { name: 'NIT Trichy', dist: 'Trichy', students: 680, credits: 3200, rank: 3, change: '−' },
  { name: 'VIT Vellore', dist: 'Vellore', students: 620, credits: 2980, rank: 4, change: '↑' },
  { name: 'Amrita, Coimbatore', dist: 'Coimbatore', students: 540, credits: 2640, rank: 5, change: '↓' },
]

const RECENT_ALERTS = [
  { type: 'warning', msg: 'AgriSmart India — documents expired, renewal needed', time: '1h ago' },
  { type: 'success', msg: 'Freshworks verification completed — 15 projects approved', time: '3h ago' },
  { type: 'info', msg: 'NIT Trichy overtaken by PSG Tech in semester rankings', time: '5h ago' },
  { type: 'error', msg: 'Dispute #D-007 escalated — payment delay complaint by student', time: 'Yesterday' },
]

const ALERT_STYLE = {
  warning: 'border-amber-500/25 bg-amber-500/8 text-amber-300',
  success: 'border-emerald-500/25 bg-emerald-500/8 text-emerald-300',
  info: 'border-indigo-500/25 bg-indigo-500/8 text-indigo-300',
  error: 'border-red-500/25 bg-red-500/8 text-red-400',
}

export default function AdminDashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-xl text-white">Platform Overview</h1>
            <p className="text-white/35 text-sm">NM MicroLearn · Super Admin · Tamil Nadu State Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold">All Systems Operational</span>
          </div>
        </div>

        <div className="p-8">
          {/* Platform Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {PLATFORM_STATS.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all group relative overflow-hidden">
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
            {/* Company Verifications */}
            <div className="col-span-2 flex flex-col gap-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-outfit font-bold text-white text-lg">Company Verifications <span className="ml-2 text-sm font-normal text-red-400">5 pending</span></h2>
                  <Link to="/admin/verify" className="text-purple-400 text-xs font-semibold flex items-center gap-1">View all <ChevronRight size={12} /></Link>
                </div>
                <div className="flex flex-col gap-3">
                  {PENDING_VERIFICATIONS.slice(0, 3).map((c, i) => (
                    <motion.div key={c.company} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/8 hover:border-white/15 transition-all">
                      <img src={c.img} alt={c.company} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-outfit font-bold text-white text-sm">{c.company}</h3>
                        <p className="text-white/35 text-xs">{c.type} · {c.location} · {c.projects} projects posted</p>
                        <p className="text-white/20 text-[10px] flex items-center gap-1 mt-0.5"><Clock size={8} /> Applied {c.applied}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${c.status === 'pending' ? 'bg-amber-500/15 text-amber-300 border-amber-500/25' : 'bg-red-500/15 text-red-400 border-red-500/25'}`}>
                        {c.status === 'pending' ? 'Under Review' : 'Docs Pending'}
                      </span>
                      <div className="flex gap-2 ml-2">
                        <button className="p-2 rounded-lg bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25 transition-colors"><CheckCircle size={14} /></button>
                        <button className="p-2 rounded-lg bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors"><AlertCircle size={14} /></button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* College Rankings */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-outfit font-bold text-white text-lg">College Rankings — TN</h2>
                  <Link to="/admin/colleges" className="text-purple-400 text-xs font-semibold flex items-center gap-1">All 65 colleges <ChevronRight size={12} /></Link>
                </div>
                <div className="flex flex-col gap-2">
                  {TOP_COLLEGES.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.06 }}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/6 hover:bg-white/[0.04] transition-all">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-outfit font-black text-sm flex-shrink-0
                        ${c.rank === 1 ? 'bg-amber-500 text-black' : c.rank === 2 ? 'bg-slate-400 text-black' : c.rank === 3 ? 'bg-orange-600 text-white' : 'bg-white/10 text-white/50'}`}>
                        {c.rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/75 text-sm font-semibold">{c.name}</p>
                        <p className="text-white/30 text-xs">{c.dist} · {c.students} students · {c.credits} credits</p>
                      </div>
                      <span className={`text-xs font-bold ${c.change === '↑' ? 'text-emerald-400' : c.change === '↓' ? 'text-red-400' : 'text-white/30'}`}>{c.change}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Alerts + Quick Links */}
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="font-outfit font-bold text-white text-base mb-3">System Alerts</h2>
                <div className="flex flex-col gap-2">
                  {RECENT_ALERTS.map((a, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}
                      className={`p-3 rounded-xl border text-xs leading-relaxed ${ALERT_STYLE[a.type]}`}>
                      <p className="font-medium mb-0.5">{a.msg}</p>
                      <p className="opacity-60 text-[10px]">{a.time}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="font-outfit font-bold text-white text-base mb-3">Admin Actions</h2>
                {[
                  { label: 'Verify Companies (5)', to: '/admin/verify', icon: Shield, color: 'from-purple-500 to-indigo-600' },
                  { label: 'Manage Users', to: '/admin/users', icon: Users, color: 'from-blue-500 to-indigo-500' },
                  { label: 'View All Colleges', to: '/admin/colleges', icon: GraduationCap, color: 'from-emerald-500 to-teal-500' },
                  { label: 'Analytics Dashboard', to: '/admin/analytics', icon: BarChart3, color: 'from-amber-500 to-orange-500' },
                ].map(q => (
                  <Link key={q.to} to={q.to}>
                    <motion.div whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/4 transition-colors group mb-1">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${q.color} flex items-center justify-center flex-shrink-0`}>
                        <q.icon size={13} className="text-white" />
                      </div>
                      <span className="text-white/50 text-xs font-medium group-hover:text-white/75">{q.label}</span>
                      <ChevronRight size={12} className="text-white/20 ml-auto" />
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
