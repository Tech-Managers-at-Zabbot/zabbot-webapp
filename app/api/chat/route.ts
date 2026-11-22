import { NextRequest, NextResponse } from "next/server";

/**
 * In-lesson Ọ̀rẹ́ proxy: never call OpenAI directly.
 * The authenticated backend validates content, ADMIN state and shared
 * AI quota. Subscription enforcement is independently feature-flagged there.
 */
export async function POST(req: NextRequest) {
  const bearer = req.headers.get("authorization");
  if (!bearer || !/^Bearer\s+\S+$/i.test(bearer)) {
    return NextResponse.json({ code: "LOGIN_REQUIRED" }, { status: 401 });
  }

  let body: { contentId?: unknown; message?: unknown } | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "INVALID_REQUEST" }, { status: 400 });
  }
  if (
    !body || typeof body.contentId !== "string" ||
    typeof body.message !== "string" ||
    body.message.trim().length === 0 || body.message.length > 1000
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
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          contentId: body.contentId,
          message: body.message,
        }),
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
