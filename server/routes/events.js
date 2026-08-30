import express from 'express'
import Event from '../models/Event.js'

const router = express.Router()

// GET /api/events
router.get('/', async (req, res) => {
  try {
    const { category, mode, status, search } = req.query
    const filter = {}
    if (category) filter.category = category
    if (mode) filter.mode = mode
    if (status) filter.status = status
    if (search) filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { organizer: { $regex: search, $options: 'i' } },
      { targetSkills: { $in: [new RegExp(search, 'i')] } },
    ]
    const events = await Event.find(filter).sort({ startDate: 1 })
    res.json({ events })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json({ event })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// POST /api/events  — admin creates event
router.post('/', async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json({ event })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

// POST /api/events/:id/register  — student registers
router.post('/:id/register', async (req, res) => {
  try {
    const { studentId } = req.body
    const event = await Event.findById(req.params.id)
    if (!event) return res.status(404).json({ error: 'Event not found' })
    if (event.registeredCount >= event.totalSeats)
      return res.status(400).json({ error: 'Event is full' })
    const alreadyReg = event.registrations.some(r => r.student?.toString() === studentId)
    if (alreadyReg) return res.status(400).json({ error: 'Already registered' })
    event.registrations.push({ student: studentId })
    event.registeredCount += 1
    await event.save()
    res.json({ message: 'Registered successfully', event })
  } catch (err) { res.status(400).json({ error: err.message }) }
})

export default router
