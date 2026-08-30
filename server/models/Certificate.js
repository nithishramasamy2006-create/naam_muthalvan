import mongoose from 'mongoose'

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String },
  studentCollege: { type: String },
  studentDepartment: { type: String },
  studentRollNumber: { type: String },

  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  projectTitle: { type: String },
  projectDomain: { type: String },
  projectDuration: { type: String },

  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  companyName: { type: String },
  companyLogo: { type: String },

  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorName: { type: String },
  mentorRating: { type: Number, min: 1, max: 5 },
  mentorFeedback: { type: String },

  // Skills validated
  skillsValidated: [{ type: String }],

  // NM Specific
  nmCreditsAwarded: { type: Number, default: 5 },
  nmCertificateId: { type: String, unique: true }, // e.g. NM-2026-CSE-00123
  qrCode: { type: String }, // QR code data URL or URL
  isNMVerified: { type: Boolean, default: true },
  isTNSDCApproved: { type: Boolean, default: false },

  // Status
  status: { type: String, enum: ['issued', 'revoked', 'expired'], default: 'issued' },
  issuedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },

  // Blockchain hash for tamper proof (future)
  blockchainHash: { type: String },
}, { timestamps: true })

// Auto-generate NM Certificate ID
certificateSchema.pre('save', async function(next) {
  if (!this.nmCertificateId) {
    const count = await mongoose.model('Certificate').countDocuments()
    const year = new Date().getFullYear()
    const dept = (this.studentDepartment || 'GEN').substring(0, 3).toUpperCase()
    this.nmCertificateId = `NM-${year}-${dept}-${String(count + 1).padStart(5, '0')}`
  }
  next()
})

export default mongoose.model('Certificate', certificateSchema)
