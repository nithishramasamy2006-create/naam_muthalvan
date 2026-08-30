import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, CheckCircle, Send, Award, TrendingUp,
  ChevronLeft, ChevronRight, LogOut, Sparkles, CalendarDays, MessageCircle,
  Trophy, FileText, BarChart3, Users, Building2, Shield, Settings,
  GraduationCap, UserCheck, ClipboardList, Star, Briefcase, FilePlus
} from 'lucide-react'

const NAV = {
  student: [
    { section: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard',        to: '/student' },
      { icon: FolderOpen,     label: 'Browse Projects',   to: '/student/projects' },
      { icon: CheckCircle,    label: 'My Applications',   to: '/student/applications', badge: 3 },
      { icon: Send,           label: 'Submissions',        to: '/student/workspace' },
    ]},
    { section: 'Growth', items: [
      { icon: Award,      label: 'Certificates',      to: '/student/certificates' },
      { icon: TrendingUp, label: 'Skill Gap Analysis', to: '/student/skill-gap' },
      { icon: Sparkles,   label: 'AI Job Match',       to: '/student/ai-jobs', badge: 'AI', glow: true },
      { icon: Trophy,     label: 'Leaderboard',        to: '/student/leaderboard' },
    ]},
    { section: 'Community', items: [
      { icon: CalendarDays,  label: 'TN Events', to: '/student/events', badge: '3 New' },
      { icon: MessageCircle, label: 'Messages',  to: '/student/messages', badge: 2 },
    ]},
  ],
  company: [
    { section: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard',       to: '/company' },
      { icon: FilePlus,        label: 'Post New Project', to: '/company/post' },
      { icon: FolderOpen,      label: 'My Projects',     to: '/company/projects' },
    ]},
    { section: 'Talent', items: [
      { icon: Users,         label: 'Applicants',        to: '/company/applicants', badge: 8 },
      { icon: ClipboardList, label: 'Review Submissions', to: '/company/submissions' },
      { icon: Award,         label: 'Issue Certificates', to: '/company/certificates' },
    ]},
    { section: 'Analytics', items: [
      { icon: BarChart3, label: 'Analytics', to: '/company/analytics' },
    ]},
  ],
  college: [
    { section: 'Management', items: [
      { icon: LayoutDashboard, label: 'Dashboard',            to: '/college' },
      { icon: UserCheck,       label: 'Student Onboarding',   to: '/college/onboarding' },
      { icon: BarChart3,       label: 'Participation Analytics', to: '/college/analytics' },
      { icon: FileText,        label: 'Compliance',           to: '/college/compliance' },
    ]},
    { section: 'NM Credits', items: [
      { icon: Star,       label: 'NM Credit Mapping', to: '/college/credits', badge: 12 },
      { icon: ClipboardList, label: 'Generate Reports',to: '/college/reports' },
      { icon: Shield,     label: 'TNSDC Compliance',  to: '/college/tnsdc' },
    ]},
  ],
  admin: [
    { section: 'Overview', items: [
      { icon: LayoutDashboard, label: 'Platform Overview',   to: '/admin' },
      { icon: BarChart3,       label: 'Analytics Dashboard', to: '/admin/analytics' },
    ]},
    { section: 'Management', items: [
      { icon: Building2, label: 'Company Verification', to: '/admin/verify', badge: 5 },
      { icon: GraduationCap, label: 'Colleges',         to: '/admin/colleges' },
      { icon: Briefcase,     label: 'Companies',        to: '/admin/companies' },
      { icon: Users,         label: 'Users',            to: '/admin/users' },
    ]},
    { section: 'Platform', items: [
      { icon: Settings, label: 'Settings', to: '/admin/settings' },
    ]},
  ],
}

const PORTAL_CFG = {
  student: { grad: 'from-indigo-600 to-violet-600', name: 'Student Portal', user: 'Arjun Kumar', email: 'arjun@psg.ac.in', init: 'AK' },
  company: { grad: 'from-orange-500 to-red-600',    name: 'Company Portal', user: 'Hexaware Tech', email: 'hr@hexaware.com', init: 'HX' },
  college: { grad: 'from-emerald-500 to-teal-600',  name: 'College Portal', user: 'Dr. Rajesh Kumar', email: 'rajesh@psgtech.edu', init: 'DR' },
  admin:   { grad: 'from-purple-600 to-indigo-700', name: 'Super Admin',    user: 'Super Admin', email: 'admin@nmmicrolearn.in', init: 'SA' },
}

export default function Sidebar({ portal = 'student' }) {
  const [col, setCol] = useState(false)
  const loc = useLocation()
  const cfg = PORTAL_CFG[portal]
  const groups = NAV[portal] || NAV.student

  const isActive = (to) => {
    if (to === '/student' || to === '/company' || to === '/college' || to === '/admin') return loc.pathname === to
    return loc.pathname.startsWith(to)
  }

  return (
    <motion.aside
      animate={{ width: col ? 64 : 252 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen bg-[#0C0718] border-r border-white/[0.06] flex-shrink-0 overflow-hidden z-20"
    >
      {/* ambient top glow */}
      <div className={`absolute top-0 inset-x-0 h-32 bg-gradient-to-b ${cfg.grad} opacity-[0.1] pointer-events-none`} />

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.06]">
        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.grad} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white"/>
          </svg>
        </div>
        <AnimatePresence>
          {!col && (
            <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>
              <p className="font-outfit font-black text-white text-[13px] leading-none">NM MicroLearn</p>
              <p className="text-white/30 text-[10px] mt-0.5">{cfg.name}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {groups.map(g => (
          <div key={g.section} className="mb-4">
            <AnimatePresence>
              {!col && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-white/20 text-[9px] font-black uppercase tracking-[0.18em] px-3 mb-1.5">
                  {g.section}
                </motion.p>
              )}
            </AnimatePresence>
            {g.items.map(item => {
              const active = isActive(item.to)
              const Icon = item.icon
              return (
                <Link key={item.to} to={item.to}>
                  <motion.div
                    whileHover={{ x: col ? 0 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group
                      ${active ? `bg-gradient-to-r ${cfg.grad} shadow-lg` : 'hover:bg-white/[0.05]'}
                      ${item.glow && !active ? 'border border-violet-500/20 bg-violet-500/5' : ''}`}
                  >
                    <Icon size={16} className={`flex-shrink-0 transition-colors ${active ? 'text-white' : 'text-white/35 group-hover:text-white/65'}`} />
                    <AnimatePresence>
                      {!col && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className={`text-[13px] font-medium flex-1 leading-none ${active ? 'text-white font-semibold' : 'text-white/45 group-hover:text-white/75'}`}>
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!col && item.badge !== undefined && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none
                        ${typeof item.badge === 'string' && isNaN(item.badge) ? 'bg-violet-500 text-white' : 'bg-white/12 text-white/60'}`}>
                        {item.badge}
                      </span>
                    )}
                    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-l-full bg-white/50" />}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.grad} flex items-center justify-center font-outfit font-bold text-white text-xs flex-shrink-0`}>
            {cfg.init}
          </div>
          <AnimatePresence>
            {!col && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate leading-tight">{cfg.user}</p>
                <p className="text-white/25 text-[10px] truncate">{cfg.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!col && (
              <Link to="/">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-1.5 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/5 transition-all cursor-pointer">
                  <LogOut size={13} />
                </motion.div>
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toggle */}
      <button onClick={() => setCol(!col)}
        className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-[#1A1030] border border-white/10 flex items-center justify-center text-white/30 hover:text-white/70 transition-all z-30 shadow-xl">
        {col ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </motion.aside>
  )
}
