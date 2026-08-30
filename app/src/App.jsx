import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
// Student
import StudentDashboard from './pages/student/Dashboard'
import StudentProjects from './pages/student/Projects'
import StudentApplications from './pages/student/Applications'
import StudentWorkspace from './pages/student/Workspace'
import StudentCertificates from './pages/student/Certificates'
import StudentSkillGap from './pages/student/SkillGap'
import StudentAIJobs from './pages/student/AIJobs'
import StudentLeaderboard from './pages/student/Leaderboard'
import StudentEvents from './pages/student/TNSkillEvents'
import StudentMessages from './pages/student/Messages'
import StudentPortfolio from './pages/student/Portfolio'
// Company
import CompanyDashboard from './pages/company/Dashboard'
import CompanyPost from './pages/company/PostProject'
import CompanyProjects from './pages/company/MyProjects'
import CompanyApplicants from './pages/company/Applicants'
import CompanySubmissions from './pages/company/Submissions'
import CompanyCertificates from './pages/company/IssueCertificates'
import CompanyAnalytics from './pages/company/Analytics'
// College
import CollegeDashboard from './pages/college/Dashboard'
import CollegeOnboarding from './pages/college/Onboarding'
import CollegeAnalytics from './pages/college/Analytics'
import CollegeCompliance from './pages/college/Compliance'
import CollegeCredits from './pages/college/Credits'
import CollegeReports from './pages/college/Reports'
import CollegeTNSDC from './pages/college/TNSDC'
// Admin
import AdminDashboard from './pages/admin/Dashboard'
import AdminAnalytics from './pages/admin/Analytics'
import AdminVerify from './pages/admin/Verify'
import AdminColleges from './pages/admin/Colleges'
import AdminCompanies from './pages/admin/Companies'
import AdminUsers from './pages/admin/Users'
import AdminSettings from './pages/admin/Settings'
import AdminDisputes from './pages/admin/Disputes'
// Student extra
import StudentGrowth from './pages/student/Growth'
import StudentSubmissions from './pages/student/Submissions'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<StudentProjects />} />
        <Route path="/student/applications" element={<StudentApplications />} />
        <Route path="/student/workspace" element={<StudentWorkspace />} />
        <Route path="/student/certificates" element={<StudentCertificates />} />
        <Route path="/student/skill-gap" element={<StudentSkillGap />} />
        <Route path="/student/ai-jobs" element={<StudentAIJobs />} />
        <Route path="/student/leaderboard" element={<StudentLeaderboard />} />
        <Route path="/student/events" element={<StudentEvents />} />
        <Route path="/student/messages" element={<StudentMessages />} />
        <Route path="/student/portfolio" element={<StudentPortfolio />} />
        {/* Company */}
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/company/post" element={<CompanyPost />} />
        <Route path="/company/projects" element={<CompanyProjects />} />
        <Route path="/company/applicants" element={<CompanyApplicants />} />
        <Route path="/company/submissions" element={<CompanySubmissions />} />
        <Route path="/company/certificates" element={<CompanyCertificates />} />
        <Route path="/company/analytics" element={<CompanyAnalytics />} />
        {/* College */}
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/college/onboarding" element={<CollegeOnboarding />} />
        <Route path="/college/analytics" element={<CollegeAnalytics />} />
        <Route path="/college/compliance" element={<CollegeCompliance />} />
        <Route path="/college/credits" element={<CollegeCredits />} />
        <Route path="/college/reports" element={<CollegeReports />} />
        <Route path="/college/tnsdc" element={<CollegeTNSDC />} />
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />
        <Route path="/admin/verify" element={<AdminVerify />} />
        <Route path="/admin/colleges" element={<AdminColleges />} />
        <Route path="/admin/companies" element={<AdminCompanies />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />
        {/* Student extra */}
        <Route path="/student/growth" element={<StudentGrowth />} />
        <Route path="/student/submissions" element={<StudentSubmissions />} />
      </Routes>
    </BrowserRouter>
  )
}
