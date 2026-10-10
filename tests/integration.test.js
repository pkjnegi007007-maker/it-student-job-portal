import { test, describe } from 'node:test';
import assert from 'node:assert';
import { CURATED_JOBS } from '../src/data/curatedJobs.js';
import { IT_CATEGORIES } from '../src/data/itCategories.js';
import { PRACTICE_QUESTIONS } from '../src/data/practiceQuestions.js';
import { codeRunnerService } from '../src/services/codeRunnerService.js';
import { jobService } from '../src/services/jobService.js';
import { storageService } from '../src/services/storageService.js';

describe('Integration Tests - Data Integrity & End-to-End Logic', () => {

  test('Curated Jobs Data Integrity: all jobs have required fields and valid schema', () => {
    assert.ok(CURATED_JOBS.length > 0, 'CURATED_JOBS should not be empty');

    const validCategoryIds = new Set(IT_CATEGORIES.map(c => c.id));
    const seenJobIds = new Set();

    CURATED_JOBS.forEach((job, index) => {
      assert.ok(job.id, `Job at index ${index} must have an id`);
      assert.strictEqual(seenJobIds.has(job.id), false, `Job ID "${job.id}" must be unique`);
      seenJobIds.add(job.id);

      assert.ok(job.title && job.title.trim().length > 0, `Job ${job.id} must have a non-empty title`);
      assert.ok(job.company && job.company.trim().length > 0, `Job ${job.id} must have a non-empty company`);
      assert.ok(validCategoryIds.has(job.category), `Job ${job.id} has invalid category: ${job.category}`);
      assert.ok(Array.isArray(job.skills) && job.skills.length > 0, `Job ${job.id} must have at least one skill`);
      assert.ok(job.applyUrl && job.applyUrl.startsWith('http'), `Job ${job.id} must have a valid HTTP(S) applyUrl`);
      assert.ok(['internship', 'fresher', 'junior'].includes(job.experienceLevel), `Job ${job.id} has invalid experienceLevel`);
      assert.ok(['remote', 'hybrid', 'onsite'].includes(job.workMode), `Job ${job.id} has invalid workMode`);
    });
  });

  test('Practice Questions Data Integrity: all questions have valid metadata and platform links', () => {
    assert.strictEqual(PRACTICE_QUESTIONS.length, 10, 'Expected 10 curated practice questions');

    PRACTICE_QUESTIONS.forEach((q) => {
      assert.ok(q.id, 'Question must have an id');
      assert.ok(q.title, `Question ${q.id} must have a title`);
      assert.ok(['Easy', 'Medium', 'Hard'].includes(q.difficulty), `Question ${q.id} has invalid difficulty`);
      assert.ok(Array.isArray(q.testCases) && q.testCases.length >= 2, `Question ${q.id} must have at least 2 test cases`);
      assert.ok(q.functionName, `Question ${q.id} must specify functionName`);
      assert.ok(q.starterCode.includes(q.functionName), `Starter code for ${q.id} must contain ${q.functionName}`);
      assert.ok(q.externalLinks.leetcode.startsWith('https://leetcode.com'), `Question ${q.id} must link to LeetCode`);
      assert.ok(q.externalLinks.gfg.startsWith('https://www.geeksforgeeks.org'), `Question ${q.id} must link to GFG`);
      assert.ok(q.externalLinks.neetcode.startsWith('https://neetcode.io'), `Question ${q.id} must link to NeetCode`);
    });
  });

  test('Algorithmic Integration: All 10 practice question optimal solutions pass 100% of their test cases', () => {
    PRACTICE_QUESTIONS.forEach((q) => {
      const result = codeRunnerService.run(
        q.optimalSolution.code,
        q.functionName,
        q.testCases,
        q.compareType
      );

      assert.strictEqual(
        result.success,
        true,
        `Question "${q.title}" optimal solution encountered evaluation error: ${result.error}`
      );

      assert.strictEqual(
        result.allPassed,
        true,
        `Question "${q.title}" failed test cases: ${JSON.stringify(result.results.filter(r => !r.passed))}`
      );
    });
  });

  test('End-to-End User Flow: Profile matching -> Bookmark -> Kanban tracker pipeline', () => {
    // 1. Student enters skills
    const studentSkills = ['Python', 'SQL', 'FastAPI', 'Docker'];
    storageService.setStudentSkills(studentSkills);

    // 2. Compute match scores across all jobs
    const jobs = jobService.getLocalJobs();
    const scoredJobs = jobs.map(j => ({
      ...j,
      matchScore: jobService.calculateMatchScore(j.skills, studentSkills)
    }));

    // Find the highest match job
    const topMatch = [...scoredJobs].sort((a, b) => b.matchScore - a.matchScore)[0];
    assert.ok(topMatch);
    assert.ok(topMatch.matchScore > 0);

    // 3. User bookmarks top job
    const bookmarks = storageService.toggleBookmark(topMatch.id);
    assert.ok(bookmarks.includes(topMatch.id));

    // 4. User moves to application tracker
    const tracker = storageService.getTracker();
    tracker.applied.push({
      ...topMatch,
      status: 'applied',
      dateAdded: '2026-10-11'
    });
    storageService.saveTracker(tracker);

    const savedTracker = storageService.getTracker();
    assert.strictEqual(savedTracker.applied.length, 1);
    assert.strictEqual(savedTracker.applied[0].id, topMatch.id);
  });
});
