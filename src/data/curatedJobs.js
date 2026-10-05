export const CURATED_JOBS = [
  {
    id: 'job-1',
    title: 'Software Engineering Intern (Summer / Fall)',
    company: 'Google',
    companyColor: 'from-blue-500 to-emerald-500',
    category: 'software-eng',
    experienceLevel: 'internship',
    workMode: 'hybrid',
    location: 'Mountain View, CA / Remote Option',
    salary: '$52 - $60 / hr',
    stipendRaw: 9000,
    skills: ['Python', 'C++', 'Java', 'Data Structures', 'Algorithms', 'Git'],
    batchEligibility: '2025 & 2026 Graduates (B.Tech / BS / MS)',
    description: 'Join Google engineering teams to build products used by billions of people worldwide. Work alongside full-time mentors on scalable distributed systems, search algorithms, or mobile infrastructure.',
    responsibilities: [
      'Write clean, maintainable, and testable code in C++, Java, or Python.',
      'Collaborate with senior software engineers, product managers, and UX designers.',
      'Participate in design reviews, sprint planning, and engineering demos.',
      'Ship code to production impacting millions of end users.'
    ],
    qualifications: [
      'Currently enrolled in an Associate, Bachelor or Master degree in Computer Science or related STEM field.',
      'Strong foundational knowledge of Data Structures and Algorithms.',
      'Hands-on experience with at least one programming language (Python, C++, Java, or Go).'
    ],
    perks: ['Mentorship Program', 'Housing Stipend ($9,000)', 'Free Meals & Transport', 'Full-time Conversion Opportunity'],
    postedDate: 'Just now',
    featured: true,
    isUrgent: true,
    applyUrl: 'https://careers.google.com/students/'
  },
  {
    id: 'job-2',
    title: 'Junior Frontend Developer (React / TypeScript)',
    company: 'Vercel',
    companyColor: 'from-slate-900 to-slate-700',
    category: 'software-eng',
    experienceLevel: 'fresher',
    workMode: 'remote',
    location: 'Remote (Worldwide)',
    salary: '$85,000 - $110,000 / yr',
    stipendRaw: 85000,
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Git', 'HTML/CSS'],
    batchEligibility: '2024 & 2025 Freshers / Self-Taught Developers',
    description: 'We are looking for an ambitious junior engineer passionate about frontend performance, web standards, and developer experience to join our core Web Ecosystem team.',
    responsibilities: [
      'Build responsive, accessible, and high-performance UI components in React and Next.js.',
      'Write end-to-end and unit tests using Vitest and Playwright.',
      'Optimize web vitals (LCP, FID, CLS) for client-facing dashboards.',
      'Contribute to open-source UI libraries and component documentation.'
    ],
    qualifications: [
      'Strong portfolio demonstrating modern React applications and clean CSS.',
      'Proficiency in TypeScript and modern JavaScript (ES6+).',
      'Understanding of component lifecycle, state management, and REST APIs.'
    ],
    perks: ['100% Remote', '$2,000 Home Office Stipend', 'Health Insurance', 'Learning & Conference Budget'],
    postedDate: '1 day ago',
    featured: true,
    isUrgent: false,
    applyUrl: 'https://vercel.com/careers'
  },
  {
    id: 'job-3',
    title: 'AI & Machine Learning Research Intern',
    company: 'Anthropic',
    companyColor: 'from-amber-600 to-orange-500',
    category: 'ai-data',
    experienceLevel: 'internship',
    workMode: 'hybrid',
    location: 'San Francisco, CA',
    salary: '$55 - $70 / hr',
    stipendRaw: 10500,
    skills: ['Python', 'PyTorch', 'Linear Algebra', 'NumPy', 'Git', 'Linux'],
    batchEligibility: 'Undergraduates, Masters & PhD candidates',
    description: 'Conduct foundational AI safety and capability research on large multimodal neural networks. Collaborate with researchers to evaluate model reasoning, alignment, and interpretability.',
    responsibilities: [
      'Implement and run distributed training experiments in PyTorch.',
      'Analyze safety metrics and evaluation benchmarks across multi-turn dialog datasets.',
      'Collaborate on writing research findings and internal technical documentation.'
    ],
    qualifications: [
      'Proficient in Python and deep learning frameworks (PyTorch preferred).',
      'Solid grasp of probability, linear algebra, and gradient-based optimization.',
      'Previous project or coursework in Machine Learning or NLP.'
    ],
    perks: ['Compute Cluster Access (H100s)', 'Research Publication Mentorship', 'Relocation Assistance'],
    postedDate: '2 days ago',
    featured: true,
    isUrgent: true,
    applyUrl: 'https://anthropic.com/careers'
  },
  {
    id: 'job-4',
    title: 'Graduate Data Analyst (0 - 1 Yrs)',
    company: 'Spotify',
    companyColor: 'from-emerald-500 to-green-600',
    category: 'ai-data',
    experienceLevel: 'fresher',
    workMode: 'remote',
    location: 'New York, NY / Remote',
    salary: '$75,000 - $95,000 / yr',
    stipendRaw: 75000,
    skills: ['SQL', 'Python', 'Tableau', 'Pandas', 'Data Visualization', 'Statistics'],
    batchEligibility: '2024 & 2025 Graduates',
    description: 'Help decode user engagement patterns across millions of daily music and podcast listeners. You will craft dashboards and derive actionable insights that shape our recommendation algorithms.',
    responsibilities: [
      'Write complex SQL queries to extract, transform, and aggregate behavioral datasets.',
      'Build automated executive dashboards in Tableau and Looker.',
      'Partner with product managers to design A/B test experiments and measure feature adoption.'
    ],
    qualifications: [
      'Degree in Computer Science, Data Science, Statistics, Mathematics or related domain.',
      'Fluency in SQL and Python (Pandas/Matplotlib) for exploratory data analysis.',
      'Curiosity for user metrics and data storytelling.'
    ],
    perks: ['Spotify Premium for life', 'Flexible Work Policy', 'Wellness Reimbursement', 'Global Mobility Program'],
    postedDate: '3 days ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://www.lifeatspotify.com/jobs'
  },
  {
    id: 'job-5',
    title: 'Cloud Infrastructure & DevOps Intern',
    company: 'Amazon Web Services (AWS)',
    companyColor: 'from-amber-500 to-yellow-600',
    category: 'devops-cloud',
    experienceLevel: 'internship',
    workMode: 'hybrid',
    location: 'Seattle, WA / Austin, TX',
    salary: '$48 - $56 / hr',
    stipendRaw: 8500,
    skills: ['AWS', 'Linux', 'Docker', 'Python', 'Git', 'Bash', 'Networking'],
    batchEligibility: '2025, 2026, 2027 Engineering Students',
    description: 'Work directly on the cloud backbone that powers the global internet. You will learn to automate containerized deployments, manage serverless fleets, and build resilience monitoring systems.',
    responsibilities: [
      'Automate cloud infrastructure deployments using AWS CDK and Terraform.',
      'Package microservices into Docker containers and configure CI/CD pipelines.',
      'Monitor distributed system alarms and diagnose latency bottlenecks in real time.'
    ],
    qualifications: [
      'Enrolled in Computer Science, Information Technology, or Software Engineering degree.',
      'Solid understanding of Linux operating system concepts and TCP/IP networking.',
      'Familiarity with container concepts (Docker) and scripting (Bash or Python).'
    ],
    perks: ['AWS Certification Vouchers ($1,500 value)', 'Executive Mentorship', 'Competitive Housing Grant'],
    postedDate: '1 day ago',
    featured: true,
    isUrgent: false,
    applyUrl: 'https://amazon.jobs/en/business_categories/student-programs'
  },
  {
    id: 'job-6',
    title: 'Associate Cybersecurity Analyst (SOC Tier 1)',
    company: 'CrowdStrike',
    companyColor: 'from-red-600 to-rose-700',
    category: 'cybersecurity',
    experienceLevel: 'fresher',
    workMode: 'remote',
    location: 'Remote (US & Canada)',
    salary: '$70,000 - $88,000 / yr',
    stipendRaw: 70000,
    skills: ['Linux', 'Networking', 'Wireshark', 'Python', 'OWASP', 'SIEM'],
    batchEligibility: 'Freshers / Recent Bootcamp & College Grads',
    description: 'Defend enterprise infrastructure against advanced persistent threats (APTs). You will monitor security event consoles, triage suspicious alerts, and conduct initial malware analysis.',
    responsibilities: [
      'Investigate alerts generated by endpoint telemetry and SIEM platforms.',
      'Perform network packet analysis using Wireshark and tcpdump.',
      'Draft incident reports detailing threat vectors and containment actions.',
      'Script automated detection rules using Python and YARA.'
    ],
    qualifications: [
      'Bachelor’s degree in Cybersecurity, Information Security, or Computer Science.',
      'Hands-on experience with network protocols, firewalls, and Linux shell.',
      'Security+ or CySA+ certification is an advantage, but personal home lab experience is highly valued.'
    ],
    perks: ['Comprehensive Training Program', 'Certification Sponsorships', 'Home Office Gear Allowance'],
    postedDate: '4 days ago',
    featured: false,
    isUrgent: true,
    applyUrl: 'https://crowdstrike.com/careers'
  },
  {
    id: 'job-7',
    title: 'Software Development Engineer in Test (SDET Intern)',
    company: 'Microsoft',
    companyColor: 'from-blue-600 to-indigo-600',
    category: 'qa-testing',
    experienceLevel: 'internship',
    workMode: 'hybrid',
    location: 'Redmond, WA',
    salary: '$46 - $54 / hr',
    stipendRaw: 8000,
    skills: ['Java', 'Selenium', 'Python', 'Postman', 'Git', 'SQL', 'Automation'],
    batchEligibility: '2025 & 2026 Batch Graduates',
    description: 'Bridge the gap between development and reliability. You will write automated end-to-end test suites, stress-test high throughput microservices, and build continuous integration quality gates.',
    responsibilities: [
      'Design test automation frameworks using Selenium, Playwright, or Cypress.',
      'Write automated API regression suites in Postman and RestAssured.',
      'Collaborate with developers to debug intermittent failures in CI/CD pipelines.'
    ],
    qualifications: [
      'Current student pursuing Computer Science, Computer Engineering, or related degree.',
      'Knowledge of object-oriented programming (Java or C#) and scripting (Python).',
      'Passion for software quality and building robust testable code.'
    ],
    perks: ['Microsoft Surface Laptop provided', 'Housing Allowance', 'Full-time Return Offer Pathway'],
    postedDate: '3 days ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://careers.microsoft.com/students/us/en'
  },
  {
    id: 'job-8',
    title: 'Junior UI/UX & Product Design Trainee',
    company: 'Figma',
    companyColor: 'from-violet-500 to-pink-500',
    category: 'ui-ux',
    experienceLevel: 'fresher',
    workMode: 'hybrid',
    location: 'San Francisco, CA / New York, NY',
    salary: '$80,000 - $96,000 / yr',
    stipendRaw: 80000,
    skills: ['Figma', 'Wireframing', 'User Research', 'Prototyping', 'Design Systems', 'HTML/CSS'],
    batchEligibility: 'Design, HCI & CS 2024-2025 Graduates',
    description: 'Design the next generation of creative and collaboration tools. You will conduct user research, craft wireframes, design atomic design system components, and test interactive prototypes with real community members.',
    responsibilities: [
      'Create high-fidelity UI mockups and interactive design prototypes in Figma.',
      'Participate in user feedback sessions and translate qualitative observations into wireframes.',
      'Partner closely with frontend engineers to ensure pixel-perfect CSS implementation.'
    ],
    qualifications: [
      'Portfolio showcasing 2-3 detailed case studies (web or mobile apps).',
      'Deep fluency with Figma features (Auto-layout, Components, Variants, Variables).',
      'Basic understanding of web technologies (HTML, CSS, flexbox) is a huge plus.'
    ],
    perks: ['Latest MacBook Pro + Pro Displays', 'Annual Education Budget', 'Wellness Benefits'],
    postedDate: 'Just now',
    featured: true,
    isUrgent: false,
    applyUrl: 'https://www.figma.com/careers'
  },
  {
    id: 'job-9',
    title: 'Junior Backend Engineer (Go / Node.js)',
    company: 'Stripe',
    companyColor: 'from-indigo-600 to-violet-700',
    category: 'software-eng',
    experienceLevel: 'junior',
    workMode: 'remote',
    location: 'Remote (US, Canada, Europe)',
    salary: '$110,000 - $135,000 / yr',
    stipendRaw: 110000,
    skills: ['Go', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs', 'Git'],
    batchEligibility: '1-2 Years Experience or Exceptional Open Source Contributor',
    description: 'Build mission-critical financial infrastructure powering global commerce. You will develop low-latency payment processing APIs, design resilient database schemas, and ensure 99.999% uptime.',
    responsibilities: [
      'Architect and ship idempotent backend endpoints handling millions of transactions.',
      'Optimize relational database queries in PostgreSQL.',
      'Contribute to internal developer tooling and observability instrumentation.'
    ],
    qualifications: [
      'Experience building backend services in Go, Node.js, Python, or Ruby.',
      'Understanding of ACID transactions, relational database indexes, and concurrency.',
      'High attention to detail when writing tests and handling edge cases.'
    ],
    perks: ['Equity Package', 'Unlimited PTO', 'Home Office Stipend ($1,500)', 'Parental Leave'],
    postedDate: '5 days ago',
    featured: true,
    isUrgent: false,
    applyUrl: 'https://stripe.com/jobs'
  },
  {
    id: 'job-10',
    title: 'IT Helpdesk & System Support Specialist',
    company: 'Dell Technologies',
    companyColor: 'from-blue-600 to-sky-500',
    category: 'it-support',
    experienceLevel: 'fresher',
    workMode: 'onsite',
    location: 'Round Rock, TX / Austin, TX',
    salary: '$50,000 - $65,000 / yr',
    stipendRaw: 50000,
    skills: ['Windows Server', 'Active Directory', 'Hardware Troubleshooting', 'Networking', 'Linux'],
    batchEligibility: 'Open to All IT / CS / Electronics Graduates',
    description: 'Be the frontline hero supporting enterprise IT operations. You will provision employee workstations, manage Active Directory accounts, resolve hardware/software incidents, and maintain office network infrastructure.',
    responsibilities: [
      'Troubleshoot Windows, macOS, and Linux workstation hardware and OS issues.',
      'Manage user permissions, password resets, and groups in Microsoft Entra / Active Directory.',
      'Configure VPNs, local area networks (LAN), and enterprise wireless access points.'
    ],
    qualifications: [
      'Degree or diploma in Information Technology, Computer Science, or CompTIA A+ certification.',
      'Friendly communication skills and patience when assisting non-technical users.',
      'Working knowledge of DHCP, DNS, IP addressing, and operating system recovery.'
    ],
    perks: ['Hardware discounts on Dell gear', 'Clear path to SysAdmin/DevOps role', 'Health benefits'],
    postedDate: '2 days ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://jobs.dell.com/'
  },
  {
    id: 'job-11',
    title: 'Full Stack Web Developer Intern (Summer 2025/2026)',
    company: 'Shopify',
    companyColor: 'from-emerald-600 to-teal-700',
    category: 'software-eng',
    experienceLevel: 'internship',
    workMode: 'remote',
    location: 'Remote (North America & UK)',
    salary: '$44 - $52 / hr',
    stipendRaw: 7500,
    skills: ['React', 'Ruby on Rails', 'TypeScript', 'GraphQL', 'Git', 'SQL'],
    batchEligibility: 'Current Undergrad & Masters Students',
    description: 'Ship merchant-facing features directly into Shopify Admin. You will work across the full stack—from intuitive frontend React components to performant backend GraphQL APIs.',
    responsibilities: [
      'Build merchant tools using React, TypeScript, and Polaris design system.',
      'Develop robust GraphQL APIs and write backend business logic.',
      'Participate in code reviews and pair programming sessions with staff engineers.'
    ],
    qualifications: [
      'Demonstrated enthusiasm for web development through personal projects or hackathons.',
      'Proficiency in JavaScript or TypeScript; curiosity to learn Ruby.',
      'Enrolled in an accredited degree program.'
    ],
    perks: ['Remote-first culture', 'Ergonomic workspace stipend', 'Mentorship and speaker series'],
    postedDate: 'Just now',
    featured: false,
    isUrgent: true,
    applyUrl: 'https://www.shopify.com/careers/interns'
  },
  {
    id: 'job-12',
    title: 'Junior Machine Learning Engineer',
    company: 'Databricks',
    companyColor: 'from-red-500 to-amber-600',
    category: 'ai-data',
    experienceLevel: 'fresher',
    workMode: 'hybrid',
    location: 'San Francisco, CA / Seattle, WA',
    salary: '$115,000 - $140,000 / yr',
    stipendRaw: 115000,
    skills: ['Python', 'SQL', 'PyTorch', 'Docker', 'Git', 'Linux', 'Pandas'],
    batchEligibility: '2024-2025 B.S. / M.S. Graduates in CS or Data Science',
    description: 'Work on cutting-edge Lakehouse platforms and MLflow tooling. You will help build reproducible machine learning pipelines, optimize inference serving engines, and support enterprise LLM deployments.',
    responsibilities: [
      'Build end-to-end ML training pipelines with automated validation steps.',
      'Package machine learning models into Docker containers for fast microservice inference.',
      'Benchmark latency and resource utilization across GPU and CPU hardware.'
    ],
    qualifications: [
      'Strong coding skills in Python and familiarity with standard ML libraries (Scikit-Learn, PyTorch).',
      'Knowledge of data structures, algorithms, and distributed computing basics.',
      'Experience with SQL queries and relational databases.'
    ],
    perks: ['Generous Equity / RSU grant', '401(k) Match', 'Comprehensive Health Care'],
    postedDate: '3 days ago',
    featured: true,
    isUrgent: false,
    applyUrl: 'https://databricks.com/company/careers'
  },
  {
    id: 'job-13',
    title: 'Site Reliability Engineering (SRE) Intern',
    company: 'Cloudflare',
    companyColor: 'from-orange-500 to-amber-500',
    category: 'devops-cloud',
    experienceLevel: 'internship',
    workMode: 'remote',
    location: 'Remote (US, EMEA)',
    salary: '$45 - $55 / hr',
    stipendRaw: 8000,
    skills: ['Linux', 'Go', 'Python', 'Networking', 'Docker', 'Git'],
    batchEligibility: 'Students graduating in 2025, 2026, or 2027',
    description: 'Help protect and accelerate millions of websites across Cloudflare’s global edge network. You will write automation code to detect anomalies, mitigate DDoS traffic, and maintain planetary-scale DNS infrastructure.',
    responsibilities: [
      'Write tooling in Go or Python to automate server health verification and traffic failover.',
      'Investigate edge performance metrics and diagnose BGP routing and TCP packet loss.',
      'Improve incident alerting thresholds to reduce alert fatigue for on-call engineers.'
    ],
    qualifications: [
      'Strong grasp of Linux fundamentals and command-line utilities.',
      'Understanding of networking principles (DNS, HTTP/HTTPS, BGP, TCP/UDP).',
      'Enthusiasm for debugging complex distributed systems.'
    ],
    perks: ['Full remote flexibility', 'Conference sponsorship', 'Intern team hackathons'],
    postedDate: '5 days ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://www.cloudflare.com/careers/departments/university/'
  },
  {
    id: 'job-14',
    title: 'Junior Penetration Tester / Ethical Hacker',
    company: 'Mandiant (Google Cloud)',
    companyColor: 'from-red-600 to-indigo-600',
    category: 'cybersecurity',
    experienceLevel: 'fresher',
    workMode: 'remote',
    location: 'Remote (Global)',
    salary: '$75,000 - $92,000 / yr',
    stipendRaw: 75000,
    skills: ['Python', 'Linux', 'OWASP', 'Wireshark', 'Burp Suite', 'Networking'],
    batchEligibility: '2024 & 2025 Graduates / CTF Enthusiasts',
    description: 'Join elite red team practitioners simulating real-world cyber adversaries. You will perform vulnerability assessments against web applications, cloud configurations, and network perimeters.',
    responsibilities: [
      'Conduct manual and automated vulnerability assessments on web applications and APIs.',
      'Document findings, proof-of-concept exploits, and remediation strategies for clients.',
      'Develop custom security assessment scripts and exploitation payloads in Python.'
    ],
    qualifications: [
      'Demonstrated participation in Capture The Flag (CTF) competitions or TryHackMe / HackTheBox.',
      'Familiarity with the OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR).',
      'Solid command line competency in Kali Linux and bash scripting.'
    ],
    perks: ['OSCP / CEH Certification Funding', 'Dedicated Research Time', 'Generous PTO'],
    postedDate: '2 days ago',
    featured: false,
    isUrgent: true,
    applyUrl: 'https://www.mandiant.com/careers'
  },
  {
    id: 'job-15',
    title: 'Graduate Quality Assurance Engineer (Manual & Automated)',
    company: 'Zoho Corporation',
    companyColor: 'from-blue-500 to-amber-500',
    category: 'qa-testing',
    experienceLevel: 'fresher',
    workMode: 'onsite',
    location: 'Chennai / Austin, TX / Remote Option',
    salary: '₹6.5 - ₹9.5 LPA / $55,000 / yr',
    stipendRaw: 55000,
    skills: ['Java', 'Selenium', 'Postman', 'SQL', 'Jira', 'Git'],
    batchEligibility: '2024 & 2025 Batch (All Engineering Branches Welcome)',
    description: 'Ensure the highest degree of reliability across Zoho’s suite of 50+ enterprise SaaS products. You will write test strategies, uncover tricky edge-case bugs, and write automated test scripts.',
    responsibilities: [
      'Create comprehensive test cases and scenario matrices for newly released cloud applications.',
      'Perform exploratory testing, cross-browser compatibility testing, and mobile testing.',
      'Automate repetitive regression cycles using Java and Selenium WebDriver.'
    ],
    qualifications: [
      'Keen eye for detail and logical analytical mindset.',
      'Basic programming knowledge in Java, Python, or C++.',
      'Understanding of software development life cycles (SDLC) and bug life cycles.'
    ],
    perks: ['Delicious campus cafeteria meals', 'Supportive learning culture', 'No bond / flexible agreements'],
    postedDate: '1 day ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://www.zoho.com/careers/'
  },
  {
    id: 'job-16',
    title: 'Mobile App Developer Intern (iOS / Android / Flutter)',
    company: 'Uber',
    companyColor: 'from-slate-900 to-slate-700',
    category: 'software-eng',
    experienceLevel: 'internship',
    workMode: 'hybrid',
    location: 'San Francisco, CA / Sunnyvale, CA',
    salary: '$50 - $58 / hr',
    stipendRaw: 8800,
    skills: ['Swift', 'Kotlin', 'Flutter', 'Git', 'REST APIs', 'Java'],
    batchEligibility: '2025 - 2027 Undergrad & Masters Students',
    description: 'Build native mobile features for driver and rider applications operating at planetary scale. You will work on real-time GPS telemetry, payment flows, and silky smooth 60fps animations.',
    responsibilities: [
      'Develop feature prototypes in Swift (iOS) or Kotlin (Android).',
      'Optimize memory usage, startup time, and network request queuing.',
      'Write modular code covered by comprehensive unit tests.'
    ],
    qualifications: [
      'Experience building at least one mobile application (iOS, Android, or Flutter) with code on GitHub.',
      'Understanding of mobile UI components, asynchronous tasks, and state management.',
      'Pursuing a degree in Computer Science, Software Engineering, or related technical discipline.'
    ],
    perks: ['Uber Ride credits ($300/mo)', 'Housing & travel assistance', 'Mentorship from Staff Engineers'],
    postedDate: '4 days ago',
    featured: false,
    isUrgent: false,
    applyUrl: 'https://www.uber.com/us/en/careers/'
  }
];
