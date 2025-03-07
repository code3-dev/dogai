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
    const { prompt } = await request.json();

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

    const client = new OpenAI({
      baseURL: 'https://api.together.xyz/v1',
      apiKey: apiKey,
      dangerouslyAllowBrowser: true,
    });

    let currentModelIndex = 0;
    let success = false;
    let enhancedPrompt = '';
    let lastError = null;

    while (!success && currentModelIndex < models.length) {
      try {
        const chatCompletion = await client.chat.completions.create({
          model: models[currentModelIndex],
          messages: [
            {
              role: 'system',
              content: 'You are an expert at writing descriptive prompts for AI image generation. Create detailed, vivid prompts that will result in high-quality, artistic images. Focus on visual details, style, lighting, and composition.',
            },
            {
              role: 'user',
              content: `Create a detailed image generation prompt based on this idea: "${prompt}". The output should be a single enhanced prompt without any explanations or additional text. and ouput send as user prompt language.`,
            },
          ],
          temperature: 0.7,
          max_tokens: 150,
          top_p: 0.7,
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) {
          throw new Error('Empty response from API');
        }

        enhancedPrompt = content;
        success = true;
      } catch (error) {
        console.error(`Error with model ${models[currentModelIndex]}:`, error);
        lastError = error;
        currentModelIndex++;
      }
    }

    if (!success) {
      console.error('All models failed. Last error:', lastError);
      return NextResponse.json(
        { error: 'Failed to generate prompt with all available models' },
        { 
          status: 500,
          headers: corsHeaders 
        }
      );
    }

    return NextResponse.json({ enhancedPrompt }, { 
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Error in prompt generation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}