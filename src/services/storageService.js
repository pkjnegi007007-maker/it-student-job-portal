const STORAGE_KEYS = {
  BOOKMARKS: 'itcareerhub_bookmarks',
  TRACKER: 'itcareerhub_application_tracker',
  STUDENT_SKILLS: 'itcareerhub_student_skills',
  CUSTOM_JOBS: 'itcareerhub_custom_posted_jobs',
  DARK_MODE: 'itcareerhub_dark_mode',
  SOLVED_QUESTIONS: 'itcareerhub_solved_questions',
  PRACTICE_DRAFTS: 'itcareerhub_practice_drafts'
};

const memoryStore = {};

const getStorage = () => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const testKey = '__test_storage__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch {
    // Fall back to memory store if localStorage is disabled or throws
  }

  return {
    getItem: (key) => (Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null),
    setItem: (key, val) => { memoryStore[key] = String(val); },
    removeItem: (key) => { delete memoryStore[key]; },
    clear: () => { Object.keys(memoryStore).forEach(k => delete memoryStore[k]); }
  };
};

export const storageService = {
  // Bookmarks
  getBookmarks: () => {
    try {
      const data = getStorage().getItem(STORAGE_KEYS.BOOKMARKS);
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
      getStorage().setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Student Skills Profile
  getStudentSkills: () => {
    try {
      const data = getStorage().getItem(STORAGE_KEYS.STUDENT_SKILLS);
      return data ? JSON.parse(data) : ['Python', 'JavaScript', 'Git', 'React', 'SQL'];
    } catch {
      return ['Python', 'JavaScript', 'Git', 'React', 'SQL'];
    }
  },

  setStudentSkills: (skills) => {
    try {
      getStorage().setItem(STORAGE_KEYS.STUDENT_SKILLS, JSON.stringify(skills));
    } catch (e) {
      console.error(e);
    }
  },

  // Application Tracker
  getTracker: () => {
    try {
      const data = getStorage().getItem(STORAGE_KEYS.TRACKER);
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
      getStorage().setItem(STORAGE_KEYS.TRACKER, JSON.stringify(trackerState));
    } catch (e) {
      console.error(e);
    }
  },

  // Custom User-Posted Jobs
  getCustomJobs: () => {
    try {
      const data = getStorage().getItem(STORAGE_KEYS.CUSTOM_JOBS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addCustomJob: (newJob) => {
    try {
      const jobs = storageService.getCustomJobs();
      const updated = [newJob, ...jobs];
      getStorage().setItem(STORAGE_KEYS.CUSTOM_JOBS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  // Theme
  getDarkMode: () => {
    try {
      const saved = getStorage().getItem(STORAGE_KEYS.DARK_MODE);
      if (saved !== null) return JSON.parse(saved);
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      return false;
    } catch {
      return false;
    }
  },

  setDarkMode: (val) => {
    try {
      getStorage().setItem(STORAGE_KEYS.DARK_MODE, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  },

  // Practice Coding Arena
  getSolvedQuestions: () => {
    try {
      const data = getStorage().getItem(STORAGE_KEYS.SOLVED_QUESTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  toggleQuestionSolved: (questionId) => {
    try {
      const solved = storageService.getSolvedQuestions();
      const updated = solved.includes(questionId)
        ? solved.filter(id => id !== questionId)
        : [...solved, questionId];
      getStorage().setItem(STORAGE_KEYS.SOLVED_QUESTIONS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  markQuestionSolved: (questionId, isSolved = true) => {
    try {
      const solved = storageService.getSolvedQuestions();
      let updated;
      if (isSolved && !solved.includes(questionId)) {
        updated = [...solved, questionId];
      } else if (!isSolved && solved.includes(questionId)) {
        updated = solved.filter(id => id !== questionId);
      } else {
        return solved;
      }
      getStorage().setItem(STORAGE_KEYS.SOLVED_QUESTIONS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  getQuestionDraft: (questionId, defaultCode) => {
    try {
      const drafts = JSON.parse(getStorage().getItem(STORAGE_KEYS.PRACTICE_DRAFTS) || '{}');
      return drafts[questionId] !== undefined ? drafts[questionId] : defaultCode;
    } catch {
      return defaultCode;
    }
  },

  saveQuestionDraft: (questionId, code) => {
    try {
      const drafts = JSON.parse(getStorage().getItem(STORAGE_KEYS.PRACTICE_DRAFTS) || '{}');
      drafts[questionId] = code;
      getStorage().setItem(STORAGE_KEYS.PRACTICE_DRAFTS, JSON.stringify(drafts));
    } catch (e) {
      console.error(e);
    }
  },

  resetQuestionDraft: (questionId, defaultCode) => {
    try {
      const drafts = JSON.parse(getStorage().getItem(STORAGE_KEYS.PRACTICE_DRAFTS) || '{}');
      delete drafts[questionId];
      getStorage().setItem(STORAGE_KEYS.PRACTICE_DRAFTS, JSON.stringify(drafts));
      return defaultCode;
    } catch {
      return defaultCode;
    }
  }
};
