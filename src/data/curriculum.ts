import { lowerGradeData } from "./curriculum-lower";
import { upperGradeData } from "./curriculum-upper";

// --- 1. TYPES ---
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

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface AILesson {
  topicIntro: string;
  questions: QuizQuestion[];
}

// --- 2. THE MERGED DATABASE ---
// This combines your Lower Grade file and Upper Grade file into one
export const curriculumDatabase: Record<string, Record<string, SubjectData>> = {
  ...lowerGradeData,
  ...upperGradeData,
};