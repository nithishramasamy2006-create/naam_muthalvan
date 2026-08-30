import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, XCircle, Clock, FileText, Building2, MapPin, Search } from 'lucide-react'

const COMPANIES = [
  { id:1, name:'TechBridge Solutions', type:'Startup', city:'Chennai', projects:3, applied:'Aug 28', status:'pending', gst:'GST-TN-2024-1234', cin:'U74999TN2024PTC123', img:'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&q=70', docs:['GST Certificate','PAN Card','Company Registration'] },
  { id:2, name:'HealthConnect Systems', type:'Enterprise', city:'Madurai', projects:8, applied:'Aug 27', status:'docs_pending', gst:'GST-TN-2022-5678', cin:'U85100TN2022PLC456', img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=70', docs:['GST Certificate'] },
  { id:3, name:'AgriSmart India', type:'Startup', city:'Salem', projects:2, applied:'Aug 26', status:'pending', gst:'GST-TN-2023-9012', cin:'U01100TN2023OPC789', img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=80&q=70', docs:['GST Certificate','PAN Card','Company Registration','Bank Statement'] },
  { id:4, name:'SecureLogic Labs', type:'Startup', city:'Chennai', projects:4, applied:'Aug 25', status:'docs_pending', gst:'GST-TN-2024-3456', cin:'U72900TN2024OPC012', img:'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=80&q=70', docs:['GST Certificate','PAN Card'] },
  { id:5, name:'InnovateTN Pvt Ltd', type:'SME', city:'Coimbatore', projects:5, applied:'Aug 24', status:'under_review', gst:'GST-TN-2021-7890', cin:'U73100TN2021PTC345', img:'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&q=70', docs:['GST Certificate','PAN Card','Company Registration','MSME Certificate'] },
]

const STATUS_STYLE = {
  pending:      'bg-amber-500/15 text-amber-300 border-amber-500/25',
  docs_pending: 'bg-red-500/15 text-red-400 border-red-500/25',
  under_review: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  verified:     'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  rejected:     'bg-red-700/20 text-red-400 border-red-700/25',
}
const STATUS_LABEL = { pending:'Under Review', docs_pending:'Docs Pending', under_review:'In Review', verified:'Verified', rejected:'Rejected' }

export default function AdminVerify() {
  const [companies, setCompanies] = useState(COMPANIES)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  const action = (id, status) => { setCompanies(p => p.map(c => c.id===id ? {...c, status} : c)); setSelected(null) }
  const filtered = companies.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 flex overflow-hidden">
        {/* List */}
        <div className={`${selected ? 'w-96' : 'flex-1'} border-r border-white/5 flex flex-col transition-all duration-300`}>
          <div className="bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-5">
            <h1 className="font-outfit font-black text-xl text-white">Company Verification</h1>
            <p className="text-white/35 text-sm">{companies.filter(c=>c.status==='pending'||c.status==='docs_pending'||c.status==='under_review').length} pending verification</p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 mt-3">
              <Search size={13} className="text-white/30" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search companies…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                onClick={() => setSelected(c)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all hover:border-white/15 ${selected?.id===c.id ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/8 bg-white/[0.025]'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <img src={c.img} alt={c.name} className="w-10 h-10 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-outfit font-bold text-white text-sm">{c.name}</p>
                    <p className="text-white/35 text-xs flex items-center gap-1"><MapPin size={9} />{c.city} · {c.type}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLE[c.status]}`}>{STATUS_LABEL[c.status]}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/30 flex items-center gap-1"><Clock size={9} />Applied: {c.applied}</span>
                  <span className="text-white/40">{c.docs.length} docs uploaded</span>
                  <span className="text-indigo-400">{c.projects} projects</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex-1 overflow-y-auto">
            <div className="sticky top-0 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h2 className="font-outfit font-bold text-white text-base">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-white/30 text-xs hover:text-white/60">← Back</button>
            </div>
            <div className="p-6">
              {/* Company info */}
              <div className="flex items-start gap-4 mb-5 p-4 rounded-2xl bg-white/3 border border-white/8">
                <img src={selected.img} alt={selected.name} className="w-16 h-16 rounded-2xl object-cover" />
                <div>
                  <h3 className="font-outfit font-bold text-white text-lg">{selected.name}</h3>
                  <p className="text-white/40 text-sm">{selected.type} · {selected.city}, Tamil Nadu</p>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div><p className="text-white/25 text-[10px]">GST Number</p><p className="text-white/60 text-xs font-mono">{selected.gst}</p></div>
                    <div><p className="text-white/25 text-[10px]">CIN Number</p><p className="text-white/60 text-xs font-mono">{selected.cin}</p></div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <h3 className="font-outfit font-bold text-white text-sm mb-3">Uploaded Documents</h3>
              <div className="flex flex-col gap-2 mb-6">
                {['GST Certificate', 'PAN Card', 'Company Registration', 'MSME Certificate', 'Bank Statement'].map(doc => {
                  const uploaded = selected.docs.includes(doc)
                  return (
                    <div key={doc} className={`flex items-center gap-3 p-3 rounded-xl border ${uploaded ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-red-500/15 bg-red-500/5'}`}>
                      {uploaded ? <CheckCircle size={14} className="text-emerald-400" /> : <XCircle size={14} className="text-red-400" />}
                      <span className="text-white/65 text-xs flex-1">{doc}</span>
                      {uploaded ? (
                        <button className="flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300"><FileText size={10} /> View</button>
                      ) : (
                        <span className="text-red-400 text-[10px]">Missing</span>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => action(selected.id, 'verified')}
                  className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex-1 justify-center">
                  <CheckCircle size={16} /> Verify & Approve
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => action(selected.id, 'docs_pending')}
                  className="flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-300">
                  Request Docs
                </motion.button>
                <motion.button whileHover={{ scale: 1.03 }} onClick={() => action(selected.id, 'rejected')}
                  className="flex items-center gap-2 text-sm font-bold px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400">
                  <XCircle size={16} /> Reject
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
      <AIChatbot />
    </div>
  )
}
