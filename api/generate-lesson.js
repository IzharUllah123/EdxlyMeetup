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

  if (!apiKey) {
    console.error('❌ GEMINI_API_KEY missing');
    return res.status(500).json({ error: 'Server configuration error' });
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
    
    // Using gemini-pro model
    const model = genAI.getGenerativeModel({
      model: 'gemini-pro'
    });

    const prompt = `
Create an educational lesson in JSON format.

Skill: "${skillTitle}"
Grade: "${gradeTitle}"

Return ONLY a valid JSON object with this exact structure (no other text):
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

Make it engaging and age-appropriate. Return ONLY the JSON object, no markdown formatting or code blocks.
    `.trim();

    console.log('🤖 Calling Gemini API with gemini-pro...');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    console.log('📝 Raw response:', text.substring(0, 200));

    // Clean up potential markdown formatting
    let cleanText = text.trim();
    cleanText = cleanText.replace(/```json\n?/g, '');
    cleanText = cleanText.replace(/```\n?/g, '');
    cleanText = cleanText.trim();
    
    const jsonResponse = JSON.parse(cleanText);
    
    console.log('✅ Successfully generated lesson');
    return res.status(200).json(jsonResponse);

  } catch (err) {
    console.error('❌ Error details:', {
      name: err.name,
      message: err.message,
      status: err.status
    });
    
    return res.status(500).json({ 
      error: 'Failed to generate lesson',
      details: err.message
    });
  }
}