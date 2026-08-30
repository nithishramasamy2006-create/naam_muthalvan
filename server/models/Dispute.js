import mongoose from 'mongoose'

const disputeSchema = new mongoose.Schema({
  disputeId: { type: String, unique: true }, // e.g. D-2026-007
  raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  raisedByName: { type: String },
  raisedByRole: { type: String, enum: ['student', 'company', 'college'] },

  against: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  againstName: { type: String },
  againstRole: { type: String },

  category: {
    type: String,
    enum: ['Payment Delay', 'Certificate Not Issued', 'Unfair Rejection', 'Mentor Misconduct', 'Project Mismatch', 'Other'],
    required: true,
  },
  description: { type: String, required: true },
  evidence: [{ name: String, url: String }],

  // Related records
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },

  // Resolution
  status: {
    type: String,
    enum: ['open', 'under_review', 'resolved', 'escalated', 'closed'],
    default: 'open',
  },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resolution: { type: String },
  resolvedAt: { type: Date },

  // Timeline
  timeline: [{
    action: String,
    note: String,
    by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    at: { type: Date, default: Date.now },
  }],
}, { timestamps: true })

disputeSchema.pre('save', async function(next) {
  if (!this.disputeId) {
    const count = await mongoose.model('Dispute').countDocuments()
    this.disputeId = `D-${new Date().getFullYear()}-${String(count + 1).padStart(3, '0')}`
  }
  next()
})

export default mongoose.model('Dispute', disputeSchema)
