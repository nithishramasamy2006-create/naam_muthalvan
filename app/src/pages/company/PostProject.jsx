import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'
import { Send, Plus, X, ChevronDown, Sparkles } from 'lucide-react'

const DOMAINS = ['Web Development', 'Data Science', 'Mobile Development', 'IoT', 'UI/UX Design', 'Cloud & DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain']
const MODES = ['Remote', 'Onsite', 'Hybrid']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

export default function PostProject() {
  const [form, setForm] = useState({
    title: '', description: '', domain: '', difficulty: 'Intermediate', mode: 'Remote',
    duration: '', openings: 1, stipendAmount: '', applicationDeadline: '',
    requiredSkills: [], niceToHaveSkills: [], nmCreditsAwarded: 6,
  })
  const [skillInput, setSkillInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const addSkill = () => {
    if (skillInput.trim()) {
      set('requiredSkills', [...form.requiredSkills, skillInput.trim()])
      setSkillInput('')
    }
  }
  const removeSkill = (i) => set('requiredSkills', form.requiredSkills.filter((_, idx) => idx !== i))

  if (submitted) return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
            <Sparkles size={36} className="text-white" />
          </div>
          <h2 className="font-outfit font-black text-3xl text-white mb-3">Project Posted!</h2>
          <p className="text-white/40 text-sm mb-6">Your project is now live. Students will receive AI-matched recommendations within minutes.</p>
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => setSubmitted(false)}
            className="text-sm font-bold px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
            Post Another Project
          </motion.button>
        </motion.div>
      </main>
      <AIChatbot />
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Post New Project</h1>
          <p className="text-white/35 text-sm">Projects are AI-matched to eligible students across 65 colleges in Tamil Nadu</p>
        </div>

        <div className="p-8 max-w-3xl mx-auto">
          <div className="flex flex-col gap-5">
            {/* Title */}
            <div>
              <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Project Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. React Analytics Dashboard with D3.js"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/20 focus:border-orange-500/40 transition-colors" />
            </div>

            {/* Description */}
            <div>
              <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Project Description *</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} placeholder="Describe the project goals, deliverables, and what students will learn…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/20 focus:border-orange-500/40 transition-colors resize-none" />
            </div>

            {/* Row: Domain + Difficulty + Mode */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Domain *', key: 'domain', options: DOMAINS },
                { label: 'Difficulty', key: 'difficulty', options: LEVELS },
                { label: 'Mode', key: 'mode', options: MODES },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">{f.label}</label>
                  <div className="relative">
                    <select value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none focus:border-orange-500/40 transition-colors">
                      <option value="" className="bg-[#0D0818]">Select…</option>
                      {f.options.map(o => <option key={o} value={o} className="bg-[#0D0818]">{o}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Row: Duration + Openings + Stipend */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Duration</label>
                <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="e.g. 4 weeks"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/20 focus:border-orange-500/40 transition-colors" />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Openings</label>
                <input type="number" value={form.openings} onChange={e => set('openings', Number(e.target.value))} min={1}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/40 transition-colors" />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Stipend (₹/month)</label>
                <input value={form.stipendAmount} onChange={e => set('stipendAmount', e.target.value)} placeholder="e.g. 8000"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-white/20 focus:border-orange-500/40 transition-colors" />
              </div>
            </div>

            {/* Row: Deadline + NM Credits */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Application Deadline *</label>
                <input type="date" value={form.applicationDeadline} onChange={e => set('applicationDeadline', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-orange-500/40 transition-colors" />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">NM Credits to Award</label>
                <div className="flex gap-2">
                  {[4, 6, 8, 10].map(c => (
                    <button key={c} onClick={() => set('nmCreditsAwarded', c)}
                      className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${form.nmCreditsAwarded === c ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg' : 'border-white/10 text-white/40 hover:border-white/20'}`}>
                      +{c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Required Skills */}
            <div>
              <label className="text-white/40 text-xs font-semibold uppercase tracking-wide block mb-2">Required Skills</label>
              <div className="flex gap-2 mb-2">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addSkill()}
                  placeholder="Type a skill and press Enter…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm outline-none placeholder-white/20 focus:border-orange-500/40 transition-colors" />
                <button onClick={addSkill} className="p-2.5 rounded-xl bg-white/8 border border-white/10 text-white/50 hover:text-white/80 transition-colors"><Plus size={16} /></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.requiredSkills.map((s, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs font-semibold text-white/70 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                    {s}
                    <button onClick={() => removeSkill(i)} className="text-white/30 hover:text-red-400 transition-colors"><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* Submit */}
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => form.title && form.domain && setSubmitted(true)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-outfit font-black text-base shadow-2xl shadow-orange-500/25 flex items-center justify-center gap-3">
              <Send size={20} /> Post Project to 65 Colleges
            </motion.button>
          </div>
        </div>
      </main>
      <AIChatbot />
    </div>
  )
}
