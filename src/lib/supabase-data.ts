import { ALL_BRANCHES } from "@/data/branches";
import { JOBS_DATA } from "@/data/jobs";
import { Branch, RegionType } from "@/types/branch";
import { JobItem, JobCategory, EmploymentType } from "@/types/job";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

import { getBranchesList } from "@/lib/branches-store";

export async function fetchAllBranches(): Promise<Branch[]> {
  try {
    return await getBranchesList(true);
  } catch (err) {
    console.error("fetchAllBranches exception:", err);
    return ALL_BRANCHES;
  }
}


export async function fetchAllJobs(): Promise<JobItem[]> {
  if (!isSupabaseConfigured()) {
    return JOBS_DATA;
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return JOBS_DATA;

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("date_posted", { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.error("Error fetching jobs from Supabase:", error.message);
      return JOBS_DATA;
    }

    return data.map((j) => ({
      id: j.id,
      slug: j.slug,
      title: j.title,
      category: j.category as JobCategory,
      badge: j.badge || undefined,
      badges: (j.badges as string[]) || [],
      salaryDisplay: j.salary_display,
      minSalary: j.min_salary ?? undefined,
      maxSalary: j.max_salary ?? undefined,
      salaryUnit: (j.salary_unit as "MONTH" | "HOUR") || "MONTH",
      locations: (j.locations as string[]) || [],
      ageRequirement: j.age_requirement || "",
      workType: j.work_type as EmploymentType,
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
    }));
  } catch (err) {
    console.error("Supabase fetchAllJobs exception:", err);
    return JOBS_DATA;
  }
}

export async function fetchJobBySlug(slug: string): Promise<JobItem | null> {
  if (!isSupabaseConfigured()) {
    return JOBS_DATA.find((j) => j.slug === slug) || null;
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return JOBS_DATA.find((j) => j.slug === slug) || null;
    }

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) {
      return JOBS_DATA.find((j) => j.slug === slug) || null;
    }

    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      category: data.category as JobCategory,
      badge: data.badge || undefined,
      badges: (data.badges as string[]) || [],
      salaryDisplay: data.salary_display,
      minSalary: data.min_salary ?? undefined,
      maxSalary: data.max_salary ?? undefined,
      salaryUnit: (data.salary_unit as "MONTH" | "HOUR") || "MONTH",
      locations: (data.locations as string[]) || [],
      ageRequirement: data.age_requirement || "",
      workType: data.work_type as EmploymentType,
      workTypeDisplay: data.work_type_display,
      workHours: data.work_hours || undefined,
      experienceDisplay: data.experience_display || "",
      experienceRequirements: data.experience_requirements || "",
      descriptionHtml: data.description_html || undefined,
      concisePost: (data.concise_post as any) || undefined,
      responsibilities: (data.responsibilities as string[]) || [],
      requirements: (data.requirements as string[]) || [],
      benefits: (data.benefits as string[]) || [],
      datePosted: data.date_posted,
      validThrough: data.valid_through,
      isUrgent: data.is_urgent,
      isActive: data.is_active,
      contactZalo: data.contact_zalo || "0981256712",
    };
  } catch (err) {
    console.error(`Supabase fetchJobBySlug(${slug}) exception:`, err);
    return JOBS_DATA.find((j) => j.slug === slug) || null;
  }
}
