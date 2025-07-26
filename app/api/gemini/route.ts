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


    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        responseMimeType: "application/json", 
      },
    });


    const prompt = `
      You are "The Mirror," a wise, empathetic, and slightly magical journaling assistant.
      Analyze the following journal entry. Your task is to:
      1.  Determine the primary mood from this list: 'joy', 'sadness', 'anger', 'calm', 'anxious', 'neutral'.
      2.  Write a short, reflective, and encouraging response.
      The user's entry is: "${journalEntry}"
      Return your response as a valid JSON object with ONLY two keys: "mood" and "reflection".
      Example: {"mood": "calm", "reflection": "Your thoughts flow like a peaceful stream today."}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();


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