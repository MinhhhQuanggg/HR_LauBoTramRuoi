import fs from "fs";
import path from "path";
import { JOBS_DATA } from "@/data/jobs";
import { JobItem } from "@/types/job";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const OVERRIDE_FILE_PATH = path.join(process.cwd(), "src", "data", "jobs-override.json");

function readOverrideFile(): Record<string, JobItem> {
  try {
    if (fs.existsSync(OVERRIDE_FILE_PATH)) {
      const data = fs.readFileSync(OVERRIDE_FILE_PATH, "utf8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading jobs-override.json:", err);
  }
  return {};
}

function writeOverrideFile(overrides: Record<string, JobItem>) {
  try {
    fs.writeFileSync(OVERRIDE_FILE_PATH, JSON.stringify(overrides, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing jobs-override.json:", err);
  }
}

export async function getJobsList(): Promise<JobItem[]> {
  const overrides = readOverrideFile();
  const baseJobs = [...JOBS_DATA];

  // If Supabase is connected, try fetching from Supabase first
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("jobs")
          .select("*")
          .order("date_posted", { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((j) => ({
            id: j.id,
            slug: j.slug,
            title: j.title,
            category: j.category as any,
            badge: j.badge || undefined,
            badges: (j.badges as string[]) || [],
            salaryDisplay: j.salary_display,
            minSalary: j.min_salary ?? undefined,
            maxSalary: j.max_salary ?? undefined,
            salaryUnit: (j.salary_unit as any) || "MONTH",
            locations: (j.locations as string[]) || [],
            ageRequirement: j.age_requirement || "",
            workType: j.work_type as any,
            workTypeDisplay: j.work_type_display,
            workHours: j.work_hours || undefined,
            experienceDisplay: j.experience_display || "",
            experienceRequirements: j.experience_requirements || "",
            descriptionHtml: j.description_html || undefined,
            concisePost: (j.concise_post as any) || undefined,
            responsibilities: (j.responsibilities as string[]) || [],
            requirements: (j.requirements as string[]) || [],
            benefits: (j.benefits as string[]) || [],
            datePosted: j.date_posted,
            validThrough: j.valid_through,
            isUrgent: j.is_urgent,
            isActive: j.is_active,
            contactZalo: j.contact_zalo || "0981256712",
            images: (j.images as string[]) || [],
            videoUrl: j.video_url || undefined,
            videoPoster: j.video_poster || undefined,
          }));
        }
      }
    } catch (err) {
      console.warn("Supabase load in getJobsList failed, fallback to local:", err);
    }
  }

  // Fallback to base + overrides
  const map = new Map<string, JobItem>();
  for (const job of baseJobs) {
    map.set(job.id, job);
  }
  for (const id in overrides) {
    map.set(id, overrides[id]);
  }

  return Array.from(map.values());
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<JobItem | null> {
  const jobs = await getJobsList();
  return jobs.find((j) => j.id === idOrSlug || j.slug === idOrSlug) || null;
}

export async function upsertJob(job: JobItem): Promise<JobItem> {
  // 1. Save to local overrides
  const overrides = readOverrideFile();
  overrides[job.id] = job;
  writeOverrideFile(overrides);

  // 2. Also sync to Supabase if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const row = {
          id: job.id,
          slug: job.slug,
          title: job.title,
          category: job.category,
          badge: job.badge || null,
          badges: (job.badges as any) || [],
          salary_display: job.salaryDisplay,
          min_salary: job.minSalary ?? null,
          max_salary: job.maxSalary ?? null,
          salary_unit: job.salaryUnit || "MONTH",
          locations: (job.locations as any) || [],
          age_requirement: job.ageRequirement,
          work_type: job.workType,
          work_type_display: job.workTypeDisplay,
          work_hours: job.workHours || null,
          experience_display: job.experienceDisplay,
          experience_requirements: job.experienceRequirements,
          description_html: job.descriptionHtml || null,
          concise_post: (job.concisePost as any) || null,
          responsibilities: (job.responsibilities as any) || [],
          requirements: (job.requirements as any) || [],
          benefits: (job.benefits as any) || [],
          date_posted: job.datePosted,
          valid_through: job.validThrough,
          is_urgent: job.isUrgent ?? false,
          is_active: job.isActive ?? true,
          contact_zalo: job.contactZalo || "0981256712",
          images: (job.images as any) || [],
          video_url: job.videoUrl || null,
          video_poster: job.videoPoster || null,
        };

        const { error } = await supabase.from("jobs").upsert(row as any, { onConflict: "id" });
        if (error) {
          console.error("Error upserting job to Supabase:", error.message);
        }
      }
    } catch (err) {
      console.error("Exception upserting job to Supabase:", err);
    }
  }

  return job;
}

export async function deleteJob(id: string): Promise<boolean> {
  // 1. Remove from local overrides or mark inactive
  const overrides = readOverrideFile();
  if (overrides[id]) {
    delete overrides[id];
    writeOverrideFile(overrides);
  }

  // 2. Remove or deactivate in Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("jobs").delete().eq("id", id);
      }
    } catch (err) {
      console.error("Exception deleting job from Supabase:", err);
    }
  }

  return true;
}
