import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { journalEntry } = await req.json();

    if (!journalEntry) {
      return NextResponse.json(
        { error: "Journal entry is required." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `
      You are "The Mirror," a wise, empathetic, and slightly magical journaling assistant in the world of Harry Potter.
      Analyze the following journal entry. Your task is to:
      1.  Determine the primary mood from this list: 'joy', 'sadness', 'anger', 'calm', 'anxious', 'neutral'.
      2.  Write a short, reflective, and encouraging response in the first person (as "The Mirror"). Your tone should be wise and magical, like a friendly enchanted object. Keep it to 2-3 sentences.

      The user's entry is: "${journalEntry}"

      Return your response as a JSON object with two keys: "mood" and "reflection".
      For example: {"mood": "calm", "reflection": "Your thoughts flow like a peaceful stream today. Remember, even the quietest moments hold great power and clarity."}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text(); // Use 'let' so we can modify the string

    // --- THIS IS THE NEW, IMPORTANT PART ---
    // Clean the response to remove Markdown formatting
    if (text.startsWith("```json")) {
      text = text.substring(7, text.length - 3); // Remove ```json at the start and ``` at the end
    }
    // --- END OF THE NEW PART ---

    // Now, parse the cleaned text
    const parsedResponse = JSON.parse(text);

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "The Mirror is cloudy right now. Please try again later." },
      { status: 500 }
    );
  }
}