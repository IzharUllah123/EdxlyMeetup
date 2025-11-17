// --- 1. TYPES (for AI and Data) ---
export interface Skill {
  id: string;
  title: string;
}

export interface Topic {
  id: string;
  title: string;
  skills: Skill[];
}

export interface SubjectData {
  title: string;
  description: string;
  stats: { skills: number; videos: number; games: number };
  topics: Topic[];
}

export interface AILesson {
  explanation: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// --- 2. THE CURRICULUM DATABASE ---
export const curriculumDatabase: Record<string, Record<string, SubjectData>> = {
  // === PRE-K DATA ===
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

  // === KINDERGARTEN DATA ===
  k: {
    math: {
      title: "Kindergarten math",
      description: "IXL offers hundreds of kindergarten math skills, lessons, and games to explore and learn!",
      stats: { skills: 365, videos: 340, games: 56 },
      topics: [
        {
          id: "A",
          title: "Numbers to 7",
          skills: [
            { id: "A.1", title: "Identify numbers - up to 7" },
            { id: "A.2", title: "Choose the number that you hear - up to 7" },
          ],
        },
        {
          id: "B",
          title: "Counting to 7",
          skills: [
            { id: "B.1", title: "Learn to count to 7" },
            { id: "B.2", title: "Count pictures - up to 7" },
            { id: "B.3", title: "Count shapes - up to 7" },
          ],
        },
      ],
    }
  },

  // === GRADE 1 DATA ===
  "1": {
    math: {
      title: "First Grade Math",
      description: "Addition and subtraction strategies, place value, and logical reasoning.",
      stats: { skills: 349, videos: 332, games: 76 },
      topics: [
        {
          id: "A",
          title: "Counting to 100",
          skills: [
            { id: "A.1", title: "Counting review - up to 10" },
            { id: "A.2", title: "Count to fill a ten frame" },
          ],
        },
      ],
    },
  },

  // === GRADE 2 DATA ===
  "2": {
    math: {
      title: "Second Grade Math",
      description: "Multi-digit addition, subtraction, and introduction to multiplication concepts.",
      stats: { skills: 425, videos: 200, games: 90 },
      topics: [
        {
          id: "A",
          title: "Number Theory",
          skills: [
            { id: "A.1", title: "Even and Odd numbers" },
            { id: "A.2", title: "Place value up to 1,000" },
          ],
        },
      ],
    },
  },
};