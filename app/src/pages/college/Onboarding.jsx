import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CheckCircle, Clock, AlertCircle, Users, Award, Download, Search } from 'lucide-react'

const STUDENTS = [
  { id: 1, name: 'Arjun Kumar', rollNo: '20CSE042', dept: 'CSE', sem: 7, email: 'arjun@psgtech.edu', credits: 24, projects: 3, status: 'active', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=70' },
  { id: 2, name: 'Priya Nair', rollNo: '21IT018', dept: 'IT', sem: 6, email: 'priya@psgtech.edu', credits: 18, projects: 2, status: 'active', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=70' },
  { id: 3, name: 'Karthik R', rollNo: '20CSE078', dept: 'CSE', sem: 7, email: 'karthik@psgtech.edu', credits: 12, projects: 1, status: 'active', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=70' },
  { id: 4, name: 'Divya S', rollNo: '21ECE034', dept: 'ECE', sem: 6, email: 'divya@psgtech.edu', credits: 0, projects: 0, status: 'not_enrolled', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=70' },
  { id: 5, name: 'Rahul M', rollNo: '20MECH011', dept: 'MECH', sem: 7, email: 'rahul@psgtech.edu', credits: 5, projects: 1, status: 'active', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=70' },
  { id: 6, name: 'Sneha P', rollNo: '21IT052', dept: 'IT', sem: 6, email: 'sneha@psgtech.edu', credits: 0, projects: 0, status: 'not_enrolled', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&q=70' },
]

export default function CollegeOnboarding() {
  const [students, setStudents] = useState(STUDENTS)
  const [search, setSearch] = useState('')
  const [dept, setDept] = useState('All')
  const enroll = (id) => setStudents(p => p.map(s => s.id === id ? { ...s, status: 'active' } : s))

  const filtered = students.filter(s => {
    const qOk = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.includes(search)
    const dOk = dept === 'All' || s.dept === dept
    return qOk && dOk
  })

  const notEnrolled = students.filter(s => s.status === 'not_enrolled').length

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="college" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-outfit font-black text-2xl text-white">Student Onboarding</h1>
            <p className="text-white/35 text-sm">{students.filter(s => s.status === 'active').length} enrolled · {notEnrolled} pending</p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }}
            className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg">
            + Bulk Upload CSV
          </motion.button>
        </div>
        <div className="p-8">
          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Enrolled Students', val: students.filter(s=>s.status==='active').length, icon: CheckCircle, color: 'from-emerald-500 to-teal-500' },
              { label: 'Not Yet Enrolled', val: notEnrolled, icon: AlertCircle, color: 'from-red-500 to-rose-600' },
              { label: 'Total Students', val: students.length, icon: Users, color: 'from-indigo-500 to-violet-600' },
            ].map((s,i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*0.08 }}
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
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll number…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
            {['All','CSE','IT','ECE','MECH','CIVIL'].map(d => (
              <button key={d} onClick={() => setDept(d)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${dept===d ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}>{d}</button>
            ))}
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.02]">
                  {['Student', 'Roll No', 'Dept', 'Sem', 'NM Credits', 'Projects', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left text-white/30 text-[10px] font-bold uppercase tracking-wider px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img src={s.img} alt={s.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="text-white text-xs font-semibold">{s.name}</p>
                          <p className="text-white/30 text-[10px]">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-xs">{s.rollNo}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{s.dept}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{s.sem}</td>
                    <td className="px-4 py-3 text-amber-400 text-xs font-bold">{s.credits}</td>
                    <td className="px-4 py-3 text-white/50 text-xs">{s.projects}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.status === 'active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                        {s.status === 'active' ? 'Enrolled' : 'Not Enrolled'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {s.status !== 'active' ? (
                        <motion.button whileHover={{ scale: 1.05 }} onClick={() => enroll(s.id)}
                          className="text-[10px] font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                          Enroll
                        </motion.button>
                      ) : (
                        <span className="text-emerald-400 text-[10px] flex items-center gap-1"><CheckCircle size={10} /> Done</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
