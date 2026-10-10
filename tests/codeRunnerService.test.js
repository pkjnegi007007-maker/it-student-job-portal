import { test, describe } from 'node:test';
import assert from 'node:assert';
import { codeRunnerService } from '../src/services/codeRunnerService.js';

describe('codeRunnerService - Unit Tests', () => {
  test('executes a basic sum function correctly', () => {
    const code = `function add(a, b) { return a + b; }`;
    const testCases = [
      { input: [1, 2], expected: 3 },
      { input: [-1, 5], expected: 4 }
    ];

    const result = codeRunnerService.run(code, 'add', testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.allPassed, true);
    assert.strictEqual(result.results.length, 2);
    assert.strictEqual(result.results[0].passed, true);
    assert.strictEqual(result.results[1].passed, true);
  });

  test('detects incorrect logic and marks failed test cases', () => {
    const code = `function add(a, b) { return a - b; }`;
    const testCases = [
      { input: [5, 3], expected: 8 },
      { input: [2, 2], expected: 4 }
    ];

    const result = codeRunnerService.run(code, 'add', testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.allPassed, false);
    assert.strictEqual(result.results[0].passed, false);
    assert.strictEqual(result.results[1].passed, false);
  });

  test('catches and reports syntax errors cleanly without throwing unhandled exceptions', () => {
    const code = `function invalid( { return 123; }`;
    const testCases = [{ input: [], expected: 123 }];

    const result = codeRunnerService.run(code, 'invalid', testCases);
    assert.strictEqual(result.success, false);
    assert.strictEqual(result.allPassed, false);
    assert.ok(result.error);
  });

  test('catches runtime errors inside user function', () => {
    const code = `function buggy(arr) { return arr.notAFunction(); }`;
    const testCases = [{ input: [[1, 2]], expected: 2 }];

    const result = codeRunnerService.run(code, 'buggy', testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.allPassed, false);
    assert.strictEqual(result.results[0].passed, false);
    assert.ok(result.results[0].error.includes('notAFunction'));
  });

  test('captures console.log output without leaking to global console', () => {
    const code = `function logTest(x) { console.log('Testing value:', x); return x * 2; }`;
    const testCases = [{ input: [5], expected: 10 }];

    const result = codeRunnerService.run(code, 'logTest', testCases);
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.allPassed, true);
    assert.strictEqual(result.logs.length, 1);
    assert.ok(result.logs[0].includes('Testing value: 5'));
  });

  test('handles unordered-pair compareType properly (e.g., Two Sum indices order)', () => {
    const code = `function twoSum(nums, target) { return [1, 0]; }`;
    const testCases = [{ input: [[2, 7], 9], expected: [0, 1] }];

    const result = codeRunnerService.run(code, 'twoSum', testCases, 'unordered-pair');
    assert.strictEqual(result.success, true);
    assert.strictEqual(result.allPassed, true);
  });
});
