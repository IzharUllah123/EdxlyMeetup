import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
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
    console.error('❌ GEMINI_API_KEY missing in environment variables');
    return res.status(500).json({ 
      error: 'Server configuration error',
      details: 'API key not configured'
    });
  }

  try {
    const { skillTitle, gradeTitle } = req.body;

    if (!skillTitle || !gradeTitle) {
      return res.status(400).json({
        error: 'Missing required fields',
        received: { skillTitle, gradeTitle }
      });
    }

    console.log('📚 Generating lesson for:', skillTitle, gradeTitle);

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { 
        responseMimeType: 'application/json',
        temperature: 0.7
      }
    });

    const prompt = `
Create an educational lesson in JSON format.

Skill: "${skillTitle}"
Grade: "${gradeTitle}"

Return ONLY a valid JSON object with this structure:
{
  "explanation": "A clear, detailed explanation of the concept suitable for ${gradeTitle}",
  "question": "A practice question to test understanding",
  "options": [
    "A) First option",
    "B) Second option", 
    "C) Third option",
    "D) Fourth option"
  ],
  "correctAnswer": "A"
}

Make it engaging and age-appropriate. Return only the JSON, no markdown.
    `.trim();

    console.log('🤖 Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log('📝 Raw response length:', text.length);
    console.log('📝 First 200 chars:', text.substring(0, 200));

    // Clean up potential markdown formatting
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const jsonResponse = JSON.parse(cleanText);
    
    console.log('✅ Successfully parsed JSON');
    return res.status(200).json(jsonResponse);

  } catch (err) {
    console.error('❌ Full error:', err);
    console.error('Error name:', err.name);
    console.error('Error message:', err.message);
    console.error('Error stack:', err.stack);
    
    return res.status(500).json({ 
      error: 'Failed to generate lesson',
      details: err.message,
      type: err.name
    });
  }
}