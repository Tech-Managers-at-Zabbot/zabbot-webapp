/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  // Phase 2: when explicitly enabled, NEVER invoke OpenAI directly from
  // Next.js. All lesson chat requests go through backend authentication,
  // DB-verified lesson context, and the shared atomic 30/day quota.
  // Legacy behavior is retained only while the release flag is OFF.
  if (process.env.ZABBOT_SUBSCRIPTION_GATING_ENFORCE === "true") {
    const bearer = req.headers.get("authorization");
    if (!bearer || !/^Bearer\s+\S+$/i.test(bearer)) {
      return NextResponse.json({ code: "LOGIN_REQUIRED" }, { status: 401 });
    }
    let payload: unknown;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400 });
    }
    const body = payload as { contentId?: unknown; message?: unknown } | null;
    if (
      !body ||
      typeof body.contentId !== "string" ||
      typeof body.message !== "string" ||
      body.message.length < 1 ||
      body.message.length > 1000
    ) {
      return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400 });
    }
    const base = process.env.NEXT_PUBLIC_API_URL;
    if (!base) {
      return NextResponse.json({ code: "CHAT_UNAVAILABLE" }, { status: 503 });
    }
    try {
      const upstream = await fetch(
        `${base.replace(/\/$/, "")}/users/chat/lesson-practice`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
          },
          body: JSON.stringify({
            contentId: body.contentId,
            message: body.message,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(35000),
        },
      );
      const data = await upstream.json().catch(() => ({ code: "CHAT_UNAVAILABLE" }));
      return NextResponse.json(data, {
        status: upstream.status,
        headers: { "Cache-Control": "no-store" },
      });
    } catch {
      return NextResponse.json({ code: "CHAT_UNAVAILABLE" }, { status: 503 });
    }
  }
  try {
    const { message } = await req.json();
    
    const apiKey = process.env.OPENAI_API_KEY;

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
        model: 'gpt-4.1-mini',
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
