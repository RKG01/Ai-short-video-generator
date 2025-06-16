import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize with error checking
if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = ai.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json'
  }
});

export async function ChatSession(prompt) {
  try {
    if (!prompt?.trim()) {
      throw new Error('Prompt cannot be empty');
    }

    const chat = model.startChat({
      history: []
    });

    const result = await chat.sendMessage(prompt);
    return result.response.text();
    
  } catch (error) {
    console.error('Gemini API Error Details:', {
      message: error.message,
      stack: error.stack,
      request: prompt
    });
    
    throw new Error(`AI Service Error: ${error.message}`);
  }
}