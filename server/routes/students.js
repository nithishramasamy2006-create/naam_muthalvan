import express from 'express'
import Student from '../models/Student.js'

const router = express.Router()

// GET /api/students  — paginated list with filters
router.get('/', async (req, res) => {
  try {
    const { college, dept, level, search, page = 1, limit = 20, sort = 'credits' } = req.query
    const filter = {}
    if (college) filter.college = college
    if (dept) filter.department = dept
    if (level) filter.nmLevel = level
    if (search) filter.$or = [
      { 'user.name': { $regex: search, $options: 'i' } },
      { skills: { $in: [new RegExp(search, 'i')] } },
    ]
    const sortMap = { credits: { nmCredits: -1 }, rating: { avgMentorRating: -1 }, projects: { projectsCompleted: -1 } }
    const students = await Student.find(filter)
      .populate('user', 'name email avatar')
      .populate('college', 'name shortName')
      .sort(sortMap[sort] || { nmCredits: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
    const total = await Student.countDocuments(filter)
    res.json({ students, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/students/:id
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('user', 'name email avatar phone')
      .populate('college', 'name district')
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json({ student })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PUT /api/students/:id
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json({ student })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/students/leaderboard  — top students by NM credits
router.get('/leaderboard/top', async (req, res) => {
  try {
    const { college, dept, limit = 50 } = req.query
    const filter = {}
    if (college) filter.college = college
    if (dept) filter.department = dept
    const students = await Student.find(filter)
      .populate('user', 'name avatar')
      .populate('college', 'name shortName')
      .sort({ nmCredits: -1, avgMentorRating: -1 })
      .limit(Number(limit))
    res.json({ leaderboard: students.map((s, i) => ({ ...s.toObject(), rank: i + 1 })) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/students/user/:userId  — find student by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.params.userId })
      .populate('user', 'name email avatar')
      .populate('college', 'name district')
    if (!student) return res.status(404).json({ error: 'Student not found' })
    res.json({ student })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
