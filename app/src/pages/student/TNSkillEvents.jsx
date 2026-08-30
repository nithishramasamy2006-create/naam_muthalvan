import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { CalendarDays, MapPin, Users, Trophy, Clock, ArrowRight, Star, CheckCircle, Filter, Search, Zap, Award, BookOpen, Code2, Cpu, Globe } from 'lucide-react'

const EVENTS = [
  {
    id: 1,
    title: 'AI & Machine Learning Bootcamp',
    category: 'Bootcamp',
    categoryColor: 'from-violet-500 to-purple-600',
    catBg: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    date: 'Sep 5, 2026',
    time: '9:00 AM – 5:00 PM',
    location: 'Anna University, Chennai',
    mode: 'Offline',
    seats: 150,
    filled: 132,
    organizer: 'TNSDC × NASSCOM',
    prize: null,
    credits: 8,
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'Data Visualization'],
    desc: 'An intensive one-day bootcamp on practical AI/ML with hands-on projects. Taught by IIT Madras professors and industry experts from Google and Amazon.',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    status: 'live',
    statusLabel: '🔴 LIVE NOW',
    featured: true,
  },
  {
    id: 2,
    title: 'Full Stack Hackathon — TN Edition',
    category: 'Hackathon',
    categoryColor: 'from-orange-500 to-red-500',
    catBg: 'bg-orange-500/10 text-orange-300 border-orange-500/25',
    date: 'Sep 12–13, 2026',
    time: '24-hour event',
    location: 'PSG Tech, Coimbatore',
    mode: 'Hybrid',
    seats: 200,
    filled: 156,
    organizer: 'NM MicroLearn × PSG Tech',
    prize: '₹50,000',
    credits: 10,
    skills: ['React.js', 'Node.js', 'MongoDB', 'REST API', 'Docker'],
    desc: 'Build a full-stack solution in 24 hours for real industry problems. Teams of 3-4. Winners get ₹50,000 prize + certificates + direct placement consideration.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    status: 'open',
    statusLabel: '🟡 Open — Deadline Sep 8',
    featured: true,
  },
  {
    id: 3,
    title: 'TNSDC Career Fair 2026',
    category: 'Career Fair',
    categoryColor: 'from-emerald-500 to-teal-500',
    catBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    date: 'Sep 18, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Chennai Trade Centre',
    mode: 'Offline',
    seats: 2000,
    filled: 847,
    organizer: 'TNSDC × Govt. of Tamil Nadu',
    prize: null,
    credits: 5,
    skills: ['All domains'],
    desc: '500+ companies hiring from 65 colleges. Bring your NM MicroLearn portfolio and certificates for priority screening. TNSDC Gold-certified students get exclusive access.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    status: 'open',
    statusLabel: '🟢 Open Registration',
    featured: false,
  },
  {
    id: 4,
    title: 'IoT Innovation Challenge',
    category: 'Competition',
    categoryColor: 'from-cyan-500 to-blue-500',
    catBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    date: 'Oct 3, 2026',
    time: '9:00 AM – 6:00 PM',
    location: 'NIT Trichy',
    mode: 'Offline',
    seats: 80,
    filled: 34,
    organizer: 'NIT Trichy × TechBridge',
    prize: '₹30,000',
    credits: 8,
    skills: ['Arduino', 'Raspberry Pi', 'MQTT', 'Embedded C', 'Python'],
    desc: 'Design and prototype an IoT solution for smart agriculture or smart city. Hardware provided. Best 3 solutions win funding and incubation support.',
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80',
    status: 'open',
    statusLabel: '🔵 Seats Available',
    featured: false,
  },
  {
    id: 5,
    title: 'UI/UX Design Sprint — Figma Edition',
    category: 'Workshop',
    categoryColor: 'from-pink-500 to-rose-500',
    catBg: 'bg-pink-500/10 text-pink-300 border-pink-500/25',
    date: 'Oct 10, 2026',
    time: '2:00 PM – 7:00 PM',
    location: 'Online (Zoom)',
    mode: 'Online',
    seats: 300,
    filled: 89,
    organizer: 'Freshworks × NM MicroLearn',
    prize: null,
    credits: 4,
    skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping', 'Design Thinking'],
    desc: 'A 5-hour live workshop by Freshworks senior designers. Build a complete UI in Figma from scratch. Get portfolio-ready designs and a verified participation certificate.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    status: 'open',
    statusLabel: '🟢 Open — Online',
    featured: false,
  },
  {
    id: 6,
    title: 'Cybersecurity CTF Challenge',
    category: 'Competition',
    categoryColor: 'from-slate-500 to-gray-600',
    catBg: 'bg-slate-500/10 text-slate-300 border-slate-500/25',
    date: 'Oct 20, 2026',
    time: '48-hour online',
    location: 'Online',
    mode: 'Online',
    seats: 500,
    filled: 210,
    organizer: 'SecureAxis × TNSDC',
    prize: '₹20,000',
    credits: 6,
    skills: ['Linux', 'Network Security', 'Python', 'Ethical Hacking', 'Cryptography'],
    desc: 'Capture The Flag competition with 50+ challenges across web, crypto, forensics, and binary exploitation. All levels welcome. Winners fast-tracked to SecureAxis interviews.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    status: 'upcoming',
    statusLabel: '📅 Upcoming',
    featured: false,
  },
]

