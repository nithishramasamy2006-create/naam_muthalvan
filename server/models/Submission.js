import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  studentName: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  projectTitle: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },

  // Submission files
  files: [{
    name: String,
    url: String,
    type: String, // 'pdf','zip','link','github'
    uploadedAt: { type: Date, default: Date.now },
  }],
  githubUrl: { type: String },
  demoUrl: { type: String },
  description: { type: String },

  // Mentor review
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'revision_requested', 'rejected'],
    default: 'submitted',
  },
  mentorFeedback: { type: String },
  mentorRating: { type: Number, min: 1, max: 5 },
  reviewedAt: { type: Date },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Revision tracking
  revisionNumber: { type: Number, default: 1 },
  revisionNote: { type: String },

  // Certificate trigger
  certificateIssued: { type: Boolean, default: false },
  certificateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Certificate' },
}, { timestamps: true })

export default mongoose.model('Submission', submissionSchema)
