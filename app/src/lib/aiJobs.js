// AI Job Recommendation Engine
// Scores jobs against student's earned certificates and skills

export const JOB_DATABASE = [
  {
    id: 'fsd-001',
    title: 'Full Stack Developer',
    company: 'Zoho Corporation',
    location: 'Chennai, TN',
    type: 'Full-time',
    salaryMin: 6,
    salaryMax: 12,
    domain: 'Web Development',
    requiredSkills: ['React.js', 'Node.js', 'MongoDB', 'REST API', 'JavaScript'],
    niceToHave: ['TypeScript', 'Docker', 'AWS'],
    logo: '🏢',
    color: 'from-blue-600 to-indigo-600',
    openings: 12,
    experience: '0–2 years (Fresher OK)',
    nmCreditsRequired: 10,
  },
  {
    id: 'ui-001',
    title: 'UI/UX Designer',
    company: 'Freshworks',
    location: 'Chennai, TN',
    type: 'Full-time',
    salaryMin: 5,
    salaryMax: 9,
    domain: 'Design',
    requiredSkills: ['Figma', 'UI/UX', 'Responsive Design', 'HTML5/CSS3'],
    niceToHave: ['React.js', 'User Research', 'Prototyping'],
    logo: '🎨',
    color: 'from-pink-500 to-rose-500',
    openings: 6,
    experience: '0–1 years',
    nmCreditsRequired: 8,
  },
  {
    id: 'ml-001',
    title: 'Junior ML Engineer',
    company: 'DataMinds Analytics',
    location: 'Bengaluru / Remote',
    type: 'Full-time',
    salaryMin: 7,
    salaryMax: 14,
    domain: 'Data Science',
    requiredSkills: ['Python', 'Pandas/NumPy', 'Scikit-learn', 'TensorFlow'],
    niceToHave: ['MLOps', 'AWS', 'SQL'],
    logo: '🤖',
    color: 'from-violet-600 to-purple-600',
    openings: 4,
    experience: '0–2 years',
    nmCreditsRequired: 12,
  },
  {
    id: 'mob-001',
    title: 'Flutter Developer',
    company: 'QuickLog Technologies',
    location: 'Coimbatore, TN',
    type: 'Full-time',
    salaryMin: 4,
    salaryMax: 8,
    domain: 'Mobile Development',
    requiredSkills: ['Flutter', 'Firebase', 'REST API', 'JavaScript'],
    niceToHave: ['React Native', 'Figma', 'iOS/Android Testing'],
    logo: '📱',
    color: 'from-cyan-500 to-blue-500',
    openings: 8,
    experience: '0–1 years',
    nmCreditsRequired: 8,
  },
  {
    id: 'devops-001',
    title: 'DevOps Engineer',
    company: 'Hexaware Technologies',
    location: 'Chennai, TN',
    type: 'Full-time',
    salaryMin: 7,
    salaryMax: 15,
    domain: 'Cloud & DevOps',
    requiredSkills: ['Docker', 'AWS', 'Linux Admin', 'CI/CD (Jenkins)', 'GitHub Actions'],
    niceToHave: ['Kubernetes', 'Terraform', 'Python'],
    logo: '⚙️',
    color: 'from-orange-500 to-amber-500',
    openings: 3,
    experience: '0–2 years',
    nmCreditsRequired: 12,
  },
  {
    id: 'be-001',
    title: 'Backend Developer (Python)',
    company: 'HealthConnect Solutions',
    location: 'Madurai, TN',
    type: 'Full-time',
    salaryMin: 5,
    salaryMax: 10,
    domain: 'Web Development',
    requiredSkills: ['Python', 'REST API', 'PostgreSQL', 'Node.js'],
    niceToHave: ['Django', 'Docker', 'Redis'],
    logo: '🐍',
    color: 'from-green-600 to-emerald-600',
    openings: 5,
    experience: '0–2 years',
    nmCreditsRequired: 8,
  },
  {
    id: 'iot-001',
    title: 'IoT Systems Engineer',
    company: 'GreenTech Innovators',
    location: 'Coimbatore, TN',
    type: 'Full-time',
    salaryMin: 5,
    salaryMax: 9,
    domain: 'IoT & Embedded',
    requiredSkills: ['Arduino', 'MQTT Protocol', 'Node.js', 'Embedded C'],
    niceToHave: ['Raspberry Pi', 'AWS IoT', 'React.js'],
    logo: '🔌',
    color: 'from-teal-500 to-cyan-600',
    openings: 2,
    experience: '0–1 years',
    nmCreditsRequired: 6,
  },
  {
    id: 'sec-001',
    title: 'Jr. Cybersecurity Analyst',
    company: 'SecureAxis Pvt Ltd',
    location: 'Chennai, TN (Hybrid)',
    type: 'Full-time',
    salaryMin: 6,
    salaryMax: 11,
    domain: 'Cybersecurity',
    requiredSkills: ['Linux Admin', 'Python', 'Network Security', 'REST API'],
    niceToHave: ['Ethical Hacking', 'AWS', 'Docker'],
    logo: '🛡️',
    color: 'from-slate-700 to-slate-900',
    openings: 4,
    experience: '0–2 years',
    nmCreditsRequired: 10,
  },
]

