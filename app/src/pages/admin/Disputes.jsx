import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { AlertCircle, CheckCircle, Clock, MessageCircle, ChevronDown } from 'lucide-react'

const DISPUTES = [
  { id:'D-2026-001', category:'Certificate Not Issued', raisedBy:'Arjun Kumar', role:'Student', against:'DataMinds Analytics', project:'Python Web Scraper Pipeline', status:'under_review', priority:'high', date:'Aug 28, 2026', desc:'Project completed on Aug 5. Certificate not issued after 25 days. Mentor has not responded to 3 messages.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70' },
  { id:'D-2026-002', category:'Payment Delay', raisedBy:'Karthik Selvam', role:'Student', against:'DataMinds Analytics', project:'ML Sentiment Pipeline', status:'open', priority:'high', date:'Aug 27, 2026', desc:'Stipend of ₹7,500 not credited 3 weeks after project acceptance and completion.', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70' },
  { id:'D-2026-003', category:'Unfair Rejection', raisedBy:'Divya Mohan', role:'Student', against:'Freshworks', project:'AI Chatbot Integration', status:'open', priority:'medium', date:'Aug 26, 2026', desc:'Application was rejected without any feedback after reaching shortlisted stage.', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=70' },
]

const PRIORITY_STYLE = { high:'bg-red-500/15 text-red-400 border-red-500/25', medium:'bg-amber-500/15 text-amber-400 border-amber-500/25', low:'bg-white/10 text-white/40 border-white/15' }
const STATUS_STYLE   = { open:'bg-indigo-500/15 text-indigo-300', under_review:'bg-amber-500/15 text-amber-300', resolved:'bg-emerald-500/15 text-emerald-300', closed:'bg-white/10 text-white/30' }

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState(DISPUTES)
  const [expanded, setExpanded] = useState(null)
  const [resolution, setResolution] = useState('')

  const resolve = (id) => {
    setDisputes(p => p.map(d => d.id===id ? {...d, status:'resolved'} : d))
    setExpanded(null)
    setResolution('')
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Dispute Resolution</h1>
          <p className="text-white/35 text-sm">{disputes.filter(d=>d.status!=='resolved'&&d.status!=='closed').length} open disputes · {disputes.filter(d=>d.priority==='high').length} high priority</p>
        </div>
        <div className="p-8 flex flex-col gap-4">
          {disputes.map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/8 bg-white/[0.025] overflow-hidden">
              <div className="p-5 cursor-pointer" onClick={() => setExpanded(expanded===d.id ? null : d.id)}>
                <div className="flex items-start gap-4">
                  <img src={d.img} alt={d.raisedBy} className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-white/30 text-[10px] font-mono">{d.id}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${PRIORITY_STYLE[d.priority]}`}>{d.priority.toUpperCase()}</span>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${STATUS_STYLE[d.status]}`}>{d.status.replace('_',' ')}</span>
                    </div>
                    <h3 className="font-outfit font-bold text-white text-base">{d.category}</h3>
                    <p className="text-white/40 text-xs">{d.raisedBy} ({d.role}) vs {d.against}</p>
                    <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1"><Clock size={9} />{d.date} · {d.project}</p>
                  </div>
                  <ChevronDown size={16} className={`text-white/30 flex-shrink-0 mt-1 transition-transform ${expanded===d.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {expanded === d.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-white/8 p-5">
                  <p className="text-white/55 text-sm leading-relaxed mb-4">"{d.desc}"</p>
                  {d.status !== 'resolved' && (
                    <>
                      <textarea value={resolution} onChange={e => setResolution(e.target.value)} rows={2}
                        placeholder="Write resolution note…"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/25 resize-none mb-3" />
                      <div className="flex gap-3">
                        <motion.button whileHover={{ scale: 1.03 }} onClick={() => resolve(d.id)}
                          className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
                          <CheckCircle size={14} /> Mark Resolved
                        </motion.button>
                        <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl bg-white/6 border border-white/10 text-white/50">
                          <MessageCircle size={14} /> Message Both Parties
                        </button>
                        <button className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400">
                          <AlertCircle size={14} /> Escalate
                        </button>
                      </div>
                    </>
                  )}
                  {d.status === 'resolved' && (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                      <CheckCircle size={16} /> This dispute has been resolved
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
