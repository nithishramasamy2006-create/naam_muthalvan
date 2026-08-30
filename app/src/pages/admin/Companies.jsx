import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Search, CheckCircle, Clock, AlertCircle, ExternalLink } from 'lucide-react'

const COMPANIES = [
  { id:1, name:'Zoho Corporation', type:'MNC', city:'Chennai', status:'verified', tier:'Platinum', projects:18, hired:42, rating:4.8, img:'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&q=70' },
  { id:2, name:'Freshworks', type:'MNC', city:'Chennai', status:'verified', tier:'Platinum', projects:14, hired:35, rating:4.9, img:'https://images.unsplash.com/photo-1560472355-536de3962603?w=60&q=70' },
  { id:3, name:'Hexaware Technologies', type:'Enterprise', city:'Chennai', status:'verified', tier:'Gold', projects:10, hired:28, rating:4.7, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&q=70' },
  { id:4, name:'PayU India', type:'Enterprise', city:'Bengaluru', status:'verified', tier:'Gold', projects:8, hired:20, rating:4.8, img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=60&q=70' },
  { id:5, name:'DataMinds Analytics', type:'SME', city:'Coimbatore', status:'verified', tier:'Silver', projects:6, hired:12, rating:4.6, img:'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&q=70' },
  { id:6, name:'TechBridge Solutions', type:'Startup', city:'Chennai', status:'pending', tier:'Bronze', projects:3, hired:0, rating:0, img:'https://images.unsplash.com/photo-1560472355-536de3962603?w=60&q=70' },
  { id:7, name:'HealthConnect Systems', type:'Enterprise', city:'Madurai', status:'docs_pending', tier:'Bronze', projects:0, hired:0, rating:0, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&q=70' },
  { id:8, name:'AgriSmart India', type:'Startup', city:'Salem', status:'pending', tier:'Bronze', projects:2, hired:0, rating:0, img:'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=60&q=70' },
]

const TIER_STYLE = { Platinum:'bg-violet-500/20 text-violet-300', Gold:'bg-amber-500/15 text-amber-300', Silver:'bg-slate-400/15 text-slate-300', Bronze:'bg-orange-900/20 text-orange-400' }
const STATUS_STYLE = { verified:'bg-emerald-500/15 text-emerald-300', pending:'bg-amber-500/15 text-amber-300', docs_pending:'bg-red-500/15 text-red-400' }

export default function AdminCompanies() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const filtered = COMPANIES.filter(c => {
    const qOk = !search || c.name.toLowerCase().includes(search.toLowerCase())
    const fOk = filter==='All' || c.status===filter.toLowerCase() || (filter==='Pending' && (c.status==='pending'||c.status==='docs_pending'))
    return qOk && fOk
  })

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Companies Management</h1>
          <p className="text-white/35 text-sm">{COMPANIES.filter(c=>c.status==='verified').length} verified · {COMPANIES.filter(c=>c.status!=='verified').length} pending</p>
        </div>
        <div className="p-8">
          <div className="flex gap-3 mb-5">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1">
              <Search size={13} className="text-white/30" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search companies…" className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
            {['All','Verified','Pending'].map(f => (
              <button key={f} onClick={()=>setFilter(f)} className={"text-xs font-semibold px-4 py-2 rounded-xl border transition-all " + (filter===f ? 'bg-purple-600 border-purple-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20')}>{f}</button>
            ))}
            <Link to="/admin/verify"><button className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white">Verify Queue (3) →</button></Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.07 }}
                className="p-4 rounded-2xl border border-white/8 bg-white/[0.025] hover:border-white/15 transition-all flex items-center gap-4">
                <img src={c.img} alt={c.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-outfit font-bold text-white text-sm">{c.name}</h3>
                    <span className={"text-[9px] font-bold px-1.5 py-0.5 rounded-full " + (TIER_STYLE[c.tier]||'')}>{c.tier}</span>
                  </div>
                  <p className="text-white/35 text-xs">{c.type} · {c.city}</p>
                  <div className="flex gap-3 mt-1 text-xs text-white/30">
                    <span>{c.projects} projects</span>
                    <span>{c.hired} hired</span>
                    {c.rating > 0 && <span className="text-amber-400">{c.rating} ★</span>}
                  </div>
                </div>
                <span className={"text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 " + (STATUS_STYLE[c.status]||'')}>{c.status.replace('_',' ')}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
