import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Clock, CheckCircle, AlertCircle, Upload, ExternalLink, GitBranch } from 'lucide-react'

const MY_SUBMISSIONS = [
  {
    id: 1, project: 'Mobile UI/UX Redesign', company: 'PayU India', domain: 'UI/UX Design',
    submittedAt: 'Aug 20, 2026', status: 'approved', rating: 5.0, credits: 4,
    feedback: 'Excellent work! The Figma prototype was professional and user research was thorough. Certificate issued.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=70',
    githubUrl: 'github.com/arjun/payu-ux', certId: 'NM-2026-CSE-00001',
  },
  {
    id: 2, project: 'E-Commerce React Dashboard', company: 'Zoho Corporation', domain: 'Web Development',
    submittedAt: 'Aug 10, 2026', status: 'approved', rating: 4.9, credits: 8,
    feedback: 'Great use of React and D3. Dashboard performance was impressive. Well done!',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70',
    githubUrl: 'github.com/arjun/zoho-dashboard', certId: 'NM-2026-CSE-00002',
  },
  {
    id: 3, project: 'Python Web Scraper Pipeline', company: 'DataMinds Analytics', domain: 'Data Science',
    submittedAt: 'Aug 28, 2026', status: 'under_review', rating: null, credits: 5,
    feedback: null,
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&q=70',
    githubUrl: 'github.com/arjun/tn-data-pipeline', certId: null,
  },
]

const STATUS_CONFIG = {
  approved:     { label: 'Approved ✓',    cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25', icon: CheckCircle },
  under_review: { label: 'Under Review',  cls: 'bg-amber-500/15 text-amber-300 border-amber-500/25',   icon: Clock },
  submitted:    { label: 'Submitted',     cls: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25', icon: Upload },
  revision:     { label: 'Needs Revision',cls: 'bg-red-500/15 text-red-400 border-red-500/25',         icon: AlertCircle },
}

export default function StudentSubmissions() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">My Submissions</h1>
          <p className="text-white/35 text-sm">
            {MY_SUBMISSIONS.filter(s => s.status === 'approved').length} approved ·{' '}
            {MY_SUBMISSIONS.filter(s => s.status === 'under_review').length} under review
          </p>
        </div>

        <div className="p-8 flex flex-col gap-5">
          {MY_SUBMISSIONS.map((s, i) => {
            const { label, cls, icon: Icon } = STATUS_CONFIG[s.status]
            const isOpen = expanded === s.id

            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden">
                {/* Card header */}
                <div className="flex gap-4 p-5 cursor-pointer" onClick={() => setExpanded(isOpen ? null : s.id)}>
                  <div className="relative h-24 w-36 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={s.img} alt={s.project} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-outfit font-bold text-white text-base leading-tight">{s.project}</h3>
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 flex items-center gap-1 ${cls}`}>
                        <Icon size={9} /> {label}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm">{s.company} · {s.domain}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-white/30">
                      <span className="flex items-center gap-1"><Clock size={10} /> Submitted {s.submittedAt}</span>
                      <span className="text-amber-400 font-semibold">+{s.credits} NM Credits</span>
                      {s.rating && <span className="text-amber-400">⭐ {s.rating}/5.0</span>}
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-white/8 px-5 pb-5 pt-4">
                    {s.feedback && (
                      <div className="mb-4 p-4 rounded-2xl bg-emerald-500/8 border border-emerald-500/15">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Mentor Feedback</p>
                        <p className="text-white/65 text-sm leading-relaxed">"{s.feedback}"</p>
                      </div>
                    )}
                    {!s.feedback && (
                      <div className="mb-4 p-4 rounded-2xl bg-amber-500/8 border border-amber-500/15">
                        <p className="text-amber-400 text-sm">⏳ Your submission is being reviewed by the mentor. You'll be notified within 3–5 business days.</p>
                      </div>
                    )}
                    <div className="flex gap-3 flex-wrap">
                      <a href={`https://${s.githubUrl}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-white/6 border border-white/10 text-white/55 hover:text-white/80 hover:bg-white/10 transition-all">
                        <GitBranch size={12} /> View GitHub
                      </a>
                      {s.certId && (
                        <div className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                          <CheckCircle size={12} /> Certificate: {s.certId}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
