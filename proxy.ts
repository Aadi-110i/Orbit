import { NextRequest, NextResponse } from "next/server";

/**
 * Orbit runs in guest mode.
 *
 * There is no account wall: the board is stored in the visitor's own browser
 * and the canvas is reachable immediately. This keeps the first-run friction
 * at zero — and avoids a class of bugs where a server-side account store
 * loses data between deployments.
 *
 * The auth routes still exist (they power the optional "Sign out" state in the
 * workspace header) and are open to everyone.
 */

const PUBLIC_PATHS = [
  "/",
  "/home",
  "/login",
  "/signup",
  "/workspace",
  "/api/auth/login",
  "/api/auth/signup",
  "/api/auth/session",
  "/api/auth/logout",
  "/api/ai/stream",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/opengraph-image")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
