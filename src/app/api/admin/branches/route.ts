import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getBranchesList, upsertBranch } from "@/lib/branches-store";
import { Branch } from "@/types/branch";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const branches = await getBranchesList(false);
    return NextResponse.json({ success: true, branches });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<Branch>;

    if (!body.name || !body.address || !body.district) {
      return NextResponse.json(
        { success: false, error: "Vui lòng nhập tên chi nhánh, địa chỉ và quận" },
        { status: 400 }
      );
    }

    const cnNumber = Number(body.cnNumber) || Date.now() % 1000;
    const newBranch: Branch = {
      id: body.id || `cn-${cnNumber.toString().padStart(2, "0")}`,
      cnNumber,
      name: body.name.trim(),
      address: body.address.trim(),
      district: body.district.trim(),
      city: body.city?.trim() || "Hồ Chí Minh",
      phone: body.phone?.trim() || "0981256712",
      region: body.region || "trung-tam",
      mapUrl: body.mapUrl?.trim(),
      lat: body.lat !== undefined ? Number(body.lat) : undefined,
      lng: body.lng !== undefined ? Number(body.lng) : undefined,
      isActive: body.isActive !== undefined ? Boolean(body.isActive) : true,
    };

    const saved = await upsertBranch(newBranch);
    return NextResponse.json({ success: true, branch: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
