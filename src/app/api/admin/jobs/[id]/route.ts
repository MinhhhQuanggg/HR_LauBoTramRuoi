import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getJobByIdOrSlug, upsertJob, deleteJob } from "@/lib/jobs-store";
import { JobItem } from "@/types/job";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const job = await getJobByIdOrSlug(params.id);
    if (!job) {
      return NextResponse.json({ success: false, error: "Không tìm thấy công việc" }, { status: 404 });
    }
    return NextResponse.json({ success: true, job });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const existing = await getJobByIdOrSlug(params.id);
    if (!existing) {
      return NextResponse.json({ success: false, error: "Không tìm thấy công việc" }, { status: 404 });
    }

    const body = (await request.json()) as Partial<JobItem>;

    const updatedJob: JobItem = {
      ...existing,
      ...body,
      id: existing.id, // ID remains invariant
      slug: body.slug || existing.slug,
      title: body.title || existing.title,
      category: body.category || existing.category,
      salaryDisplay: body.salaryDisplay !== undefined ? body.salaryDisplay : existing.salaryDisplay,
      minSalary: body.minSalary !== undefined ? body.minSalary : existing.minSalary,
      maxSalary: body.maxSalary !== undefined ? body.maxSalary : existing.maxSalary,
      salaryUnit: body.salaryUnit || existing.salaryUnit,
      ageRequirement: body.ageRequirement !== undefined ? body.ageRequirement : existing.ageRequirement,
      workTypeDisplay: body.workTypeDisplay !== undefined ? body.workTypeDisplay : existing.workTypeDisplay,
      workHours: body.workHours !== undefined ? body.workHours : existing.workHours,
      experienceDisplay: body.experienceDisplay !== undefined ? body.experienceDisplay : existing.experienceDisplay,
      badges: body.badges || existing.badges,
      badge: body.badge !== undefined ? body.badge : existing.badge,
      locations: body.locations || existing.locations,
      concisePost: body.concisePost !== undefined ? body.concisePost : existing.concisePost,
      responsibilities: body.responsibilities || existing.responsibilities,
      requirements: body.requirements || existing.requirements,
      benefits: body.benefits || existing.benefits,
      isUrgent: body.isUrgent !== undefined ? body.isUrgent : existing.isUrgent,
      isActive: body.isActive !== undefined ? body.isActive : existing.isActive,
      contactZalo: body.contactZalo !== undefined ? body.contactZalo : existing.contactZalo,
      images: body.images !== undefined ? body.images : existing.images,
      videoUrl: body.videoUrl !== undefined ? body.videoUrl : existing.videoUrl,
      videoPoster: body.videoPoster !== undefined ? body.videoPoster : existing.videoPoster,
    };

    const saved = await upsertJob(updatedJob);
    return NextResponse.json({ success: true, job: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Params) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    await deleteJob(params.id);
    return NextResponse.json({ success: true, message: "Đã xóa công việc thành công" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
