import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import AIChatbot from '../components/AIChatbot'
import { ArrowRight, Sparkles, Award, TrendingUp, Users, Building2, GraduationCap, Shield, CheckCircle, Star, CalendarDays, Zap } from 'lucide-react'

/* ─── SPONSOR DATA ─── */
const SPONSORS = [
  { name: 'Zoho Corporation', logo: '🟦', tier: 'Platinum' },
  { name: 'Freshworks', logo: '🟧', tier: 'Platinum' },
  { name: 'Hexaware', logo: '🟩', tier: 'Gold' },
  { name: 'TCS', logo: '🔷', tier: 'Gold' },
  { name: 'Infosys', logo: '🔶', tier: 'Gold' },
  { name: 'PayU India', logo: '🟥', tier: 'Silver' },
  { name: 'DataMinds', logo: '🟪', tier: 'Silver' },
  { name: 'Cognizant', logo: '🔵', tier: 'Gold' },
  { name: 'HCL Tech', logo: '🟡', tier: 'Silver' },
  { name: 'Wipro', logo: '🔴', tier: 'Silver' },
  { name: 'QuickLog', logo: '🟢', tier: 'Bronze' },
  { name: 'TechBridge', logo: '🔘', tier: 'Bronze' },
]

const PORTALS = [
  {
    title: 'Student Portal',
    subtitle: 'Learn. Build. Get Hired.',
    desc: 'Browse real industry projects, earn Naan Mudhalvan credits, get AI-powered job matches, and build a portfolio that gets you hired.',
    icon: GraduationCap,
    gradient: 'from-indigo-500 via-violet-500 to-purple-600',
    glow: 'shadow-[0_8px_60px_rgba(99,102,241,0.35)]',
    path: '/student',
    tag: '✦ AI Job Match',
    tagColor: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
    stats: [['4,218', 'Students'], ['24', 'Avg Credits'], ['94%', 'Hired']],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
  },
  {
    title: 'Company Portal',
    subtitle: 'Post. Screen. Hire.',
    desc: 'Post micro-projects, screen talent using AI skill matching, issue QR-verified certificates, and mentor future industry leaders.',
    icon: Building2,
    gradient: 'from-orange-500 via-red-500 to-rose-600',
    glow: 'shadow-[0_8px_60px_rgba(234,88,12,0.35)]',
    path: '/company',
    tag: '✦ Smart Hiring',
    tagColor: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
    stats: [['120', 'Companies'], ['384', 'Projects'], ['8.2K', 'Applications']],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  },
  {
    title: 'College Portal',
    subtitle: 'Track. Approve. Report.',
    desc: 'Monitor student participation, approve NM credits with one click, and auto-generate TNSDC compliance reports.',
    icon: GraduationCap,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    glow: 'shadow-[0_8px_60px_rgba(5,150,105,0.35)]',
    path: '/college',
    tag: '✦ TNSDC Ready',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
    stats: [['65', 'Colleges'], ['1,240', 'Credits'], ['#3', 'State Rank']],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
  },
  {
    title: 'Admin Portal',
    subtitle: 'Govern. Verify. Resolve.',
    desc: 'Verify companies, manage skill taxonomy, resolve disputes, and monitor Tamil Nadu-wide leaderboards from one dashboard.',
    icon: Shield,
    gradient: 'from-purple-600 via-violet-600 to-indigo-600',
    glow: 'shadow-[0_8px_60px_rgba(124,58,237,0.35)]',
    path: '/admin',
    tag: '✦ Full Control',
    tagColor: 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    stats: [['State-wide', 'Coverage'], ['Dispute', 'Center'], ['Skill', 'Taxonomy']],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
  },
]

const TESTIMONIALS = [
  { name: 'Priya Nair', role: 'CSE, PSG Tech → Zoho (Placed)', text: 'The AI job match showed me exactly which skills I needed. I completed 2 more micro-projects, hit 87% match score, and got placed!', rating: 5, color: 'from-indigo-500 to-violet-500' },
  { name: 'Karthik Selvam', role: 'IT, Anna Univ → Freshworks', text: 'The Skill Gap radar was eye-opening. I could see which skills employers want vs what I had. The certificate-to-job pipeline is brilliant.', rating: 5, color: 'from-blue-500 to-cyan-500' },
  { name: 'Divya Mohan', role: 'ECE, NIT Trichy → Hexaware', text: 'From ECE background with zero web knowledge to Full Stack Developer in 6 months — all through NM MicroLearn projects!', rating: 5, color: 'from-pink-500 to-rose-500' },
  { name: 'Ramesh Vijay', role: 'IT, VIT → DataMinds', text: 'My college used the NM MicroLearn College Portal to track our credits automatically. The TNSDC reporting feature saved weeks of paperwork!', rating: 5, color: 'from-emerald-500 to-teal-500' },
]

