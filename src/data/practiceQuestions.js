export const PRACTICE_QUESTIONS = [
  {
    id: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '52%',
    companies: ['Amazon', 'Google', 'Meta', 'TCS Digital', 'Infosys'],
    summary: 'Find two numbers in an array that add up to a specific target and return their indices.',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3, 2, 4], target = 6',
        output: '[1, 2]',
        explanation: 'nums[1] + nums[2] == 6, so we return [1, 2].'
      },
      {
        input: 'nums = [3, 3], target = 6',
        output: '[0, 1]',
        explanation: 'nums[0] + nums[1] == 6, so we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/two-sum/',
      gfg: 'https://www.geeksforgeeks.org/problems/key-pair5551/1',
      neetcode: 'https://neetcode.io/problems/two-integer-sum'
    },
    hints: [
      'A brute force nested loop takes O(N²) time. Can you do it in O(N)?',
      'As you iterate through the array, what complementary value are you looking for?',
      'Can you use a JavaScript Map or object to store numbers you have already seen along with their indices?'
    ],
    functionName: 'twoSum',
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  // Return an array of two indices [index1, index2]
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(N)',
      code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`,
      explanation: 'We iterate through the array once while storing each number and its index in a hash map. For each number, we check in O(1) time if target - current exists in our map.'
    },
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1], description: 'Standard sorted array' },
      { input: [[3, 2, 4], 6], expected: [1, 2], description: 'Unsorted middle elements' },
      { input: [[3, 3], 6], expected: [0, 1], description: 'Duplicate numbers matching target' },
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4], description: 'Negative numbers' }
    ],
    compareType: 'unordered-pair'
  },

  {
    id: 'valid-parentheses',
    title: '20. Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack',
    acceptance: '40.8%',
    companies: ['Microsoft', 'Amazon', 'Bloomberg', 'Wipro', 'TCS'],
    summary: 'Determine if an input string of brackets is valid using a Last-In First-Out stack.',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      },
      {
        input: 's = "([])"',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only: "()[]{}"'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/valid-parentheses/',
      gfg: 'https://www.geeksforgeeks.org/problems/parenthesis-checker2744/1',
      neetcode: 'https://neetcode.io/problems/validate-parentheses'
    },
    hints: [
      'Think about what data structure helps remember the most recently opened bracket.',
      'A Stack (LIFO) is ideal: push open brackets, and when you see a closing bracket, check if it matches the top of the stack.',
      'Remember edge cases: what if the stack is empty when encountering a closing bracket, or non-empty at the very end?'
    ],
    functionName: 'isValid',
    starterCode: `function isValid(s) {
  // Write your solution here
  // Return true if valid, false otherwise
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(N)',
      code: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
      explanation: 'Push opening brackets to a stack. When a closing bracket arrives, pop the last bracket and verify it matches. At the end, ensure the stack is empty.'
    },
    testCases: [
      { input: ['()'], expected: true, description: 'Simple single pair' },
      { input: ['()[]{}'], expected: true, description: 'Consecutive pairs' },
      { input: ['(]'], expected: false, description: 'Mismatched brackets' },
      { input: ['([])'], expected: true, description: 'Nested matching brackets' },
      { input: ['['], expected: false, description: 'Unclosed open bracket' },
      { input: [']'], expected: false, description: 'Close bracket without opening' }
    ]
  },

  {
    id: 'best-time-to-buy-and-sell-stock',
    title: '121. Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    category: 'Sliding Window',
    acceptance: '54.2%',
    companies: ['Amazon', 'Apple', 'Microsoft', 'Cognizant', 'Accenture'],
    summary: 'Find the maximum profit you can achieve from buying on one day and selling on a future day.',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

Return the *maximum profit you can achieve from this transaction*. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      {
        input: 'prices = [7, 1, 5, 3, 6, 4]',
        output: '5',
        explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.'
      },
      {
        input: 'prices = [7, 6, 4, 3, 1]',
        output: '0',
        explanation: 'In this case, no transactions are done and the max profit = 0.'
      }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      gfg: 'https://www.geeksforgeeks.org/problems/stock-buy-and-sell2615/1',
      neetcode: 'https://neetcode.io/problems/buy-and-sell-crypto'
    },
    hints: [
      'You cannot sell before you buy! As you scan from left to right, keep track of the lowest price seen so far.',
      'On each day, calculate: current price - minimum price seen so far. Update max profit if this is higher.'
    ],
    functionName: 'maxProfit',
    starterCode: `function maxProfit(prices) {
  // Write your solution here
  // Return maximum profit as an integer
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(1)',
      code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}`,
      explanation: 'We track the lowest buy price seen so far and continuously evaluate the potential profit if we sold today. Done in a single pass O(N) with O(1) space.'
    },
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5, description: 'Valley followed by peak' },
      { input: [[7, 6, 4, 3, 1]], expected: 0, description: 'Strictly declining prices' },
      { input: [[2, 4, 1]], expected: 2, description: 'Peak before new lowest point' },
      { input: [[1, 2]], expected: 1, description: 'Two elements increasing' }
    ]
  },

  {
    id: 'valid-palindrome',
    title: '125. Valid Palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    acceptance: '46.5%',
    companies: ['Meta', 'Microsoft', 'Adobe', 'Capgemini'],
    summary: 'Verify if a string reads the same forwards and backwards after cleaning alphanumeric characters.',
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` *if it is a palindrome, or \`false\` otherwise*.`,
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      },
      {
        input: 's = " "',
        output: 'true',
        explanation: 's is an empty string "" after removing non-alphanumeric characters. Since an empty string reads the same forward and backward, it is a palindrome.'
      }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/valid-palindrome/',
      gfg: 'https://www.geeksforgeeks.org/problems/string-palindrome2712/1',
      neetcode: 'https://neetcode.io/problems/is-palindrome'
    },
    hints: [
      'You can either filter alphanumeric characters with regex / ascii checks first, or use two pointers moving inwards.',
      'Two pointers left and right skip non-alphanumerics and compare lowercase equivalents.'
    ],
    functionName: 'isPalindrome',
    starterCode: `function isPalindrome(s) {
  // Write your solution here
  // Return boolean true or false
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(1)',
      code: `function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  const isAlphaNumeric = (ch) => {
    const code = ch.charCodeAt(0);
    return (
      (code >= 48 && code <= 57) || // 0-9
      (code >= 65 && code <= 90) || // A-Z
      (code >= 97 && code <= 122)   // a-z
    );
  };

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) left++;
    while (left < right && !isAlphaNumeric(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}`,
      explanation: 'Using two pointers meeting in the middle allows O(1) extra space without allocating extra strings.'
    },
    testCases: [
      { input: ['A man, a plan, a canal: Panama'], expected: true, description: 'Classic sentence with spaces & punctuation' },
      { input: ['race a car'], expected: false, description: 'Not a palindrome' },
      { input: [' '], expected: true, description: 'Empty spaces only' },
      { input: ['0P'], expected: false, description: 'Alphanumeric mismatch' }
    ]
  },

  {
    id: 'contains-duplicate',
    title: '217. Contains Duplicate',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '62.0%',
    companies: ['Amazon', 'Apple', 'Google', 'HCL'],
    summary: 'Check if any value appears at least twice in an array.',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      {
        input: 'nums = [1, 2, 3, 1]',
        output: 'true'
      },
      {
        input: 'nums = [1, 2, 3, 4]',
        output: 'false'
      },
      {
        input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]',
        output: 'true'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/contains-duplicate/',
      gfg: 'https://www.geeksforgeeks.org/problems/find-duplicates-in-an-array/1',
      neetcode: 'https://neetcode.io/problems/duplicate-integer'
    },
    hints: [
      'Can you use a Set in JavaScript to check for duplicates?',
      'If the size of a Set constructed from the array is less than the length of the array, there is a duplicate!'
    ],
    functionName: 'containsDuplicate',
    starterCode: `function containsDuplicate(nums) {
  // Write your solution here
  // Return boolean true or false
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(N)',
      code: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
      explanation: 'Iterate through the array and insert each element into a hash set. If an element already exists, early exit with true.'
    },
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true, description: 'Simple duplicate at ends' },
      { input: [[1, 2, 3, 4]], expected: false, description: 'All unique numbers' },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true, description: 'Multiple duplicates' },
      { input: [[0]], expected: false, description: 'Single element array' }
    ]
  },

  {
    id: 'binary-search',
    title: '704. Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    acceptance: '57.8%',
    companies: ['Google', 'Microsoft', 'Apple', 'Oracle'],
    summary: 'Search for target in sorted array with guaranteed O(log N) runtime.',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`.

If \`target\` exists, then return its **index**. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/binary-search/',
      gfg: 'https://www.geeksforgeeks.org/problems/binary-search-1587115620/1',
      neetcode: 'https://neetcode.io/problems/binary-search'
    },
    hints: [
      'Maintain two pointers: low = 0, high = nums.length - 1.',
      'Compute mid = Math.floor((low + high) / 2) to eliminate half the search space every iteration.'
    ],
    functionName: 'search',
    starterCode: `function search(nums, target) {
  // Write your solution here
  // Return index integer or -1
  
}
`,
    optimalSolution: {
      time: 'O(log N)',
      space: 'O(1)',
      code: `function search(nums, target) {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
      explanation: 'Binary search splits the interval in half at each step, yielding logarithmic O(log N) time complexity with constant O(1) space.'
    },
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4, description: 'Target exists in upper half' },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1, description: 'Target does not exist' },
      { input: [[5], 5], expected: 0, description: 'Single element match' },
      { input: [[2, 5], 5], expected: 1, description: 'Target at last index' }
    ]
  },

  {
    id: 'maximum-subarray',
    title: '53. Maximum Subarray (Kadane’s)',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptance: '50.4%',
    companies: ['Amazon', 'Microsoft', 'LinkedIn', 'TCS Digital', 'Samsung'],
    summary: 'Find the contiguous subarray with the largest sum using Kadane’s algorithm.',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return *its sum*.

A **subarray** is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      {
        input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        output: '6',
        explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1',
        explanation: 'The subarray [1] has the largest sum 1.'
      },
      {
        input: 'nums = [5, 4, -1, 7, 8]',
        output: '23',
        explanation: 'The subarray [5, 4, -1, 7, 8] has the largest sum 23.'
      }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/maximum-subarray/',
      gfg: 'https://www.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1',
      neetcode: 'https://neetcode.io/problems/maximum-subarray'
    },
    hints: [
      'Consider Kadane’s Algorithm: At each index, decide whether to add the current number to the existing subarray sum or start fresh from the current number.',
      'currentMax = Math.max(num, currentMax + num). Global max tracks the highest value recorded.'
    ],
    functionName: 'maxSubArray',
    starterCode: `function maxSubArray(nums) {
  // Write your solution here
  // Return maximum sum as an integer
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(1)',
      code: `function maxSubArray(nums) {
  let currentSum = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
      explanation: 'Kadane’s algorithm scans the array in linear O(N) time. If currentSum becomes negative and hurts subsequent numbers, we reset our starting point.'
    },
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6, description: 'Mixed positive and negative values' },
      { input: [[1]], expected: 1, description: 'Single element' },
      { input: [[5, 4, -1, 7, 8]], expected: 23, description: 'Mostly positive values' },
      { input: [[-5, -2, -8, -1]], expected: -1, description: 'All negative numbers' }
    ]
  },

  {
    id: 'longest-substring-without-repeating-characters',
    title: '3. Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    category: 'Sliding Window',
    acceptance: '34.8%',
    companies: ['Amazon', 'Meta', 'Google', 'Bloomberg', 'Cisco'],
    summary: 'Find the length of the longest substring containing unique characters.',
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      },
      {
        input: 's = "pwwkew"',
        output: '3',
        explanation: 'The answer is "wke", with the length of 3. Notice that "pwke" is a subsequence and not a substring.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      gfg: 'https://www.geeksforgeeks.org/problems/length-of-the-longest-substring3036/1',
      neetcode: 'https://neetcode.io/problems/longest-substring-without-duplicates'
    },
    hints: [
      'Use a sliding window with a left and right pointer.',
      'Keep track of characters currently in the window using a Set or Map of character indices.',
      'When you see a duplicate, advance the left pointer until the duplicate is evicted.'
    ],
    functionName: 'lengthOfLongestSubstring',
    starterCode: `function lengthOfLongestSubstring(s) {
  // Write your solution here
  // Return maximum length as integer
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(min(M, N))',
      code: `function lengthOfLongestSubstring(s) {
  const charMap = new Map();
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }
    charMap.set(char, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
      explanation: 'We slide a dynamic window [left, right]. Storing each character’s latest seen index allows us to jump left forward directly in O(1) whenever a collision occurs.'
    },
    testCases: [
      { input: ['abcabcbb'], expected: 3, description: 'Repeating pattern' },
      { input: ['bbbbb'], expected: 1, description: 'All identical characters' },
      { input: ['pwwkew'], expected: 3, description: 'Substrings with duplicates in middle' },
      { input: [''], expected: 0, description: 'Empty string' },
      { input: [' '], expected: 1, description: 'Single space' }
    ]
  },

  {
    id: 'container-with-most-water',
    title: '11. Container With Most Water',
    difficulty: 'Medium',
    category: 'Two Pointers',
    acceptance: '54.5%',
    companies: ['Amazon', 'Google', 'Apple', 'Goldman Sachs'],
    summary: 'Find two lines that together with the x-axis form a container holding the most water.',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return *the maximum amount of water a container can store*.

Notice that you may not slant the container.`,
    examples: [
      {
        input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        output: '49',
        explanation: 'The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. The max area is between index 1 and 8: min(8, 7) * (8 - 1) = 7 * 7 = 49.'
      },
      {
        input: 'height = [1, 1]',
        output: '1',
        explanation: 'min(1, 1) * (1 - 0) = 1.'
      }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/container-with-most-water/',
      gfg: 'https://www.geeksforgeeks.org/problems/container-with-most-water--170637/1',
      neetcode: 'https://neetcode.io/problems/max-water-container'
    },
    hints: [
      'Start with the widest container: left = 0, right = height.length - 1.',
      'Area = min(height[left], height[right]) * (right - left).',
      'To potentially find a bigger container, which pointer should you move inward? The shorter one!'
    ],
    functionName: 'maxArea',
    starterCode: `function maxArea(height) {
  // Write your solution here
  // Return maximum area as an integer
  
}
`,
    optimalSolution: {
      time: 'O(N)',
      space: 'O(1)',
      code: `function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const currentArea = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}`,
      explanation: 'Starting at maximum width, we shrink the boundary by moving the pointer pointing to the shorter vertical bar, ensuring we explore all potentially larger areas in O(N).'
    },
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49, description: 'Standard container test' },
      { input: [[1, 1]], expected: 1, description: 'Minimum length two equal bars' },
      { input: [[4, 3, 2, 1, 4]], expected: 16, description: 'Equal tall ends' },
      { input: [[1, 2, 1]], expected: 2, description: 'Peak in center' }
    ]
  },

  {
    id: 'merge-intervals',
    title: '56. Merge Intervals',
    difficulty: 'Medium',
    category: 'Intervals',
    acceptance: '47.1%',
    companies: ['Google', 'Meta', 'Uber', 'Microsoft', 'Oracle'],
    summary: 'Merge all overlapping intervals and return non-overlapping intervals.',
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return *an array of the non-overlapping intervals that cover all the intervals in the input*.`,
    examples: [
      {
        input: 'intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]',
        output: '[[1, 6], [8, 10], [15, 18]]',
        explanation: 'Since intervals [1, 3] and [2, 6] overlap, merge them into [1, 6].'
      },
      {
        input: 'intervals = [[1, 4], [4, 5]]',
        output: '[[1, 5]]',
        explanation: 'Intervals [1, 4] and [4, 5] are considered overlapping.'
      }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    externalLinks: {
      leetcode: 'https://leetcode.com/problems/merge-intervals/',
      gfg: 'https://www.geeksforgeeks.org/problems/overlapping-intervals--170633/1',
      neetcode: 'https://neetcode.io/problems/merge-overlapping-intervals'
    },
    hints: [
      'First, sort intervals by their start times: intervals.sort((a, b) => a[0] - b[0]).',
      'Iterate through the sorted intervals. If the current interval starts before or at the end of the previous merged interval, merge them: prev[1] = Math.max(prev[1], curr[1]).'
    ],
    functionName: 'merge',
    starterCode: `function merge(intervals) {
  // Write your solution here
  // Return merged array of interval pairs
  
}
`,
    optimalSolution: {
      time: 'O(N log N)',
      space: 'O(N)',
      code: `function merge(intervals) {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}`,
      explanation: 'Sorting intervals by starting boundary simplifies overlapping checks into a single forward pass, merging adjacent blocks when current[0] <= last[1].'
    },
    testCases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]], description: 'Consecutive overlap' },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]], description: 'Touching boundary overlap' },
      { input: [[[1, 4], [2, 3]]], expected: [[1, 4]], description: 'Completely enclosed interval' },
      { input: [[[1, 4], [0, 4]]], expected: [[0, 4]], description: 'Unsorted initial intervals' }
    ]
  }
];

export const PRACTICE_CATEGORIES = [
  'All',
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Stack',
  'Binary Search',
  'Dynamic Programming',
  'Intervals'
];
