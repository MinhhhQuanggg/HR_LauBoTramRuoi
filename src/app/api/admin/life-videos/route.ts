import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getLifeVideosList, upsertLifeVideo } from "@/lib/life-videos-store";
import { LifeVideo } from "@/types/life-video";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const videos = await getLifeVideosList(false);
    return NextResponse.json({ success: true, videos });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<LifeVideo>;

    if (!body.title || !body.url || !body.thumbnail) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập đầy đủ tiêu đề, link video và ảnh thumbnail" },
        { status: 400 }
      );
    }

    const newVideo: LifeVideo = {
      id: body.id || `VID-${Date.now().toString(36).toUpperCase()}`,
      title: body.title.trim(),
      author: body.author?.trim() || "@tiemlaubotramruoi",
      platform: body.platform?.trim() || "TikTok",
      thumbnail: body.thumbnail.trim(),
      tag: body.tag?.trim() || "Đời sống Trăm Rưởi",
      url: body.url.trim(),
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : 0,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    };

    const saved = await upsertLifeVideo(newVideo);
    return NextResponse.json({ success: true, video: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
