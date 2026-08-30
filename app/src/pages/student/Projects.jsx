import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { MapPin, Clock, Users, Star, ArrowRight, Search, Filter, Sparkles } from 'lucide-react'

const ALL_PROJECTS = [
  {
    id: 1, title: 'Analytics Dashboard — React & D3.js',
    company: 'Zoho Corporation', location: 'Chennai / Remote',
    domain: 'Web Development', stipend: '₹8,000', duration: '4 weeks',
    deadline: 'Sep 15, 2026', applicants: 42, openings: 2,
    skills: ['React.js', 'D3.js', 'MongoDB', 'REST API'],
    matchScore: 88, color: 'from-blue-500 to-indigo-600',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&q=70',
    level: 'Intermediate',
  },
  {
    id: 2, title: 'AI Chatbot — Python & NLP',
    company: 'Freshworks', location: 'Chennai / Hybrid',
    domain: 'Data Science', stipend: '₹6,500', duration: '3 weeks',
    deadline: 'Sep 20, 2026', applicants: 28, openings: 3,
    skills: ['Python', 'NLP', 'FastAPI', 'React.js'],
    matchScore: 74, color: 'from-violet-500 to-purple-600',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=80&q=70',
    level: 'Advanced',
  },
  {
    id: 3, title: 'IoT Smart Campus Dashboard',
    company: 'Hexaware Technologies', location: 'Coimbatore',
    domain: 'IoT', stipend: '₹7,000', duration: '5 weeks',
    deadline: 'Oct 1, 2026', applicants: 15, openings: 1,
    skills: ['Arduino', 'Node.js', 'MQTT', 'React.js'],
    matchScore: 72, color: 'from-cyan-500 to-teal-600',
    img: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=70',
    level: 'Intermediate',
  },
  {
    id: 4, title: 'Mobile UI/UX Redesign — Figma',
    company: 'PayU India', location: 'Remote',
    domain: 'UI/UX Design', stipend: '₹5,500', duration: '3 weeks',
    deadline: 'Sep 25, 2026', applicants: 56, openings: 2,
    skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
    matchScore: 96, color: 'from-pink-500 to-rose-500',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=80&q=70',
    level: 'Beginner',
  },
  {
    id: 5, title: 'Backend API — Node.js & PostgreSQL',
    company: 'HealthConnect Solutions', location: 'Madurai / Remote',
    domain: 'Web Development', stipend: '₹6,000', duration: '4 weeks',
    deadline: 'Oct 5, 2026', applicants: 21, openings: 2,
    skills: ['Node.js', 'PostgreSQL', 'REST API', 'Docker'],
    matchScore: 68, color: 'from-emerald-500 to-green-600',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=80&q=70',
    level: 'Intermediate',
  },
  {
    id: 6, title: 'ML Sentiment Analysis Pipeline',
    company: 'DataMinds Analytics', location: 'Remote',
    domain: 'Data Science', stipend: '₹7,500', duration: '4 weeks',
    deadline: 'Oct 8, 2026', applicants: 33, openings: 1,
    skills: ['Python', 'TensorFlow', 'Pandas', 'NLP'],
    matchScore: 62, color: 'from-amber-500 to-orange-600',
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=75',
    companyImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&q=70',
    level: 'Advanced',
  },
]

const DOMAINS = ['All', 'Web Development', 'Data Science', 'UI/UX Design', 'IoT', 'Mobile Development']
const LEVELS = ['All Levels', 'Beginner', 'Intermediate', 'Advanced']

function ProjectCard({ p, i }) {
  const [applied, setApplied] = useState(false)
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden group">
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] via-black/20 to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.color}`} />
        {/* AI match */}
        <div className={`absolute top-3 right-3 text-[10px] font-black px-2.5 py-1 rounded-full
          ${p.matchScore >= 85 ? 'bg-emerald-500 text-white' : p.matchScore >= 70 ? 'bg-amber-500 text-black' : 'bg-white/15 text-white backdrop-blur-sm'}`}>
          <Sparkles size={9} className="inline mr-0.5" />{p.matchScore}% match
        </div>
        <div className="absolute bottom-3 left-3">
          <img src={p.companyImg} alt={p.company} className="w-8 h-8 rounded-lg object-cover border border-white/20" />
        </div>
        <div className={`absolute bottom-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full
          ${p.level === 'Beginner' ? 'bg-emerald-500/80 text-white' : p.level === 'Intermediate' ? 'bg-amber-500/80 text-black' : 'bg-red-500/80 text-white'}`}>
          {p.level}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-outfit font-bold text-white text-sm leading-tight mb-1">{p.title}</h3>
        <p className="text-white/40 text-xs mb-2">{p.company} · {p.domain}</p>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-white/35 mb-3">
          <span className="flex items-center gap-1"><MapPin size={9} />{p.location}</span>
          <span className="flex items-center gap-1"><Clock size={9} />{p.duration}</span>
          <span className="flex items-center gap-1"><Users size={9} />{p.applicants} applied</span>
          <span className="text-emerald-400 font-semibold">{p.stipend}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {p.skills.map(s => <span key={s} className="text-[9px] text-white/40 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">{s}</span>)}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/25 text-[10px] flex items-center gap-1">
            <Clock size={9} /> Deadline: {p.deadline}
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setApplied(!applied)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all
              ${applied ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : `bg-gradient-to-r ${p.color} text-white shadow-lg`}`}>
            {applied ? '✓ Applied' : <>Apply <ArrowRight size={11} /></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function StudentProjects() {
  const [domain, setDomain] = useState('All')
  const [level, setLevel] = useState('All Levels')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('match')

  const filtered = ALL_PROJECTS
    .filter(p => {
      const dOk = domain === 'All' || p.domain === domain
      const lOk = level === 'All Levels' || p.level === level
      const qOk = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.company.toLowerCase().includes(search.toLowerCase())
      return dOk && lOk && qOk
    })
    .sort((a, b) => sort === 'match' ? b.matchScore - a.matchScore : sort === 'stipend' ? parseInt(b.stipend) - parseInt(a.stipend) : a.applicants - b.applicants)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Browse Projects</h1>
          <p className="text-white/35 text-sm">{ALL_PROJECTS.length} live projects · Sorted by AI match score</p>
        </div>

        <div className="p-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[200px] focus-within:border-white/20 transition-colors">
              <Search size={13} className="text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects or companies…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-white/5 border border-white/10 text-white/60 text-sm rounded-xl px-3 py-2 outline-none">
              <option value="match" className="bg-[#0D0818]">Sort: AI Match</option>
              <option value="stipend" className="bg-[#0D0818]">Sort: Stipend</option>
              <option value="applicants" className="bg-[#0D0818]">Sort: Least Applied</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2 mb-5">
            {DOMAINS.map(d => (
              <button key={d} onClick={() => setDomain(d)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
                  ${domain === d ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'}`}>
                {d}
              </button>
            ))}
            {LEVELS.map(l => (
              <button key={l} onClick={() => setLevel(l)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all
                  ${level === l ? 'bg-violet-600 border-violet-500 text-white' : 'border-white/10 text-white/35 hover:border-white/20'}`}>
                {l}
              </button>
            ))}
          </div>

          <h3 className="font-outfit font-bold text-white/40 text-xs uppercase tracking-widest mb-4">
            {filtered.length} results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
