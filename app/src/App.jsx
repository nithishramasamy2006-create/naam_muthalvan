import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import StudentDashboard from './pages/student/Dashboard'
import AIJobs from './pages/student/AIJobs'
import Certificates from './pages/student/Certificates'
import SkillGap from './pages/student/SkillGap'
import Portfolio from './pages/student/Portfolio'
import Projects from './pages/student/Projects'
import Leaderboard from './pages/student/Leaderboard'
import CompanyDashboard from './pages/company/Dashboard'
import CollegeDashboard from './pages/college/Dashboard'
import AdminDashboard from './pages/admin/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/ai-jobs" element={<AIJobs />} />
        <Route path="/student/certificates" element={<Certificates />} />
        <Route path="/student/skill-gap" element={<SkillGap />} />
        <Route path="/student/portfolio" element={<Portfolio />} />
        <Route path="/student/projects" element={<Projects />} />
        <Route path="/student/leaderboard" element={<Leaderboard />} />
        <Route path="/company" element={<CompanyDashboard />} />
        <Route path="/college" element={<CollegeDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
