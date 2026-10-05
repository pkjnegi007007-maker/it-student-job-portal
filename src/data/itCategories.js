export const IT_CATEGORIES = [
  {
    id: 'all',
    name: 'All IT Fields',
    description: 'Explore all entry-level and internship tech jobs',
    icon: 'Sparkles',
    count: 0
  },
  {
    id: 'software-eng',
    name: 'Software Engineering',
    description: 'Frontend, Backend, Full Stack & Mobile App Development',
    icon: 'Code2',
    roles: ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'Mobile App Intern', 'Software Engineer I'],
    popularSkills: ['JavaScript', 'React', 'Python', 'Java', 'Node.js', 'TypeScript', 'C++', 'Git']
  },
  {
    id: 'ai-data',
    name: 'AI & Data Science',
    description: 'Machine Learning, Data Analysis, Data Engineering & GenAI',
    icon: 'BrainCircuit',
    roles: ['Data Analyst Intern', 'Junior ML Engineer', 'Data Science Intern', 'Business Intelligence Analyst'],
    popularSkills: ['Python', 'SQL', 'Pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'Power BI', 'Tableau']
  },
  {
    id: 'devops-cloud',
    name: 'Cloud & DevOps',
    description: 'Cloud Infrastructure, Docker, Kubernetes, CI/CD & SRE',
    icon: 'Cloud',
    roles: ['DevOps Intern', 'Cloud Support Associate', 'Junior SRE', 'Platform Engineering Trainee'],
    popularSkills: ['AWS', 'Docker', 'Linux', 'Kubernetes', 'Git', 'Bash', 'Azure', 'Terraform']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'SOC Analysis, Penetration Testing, Threat Defense & InfoSec',
    icon: 'ShieldCheck',
    roles: ['SOC Analyst (Tier 1)', 'Cybersecurity Intern', 'Junior Security Specialist', 'Ethical Hacking Intern'],
    popularSkills: ['Linux', 'Networking', 'Wireshark', 'Python', 'OWASP', 'SIEM', 'Cryptography']
  },
  {
    id: 'qa-testing',
    name: 'QA & Test Automation',
    description: 'Software Testing, Automation Scripts, SDET & Quality Assurance',
    icon: 'Bug',
    roles: ['QA Intern', 'SDET Trainee', 'Manual Tester', 'Automation Engineer I'],
    popularSkills: ['Selenium', 'Python', 'Java', 'Postman', 'Cypress', 'Jira', 'SQL']
  },
  {
    id: 'ui-ux',
    name: 'UI/UX & Product',
    description: 'Product Design, User Research, Wireframing & Prototyping',
    icon: 'Palette',
    roles: ['UI/UX Design Intern', 'Junior Product Designer', 'Design Technologist'],
    popularSkills: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'HTML/CSS']
  },
  {
    id: 'it-support',
    name: 'IT Support & Systems',
    description: 'System Administration, Helpdesk, Hardware & Network Ops',
    icon: 'Headphones',
    roles: ['IT Helpdesk Technician', 'Junior System Administrator', 'Desktop Support Engineer'],
    popularSkills: ['Windows Server', 'Active Directory', 'Hardware Troubleshooting', 'Networking', 'Linux']
  }
];

export const EXPERIENCE_LEVELS = [
  { id: 'all', label: 'All Experience Levels' },
  { id: 'internship', label: 'Internship / Co-op (Students)' },
  { id: 'fresher', label: 'Fresh Graduate / 0 Exp (Batches 2024-2027)' },
  { id: 'junior', label: 'Junior (1 - 2 Years Exp)' }
];

export const WORK_MODES = [
  { id: 'all', label: 'All Work Types' },
  { id: 'remote', label: 'Remote / Work From Home' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'onsite', label: 'On-site' }
];

export const ALL_POPULAR_SKILLS = [
  'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'SQL', 'React', 'Node.js',
  'AWS', 'Docker', 'Git', 'Linux', 'HTML/CSS', 'Next.js', 'Django', 'FastAPI',
  'Spring Boot', 'MongoDB', 'PostgreSQL', 'Kubernetes', 'Pandas', 'PyTorch',
  'Figma', 'Selenium', 'Postman', 'Power BI', 'Networking', 'Cybersecurity'
];
