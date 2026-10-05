import React from 'react';
import { Compass, Heart, Github, ExternalLink, GraduationCap, ShieldCheck } from 'lucide-react';

export default function Footer({ onSelectCategory, onSelectTab }) {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 py-12 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                ITCareerHub
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Curated IT internships, apprentice programs, and entry-level positions tailored strictly for students, fresh graduates, and self-taught developers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Student-Friendly (0 - 2 Yrs Exp)</span>
            </div>
          </div>

          {/* Quick Domain Links */}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 tracking-wide uppercase text-xs">
              IT Job Domains
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { onSelectTab('jobs'); onSelectCategory('software-eng'); }} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Software Engineering
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('jobs'); onSelectCategory('ai-data'); }} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  AI & Data Science
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('jobs'); onSelectCategory('devops-cloud'); }} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Cloud & DevOps
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('jobs'); onSelectCategory('cybersecurity'); }} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Cybersecurity & SOC
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onSelectTab('jobs'); onSelectCategory('qa-testing'); }} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  QA & Test Automation
                </button>
              </li>
            </ul>
          </div>

          {/* Student Tools */}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 tracking-wide uppercase text-xs">
              Student Career Tools
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => onSelectTab('matcher')} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Skill & Resume Matcher
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('tracker')} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Application Kanban Tracker
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('prep')} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  DSA & Interview Prep Corner
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectTab('prep')} 
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  Google XYZ Resume Blueprint
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Verification */}
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-3 tracking-wide uppercase text-xs">
              Open Student Community
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
              Never pay for an internship or job placement. Verified genuine student opportunities only.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-1">
                DSA Interview Question Bank:
              </span>
              <span className="text-slate-500 dark:text-slate-400">
                24 optimal array problem patterns included in your workspace for practice.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ITCareerHub. Built to empower student developers & IT aspirants.</p>
          <div className="flex items-center gap-1">
            <span>Built with passion & optimal engineering</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 ml-1 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
