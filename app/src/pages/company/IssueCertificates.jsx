import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Award, CheckCircle, QrCode, Download, Send } from 'lucide-react'

const ELIGIBLE = [
  { id: 1, student: 'Priya Nair', college: 'Anna University', project: 'Mobile UI/UX Redesign', domain: 'UI/UX Design', rating: 4.9, credits: 4, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70', issued: false },
  { id: 2, student: 'Karthik Selvam', college: 'VIT Vellore', project: 'AI Chatbot Integration', domain: 'Data Science', rating: 4.7, credits: 6, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=70', issued: false },
  { id: 3, student: 'Ramesh Vijay', college: 'Amrita, Coimbatore', project: 'IoT Smart Campus', domain: 'IoT', rating: 4.9, credits: 8, img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=70', issued: true },
]

export default function IssueCertificates() {
  const [list, setList] = useState(ELIGIBLE)

  const issue = (id) => setList(p => p.map(s => s.id === id ? { ...s, issued: true } : s))
  const issueAll = () => setList(p => p.map(s => ({ ...s, issued: true })))

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">Issue Certificates</h1>
            <p className="text-white/35 text-sm">QR-verified NM certificates · {list.filter(s => !s.issued).length} pending issuance</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} onClick={issueAll}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25">
            <Award size={16} /> Issue All ({list.filter(s => !s.issued).length})
          </motion.button>
        </div>
        <div className="p-8">
          {/* Info banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-indigo-500/8 border border-indigo-500/20 flex items-start gap-3">
            <QrCode size={20} className="text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-indigo-300 text-sm font-semibold">Each certificate is automatically assigned a unique NM Certificate ID (e.g. NM-2026-CSE-00123)</p>
              <p className="text-indigo-300/60 text-xs mt-0.5">QR code generated for instant verification · Certificate emailed to student · TNSDC credit mapped automatically</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {list.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`rounded-3xl border overflow-hidden transition-all ${s.issued ? 'border-emerald-500/25 bg-emerald-500/5' : 'border-white/8 bg-white/[0.025]'}`}>
                {/* Certificate preview */}
                <div className="relative p-6 bg-gradient-to-br from-[#1a0f35] to-[#0D0818] border-b border-white/8">
                  <div className="absolute top-3 right-3">
                    <QrCode size={32} className="text-white/10" />
                  </div>
                  <div className="text-center">
                    <div className="text-white/20 text-[9px] uppercase tracking-widest mb-2">Naan Mudhalvan · TNSDC</div>
                    <div className="text-white/15 text-[9px] uppercase tracking-widest mb-3">Certificate of Achievement</div>
                    <img src={s.img} alt={s.student} className="w-14 h-14 rounded-2xl object-cover mx-auto mb-2 border-2 border-white/15 shadow-xl" />
                    <h3 className="font-outfit font-black text-white text-lg">{s.student}</h3>
                    <p className="text-white/40 text-xs">{s.college}</p>
                    <p className="text-amber-400 font-semibold text-sm mt-2">{s.project}</p>
                    <p className="text-white/30 text-xs">{s.domain}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {Array(5).fill(0).map((_, j) => <div key={j} className={`w-3 h-3 rounded-sm ${j < Math.round(s.rating) ? 'bg-amber-400' : 'bg-white/10'}`} />)}
                      <span className="text-amber-400 text-[10px] ml-1">{s.rating}</span>
                    </div>
                    <div className="mt-3 text-indigo-400 text-[10px] font-bold">+{s.credits} NM Credits</div>
                  </div>
                </div>

                <div className="p-4 flex gap-2">
                  {s.issued ? (
                    <>
                      <div className="flex items-center gap-2 flex-1 justify-center text-emerald-400 text-sm font-bold">
                        <CheckCircle size={16} /> Issued
                      </div>
                      <button className="p-2 rounded-xl bg-white/6 border border-white/10 text-white/40 hover:text-white/65 transition-colors"><Download size={14} /></button>
                    </>
                  ) : (
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => issue(s.id)}
                      className="flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg flex-1 justify-center">
                      <Send size={14} /> Issue Certificate
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
