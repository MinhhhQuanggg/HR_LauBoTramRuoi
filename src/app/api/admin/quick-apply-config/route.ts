import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getQuickApplyConfig, saveQuickApplyConfig } from "@/lib/quick-apply-store";
import { QuickApplyConfig } from "@/types/quick-apply";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const config = getQuickApplyConfig();
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<QuickApplyConfig>;
    const updated = saveQuickApplyConfig(body);
    return NextResponse.json({ success: true, config: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
