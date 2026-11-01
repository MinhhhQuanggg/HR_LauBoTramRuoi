import { NextResponse } from "next/server";
import { getBranchesList } from "@/lib/branches-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const branches = await getBranchesList(true);
    return NextResponse.json({ success: true, branches });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
