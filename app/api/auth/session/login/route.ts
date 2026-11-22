import { NextRequest, NextResponse } from "next/server";
import { backendAuthUrl, proxyPost, setRefreshCookie } from "@/lib/sessionServer";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    if (!payload || typeof payload.email !== "string" || typeof payload.password !== "string") {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
    }
    const { response: upstream, data } = await proxyPost(backendAuthUrl("login"), payload);
    if (!upstream.ok || !data?.data?.refreshToken) {
      return NextResponse.json(data, { status: upstream.status });
    }
    const { refreshToken, ...publicData } = data.data;
    const response = NextResponse.json({ ...data, data: publicData });
    setRefreshCookie(response, refreshToken, payload.stayLoggedIn === true);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ message: "Login unavailable" }, { status: 502 });
  }
}
