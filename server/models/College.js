import mongoose from 'mongoose'

const collegeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  shortName: { type: String },
  type: { type: String, enum: ['Government', 'Aided', 'Self-Financing', 'Autonomous', 'Deemed'], default: 'Self-Financing' },
  affiliatedTo: { type: String, default: 'Anna University' },

  // Location
  district: { type: String },
  city: { type: String },
  state: { type: String, default: 'Tamil Nadu' },
  pincode: { type: String },
  address: { type: String },

  // Contact
  principalName: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  website: { type: String },

  // TNSDC / NM Details
  tnsdcCode: { type: String, unique: true },
  isNMAffiliated: { type: Boolean, default: false },
  nmAffiliatedSince: { type: Date },
  naacGrade: { type: String, enum: ['A++', 'A+', 'A', 'B++', 'B+', 'B', 'C', 'Not Accredited'] },

  // Departments
  departments: [{ type: String }],

  // Stats
  totalStudentsEnrolled: { type: Number, default: 0 },
  totalNMCreditsIssued: { type: Number, default: 0 },
  totalProjectsCompleted: { type: Number, default: 0 },
  completionRate: { type: Number, default: 0 },
  stateRank: { type: Number },

  // Compliance
  lastComplianceSubmission: { type: Date },
  complianceStatus: { type: String, enum: ['compliant', 'pending', 'overdue'], default: 'pending' },
}, { timestamps: true })

export default mongoose.model('College', collegeSchema)
