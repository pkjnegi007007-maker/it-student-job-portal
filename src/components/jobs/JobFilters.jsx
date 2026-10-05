import React from 'react';
import { 
  Sparkles, 
  Code2, 
  BrainCircuit, 
  Cloud, 
  ShieldCheck, 
  Bug, 
  Palette, 
  Headphones,
  SlidersHorizontal,
  Bookmark,
  TrendingUp,
  Percent,
  Globe2
} from 'lucide-react';
import { IT_CATEGORIES, EXPERIENCE_LEVELS, WORK_MODES } from '../../data/itCategories.js';

const ICON_MAP = {
  Sparkles,
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Bug,
  Palette,
  Headphones
};

export default function JobFilters({
  selectedCategory,
  setSelectedCategory,
  selectedLevel,
  setSelectedLevel,
  selectedWorkMode,
  setSelectedWorkMode,
  selectedRegion,
  setSelectedRegion,
  sortBy,
  setSortBy,
  onlyBookmarked,
  setOnlyBookmarked,
  minMatchScore,
  setMinMatchScore,
  categoryCounts = {}
}) {
  const REGIONS = [
    { id: 'all', label: 'All Locations' },
    { id: 'India', label: '🇮🇳 India Roles' },
    { id: 'Global', label: '🌐 Global / Remote' }
  ];

  return (
    <div className="space-y-4">
      {/* Category Pills Slider / Grid */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-2 min-w-max">
          {IT_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Sparkles;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-600/30'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-500'}`} />
                <span>{cat.name}</span>
                {count > 0 && (
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Region, Experience Level & Work Mode Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Region / Country Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Region:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {REGIONS.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegion(reg.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedRegion === reg.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {reg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Level:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {EXPERIENCE_LEVELS.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevel(lvl.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedLevel === lvl.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {lvl.id === 'all' ? 'All Levels' : lvl.id === 'internship' ? 'Internship' : lvl.id === 'fresher' ? 'Fresher (0 yr)' : 'Junior'}
                </button>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium">Mode:</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              {WORK_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedWorkMode(mode.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    selectedWorkMode === mode.id
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {mode.id === 'all' ? 'Any' : mode.id === 'remote' ? 'Remote' : mode.id === 'hybrid' ? 'Hybrid' : 'On-site'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Filter Settings: Bookmarks toggle, Minimum Match slider, Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Saved Only Filter */}
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
              onlyBookmarked
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-indigo-600' : ''}`} />
            <span>Saved Only</span>
          </button>

          {/* Min Match Filter Slider */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <Percent className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Match &ge; {minMatchScore}%
            </span>
            <input
              type="range"
              min="0"
              max="80"
              step="20"
              value={minMatchScore}
              onChange={(e) => setMinMatchScore(Number(e.target.value))}
              className="w-16 accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="featured">Featured & Latest</option>
              <option value="match">Highest Skill Match</option>
              <option value="stipend">Highest Pay / Stipend</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
