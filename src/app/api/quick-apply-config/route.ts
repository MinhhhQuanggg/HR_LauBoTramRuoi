import { NextResponse } from "next/server";
import { getQuickApplyConfig } from "@/lib/quick-apply-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = getQuickApplyConfig();
    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
