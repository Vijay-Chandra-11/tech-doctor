export type BodyPart = "Head" | "Torso" | "Arms" | "Legs" | "Heart";

export interface Question {
  id: number;
  description: string;
  code: string;
  errorLine: number;
  hint: string;
}

export interface BodyPartData {
  id: BodyPart;
  label: string;
  icon: string;
  color: string;
  glowVar: string;
  questions: Question[];
}

export const bodyPartsData: BodyPartData[] = [
  {
    id: "Head",
    label: "Head",
    icon: "🧠",
    color: "neon-cyan",
    glowVar: "--neon-cyan",
    questions: [
      {
        id: 1,
        description: "Objective: Supposed to reverse a string and return it.",
        code: `def reverse_string(s):
    result = ""
    for i in range(len(s)):
        result = result + s[i]
    return result

print(reverse_string("hello"))`,
        errorLine: 3,
        hint: "Check the string concatenation order",
      },
      {
        id: 2,
        description: "Objective: Supposed to check if a number is prime.",
        code: `def is_prime(n):
    if n < 2:
        return False
    for i in range(2, n):
        if n % i == 0:
            return True
    return True

print(is_prime(7))`,
        errorLine: 6,
        hint: "What should we return when a factor is found?",
      },
    ],
  },
  {
    id: "Torso",
    label: "Torso",
    icon: "🫀",
    color: "neon-magenta",
    glowVar: "--neon-magenta",
    questions: [
      {
        id: 1,
        description: "Objective: Supposed to calculate the factorial of n recursively.",
        code: `def factorial(n):
    if n == 0:
        return 0
    return n * factorial(n - 1)

print(factorial(5))`,
        errorLine: 3,
        hint: "What is the base case for factorial?",
      },
      {
        id: 2,
        description: "Objective: Supposed to find the maximum value in a list.",
        code: `def find_max(lst):
    max_val = lst[0]
    for num in lst:
        if num < max_val:
            max_val = num
    return max_val

print(find_max([3, 7, 1, 9, 4]))`,
        errorLine: 4,
        hint: "Check the comparison operator",
      },
    ],
  },
  {
    id: "Arms",
    label: "Arms",
    icon: "💪",
    color: "neon-magenta",
    glowVar: "--neon-magenta",
    questions: [
      {
        id: 1,
        description: "Objective: Supposed to calculate and store the sum of two numbers.",
        code: `def add_numbers(a, b):
    sum = a - b
    return sum

result = add_numbers(5, 3)
print("Sum:", result)`,
        errorLine: 2,
        hint: "Check the arithmetic operator being used",
      },
      {
        id: 2,
        description: "Objective: Supposed to count occurrences of an element in a list.",
        code: `def count_occurrences(lst, target):
    count = 0
    for item in lst:
        if item == target:
            count = 1
    return count

print(count_occurrences([1,2,2,3,2], 2))`,
        errorLine: 5,
        hint: "How should the counter be updated?",
      },
    ],
  },
  {
    id: "Legs",
    label: "Legs",
    icon: "🦵",
    color: "neon-cyan",
    glowVar: "--neon-cyan",
    questions: [
      {
        id: 1,
        description: "Objective: Supposed to sort a list using bubble sort.",
        code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j] = arr[j+1]
    return arr

print(bubble_sort([64, 34, 25, 12]))`,
        errorLine: 6,
        hint: "What is missing from the swap operation?",
      },
      {
        id: 2,
        description: "Objective: Supposed to compute the nth Fibonacci number.",
        code: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    return fibonacci(n-1) + fibonacci(n-3)

print(fibonacci(10))`,
        errorLine: 6,
        hint: "Check the recursive calls",
      },
    ],
  },
  {
    id: "Heart",
    label: "Heart",
    icon: "❤️",
    color: "neon-crimson",
    glowVar: "--neon-crimson",
    questions: [
      {
        id: 1,
        description: "Objective: Supposed to flatten a nested list one level deep.",
        code: `def flatten(nested):
    result = []
    for sublist in nested:
        for item in sublist:
            result.append(item)
    return nested

lst = [[1,2],[3,4],[5]]
print(flatten(lst))`,
        errorLine: 6,
        hint: "Check what is being returned",
      },
      {
        id: 2,
        description: "Objective: Supposed to remove duplicates from a list while preserving order.",
        code: `def remove_duplicates(lst):
    seen = []
    result = []
    for item in lst:
        if item not in seen:
            seen.append(item)
            result.append(item)
    return seen

print(remove_duplicates([1,2,2,3,1,4]))`,
        errorLine: 8,
        hint: "Check what is being returned at the end",
      },
    ],
  },
];

export interface StudentScore {
  name: string;
  timeTaken: number; // seconds
  organsRestored: number;
  totalScore: number;
}
