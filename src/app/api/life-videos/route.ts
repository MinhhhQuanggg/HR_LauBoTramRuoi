import { NextResponse } from "next/server";
import { getLifeVideosList } from "@/lib/life-videos-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const videos = await getLifeVideosList(true);
    return NextResponse.json({ success: true, videos });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
