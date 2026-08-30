import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Save, Shield, Award, Bell, Globe } from 'lucide-react'

export default function AdminSettings() {
  const [credits, setCredits] = useState({ beginner:4, intermediate:6, advanced:8 })
  const [notifs, setNotifs] = useState({ newApp:true, newCompany:true, dispute:true, report:false })

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div><h1 className="font-outfit font-black text-2xl text-white">Platform Settings</h1><p className="text-white/35 text-sm">Configure platform rules, NM credit policies, and notifications</p></div>
          <motion.button whileHover={{ scale: 1.04 }} className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg"><Save size={16} /> Save Settings</motion.button>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/8">
            <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"><Award size={16} className="text-white" /></div><h2 className="font-outfit font-bold text-white text-lg">NM Credit Policy</h2></div>
            <div className="grid grid-cols-3 gap-4">
              {[{l:'Beginner Projects',k:'beginner'},{l:'Intermediate Projects',k:'intermediate'},{l:'Advanced Projects',k:'advanced'}].map(f => (
                <div key={f.k}>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">{f.l}</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={credits[f.k]} onChange={e=>setCredits(p=>({...p,[f.k]:Number(e.target.value)}))} min={1} max={20}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-white/20" />
                    <span className="text-white/30 text-xs flex-shrink-0">credits</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white/[0.025] border border-white/8">
            <div className="flex items-center gap-3 mb-5"><div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><Bell size={16} className="text-white" /></div><h2 className="font-outfit font-bold text-white text-lg">Admin Notifications</h2></div>
            <div className="flex flex-col gap-4">
              {[{l:'New company registration',k:'newCompany'},{l:'New dispute filed',k:'dispute'},{l:'New application',k:'newApp'},{l:'Monthly platform report',k:'report'}].map(n => (
                <div key={n.k} className="flex items-center justify-between p-3 rounded-xl bg-white/3 border border-white/6">
                  <span className="text-white/60 text-sm">{n.l}</span>
                  <button onClick={()=>setNotifs(p=>({...p,[n.k]:!p[n.k]}))}
                    className={"w-10 h-5 rounded-full transition-all relative " + (notifs[n.k]?'bg-indigo-600':'bg-white/15')}>
                    <div className={"absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all " + (notifs[n.k]?'left-5':'left-0.5')} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
