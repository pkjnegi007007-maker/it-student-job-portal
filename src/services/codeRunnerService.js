/**
 * Client-Side JavaScript Test Runner
 * Safely evaluates user code against test cases in the browser and captures console outputs.
 */

export const codeRunnerService = {
  run: (userCode, functionName, testCases, compareType = 'strict') => {
    const logs = [];
    const customConsole = {
      log: (...args) => {
        logs.push(args.map(formatConsoleArg).join(' '));
      },
      error: (...args) => {
        logs.push('[ERR] ' + args.map(formatConsoleArg).join(' '));
      },
      warn: (...args) => {
        logs.push('[WARN] ' + args.map(formatConsoleArg).join(' '));
      }
    };

    try {
      // Create execution factory
      // Note: We use Function constructor to isolate scope and pass intercepted console
      const runnerFactory = new Function(
        'console',
        `
        "use strict";
        ${userCode}
        if (typeof ${functionName} !== 'function') {
          throw new Error('Function "${functionName}" is not defined or is not a function. Please keep the function signature intact.');
        }
        return ${functionName};
        `
      );

      const targetFn = runnerFactory(customConsole);

      const startTime = performance.now();
      const testResults = testCases.map((tc, index) => {
        try {
          // Clone inputs so one test case cannot mutate data for others
          const clonedInput = JSON.parse(JSON.stringify(tc.input));
          const actualOutput = targetFn(...clonedInput);

          const isPassed = compareOutputs(actualOutput, tc.expected, compareType);

          return {
            caseNumber: index + 1,
            passed: isPassed,
            inputFormatted: formatValue(tc.input),
            expectedFormatted: formatValue(tc.expected),
            actualFormatted: formatValue(actualOutput),
            description: tc.description || `Test Case ${index + 1}`
          };
        } catch (execErr) {
          return {
            caseNumber: index + 1,
            passed: false,
            inputFormatted: formatValue(tc.input),
            expectedFormatted: formatValue(tc.expected),
            actualFormatted: 'Runtime Error: ' + execErr.message,
            error: execErr.message,
            description: tc.description || `Test Case ${index + 1}`
          };
        }
      });
      const endTime = performance.now();

      const allPassed = testResults.every(r => r.passed);

      return {
        success: true,
        allPassed,
        results: testResults,
        executionTimeMs: Math.round((endTime - startTime) * 100) / 100,
        logs,
        error: null
      };
    } catch (compileErr) {
      return {
        success: false,
        allPassed: false,
        results: [],
        executionTimeMs: 0,
        logs,
        error: compileErr.message || 'Syntax or evaluation error in your code.'
      };
    }
  }
};

function formatConsoleArg(arg) {
  if (arg === null) return 'null';
  if (arg === undefined) return 'undefined';
  if (typeof arg === 'object') {
    try {
      return JSON.stringify(arg);
    } catch {
      return String(arg);
    }
  }
  return String(arg);
}

function formatValue(val) {
  if (val === undefined) return 'undefined';
  try {
    return JSON.stringify(val);
  } catch {
    return String(val);
  }
}

function compareOutputs(actual, expected, compareType) {
  if (compareType === 'unordered-pair' && Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    const sortedActual = [...actual].sort((a, b) => (typeof a === 'number' ? a - b : String(a).localeCompare(String(b))));
    const sortedExpected = [...expected].sort((a, b) => (typeof a === 'number' ? a - b : String(a).localeCompare(String(b))));
    return JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
  }

  // Deep comparison for arrays and objects
  return JSON.stringify(actual) === JSON.stringify(expected);
}
