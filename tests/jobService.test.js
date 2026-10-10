import { test, describe } from 'node:test';
import assert from 'node:assert';
import { jobService } from '../src/services/jobService.js';
import { CURATED_JOBS } from '../src/data/curatedJobs.js';

describe('jobService - Unit Tests', () => {
  test('returns local jobs including all curated jobs', () => {
    const jobs = jobService.getLocalJobs();
    assert.ok(Array.isArray(jobs));
    assert.ok(jobs.length >= CURATED_JOBS.length);
  });

  test('calculates 100% match score when all job skills match student skills', () => {
    const jobSkills = ['React', 'JavaScript', 'CSS'];
    const studentSkills = ['React', 'JavaScript', 'CSS', 'Python'];

    const score = jobService.calculateMatchScore(jobSkills, studentSkills);
    assert.strictEqual(score, 100);
  });

  test('calculates 0% match score when no skills match', () => {
    const jobSkills = ['Rust', 'Solidity'];
    const studentSkills = ['Python', 'HTML'];

    const score = jobService.calculateMatchScore(jobSkills, studentSkills);
    assert.strictEqual(score, 0);
  });

  test('calculates proportional match score correctly', () => {
    const jobSkills = ['Python', 'SQL', 'Docker', 'AWS'];
    const studentSkills = ['Python', 'SQL']; // 2 out of 4 = 50%

    const score = jobService.calculateMatchScore(jobSkills, studentSkills);
    assert.strictEqual(score, 50);
  });

  test('correctly partitions skills into matched and missing lists', () => {
    const jobSkills = ['Python', 'FastAPI', 'PostgreSQL'];
    const studentSkills = ['Python', 'Git'];

    const analysis = jobService.getSkillAnalysis(jobSkills, studentSkills);
    assert.deepStrictEqual(analysis.matched, ['Python']);
    assert.deepStrictEqual(analysis.missing, ['FastAPI', 'PostgreSQL']);
  });
});
