export const PREP_RESOURCES = {
  dsaPatterns: [
    {
      title: 'Two Pointers & Sliding Window',
      category: 'Arrays & Strings',
      difficulty: 'High Frequency',
      summary: 'Essential for finding contiguous subarrays, target sums, and palindrome checks with O(N) linear time and O(1) space.',
      tips: 'Whenever a problem mentions sorted arrays or contiguous subarrays, think of two pointers or sliding window first.',
      codeSample: `def max_sub_array_len(nums, k):
    left = 0
    curr_sum = 0
    max_len = 0
    for right in range(len(nums)):
        curr_sum += nums[right]
        while curr_sum > k:
            curr_sum -= nums[left]
            left += 1
        max_len = max(max_len, right - left + 1)
    return max_len`
    },
    {
      title: 'Hash Maps & Frequency Counting',
      category: 'Foundations',
      difficulty: 'Top Priority',
      summary: 'Trading space for O(1) instant lookups. Used in Two Sum, Group Anagrams, and First Unique Character problems.',
      tips: 'Always check if you can reduce an O(N²) nested loop to O(N) by storing previous elements in a dictionary/hash map.'
    },
    {
      title: 'Binary Search On Answers',
      category: 'Searching & Optimization',
      difficulty: 'Medium / Hard',
      summary: 'Beyond simple array lookups, used to find minimum capacity, peak elements, and optimal thresholds across a monotonic search space.',
      tips: 'If the question asks for "minimum possible maximum value" or "maximum capacity", test a candidate answer with binary search.'
    },
    {
      title: 'Breadth-First Search (BFS) & Shortest Path',
      category: 'Trees & Graphs',
      difficulty: 'High Frequency',
      summary: 'Standard queue-based pattern for finding the shortest path in unweighted graphs or level-order traversal in binary trees.',
      tips: 'Always maintain a `visited` set to avoid infinite cycles in general graphs.'
    }
  ],

  resumeTips: [
    {
      rule: 'XYZ Resume Bullet Formula (Google Standard)',
      formula: 'Accomplished [X] as measured by [Y], by doing [Z]',
      example: 'Improved API response latency by 38% across 50,000 daily requests by implementing Redis in-memory caching in Node.js.'
    },
    {
      rule: 'Highlight Project Tech Stacks Prominently',
      formula: 'List specific libraries, databases, and deployment platforms',
      example: 'Next.js 14, Tailwind CSS, PostgreSQL, Prisma ORM, Docker, deployed on AWS ECS with GitHub Actions CI/CD.'
    },
    {
      rule: 'Include Live Demo & GitHub Links',
      formula: 'Ensure recruiters can click and test in 5 seconds',
      example: 'Every student resume project must have an active live deployment URL (Vercel/Render) and a clean README on GitHub.'
    },
    {
      rule: 'Tailor Skills to Job Postings',
      formula: 'Mirror keyword tags found in the job description',
      example: 'If applying to a React role, ensure React, JavaScript ES6, and State Management are explicitly in your top Skills section.'
    }
  ],

  interviewChecklist: [
    {
      stage: 'Before the Interview',
      items: [
        'Research the company’s recent tech blog posts, engineering architecture, and products.',
        'Review your resume line by line; be ready to explain the deepest technical nuance of every project.',
        'Practice coding on Google Docs or a whiteboard without IDE autocomplete or syntax highlighting.',
        'Prepare 3 thoughtful questions for the interviewer about engineering culture and team challenges.'
      ]
    },
    {
      stage: 'During the Technical Coding Round',
      items: [
        'Ask clarifying questions and verify edge cases before writing a single line of code (null, empty array, negative numbers).',
        'State your brute force approach first, compute its time/space complexity, then discuss how to optimize.',
        'Think out loud continuously — interviewers evaluate your thought process even if you do not finish every line.',
        'Dry run your solution with an example input before announcing you are done.'
      ]
    },
    {
      stage: 'Behavioral & Culture Fit (STAR Method)',
      items: [
        'Situation: Describe the context and project constraints.',
        'Task: What was your specific responsibility or goal?',
        'Action: Exactly what technical or interpersonal steps did YOU take?',
        'Result: Quantifiable outcome or lesson learned from overcoming a failure.'
      ]
    }
  ]
};
