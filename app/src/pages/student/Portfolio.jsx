import { motion } from 'framer-motion'
import Sidebar from '../../components/Sidebar'
import { User } from 'lucide-react'

export default function Portfolio() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#06030F]">
      <Sidebar student="student" />
      <main className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-[#06030F]/90 backdrop-blur-xl border-b border-white/5 px-8 py-5">
          <h1 className="font-outfit font-black text-xl text-white">My Portfolio</h1>
          <p className="text-white/35 text-sm">Auto-generated from completed projects</p>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="p-8 flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="font-outfit font-bold text-2xl text-white mb-2">My Portfolio</h2>
          <p className="text-white/40 text-sm max-w-md">Auto-generated from completed projects</p>
        </motion.div>
      </main>
    </div>
  )
}
