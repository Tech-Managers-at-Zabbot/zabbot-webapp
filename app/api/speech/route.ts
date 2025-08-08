import { NextRequest, NextResponse } from "next/server";

type Voice = "sade" | "femi" | "funmi" | "segun";

interface SpeechRequestBody {
  text: string;
  voice?: Voice;
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return "Unknown error";
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  const apiKey = process.env.SPITCH_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing SPITCH_API_KEY" },
      { status: 500 }
    );
  }

  let body: SpeechRequestBody;
  try {
    body = (await req.json()) as SpeechRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, voice = "sade" } = body;
  if (!text || !text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const spitchRes = await fetch("https://api.spi-tch.com/v1/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        language: "yo",
        voice,
      }),
    });

    if (!spitchRes.ok) {
      const errText = await spitchRes.text();
      console.error("Speech API error:", errText);
      return NextResponse.json({ error: errText }, { status: spitchRes.status });
    }

    const audioBuffer = await spitchRes.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Disposition": 'inline; filename="zabbot-output.wav"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err: unknown) {
    console.error("Error in /api/speech:", err);
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
