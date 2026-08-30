import express from 'express'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Company from '../models/Company.js'
import College from '../models/College.js'
import Project from '../models/Project.js'
import Application from '../models/Application.js'
import Certificate from '../models/Certificate.js'
import Dispute from '../models/Dispute.js'

const router = express.Router()

// GET /api/admin/stats  — platform overview
router.get('/stats', async (req, res) => {
  try {
    const [totalStudents, totalCompanies, totalColleges, totalProjects, totalApps, totalCerts, openDisputes] = await Promise.all([
      Student.countDocuments(),
      Company.countDocuments(),
      College.countDocuments(),
      Project.countDocuments(),
      Application.countDocuments(),
      Certificate.countDocuments(),
      Dispute.countDocuments({ status: { $in: ['open', 'under_review'] } }),
    ])
    const pendingVerifications = await Company.countDocuments({ verificationStatus: { $in: ['pending', 'docs_pending', 'under_review'] } })
    const totalNMCredits = await Student.aggregate([{ $group: { _id: null, total: { $sum: '$nmCredits' } } }])
    res.json({
      totalStudents, totalCompanies, totalColleges, totalProjects,
      totalApplications: totalApps, totalCertificates: totalCerts,
      openDisputes, pendingVerifications,
      totalNMCredits: totalNMCredits[0]?.total || 0,
    })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/admin/analytics  — charts data
router.get('/analytics', async (req, res) => {
  try {
    const byDomain = await Project.aggregate([{ $group: { _id: '$domain', count: { $sum: 1 }, totalApps: { $sum: '$totalApplications' } } }])
    const byLevel = await Student.aggregate([{ $group: { _id: '$nmLevel', count: { $sum: 1 } } }])
    const certsByMonth = await Certificate.aggregate([
      { $group: { _id: { $month: '$issuedAt' }, count: { $sum: 1 } } },
      { $sort: { '_id': 1 } },
    ])
    res.json({ byDomain, byLevel, certsByMonth })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/admin/disputes
router.get('/disputes', async (req, res) => {
  try {
    const { status, priority } = req.query
    const filter = {}
    if (status) filter.status = status
    if (priority) filter.priority = priority
    const disputes = await Dispute.find(filter).sort({ createdAt: -1 })
    res.json({ disputes })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST /api/admin/disputes
router.post('/disputes', async (req, res) => {
  try {
    const dispute = await Dispute.create(req.body)
    res.status(201).json({ dispute })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// PATCH /api/admin/disputes/:id/resolve
router.patch('/disputes/:id/resolve', async (req, res) => {
  try {
    const { status, resolution, assignedTo } = req.body
    const dispute = await Dispute.findByIdAndUpdate(req.params.id,
      { status, resolution, assignedTo, resolvedAt: status === 'resolved' ? new Date() : null },
      { new: true })
    res.json({ dispute })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// GET /api/admin/users  — all users
router.get('/users', async (req, res) => {
  try {
    const { role, search, page = 1, limit = 30 } = req.query
    const filter = {}
    if (role) filter.role = role
    if (search) filter.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
    const users = await User.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    const total = await User.countDocuments(filter)
    res.json({ users, total })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// PATCH /api/admin/users/:id/status
router.patch('/users/:id/status', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true })
    res.json({ user })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
