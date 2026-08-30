import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  projectTitle: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  companyName: { type: String },

  // Application content
  coverNote: { type: String },
  resumeUrl: { type: String },
  portfolioUrl: { type: String },

  // AI Match Score
  aiMatchScore: { type: Number, min: 0, max: 100, default: 0 },
  matchedSkills: [{ type: String }],
  missingSkills: [{ type: String }],

  // Status flow: pending → shortlisted → accepted / rejected
  status: {
    type: String,
    enum: ['pending', 'shortlisted', 'accepted', 'rejected', 'withdrawn'],
    default: 'pending',
  },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    note: String,
  }],

  // Mentor assigned after acceptance
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mentorName: { type: String },

  // Interview
  interviewDate: { type: Date },
  interviewLink: { type: String },
  interviewNotes: { type: String },

  // Feedback from company (after rejection)
  rejectionFeedback: { type: String },
}, { timestamps: true })

applicationSchema.index({ student: 1, project: 1 }, { unique: true })
applicationSchema.index({ company: 1, status: 1 })

export default mongoose.model('Application', applicationSchema)
