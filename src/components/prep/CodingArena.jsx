import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Lightbulb, 
  BookOpen, 
  Code2, 
  Terminal, 
  Check, 
  Copy, 
  Sparkles, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  Trophy,
  Building2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { PRACTICE_QUESTIONS, PRACTICE_CATEGORIES } from '../../data/practiceQuestions.js';
import { codeRunnerService } from '../../services/codeRunnerService.js';
import { storageService } from '../../services/storageService.js';

export default function CodingArena() {
  // Question selection & filtering
  const [selectedQuestionId, setSelectedQuestionId] = useState(PRACTICE_QUESTIONS[0].id);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSolved, setFilterSolved] = useState('all'); // 'all' | 'solved' | 'unsolved'

  // User state
  const [solvedList, setSolvedList] = useState(() => storageService.getSolvedQuestions());
  const currentQuestion = useMemo(
    () => PRACTICE_QUESTIONS.find(q => q.id === selectedQuestionId) || PRACTICE_QUESTIONS[0],
    [selectedQuestionId]
  );

  // Code state
  const [code, setCode] = useState(() => 
    storageService.getQuestionDraft(currentQuestion.id, currentQuestion.starterCode)
  );
  const [isCopied, setIsCopied] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  // Execution state
  const [isRunning, setIsRunning] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [activeTestTab, setActiveTestTab] = useState(0);
  const [activeConsoleTab, setActiveConsoleTab] = useState('tests'); // 'tests' | 'console'

  const textareaRef = useRef(null);

  // Sync code whenever currentQuestion changes
  useEffect(() => {
    setCode(storageService.getQuestionDraft(currentQuestion.id, currentQuestion.starterCode));
    setRunResult(null);
    setShowHints(false);
    setShowSolution(false);
    setActiveTestTab(0);
    setActiveConsoleTab('tests');
  }, [currentQuestion.id]);

  // Handle code change and auto-save draft
  const handleCodeChange = (e) => {
    const val = e.target.value;
    setCode(val);
    storageService.saveQuestionDraft(currentQuestion.id, val);
  };

  // Allow tab key indentation in editor
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      storageService.saveQuestionDraft(currentQuestion.id, newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Reset code to starter template
  const handleResetCode = () => {
    const defaultCode = storageService.resetQuestionDraft(currentQuestion.id, currentQuestion.starterCode);
    setCode(defaultCode);
    setRunResult(null);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Run test suite
  const handleRunCode = () => {
    setIsRunning(true);
    setActiveConsoleTab('tests');

    setTimeout(() => {
      const output = codeRunnerService.run(
        code,
        currentQuestion.functionName,
        currentQuestion.testCases,
        currentQuestion.compareType
      );

      setRunResult(output);
      setIsRunning(false);

      if (output.allPassed) {
        // Mark as solved
        const updated = storageService.markQuestionSolved(currentQuestion.id, true);
        setSolvedList(updated);

        // Fire celebratory confetti!
        try {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.log(e);
        }
      }
    }, 150);
  };

  // Toggle solved manually
  const handleToggleSolved = (qId) => {
    const updated = storageService.toggleQuestionSolved(qId);
    setSolvedList(updated);
  };

  // Filter questions list
  const filteredQuestions = useMemo(() => {
    return PRACTICE_QUESTIONS.filter(q => {
      const matchCat = selectedCategory === 'All' || q.category === selectedCategory;
      const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      const isSolved = solvedList.includes(q.id);
      const matchSolved = 
        filterSolved === 'all' || 
        (filterSolved === 'solved' && isSolved) || 
        (filterSolved === 'unsolved' && !isSolved);
      const matchQuery = 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.companies.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCat && matchDiff && matchSolved && matchQuery;
    });
  }, [selectedCategory, selectedDifficulty, filterSolved, searchQuery, solvedList]);

  // Solved statistics
  const totalQuestions = PRACTICE_QUESTIONS.length;
  const solvedCount = solvedList.length;
  const progressPercent = Math.round((solvedCount / totalQuestions) * 100);

  const isCurrentSolved = solvedList.includes(currentQuestion.id);

  return (
    <div className="space-y-6">
      {/* Top Stats & Progress Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Student Coding Practice Arena
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {solvedCount} / {totalQuestions} Solved ({progressPercent}%)
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Write real code in the browser, run automated test suites, or jump directly into LeetCode & GeeksforGeeks.
              </p>
            </div>
          </div>

          {/* Quick External Platforms Hub */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-400">Practice Hubs:</span>
            <a
              href="https://leetcode.com/problemset/all/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-700 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-all"
            >
              <span>LeetCode</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.geeksforgeeks.org/explore?page=1&sortBy=submissions"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all"
            >
              <span>GeeksforGeeks</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://neetcode.io/practice"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all"
            >
              <span>NeetCode 150</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Progress meter bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mt-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Split Layout: Left Problem Explorer & Right In-Browser Code IDE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Problem Details & Problem Selector */}
        <div className="lg:col-span-5 space-y-4">

          {/* Problem Selector Dropdown & Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search questions or companies (e.g. Amazon)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-900 dark:text-white"
                />
              </div>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">All Diff</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
              </select>

              <select
                value={filterSolved}
                onChange={(e) => setFilterSolved(e.target.value)}
                className="text-xs py-1.5 px-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="all">All</option>
                <option value="solved">Solved</option>
                <option value="unsolved">Unsolved</option>
              </select>
            </div>

            {/* Questions horizontal pill scroll */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {filteredQuestions.map((q) => {
                const isSelected = q.id === currentQuestion.id;
                const isSolved = solvedList.includes(q.id);
                return (
                  <button
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {isSolved ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-300' : 'text-emerald-500'}`} />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-indigo-300' : 'bg-slate-400'}`} />
                    )}
                    <span>{q.title.split('.')[1] || q.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Current Problem Details Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5 max-h-[750px] overflow-y-auto">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  currentQuestion.difficulty === 'Easy'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800'
                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800'
                }`}>
                  {currentQuestion.difficulty}
                </span>

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Acceptance: {currentQuestion.acceptance}
                </span>

                <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                  {currentQuestion.category}
                </span>

                <button
                  onClick={() => handleToggleSolved(currentQuestion.id)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-xl transition-all border ${
                    isCurrentSolved
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                  title="Toggle solved status"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isCurrentSolved ? 'Solved ✓' : 'Mark Solved'}</span>
                </button>
              </div>

              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {currentQuestion.title}
              </h2>
            </div>

            {/* External Platform Deep Links */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Practice on External Platforms:
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <a
                  href={currentQuestion.externalLinks.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all"
                >
                  <span>Solve on LeetCode</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={currentQuestion.externalLinks.gfg}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
                >
                  <span>GeeksforGeeks</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={currentQuestion.externalLinks.neetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
                >
                  <span>NeetCode</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Companies hiring with this question */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <div className="flex items-center gap-1 text-slate-400">
                <Building2 className="w-3.5 h-3.5" />
                <span className="font-semibold">Frequently Asked By:</span>
              </div>
              {currentQuestion.companies.map((comp) => (
                <span
                  key={comp}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-[11px]"
                >
                  {comp}
                </span>
              ))}
            </div>

            {/* Problem Statement */}
            <div className="space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">
              <p>{currentQuestion.description}</p>
            </div>

            {/* Examples */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Examples:
              </h4>
              {currentQuestion.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1"
                >
                  <div>
                    <span className="font-bold text-slate-500">Input: </span>
                    <span className="text-slate-800 dark:text-slate-200">{ex.input}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500">Output: </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-[11px] font-sans text-slate-500 dark:text-slate-400 pt-1">
                      <span className="font-semibold">Explanation: </span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Constraints:
              </h4>
              <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono text-[11px]">
                {currentQuestion.constraints.map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hints Accordion */}
            <div className="border border-indigo-100 dark:border-indigo-950/80 rounded-2xl overflow-hidden bg-indigo-50/40 dark:bg-indigo-950/20">
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200 hover:bg-indigo-50/80 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Interview Hints ({currentQuestion.hints.length})</span>
                </div>
                {showHints ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showHints && (
                <div className="p-3.5 pt-0 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {currentQuestion.hints.map((hint, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">💡 Hint {idx + 1}:</span>
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Official Solution Disclosure */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full p-3.5 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-500" />
                  <span>Reveal Optimal Solution & Complexity</span>
                </div>
                {showSolution ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showSolution && (
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2.5 py-1 rounded-lg font-mono font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      Time: {currentQuestion.optimalSolution.time}
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-lg font-mono font-bold bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      Space: {currentQuestion.optimalSolution.space}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentQuestion.optimalSolution.explanation}
                  </p>

                  <div className="relative rounded-xl bg-slate-950 p-3 text-slate-200 font-mono text-[11px] overflow-x-auto">
                    <pre>{currentQuestion.optimalSolution.code}</pre>
                    <button
                      onClick={() => {
                        setCode(currentQuestion.optimalSolution.code);
                        storageService.saveQuestionDraft(currentQuestion.id, currentQuestion.optimalSolution.code);
                      }}
                      className="mt-2 text-[11px] font-sans font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <ArrowRight className="w-3 h-3" />
                      <span>Load Solution into Code Editor</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Code IDE & Test Runner Panel */}
        <div className="lg:col-span-7 space-y-4">

          {/* IDE Editor Container */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden flex flex-col">
            
            {/* Editor Toolbar Header */}
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400 ml-2">
                  solution.js
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">
                  JavaScript ES6+
                </span>
              </div>

              {/* Action utilities */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Reset to starter template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Copy code"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Code input area */}
            <div className="relative p-2 bg-slate-900 font-mono text-xs">
              <textarea
                ref={textareaRef}
                value={code}
                onChange={handleCodeChange}
                onKeyDown={handleKeyDown}
                rows={16}
                spellCheck={false}
                className="w-full bg-transparent text-slate-100 font-mono text-xs leading-relaxed focus:outline-none resize-none p-3 selection:bg-indigo-600/50"
                placeholder="// Write your solution here..."
              />
            </div>

            {/* Editor Bottom Bar: Run Button & Auto-save Status */}
            <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-sans">
                <span>Tab for indent</span>
                <span>•</span>
                <span>Auto-saved to browser</span>
              </div>

              <div className="flex items-center gap-3">
                {runResult && (
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{runResult.executionTimeMs} ms</span>
                  </div>
                )}

                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 shadow-md shadow-emerald-600/25 transition-all disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-white'}`} />
                  <span>{isRunning ? 'Running...' : 'Run Test Cases'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Case Results & Console Panel */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-4">
            
            {/* Header Tabs: Test Cases vs Console Output */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveConsoleTab('tests')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeConsoleTab === 'tests'
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <CheckSquareIcon className="w-3.5 h-3.5" />
                  <span>Test Cases</span>
                  {runResult && (
                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      runResult.allPassed
                        ? 'bg-emerald-500 text-white'
                        : 'bg-rose-500 text-white'
                    }`}>
                      {runResult.results.filter(r => r.passed).length}/{runResult.results.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveConsoleTab('console')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeConsoleTab === 'console'
                      ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Console Logs</span>
                  {runResult?.logs?.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {runResult.logs.length}
                    </span>
                  )}
                </button>
              </div>

              {runResult && (
                <div>
                  {runResult.allPassed ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      Passed All Tests
                    </span>
                  ) : runResult.error ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      <AlertCircle className="w-3 h-3 text-rose-500" />
                      Compilation Error
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      <XCircle className="w-3 h-3 text-amber-500" />
                      Wrong Answer
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* TAB CONTENT 1: Test Cases & Execution Diff */}
            {activeConsoleTab === 'tests' && (
              <div className="space-y-4">
                {runResult?.error ? (
                  <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-mono text-rose-700 dark:text-rose-300 space-y-1">
                    <div className="font-bold font-sans flex items-center gap-1.5 text-rose-800 dark:text-rose-200">
                      <AlertCircle className="w-4 h-4" />
                      <span>Execution Error:</span>
                    </div>
                    <div>{runResult.error}</div>
                  </div>
                ) : (
                  <>
                    {/* Test Case Tab Selector */}
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {currentQuestion.testCases.map((tc, idx) => {
                        const result = runResult?.results?.[idx];
                        const isSelected = activeTestTab === idx;

                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveTestTab(idx)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                              isSelected
                                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-transparent shadow-sm'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                            }`}
                          >
                            {result ? (
                              result.passed ? (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                              )
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                            )}
                            <span>Case {idx + 1}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Test Case Detail */}
                    {(() => {
                      const activeTestCase = currentQuestion.testCases[activeTestTab];
                      const activeResult = runResult?.results?.[activeTestTab];

                      return (
                        <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                          <div className="flex items-center justify-between text-slate-500 font-sans font-semibold text-[11px]">
                            <span>{activeTestCase.description || `Test Case ${activeTestTab + 1}`}</span>
                            {activeResult && (
                              <span className={`font-bold ${activeResult.passed ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {activeResult.passed ? 'PASSED ✓' : 'FAILED ✗'}
                              </span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                              Input:
                            </span>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 overflow-x-auto">
                              {JSON.stringify(activeTestCase.input)}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                                Expected Output:
                              </span>
                              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-bold overflow-x-auto">
                                {JSON.stringify(activeTestCase.expected)}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">
                                Your Output:
                              </span>
                              <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 border overflow-x-auto ${
                                activeResult
                                  ? activeResult.passed
                                    ? 'border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 font-bold'
                                    : 'border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 font-bold'
                                  : 'border-slate-200 dark:border-slate-800 text-slate-400'
                              }`}>
                                {activeResult ? activeResult.actualFormatted : 'Run code to see output'}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </>
                )}
              </div>
            )}

            {/* TAB CONTENT 2: Console Logs Output */}
            {activeConsoleTab === 'console' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 min-h-[140px] max-h-[220px] overflow-y-auto">
                {runResult?.logs?.length > 0 ? (
                  <div className="space-y-1">
                    {runResult.logs.map((log, i) => (
                      <div key={i} className="text-slate-300">
                        <span className="text-slate-600 mr-2">&gt;</span>
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">
                    No console.log outputs captured. Call <code className="text-slate-400">console.log(...)</code> in your code to debug.
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

function CheckSquareIcon(props) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}
