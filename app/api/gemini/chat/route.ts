import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const chat = model.startChat({ history });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });

  } catch (error) {
    return NextResponse.json(
      { error: "The Mirror seems to be sleeping..." },
      { status: 500 }
    );
  }
}