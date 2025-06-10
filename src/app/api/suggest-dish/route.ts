import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const MODEL_NAME = 'models/gemini-2.0-flash'; // full path needed
const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('GOOGLE_GEMINI_API_KEY is not set in .env.local');
}

async function runChat(userInput: string) {
  if (!API_KEY) {
    return {
      error: 'API key not configured. Please check server logs.',
    };
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const parts = [
    {
      text: `You are a helpful culinary assistant. A user is looking for a food suggestion.

User's preference: "${userInput}"

Respond in **this exact format** using markdown:

**Dish Suggestion:** <dish name>

**Image Description:** <describe a photogenic image of the dish>

**Recipe:** 
<step-by-step recipe for the dish, using bullet points or numbered steps>

Do not include anything else in your response.`,
    },
  ];

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts }],
      generationConfig,
      safetySettings,
    });

    if (result.response) {
      const text = await result.response.text();
      return { suggestion: text };
    } else {
      return { error: 'No response from AI model.' };
    }
  } catch (error) {
    console.error('❌ Error in POST /api/suggest-dish:', JSON.stringify(error, null, 2));
    return { error: 'Failed to get suggestion from AI. Please check server logs.' };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();

    if (!userInput) {
      return NextResponse.json({ error: 'User input is required' }, { status: 400 });
    }

    const aiResponse = await runChat(userInput as string);

    if (aiResponse.error) {
      return NextResponse.json({ error: aiResponse.error }, { status: 500 });
    }

    return NextResponse.json({ suggestion: aiResponse.suggestion }, { status: 200 });
  } catch (error) {
    console.error('❌ Unexpected error in POST /api/suggest-dish:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
