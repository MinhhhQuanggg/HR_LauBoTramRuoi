import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getJobsList, upsertJob } from "@/lib/jobs-store";
import { JobItem } from "@/types/job";

export async function GET() {
  try {
    const jobs = await getJobsList();
    return NextResponse.json({ success: true, jobs });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated()) {
    return NextResponse.json({ success: false, error: "Chưa đăng nhập quyền Admin" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<JobItem>;

    if (!body.title || !body.category) {
      return NextResponse.json(
        { success: false, error: "Thiếu tiêu đề hoặc danh mục công việc" },
        { status: 400 }
      );
    }

    const id = body.id || `JOB-${Date.now().toString(36).toUpperCase()}`;
    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const newJob: JobItem = {
      id,
      slug,
      title: body.title,
      category: body.category,
      badge: body.badge,
      badges: body.badges || (body.badge ? [body.badge] : []),
      salaryDisplay: body.salaryDisplay || "Thương lượng",
      minSalary: body.minSalary,
      maxSalary: body.maxSalary,
      salaryUnit: body.salaryUnit || "MONTH",
      locations: body.locations || ["Gò Vấp", "Thủ Đức"],
      ageRequirement: body.ageRequirement || "18 – 30 tuổi",
      workType: body.workType || "FULL_TIME",
      workTypeDisplay: body.workTypeDisplay || "Toàn thời gian",
      workHours: body.workHours,
      experienceDisplay: body.experienceDisplay || "Không yêu cầu",
      experienceRequirements: body.experienceRequirements || "no requirements",
      descriptionHtml: body.descriptionHtml,
      concisePost: body.concisePost,
      responsibilities: body.responsibilities || [],
      requirements: body.requirements || [],
      benefits: body.benefits || [],
      datePosted: body.datePosted || new Date().toISOString().split("T")[0],
      validThrough: body.validThrough || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      isUrgent: body.isUrgent ?? false,
      isActive: body.isActive ?? true,
      contactZalo: body.contactZalo || "0981256712",
      images: body.images || [],
      videoUrl: body.videoUrl,
      videoPoster: body.videoPoster,
    };

    const saved = await upsertJob(newJob);
    return NextResponse.json({ success: true, job: saved });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
