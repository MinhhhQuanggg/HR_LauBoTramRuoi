import { NextResponse } from "next/server";
import { ADMIN_CREDENTIALS, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (
      email?.trim().toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const token = createToken();
      const response = NextResponse.json({
        success: true,
        message: "Đăng nhập thành công!",
        user: { email: ADMIN_CREDENTIALS.email },
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return response;
    }

    return NextResponse.json(
      {
        success: false,
        error: "Tài khoản hoặc mật khẩu không chính xác!",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Đã có lỗi xảy ra khi đăng nhập" },
      { status: 500 }
    );
  }
}
