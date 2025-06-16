import { NextResponse } from 'next/server';
import { ChatSession } from '../../../configs/AiModel';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const text = await ChatSession(prompt);
    return NextResponse.json({ result: text });
    
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json(
      { 
        error: err.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}