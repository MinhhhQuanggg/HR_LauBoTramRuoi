import { NextResponse } from "next/server";
import { verifyAdminCredentials, createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ tài khoản và mật khẩu!" },
        { status: 400 }
      );
    }

    const adminUser = await verifyAdminCredentials(email, password);

    if (adminUser) {
      const token = createToken(adminUser.email, adminUser.id);
      const response = NextResponse.json({
        success: true,
        message: "Đăng nhập thành công!",
        user: { email: adminUser.email, name: adminUser.name },
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
      { success: false, error: "Đã có lỗi xảy ra khi xác thực đăng nhập" },
      { status: 500 }
    );
  }
}
