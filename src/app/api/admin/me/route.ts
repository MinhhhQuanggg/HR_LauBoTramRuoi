import { NextResponse } from "next/server";
import { isAuthenticated, ADMIN_CREDENTIALS } from "@/lib/auth";

export async function GET() {
  const authed = isAuthenticated();
  if (!authed) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { email: ADMIN_CREDENTIALS.email },
  });
}
