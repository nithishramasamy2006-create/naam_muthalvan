import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Award, Star, Download, Share2, QrCode, CheckCircle, Calendar, Building2 } from 'lucide-react'

const CERTS = [
  {
    id: 1,
    title: 'Mobile App UI/UX Design',
    company: 'PayU India',
    companyLogo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&q=70',
    domain: 'UI/UX Design',
    rating: 5.0,
    nmCredits: 4,
    issueDate: 'Aug 20, 2026',
    skills: ['Figma', 'UI/UX', 'Responsive Design', 'Prototyping'],
    mentorName: 'Rahul Sharma',
    qrCode: '#QR-NM-2026-001',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80',
    color: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-500/20',
    verified: true,
  },
  {
    id: 2,
    title: 'E-Commerce React Dashboard',
    company: 'Zoho Corporation',
    companyLogo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&q=70',
    domain: 'Web Development',
    rating: 4.9,
    nmCredits: 8,
    issueDate: 'Aug 10, 2026',
    skills: ['React.js', 'JavaScript', 'REST API', 'Tailwind CSS'],
    mentorName: 'Kavitha Rajan',
    qrCode: '#QR-NM-2026-002',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    color: 'from-blue-500 to-indigo-600',
    glow: 'shadow-blue-500/20',
    verified: true,
  },
  {
    id: 3,
    title: 'Python Web Scraper Pipeline',
    company: 'DataMinds Analytics',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=70',
    domain: 'Data Science',
    rating: 4.8,
    nmCredits: 5,
    issueDate: 'Jul 30, 2026',
    skills: ['Python', 'Pandas', 'BeautifulSoup', 'REST API'],
    mentorName: 'Dr. Anand Kumar',
    qrCode: '#QR-NM-2026-003',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80',
    color: 'from-violet-500 to-purple-600',
    glow: 'shadow-violet-500/20',
    verified: true,
  },
]

const TOTAL_CREDITS = CERTS.reduce((s, c) => s + c.nmCredits, 0)

function CertCard({ cert }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`rounded-3xl overflow-hidden border border-white/8 shadow-2xl ${cert.glow} cursor-pointer group`}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Certificate image banner */}
      <div className="relative h-40 overflow-hidden">
        <img src={cert.img} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] via-black/30 to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.color}`} />
        {/* Verified stamp */}
        {cert.verified && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm rounded-full px-2.5 py-1">
            <CheckCircle size={11} className="text-emerald-400" />
            <span className="text-emerald-300 text-[10px] font-bold">NM Verified</span>
          </div>
        )}
        {/* Company logo */}
        <div className="absolute bottom-3 left-3">
          <img src={cert.companyLogo} alt={cert.company} className="w-8 h-8 rounded-lg object-cover border border-white/20 shadow-lg" />
        </div>
        {/* Credits badge */}
        <div className="absolute bottom-3 right-3 bg-indigo-600/80 backdrop-blur-sm rounded-xl px-2.5 py-1">
          <span className="text-white text-[10px] font-black">+{cert.nmCredits} Credits</span>
        </div>
      </div>

      <div className="p-5 bg-white/[0.025]">
        <h3 className="font-outfit font-bold text-white text-base leading-tight mb-1">{cert.title}</h3>
        <p className="text-white/40 text-xs mb-3">{cert.company} · {cert.domain}</p>

        <div className="flex items-center gap-1 mb-3">
          {Array(5).fill(0).map((_, i) => (
            <Star key={i} size={12} className={i < Math.round(cert.rating) ? 'text-amber-400 fill-amber-400' : 'text-white/15'} />
          ))}
          <span className="text-amber-400 text-xs font-bold ml-1">{cert.rating}</span>
          <span className="text-white/25 text-xs ml-1">by {cert.mentorName}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {cert.skills.map(s => (
            <span key={s} className="text-[10px] text-white/45 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">{s}</span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-white/30 text-xs">
            <Calendar size={10} />
            {cert.issueDate}
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/8 transition-all" onClick={e => e.stopPropagation()}>
              <QrCode size={14} />
            </button>
            <button className="p-2 rounded-lg bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/8 transition-all" onClick={e => e.stopPropagation()}>
              <Share2 size={14} />
            </button>
            <button className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-gradient-to-r ${cert.color} text-white shadow-lg`} onClick={e => e.stopPropagation()}>
              <Download size={12} /> Download
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function StudentCertificates() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">My Certificates</h1>
          <p className="text-white/35 text-sm">{CERTS.length} NM-verified certificates · {TOTAL_CREDITS} total NM Credits earned</p>
        </div>

        <div className="p-8">
          {/* Summary row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Certificates Earned', val: CERTS.length, icon: Award, color: 'from-amber-500 to-orange-500' },
              { label: 'NM Credits Total', val: TOTAL_CREDITS, icon: Star, color: 'from-indigo-500 to-violet-600' },
              { label: 'Avg Mentor Rating', val: '4.9 ★', icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <s.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-outfit font-black text-2xl text-white">{s.val}</div>
                  <div className="text-white/35 text-xs">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* NM Credit progress to Gold */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-900/40 to-violet-900/30 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-outfit font-bold text-white text-sm">Progress to Gold Level</h3>
                <p className="text-white/35 text-xs">Need 30 credits — you have {TOTAL_CREDITS}</p>
              </div>
              <span className="text-amber-400 font-outfit font-black text-xl">{TOTAL_CREDITS}/30</span>
            </div>
            <div className="h-2.5 bg-white/8 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(TOTAL_CREDITS / 30) * 100}%` }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500 rounded-full" />
            </div>
            <p className="text-white/25 text-xs mt-2">{30 - TOTAL_CREDITS} more credits to unlock Gold Badge + priority company review</p>
          </motion.div>

          {/* Certificate cards */}
          <h2 className="font-outfit font-bold text-white/60 text-sm uppercase tracking-widest mb-4">Your Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CERTS.map((cert, i) => (
              <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 + 0.4 }}>
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
