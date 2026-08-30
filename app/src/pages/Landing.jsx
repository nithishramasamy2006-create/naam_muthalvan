import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import { ArrowRight, Sparkles, Award, TrendingUp, Users, Building2, GraduationCap, Shield, CheckCircle, Star } from 'lucide-react'

const portals = [
  {
    title: 'Student Portal',
    desc: 'Browse real projects, earn NM credits, get AI-powered job matches, and build your industry portfolio.',
    icon: GraduationCap,
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    glow: 'shadow-[0_0_60px_rgba(99,102,241,0.4)]',
    path: '/student',
    tag: 'AI Job Match ✦',
    tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    stats: ['4,218 Students', '24 NM Credits avg', 'AI Recommendations'],
  },
  {
    title: 'Company Portal',
    desc: 'Post micro-projects, screen top talent using AI skill matching, and mentor future industry leaders.',
    icon: Building2,
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    glow: 'shadow-[0_0_60px_rgba(234,88,12,0.4)]',
    path: '/company',
    tag: 'Smart Hiring ✦',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    stats: ['120 Companies', '384 Live Projects', '94% Completion'],
  },
  {
    title: 'College Portal',
    desc: 'Track student participation, approve NM credits, and submit TNSDC compliance reports automatically.',
    icon: GraduationCap,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    glow: 'shadow-[0_0_60px_rgba(5,150,105,0.4)]',
    path: '/college',
    tag: 'TNSDC Ready ✦',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    stats: ['65 Colleges', '1,240 Credits', '#3 State Rank'],
  },
  {
    title: 'Admin Portal',
    desc: 'Manage the full platform: verify companies, resolve disputes, and monitor state-wide leaderboards.',
    icon: Shield,
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    glow: 'shadow-[0_0_60px_rgba(124,58,237,0.4)]',
    path: '/admin',
    tag: 'Full Control ✦',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    stats: ['Full Analytics', 'Dispute Center', 'Skill Taxonomy'],
  },
]

const testimonials = [
  { name: 'Priya Nair', role: 'CSE, PSG Tech → Zoho (Placed)', text: 'The AI job match on NM MicroLearn showed me exactly which skills I needed. I completed 2 more micro-projects, hit 87% match score, and got placed!', rating: 5, avatar: 'PN', color: 'from-indigo-500 to-violet-500' },
  { name: 'Karthik Selvam', role: 'IT, Anna Univ → Freshworks', text: 'The Skill Gap radar was eye-opening. I could literally see which skills employers want vs what I had. The certificate-to-job pipeline is brilliant.', rating: 5, avatar: 'KS', color: 'from-blue-500 to-cyan-500' },
  { name: 'Divya Mohan', role: 'ECE, NIT Trichy → Hexaware', text: 'From ECE background with zero web knowledge to Full Stack Developer in 6 months — all through NM MicroLearn projects. My portfolio speaks for itself!', rating: 5, avatar: 'DM', color: 'from-pink-500 to-rose-500' },
]

const features = [
  { icon: Sparkles, title: 'AI Job Recommendations', desc: 'Smart engine scores job roles against your earned certificates and suggests skill bridges' },
  { icon: Award, title: 'QR-Verified Certificates', desc: 'Every certificate is digitally signed, QR-verifiable, and maps to Naan Mudhalvan credits' },
  { icon: TrendingUp, title: 'Skill Gap Radar', desc: 'Visual skill mapping vs industry benchmarks with personalized project suggestions' },
  { icon: Users, title: 'Live Mentor Chat', desc: 'Real-time workspace with kanban boards, file uploads, and instant mentor feedback' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } }

