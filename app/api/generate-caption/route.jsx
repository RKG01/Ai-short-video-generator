import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { audioFileUrl } = await req.json(); // ✅ key matches frontend

    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API_KEY,
    });

    const transcript = await client.transcripts.transcribe({
      audio: audioFileUrl,
      speech_model: "universal",
    });

    console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Unknown error" });
  }
}