const FEATURES = [
  { icon: Sparkles, title: 'AI Job Recommendations', desc: 'Weighted engine scores 8+ job roles against your certificates and suggests skill bridges in real time', color: 'from-violet-500 to-indigo-600' },
  { icon: Award, title: 'QR-Verified Certificates', desc: 'Every certificate is digitally signed, QR-scannable, and maps directly to Naan Mudhalvan credits', color: 'from-amber-500 to-orange-500' },
  { icon: TrendingUp, title: 'Skill Gap Radar', desc: 'Visual skill mapping vs industry benchmarks with personalized micro-project recommendations', color: 'from-emerald-500 to-teal-500' },
  { icon: CalendarDays, title: 'TN Skill Events', desc: 'Hackathons, bootcamps, and career fairs — register with one click and earn bonus NM credits', color: 'from-cyan-500 to-blue-500' },
  { icon: Users, title: 'Mentor Chat', desc: 'Real-time workspace with Kanban boards, file uploads, and instant AI + human mentor feedback', color: 'from-pink-500 to-rose-500' },
  { icon: Zap, title: 'Voice AI Assistant', desc: 'Ask about jobs, skills, events, or credits using voice commands — get instant real-time answers', color: 'from-yellow-500 to-amber-500' },
]

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } }

/* ─── Sponsor Marquee ─── */
function SponsorMarquee() {
  return (
    <div className="py-10 border-y border-white/[0.05] overflow-hidden bg-white/[0.01]">
      <p className="text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
        Trusted by 120+ Industry Partners
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,white_10%,white_90%,transparent_100%)]">
        {/* Two copies for seamless loop */}
        {[0, 1].map(key => (
          <motion.div key={key} className="flex items-center gap-10 flex-shrink-0 pr-10"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: key * -12.5 }}>
            {SPONSORS.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 flex-shrink-0">
                <span className="text-2xl">{s.logo}</span>
                <div>
                  <div className="text-white/55 text-sm font-semibold whitespace-nowrap font-outfit">{s.name}</div>
                  <div className={`text-[9px] font-bold uppercase tracking-wide
                    ${s.tier === 'Platinum' ? 'text-cyan-400' : s.tier === 'Gold' ? 'text-amber-400' : s.tier === 'Silver' ? 'text-slate-400' : 'text-white/25'}`}>
                    {s.tier} Partner
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function Landing() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -100])
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0.2])

  return (
    <div className="min-h-screen bg-[#06030F] text-white overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between border-b border-white/[0.05] bg-[#06030F]/85 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="15" height="15" viewBox="0 0 28 28" fill="none"><path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white"/></svg>
          </div>
          <div>
            <span className="font-outfit font-black text-white text-base leading-none">NM MicroLearn</span>
            <div className="text-white/25 text-[9px] font-medium leading-none">Naan Mudhalvan × TNSDC</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[13px] text-white/45">
          <a href="#portals" className="hover:text-white transition-colors">Portals</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <Link to="/student/events" className="hover:text-amber-400 transition-colors">TN Events 🔴</Link>
          <a href="#testimonials" className="hover:text-white transition-colors">Stories</a>
          <a href="#sponsors" className="hover:text-white transition-colors">Partners</a>
        </div>
        <Link to="/student">
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold px-5 py-2 rounded-xl shadow-lg shadow-indigo-500/30">
            <Sparkles size={14} /> Get Started Free
          </motion.button>
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=40"
            alt="" className="w-full h-full object-cover opacity-[0.04]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06030F] via-[#06030F]/60 to-[#06030F]" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-600/12 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-cyan-500/8 rounded-full blur-2xl" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
            🇮🇳 Naan Mudhalvan TNSDC Certified Platform · Tamil Nadu
          </motion.div>

          {/* H1 */}
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-outfit font-black text-5xl md:text-7xl leading-[1.05] mb-4 tracking-tight">
            <span className="text-white">Tamil Nadu's #1</span><br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              Micro-Project
            </span>{' '}
            <span className="text-white">Marketplace</span>
          </motion.h1>

          {/* H2 */}
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
            className="font-outfit font-semibold text-white/40 text-xl md:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Connect students to real industry projects · Earn NM credits · AI-powered job matching
          </motion.h2>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link to="/student">
              <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(99,102,241,0.55)' }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-2xl shadow-indigo-500/30 transition-shadow">
                Student Portal <ArrowRight size={18} />
              </motion.button>
            </Link>
            <Link to="/student/events">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 text-amber-300 font-bold px-8 py-4 rounded-2xl text-base hover:bg-amber-500/15 transition-colors">
                <CalendarDays size={18} /> TN Skill Events 🔴
              </motion.button>
            </Link>
            <a href="#portals">
              <motion.button whileHover={{ scale: 1.03 }}
                className="flex items-center gap-2 bg-white/4 border border-white/10 text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-white/8 transition-colors backdrop-blur-sm">
                All Portals
              </motion.button>
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-8">
            {[['4,218', 'Active Students'], ['120+', 'Partner Companies'], ['94%', 'Project Completion'], ['1,842', 'Certificates Issued'], ['65', 'Colleges TN'], ['₹1Cr+', 'Prize Money']].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-outfit font-black text-2xl text-white">{val}</div>
                <div className="text-white/30 text-xs">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/15 text-xs">
          <span>Scroll to explore</span>
          <div className="w-5 h-8 border border-white/12 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/25 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ── SPONSOR MARQUEE ── */}
      <div id="sponsors">
        <SponsorMarquee />
      </div>

      {/* ── PORTALS ── */}
      <section id="portals" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          {/* H2 */}
          <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-3 leading-tight">
            Four Portals,{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">One Platform</span>
          </h2>
          {/* H3 */}
          <h3 className="font-outfit text-white/35 text-lg">Each stakeholder gets a dedicated, feature-rich experience built for their exact workflow.</h3>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PORTALS.map((portal) => {
            const Icon = portal.icon
            return (
              <motion.div key={portal.title} variants={fadeUp}>
                <Link to={portal.path}>
                  <motion.div whileHover={{ y: -8, transition: { duration: 0.25 } }}
                    className={`relative rounded-3xl border border-white/[0.07] bg-white/[0.025] overflow-hidden group cursor-pointer hover:${portal.glow} transition-all duration-500`}>
                    {/* Banner image */}
                    <div className="relative h-40 overflow-hidden">
                      <img src={portal.image} alt={portal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-55" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0818]/50 to-[#0D0818]" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-15 group-hover:opacity-25 transition-opacity`} />
                    </div>

                    <div className="p-6 -mt-6 relative z-10">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${portal.gradient} flex items-center justify-center shadow-xl`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${portal.tagColor}`}>{portal.tag}</span>
                      </div>

                      {/* H3 title */}
                      <h3 className="font-outfit font-black text-xl text-white mb-0.5">{portal.title}</h3>
                      <p className={`text-xs font-semibold mb-2 bg-gradient-to-r ${portal.gradient} bg-clip-text text-transparent`}>{portal.subtitle}</p>
                      <p className="text-white/40 text-[13px] leading-relaxed mb-4">{portal.desc}</p>

                      <div className="flex gap-3 mb-5">
                        {portal.stats.map(([val, lbl]) => (
                          <div key={lbl} className="text-center bg-white/[0.04] border border-white/8 rounded-xl px-3 py-2">
                            <div className="font-outfit font-black text-white text-sm">{val}</div>
                            <div className="text-white/30 text-[9px]">{lbl}</div>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-semibold text-white/50 group-hover:text-white/80 transition-colors">
                        Enter Portal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-white/[0.015] border-y border-white/[0.05]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-3">Smart Features for Every Learner</h2>
            <h3 className="font-outfit text-white/35 text-lg">Built on the Naan Mudhalvan framework with AI-first design</h3>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.05] hover:border-white/15 transition-all duration-300 group">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  {/* H3 feature title */}
                  <h3 className="font-outfit font-bold text-white text-base mb-1.5">{f.title}</h3>
                  <p className="text-white/35 text-[13px] leading-relaxed">{f.desc}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="font-outfit font-black text-4xl md:text-5xl text-white mb-3">From Campus to Career</h2>
          <h3 className="font-outfit text-white/35 text-lg">Real students. Real companies. Real results.</h3>
        </motion.div>
        <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{ clickable: true }} loop className="max-w-2xl mx-auto pb-12">
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name}>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm mx-2">
                <div className="flex items-center gap-1 mb-5">
                  {Array(t.rating).fill(0).map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-white/65 text-base leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center font-outfit font-bold text-white text-sm`}>
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/35 text-xs">{t.role}</div>
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

      {/* ── CTA ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-900/35 to-violet-900/25">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            <div className="relative z-10">
              <div className="text-5xl mb-4">🚀</div>
              {/* H2 */}
              <h2 className="font-outfit font-black text-4xl text-white mb-3">Ready to Start Your Journey?</h2>
              {/* H3 */}
              <h3 className="font-outfit text-white/40 text-lg mb-8 max-w-xl mx-auto">Join 4,218 students already building real-world skills and getting placed through NM MicroLearn.</h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/student">
                  <motion.button whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(99,102,241,0.6)' }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold px-10 py-4 rounded-2xl text-base shadow-2xl">
                    <Sparkles size={18} /> Enter Student Portal <ArrowRight size={18} />
                  </motion.button>
                </Link>
                <Link to="/student/events">
                  <motion.button whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 border border-amber-500/25 text-amber-300 font-semibold px-8 py-4 rounded-2xl hover:bg-amber-500/10 transition-colors">
                    <CalendarDays size={18} /> View TN Events
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 28 28" fill="none"><path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white"/></svg>
            </div>
            <div className="text-white/50 text-sm font-outfit font-semibold">NM MicroLearn</div>
          </div>
          <div className="flex gap-6 text-white/20 text-xs">
            <span>Naan Mudhalvan × TNSDC</span>
            <span>Tamil Nadu, India</span>
            <span>2025–26</span>
          </div>
          <div className="flex gap-4">
            {['Student', 'Company', 'College', 'Admin'].map(p => (
              <Link key={p} to={`/${p.toLowerCase()}`}>
                <span className="text-white/25 text-xs hover:text-white/50 transition-colors">{p}</span>
              </Link>
            ))}
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  )
}
