import express from 'express'
import College from '../models/College.js'
import Student from '../models/Student.js'
import Certificate from '../models/Certificate.js'

const router = express.Router()

// GET /api/colleges
router.get('/', async (req, res) => {
  try {
    const { district, type, search, page = 1, limit = 20 } = req.query
    const filter = {}
    if (district) filter.district = district
    if (type) filter.type = type
    if (search) filter.name = { $regex: search, $options: 'i' }
    const colleges = await College.find(filter)
      .sort({ stateRank: 1, totalNMCreditsIssued: -1 })
      .skip((page - 1) * limit).limit(Number(limit))
    const total = await College.countDocuments(filter)
    res.json({ colleges, total })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/colleges/:id
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id)
    if (!college) return res.status(404).json({ error: 'College not found' })
    res.json({ college })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// PUT /api/colleges/:id
router.put('/:id', async (req, res) => {
  try {
    const college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ college })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// GET /api/colleges/:id/students  — students of a college
router.get('/:id/students', async (req, res) => {
  try {
    const { dept, level, page = 1, limit = 30 } = req.query
    const filter = { college: req.params.id }
    if (dept) filter.department = dept
    if (level) filter.nmLevel = level
    const students = await Student.find(filter)
      .populate('user', 'name email avatar')
      .sort({ nmCredits: -1 })
      .skip((page - 1) * limit).limit(Number(limit))
    const total = await Student.countDocuments(filter)
    res.json({ students, total })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/colleges/:id/credits  — pending NM credits to approve
router.get('/:id/credits', async (req, res) => {
  try {
    const { approved = 'false' } = req.query
    const certs = await Certificate.find({
      studentCollege: req.params.id,
      isTNSDCApproved: approved === 'true',
    }).sort({ issuedAt: -1 })
    res.json({ certificates: certs })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST /api/colleges/:id/credits/approve-all  — bulk approve
router.post('/:id/credits/approve-all', async (req, res) => {
  try {
    await Certificate.updateMany({ studentCollege: req.params.id, isTNSDCApproved: false }, { isTNSDCApproved: true })
    res.json({ message: 'All credits approved for TNSDC submission' })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/colleges/:id/analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const [college, totalStudents, pendingCredits] = await Promise.all([
      College.findById(req.params.id),
      Student.countDocuments({ college: req.params.id }),
      Certificate.countDocuments({ studentCollege: req.params.id, isTNSDCApproved: false }),
    ])
    const byDept = await Student.aggregate([
      { $match: { college: college._id } },
      { $group: { _id: '$department', count: { $sum: 1 }, totalCredits: { $sum: '$nmCredits' }, avgCompletion: { $avg: '$projectsCompleted' } } },
    ])
    res.json({ college, totalStudents, pendingCredits, byDepartment: byDept })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

export default router