/**
 * Score a single job against the student's skills
 * Returns a score 0–100 and matched/missing skills
 */
export function scoreJob(job, studentSkills) {
  const required = job.requiredSkills
  const niceToHave = job.niceToHave || []

  let matched = []
  let missing = []

  required.forEach((skill) => {
    const found = studentSkills.some(
      (s) => s.toLowerCase() === skill.toLowerCase() ||
             s.toLowerCase().includes(skill.toLowerCase()) ||
             skill.toLowerCase().includes(s.toLowerCase())
    )
    if (found) matched.push(skill)
    else missing.push(skill)
  })

  const niceMatched = niceToHave.filter((skill) =>
    studentSkills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
  )

  // Core score: % of required skills matched (0-80 pts)
  const coreScore = required.length > 0 ? (matched.length / required.length) * 80 : 0
  // Bonus for nice-to-have (0-20 pts)
  const bonusScore = niceToHave.length > 0 ? (niceMatched.length / niceToHave.length) * 20 : 0

  const totalScore = Math.round(coreScore + bonusScore)

  return {
    score: Math.min(totalScore, 100),
    matched,
    missing,
    niceMatched,
  }
}

/**
 * Get AI job recommendations for a student
 * Returns sorted list of jobs with scores and insights
 */
export function getJobRecommendations(studentProfile) {
  const { skills = [], certificates = [], nmCredits = 0, domain = '' } = studentProfile

  // Expand skills from certificates
  const allSkills = [...new Set([...skills, ...certificates.flatMap(c => c.skills || [])])]

  const recommendations = JOB_DATABASE.map((job) => {
    const result = scoreJob(job, allSkills)

    // Eligibility check
    const creditsOk = nmCredits >= job.nmCreditsRequired
    const eligible = result.score >= 30 // at least 30% match to show

    // AI insight generation
    let insight = ''
    if (result.score >= 90) insight = '🎯 Perfect match! You are highly qualified for this role.'
    else if (result.score >= 75) insight = '⭐ Strong match! Complete 1 more project to maximize your chances.'
    else if (result.score >= 55) insight = `💡 Good fit! Bridge ${result.missing.length} skill gap${result.missing.length > 1 ? 's' : ''} to become a top candidate.`
    else if (result.score >= 35) insight = `📈 Growing potential. Focus on: ${result.missing.slice(0, 2).join(', ')}.`
    else insight = '🌱 Early stage match. Use Skill Gap tool to build towards this role.'

    // Bridge project suggestion
    const bridgeProject = result.missing.length > 0
      ? `Build a ${result.missing[0]} project to close your top skill gap.`
      : 'You already have all required skills!'

    return {
      ...job,
      ...result,
      creditsOk,
      eligible,
      insight,
      bridgeProject,
    }
  })
    .filter(j => j.eligible)
    .sort((a, b) => b.score - a.score)

  return recommendations
}

/**
 * Student profile — in production this comes from auth context / API
 */
export const DEMO_STUDENT_PROFILE = {
  name: 'Arjun Kumar',
  domain: 'Web Development',
  nmCredits: 24,
  certificates: [
    { title: 'Mobile App UI/UX Design', skills: ['Figma', 'UI/UX', 'Responsive Design'] },
    { title: 'E-Commerce React Dashboard', skills: ['React.js', 'JavaScript', 'HTML5/CSS3', 'REST API'] },
    { title: 'Python Web Scraper', skills: ['Python', 'Pandas/NumPy'] },
  ],
  skills: ['React.js', 'JavaScript', 'HTML5/CSS3', 'Python', 'REST API', 'Figma', 'UI/UX', 'Responsive Design', 'Pandas/NumPy', 'Node.js'],
}
