import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import AIChatbot from '../../components/AIChatbot'

export default function Page() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar portal="company" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-2xl text-white">Issue Certificates</h1>
          <p className="text-white/35 text-sm">QR-verified NM certificates for completed project students</p>
        </div>
        <div className="relative h-56 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80" alt="Issue Certificates" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#06030F]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="text-center">
              <h2 className="font-outfit font-black text-4xl text-white mb-2">Issue Certificates</h2>
              <p className="text-white/40 text-sm">QR-verified NM certificates for completed project students</p>
            </motion.div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {['View Data', 'Export', 'Filter', 'Search', 'Add New', 'Reports'].map((btn, i) => (
              <motion.button key={btn} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 + 0.3 }}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/8 text-white/50 text-sm font-semibold hover:bg-white/[0.06] hover:border-white/15 hover:text-white/80 transition-all text-left">
                {btn} →
              </motion.button>
            ))}
          </div>
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mx-auto mb-4 flex items-center justify-center opacity-40">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 2L26 8V20L14 26L2 20V8L14 2Z" fill="white"/></svg>
            </div>
            <p className="text-white/25 text-sm">Full data visualization loaded from backend in production</p>
          </div>
        </motion.div>
      </main>
      <AIChatbot />
    </div>
  )
}
