import express from 'express'
import Submission from '../models/Submission.js'
import Certificate from '../models/Certificate.js'

const router = express.Router()

// POST /api/submissions  — student submits work
router.post('/', async (req, res) => {
  try {
    const submission = await Submission.create(req.body)
    res.status(201).json({ submission })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// GET /api/submissions/student/:studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.params.studentId })
      .populate('project', 'title domain').sort({ createdAt: -1 })
    res.json({ submissions })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/submissions/company/:companyId  — all submissions for review
router.get('/company/:companyId', async (req, res) => {
  try {
    const { status } = req.query
    const filter = { company: req.params.companyId }
    if (status) filter.status = status
    const submissions = await Submission.find(filter)
      .populate('project', 'title domain nmCreditsAwarded').sort({ createdAt: -1 })
    res.json({ submissions })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// PATCH /api/submissions/:id/review  — mentor reviews submission
router.patch('/:id/review', async (req, res) => {
  try {
    const { status, mentorFeedback, mentorRating, reviewedBy } = req.body
    const submission = await Submission.findByIdAndUpdate(req.params.id,
      { status, mentorFeedback, mentorRating, reviewedBy, reviewedAt: new Date() },
      { new: true })
    res.json({ submission })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
