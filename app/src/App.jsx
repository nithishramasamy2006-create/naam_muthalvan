import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import StudentDashboard from './pages/student/Dashboard'
import AIJobs from './pages/student/AIJobs'
import Certificates from './pages/student/Certificates'
import SkillGap from './pages/student/SkillGap'
import Portfolio from './pages/student/Portfolio'
import Projects from './pages/student/Projects'
import Applications from './pages/student/Applications'
import Workspace from './pages/student/Workspace'
import Messages from './pages/student/Messages'
import Leaderboard from './pages/student/Leaderboard'
import TNSkillEvents from './pages/student/TNSkillEvents'
import CompanyDashboard from './pages/company/Dashboard'
import CompanyApplicants from './pages/company/Applicants'
import CompanySubmissions from './pages/company/Submissions'
import CompanyPost from './pages/company/PostProject'
import CollegeDashboard from './pages/college/Dashboard'
import CollegeCredits from './pages/college/Credits'
import CollegeAnalytics from './pages/college/Analytics'
import CollegeCompliance from './pages/college/Compliance'
import AdminDashboard from './pages/admin/Dashboard'
import AdminVerify from './pages/admin/Verify'
import AdminUsers from './pages/admin/Users'
import AdminDisputes from './pages/admin/Disputes'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/projects" element={<Projects />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/student/workspace" element={<Workspace />} />
        <Route path="/student/certificates" element={<Certificates />} />
        <Route path="/student/skill-gap" element={<SkillGap />} />
        <Route path="/student/portfolio" element={<Portfolio />} />
        <Route path="/student/ai-jobs" element={<AIJobs />} />
        <Route path="/student/leaderboard" element={<Leaderboard />} />
        <Route path="/student/messages" element={<Messages />} />
        <Route path="/student/events" element={<TNSkillEvents />} />

        {/* Company */}
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/company/post" element={<CompanyPost />} />
        <Route path="/company/applicants" element={<CompanyApplicants />} />
        <Route path="/company/submissions" element={<CompanySubmissions />} />

        {/* College */}
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/college/credits" element={<CollegeCredits />} />
        <Route path="/college/analytics" element={<CollegeAnalytics />} />
        <Route path="/college/compliance" element={<CollegeCompliance />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/verify" element={<AdminVerify />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/disputes" element={<AdminDisputes />} />
      </Routes>
    </BrowserRouter>
  )
}
