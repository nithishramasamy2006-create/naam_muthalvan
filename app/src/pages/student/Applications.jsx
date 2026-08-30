import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, Clock, XCircle, ArrowRight, MapPin, Trophy, Star, ChevronDown, ChevronUp, MessageCircle, Upload } from 'lucide-react'

const APPLICATIONS = [
  {
    id: 1,
    project: 'Analytics Dashboard with React & D3',
    company: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&q=80',
    domain: 'Web Development',
    stipend: '₹8,000',
    duration: '4 weeks',
    appliedDate: 'Aug 20, 2026',
    status: 'shortlisted',
    statusLabel: '⭐ Shortlisted',
    statusColor: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
    skills: ['React.js', 'D3.js', 'REST API', 'MongoDB'],
    mentorName: 'Kavitha Rajan',
    mentorRating: 4.9,
    nextStep: 'Technical interview on Sep 3 at 3 PM',
    matchScore: 88,
    color: 'from-blue-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 2,
    project: 'Mobile App UI/UX Redesign',
    company: 'PayU India',
    companyLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&q=80',
    domain: 'UI/UX Design',
    stipend: '₹6,500',
    duration: '3 weeks',
    appliedDate: 'Aug 15, 2026',
    status: 'completed',
    statusLabel: '✅ Completed — Certificate Issued',
    statusColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    skills: ['Figma', 'UI/UX', 'Prototyping'],
    mentorName: 'Rahul Sharma',
    mentorRating: 5.0,
    nextStep: 'Certificate earned! Download from Certificates page.',
    matchScore: 95,
    color: 'from-pink-500 to-rose-500',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
  {
    id: 3,
    project: 'IoT Smart Home System',
    company: 'Hexaware Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=100&q=80',
    domain: 'IoT',
    stipend: '₹7,000',
    duration: '5 weeks',
    appliedDate: 'Aug 28, 2026',
    status: 'in_review',
    statusLabel: '🔄 Application In Review',
    statusColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
    skills: ['Arduino', 'Node.js', 'MQTT', 'React.js'],
    mentorName: 'TBD',
    mentorRating: null,
    nextStep: 'HR will respond within 3 business days.',
    matchScore: 72,
    color: 'from-cyan-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
  },
  {
    id: 4,
    project: 'ML Sentiment Analysis Pipeline',
    company: 'DataMinds Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&q=80',
    domain: 'Data Science',
    stipend: '₹7,500',
    duration: '4 weeks',
    appliedDate: 'Aug 10, 2026',
    status: 'rejected',
    statusLabel: '❌ Not Selected',
    statusColor: 'bg-red-500/15 text-red-400 border-red-500/25',
    skills: ['Python', 'NLP', 'TensorFlow', 'Pandas'],
    mentorName: 'N/A',
    mentorRating: null,
    nextStep: 'Feedback: "Strengthen NLP skills. Try the NLP Bootcamp on Sep 5."',
    matchScore: 58,
    color: 'from-violet-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  },
]

const STATUS_FILTERS = ['All', 'Shortlisted', 'In Review', 'Completed', 'Rejected']

const statusMap = {
  shortlisted: 'Shortlisted',
  in_review: 'In Review',
  completed: 'Completed',
  rejected: 'Rejected',
}

function AppCard({ app }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden group"
    >
      {/* Top image banner */}
      <div className="relative h-28 overflow-hidden">
        <img src={app.image} alt={app.project} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] via-black/30 to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${app.color}`} />
        {/* Match score */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
          <Star size={10} className="text-amber-400 fill-amber-400" />
          <span className="text-white text-[11px] font-bold">{app.matchScore}% match</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-outfit font-bold text-white text-base leading-tight mb-1">{app.project}</h3>
            <p className="text-white/45 text-sm">{app.company} · {app.domain}</p>
          </div>
          <span className={`flex-shrink-0 text-[10px] font-bold px-3 py-1 rounded-full border ${app.statusColor}`}>
            {app.statusLabel}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/35 mb-3">
          <span>💰 {app.stipend}</span>
          <span>📅 {app.duration}</span>
          <span>Applied: {app.appliedDate}</span>
          {app.mentorRating && <span>⭐ Mentor: {app.mentorRating}</span>}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {app.skills.map(s => (
            <span key={s} className="text-[10px] font-medium text-white/50 bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5">{s}</span>
          ))}
        </div>

        {/* Next step */}
        <div className="flex items-start gap-2 bg-white/3 border border-white/8 rounded-xl p-3 mb-3">
          <ArrowRight size={12} className="text-indigo-400 mt-0.5 flex-shrink-0" />
          <p className="text-white/55 text-xs leading-relaxed">{app.nextStep}</p>
        </div>

        {/* Expand toggle */}
        <button onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-white/30 text-xs hover:text-white/50 transition-colors">
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Less details' : 'More details'}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }} className="overflow-hidden mt-3 pt-3 border-t border-white/8">
              <div className="flex gap-3">
                {app.status === 'shortlisted' && (
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
                    <MessageCircle size={13} /> Contact Mentor
                  </motion.button>
                )}
                {app.status === 'in_review' && (
                  <motion.button whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60">
                    <Upload size={13} /> Withdraw
                  </motion.button>
                )}
                {app.status === 'completed' && (
                  <motion.button whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
                    <Trophy size={13} /> View Certificate
                  </motion.button>
                )}
                {app.status === 'rejected' && (
                  <motion.button whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
                    <ArrowRight size={13} /> Find Similar Projects
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Applications() {
  const [filter, setFilter] = useState('All')

  const filtered = APPLICATIONS.filter(a =>
    filter === 'All' || statusMap[a.status] === filter
  )

  const stats = {
    total: APPLICATIONS.length,
    shortlisted: APPLICATIONS.filter(a => a.status === 'shortlisted').length,
    completed: APPLICATIONS.filter(a => a.status === 'completed').length,
    inReview: APPLICATIONS.filter(a => a.status === 'in_review').length,
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">My Applications</h1>
          <p className="text-white/35 text-sm">{stats.total} applications · {stats.shortlisted} shortlisted · {stats.completed} completed</p>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Applied', val: stats.total, color: 'text-white' },
              { label: 'Shortlisted', val: stats.shortlisted, color: 'text-amber-400' },
              { label: 'In Review', val: stats.inReview, color: 'text-indigo-400' },
              { label: 'Completed', val: stats.completed, color: 'text-emerald-400' },
            ].map(s => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white/3 border border-white/8 text-center">
                <div className={`font-outfit font-black text-2xl ${s.color}`}>{s.val}</div>
                <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {STATUS_FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all
                  ${filter === f ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map(app => <AppCard key={app.id} app={app} />)}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
