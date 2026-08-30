import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Search, UserCheck, UserX, Shield, GraduationCap, Building2, Users } from 'lucide-react'

const USERS = [
  { id:1, name:'Arjun Kumar', email:'arjun@psgtech.edu', role:'student', college:'PSG Tech', joined:'Aug 1, 2026', active:true, img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70' },
  { id:2, name:'Priya Nair', email:'priya@annauniv.edu', role:'student', college:'Anna University', joined:'Aug 3, 2026', active:true, img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=70' },
  { id:3, name:'Zoho HR', email:'hr@zohocorporation.com', role:'company', college:'Zoho Corporation', joined:'Jul 15, 2026', active:true, img:'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=60&q=70' },
  { id:4, name:'Freshworks HR', email:'hr@freshworks.com', role:'company', college:'Freshworks', joined:'Jul 20, 2026', active:true, img:'https://images.unsplash.com/photo-1560472355-536de3962603?w=60&q=70' },
  { id:5, name:'PSG Tech Admin', email:'admin@psgtech.edu', role:'college', college:'PSG College of Technology', joined:'Jun 10, 2026', active:true, img:'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=60&q=70' },
  { id:6, name:'Karthik Selvam', email:'karthik@vit.ac.in', role:'student', college:'VIT Vellore', joined:'Aug 5, 2026', active:false, img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70' },
  { id:7, name:'DataMinds Admin', email:'hr@dataminds.com', role:'company', college:'DataMinds Analytics', joined:'Jul 28, 2026', active:true, img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=60&q=70' },
  { id:8, name:'Meera Krishnan', email:'meera@srm.edu', role:'student', college:'SRM Institute', joined:'Aug 8, 2026', active:true, img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&q=70' },
]

const ROLE_STYLE = { student:'bg-indigo-500/15 text-indigo-300', company:'bg-orange-500/15 text-orange-300', college:'bg-emerald-500/15 text-emerald-300', admin:'bg-red-500/15 text-red-300' }
const ROLE_ICON = { student: GraduationCap, company: Building2, college: GraduationCap, admin: Shield }

export default function AdminUsers() {
  const [users, setUsers] = useState(USERS)
  const [role, setRole] = useState('All')
  const [search, setSearch] = useState('')

  const toggle = (id) => setUsers(p => p.map(u => u.id===id ? {...u, active:!u.active} : u))

  const filtered = users.filter(u => {
    const rOk = role === 'All' || u.role === role.toLowerCase()
    const qOk = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search)
    return rOk && qOk
  })

  const counts = { All: users.length, Student: users.filter(u=>u.role==='student').length, Company: users.filter(u=>u.role==='company').length, College: users.filter(u=>u.role==='college').length }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Users Management</h1>
          <p className="text-white/35 text-sm">{users.filter(u=>u.active).length} active · {users.filter(u=>!u.active).length} suspended</p>
        </div>
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label:'Total Users', val: users.length, icon: Users, color:'from-indigo-500 to-violet-600' },
              { label:'Students', val: counts.Student, icon: GraduationCap, color:'from-blue-500 to-indigo-500' },
              { label:'Companies', val: counts.Company, icon: Building2, color:'from-orange-500 to-red-500' },
              { label:'College Admins', val: counts.College, icon: Shield, color:'from-emerald-500 to-teal-500' },
            ].map((s,i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.07 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}><s.icon size={18} className="text-white" /></div>
                <div><div className="font-outfit font-black text-2xl text-white">{s.val}</div><div className="text-white/35 text-xs">{s.label}</div></div>
              </motion.div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-5">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1">
              <Search size={13} className="text-white/30" />
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search users…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
            {['All', 'Student', 'Company', 'College'].map(r => (
              <button key={r} onClick={() => setRole(r)}
                className={`text-xs font-semibold px-4 py-2 rounded-xl border transition-all ${role===r ? 'bg-purple-600 border-purple-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                {r} {counts[r] !== undefined ? `(${counts[r]})` : ''}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  {['User', 'Role', 'Organization', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-white/30 text-[10px] font-bold uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => {
                  const Icon = ROLE_ICON[u.role] || Users
                  return (
                    <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*0.04 }}
                      className="border-b border-white/5 hover:bg-white/[0.015] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={u.img} alt={u.name} className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <p className="text-white text-xs font-semibold">{u.name}</p>
                            <p className="text-white/30 text-[10px]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit ${ROLE_STYLE[u.role]}`}>
                          <Icon size={9} /> {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">{u.college}</td>
                      <td className="px-4 py-3 text-white/30 text-xs">{u.joined}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${u.active ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                          {u.active ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => toggle(u.id)}
                          className={`text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 ${u.active ? 'bg-red-500/15 border border-red-500/25 text-red-400' : 'bg-emerald-500/15 border border-emerald-500/25 text-emerald-400'}`}>
                          {u.active ? <><UserX size={10} /> Suspend</> : <><UserCheck size={10} /> Activate</>}
                        </motion.button>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
