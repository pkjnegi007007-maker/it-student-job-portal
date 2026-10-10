# ITCareerHub — Student & Fresher IT Job Portal

**ITCareerHub** is a modern, student-centric web application designed specifically to help college students, fresh graduates, and entry-level IT job seekers discover internships, apprenticeships, and early career opportunities across the entire tech ecosystem.

---

## 🌟 Key Features

1. **Targeted for 0–2 Years Experience & Students**:
   - Filter by **Internship / Co-op**, **Fresh Graduate (0 yr / Batches 2024–2027)**, and **Junior (1–2 yrs)**.
   - Batch eligibility criteria explicitly highlighted on every job card.

2. **Categorized Across 7 Major IT Domains**:
   - 💻 **Software Engineering**: Frontend, Backend, Full Stack, Mobile (iOS/Android/Flutter)
   - 🧠 **AI & Data Science**: Machine Learning, Data Analyst, Data Engineering, PyTorch
   - ☁️ **Cloud & DevOps / SRE**: AWS, Docker, Kubernetes, Linux, CI/CD
   - 🛡️ **Cybersecurity**: SOC Tier 1, Ethical Hacking, Threat Analysis, OWASP
   - 🐞 **QA & Automation**: Selenium, SDET, Postman, API Testing
   - 🎨 **UI/UX & Product Design**: Figma, Prototyping, Wireframing
   - 🎧 **IT Support & Systems**: System Administration, Active Directory, Networking

3. **Smart Skill & Resume Matcher**:
   - Compares your current skill stack against every job's requirements in real time.
   - Computes a percentage compatibility score (e.g., `85% Match`).
   - Highlights matching skills with checkmarks and recommends missing skills to learn.
   - **Resume Text Extractor**: Paste bullet points or summaries from your resume to automatically extract tech keywords.

4. **Interactive Application Kanban Tracker**:
   - Manage your job hunt pipeline: `Wishlist` → `Applied` → `Interview / OA Round` → `Offers Received` → `Archived`.
   - Add personal notes, assessment deadlines, and interview dates.
   - Celebrates with confetti when an offer is landed!
   - Persisted automatically in browser `localStorage`.

5. **Technical Interview & Live Coding Arena (Prep Corner)**:
   - **Interactive In-Browser Code IDE**: Write real JavaScript solutions, run automated test suites, inspect inputs/outputs, and debug with `console.log`.
   - **10 Real IT Interview Questions**: Two Sum, Valid Parentheses, Stock Buy/Sell, Kadane's Algorithm, Longest Substring Without Repeating Characters, Binary Search, Merge Intervals, and more.
   - **Direct External Platform Links**: One-click jump to LeetCode, GeeksforGeeks, and NeetCode for every problem.
   - **Progress & Draft Persistence**: Solved statuses and code drafts auto-saved in `localStorage` with celebratory confetti on all tests passed.
   - High-frequency DSA pattern breakdowns, Google standard XYZ resume bullet blueprints, and full interview checklists.

6. **Post a Job Portal**:
   - Recruiters, campus placement coordinators, and student club leads can submit verified student openings directly.

7. **Dark / Light Mode**:
   - Smooth theme toggle with system preference detection.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended, tested on Node v24)
- npm (v9 or newer)

### Run Locally

1. Navigate to the project directory:
   ```bash
   cd it-student-job-portal
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```

3. Open your browser at:
   ```
   http://localhost:5173
   ```

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
it-student-job-portal/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── data/
│   │   ├── itCategories.js        # IT domain definitions, skills, experience levels
│   │   ├── curatedJobs.js         # Curated IT student & fresher positions
│   │   ├── prepResources.js       # DSA patterns, resume formulas, interview checklist
│   │   └── practiceQuestions.js   # 10 real interview questions, tests, external platform links
│   ├── services/
│   │   ├── jobService.js          # Sourcing, match score computation, skill breakdown
│   │   ├── storageService.js      # LocalStorage persistence for bookmarks, tracker & code drafts
│   │   └── codeRunnerService.js   # Safe browser test runner & console log capturer
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx         # Header, tab navigation, theme toggle
│       │   └── Footer.jsx         # Career links, resources, copyright
│       ├── jobs/
│       │   ├── JobCard.jsx        # Rich job card with match badges
│       │   ├── JobDetailModal.jsx # Detailed modal with skill breakdown & apply
│       │   ├── JobFilters.jsx     # Domain pills, experience level, mode, match score slider
│       │   ├── SearchBar.jsx      # Title, company, skill, and location search
│       │   └── PostJobModal.jsx   # Form to submit new opportunities
│       ├── matcher/
│       │   └── SkillMatcher.jsx   # Interactive student skill matcher & resume parser
│       ├── tracker/
│       │   └── ApplicationTracker.jsx # 5-stage Kanban application board
│       └── prep/
│           ├── PrepCorner.jsx     # Main interview prep view & tab orchestrator
│           └── CodingArena.jsx    # Interactive in-browser coding IDE & test case runner
```
