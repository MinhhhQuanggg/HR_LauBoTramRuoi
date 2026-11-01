import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getLifeVideoById, upsertLifeVideo, deleteLifeVideo } from "@/lib/life-videos-store";
import { LifeVideo } from "@/types/life-video";

export const dynamic = "force-dynamic";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<LifeVideo>;

    const existing = await getLifeVideoById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Không tìm thấy video cần cập nhật" }, { status: 404 });
    }

    const updatedVideo: LifeVideo = {
      ...existing,
      ...body,
      id,
      title: body.title ? body.title.trim() : existing.title,
      author: body.author ? body.author.trim() : existing.author,
      platform: body.platform ? body.platform.trim() : existing.platform,
      thumbnail: body.thumbnail ? body.thumbnail.trim() : existing.thumbnail,
      tag: body.tag ? body.tag.trim() : existing.tag,
      url: body.url ? body.url.trim() : existing.url,
      displayOrder: body.displayOrder !== undefined ? Number(body.displayOrder) : existing.displayOrder,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive,
    };

    const saved = await upsertLifeVideo(updatedVideo);
    return NextResponse.json({ success: true, video: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const existing = await getLifeVideoById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Không tìm thấy video để xóa" }, { status: 404 });
    }

    await deleteLifeVideo(id);
    return NextResponse.json({ success: true, message: "Đã xóa video thành công" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
