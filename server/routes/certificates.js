import express from 'express'
import Certificate from '../models/Certificate.js'
import Student from '../models/Student.js'

const router = express.Router()

// GET /api/certificates/student/:studentId
router.get('/student/:studentId', async (req, res) => {
  try {
    const certs = await Certificate.find({ student: req.params.studentId }).sort({ issuedAt: -1 })
    res.json({ certificates: certs })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/certificates/company/:companyId  — certs issued by company
router.get('/company/:companyId', async (req, res) => {
  try {
    const certs = await Certificate.find({ company: req.params.companyId }).sort({ issuedAt: -1 })
    res.json({ certificates: certs })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /api/certificates/verify/:nmCertificateId  — public QR verify
router.get('/verify/:nmCertificateId', async (req, res) => {
  try {
    const cert = await Certificate.findOne({ nmCertificateId: req.params.nmCertificateId })
    if (!cert) return res.status(404).json({ valid: false, error: 'Certificate not found' })
    res.json({ valid: true, certificate: cert })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/certificates  — company issues a certificate
router.post('/', async (req, res) => {
  try {
    const cert = await Certificate.create(req.body)
    // Update student stats
    await Student.findByIdAndUpdate(req.body.student, {
      $inc: { certificatesEarned: 1, nmCredits: req.body.nmCreditsAwarded || 5 },
    })
    res.status(201).json({ certificate: cert })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET /api/certificates/college/:collegeId  — all certs for a college
router.get('/college/:collegeId', async (req, res) => {
  try {
    const { approved } = req.query
    const filter = { studentCollege: req.params.collegeId }
    if (approved === 'false') filter.isTNSDCApproved = false
    const certs = await Certificate.find(filter).sort({ issuedAt: -1 })
    res.json({ certificates: certs })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// PATCH /api/certificates/:id/approve  — college/admin approves for TNSDC
router.patch('/:id/approve', async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, { isTNSDCApproved: true }, { new: true })
    res.json({ certificate: cert })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
