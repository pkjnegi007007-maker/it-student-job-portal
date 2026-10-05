import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import SearchBar from './components/jobs/SearchBar.jsx';
import JobFilters from './components/jobs/JobFilters.jsx';
import JobCard from './components/jobs/JobCard.jsx';
import JobDetailModal from './components/jobs/JobDetailModal.jsx';
import PostJobModal from './components/jobs/PostJobModal.jsx';
import SkillMatcher from './components/matcher/SkillMatcher.jsx';
import ApplicationTracker from './components/tracker/ApplicationTracker.jsx';
import PrepCorner from './components/prep/PrepCorner.jsx';

import { jobService } from './services/jobService.js';
import { storageService } from './services/storageService.js';
import { IT_CATEGORIES } from './data/itCategories.js';
import { Sparkles, Briefcase, GraduationCap, ShieldCheck, ArrowRight, RefreshCw, Zap } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => storageService.getDarkMode());

  // Global app data state
  const [allJobs, setAllJobs] = useState(() => jobService.getLocalJobs());
  const [studentSkills, setStudentSkills] = useState(() => storageService.getStudentSkills());
  const [bookmarks, setBookmarks] = useState(() => storageService.getBookmarks());
  const [tracker, setTracker] = useState(() => storageService.getTracker());

  // Active view tab: 'jobs' | 'matcher' | 'tracker' | 'prep'
  const [activeTab, setActiveTab] = useState('jobs');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [minMatchScore, setMinMatchScore] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  // Modals
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  // Sync theme to HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    storageService.setDarkMode(darkMode);
  }, [darkMode]);

  // Sync skills to storage
  useEffect(() => {
    storageService.setStudentSkills(studentSkills);
  }, [studentSkills]);

  // Attempt live job fetch on initial load
  useEffect(() => {
    const fetchExternal = async () => {
      setIsLoadingLive(true);
      const liveJobs = await jobService.fetchLiveJobs();
      if (liveJobs && liveJobs.length > 0) {
        setAllJobs(prev => {
          // Prevent duplicates by ID
          const existingIds = new Set(prev.map(j => j.id));
          const uniqueLive = liveJobs.filter(j => !existingIds.has(j.id));
          return [...prev, ...uniqueLive];
        });
      }
      setIsLoadingLive(false);
    };
    fetchExternal();
  }, []);

  // Bookmark toggle handler
  const handleToggleBookmark = (jobId) => {
    const updated = storageService.toggleBookmark(jobId);
    setBookmarks(updated);
  };

  // Add job to application tracker
  const handleAddToTracker = (job, stage = 'applied') => {
    const currentTracker = { ...tracker };
    // Check if already in any column
    let alreadyExists = false;
    Object.keys(currentTracker).forEach(col => {
      if (currentTracker[col].some(c => c.id === job.id)) {
        alreadyExists = true;
      }
    });

    if (!alreadyExists) {
      currentTracker[stage] = [
        { ...job, status: stage, addedDate: new Date().toLocaleDateString() },
        ...(currentTracker[stage] || [])
      ];
      setTracker(currentTracker);
      storageService.saveTracker(currentTracker);
    }
  };

  // Tracker state update
  const handleUpdateTracker = (newTracker) => {
    setTracker(newTracker);
    storageService.saveTracker(newTracker);
  };

  // New Custom Job Posted
  const handleAddJob = (newJob) => {
    storageService.addCustomJob(newJob);
    setAllJobs(prev => [newJob, ...prev]);
  };

  // Quick reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setLocationQuery('');
    setSelectedCategory('all');
    setSelectedRegion('all');
    setSelectedLevel('all');
    setSelectedWorkMode('all');
    setMinMatchScore(0);
    setOnlyBookmarked(false);
    setSortBy('featured');
  };

  // Quick skill filter
  const handleQuickSkillFilter = (tag) => {
    setSearchQuery(tag);
    setActiveTab('jobs');
  };

  // Category counts computation
  const categoryCounts = useMemo(() => {
    const counts = { all: allJobs.length };
    IT_CATEGORIES.forEach(c => {
      if (c.id !== 'all') {
        counts[c.id] = allJobs.filter(j => j.category === c.id).length;
      }
    });
    return counts;
  }, [allJobs]);

  // Filtered & Sorted Jobs
  const filteredJobs = useMemo(() => {
    return allJobs
      .filter((job) => {
        // Category
        if (selectedCategory !== 'all' && job.category !== selectedCategory) {
          return false;
        }

        // Region / Country (India vs Global)
        if (selectedRegion !== 'all') {
          const locLower = (job.location || '').toLowerCase();
          const isIndia = job.country === 'India' || 
            locLower.includes('india') || 
            locLower.includes('bengaluru') || 
            locLower.includes('bangalore') || 
            locLower.includes('hyderabad') || 
            locLower.includes('pune') || 
            locLower.includes('chennai') || 
            locLower.includes('mumbai') || 
            locLower.includes('noida') || 
            locLower.includes('delhi');

          if (selectedRegion === 'India' && !isIndia) {
            return false;
          }
          if (selectedRegion === 'Global' && isIndia && !locLower.includes('worldwide') && !locLower.includes('global')) {
            return false;
          }
        }

        // Level
        if (selectedLevel !== 'all' && job.experienceLevel !== selectedLevel) {
          return false;
        }

        // Work Mode
        if (selectedWorkMode !== 'all' && job.workMode !== selectedWorkMode) {
          return false;
        }

        // Bookmarks only
        if (onlyBookmarked && !bookmarks.includes(job.id)) {
          return false;
        }

        // Keyword Search (title, company, description, skills)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = job.title.toLowerCase().includes(q);
          const matchesCompany = job.company.toLowerCase().includes(q);
          const matchesSkills = job.skills.some(s => s.toLowerCase().includes(q));
          const matchesDesc = (job.description || '').toLowerCase().includes(q);
          if (!matchesTitle && !matchesCompany && !matchesSkills && !matchesDesc) {
            return false;
          }
        }

        // Location Search
        if (locationQuery.trim()) {
          const lq = locationQuery.toLowerCase().trim();
          if (!job.location.toLowerCase().includes(lq) && !job.workMode.toLowerCase().includes(lq)) {
            return false;
          }
        }

        // Skill Match Score Threshold
        const matchScore = jobService.calculateMatchScore(job.skills, studentSkills);
        if (minMatchScore > 0 && matchScore < minMatchScore) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') {
          const scoreA = jobService.calculateMatchScore(a.skills, studentSkills);
          const scoreB = jobService.calculateMatchScore(b.skills, studentSkills);
          return scoreB - scoreA;
        }
        if (sortBy === 'stipend') {
          return (b.stipendRaw || 0) - (a.stipendRaw || 0);
        }
        // Default: featured first, then standard order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [
    allJobs,
    selectedCategory,
    selectedRegion,
    selectedLevel,
    selectedWorkMode,
    onlyBookmarked,
    bookmarks,
    searchQuery,
    locationQuery,
    minMatchScore,
    studentSkills,
    sortBy
  ]);

  const totalTrackerCount = Object.values(tracker).reduce((acc, list) => acc + (list ? list.length : 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        bookmarkCount={bookmarks.length}
        trackerCount={totalTrackerCount}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenPostJob={() => setIsPostJobOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* VIEW 1: Find Jobs */}
        {activeTab === 'jobs' && (
          <div className="space-y-8 animate-fade-in">
            {/* Student Hero Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-12 shadow-xl border border-slate-800">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The IT Job Hub for Students & Freshers</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Launch Your Career in <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                    Software, AI, Cloud & Cyber
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                  Cut through senior requirements. Browse verified internships, off-campus drives, and 0-2 year positions curated strictly for college students and recent grads.
                </p>

                {/* Key Value Badges */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>0-2 Years Max Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-400" />
                    <span>2024 - 2027 Batches Eligible</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Match Score Algorithm Included</span>
                  </div>
                </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute right-40 -top-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Search & Location Bar */}
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              locationQuery={locationQuery}
              setLocationQuery={setLocationQuery}
              selectedCategory={selectedCategory}
              onResetFilters={handleResetFilters}
              totalResults={filteredJobs.length}
              onQuickSkillFilter={handleQuickSkillFilter}
            />

            {/* IT Category Pills & Secondary Filters */}
            <JobFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedWorkMode={selectedWorkMode}
              setSelectedWorkMode={setSelectedWorkMode}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onlyBookmarked={onlyBookmarked}
              setOnlyBookmarked={setOnlyBookmarked}
              minMatchScore={minMatchScore}
              setMinMatchScore={setMinMatchScore}
              categoryCounts={categoryCounts}
            />

            {/* Live Feed Status indicator if loading */}
            {isLoadingLive && (
              <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-xs font-medium text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Checking live tech feeds for new remote developer positions...</span>
              </div>
            )}

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
                <Briefcase className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
                  No matching IT opportunities found
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Try clearing your search terms or lowering your minimum skill match percentage.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    studentSkills={studentSkills}
                    isBookmarked={bookmarks.includes(job.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onSelectJob={(j) => setSelectedJob(j)}
                    onAddToTracker={handleAddToTracker}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Skill Matcher */}
        {activeTab === 'matcher' && (
          <SkillMatcher
            studentSkills={studentSkills}
            setStudentSkills={setStudentSkills}
            allJobs={allJobs}
            onSelectJob={(j) => setSelectedJob(j)}
            onToggleBookmark={handleToggleBookmark}
            bookmarks={bookmarks}
            onAddToTracker={handleAddToTracker}
          />
        )}

        {/* VIEW 3: Application Tracker */}
        {activeTab === 'tracker' && (
          <ApplicationTracker
            tracker={tracker}
            onUpdateTracker={handleUpdateTracker}
            onSelectJob={(j) => setSelectedJob(j)}
          />
        )}

        {/* VIEW 4: Prep Corner */}
        {activeTab === 'prep' && (
          <PrepCorner />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => setSelectedCategory(catId)}
        onSelectTab={(tabId) => setActiveTab(tabId)}
      />

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          studentSkills={studentSkills}
          isBookmarked={bookmarks.includes(selectedJob.id)}
          onToggleBookmark={handleToggleBookmark}
          onAddToTracker={handleAddToTracker}
        />
      )}

      {/* Post a Job Modal */}
      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onAddJob={handleAddJob}
      />
    </div>
  );
}
