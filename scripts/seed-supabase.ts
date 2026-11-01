import { createClient } from "@supabase/supabase-js";
import * as path from "path";
import * as fs from "fs";
import { ALL_BRANCHES } from "../src/data/branches";
import { JOBS_DATA } from "../src/data/jobs";
import { Database } from "../src/types/database";

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

// Load .env.local first, then .env
loadEnvFile(path.resolve(process.cwd(), ".env.local"));
loadEnvFile(path.resolve(process.cwd(), ".env"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

async function seed() {
  console.log("=================================================");
  console.log("🚀 BẮT ĐẦU NẠP DỮ LIỆU VÀO SUPABASE (HR LẨU BÒ TRĂM RƯỠI)");
  console.log("=================================================");

  if (!supabaseUrl || !supabaseKey) {
    console.error("❌ LỖI: Thiếu thông tin kết nối Supabase!");
    console.error("Vui lòng cấu hình file .env.local với các biến:");
    console.error("  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co");
    console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (hoặc NEXT_PUBLIC_SUPABASE_ANON_KEY)");
    console.error("\nHoặc chạy file SQL trực tiếp trong Supabase SQL Editor:");
    console.error("  -> Xem file: supabase/full_setup.sql");
    process.exit(1);
  }

  console.log(`📡 Đang kết nối tới Supabase: ${supabaseUrl}`);
  const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // 1. Seed Branches
  console.log(`\n📍 [1/2] Đang nạp ${ALL_BRANCHES.length} chi nhánh...`);
  const branchRows = ALL_BRANCHES.map((b) => ({
    id: b.id,
    cn_number: b.cnNumber,
    name: b.name,
    address: b.address,
    district: b.district,
    city: b.city,
    phone: b.phone || "0981256712",
    region: b.region,
    map_url: b.mapUrl || null,
    lat: b.lat ?? null,
    lng: b.lng ?? null,
    is_active: true,
  }));

  const { data: branchData, error: branchError } = await supabase
    .from("branches")
    .upsert(branchRows as any, { onConflict: "id" })
    .select("id, name");

  if (branchError) {
    console.error("❌ Lỗi khi nạp branches:", branchError.message);
  } else {
    console.log(`✅ Đã nạp thành công ${branchData?.length || branchRows.length} chi nhánh!`);
  }

  // 2. Seed Jobs
  console.log(`\n💼 [2/2] Đang nạp ${JOBS_DATA.length} vị trí tuyển dụng...`);
  const jobRows = JOBS_DATA.map((j) => ({
    id: j.id,
    slug: j.slug,
    title: j.title,
    category: j.category,
    badge: j.badge || null,
    badges: (j.badges as any) || [],
    salary_display: j.salaryDisplay,
    min_salary: j.minSalary ?? null,
    max_salary: j.maxSalary ?? null,
    salary_unit: j.salaryUnit || "MONTH",
    locations: (j.locations as any) || [],
    age_requirement: j.ageRequirement,
    work_type: j.workType,
    work_type_display: j.workTypeDisplay,
    work_hours: j.workHours || null,
    experience_display: j.experienceDisplay,
    experience_requirements: j.experienceRequirements,
    description_html: j.descriptionHtml || null,
    concise_post: (j.concisePost as any) || null,
    responsibilities: (j.responsibilities as any) || [],
    requirements: (j.requirements as any) || [],
    benefits: (j.benefits as any) || [],
    date_posted: j.datePosted,
    valid_through: j.validThrough,
    is_urgent: j.isUrgent ?? false,
    is_active: j.isActive ?? true,
    contact_zalo: j.contactZalo || "0981256712",
  }));

  const { data: jobData, error: jobError } = await supabase
    .from("jobs")
    .upsert(jobRows as any, { onConflict: "id" })
    .select("id, title");

  if (jobError) {
    console.error("❌ Lỗi khi nạp jobs:", jobError.message);
  } else {
    console.log(`✅ Đã nạp thành công ${jobData?.length || jobRows.length} vị trí việc làm!`);
  }

  console.log("\n=================================================");
  console.log("🎉 HOÀN TẤT NẠP DỮ LIỆU VÀO SUPABASE!");
  console.log("=================================================");
}

seed().catch((err) => {
  console.error("Lỗi thực thi seed script:", err);
  process.exit(1);
});
