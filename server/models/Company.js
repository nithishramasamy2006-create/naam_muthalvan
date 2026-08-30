import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['Startup', 'SME', 'MNC', 'Enterprise', 'NGO'], default: 'SME' },
  industry: { type: String },
  description: { type: String },
  website: { type: String },
  logo: { type: String },

  // Contact
  contactPerson: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },

  // Location
  city: { type: String },
  state: { type: String, default: 'Tamil Nadu' },
  address: { type: String },

  // Verification
  verificationStatus: {
    type: String,
    enum: ['pending', 'docs_pending', 'under_review', 'verified', 'rejected', 'suspended'],
    default: 'pending',
  },
  verifiedAt: { type: Date },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rejectionReason: { type: String },

  // Documents
  gstNumber: { type: String },
  cinNumber: { type: String },
  msmeCertificate: { type: String },
  verificationDocuments: [{ name: String, url: String, uploadedAt: Date }],

  // Stats
  totalProjectsPosted: { type: Number, default: 0 },
  totalStudentsHired: { type: Number, default: 0 },
  totalCertificatesIssued: { type: Number, default: 0 },
  avgProjectRating: { type: Number, default: 0 },

  // Tier
  partnerTier: { type: String, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'], default: 'Bronze' },
  isNMPartner: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Company', companySchema)
