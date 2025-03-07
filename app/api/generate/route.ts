import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin'
};

const models = [
  'meta-llama/Llama-3.3-70B-Instruct-Turbo-Free',
  'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  'google/gemma-2-27b-it',
  'Qwen/Qwen2.5-Coder-32B-Instruct'
];

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, width, height } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { 
        status: 400,
        headers: corsHeaders 
      });
    }

    const apiKey = process.env.TOGETHER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { 
          status: 500,
          headers: corsHeaders 
        }
      );
    }

    // Initialize OpenAI client
    const client = new OpenAI({
      baseURL: 'https://api.together.xyz/v1',
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    // Translate prompt to English
    let translatedPrompt = prompt;
    let currentModelIndex = 0;
    let translationSuccess = false;

    while (!translationSuccess && currentModelIndex < models.length) {
      try {
        const translationCompletion = await client.chat.completions.create({
          model: models[currentModelIndex],
          messages: [
            {
              role: 'system',
              content: 'You are a language detector and translator. If the input is not in English, translate it to English. If it is already in English, return it as is. Only return the translated text without any explanations or additional text.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: null,
          top_p: 0.7,
        });

        const content = translationCompletion.choices[0]?.message?.content;
        if (!content) {
          throw new Error('Empty translation response from API');
        }

        translatedPrompt = content;
        translationSuccess = true;
      } catch (error) {
        console.error(`Translation error with model ${models[currentModelIndex]}:`, error);
        currentModelIndex++;
      }
    }

    if (!translationSuccess) {
      return NextResponse.json(
        { error: 'Failed to translate prompt' },
        { 
          status: 500,
          headers: corsHeaders 
        }
      );
    }

    const imageWidth = Math.max(256, Math.min(Number(width) || 1024, 1440));
    const imageHeight = Math.max(256, Math.min(Number(height) || 768, 1440));

    const roundedWidth = Math.round(imageWidth / 16) * 16;
    const roundedHeight = Math.round(imageHeight / 16) * 16;

    const response = await fetch('https://api.together.xyz/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'black-forest-labs/FLUX.1-schnell-Free',
        prompt: translatedPrompt,
        width: roundedWidth,
        height: roundedHeight,
        steps: 1,
        response_format: 'b64_json',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate image', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (!data.data?.[0]?.b64_json) {
      console.error('Invalid API response format:', data);
      return NextResponse.json(
        { error: 'Invalid API response format' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageData: data.data[0].b64_json,
      translatedPrompt, // Include the translated prompt in the response
    }, { 
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}