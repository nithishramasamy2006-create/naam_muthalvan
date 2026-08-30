import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Company from '../models/Company.js'
import College from '../models/College.js'

const router = express.Router()

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, collegeName, department, semester } = req.body
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email already registered' })

    const user = await User.create({ name, email, password, role })

    // Create role-specific profile
    if (role === 'student') {
      await Student.create({ user: user._id, collegeName, department, semester })
    } else if (role === 'company') {
      await Company.create({ user: user._id, name })
    } else if (role === 'college') {
      await College.create({ user: user._id, name })
    }

    const token = signToken(user._id)
    res.status(201).json({ token, user: { id: user._id, name, email, role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })

    const token = signToken(user._id)
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/auth/me  (protected)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'No token provided' })
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user })
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
