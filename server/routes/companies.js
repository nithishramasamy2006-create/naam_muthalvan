import express from 'express'
import Company from '../models/Company.js'
import Submission from '../models/Submission.js'

const router = express.Router()

// GET /api/companies
router.get('/', async (req, res) => {
  try {
    const { status, type, search, page = 1, limit = 20 } = req.query
    const filter = {}
    if (status) filter.verificationStatus = status
    if (type) filter.type = type
    if (search) filter.name = { $regex: search, $options: 'i' }
    const companies = await Company.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit).limit(Number(limit))
    const total = await Company.countDocuments(filter)
    res.json({ companies, total })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/companies/:id
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('user', 'name email')
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json({ company })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// PUT /api/companies/:id
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ company })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PATCH /api/companies/:id/verify
router.patch('/:id/verify', async (req, res) => {
  try {
    const { status, rejectionReason, verifiedBy } = req.body
    const company = await Company.findByIdAndUpdate(req.params.id,
      { verificationStatus: status, rejectionReason, verifiedBy, verifiedAt: status === 'verified' ? new Date() : null },
      { new: true })
    res.json({ company })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// GET /api/companies/:id/analytics
router.get('/:id/analytics', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    res.json({
      totalProjects: company.totalProjectsPosted,
      totalHired: company.totalStudentsHired,
      totalCertificates: company.totalCertificatesIssued,
      avgRating: company.avgProjectRating,
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

export default router
