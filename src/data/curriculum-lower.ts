import { SubjectData } from "./curriculum";

export const lowerGradeData: Record<string, Record<string, SubjectData>> = {
  // === PRE-K ===
  prek: {
    math: {
      title: "Pre-K Math",
      description: "Foundation skills, counting objects, letter recognition, and basic concepts.",
      stats: { skills: 170, videos: 155, games: 11 },
      topics: [
        {
          id: "A",
          title: "Numbers to 3",
          skills: [
            { id: "A.1", title: "Identify numbers - up to 3" },
            { id: "A.2", title: "Choose the number that you hear - up to 3" },
          ],
        },
        {
          id: "B",
          title: "Counting to 3",
          skills: [
            { id: "B.1", title: "Learn to count - up to 3" },
            { id: "B.2", title: "Count pictures - up to 3" },
            { id: "B.3", title: "Count dots - up to 3" },
          ],
        },
      ],
    },
  },

  // === KINDERGARTEN ===
  k: {
    math: {
      title: "Kindergarten Math",
      description: "Comparing numbers, shapes, and introduction to addition and subtraction.",
      stats: { skills: 365, videos: 340, games: 56 },
      topics: [
        {
          id: "A",
          title: "Numbers to 10",
          skills: [
            { id: "A.1", title: "Identify numbers - up to 10" },
            { id: "A.2", title: "Count objects - up to 10" },
          ],
        },
        {
          id: "B",
          title: "Addition up to 5",
          skills: [
            { id: "B.1", title: "Add with pictures - sums up to 5" },
            { id: "B.2", title: "Addition sentences - sums up to 5" },
          ]
        }
      ],
    }
  },

  // === GRADE 1 ===
  "1": {
    math: {
      title: "First Grade Math",
      description: "Addition and subtraction strategies, place value, and measurement.",
      stats: { skills: 349, videos: 332, games: 76 },
      topics: [
        {
          id: "A",
          title: "Counting to 100",
          skills: [
            { id: "A.1", title: "Counting review - up to 10" },
            { id: "A.6", title: "Count forward - up to 100" },
          ],
        },
        {
          id: "E",
          title: "Addition",
          skills: [
             { id: "E.1", title: "Addition facts - sums up to 20" },
             { id: "E.8", title: "Add doubles" }
          ]
        }
      ],
    },
  },

  // === GRADE 2 ===
  "2": {
    math: {
      title: "Second Grade Math",
      description: "Multi-digit addition and subtraction, place value to 1,000.",
      stats: { skills: 425, videos: 200, games: 90 },
      topics: [
        {
          id: "A",
          title: "Number Theory",
          skills: [
            { id: "A.1", title: "Even and Odd numbers" },
            { id: "A.6", title: "Place value models - up to hundreds" },
          ],
        },
        {
          id: "G",
          title: "Addition",
          skills: [
             { id: "G.1", title: "Add two-digit numbers" },
             { id: "G.5", title: "Addition word problems - up to two digits" }
          ]
        }
      ],
    },
  },

  // === GRADE 3 ===
  "3": {
    math: {
      title: "Third Grade Math",
      description: "Multiplication, division, fractions, and area.",
      stats: { skills: 398, videos: 250, games: 80 },
      topics: [
        {
          id: "F",
          title: "Multiplication",
          skills: [
            { id: "F.1", title: "Multiplication tables for 2, 3, 4, 5, and 10" },
            { id: "F.2", title: "Multiplication facts up to 10" },
            { id: "F.3", title: "Meaning of multiplication" }
          ],
        },
        {
          id: "W",
          title: "Fractions",
          skills: [
             { id: "W.1", title: "Understand fractions: equal parts" },
             { id: "W.2", title: "Identify fractions on number lines" }
          ]
        }
      ],
    },
  },

  // === GRADE 4 ===
  "4": {
    math: {
      title: "Fourth Grade Math",
      description: "Advanced multiplication, long division, and decimals.",
      stats: { skills: 456, videos: 280, games: 85 },
      topics: [
        {
          id: "D",
          title: "Number Sense",
          skills: [
            { id: "D.1", title: "Place value models" },
            { id: "D.4", title: "Rounding: up to millions place" },
          ],
        },
        {
          id: "F",
          title: "Multiplication",
          skills: [
             { id: "F.1", title: "Multiply 1-digit numbers by 2-digit numbers" },
             { id: "F.2", title: "Box multiplication" }
          ]
        }
      ],
    },
  },

  // === GRADE 5 ===
  "5": {
    math: {
      title: "Fifth Grade Math",
      description: "Decimal operations, fraction operations, and volume.",
      stats: { skills: 480, videos: 300, games: 90 },
      topics: [
        {
          id: "C",
          title: "Multiplication",
          skills: [
            { id: "C.1", title: "Multiply by 2-digit numbers" },
            { id: "C.13", title: "Multiply 2-digit numbers by 3-digit numbers" },
          ],
        },
        {
          id: "L",
          title: "Add and Subtract Fractions",
          skills: [
             { id: "L.3", title: "Add and subtract fractions with like denominators" },
             { id: "L.5", title: "Add and subtract mixed numbers" }
          ]
        }
      ],
    },
  },

  // === GRADE 6 ===
  "6": {
    math: {
      title: "Sixth Grade Math",
      description: "Ratios, percentages, integers, and variable expressions.",
      stats: { skills: 500, videos: 350, games: 100 },
      topics: [
        {
          id: "R",
          title: "Ratios and Proportions",
          skills: [
            { id: "R.1", title: "Write a ratio" },
            { id: "R.5", title: "Unit rates" },
            { id: "R.9", title: "Do the ratios form a proportion?" }
          ],
        },
        {
          id: "Z",
          title: "One-Variable Equations",
          skills: [
             { id: "Z.1", title: "Does x satisfy an equation?" },
             { id: "Z.6", title: "Solve one-step equations with whole numbers" }
          ]
        }
      ],
    },
  },
};