import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Bookmark, 
  CheckCircle2, 
  AlertCircle, 
  GraduationCap, 
  Sparkles, 
  Kanban,
  Gift,
  Clock,
  Briefcase
} from 'lucide-react';
import { jobService } from '../../services/jobService.js';

export default function JobDetailModal({
  job,
  onClose,
  studentSkills = [],
  isBookmarked,
  onToggleBookmark,
  onAddToTracker
}) {
  const [selectedStatus, setSelectedStatus] = useState('applied');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [appliedNotification, setAppliedNotification] = useState(false);

  if (!job) return null;

  const matchScore = jobService.calculateMatchScore(job.skills, studentSkills);
  const { matched, missing } = jobService.getSkillAnalysis(job.skills, studentSkills);

  const handleApplyClick = () => {
    // Automatically add to tracker as applied
    onAddToTracker(job, 'applied');
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3000);
    // Open company career URL in new tab
    if (job.applyUrl) {
      window.open(job.applyUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header Bar */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/50">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${job.companyColor || 'from-indigo-600 to-violet-600'} flex items-center justify-center text-white font-extrabold text-2xl shadow-md flex-shrink-0`}>
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {job.experienceLevel === 'internship' ? 'Student Internship' : job.experienceLevel === 'fresher' ? 'Entry-Level Fresher' : 'Junior Role'}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">
                  {job.workMode}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {job.title}
              </h2>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 mt-1 flex-wrap">
                <span className="font-semibold text-slate-900 dark:text-slate-100">{job.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Top Key Metrics Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
              <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium block">
                Compensation / Stipend
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                {job.salary}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">
                Your Skill Match
              </span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5 block flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {matchScore}% Compatible
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                Eligibility Batch
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1 block">
                {job.batchEligibility || 'All IT Students'}
              </span>
            </div>
          </div>

          {/* Skill Breakdown: Matched vs Missing */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Skill Compatibility Analysis
            </h4>
            
            <div className="space-y-3">
              {/* Matched */}
              <div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Matching Skills You Have ({matched.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {matched.length > 0 ? (
                    matched.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        ✓ {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">None of your current profile skills overlap yet.</span>
                  )}
                </div>
              </div>

              {/* Missing */}
              {missing.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Recommended Skills to Learn ({missing.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Role Overview
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                What You Will Do
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications && job.qualifications.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
                Basic & Preferred Qualifications
              </h4>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                {job.qualifications.map((q, i) => (
                  <li key={i} className="leading-relaxed">
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Student Perks */}
          {job.perks && job.perks.length > 0 && (
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-indigo-500" />
                Student Benefits & Perks
              </h4>
              <div className="flex flex-wrap gap-2">
                {job.perks.map((p, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    ⭐ {p}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          {appliedNotification && (
            <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Job automatically added to your Application Tracker!</span>
            </div>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto ml-auto">
            {/* Save Bookmark */}
            <button
              onClick={() => onToggleBookmark(job.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                isBookmarked
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Direct Apply Button */}
            <button
              onClick={handleApplyClick}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02]"
            >
              <span>Apply Directly</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
