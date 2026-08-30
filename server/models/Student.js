import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rollNumber: { type: String, unique: true },
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  collegeName: { type: String },
  department: { type: String, enum: ['CSE', 'IT', 'ECE', 'EEE', 'MECH', 'CIVIL', 'AIDS', 'AIML', 'OTHER'] },
  semester: { type: Number, min: 1, max: 8 },
  year: { type: Number, min: 1, max: 4 },
  batch: { type: String }, // e.g. "2022-2026"

  // Skills & Profile
  skills: [{ type: String }],
  domain: { type: String },
  bio: { type: String },
  linkedIn: { type: String },
  github: { type: String },
  portfolioUrl: { type: String },

  // NM Metrics
  nmCredits: { type: Number, default: 0 },
  nmLevel: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'], default: 'Bronze' },
  xpPoints: { type: Number, default: 0 },
  rank: { type: Number },

  // Stats
  projectsCompleted: { type: Number, default: 0 },
  projectsInProgress: { type: Number, default: 0 },
  avgMentorRating: { type: Number, default: 0 },
  certificatesEarned: { type: Number, default: 0 },

  // Status
  isPlaced: { type: Boolean, default: false },
  placedCompany: { type: String },
}, { timestamps: true })

// Auto-update NM level based on credits
studentSchema.pre('save', function(next) {
  if (this.nmCredits >= 50) this.nmLevel = 'Platinum'
  else if (this.nmCredits >= 30) this.nmLevel = 'Gold'
  else if (this.nmCredits >= 15) this.nmLevel = 'Silver'
  else this.nmLevel = 'Bronze'
  next()
})

export default mongoose.model('Student', studentSchema)
