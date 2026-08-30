import express from 'express'
import Application from '../models/Application.js'
import Project from '../models/Project.js'

const router = express.Router()

// POST /api/applications  — student applies to a project
router.post('/', async (req, res) => {
  try {
    const { student, project, company, coverNote, portfolioUrl, aiMatchScore, matchedSkills, missingSkills } = req.body
    const existing = await Application.findOne({ student, project })
    if (existing) return res.status(400).json({ error: 'Already applied to this project' })

    const application = await Application.create({ student, project, company, coverNote, portfolioUrl, aiMatchScore, matchedSkills, missingSkills })

    // Increment totalApplications on project
    await Project.findByIdAndUpdate(project, { $inc: { totalApplications: 1 } })

    res.status(201).json({ application })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/applications/student/:studentId  — student's own applications
router.get('/student/:studentId', async (req, res) => {
  try {
    const applications = await Application.find({ student: req.params.studentId })
      .populate('project', 'title domain stipendAmount duration applicationDeadline image')
      .populate('company', 'name logo')
      .sort({ createdAt: -1 })
    res.json({ applications })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/applications/project/:projectId  — company sees applications for a project
router.get('/project/:projectId', async (req, res) => {
  try {
    const { status, sort = 'score' } = req.query
    const filter = { project: req.params.projectId }
    if (status) filter.status = status

    const applications = await Application.find(filter)
      .populate('student', 'user nmCredits skills avgMentorRating')
      .sort(sort === 'score' ? { aiMatchScore: -1 } : { createdAt: -1 })

    res.json({ applications })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/applications/company/:companyId  — all applications for a company
router.get('/company/:companyId', async (req, res) => {
  try {
    const { status } = req.query
    const filter = { company: req.params.companyId }
    if (status) filter.status = status
    const applications = await Application.find(filter)
      .populate('project', 'title domain')
      .sort({ aiMatchScore: -1 })
    res.json({ applications })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/applications/:id/status  — update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status, note, changedBy, mentorName, interviewDate } = req.body
    const application = await Application.findById(req.params.id)
    if (!application) return res.status(404).json({ error: 'Application not found' })

    application.status = status
    application.statusHistory.push({ status, note, changedBy })
    if (mentorName) application.mentorName = mentorName
    if (interviewDate) application.interviewDate = interviewDate

    if (status === 'shortlisted') {
      await Project.findByIdAndUpdate(application.project, { $inc: { shortlistedCount: 1 } })
    }

    await application.save()
    res.json({ application })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/applications/:id  — withdraw application
router.delete('/:id', async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: 'withdrawn' }, { new: true })
    res.json({ application: app })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
