import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text, language } = await req.json(); // ✅ FIXED: read language

  try {
    const res = await fetch('https://api.spi-tch.com/v1/diacritics', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SPITCH_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        language: language || "yo" 
      })
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Tone mark API error:", errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("🔥 Error in /api/tone_mark:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