const CATEGORIES = ['All', 'Hackathon', 'Bootcamp', 'Workshop', 'Career Fair', 'Competition']
const MODES = ['All Modes', 'Online', 'Offline', 'Hybrid']

function EventCard({ event, featured = false }) {
  const [registered, setRegistered] = useState(false)
  const fillPct = Math.round((event.filled / event.seats) * 100)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`rounded-3xl border border-white/8 bg-white/[0.03] overflow-hidden group ${featured ? 'col-span-2' : ''}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? 'h-52' : 'h-36'}`}>
        <img src={event.image} alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0818] via-[#0D0818]/40 to-transparent" />
        {/* Status pill */}
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/15">
            {event.statusLabel}
          </span>
        </div>
        {/* Prize badge */}
        {event.prize && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-500 text-black shadow-lg">
              🏆 {event.prize}
            </span>
          </div>
        )}
        {/* Credits */}
        <div className="absolute bottom-3 right-3">
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-indigo-600/80 text-white backdrop-blur-sm">
            +{event.credits} NM Credits
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Category + Mode */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${event.catBg}`}>{event.category}</span>
          <span className="text-[10px] font-medium text-white/35 border border-white/10 px-2 py-0.5 rounded-full">{event.mode}</span>
        </div>

        {/* Title */}
        <h3 className="font-outfit font-bold text-white text-lg leading-tight mb-2">{event.title}</h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40 mb-3">
          <span className="flex items-center gap-1"><CalendarDays size={11} />{event.date}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{event.time}</span>
          <span className="flex items-center gap-1"><MapPin size={11} />{event.location}</span>
        </div>

        {/* Description */}
        <p className="text-white/45 text-[13px] leading-relaxed mb-4 line-clamp-2">{event.desc}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {event.skills.map(s => (
            <span key={s} className="text-[10px] font-medium text-white/50 bg-white/5 border border-white/8 rounded-full px-2.5 py-0.5">
              {s}
            </span>
          ))}
        </div>

        {/* Seats progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-[10px] text-white/35 mb-1">
            <span><Users size={9} className="inline mr-1" />{event.filled} registered</span>
            <span className={fillPct >= 80 ? 'text-red-400 font-bold' : 'text-white/35'}>{event.seats - event.filled} seats left</span>
          </div>
          <div className="h-1 bg-white/8 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${event.categoryColor}`}
              initial={{ width: 0 }} animate={{ width: `${fillPct}%` }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Organizer + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-white/25">Organized by</div>
            <div className="text-white/55 text-xs font-medium">{event.organizer}</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={() => setRegistered(!registered)}
            className={`flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg
              ${registered
                ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                : `bg-gradient-to-r ${event.categoryColor} text-white shadow-black/20`}`}
          >
            {registered ? <><CheckCircle size={13} /> Registered!</> : <>Register <ArrowRight size={13} /></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function TNSkillEvents() {
  const [category, setCategory] = useState('All')
  const [mode, setMode] = useState('All Modes')
  const [search, setSearch] = useState('')

  const filtered = EVENTS.filter(e => {
    const catOk = category === 'All' || e.category === category
    const modeOk = mode === 'All Modes' || e.mode === mode
    const searchOk = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    return catOk && modeOk && searchOk
  })

  const totalCredits = EVENTS.reduce((s, e) => s + e.credits, 0)
  const liveCount = EVENTS.filter(e => e.status === 'live').length
  const prizeTotal = EVENTS.filter(e => e.prize).reduce((s, e) => s + parseInt(e.prize.replace(/[^\d]/g, '')), 0)

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />

      <main className="flex-1 overflow-y-auto">
        {/* Hero header */}
        <div className="relative border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80" alt=""
              className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06030F]/60 via-[#06030F]/80 to-[#06030F]" />
          </div>
          <div className="relative z-10 px-8 py-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/30 text-xs mb-4 font-medium">
              <CalendarDays size={12} />
              <span>NM MicroLearn</span>
              <span>/</span>
              <span className="text-white/60">TN Skill Events</span>
            </div>

            <div className="flex items-start justify-between">
              <div>
                {/* H1 */}
                <h1 className="font-outfit font-black text-4xl md:text-5xl text-white mb-2 leading-tight">
                  TN Skill <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">Events</span>
                </h1>
                {/* H2 */}
                <h2 className="font-outfit font-semibold text-white/50 text-lg mb-6">
                  Naan Mudhalvan × TNSDC · Tamil Nadu Skill Development Events 2026
                </h2>
                {/* Stat pills */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: CalendarDays, val: `${EVENTS.length} Events`, color: 'text-indigo-400' },
                    { icon: Zap, val: `${liveCount} Live Now`, color: 'text-red-400' },
                    { icon: Award, val: `+${totalCredits} Total Credits`, color: 'text-amber-400' },
                    { icon: Trophy, val: `₹${(prizeTotal/1000).toFixed(0)}K+ Prize Money`, color: 'text-emerald-400' },
                  ].map(s => (
                    <div key={s.val} className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5">
                      <s.icon size={12} className={s.color} />
                      <span className="text-white/60 text-xs font-semibold">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6">
          {/* Search + Filters */}
          <div className="flex flex-wrap gap-3 mb-6 items-center">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[200px] focus-within:border-white/25 transition-colors">
              <Search size={14} className="text-white/30" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search events or skills…"
                className="bg-transparent text-white text-sm outline-none placeholder-white/25 flex-1" />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategory(c)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                    ${category === c ? 'bg-amber-500 border-amber-400 text-black shadow-lg shadow-amber-500/25' : 'border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Mode filter */}
            <div className="flex gap-1.5">
              {MODES.map(m => (
                <button key={m} onClick={() => setMode(m)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200
                    ${mode === m ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* H3: Section label */}
          <h3 className="font-outfit font-bold text-white/60 text-sm uppercase tracking-widest mb-4">
            {filtered.length} Events · Showing {category === 'All' ? 'All Categories' : category}
          </h3>

          {/* Event grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((event, i) => (
                <EventCard key={event.id} event={event} featured={event.featured && i === 0} />
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <motion.div className="col-span-2 text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="text-5xl mb-4">📅</div>
                <h3 className="font-outfit font-bold text-white/50 text-xl mb-2">No events found</h3>
                <p className="text-white/25 text-sm">Try changing the category or search term</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>

      <AIChatbot />
    </div>
  )
}
