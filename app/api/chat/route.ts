/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    
    const apiKey = process.env.NEXT_PUBLIC_CHAT_API_KEY

    // Load Yoruba rules prompt from file
    const promptPath = path.join(process.cwd(), 'app', 'api', 'chat', 'yoruba_rules.txt');
    const systemPrompt = await readFile(promptPath, 'utf-8');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        // 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'o4-mini-2025-04-16',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenAI API error:', err);
      return NextResponse.json({ error: err }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
