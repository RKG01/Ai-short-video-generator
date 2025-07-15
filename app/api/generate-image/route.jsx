// app/api/generate-image/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Hugging Face API error:", errText);
      throw new Error(errText);
    }

    const buffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

    const uploadedUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image", // ✅ correct for PNG/JPEG
          folder: "ai-shorts/images",
          public_id: `image-${Date.now()}`,
        },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      );
      uploadStream.end(imageBuffer);
    });

    return NextResponse.json({ imageUrl: uploadedUrl });
  } catch (err) {
    console.error("Image generation error:", err);
    return NextResponse.json(
      { error: "Image generation failed", details: err.message },
      { status: 500 }
    );
  }
}
