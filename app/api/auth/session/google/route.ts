import { NextRequest, NextResponse } from "next/server";
import { backendAuthUrl, proxyPost, setRefreshCookie } from "@/lib/sessionServer";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (typeof code !== "string" || code.length > 160) {
      return NextResponse.json({ message: "Invalid Google login code" }, { status: 400 });
    }
    const { response: upstream, data } = await proxyPost(backendAuthUrl("google/exchange"), { code });
    if (!upstream.ok || !data?.refreshToken) {
      return NextResponse.json({ message: data?.message || "Google sign-in expired" }, { status: upstream.status });
    }
    const { refreshToken, ...publicData } = data;
    const response = NextResponse.json(publicData);
    setRefreshCookie(response, refreshToken);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ message: "Google login unavailable" }, { status: 502 });
  }
}
