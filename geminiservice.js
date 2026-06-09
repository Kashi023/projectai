import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateResponse(message) {
  for (let i = 0; i < 3; i++) {
    try {
      const result = await genai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: message,
      });

      return result.text;
    } catch (error) {
      if (i === 2) throw error;

      await new Promise(resolve =>
        setTimeout(resolve, 2000)
      );
    }
  }
}