import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  X, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  ExternalLink,
  Award,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ALL_POPULAR_SKILLS } from '../../data/itCategories.js';
import { jobService } from '../../services/jobService.js';
import JobCard from '../jobs/JobCard.jsx';

export default function SkillMatcher({
  studentSkills = [],
  setStudentSkills,
  allJobs = [],
  onSelectJob,
  onToggleBookmark,
  bookmarks = [],
  onAddToTracker
}) {
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [parsedSkillsCount, setParsedSkillsCount] = useState(0);

  // Add a skill
  const handleAddSkill = (skill) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (!studentSkills.some(s => s.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...studentSkills, trimmed];
      setStudentSkills(updated);
    }
    setCustomSkillInput('');
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove) => {
    const updated = studentSkills.filter(s => s !== skillToRemove);
    setStudentSkills(updated);
  };

  // Auto-extract skills from pasted resume or text
  const handleExtractFromResume = () => {
    if (!resumeText.trim()) return;

    const lowerText = resumeText.toLowerCase();
    const foundSkills = [];

    ALL_POPULAR_SKILLS.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      // Match whole word or exact substring
      if (lowerText.includes(lowerSkill)) {
        if (!studentSkills.some(s => s.toLowerCase() === lowerSkill)) {
          foundSkills.push(skill);
        }
      }
    });

    if (foundSkills.length > 0) {
      const updated = [...studentSkills, ...foundSkills];
      setStudentSkills(updated);
      setParsedSkillsCount(foundSkills.length);
      setTimeout(() => setParsedSkillsCount(0), 4000);
    }
  };

  // Calculate job rankings
  const rankedJobs = allJobs.map(job => {
    const matchScore = jobService.calculateMatchScore(job.skills, studentSkills);
    return { ...job, matchScore };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Missing Skill Insights (which unselected skill is most requested across all jobs)
  const missingSkillFrequency = {};
  const lowerCurrent = studentSkills.map(s => s.toLowerCase());

  allJobs.forEach(job => {
    job.skills.forEach(skill => {
      const lower = skill.toLowerCase();
      if (!lowerCurrent.includes(lower)) {
        missingSkillFrequency[skill] = (missingSkillFrequency[skill] || 0) + 1;
      }
    });
  });

  const topMissingSkills = Object.entries(missingSkillFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-6 sm:p-10 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold mb-4 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI-Powered IT Career Matcher</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Match Your Skills to High-Paying IT Roles
          </h2>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
            Select your technical stack or paste bullet points from your resume. Our match algorithm compares your profile against active internships and fresher roles in real time.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Interactive Skill Selection & Resume Parser */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Selected Skills & Adders */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Skills Pill Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" />
                <span>Your Active Tech Stack ({studentSkills.length})</span>
              </h3>
              {studentSkills.length > 0 && (
                <button
                  onClick={() => setStudentSkills([])}
                  className="text-xs text-rose-500 hover:underline font-medium"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Current Skills Chips */}
            <div className="flex flex-wrap gap-2 min-h-[48px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 mb-4">
              {studentSkills.length === 0 ? (
                <p className="text-xs text-slate-400 italic self-center">
                  No skills selected yet. Click any skill below or paste your resume text to get started!
                </p>
              ) : (
                studentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 transition-colors animate-scale-in"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:text-indigo-200"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Custom Input Field */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill (e.g. Next.js, Kubernetes, Flutter)..."
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(customSkillInput)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={() => handleAddSkill(customSkillInput)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Add Popular Skills */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-2.5">
                Popular Student Skills (Click to toggle):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {ALL_POPULAR_SKILLS.map((skill) => {
                  const isSelected = studentSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => isSelected ? handleRemoveSkill(skill) : handleAddSkill(skill)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Resume Parser & Market Insights */}
        <div className="space-y-6">
          {/* Quick Resume Skills Extractor */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-indigo-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Resume Skill Extractor
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                Paste your resume's summary, project bullet points, or coursework. We will automatically detect your tech tools!
              </p>

              <textarea
                rows="4"
                placeholder="e.g. Developed a full-stack e-commerce app using React, Node.js, Express, and MongoDB. Wrote Python data analysis scripts with Pandas and SQL..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />

              {parsedSkillsCount > 0 && (
                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Discovered & added {parsedSkillsCount} new skills!</span>
                </div>
              )}
            </div>

            <button
              onClick={handleExtractFromResume}
              disabled={!resumeText.trim()}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Extract My Skills</span>
            </button>
          </div>

          {/* High-Impact Skill Opportunities */}
          {topMissingSkills.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl p-5 border border-amber-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  High-Demand Skill Boost
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                Learning these tools will qualify you for the most student openings right now:
              </p>
              <div className="space-y-1.5">
                {topMissingSkills.map(([skill, count]) => (
                  <div key={skill} className="flex items-center justify-between text-xs bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-slate-700">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{skill}</span>
                    <button
                      onClick={() => handleAddSkill(skill)}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                    >
                      <span>In {count} roles</span>
                      <Plus className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ranked Job Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Roles Matching Your Tech Stack
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sorted by highest compatibility percentage
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {rankedJobs.length} Positions Analyzed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rankedJobs.slice(0, 9).map((job) => (
            <JobCard
              key={job.id}
              job={job}
              studentSkills={studentSkills}
              isBookmarked={bookmarks.includes(job.id)}
              onToggleBookmark={onToggleBookmark}
              onSelectJob={onSelectJob}
              onAddToTracker={onAddToTracker}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
