import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {

    const { message } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });


    const prompt = `You are "The Mirror," a wise, magical artifact. A user is speaking to you.
    User's message: "${message}"
    Your task is to respond as The Mirror in a brief, wise, and slightly magical tone.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "The Mirror seems to be sleeping..." },
      { status: 500 }
    );
  }
}