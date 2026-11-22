import { NextRequest, NextResponse } from "next/server";
import { backendAuthUrl, clearRefreshCookie, COOKIE_NAME, proxyPost } from "@/lib/sessionServer";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (token) {
    try {
      const { response: upstream } = await proxyPost(
        backendAuthUrl("logout-session"), { refreshToken: token },
      );
      // A revoked/expired session is already unusable; an upstream outage is not.
      if (upstream.status >= 500) {
        return NextResponse.json({ message: "Logout temporarily unavailable" }, { status: 503 });
      }
    } catch {
      return NextResponse.json({ message: "Logout temporarily unavailable" }, { status: 503 });
    }
  }
  const response = NextResponse.json({ message: "Signed out" });
  clearRefreshCookie(response);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
