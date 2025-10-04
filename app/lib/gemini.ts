import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from ".././config";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateText(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY not configured. Add your API key to app/config.ts"
    );
  }

  // Aktualne modele Gemini API (2025)

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.warn('Model gemini-2.0-flash failed:, '+error);
  }

  throw new Error(
    "All Gemini models failed. Check your API key and network connection."
  );
}