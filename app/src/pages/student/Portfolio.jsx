import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { ExternalLink, GitBranch, Star, Award, Code2, Layers, Download, Share2 } from 'lucide-react'

const PROJECTS_DONE = [
  {
    title: 'Mobile App UI/UX Redesign',
    company: 'PayU India', domain: 'UI/UX Design',
    duration: '3 weeks', rating: 5.0,
    skills: ['Figma', 'UI/UX', 'Prototyping', 'Responsive Design'],
    desc: 'Redesigned the PayU mobile app from scratch using Material Design 3. Delivered 47 screens with interactive prototype and user testing report.',
    img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75',
    github: 'github.com/arjun/payumobile-ux',
    demo: 'figma.com/proto/arjun-payu',
    color: 'from-pink-500 to-rose-600',
    nmCerts: 'NM-2026-CSE-00001',
  },
  {
    title: 'E-Commerce React Dashboard',
    company: 'Zoho Corporation', domain: 'Web Development',
    duration: '4 weeks', rating: 4.9,
    skills: ['React.js', 'JavaScript', 'REST API', 'Tailwind CSS', 'Chart.js'],
    desc: 'Built a full analytics dashboard with real-time sales charts, inventory management, and customer insights for Zoho\'s e-commerce platform.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75',
    github: 'github.com/arjun/zoho-dashboard',
    demo: 'zoho-dash.netlify.app',
    color: 'from-blue-500 to-indigo-600',
    nmCerts: 'NM-2026-CSE-00002',
  },
  {
    title: 'Python Web Scraper Pipeline',
    company: 'DataMinds Analytics', domain: 'Data Science',
    duration: '4 weeks', rating: 4.8,
    skills: ['Python', 'Pandas', 'BeautifulSoup', 'REST API', 'PostgreSQL'],
    desc: 'Developed an automated data pipeline scraping Tamil Nadu govt portals for agricultural price data, cleaning it and storing in PostgreSQL.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75',
    github: 'github.com/arjun/tn-data-pipeline',
    demo: null,
    color: 'from-violet-500 to-purple-600',
    nmCerts: 'NM-2026-CSE-00003',
  },
]

const SKILLS_ALL = [...new Set(PROJECTS_DONE.flatMap(p => p.skills))]

export default function Portfolio() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        {/* Hero banner */}
        <div className="relative h-52 overflow-hidden border-b border-white/5">
          <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=60"
            alt="Portfolio" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06030F]/40 via-[#06030F]/60 to-[#06030F]" />
          <div className="absolute inset-0 flex flex-col items-start justify-end px-8 pb-6">
            <div className="flex items-end gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-outfit font-black text-white text-2xl shadow-2xl border-2 border-white/20">
                AK
              </div>
              <div>
                <h1 className="font-outfit font-black text-3xl text-white">Arjun Kumar</h1>
                <p className="text-white/50 text-sm">B.E. CSE · PSG College of Technology · Coimbatore</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-indigo-300 text-xs font-bold bg-indigo-500/15 border border-indigo-500/25 px-2 py-0.5 rounded-full">Silver Level · 24 NM Credits</span>
                  <span className="text-amber-300 text-xs font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">Avg Rating 4.85 ★</span>
                </div>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-white/8 border border-white/15 text-white/70 hover:bg-white/12 transition-all">
                  <Share2 size={13} /> Share Portfolio
                </button>
                <button className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
                  <Download size={13} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Skill cloud */}
          <div className="mb-8 p-5 rounded-2xl bg-white/[0.025] border border-white/8">
            <h2 className="font-outfit font-bold text-white text-base mb-3 flex items-center gap-2"><Code2 size={16} className="text-indigo-400" /> Verified Skill Stack</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS_ALL.map((s, i) => (
                <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                  className="text-xs font-semibold text-white/65 bg-white/6 border border-white/10 hover:border-indigo-500/40 hover:text-indigo-300 transition-all px-3 py-1.5 rounded-xl cursor-default">
                  {s}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Project cards */}
          <h2 className="font-outfit font-bold text-white text-lg mb-4 flex items-center gap-2"><Layers size={18} className="text-violet-400" /> Project Showcase</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROJECTS_DONE.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] to-transparent" />
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${p.color}`} />
                  <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/80 backdrop-blur-sm rounded-full px-2 py-0.5">
                    <Star size={10} className="text-black fill-black" />
                    <span className="text-black text-[10px] font-black">{p.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-white/70 text-[10px] font-semibold">{p.company} · {p.duration}</span>
                    <span className="text-[9px] text-white/50 bg-black/40 px-2 py-0.5 rounded-full">#{p.nmCerts}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-outfit font-bold text-white text-sm leading-tight mb-1">{p.title}</h3>
                  <p className="text-white/35 text-[11px] leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.skills.map(s => <span key={s} className="text-[9px] text-white/40 bg-white/5 border border-white/8 rounded-full px-2 py-0.5">{s}</span>)}
                  </div>
                  <div className="flex gap-2">
                    <a href={`https://${p.github}`} target="_blank" rel="noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-white/6 border border-white/10 text-white/55 hover:text-white/80 hover:bg-white/10 transition-all">
                      <GitBranch size={11} /> GitHub
                    </a>
                    {p.demo && (
                      <a href={`https://${p.demo}`} target="_blank" rel="noreferrer"
                        className={`flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-gradient-to-r ${p.color} text-white shadow-lg`}>
                        <ExternalLink size={11} /> Live Demo
                      </a>
                    )}
                    <div className="ml-auto flex items-center gap-1 text-emerald-400">
                      <Award size={12} />
                      <span className="text-[10px] font-bold">Verified</span>
                    </div>
                  </div>
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