export default function Landing() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -80])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  return (
    <div className="min-h-screen bg-[#06030F] text-white overflow-x-hidden">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/5 bg-[#06030F]/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none"><path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white"/></svg>
          </div>
          <span className="font-outfit font-bold text-white text-lg">NM MicroLearn</span>
          <span className="text-white/30 text-xs border border-white/10 rounded-full px-2 py-0.5">Naan Mudhalvan</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
          <a href="#portals" className="hover:text-white transition-colors">Portals</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
        </div>
        <Link to="/student">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow">
            <Sparkles size={14} /> Get Started
          </motion.button>
        </Link>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.04]" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',backgroundSize:'60px 60px'}} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            <Sparkles size={12} /> Powered by AI Job Recommendations &bull; Naan Mudhalvan TNSDC
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-outfit font-black text-5xl md:text-7xl leading-tight mb-6">
            <span className="text-white">India's #1 </span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Micro-Project
            </span>
            <br /><span className="text-white">Marketplace</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect with real industry projects, earn Naan Mudhalvan credits, get AI-powered job matches,
            and build a portfolio that gets you hired — all in one platform.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/student">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.5)' }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-2xl shadow-indigo-500/30 transition-shadow">
                Explore Student Portal <ArrowRight size={18} />
              </motion.button>
            </Link>
            <a href="#portals">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/10 transition-colors backdrop-blur-sm">
                View All Portals
              </motion.button>
            </a>
          </motion.div>

          {/* Stat pills */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-6">
            {[['4,218', 'Active Students'], ['120+', 'Companies'], ['94%', 'Completion Rate'], ['1,842', 'Certificates']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-outfit font-black text-2xl text-white">{val}</div>
                <div className="text-white/35 text-xs">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 text-xs">
          <span>Scroll</span>
          <div className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/30 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ─── PORTALS ─── */}
      <section id="portals" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16">
          <div className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Four Portals, One Platform</div>
          <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-4">Choose Your Role</h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">Every stakeholder in the Naan Mudhalvan ecosystem has a dedicated, feature-rich experience.</p>
        </motion.div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon
            return (
              <motion.div key={portal.title} variants={item}>
                <Link to={portal.path}>
                  <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`relative p-8 rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden group cursor-pointer hover:${portal.glow} transition-all duration-500`}
                  >
                    {/* Gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-5 group-hover:opacity-12 transition-opacity duration-500`} />
                    {/* Corner glow */}
                    <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${portal.gradient} rounded-full opacity-15 blur-2xl group-hover:opacity-30 transition-opacity`} />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center shadow-xl`}>
                          <Icon size={22} className="text-white" />
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${portal.tagColor} backdrop-blur-sm`}>
                          {portal.tag}
                        </span>
                      </div>
                      <h3 className="font-outfit font-bold text-xl text-white mb-2">{portal.title}</h3>
                      <p className="text-white/45 text-sm leading-relaxed mb-6">{portal.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {portal.stats.map(s => (
                          <span key={s} className="text-xs text-white/50 bg-white/5 border border-white/8 rounded-full px-3 py-1">{s}</span>
                        ))}
                      </div>

                      <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${portal.gradient} bg-clip-text text-transparent group-hover:gap-3 transition-all`}>
                        Enter Portal <ArrowRight size={15} className="text-white/60" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">What Makes Us Different</div>
            <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-4">Smart Features for Every Learner</h2>
          </motion.div>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={item}
                  className="p-6 rounded-2xl bg-white/3 border border-white/8 hover:bg-white/5 hover:border-white/15 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-outfit font-bold text-white text-base mb-2">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── TESTIMONIALS SWIPER ─── */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-3">Student Success Stories</div>
          <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-4">From Campus to Career</h2>
        </motion.div>

        <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop className="max-w-2xl mx-auto pb-12">
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-white/4 border border-white/10 backdrop-blur-sm mx-2">
                <div className="flex items-center gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-white/70 text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center font-outfit font-bold text-white text-sm`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/40 text-xs">{t.role}</div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                    <CheckCircle size={12} /> NM Certified
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative p-12 rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-900/40 to-violet-900/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-violet-600/10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">🚀</div>
              <h2 className="font-outfit font-black text-4xl text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Join 4,218 students already earning NM credits and getting AI-powered job recommendations on NM MicroLearn.
              </p>
              <Link to="/student">
                <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(99,102,241,0.6)' }} whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-10 py-4 rounded-2xl text-base shadow-2xl shadow-indigo-500/40">
                  <Sparkles size={18} /> Enter Student Portal <ArrowRight size={18} />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6 text-center text-white/20 text-sm">
        <div className="font-outfit font-bold text-white/40 mb-1">NM MicroLearn</div>
        Naan Mudhalvan × TNSDC &bull; Tamil Nadu, India &bull; 2025–26
      </footer>
    </div>
  )
}
