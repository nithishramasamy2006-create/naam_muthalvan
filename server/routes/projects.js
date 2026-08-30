import express from 'express'
import Project from '../models/Project.js'
import Application from '../models/Application.js'

const router = express.Router()

// GET /api/projects  — list all open projects with filters
router.get('/', async (req, res) => {
  try {
    const { domain, difficulty, mode, search, sort = 'newest', page = 1, limit = 12 } = req.query
    const filter = { status: 'open' }
    if (domain) filter.domain = domain
    if (difficulty) filter.difficulty = difficulty
    if (mode) filter.mode = mode
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { companyName: { $regex: search, $options: 'i' } },
      { requiredSkills: { $in: [new RegExp(search, 'i')] } },
    ]

    const sortMap = {
      newest: { createdAt: -1 },
      deadline: { applicationDeadline: 1 },
      stipend: { stipendAmount: -1 },
      popular: { totalApplications: -1 },
    }

    const [projects, total] = await Promise.all([
      Project.find(filter).sort(sortMap[sort] || { createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit)),
      Project.countDocuments(filter),
    ])

    res.json({ projects, total, page: Number(page), pages: Math.ceil(total / limit) })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('company')
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/projects  — company creates a project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ project })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT /api/projects/:id
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/projects/company/:companyId  — company's own projects
router.get('/company/:companyId', async (req, res) => {
  try {
    const projects = await Project.find({ company: req.params.companyId }).sort({ createdAt: -1 })
    res.json({ projects })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
