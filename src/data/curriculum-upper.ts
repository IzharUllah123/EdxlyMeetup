import { SubjectData } from "./curriculum";

export const upperGradeData: Record<string, Record<string, SubjectData>> = {
  // === GRADE 7 ===
  "7": {
    math: {
      title: "Seventh Grade Math",
      description: "Proportional relationships, rational numbers, and probability.",
      stats: { skills: 520, videos: 360, games: 100 },
      topics: [
        {
          id: "C",
          title: "Operations with Integers",
          skills: [
            { id: "C.1", title: "Add and subtract integers" },
            { id: "C.3", title: "Multiply and divide integers" },
            { id: "C.5", title: "Add and subtract integers: word problems" }
          ],
        },
        {
          id: "J",
          title: "Ratios, Rates, and Proportions",
          skills: [
             { id: "J.1", title: "Understanding ratios" },
             { id: "J.10", title: "Solve proportions" }
          ]
        }
      ],
    },
  },

  // === GRADE 8 ===
  "8": {
    math: {
      title: "Eighth Grade Math",
      description: "Linear equations, functions, and the Pythagorean theorem.",
      stats: { skills: 550, videos: 400, games: 110 },
      topics: [
        {
          id: "Y",
          title: "Linear Equations",
          skills: [
            { id: "Y.1", title: "Find the slope of a graph" },
            { id: "Y.2", title: "Find the slope from two points" },
            { id: "Y.8", title: "Write a linear equation from a slope and y-intercept" },
          ],
        },
        {
          id: "T",
          title: "Pythagorean Theorem",
          skills: [
             { id: "T.1", title: "Pythagorean theorem: find the length of the hypotenuse" },
             { id: "T.2", title: "Pythagorean theorem: find the missing leg length" }
          ]
        }
      ],
    },
  },

  // === GRADE 9 (Algebra 1) ===
  "9": {
    math: {
      title: "Grade 9 (Algebra 1)",
      description: "Quadratics, systems of equations, and inequalities.",
      stats: { skills: 600, videos: 450, games: 120 },
      topics: [
        {
          id: "Q",
          title: "Relations and Functions",
          skills: [
            { id: "Q.1", title: "Identify functions" },
            { id: "Q.2", title: "Evaluate a function" },
            { id: "Q.4", title: "Find the range of a function" }
          ],
        },
        {
          id: "BB",
          title: "Quadratic Equations",
          skills: [
             { id: "BB.1", title: "Solve a quadratic equation using the zero product property" },
             { id: "BB.6", title: "Solve a quadratic equation by factoring" }
          ]
        }
      ],
    },
  },

  // === GRADE 10 (Geometry) ===
  "10": {
    math: {
      title: "Grade 10 (Geometry)",
      description: "Proofs, similarity, trigonometry, and coordinate geometry.",
      stats: { skills: 600, videos: 450, games: 120 },
      topics: [
        {
          id: "B",
          title: "Points, Lines, and Segments",
          skills: [
            { id: "B.1", title: "Lines, line segments, and rays" },
            { id: "B.5", title: "Midpoint formula" },
          ],
        },
        {
          id: "R",
          title: "Trigonometry",
          skills: [
             { id: "R.1", title: "Trigonometric ratios: sin, cos, and tan" },
             { id: "R.11", title: "Solve a right triangle" },
             { id: "R.13", title: "Law of Sines" }
          ]
        }
      ],
    },
  },

  // === GRADE 11 (Algebra 2) ===
  "11": {
    math: {
      title: "Grade 11 (Algebra 2)",
      description: "Polynomials, logarithms, and complex numbers.",
      stats: { skills: 650, videos: 500, games: 120 },
      topics: [
        {
          id: "K",
          title: "Polynomials",
          skills: [
            { id: "K.1", title: "Polynomial vocabulary" },
            { id: "K.2", title: "Factor polynomials" },
          ],
        },
        {
          id: "S",
          title: "Logarithms",
          skills: [
             { id: "S.1", title: "Convert between exponential and logarithmic form" },
             { id: "S.4", title: "Properties of logarithms" },
             { id: "S.6", title: "Solve logarithmic equations" }
          ]
        }
      ],
    },
  },

  // === GRADE 12 (Calculus) ===
  "12": {
    math: {
      title: "Grade 12 (Pre-calculus & Calculus)",
      description: "Limits, derivatives, vectors, and matrices.",
      stats: { skills: 700, videos: 550, games: 130 },
      topics: [
        {
          id: "D",
          title: "Functions",
          skills: [
            { id: "D.1", title: "Domain and range" },
            { id: "D.4", title: "Composition of functions" },
          ],
        },
        {
          id: "N",
          title: "Limits",
          skills: [
             { id: "N.1", title: "Find limits using graphs" },
             { id: "N.3", title: "Find limits using substitution" }
          ]
        },
        {
          id: "P",
          title: "Derivatives",
          skills: [
             { id: "P.1", title: "Find the derivative of a polynomial" },
             { id: "P.5", title: "Power rule" },
             { id: "P.10", title: "Chain rule" }
          ]
        }
      ],
    },
  },
};