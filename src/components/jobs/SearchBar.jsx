import React from 'react';
import { Search, MapPin, X, Sparkles, Filter } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  selectedCategory,
  onResetFilters,
  totalResults,
  onQuickSkillFilter
}) {
  const quickTags = ['🇮🇳 India Roles', 'TCS / Infosys', 'Bengaluru', 'Python', 'React', 'Docker', 'Internship', 'Freshers'];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4 transition-colors">
      <div className="flex flex-col md:flex-row gap-3">
        {/* Main Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by job title, company name, or tech skill (e.g. React, Python, AWS)..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location Search Input */}
        <div className="relative md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Location or 'Remote'..."
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {locationQuery && (
            <button
              onClick={() => setLocationQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Trend Tags & Results summary */}
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            Popular:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onQuickSkillFilter(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-indigo-950/60 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-300 transition-colors border border-slate-200/60 dark:border-slate-700/60 font-medium"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {totalResults} {totalResults === 1 ? 'Job' : 'Jobs'} Found
          </span>
          {(searchQuery || locationQuery || selectedCategory !== 'all') && (
            <button
              onClick={onResetFilters}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
            >
              Reset All
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
