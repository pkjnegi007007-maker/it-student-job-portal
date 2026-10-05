import React from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Bookmark, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { jobService } from '../../services/jobService.js';

export default function JobCard({
  job,
  studentSkills = [],
  isBookmarked,
  onToggleBookmark,
  onSelectJob,
  onAddToTracker
}) {
  const matchScore = jobService.calculateMatchScore(job.skills, studentSkills);
  const { matched, missing } = jobService.getSkillAnalysis(job.skills, studentSkills);

  // Match badge color logic
  const getMatchBadge = (score) => {
    if (score >= 70) {
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300',
        dot: 'bg-emerald-500'
      };
    }
    if (score >= 40) {
      return {
        bg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300',
        dot: 'bg-amber-500'
      };
    }
    return {
      bg: 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400',
      dot: 'bg-slate-400'
    };
  };

  const badgeStyle = getMatchBadge(matchScore);

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700/80 transition-all duration-200 flex flex-col justify-between">
      {/* Top Meta Header: Badges & Bookmark */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Match Score Badge */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${badgeStyle.bg}`}>
              <span className={`w-2 h-2 rounded-full ${badgeStyle.dot} animate-pulse`} />
              <span>{matchScore}% Match</span>
            </div>

            {/* Urgent / Hot Badge */}
            {job.isUrgent && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-900">
                Fast Hiring
              </span>
            )}

            {/* Featured */}
            {job.featured && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(job.id);
            }}
            title={isBookmarked ? 'Remove bookmark' : 'Save job'}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-indigo-600 text-indigo-600' : ''}`} />
          </button>
        </div>

        {/* Company Avatar & Job Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${job.companyColor || 'from-indigo-600 to-violet-600'} flex items-center justify-center text-white font-black text-lg shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform`}>
            {job.company.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <h3 
              onClick={() => onSelectJob(job)}
              className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
            >
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{job.company}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                {job.location}
              </span>
            </div>
          </div>
        </div>

        {/* Key Job Metrics: Salary & Batch Eligibility */}
        <div className="space-y-2 mb-4 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400">Stipend / Salary:</span>
            <span className="font-bold text-slate-900 dark:text-white">{job.salary}</span>
          </div>

          {job.batchEligibility && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3 h-3 text-indigo-500" />
                Batch / Eligibility:
              </span>
              <span className="font-medium text-indigo-600 dark:text-indigo-400 truncate max-w-[180px]">
                {job.batchEligibility}
              </span>
            </div>
          )}
        </div>

        {/* Skill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 5).map((skill) => {
            const hasSkill = matched.includes(skill);
            return (
              <span
                key={skill}
                className={`text-[11px] font-medium px-2 py-0.5 rounded-md border transition-colors ${
                  hasSkill
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {hasSkill && <span className="mr-1 text-emerald-500">✓</span>}
                {skill}
              </span>
            );
          })}
          {job.skills.length > 5 && (
            <span className="text-[11px] text-slate-400 self-center">
              +{job.skills.length - 5} more
            </span>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {job.postedDate}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectJob(job)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onAddToTracker(job, 'applied')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
