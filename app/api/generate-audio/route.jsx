import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(req) {
  try {
    const { text, voiceId = 'EXAVITQu4vr4xnSDxMaL' } = await req.json();

    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.4,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('ElevenLabs API error:', errText);
      return NextResponse.json({ error: 'TTS API failed', details: errText }, { status: 500 });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ⬇️ Upload audio to Cloudinary
    const uploadedUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'video', // important for MP3
          folder: 'ai-shorts/audio',
          format: 'mp3',
          public_id: `audio-${Date.now()}`
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });

    // 🎯 Return uploaded Cloudinary URL
    return NextResponse.json({ url: uploadedUrl });
  } catch (error) {
    console.error('Voice generation or upload error:', error);
    return NextResponse.json({ error: 'Voice generation or upload failed' }, { status: 500 });
  }
}
