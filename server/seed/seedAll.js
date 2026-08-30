import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Student from '../models/Student.js'
import Company from '../models/Company.js'
import College from '../models/College.js'
import Project from '../models/Project.js'
import Application from '../models/Application.js'
import Certificate from '../models/Certificate.js'
import Event from '../models/Event.js'
import Dispute from '../models/Dispute.js'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/nm_microlearn'

async function seedAll() {
  await mongoose.connect(MONGO_URI)
  console.log('✅ Connected to MongoDB')

  // Clear all collections
  await Promise.all([User, Student, Company, College, Project, Application, Certificate, Event, Dispute].map(m => m.deleteMany({})))
  console.log('🗑️  Cleared all collections')

  // ── ADMIN USER ──
  const adminUser = await User.create({ name: 'Super Admin', email: 'admin@nmmicrolearn.in', password: 'Admin@2026', role: 'admin', isVerified: true })

  // ── COLLEGES ──
  const collegeData = [
    { name: 'PSG College of Technology', shortName: 'PSG Tech', district: 'Coimbatore', type: 'Autonomous', naacGrade: 'A+', departments: ['CSE','IT','ECE','MECH','CIVIL'], stateRank: 1, totalStudentsEnrolled: 842, totalNMCreditsIssued: 4218, completionRate: 94, tnsdcCode: 'TNSDC-001' },
    { name: 'Anna University', shortName: 'AU Chennai', district: 'Chennai', type: 'Government', naacGrade: 'A++', departments: ['CSE','IT','ECE','MECH'], stateRank: 2, totalStudentsEnrolled: 760, totalNMCreditsIssued: 3820, completionRate: 90, tnsdcCode: 'TNSDC-002' },
    { name: 'NIT Trichy', shortName: 'NIT-T', district: 'Trichy', type: 'Autonomous', naacGrade: 'A++', departments: ['CSE','ECE','MECH','CIVIL'], stateRank: 3, totalStudentsEnrolled: 680, totalNMCreditsIssued: 3200, completionRate: 85, tnsdcCode: 'TNSDC-003' },
    { name: 'VIT Vellore', shortName: 'VIT', district: 'Vellore', type: 'Deemed', naacGrade: 'A++', departments: ['CSE','IT','ECE'], stateRank: 4, totalStudentsEnrolled: 620, totalNMCreditsIssued: 2980, completionRate: 83, tnsdcCode: 'TNSDC-004' },
    { name: 'Amrita, Coimbatore', shortName: 'Amrita', district: 'Coimbatore', type: 'Deemed', naacGrade: 'A+', departments: ['CSE','ECE','IT'], stateRank: 5, totalStudentsEnrolled: 540, totalNMCreditsIssued: 2640, completionRate: 80, tnsdcCode: 'TNSDC-005' },
  ]
  const collegeUsers = await User.insertMany(collegeData.map(c => ({ name: c.name + ' Admin', email: `admin@${c.shortName.toLowerCase().replace(' ', '')}.edu`, password: 'College@2026', role: 'college', isVerified: true })))
  const colleges = await College.insertMany(collegeData.map((c, i) => ({ ...c, user: collegeUsers[i]._id, isNMAffiliated: true, complianceStatus: 'compliant' })))

  // ── COMPANIES ──
  const companyData = [
    { name: 'Zoho Corporation', type: 'MNC', industry: 'SaaS / Technology', city: 'Chennai', verificationStatus: 'verified', partnerTier: 'Platinum', totalProjectsPosted: 18, totalStudentsHired: 42, avgProjectRating: 4.8 },
    { name: 'Freshworks', type: 'MNC', industry: 'CRM / SaaS', city: 'Chennai', verificationStatus: 'verified', partnerTier: 'Platinum', totalProjectsPosted: 14, totalStudentsHired: 35, avgProjectRating: 4.9 },
    { name: 'Hexaware Technologies', type: 'Enterprise', industry: 'IT Services', city: 'Chennai', verificationStatus: 'verified', partnerTier: 'Gold', totalProjectsPosted: 10, totalStudentsHired: 28, avgProjectRating: 4.7 },
    { name: 'PayU India', type: 'Enterprise', industry: 'Fintech', city: 'Bengaluru', verificationStatus: 'verified', partnerTier: 'Gold', totalProjectsPosted: 8, totalStudentsHired: 20, avgProjectRating: 4.8 },
    { name: 'DataMinds Analytics', type: 'SME', industry: 'Data Science', city: 'Coimbatore', verificationStatus: 'verified', partnerTier: 'Silver', totalProjectsPosted: 6, totalStudentsHired: 12, avgProjectRating: 4.6 },
    { name: 'TechBridge Solutions', type: 'Startup', industry: 'EdTech', city: 'Chennai', verificationStatus: 'pending', partnerTier: 'Bronze', totalProjectsPosted: 3, totalStudentsHired: 0, avgProjectRating: 0 },
    { name: 'HealthConnect Systems', type: 'Enterprise', industry: 'HealthTech', city: 'Madurai', verificationStatus: 'docs_pending', partnerTier: 'Bronze', totalProjectsPosted: 0, totalStudentsHired: 0, avgProjectRating: 0 },
    { name: 'AgriSmart India', type: 'Startup', industry: 'AgriTech', city: 'Salem', verificationStatus: 'pending', partnerTier: 'Bronze', totalProjectsPosted: 2, totalStudentsHired: 0, avgProjectRating: 0 },
  ]
  const companyUsers = await User.insertMany(companyData.map(c => ({ name: c.name, email: `hr@${c.name.toLowerCase().replace(/\s/g, '')}.com`, password: 'Company@2026', role: 'company', isVerified: true })))
  const companies = await Company.insertMany(companyData.map((c, i) => ({ ...c, user: companyUsers[i]._id, isNMPartner: c.verificationStatus === 'verified' })))

  // ── PROJECTS ──
  const projects = await Project.insertMany([
    { title: 'Analytics Dashboard — React & D3.js', description: 'Build an interactive analytics dashboard using React and D3.js with real-time data from MongoDB.', company: companies[0]._id, companyName: 'Zoho Corporation', domain: 'Web Development', requiredSkills: ['React.js', 'D3.js', 'MongoDB', 'REST API'], difficulty: 'Intermediate', duration: '4 weeks', durationDays: 28, location: 'Chennai', mode: 'Hybrid', openings: 2, stipendAmount: 8000, nmCreditsAwarded: 8, applicationDeadline: new Date('2026-09-15'), status: 'open', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=75', totalApplications: 42, shortlistedCount: 3 },
    { title: 'AI Chatbot Integration — Python NLP', description: 'Develop an intelligent customer-support chatbot using Python NLP libraries and FastAPI backend.', company: companies[1]._id, companyName: 'Freshworks', domain: 'Data Science', requiredSkills: ['Python', 'NLP', 'FastAPI', 'React.js'], difficulty: 'Advanced', duration: '3 weeks', durationDays: 21, location: 'Chennai', mode: 'Remote', openings: 3, stipendAmount: 6500, nmCreditsAwarded: 6, applicationDeadline: new Date('2026-09-20'), status: 'open', image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75', totalApplications: 28, shortlistedCount: 5 },
    { title: 'IoT Smart Campus Dashboard', description: 'Create an IoT-based monitoring system for smart campus using Arduino/NodeMCU and React dashboard.', company: companies[2]._id, companyName: 'Hexaware Technologies', domain: 'IoT', requiredSkills: ['Arduino', 'Node.js', 'MQTT', 'React.js'], difficulty: 'Intermediate', duration: '5 weeks', durationDays: 35, location: 'Coimbatore', mode: 'Onsite', openings: 1, stipendAmount: 7000, nmCreditsAwarded: 8, applicationDeadline: new Date('2026-10-01'), status: 'open', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=75', totalApplications: 15, shortlistedCount: 2 },
    { title: 'Mobile UI/UX Redesign — Figma', description: 'Redesign the PayU mobile app UI/UX using Figma following Material Design 3 guidelines.', company: companies[3]._id, companyName: 'PayU India', domain: 'UI/UX Design', requiredSkills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'], difficulty: 'Beginner', duration: '3 weeks', durationDays: 21, location: 'Remote', mode: 'Remote', openings: 2, stipendAmount: 5500, nmCreditsAwarded: 4, applicationDeadline: new Date('2026-09-25'), status: 'open', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=75', totalApplications: 56, shortlistedCount: 4 },
    { title: 'ML Sentiment Analysis Pipeline', description: 'Build a complete NLP sentiment analysis pipeline using TensorFlow and deploy on cloud.', company: companies[4]._id, companyName: 'DataMinds Analytics', domain: 'Data Science', requiredSkills: ['Python', 'TensorFlow', 'Pandas', 'NLP'], difficulty: 'Advanced', duration: '4 weeks', durationDays: 28, location: 'Remote', mode: 'Remote', openings: 1, stipendAmount: 7500, nmCreditsAwarded: 8, applicationDeadline: new Date('2026-10-08'), status: 'open', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=75', totalApplications: 33, shortlistedCount: 2 },
  ])

  // ── STUDENTS ──
  const studentData = [
    { name: 'Arjun Kumar', email: 'arjun@psgtech.edu', collegeName: 'PSG College of Technology', dept: 'CSE', sem: 7, skills: ['React.js','JavaScript','HTML5','CSS3','REST API','Python','Figma','Node.js','Pandas'], nmCredits: 24, level: 'Silver', completed: 3, rating: 4.85, xp: 2400 },
    { name: 'Priya Nair', email: 'priya@annauniv.edu', collegeName: 'Anna University', dept: 'IT', sem: 6, skills: ['React.js','JavaScript','REST API','Figma','UI/UX'], nmCredits: 18, level: 'Silver', completed: 2, rating: 4.9, xp: 1800 },
    { name: 'Karthik Selvam', email: 'karthik@vit.ac.in', collegeName: 'VIT Vellore', dept: 'CSE', sem: 7, skills: ['Python','NLP','TensorFlow','FastAPI','Pandas'], nmCredits: 20, level: 'Silver', completed: 2, rating: 4.7, xp: 2000 },
    { name: 'Divya Mohan', email: 'divya@nit.ac.in', collegeName: 'NIT Trichy', dept: 'ECE', sem: 7, skills: ['Python','TensorFlow','NLP','C++'], nmCredits: 16, level: 'Silver', completed: 2, rating: 4.6, xp: 1600 },
    { name: 'Ramesh Vijay', email: 'ramesh@amrita.edu', collegeName: 'Amrita, Coimbatore', dept: 'CSE', sem: 8, skills: ['Arduino','Node.js','MQTT','React.js','Raspberry Pi'], nmCredits: 28, level: 'Silver', completed: 4, rating: 4.9, xp: 2800 },
    { name: 'Meera Krishnan', email: 'meera@srm.edu', collegeName: 'SRM Institute', dept: 'IT', sem: 6, skills: ['React.js','JavaScript','HTML5'], nmCredits: 12, level: 'Bronze', completed: 1, rating: 4.3, xp: 1200 },
  ]
  const studentUsers = await User.insertMany(studentData.map(s => ({ name: s.name, email: s.email, password: 'Student@2026', role: 'student', isVerified: true })))
  const students = await Student.insertMany(studentData.map((s, i) => ({
    user: studentUsers[i]._id, collegeName: s.collegeName, college: colleges[i % colleges.length]._id,
    department: s.dept, semester: s.sem, skills: s.skills, nmCredits: s.nmCredits, nmLevel: s.level,
    projectsCompleted: s.completed, avgMentorRating: s.rating, xpPoints: s.xp,
  })))

  // ── CERTIFICATES ──
  await Certificate.insertMany([
    { student: students[0]._id, studentName: 'Arjun Kumar', studentCollege: 'PSG College of Technology', studentDepartment: 'CSE', project: projects[3]._id, projectTitle: 'Mobile UI/UX Redesign — Figma', projectDomain: 'UI/UX Design', projectDuration: '3 weeks', company: companies[3]._id, companyName: 'PayU India', mentorName: 'Rahul Sharma', mentorRating: 5.0, skillsValidated: ['Figma','UI/UX','Prototyping'], nmCreditsAwarded: 4, isNMVerified: true, isTNSDCApproved: true, issuedAt: new Date('2026-08-20') },
    { student: students[0]._id, studentName: 'Arjun Kumar', studentCollege: 'PSG College of Technology', studentDepartment: 'CSE', project: projects[0]._id, projectTitle: 'E-Commerce React Dashboard', projectDomain: 'Web Development', projectDuration: '4 weeks', company: companies[0]._id, companyName: 'Zoho Corporation', mentorName: 'Kavitha Rajan', mentorRating: 4.9, skillsValidated: ['React.js','JavaScript','REST API'], nmCreditsAwarded: 8, isNMVerified: true, isTNSDCApproved: true, issuedAt: new Date('2026-08-10') },
    { student: students[0]._id, studentName: 'Arjun Kumar', studentCollege: 'PSG College of Technology', studentDepartment: 'CSE', project: projects[4]._id, projectTitle: 'Python Web Scraper Pipeline', projectDomain: 'Data Science', projectDuration: '4 weeks', company: companies[4]._id, companyName: 'DataMinds Analytics', mentorName: 'Dr. Anand Kumar', mentorRating: 4.8, skillsValidated: ['Python','Pandas'], nmCreditsAwarded: 5, isNMVerified: true, isTNSDCApproved: false, issuedAt: new Date('2026-07-30') },
  ])

  // ── EVENTS ──
  await Event.insertMany([
    { title: 'AI & Machine Learning Bootcamp', category: 'Bootcamp', description: 'Intensive one-day bootcamp on practical AI/ML with hands-on projects.', organizer: 'TNSDC × NASSCOM', startDate: new Date('2026-09-05'), registrationDeadline: new Date('2026-09-03'), mode: 'Offline', venue: 'Anna University', city: 'Chennai', totalSeats: 150, registeredCount: 132, nmCreditsAwarded: 8, status: 'live', isFeatured: true, image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=75', targetSkills: ['Python','TensorFlow','Scikit-learn'] },
    { title: 'Full Stack Hackathon — TN Edition', category: 'Hackathon', description: 'Build a full-stack solution in 24 hours for real industry problems.', organizer: 'NM MicroLearn × PSG Tech', startDate: new Date('2026-09-12'), endDate: new Date('2026-09-13'), registrationDeadline: new Date('2026-09-08'), mode: 'Hybrid', venue: 'PSG Tech', city: 'Coimbatore', totalSeats: 200, registeredCount: 156, prizeAmount: 50000, nmCreditsAwarded: 10, status: 'open', isFeatured: true, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=75', targetSkills: ['React.js','Node.js','MongoDB'] },
    { title: 'TNSDC Career Fair 2026', category: 'Career Fair', description: '500+ companies hiring from 65 colleges across Tamil Nadu.', organizer: 'TNSDC × Govt. of Tamil Nadu', startDate: new Date('2026-09-18'), registrationDeadline: new Date('2026-09-15'), mode: 'Offline', venue: 'Chennai Trade Centre', city: 'Chennai', totalSeats: 2000, registeredCount: 847, nmCreditsAwarded: 5, status: 'open', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=75' },
  ])

  // ── DISPUTES ──
  await Dispute.insertMany([
    { raisedBy: studentUsers[0]._id, raisedByName: 'Arjun Kumar', raisedByRole: 'student', againstName: 'DataMinds Analytics', againstRole: 'company', category: 'Certificate Not Issued', description: 'Project was completed and approved on Aug 5 but certificate has not been issued after 25 days.', project: projects[4]._id, status: 'under_review', priority: 'high' },
    { raisedBy: studentUsers[2]._id, raisedByName: 'Karthik Selvam', raisedByRole: 'student', againstName: 'DataMinds Analytics', againstRole: 'company', category: 'Payment Delay', description: 'Stipend of ₹7,500 not received 3 weeks after project completion.', project: projects[4]._id, status: 'open', priority: 'high' },
    { raisedBy: studentUsers[3]._id, raisedByName: 'Divya Mohan', raisedByRole: 'student', againstName: 'Freshworks', againstRole: 'company', category: 'Unfair Rejection', description: 'Application was rejected without feedback after shortlisting stage.', status: 'open', priority: 'medium' },
  ])

  console.log('✅ Seed complete!')
  console.log('👤 Admin: admin@nmmicrolearn.in / Admin@2026')
  console.log('🎓 Student: arjun@psgtech.edu / Student@2026')
  console.log('🏢 Company: hr@zohocorporation.com / Company@2026')
  console.log('🏫 College: admin@psgtech.edu / College@2026')

  await mongoose.disconnect()
  process.exit(0)
}

seedAll().catch(err => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
