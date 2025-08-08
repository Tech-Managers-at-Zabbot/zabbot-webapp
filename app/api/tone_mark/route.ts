import { NextRequest, NextResponse } from "next/server";

interface ToneMarkRequestBody {
  text: string;
  language?: "yo";
}

interface ToneMarkResponseBody {
  request_id?: string;
  text: string;
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

  let body: ToneMarkRequestBody;
  try {
    body = (await req.json()) as ToneMarkRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { text, language = "yo" } = body;
  if (!text || !text.trim()) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  try {
    const spitchRes = await fetch("https://api.spi-tch.com/v1/diacritics", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, language }),
    });

    const contentType = spitchRes.headers.get("content-type") ?? "";
    const data = contentType.includes("application/json")
      ? ((await spitchRes.json()) as Partial<ToneMarkResponseBody>)
      : { text: await spitchRes.text() };

    if (!spitchRes.ok) {
      console.error("Tone mark API error:", data);
      return NextResponse.json({ error: data }, { status: spitchRes.status });
    }

    return NextResponse.json(
      { text: (data as ToneMarkResponseBody).text },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    console.error("Error in /api/tone_mark:", err);
    return NextResponse.json({ error: errorMessage(err) }, { status: 500 });
  }
}
