import { config } from 'dotenv';
// Make sure this file name matches yours. If your file is ".env", use { path: '.env' }
config({ path: '.env.local' }); 

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { VercelRequest, VercelResponse } from '@vercel/node';

// --- 1. DEBUG: Check if the key is loaded ---
const apiKey = process.env.GEMINI_API_KEY;
console.log('--- API Key Check ---');
if (apiKey && apiKey.length > 10) {
  console.log('GEMINI_API_KEY loaded successfully.');
} else {
  console.error('!!! GEMINI_API_KEY IS MISSING OR EMPTY !!!');
}
// --- End of Debug ---

const genAI = new GoogleGenerativeAI(apiKey || "");

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // --- 2. DEBUG: Check the incoming data ---
    console.log('\n--- New Request Received ---');
    console.log('Request Body:', req.body);
    const { skillTitle, gradeTitle } = req.body;

    if (!skillTitle || !gradeTitle) {
      console.error('!!! ERROR: Missing skillTitle or gradeTitle');
      return res.status(400).json({ error: 'Skill title and grade title are required' });
    }
    
    console.log(`Generating lesson for: ${skillTitle} (Grade: ${gradeTitle})`);
    // --- End of Debug ---

    const prompt = `
      You are an expert ${gradeTitle} tutor.
      A student wants to learn the following skill: "${skillTitle}".

      Your task is to generate a complete mini-lesson for them in a strict JSON format.
      The lesson must include:
      1.  "explanation": A simple, one-paragraph explanation of the skill.
      2.  "question": One multiple-choice question to test this skill.
      3.  "options": An array of four strings (A, B, C, D) for the multiple-choice options.
      4.  "correctAnswer": The correct option (e.g., "B").

      Respond ONLY with the JSON object.
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    console.log('--- AI Response Generated Successfully ---');
    res.status(200).json(JSON.parse(responseText));

  } catch (error) {
    // --- 3. DEBUG: Log the exact error ---
    console.error('\n!!! AN ERROR OCCURRED !!!');
    console.error(error);
    // --- End of Debug ---
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
}