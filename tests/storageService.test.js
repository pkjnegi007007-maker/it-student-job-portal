import { test, describe } from 'node:test';
import assert from 'node:assert';
import { storageService } from '../src/services/storageService.js';

describe('storageService - Unit Tests', () => {
  test('manages bookmarks toggling and retrieval', () => {
    const initial = storageService.getBookmarks();
    assert.ok(Array.isArray(initial));

    const updated = storageService.toggleBookmark('job-test-123');
    assert.ok(updated.includes('job-test-123'));

    const toggledOff = storageService.toggleBookmark('job-test-123');
    assert.strictEqual(toggledOff.includes('job-test-123'), false);
  });

  test('manages student skills profile persistence', () => {
    storageService.setStudentSkills(['React', 'TypeScript', 'Docker']);
    const skills = storageService.getStudentSkills();
    assert.deepStrictEqual(skills, ['React', 'TypeScript', 'Docker']);
  });

  test('manages application tracker state', () => {
    const sampleState = {
      saved: [{ id: '1', title: 'Frontend Intern' }],
      applied: [],
      interviewing: [],
      offer: [],
      rejected: []
    };
    storageService.saveTracker(sampleState);
    const retrieved = storageService.getTracker();
    assert.strictEqual(retrieved.saved.length, 1);
    assert.strictEqual(retrieved.saved[0].title, 'Frontend Intern');
  });

  test('manages practice question solved status and code drafts', () => {
    storageService.markQuestionSolved('two-sum', true);
    assert.ok(storageService.getSolvedQuestions().includes('two-sum'));

    storageService.saveQuestionDraft('two-sum', 'function twoSum() { return [0, 1]; }');
    const draft = storageService.getQuestionDraft('two-sum', 'default');
    assert.strictEqual(draft, 'function twoSum() { return [0, 1]; }');

    const resetDraft = storageService.resetQuestionDraft('two-sum', 'default');
    assert.strictEqual(resetDraft, 'default');
  });
});
