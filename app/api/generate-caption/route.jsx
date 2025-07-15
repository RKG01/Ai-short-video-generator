import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";


export async function POST(req) {
  try {
    const { audioFileURL } = await req.json(); // ✅ key matches frontend
      
    if (!audioFileURL) {
      return NextResponse.json(
        { error: 'audioFileURL is required' },
        { status: 400 }
      );
    }
    const client = new AssemblyAI({
      apiKey: process.env.CAPTION_API_KEY,
    });

    const transcript = await client.transcripts.transcribe({
      audio: audioFileURL,
      speech_model: "universal",
    });

    console.log(transcript.words);
    return NextResponse.json({ result: transcript.words });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Unknown error" });
  }
}
