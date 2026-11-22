import { NextRequest, NextResponse } from "next/server";
import { backendAuthUrl, clearRefreshCookie, COOKIE_NAME, proxyPost } from "@/lib/sessionServer";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token) {
    try {
      await proxyPost(backendAuthUrl("logout-session"), { refreshToken: token });
    } catch {
      // Clear the browser cookie even if server revocation is temporarily unavailable.
    }
  }
  const response = NextResponse.json({ message: "Signed out" });
  clearRefreshCookie(response);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
