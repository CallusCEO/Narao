import useAIModel from "@/hooks/useAIModel";
import { GoogleGenAI } from "@google/genai";

async function POST(request: Request) {

    const { model } = useAIModel();

    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
        return new Response("API key not found", { status: 500 });
    }
    
    const ai = new GoogleGenAI({ apiKey });

  const chat = ai.chats.create({
    model: model,
    history: [
        //   passed history (props)
        await request.json(),
    ],
  });

  const response = await chat.sendMessageStream({
    message: "I have 2 dogs in my house.",
  });

  for await (const chunk of response) {
    console.log(chunk.text);
    return new Response(chunk.text, {
        headers: {
            "Content-Type": "text/event-stream",
        },
    });
  }

}