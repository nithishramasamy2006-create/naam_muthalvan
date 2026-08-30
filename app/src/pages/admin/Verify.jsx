import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Company Verification</h1>
          <p className="text-white/35 text-sm">5 companies pending verification review</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="p-8 flex flex-col items-center justify-center min-h-[70vh] text-center">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="font-outfit font-bold text-3xl text-white mb-3">Company Verification</h2>
          <p className="text-white/35 text-sm max-w-md leading-relaxed mb-8">5 companies pending verification review</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['View Data', 'Export Report', 'Filter'].map(btn => (
              <motion.button key={btn} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-sm font-semibold shadow-lg">
                {btn}
              </motion.button>
            ))}
          </div>
          <p className="text-white/15 text-xs mt-8">Full data visualization coming in next build</p>
        </motion.div>
      </main>
      <AIChatbot />
    </div>
  )
}
