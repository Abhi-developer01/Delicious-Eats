import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Function to sanitize and improve prompts for DALL-E
function sanitizePrompt(prompt: string): string {
  // Remove any potentially problematic content
  let sanitized = prompt
    .replace(/\*\*/g, '') // Remove markdown formatting
    .replace(/[^\w\s,.-]/g, ' ') // Remove special characters except basic punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Ensure it's a food-related prompt by prefixing if needed
  if (!sanitized.toLowerCase().includes('food') && 
      !sanitized.toLowerCase().includes('dish') && 
      !sanitized.toLowerCase().includes('meal')) {
    sanitized = `A delicious food dish: ${sanitized}`;
  }

  // Add professional food photography style
  sanitized = `Professional food photography of ${sanitized}, appetizing, well-lit, restaurant quality presentation`;

  // Ensure it's not too long (DALL-E has character limits)
  if (sanitized.length > 1000) {
    sanitized = sanitized.substring(0, 1000);
  }

  return sanitized;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Valid prompt is required' }, { status: 400 });
    }

    // Sanitize the prompt
    const sanitizedPrompt = sanitizePrompt(prompt);
    console.log('Original prompt:', prompt);
    console.log('Sanitized prompt:', sanitizedPrompt);

    const image = await openai.images.generate({
      model: 'dall-e-3',
      prompt: sanitizedPrompt,
      n: 1,
      quality: 'standard',
      size: '1024x1024',
      response_format: 'url',
    });

    const imageUrl = image.data?.[0]?.url;

    if (!imageUrl) {
      console.error('No image URL in response:', image);
      return NextResponse.json({ error: 'Image generation failed - no URL returned' }, { status: 500 });
    }

    console.log('Successfully generated image:', imageUrl);
    return NextResponse.json({ imageUrl });

  } catch (error: any) {
    console.error('Image generation error:', error);
    
    // Handle specific OpenAI errors
    if (error.status === 400) {
      console.error('Bad request - likely prompt policy violation');
      return NextResponse.json(
        { 
          error: 'Unable to generate image - content may violate policy. Try a different description.',
          details: 'Please try with a simpler food description.'
        },
        { status: 400 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    if (error.status === 500) {
      return NextResponse.json(
        { error: 'OpenAI service temporarily unavailable. Please try again.' },
        { status: 500 }
      );
    }

    // Generic error
    return NextResponse.json(
      {
        error: 'Image generation failed',
        message: error?.message || 'Unknown error occurred',
      },
      { status: 500 }
    );
  }
}