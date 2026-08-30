import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Hackathon', 'Bootcamp', 'Workshop', 'Career Fair', 'Competition', 'Seminar'], required: true },
  description: { type: String, required: true },
  organizer: { type: String, required: true },

  // Dates
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  registrationDeadline: { type: Date },

  // Location
  mode: { type: String, enum: ['Online', 'Offline', 'Hybrid'], default: 'Hybrid' },
  venue: { type: String },
  city: { type: String },
  state: { type: String, default: 'Tamil Nadu' },
  meetingLink: { type: String },

  // Capacity
  totalSeats: { type: Number, default: 100 },
  registeredCount: { type: Number, default: 0 },

  // Rewards
  prizeAmount: { type: Number, default: 0 },
  nmCreditsAwarded: { type: Number, default: 5 },
  certificateProvided: { type: Boolean, default: true },

  // Skills
  targetSkills: [{ type: String }],
  targetDomains: [{ type: String }],

  // Status
  status: { type: String, enum: ['upcoming', 'open', 'live', 'closed', 'completed'], default: 'upcoming' },
  isFeatured: { type: Boolean, default: false },
  image: { type: String },

  // Registrations
  registrations: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    registeredAt: { type: Date, default: Date.now },
    attended: { type: Boolean, default: false },
  }],
}, { timestamps: true })

export default mongoose.model('Event', eventSchema)
