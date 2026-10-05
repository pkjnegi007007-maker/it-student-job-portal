import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code2, 
  FileText, 
  CheckSquare, 
  Terminal, 
  Sparkles, 
  BookOpen, 
  Award,
  ChevronRight,
  Copy,
  Check
} from 'lucide-react';
import { PREP_RESOURCES } from '../../data/prepResources.js';

export default function PrepCorner() {
  const [activeSubTab, setActiveSubTab] = useState('dsa');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Student Interview Accelerator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black mb-2">
          Technical Interview & Career Preparation Corner
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Master the highest-frequency coding patterns, craft an ATS-friendly Google-standard tech resume, and ace technical rounds.
        </p>
      </div>

      {/* Sub navigation tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto pb-1 text-sm font-semibold">
        <button
          onClick={() => setActiveSubTab('dsa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-all ${
            activeSubTab === 'dsa'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>DSA & Coding Patterns</span>
        </button>

        <button
          onClick={() => setActiveSubTab('resume')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-all ${
            activeSubTab === 'resume'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Google XYZ Resume Blueprint</span>
        </button>

        <button
          onClick={() => setActiveSubTab('checklist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl border-b-2 transition-all ${
            activeSubTab === 'checklist'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>Interview Round Checklist</span>
        </button>
      </div>

      {/* Content for DSA Patterns */}
      {activeSubTab === 'dsa' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3">
            <Terminal className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 dark:text-indigo-200">
              <span className="font-bold">Workspace Connection: </span>
              Your project workspace contains <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono font-semibold">array_solutions.py</code> with 24 optimal Python solutions covering foundational to hard array interview questions.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PREP_RESOURCES.dsaPatterns.map((pattern, index) => (
              <div
                key={pattern.title}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                    {pattern.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    {pattern.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {pattern.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pattern.summary}
                </p>

                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200">
                  <span className="font-bold">💡 Pro Tip: </span>
                  {pattern.tips}
                </div>

                {pattern.codeSample && (
                  <div className="relative rounded-xl bg-slate-950 p-3 text-slate-200 font-mono text-[11px] overflow-x-auto">
                    <button
                      onClick={() => handleCopyCode(pattern.codeSample, index)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Copy code snippet"
                    >
                      {copiedIndex === index ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <pre>{pattern.codeSample}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Resume Blueprint */}
      {activeSubTab === 'resume' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PREP_RESOURCES.resumeTips.map((tip, index) => (
              <div
                key={tip.rule}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {tip.rule}
                  </h3>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono text-indigo-600 dark:text-indigo-300">
                  {tip.formula}
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Good Resume Bullet Example:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 bg-emerald-50/50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800/60 leading-relaxed font-medium">
                    "{tip.example}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content for Checklist */}
      {activeSubTab === 'checklist' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREP_RESOURCES.interviewChecklist.map((group) => (
              <div
                key={group.stage}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
              >
                <h3 className="font-bold text-sm text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
                  {group.stage}
                </h3>

                <ul className="space-y-2.5">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <div className="w-4 h-4 rounded border border-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-600">
                        ✓
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
