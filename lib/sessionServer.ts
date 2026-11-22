import "server-only";
import { NextResponse } from "next/server";

const COOKIE_NAME = "zabbot_refresh_session";

export const backendAuthUrl = (suffix: string) => {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("Backend API URL is not configured");
  return `${base.replace(/\/$/, "")}/users/auth/${suffix}`;
};

export const proxyPost = async (url: string, payload: unknown) => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => ({ message: "Authentication failed" }));
  return { response, data };
};

export const setRefreshCookie = (response: NextResponse, token: string, stayLoggedIn = false) => {
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true, secure: true, sameSite: "strict", path: "/",
    // "Remember me" persists across browser restarts; otherwise use a session cookie.
    ...(stayLoggedIn ? { maxAge: 60 * 24 * 60 * 60 } : {}),
  });
};

export const clearRefreshCookie = (response: NextResponse) => {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true, secure: true, sameSite: "strict", path: "/", maxAge: 0,
  });
};

export { COOKIE_NAME };
