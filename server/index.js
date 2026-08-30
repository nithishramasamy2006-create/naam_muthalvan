import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

// Routes
import authRoutes from './routes/auth.js'
import studentRoutes from './routes/students.js'
import companyRoutes from './routes/companies.js'
import collegeRoutes from './routes/colleges.js'
import projectRoutes from './routes/projects.js'
import applicationRoutes from './routes/applications.js'
import certificateRoutes from './routes/certificates.js'
import eventRoutes from './routes/events.js'
import submissionRoutes from './routes/submissions.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nm_microlearn'

// ── Middleware ──
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())
app.use(morgan('dev'))

// ── Health check ──
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    platform: 'NM MicroLearn',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    timestamp: new Date().toISOString(),
  })
})

// ── API Routes ──
app.use('/api/auth', authRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/colleges', collegeRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/applications', applicationRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/submissions', submissionRoutes)
app.use('/api/admin', adminRoutes)

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.url} not found` })
})

// ── Error handler ──
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

// ── Connect DB & Start ──
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGO_URI)
    app.listen(PORT, () => {
      console.log(`🚀 NM MicroLearn API running on http://localhost:${PORT}`)
      console.log(`📚 Health: http://localhost:${PORT}/api/health`)
    })
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
