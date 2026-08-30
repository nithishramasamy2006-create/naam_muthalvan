import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, FolderOpen, CheckCircle, Code2, Award, TrendingUp,
  User, Trophy, MessageCircle, Briefcase, ChevronLeft, ChevronRight,
  LogOut, Sparkles
} from 'lucide-react'

const navGroups = {
  student: [
    { label: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/student' },
      { icon: FolderOpen, label: 'Browse Projects', to: '/student/projects' },
      { icon: CheckCircle, label: 'Applications', to: '/student/applications' },
      { icon: Code2, label: 'Workspace', to: '/student/workspace' },
    ]},
    { label: 'Growth', items: [
      { icon: Award, label: 'Certificates', to: '/student/certificates' },
      { icon: TrendingUp, label: 'Skill Gap', to: '/student/skill-gap' },
      { icon: User, label: 'My Portfolio', to: '/student/portfolio' },
      { icon: Sparkles, label: 'AI Job Match', to: '/student/ai-jobs', badge: 'AI', accent: true },
    ]},
    { label: 'Community', items: [
      { icon: Trophy, label: 'Leaderboard', to: '/student/leaderboard' },
      { icon: MessageCircle, label: 'Messages', to: '/student/messages', badge: 2 },
    ]},
  ],
  company: [
    { label: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/company' },
      { icon: FolderOpen, label: 'Post Project', to: '/company/post' },
      { icon: CheckCircle, label: 'Applicants', to: '/company/applicants', badge: 8 },
      { icon: Code2, label: 'Submissions', to: '/company/submissions' },
    ]},
  ],
  college: [
    { label: 'Main', items: [
      { icon: LayoutDashboard, label: 'Dashboard', to: '/college' },
      { icon: CheckCircle, label: 'NM Credits', to: '/college/credits', badge: 12 },
      { icon: TrendingUp, label: 'Analytics', to: '/college/analytics' },
      { icon: Briefcase, label: 'Compliance', to: '/college/compliance' },
    ]},
  ],
  admin: [
    { label: 'Main', items: [
      { icon: LayoutDashboard, label: 'Platform Overview', to: '/admin' },
      { icon: CheckCircle, label: 'Verify Companies', to: '/admin/verify', badge: 5 },
      { icon: User, label: 'Users', to: '/admin/users' },
      { icon: Briefcase, label: 'Disputes', to: '/admin/disputes', badge: 3 },
    ]},
  ],
}

const portalConfig = {
  student: { gradient: 'from-indigo-600 to-violet-600', dot: 'bg-indigo-500', name: 'Student Portal', user: 'Arjun Kumar', email: 'arjun@psg.ac.in', initials: 'AK' },
  company: { gradient: 'from-orange-600 to-red-600', dot: 'bg-orange-500', name: 'Company Portal', user: 'Hexaware Tech', email: 'hr@hexaware.com', initials: 'HX' },
  college: { gradient: 'from-emerald-600 to-teal-600', dot: 'bg-emerald-500', name: 'College Portal', user: 'Dr. Rajesh Kumar', email: 'rajesh@psgtech.ac.in', initials: 'DR' },
  admin: { gradient: 'from-purple-700 to-indigo-600', dot: 'bg-purple-500', name: 'Super Admin', user: 'Super Admin', email: 'admin@nmmicrolearn.in', initials: 'SA' },
}

export default function Sidebar({ portal = 'student' }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const cfg = portalConfig[portal]
  const groups = navGroups[portal] || navGroups.student

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex flex-col h-screen bg-[#0F0A1E] border-r border-white/5 flex-shrink-0 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className={`absolute top-0 left-0 w-full h-48 bg-gradient-to-b ${cfg.gradient} opacity-10 pointer-events-none`} />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white" fillOpacity="0.9"/>
          </svg>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              <div className="font-outfit font-bold text-white text-sm leading-tight">NM MicroLearn</div>
              <div className="text-white/40 text-xs">{cfg.name}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        {groups.map((group) => (
          <div key={group.label} className="mb-4">
            <AnimatePresence>
              {!collapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-white/25 text-[10px] font-bold uppercase tracking-widest px-3 mb-2">
                  {group.label}
                </motion.div>
              )}
            </AnimatePresence>
            {group.items.map((item) => {
              const active = location.pathname === item.to
              const Icon = item.icon
              return (
                <Link key={item.to} to={item.to}>
                  <motion.div
                    whileHover={{ x: collapsed ? 0 : 4 }}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-colors group
                      ${active ? `bg-gradient-to-r ${cfg.gradient} shadow-lg` : 'hover:bg-white/5'}
                      ${item.accent && !active ? 'bg-white/5 border border-white/10' : ''}`}
                  >
                    <Icon size={18} className={`flex-shrink-0 ${active ? 'text-white' : 'text-white/40 group-hover:text-white/70'} transition-colors`} />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                          className={`text-sm font-medium flex-1 ${active ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {!collapsed && item.badge && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${typeof item.badge === 'string' ? 'bg-violet-500 text-white' : 'bg-white/15 text-white/70'}`}>
                        {item.badge}
                      </span>
                    )}
                    {/* Active indicator */}
                    {active && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-white/60" />}
                  </motion.div>
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center font-outfit font-bold text-white text-sm flex-shrink-0`}>
            {cfg.initials}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                <div className="text-white text-xs font-semibold truncate">{cfg.user}</div>
                <div className="text-white/30 text-[10px] truncate">{cfg.email}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <Link to="/">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-white/30 hover:text-white/60 transition-colors cursor-pointer">
                  <LogOut size={16} />
                </motion.div>
              </Link>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1E1433] border border-white/10 flex items-center justify-center text-white/40 hover:text-white/80 hover:border-white/20 transition-all z-10 shadow-lg"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  )
}
