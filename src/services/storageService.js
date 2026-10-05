const STORAGE_KEYS = {
  BOOKMARKS: 'itcareerhub_bookmarks',
  TRACKER: 'itcareerhub_application_tracker',
  STUDENT_SKILLS: 'itcareerhub_student_skills',
  CUSTOM_JOBS: 'itcareerhub_custom_posted_jobs',
  DARK_MODE: 'itcareerhub_dark_mode'
};

export const storageService = {
  // Bookmarks
  getBookmarks: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark: (jobId) => {
    try {
      const bookmarks = storageService.getBookmarks();
      const updated = bookmarks.includes(jobId)
        ? bookmarks.filter(id => id !== jobId)
        : [...bookmarks, jobId];
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Student Skills Profile
  getStudentSkills: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STUDENT_SKILLS);
      return data ? JSON.parse(data) : ['Python', 'JavaScript', 'Git', 'React', 'SQL'];
    } catch {
      return ['Python', 'JavaScript', 'Git', 'React', 'SQL'];
    }
  },

  setStudentSkills: (skills) => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENT_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
  },

  // Application Tracker
  getTracker: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRACKER);
      return data ? JSON.parse(data) : {
        saved: [],
        applied: [],
        interviewing: [],
        offer: [],
        rejected: []
      };
    } catch {
      return {
        saved: [],
        applied: [],
        interviewing: [],
        offer: [],
        rejected: []
      };
    }
  },

  saveTracker: (trackerState) => {
    try {
      localStorage.setItem(STORAGE_KEYS.TRACKER, JSON.stringify(trackerState));
    } catch (e) {
      console.error(e);
    }
  },

  // Custom User-Posted Jobs
  getCustomJobs: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_JOBS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addCustomJob: (newJob) => {
    try {
      const jobs = storageService.getCustomJobs();
      const updated = [newJob, ...jobs];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Theme
  getDarkMode: () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      if (saved !== null) return JSON.parse(saved);
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  },

  setDarkMode: (val) => {
    try {
      localStorage.setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }
};
