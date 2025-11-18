import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🔑 API Key exists:', !!apiKey);
  console.log('📦 Request body:', req.body);

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY missing!');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'GEMINI_API_KEY not found'
    });
  }

  try {
    const { skillTitle, gradeTitle } = req.body;

    if (!skillTitle || !gradeTitle) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'skillTitle and gradeTitle are required',
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const prompt = `
      Create a JSON lesson for skill: "${skillTitle}"
      Grade: "${gradeTitle}"
      
      Return ONLY valid JSON in this exact format:
      {
        "explanation": "detailed explanation",
        "question": "practice question",
        "options": ["A) opt1", "B) opt2", "C) opt3", "D) opt4"],
        "correctAnswer": "A"
      }
    `;

    console.log('🤖 Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    console.log('✅ Gemini response:', text.substring(0, 100));

    const jsonResponse = JSON.parse(text);
    return res.status(200).json(jsonResponse);

  } catch (err: any) {
    console.error('❌ Error:', err.message);
    console.error('Stack:', err.stack);
    return res.status(500).json({ 
      error: 'Failed to generate lesson',
      details: err.message 
    });
  }
}
