import { CURATED_JOBS } from '../data/curatedJobs.js';
import { storageService } from './storageService.js';

export const jobService = {
  // Combine curated and local custom jobs
  getLocalJobs: () => {
    const custom = storageService.getCustomJobs();
    return [...custom, ...CURATED_JOBS];
  },

  // Fetch optional live external jobs from Remotive Public API
  fetchLiveJobs: async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=12', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) return [];

      const data = await response.json();
      if (!data.jobs || !Array.isArray(data.jobs)) return [];

      // Transform Remotive format into standard ITCareerHub schema
      return data.jobs.map(item => {
        // Extract plain text preview safely
        const plainText = (typeof document !== 'undefined')
          ? (() => {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = item.description || '';
              return tempDiv.textContent || tempDiv.innerText || '';
            })()
          : (item.description || '').replace(/<[^>]*>?/gm, '');

        // Extract skills from tags or fallback
        const skills = (item.tags && item.tags.length > 0)
          ? item.tags.slice(0, 6)
          : ['JavaScript', 'React', 'Git', 'API'];

        return {
          id: `live-${item.id}`,
          title: item.title,
          company: item.company_name,
          companyColor: 'from-blue-600 to-indigo-700',
          category: 'software-eng',
          experienceLevel: item.title.toLowerCase().includes('senior') ? 'junior' : 'internship',
          workMode: 'remote',
          location: item.candidate_required_location || 'Remote',
          salary: item.salary || '$40 - $55 / hr',
          stipendRaw: 60000,
          skills: skills,
          batchEligibility: 'Open to eligible college students & graduates',
          description: plainText.slice(0, 300) + '...',
          responsibilities: [
            'Collaborate on distributed engineering tasks and pull requests.',
            'Write clean code and unit tests per company engineering standards.',
            'Participate in sprint retrospectives and team standups.'
          ],
          qualifications: [
            'Strong foundation in computer science and modern software principles.',
            'Demonstrated personal projects or open-source contributions.',
            'Comfortable working in a remote-first international team.'
          ],
          perks: ['100% Remote', 'Flexible Hours', 'Global Community'],
          postedDate: 'Live Feed',
          featured: false,
          isUrgent: false,
          applyUrl: item.url,
          isExternal: true
        };
      });
    } catch (err) {
      console.warn('Live API fetch timed out or unavailable, defaulting to curated database.', err);
      return [];
    }
  },

  // Calculate Match Score percentage between user's skills and a job's required skills
  calculateMatchScore: (jobSkills = [], studentSkills = []) => {
    if (!jobSkills || jobSkills.length === 0) return 0;
    if (!studentSkills || studentSkills.length === 0) return 0;

    const lowerStudentSkills = studentSkills.map(s => s.toLowerCase().trim());
    let matchCount = 0;

    jobSkills.forEach(skill => {
      const lower = skill.toLowerCase().trim();
      const isMatched = lowerStudentSkills.some(studentSkill => 
        studentSkill === lower ||
        lower.includes(studentSkill) ||
        studentSkill.includes(lower)
      );
      if (isMatched) {
        matchCount++;
      }
    });

    const percent = Math.round((matchCount / jobSkills.length) * 100);
    return Math.min(100, Math.max(0, percent));
  },

  // Identify matching and missing skills for detail breakdown
  getSkillAnalysis: (jobSkills = [], studentSkills = []) => {
    const lowerStudentSkills = studentSkills.map(s => s.toLowerCase().trim());
    const matched = [];
    const missing = [];

    jobSkills.forEach(skill => {
      const lower = skill.toLowerCase().trim();
      const hasSkill = lowerStudentSkills.some(studentSkill => 
        studentSkill === lower ||
        lower.includes(studentSkill) ||
        studentSkill.includes(lower)
      );

      if (hasSkill) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    return { matched, missing };
  }
};
