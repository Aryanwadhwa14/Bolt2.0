import { NextResponse } from "next/server";

// If using OpenAI official SDK (recommended)
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { messages } = await req.json();

    // Basic validation
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    // Create AI response (streaming)
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini", // fast + cheap model
      messages: messages,
      stream: true,
    });

    // Convert to stream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices?.[0]?.delta?.content || "";
          controller.enqueue(content);
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
