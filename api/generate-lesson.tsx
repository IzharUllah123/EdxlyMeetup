import { GoogleGenAI } from "@google/genai";
import type { AILesson } from "../src/data/curriculum";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { skillTitle, gradeTitle } = req.body;

    if (!skillTitle || !gradeTitle) {
      return res.status(400).json({ error: 'Missing skillTitle or gradeTitle' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ error: 'AI service unavailable' });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Generate a lesson for ${gradeTitle} students, specifically for the skill: "${skillTitle}".

Please respond with a JSON object exactly in this format:
{
  "explanation": "A short explanation of the concept in simple terms that ${gradeTitle} students can understand",
  "question": "A practice question related to the skill",
  "options": ["A. option one", "B. option two", "C. option three", "D. option four"],
  "correctAnswer": "A"
}

Make sure the options are prefixed with A., B., C., D. and one of them is correct. The correctAnswer should be just the letter (A, B, C, or D). Keep everything appropriate for ${gradeTitle} level.`;

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
    });

    let generatedText = response.text;

    if (!generatedText) {
      throw new Error('No response from AI');
    }

    // Clean the response
    generatedText = generatedText.replace(/```json\s*/, '').replace(/\s*```\s*$/, '').trim();

    let lesson: AILesson;
    try {
      lesson = JSON.parse(generatedText);
    } catch (parseError) {
      console.error('Failed to parse AI response:', generatedText);
      throw new Error('Invalid response format from AI');
    }

    // Validate the lesson structure
    if (!lesson.explanation || !lesson.question || !Array.isArray(lesson.options) || lesson.options.length !== 4 || !lesson.correctAnswer) {
      throw new Error('Incomplete lesson data from AI');
    }

    res.status(200).json(lesson);

  } catch (error) {
    console.error('AI Lesson generation error:', error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
}
