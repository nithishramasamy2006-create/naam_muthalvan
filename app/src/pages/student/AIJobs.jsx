/**
 * AIJobs.jsx — Genuine AI-powered job recommendation page
 *
 * Two AI techniques used (honest description for your report/PPT):
 * 1. Cosine Similarity — ranks job roles against student skill tags (ML, not LLM)
 * 2. Google Gemini LLM — generates natural-language reasoning: WHY a role fits,
 *    what the skill gap is, and what to learn next (LLM-powered)
 */
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Sparkles, TrendingUp, Target, BookOpen, ArrowRight, Loader, Star, Zap, Brain, ChevronDown } from 'lucide-react'

// ── Student profile (would come from API in production) ──
const STUDENT = {
  name: 'Arjun Kumar',
  skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST API', 'Python', 'Figma', 'Node.js', 'Pandas', 'UI/UX', 'Prototyping', 'Responsive Design'],
  certificates: ['Mobile UI/UX Redesign', 'E-Commerce React Dashboard', 'Python Web Scraper Pipeline'],
  nmCredits: 24,
  experience: 'Fresher',
}

// ── Job roles with skill requirements ──
const JOB_ROLES = [
  {
    id: 1, title: 'Full Stack Developer', company: 'Zoho Corporation', location: 'Chennai', salary: '₹6–12 LPA',
    requiredSkills: ['React.js', 'Node.js', 'JavaScript', 'REST API', 'MongoDB', 'HTML5', 'CSS3'],
    img: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&q=70',
    color: 'from-blue-500 to-indigo-600', domain: 'Web Development', openings: 3,
  },
  {
    id: 2, title: 'UI/UX Designer', company: 'Freshworks', location: 'Chennai / Remote', salary: '₹5–9 LPA',
    requiredSkills: ['Figma', 'UI/UX', 'Prototyping', 'Responsive Design', 'User Research', 'HTML5'],
    img: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=400&q=70',
    color: 'from-pink-500 to-rose-600', domain: 'Design', openings: 2,
  },
  {
    id: 3, title: 'Frontend React Developer', company: 'PayU India', location: 'Bengaluru / Remote', salary: '₹5–10 LPA',
    requiredSkills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST API', 'TypeScript'],
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=70',
    color: 'from-cyan-500 to-teal-600', domain: 'Frontend', openings: 4,
  },
  {
    id: 4, title: 'Data Analyst', company: 'DataMinds Analytics', location: 'Coimbatore', salary: '₹4–8 LPA',
    requiredSkills: ['Python', 'Pandas', 'SQL', 'Data Visualization', 'Excel', 'REST API'],
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=70',
    color: 'from-violet-500 to-purple-600', domain: 'Data Science', openings: 2,
  },
  {
    id: 5, title: 'Product Designer', company: 'Hexaware Technologies', location: 'Chennai', salary: '₹6–11 LPA',
    requiredSkills: ['Figma', 'UI/UX', 'Prototyping', 'User Research', 'Design Systems', 'CSS3'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=70',
    color: 'from-amber-500 to-orange-600', domain: 'Design', openings: 1,
  },
  {
    id: 6, title: 'Backend Node.js Developer', company: 'HealthConnect Systems', location: 'Madurai', salary: '₹5–9 LPA',
    requiredSkills: ['Node.js', 'REST API', 'MongoDB', 'JavaScript', 'Docker', 'SQL'],
    img: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&q=70',
    color: 'from-emerald-500 to-teal-600', domain: 'Backend', openings: 2,
  },
]

// ── TECHNIQUE 1: Cosine Similarity for job-skill matching ──
// Converts skill lists to TF vectors and computes cosine similarity
function cosineSimilarity(studentSkills, jobSkills) {
  const allSkills = [...new Set([...studentSkills, ...jobSkills])].map(s => s.toLowerCase())
  const studentVec = allSkills.map(s => (studentSkills.map(x => x.toLowerCase()).includes(s) ? 1 : 0))
  const jobVec     = allSkills.map(s => (jobSkills.map(x => x.toLowerCase()).includes(s) ? 1 : 0))
  const dot    = studentVec.reduce((sum, v, i) => sum + v * jobVec[i], 0)
  const magS   = Math.sqrt(studentVec.reduce((s, v) => s + v * v, 0))
  const magJ   = Math.sqrt(jobVec.reduce((s, v) => s + v * v, 0))
  return magS && magJ ? dot / (magS * magJ) : 0
}

function rankJobs(student, jobs) {
  return jobs
    .map(job => {
      const score     = cosineSimilarity(student.skills, job.requiredSkills)
      const matched   = job.requiredSkills.filter(s => student.skills.map(x => x.toLowerCase()).includes(s.toLowerCase()))
      const missing   = job.requiredSkills.filter(s => !student.skills.map(x => x.toLowerCase()).includes(s.toLowerCase()))
      const matchPct  = Math.round(score * 100)
      return { ...job, matchScore: matchPct, matchedSkills: matched, missingSkills: missing }
    })
    .sort((a, b) => b.matchScore - a.matchScore)
}

// ── TECHNIQUE 2: Gemini LLM for reasoning ──
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

async function getJobReasoning(student, job) {
  const prompt = `You are a career counselor for Tamil Nadu students on the Naan Mudhalvan (NM) platform.

Student profile:
- Name: ${student.name}
- Skills: ${student.skills.join(', ')}
- Certificates: ${student.certificates.join(', ')}
- NM Credits: ${student.nmCredits} (Silver Level)

Job role: ${job.title} at ${job.company}
Required skills: ${job.requiredSkills.join(', ')}
Skill match score: ${job.matchScore}%
Student already has: ${job.matchedSkills.join(', ')}
Student is missing: ${job.missingSkills.join(', ')}

Write a short (3-4 sentences), encouraging career advice for this student about this role. Include:
1. Why this role fits them specifically
2. What their strongest matching skills are
3. One actionable step to close the top skill gap
Keep it personal, specific, and motivating. No bullet points.`

  const isKeySet = GEMINI_API_KEY && !GEMINI_API_KEY.includes('REPLACE')

  if (!isKeySet) {
    const gaps = job.missingSkills.slice(0, 2).join(' and ')
    return `Based on your ${job.matchScore}% skill match, ${job.title} at ${job.company} is ${job.matchScore > 75 ? 'an excellent' : 'a good'} fit for you. Your strong foundation in ${job.matchedSkills.slice(0, 3).join(', ')} makes you a competitive candidate. ${gaps ? `To maximize your chances, focus on building ${gaps} skills through an NM micro-project. ` : ''}Add your VITE_GEMINI_API_KEY in .env for real AI-powered reasoning!`
  }

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 200, temperature: 0.8 }
    })
  })
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'AI reasoning unavailable.'
}

