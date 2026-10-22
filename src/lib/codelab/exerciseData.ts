export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface CodingExercise {
  id: string;
  lessonId?: string;
  courseId?: string;
  title: string;
  instructions: string;
  language: string; // 'javascript', 'python', 'sql', 'web', 'cpp', 'java'
  starterCode: string;
  solutionCode?: string;
  testCases: TestCase[];
  hints: string[];
  timeLimitSec?: number;
}

export const CURRICULUM_EXERCISES: Record<string, CodingExercise> = {
  // JavaScript Functions & Arrays (e.g. for js fundamentals / modern js)
  "js-reverse-string": {
    id: "js-reverse-string",
    title: "Reverse a String and Filter Vowels",
    language: "javascript",
    instructions: `Write a function \`processString(str)\` that:
1. Takes a string input.
2. Reverses the entire string.
3. Prints the reversed string to standard output.

### Example:
Input: \`"hello"\`
Output: \`"olleh"\``,
    starterCode: `const readline = require('readline');

function processString(str) {
  // Your code here:
  return str.split('').reverse().join('');
}

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  console.log(processString(line.trim()));
});`,
    testCases: [
      { id: "tc-1", name: "Basic Word", input: "hello", expectedOutput: "olleh" },
      { id: "tc-2", name: "Capitalized Word", input: "BlezeX", expectedOutput: "XezelB" },
      { id: "tc-3", name: "Palindrome", input: "racecar", expectedOutput: "racecar" },
      { id: "tc-4", name: "Hidden Case: Spaces", input: "code lab", expectedOutput: "bal edoc", isHidden: true },
    ],
    hints: [
      "Use JavaScript's String.split(''), Array.reverse(), and Array.join('') methods.",
      "Make sure you print with console.log without extra trailing whitespace.",
    ],
  },

  // Python Data Structures & Algorithmic Problem
  "py-two-sum": {
    id: "py-two-sum",
    title: "Two Sum Target Indices",
    language: "python",
    instructions: `Given a comma-separated list of numbers on the first line and a target integer on the second line:
Find two distinct indices whose numbers add up to the target.
Print the two 0-based indices separated by a space (in ascending order).

### Example:
Line 1: \`2,7,11,15\`
Line 2: \`9\`
Output: \`0 1\` (since 2 + 7 = 9)`,
    starterCode: `import sys

def two_sum(nums, target):
    # Your code here:
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return seen[complement], i
        seen[n] = i
    return -1, -1

if __name__ == '__main__':
    lines = sys.stdin.read().splitlines()
    if len(lines) >= 2:
        nums = [int(x.strip()) for x in lines[0].split(',') if x.strip()]
        target = int(lines[1].strip())
        i1, i2 = two_sum(nums, target)
        print(f"{i1} {i2}")
`,
    testCases: [
      { id: "tc-1", name: "Standard Pair", input: "2,7,11,15\n9", expectedOutput: "0 1" },
      { id: "tc-2", name: "Consecutive Numbers", input: "3,2,4\n6", expectedOutput: "1 2" },
      { id: "tc-3", name: "Hidden Case: Duplicate Elements", input: "3,3\n6", expectedOutput: "0 1", isHidden: true },
    ],
    hints: [
      "A hash map (Python dict) allows you to check for complement in O(1) time.",
      "Store each number mapped to its index as you iterate.",
    ],
  },

  // SQL Query Challenge
  "sql-customer-orders": {
    id: "sql-customer-orders",
    title: "High-Value Active Students Query",
    language: "sql",
    instructions: `Query the active students from the \`students\` table.
Select the \`name\`, \`track\`, and \`gpa\` columns for all students where \`status = 'active'\` and \`gpa >= 3.8\`.
Order results by \`gpa\` descending.`,
    starterCode: `-- Write your SQL query below:
SELECT name, track, gpa
FROM students
WHERE status = 'active' AND gpa >= 3.8
ORDER BY gpa DESC;`,
    testCases: [
      {
        id: "tc-1",
        name: "Active Top Students",
        input: "",
        expectedOutput: "Amina Al-Mansoor,Priya Sharma", // matched against output rows
        explanation: "Should return Amina Al-Mansoor (3.95) and Priya Sharma (3.88).",
      },
    ],
    hints: [
      "Use WHERE status = 'active' AND gpa >= 3.8",
      "Sort using ORDER BY gpa DESC",
    ],
  },
};

/**
 * Returns an exercise tailored to the lesson id or topic, or creates a sensible default challenge
 */
export function getExerciseForLesson(lessonId?: string, lessonTitle?: string, lessonType?: string): CodingExercise {
  if (lessonId && CURRICULUM_EXERCISES[lessonId]) {
    return CURRICULUM_EXERCISES[lessonId];
  }

  const titleLower = (lessonTitle || "").toLowerCase();

  if (titleLower.includes("sql") || titleLower.includes("database") || titleLower.includes("query") || (lessonId && lessonId.includes("sql"))) {
    return {
      ...CURRICULUM_EXERCISES["sql-customer-orders"],
      id: `ex-${lessonId || "sql"}`,
      lessonId,
      title: `SQL Lab: ${lessonTitle || "Relational Queries"}`,
    };
  }

  if (titleLower.includes("python") || titleLower.includes("machine") || titleLower.includes("algorithm") || (titleLower.includes("data") && !titleLower.includes("database"))) {
    return {
      id: `ex-${lessonId || "py"}`,
      lessonId,
      title: `Python Coding Challenge: ${lessonTitle || "Algorithmic Logic"}`,
      language: "python",
      instructions: `### Challenge Overview
Solve the programming challenge for **${lessonTitle || "Python Fundamentals"}**.
Write a Python program that reads lines from standard input and prints the expected results.

Input format:
Read input from \`sys.stdin\`. Compute the result and output using \`print()\`.`,
      starterCode: `import sys

def solve():
    data = sys.stdin.read().strip()
    # Your solution logic here:
    print(f"Processed: {data}")

if __name__ == '__main__':
    solve()
`,
      testCases: [
        { id: "tc-1", name: "Sample Input", input: "BlezEX Learner", expectedOutput: "Processed: BlezEX Learner" },
        { id: "tc-2", name: "Numeric Input", input: "42", expectedOutput: "Processed: 42", isHidden: true },
      ],
      hints: [
        "Read all inputs from sys.stdin using sys.stdin.read().",
        "Make sure not to leave unexpected debug prints in your submission.",
      ],
    };
  }

  // Default to JavaScript Web/Node challenge
  return {
    ...CURRICULUM_EXERCISES["js-reverse-string"],
    id: `ex-${lessonId || "js"}`,
    lessonId,
    title: `Coding Challenge: ${lessonTitle || "Function Implementation"}`,
  };
}
