import React, { useState } from 'react';
import { 
  Kanban, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Calendar, 
  FileEdit, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Trophy, 
  ExternalLink,
  Building2,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

const COLUMNS = [
  { id: 'saved', title: 'Wishlist / To Apply', color: 'border-slate-300 dark:border-slate-700', badge: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
  { id: 'applied', title: 'Applied / In Review', color: 'border-blue-400 dark:border-blue-600', badge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
  { id: 'interviewing', title: 'Interview / OA Round', color: 'border-amber-400 dark:border-amber-600', badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { id: 'offer', title: '🎉 Offers Received', color: 'border-emerald-500 dark:border-emerald-600', badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
  { id: 'rejected', title: 'Archived', color: 'border-rose-300 dark:border-rose-900', badge: 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300' },
];

export default function ApplicationTracker({
  tracker,
  onUpdateTracker,
  onSelectJob
}) {
  const [editingCardId, setEditingCardId] = useState(null);
  const [noteText, setNoteText] = useState('');

  // Move card across status columns
  const moveCard = (jobId, fromCol, toCol) => {
    if (fromCol === toCol) return;

    const sourceList = tracker[fromCol] || [];
    const cardToMove = sourceList.find(c => c.id === jobId);
    if (!cardToMove) return;

    const updatedSource = sourceList.filter(c => c.id !== jobId);
    const destList = tracker[toCol] || [];

    const updatedDest = [{ ...cardToMove, status: toCol, updatedDate: new Date().toLocaleDateString() }, ...destList];

    // Trigger celebratory confetti if moving to OFFER!
    if (toCol === 'offer') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    onUpdateTracker({
      ...tracker,
      [fromCol]: updatedSource,
      [toCol]: updatedDest
    });
  };

  // Remove card completely
  const removeCard = (jobId, fromCol) => {
    const updatedCol = (tracker[fromCol] || []).filter(c => c.id !== jobId);
    onUpdateTracker({
      ...tracker,
      [fromCol]: updatedCol
    });
  };

  // Save note to card
  const handleSaveNote = (jobId, colId) => {
    const updatedCol = (tracker[colId] || []).map(card => {
      if (card.id === jobId) {
        return { ...card, note: noteText };
      }
      return card;
    });

    onUpdateTracker({
      ...tracker,
      [colId]: updatedCol
    });
    setEditingCardId(null);
    setNoteText('');
  };

  const totalApplications = Object.values(tracker).reduce((acc, list) => acc + (list ? list.length : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tracker Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Kanban className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Student Application Pipeline
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your internship applications, coding assessments (OA), and interview stages in one visual board.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            {totalApplications} Opportunities Tracked
          </div>
        </div>
      </div>

      {/* Kanban Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((column, colIndex) => {
          const cards = tracker[column.id] || [];

          return (
            <div
              key={column.id}
              className={`flex flex-col bg-slate-100/70 dark:bg-slate-900/50 rounded-2xl border-t-4 ${column.color} border-slate-200 dark:border-slate-800 p-3 min-h-[500px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">
                  {column.title}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${column.badge}`}>
                  {cards.length}
                </span>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto">
                {cards.length === 0 ? (
                  <div className="h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-400 text-center p-3">
                    No roles in this stage
                  </div>
                ) : (
                  cards.map((card) => {
                    const isEditing = editingCardId === card.id;

                    return (
                      <div
                        key={card.id}
                        className="bg-white dark:bg-slate-900 rounded-xl p-3.5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow transition-all space-y-2.5 text-xs"
                      >
                        {/* Company & Role */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-semibold text-slate-500 dark:text-slate-400 block text-[11px]">
                              {card.company}
                            </span>
                            <h4 
                              onClick={() => onSelectJob(card)}
                              className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer line-clamp-1"
                            >
                              {card.title}
                            </h4>
                          </div>

                          <button
                            onClick={() => removeCard(card.id, column.id)}
                            title="Remove from tracker"
                            className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Salary & Location */}
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                          <span>{card.salary || 'Stipend'}</span>
                          <span className="capitalize">{card.workMode}</span>
                        </div>

                        {/* Personal Notes */}
                        {card.note && !isEditing && (
                          <div className="p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 text-[11px] text-indigo-900 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60">
                            📝 {card.note}
                          </div>
                        )}

                        {/* Inline Note Editor */}
                        {isEditing ? (
                          <div className="space-y-1.5 pt-1">
                            <textarea
                              rows="2"
                              value={noteText}
                              onChange={(e) => setNoteText(e.target.value)}
                              placeholder="e.g. OA link received, round on Tuesday..."
                              className="w-full p-2 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                            />
                            <div className="flex justify-end gap-1.5">
                              <button
                                onClick={() => setEditingCardId(null)}
                                className="px-2 py-0.5 text-[10px] text-slate-500 hover:underline"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSaveNote(card.id, column.id)}
                                className="px-2 py-0.5 text-[10px] bg-indigo-600 text-white rounded font-bold"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingCardId(card.id);
                              setNoteText(card.note || '');
                            }}
                            className="text-[10px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 font-medium"
                          >
                            <FileEdit className="w-3 h-3" />
                            <span>{card.note ? 'Edit Note' : '+ Add Note'}</span>
                          </button>
                        )}

                        {/* Stage Mover Controls */}
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                          {colIndex > 0 ? (
                            <button
                              onClick={() => moveCard(card.id, column.id, COLUMNS[colIndex - 1].id)}
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-0.5"
                              title={`Move back to ${COLUMNS[colIndex - 1].title}`}
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                              <span>Back</span>
                            </button>
                          ) : <div />}

                          {colIndex < COLUMNS.length - 1 ? (
                            <button
                              onClick={() => moveCard(card.id, column.id, COLUMNS[colIndex + 1].id)}
                              className="p-1 rounded text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-0.5"
                              title={`Advance to ${COLUMNS[colIndex + 1].title}`}
                            >
                              <span>Next</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          ) : <div />}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