// ── Match score ring ──
function MatchRing({ score }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'
  const strokeDash = (score / 100) * 100
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <motion.circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" pathLength="100"
          initial={{ strokeDasharray: '0 100' }}
          animate={{ strokeDasharray: `${strokeDash} 100` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-outfit font-black text-sm text-white">{score}%</span>
      </div>
    </div>
  )
}

export default function AIJobs() {
  const [rankedJobs, setRankedJobs] = useState([])
  const [reasoning, setReasoning] = useState({}) // { jobId: text }
  const [loadingReason, setLoadingReason] = useState({})
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    setRankedJobs(rankJobs(STUDENT, JOB_ROLES))
  }, [])

  const toggleExpand = async (job) => {
    if (expanded === job.id) { setExpanded(null); return }
    setExpanded(job.id)
    if (!reasoning[job.id]) {
      setLoadingReason(p => ({ ...p, [job.id]: true }))
      const text = await getJobReasoning(STUDENT, job)
      setReasoning(p => ({ ...p, [job.id]: text }))
      setLoadingReason(p => ({ ...p, [job.id]: false }))
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <div>
              <h1 className="font-outfit font-black text-2xl text-white">AI Job Recommendations</h1>
              <p className="text-white/35 text-sm">
                <span className="text-violet-400 font-semibold">Cosine similarity</span> ranking ·{' '}
                <span className="text-indigo-400 font-semibold">Gemini LLM</span> reasoning · Based on your 12 verified skills
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Technique explanation banner */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-violet-900/30 to-indigo-900/20 border border-violet-500/20 flex items-start gap-3">
            <Sparkles size={18} className="text-violet-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-violet-300 text-sm font-semibold">Genuine AI — Two techniques at work</p>
              <p className="text-violet-300/60 text-xs mt-0.5">
                <strong className="text-violet-400">① Cosine Similarity (ML):</strong> your skill vector vs each job's skill vector → match % &nbsp;|&nbsp;
                <strong className="text-indigo-400">② Gemini LLM:</strong> click "Get AI Reasoning" to get a personalised career explanation
              </p>
            </div>
          </motion.div>

          {/* Student skill snapshot */}
          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/8 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-outfit font-black text-white text-sm flex-shrink-0">AK</div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm mb-2">Your Skill Profile — Arjun Kumar</p>
              <div className="flex flex-wrap gap-1.5">
                {STUDENT.skills.map(s => (
                  <span key={s} className="text-[10px] font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">{s}</span>
                ))}
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-amber-400 font-black text-xl">{STUDENT.nmCredits}</p>
              <p className="text-white/30 text-[10px]">NM Credits · Silver</p>
            </div>
          </div>

          {/* Ranked Job Cards */}
          <div className="flex flex-col gap-4">
            {rankedJobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="rounded-3xl border border-white/8 bg-white/[0.025] overflow-hidden">
                {/* Main row */}
                <div className="flex items-center gap-4 p-5">
                  {/* Rank badge */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-outfit font-black text-sm flex-shrink-0 ${i === 0 ? 'bg-amber-400 text-black' : i === 1 ? 'bg-slate-300 text-black' : i === 2 ? 'bg-orange-600 text-white' : 'bg-white/8 text-white/40'}`}>
                    {i + 1}
                  </div>

                  {/* Job image */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={job.img} alt={job.title} className="w-full h-full object-cover" />
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${job.color}`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-outfit font-bold text-white text-base">{job.title}</h3>
                      {i === 0 && <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/25 px-2 py-0.5 rounded-full font-bold">Best Match</span>}
                    </div>
                    <p className="text-white/40 text-sm">{job.company} · {job.location}</p>
                    <div className="flex items-center gap-3 mt-1.5 text-xs">
                      <span className="text-emerald-400 font-semibold">{job.salary}</span>
                      <span className="text-white/25">·</span>
                      <span className="text-white/35">{job.openings} openings</span>
                      <span className="text-white/25">·</span>
                      <span className="text-indigo-400">{job.domain}</span>
                    </div>
                  </div>

                  {/* Match ring */}
                  <MatchRing score={job.matchScore} />

                  {/* Expand button */}
                  <motion.button whileHover={{ scale: 1.05 }} onClick={() => toggleExpand(job)}
                    className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/20 flex-shrink-0">
                    <Zap size={11} />
                    AI Reason
                    <ChevronDown size={11} className={`transition-transform ${expanded === job.id ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>

                {/* Skill match / gap row */}
                <div className="px-5 pb-3 flex gap-4">
                  <div className="flex-1">
                    <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">You have ({job.matchedSkills.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills.map(s => <span key={s} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">{s}</span>)}
                    </div>
                  </div>
                  {job.missingSkills.length > 0 && (
                    <div className="flex-1">
                      <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mb-1.5">You need ({job.missingSkills.length})</p>
                      <div className="flex flex-wrap gap-1">
                        {job.missingSkills.map(s => <span key={s} className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">{s}</span>)}
                      </div>
                    </div>
                  )}
                </div>

                {/* LLM Reasoning panel */}
                <AnimatePresence>
                  {expanded === job.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="border-t border-white/8 overflow-hidden">
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                            <Brain size={12} className="text-white" />
                          </div>
                          <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">Gemini AI Career Reasoning</p>
                        </div>
                        {loadingReason[job.id] ? (
                          <div className="flex items-center gap-2 text-white/40 text-sm">
                            <Loader size={14} className="animate-spin" />
                            <span>Gemini is analysing your profile…</span>
                          </div>
                        ) : (
                          <p className="text-white/70 text-sm leading-relaxed">{reasoning[job.id]}</p>
                        )}
                        <motion.button whileHover={{ scale: 1.03 }}
                          className="mt-4 flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg">
                          <ArrowRight size={12} /> Apply for this Role
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
