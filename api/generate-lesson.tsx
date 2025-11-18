import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

// ❗ Do NOT use dotenv in Vercel. Environment variables come from Vercel dashboard.
const apiKey = process.env.GEMINI_API_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY missing!");
    return res.status(500).json({ error: "Server error: Missing API key" });
  }

  try {
    // Vercel automatically parses JSON → no need for body parser
    const { skillTitle, gradeTitle } = req.body as {
      skillTitle?: string;
      gradeTitle?: string;
    };

    if (!skillTitle || !gradeTitle) {
      return res.status(400).json({
        error: "skillTitle and gradeTitle are required",
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const prompt = `
      Create a JSON lesson for skill: "${skillTitle}"
      Grade: "${gradeTitle}"
      Format: { explanation, question, options: [A,B,C,D], correctAnswer }
    `;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" }
    });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return res.status(200).json(JSON.parse(text));

  } catch (err) {
    console.error("❌ API Error:", err);
    return res.status(500).json({ error: "Failed to generate lesson" });
  }
}
