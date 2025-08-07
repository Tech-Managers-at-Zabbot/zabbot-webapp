import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  const { text, voice } = await req.json();

  try {
    const res = await fetch('https://api.spi-tch.com/v1/speech', {
        method: 'POST',
        headers: {Authorization: `Bearer ${process.env.SPITCH_API_KEY}`, 'Content-Type': 'application/json'},
        body: JSON.stringify({text, language: 'yo', voice})
      });

    if (!res.ok) 
      {
        const errorText = await res.text();
        console.error('Speech API error:', errorText);
        return NextResponse.json({ error: errorText }, { status: res.status });
      }

    const buffer = await res.arrayBuffer();
    return new Response(buffer, 
      {
        headers: 
        {
          'Content-Type': 'audio/wav',
          'Content-Disposition': 'inline; filename="zabbot-output.wav"'
        }
     }
    );
  } 
  catch (error: any) 
  {
    console.error('🔥 Error while calling Spitch speech API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}