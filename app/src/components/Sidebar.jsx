import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, CheckCircle, Code2, Award, TrendingUp,
  User, Trophy, MessageCircle, Briefcase, ChevronLeft, ChevronRight,
  LogOut, Sparkles, CalendarDays, Send, FileText, Settings, Shield,
  GraduationCap, Building2, BarChart3, Users
} from 'lucide-react'

const navGroups = {
  student: [
    { label: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard',        to: '/student' },
      { icon: FolderOpen,     label: 'Browse Projects',   to: '/student/projects' },
      { icon: CheckCircle,    label: 'My Applications',   to: '/student/applications' },
      { icon: Code2,          label: 'Workspace',         to: '/student/workspace' },
    ]},
    { label: 'Growth', items: [
      { icon: Award,      label: 'Certificates',    to: '/student/certificates' },
      { icon: TrendingUp, label: 'Skill Gap',        to: '/student/skill-gap' },
      { icon: User,       label: 'My Portfolio',     to: '/student/portfolio' },
      { icon: Sparkles,   label: 'AI Job Match',     to: '/student/ai-jobs', badge: 'AI', accent: true },
    ]},
    { label: 'Community', items: [
      { icon: CalendarDays,   label: 'TN Skill Events', to: '/student/events', badge: '3 New' },
      { icon: Trophy,         label: 'Leaderboard',     to: '/student/leaderboard' },
      { icon: MessageCircle,  label: 'Messages & AI',   to: '/student/messages', badge: 2 },
    ]},
  ],
  company: [
    { label: 'Projects', items: [
      { icon: LayoutDashboard, label: 'Dashboard',    to: '/company' },
      { icon: FolderOpen,      label: 'Post Project', to: '/company/post' },
      { icon: Users,           label: 'Applicants',   to: '/company/applicants', badge: 8 },
      { icon: Send,            label: 'Submissions',  to: '/company/submissions' },
    ]},
    { label: 'Tools', items: [
      { icon: BarChart3, label: 'Analytics',    to: '/company/analytics' },
      { icon: Award,     label: 'Certificates', to: '/company/certificates' },
    ]},
  ],
  college: [
    { label: 'Management', items: [
      { icon: LayoutDashboard, label: 'Dashboard',   to: '/college' },
      { icon: CheckCircle,     label: 'NM Credits',  to: '/college/credits', badge: 12 },
      { icon: BarChart3,       label: 'Analytics',   to: '/college/analytics' },
      { icon: FileText,        label: 'Compliance',  to: '/college/compliance' },
    ]},
    { label: 'Tools', items: [
      { icon: GraduationCap, label: 'Onboarding',   to: '/college/onboarding' },
      { icon: Trophy,        label: 'Leaderboard',  to: '/college/leaderboard' },
    ]},
  ],
  admin: [
    { label: 'Overview', items: [
      { icon: LayoutDashboard, label: 'Platform',        to: '/admin' },
      { icon: BarChart3,       label: 'Analytics',       to: '/admin/analytics' },
      { icon: Shield,          label: 'Verify Company',  to: '/admin/verify', badge: 5 },
    ]},
    { label: 'Management', items: [
      { icon: Users,           label: 'Users',     to: '/admin/users' },
      { icon: Building2,       label: 'Companies', to: '/admin/companies' },
      { icon: Briefcase,       label: 'Disputes',  to: '/admin/disputes', badge: 3 },
    ]},
    { label: 'Platform', items: [
      { icon: Settings,        label: 'Settings',      to: '/admin/settings' },
    ]},
  ],
}

const portalConfig = {
  student: {
    gradient: 'from-indigo-600 to-violet-600',
    name: 'Student Portal',
    user: 'Arjun Kumar',
    email: 'arjun@psg.ac.in',
    initials: 'AK',
  },
  company: {
    gradient: 'from-orange-600 to-red-600',
    name: 'Company Portal',
    user: 'Hexaware Tech',
    email: 'hr@hexaware.com',
    initials: 'HX',
  },
  college: {
    gradient: 'from-emerald-600 to-teal-600',
    name: 'College Portal',
    user: 'Dr. Rajesh Kumar',
    email: 'rajesh@psgtech.ac.in',
    initials: 'DR',
  },
  admin: {
    gradient: 'from-purple-700 to-indigo-600',
    name: 'Super Admin',
    user: 'Super Admin',
    email: 'admin@nmmicrolearn.in',
    initials: 'SA',
  },
}

export default function Sidebar({ portal = 'student' }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const cfg = portalConfig[portal]
  const groups = navGroups[portal] || navGroups.student

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen bg-[#0D0818] border-r border-white/[0.06] flex-shrink-0 overflow-hidden"
    >
      {/* Gradient ambient top glow */}
      <div className={`absolute top-0 left-0 right-0 h-40 bg-gradient-to-b ${cfg.gradient} opacity-[0.12] pointer-events-none`} />

      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white" fillOpacity="0.95"/>
          </svg>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.18 }}>
              <div className="font-outfit font-bold text-white text-sm leading-tight tracking-tight">NM MicroLearn</div>
              <div className="text-white/35 text-[10px] font-medium">{cfg.name}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 scrollbar-thin">
        {groups.map((group) => (
          <div key={group.label} className="mb-5">
            <AnimatePresence>
              {!collapsed && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-white/20 text-[9px] font-black uppercase tracking-[0.15em] px-3 mb-1.5">
                  {group.label}
                </motion.p>
              )}
            </AnimatePresence>

            {group.items.map((item) => {
              const active = location.pathname === item.to || (item.to !== '/student' && item.to !== '/company' && item.to !== '/college' && item.to !== '/admin' && location.pathname.startsWith(item.to))
              const Icon = item.icon
              return (
                <Link key={item.to} to={item.to}>
                  <motion.div
                    whileHover={{ x: collapsed ? 0 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-200 group
                      ${active
                        ? `bg-gradient-to-r ${cfg.gradient} shadow-lg shadow-black/20`
                        : 'hover:bg-white/[0.05]'}
                      ${item.accent && !active ? 'border border-violet-500/20 bg-violet-500/5' : ''}`}
                  >
                    <Icon
                      size={17}
                      className={`flex-shrink-0 transition-colors ${
                        active ? 'text-white' : 'text-white/35 group-hover:text-white/65'
                      }`}
                    />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                          className={`text-[13px] font-medium flex-1 leading-none ${
                            active ? 'text-white font-semibold' : 'text-white/45 group-hover:text-white/75'
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Badge */}
                    {!collapsed && item.badge && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none
                          ${typeof item.badge === 'string' && isNaN(item.badge)
                            ? 'bg-violet-500 text-white'
                            : 'bg-white/10 text-white/60'}`}
                      >
                        {item.badge}
                      </motion.span>
                    )}

                    {/* Active right bar */}
                    {active && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-l-full bg-white/50" />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* ── User footer ── */}
      <div className="px-3 py-3 border-t border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center font-outfit font-bold text-white text-xs flex-shrink-0`}>
            {cfg.initials}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate leading-tight">{cfg.user}</div>
                <div className="text-white/25 text-[10px] truncate">{cfg.email}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <Link to="/">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="p-1.5 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer">
                  <LogOut size={14} />
                </motion.div>
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-[#1C1230] border border-white/10 flex items-center justify-center text-white/35 hover:text-white/70 hover:border-white/25 transition-all z-20 shadow-xl"
      >
        {collapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
      </button>
    </motion.aside>
  )
}
