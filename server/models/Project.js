import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  companyName: { type: String },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Project Details
  domain: {
    type: String,
    enum: ['Web Development', 'Data Science', 'Mobile Development', 'IoT', 'UI/UX Design', 'Cloud & DevOps', 'Cybersecurity', 'AI/ML', 'Blockchain', 'Other'],
    required: true,
  },
  requiredSkills: [{ type: String }],
  niceToHaveSkills: [{ type: String }],
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },

  // Logistics
  duration: { type: String }, // e.g. "4 weeks"
  durationDays: { type: Number },
  location: { type: String },
  mode: { type: String, enum: ['Remote', 'Onsite', 'Hybrid'], default: 'Remote' },
  openings: { type: Number, default: 1 },

  // Compensation
  stipendAmount: { type: Number, default: 0 },
  stipendCurrency: { type: String, default: 'INR' },
  isPaid: { type: Boolean, default: true },

  // NM Credits
  nmCreditsAwarded: { type: Number, default: 5 },

  // Dates
  applicationDeadline: { type: Date, required: true },
  projectStartDate: { type: Date },
  projectEndDate: { type: Date },

  // Status
  status: { type: String, enum: ['draft', 'open', 'closed', 'in_progress', 'completed'], default: 'open' },
  isVerified: { type: Boolean, default: false },

  // Stats (denormalized for performance)
  totalApplications: { type: Number, default: 0 },
  shortlistedCount: { type: Number, default: 0 },

  // Banner image
  image: { type: String, default: '' },
  tags: [{ type: String }],
}, { timestamps: true })

projectSchema.index({ domain: 1, status: 1 })
projectSchema.index({ requiredSkills: 1 })
projectSchema.index({ applicationDeadline: 1 })

export default mongoose.model('Project', projectSchema)
