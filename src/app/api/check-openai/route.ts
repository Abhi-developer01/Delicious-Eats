import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing from environment variables.' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error.message || 'API call failed' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ message: 'API key is valid!', models: data.data.slice(0, 3) }); // show a few models
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to OpenAI.' }, { status: 500 });
  }
}
