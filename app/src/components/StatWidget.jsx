import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StatWidget({ value, label, change, icon: Icon, gradient, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm overflow-hidden cursor-default group"
    >
      {/* Gradient blob */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${gradient} opacity-10 group-hover:opacity-20 transition-opacity blur-xl`} />

      <div className="relative flex items-start justify-between">
        <div>
          <div className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">{label}</div>
          <motion.div
            className="font-outfit font-bold text-2xl text-slate-800"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            {value}
          </motion.div>
          {change && (
            <div className={`text-xs font-semibold mt-1 ${change.startsWith('+') || change.startsWith('↑') ? 'text-emerald-600' : 'text-rose-500'}`}>
              {change}
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${gradient} flex items-center justify-center shadow-md`}>
          {Icon && <Icon size={18} className="text-white" />}
        </div>
      </div>
    </motion.div>
  )
}
