import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getBranchById, upsertBranch, deleteBranch } from "@/lib/branches-store";
import { Branch } from "@/types/branch";

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
    const body = (await request.json()) as Partial<Branch>;

    const existing = await getBranchById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Không tìm thấy chi nhánh cần cập nhật" }, { status: 404 });
    }

    const updated: Branch = {
      ...existing,
      ...body,
      id,
      cnNumber: body.cnNumber !== undefined ? Number(body.cnNumber) : existing.cnNumber,
      name: body.name ? body.name.trim() : existing.name,
      address: body.address ? body.address.trim() : existing.address,
      district: body.district ? body.district.trim() : existing.district,
      city: body.city ? body.city.trim() : existing.city,
      phone: body.phone ? body.phone.trim() : existing.phone,
      region: body.region || existing.region,
      mapUrl: body.mapUrl !== undefined ? body.mapUrl.trim() : existing.mapUrl,
      lat: body.lat !== undefined ? Number(body.lat) : existing.lat,
      lng: body.lng !== undefined ? Number(body.lng) : existing.lng,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : existing.isActive,
    };

    const saved = await upsertBranch(updated);
    return NextResponse.json({ success: true, branch: saved });
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
    const existing = await getBranchById(id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Không tìm thấy chi nhánh để xóa" }, { status: 404 });
    }

    await deleteBranch(id);
    return NextResponse.json({ success: true, message: "Đã xóa chi nhánh thành công" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
