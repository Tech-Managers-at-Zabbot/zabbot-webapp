import { NextRequest, NextResponse } from "next/server";
import { backendAuthUrl, clearRefreshCookie, COOKIE_NAME, proxyPost, setRefreshCookie } from "@/lib/sessionServer";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return NextResponse.json({ message: "Login required" }, { status: 401 });
  try {
    const { response: upstream, data } = await proxyPost(backendAuthUrl("refresh-session"), { refreshToken: token });
    if (!upstream.ok || !data?.refreshToken || !data?.token) {
      const denied = NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
      clearRefreshCookie(denied);
      return denied;
    }
    const response = NextResponse.json({ token: data.token });
    setRefreshCookie(response, data.refreshToken, data.stayLoggedIn === true);
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    return NextResponse.json({ message: "Session refresh unavailable" }, { status: 503 });
  }
}
