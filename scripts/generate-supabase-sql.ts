import * as fs from "fs";
import * as path from "path";
import { ALL_BRANCHES } from "../src/data/branches";
import { JOBS_DATA } from "../src/data/jobs";

function escapeSqlString(val: string | null | undefined): string {
  if (val === null || val === undefined) return "NULL";
  return `'${val.replace(/'/g, "''")}'`;
}

function escapeJson(val: any): string {
  if (val === null || val === undefined) return "'[]'::jsonb";
  return `'${JSON.stringify(val).replace(/'/g, "''")}'::jsonb`;
}

// 1. Generate schema.sql
const schemaSql = `-- ==============================================================================
-- DATABASE SCHEMA: HR LẨU BÒ TRĂM RƯỠI (SUPABASE / POSTGRESQL)
-- ==============================================================================

-- 1. Enable pgcrypto for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- TABLE: branches (Hệ thống chi nhánh)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.branches (
    id TEXT PRIMARY KEY,
    cn_number INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Hồ Chí Minh',
    phone TEXT DEFAULT '0981256712',
    region TEXT NOT NULL, -- 'thu-duc-khu-dong' | 'go-vap-phu-nhuan' | 'trung-tam'
    map_url TEXT,
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- TABLE: jobs (Danh mục vị trí việc làm tuyển dụng)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    badge TEXT,
    badges JSONB DEFAULT '[]'::jsonb,
    salary_display TEXT NOT NULL,
    min_salary BIGINT,
    max_salary BIGINT,
    salary_unit TEXT DEFAULT 'MONTH',
    locations JSONB DEFAULT '[]'::jsonb,
    age_requirement TEXT,
    work_type TEXT NOT NULL,
    work_type_display TEXT NOT NULL,
    work_hours TEXT,
    experience_display TEXT,
    experience_requirements TEXT,
    description_html TEXT,
    concise_post JSONB,
    responsibilities JSONB DEFAULT '[]'::jsonb,
    requirements JSONB DEFAULT '[]'::jsonb,
    benefits JSONB DEFAULT '[]'::jsonb,
    date_posted TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    valid_through TIMESTAMPTZ NOT NULL,
    is_urgent BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    contact_zalo TEXT DEFAULT '0981256712',
    images JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    video_poster TEXT,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==============================================================================
-- TABLE: applications (Hồ sơ ứng tuyển trực tuyến)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    age TEXT NOT NULL,
    phone_zalo TEXT NOT NULL,
    applied_region TEXT,
    address TEXT,
    position_id TEXT REFERENCES public.jobs(id) ON DELETE SET NULL,
    position_title TEXT NOT NULL,
    preferred_branch TEXT,
    cv_file_name TEXT,
    cv_base64 TEXT,
    cv_file_url TEXT,
    cv_file_size BIGINT,
    cv_file_type TEXT,
    note TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'interview_scheduled', 'hired', 'rejected')),
    telegram_notified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_slug ON public.jobs(slug);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON public.jobs(category);
CREATE INDEX IF NOT EXISTS idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX IF NOT EXISTS idx_branches_region ON public.branches(region);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_phone ON public.applications(phone_zalo);

-- ==============================================================================
-- AUTO-UPDATE updated_at TIMESTAMP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_branches_updated_at ON public.branches;
CREATE TRIGGER set_branches_updated_at
    BEFORE UPDATE ON public.branches
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_jobs_updated_at ON public.jobs;
CREATE TRIGGER set_jobs_updated_at
    BEFORE UPDATE ON public.jobs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_applications_updated_at ON public.applications;
CREATE TRIGGER set_applications_updated_at
    BEFORE UPDATE ON public.applications
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Branches Policies: Public read, authenticated/service role write
DROP POLICY IF EXISTS "Public can view branches" ON public.branches;
CREATE POLICY "Public can view branches"
    ON public.branches FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Service role full access on branches" ON public.branches;
CREATE POLICY "Service role full access on branches"
    ON public.branches FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Jobs Policies: Public read active jobs, authenticated/service role full access
DROP POLICY IF EXISTS "Public can view active jobs" ON public.jobs;
CREATE POLICY "Public can view active jobs"
    ON public.jobs FOR SELECT
    USING (is_active = true);

DROP POLICY IF EXISTS "Service role full access on jobs" ON public.jobs;
CREATE POLICY "Service role full access on jobs"
    ON public.jobs FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Applications Policies: Anyone can submit application, service_role/auth can view
DROP POLICY IF EXISTS "Public can insert applications" ON public.applications;
CREATE POLICY "Public can insert applications"
    ON public.applications FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access on applications" ON public.applications;
CREATE POLICY "Service role full access on applications"
    ON public.applications FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
`;

// 2. Generate seed.sql
let seedSql = `-- ==============================================================================
-- SEED DATA: HR LẨU BÒ TRĂM RƯỠI (12 CHI NHÁNH & 13 VỊ TRÍ TUYỂN DỤNG)
-- ==============================================================================

-- 1. Insert Branches
`;

for (const b of ALL_BRANCHES) {
  seedSql += `
INSERT INTO public.branches (
    id, cn_number, name, address, district, city, phone, region, map_url, lat, lng
) VALUES (
    ${escapeSqlString(b.id)},
    ${b.cnNumber},
    ${escapeSqlString(b.name)},
    ${escapeSqlString(b.address)},
    ${escapeSqlString(b.district)},
    ${escapeSqlString(b.city)},
    ${escapeSqlString(b.phone || '0981256712')},
    ${escapeSqlString(b.region)},
    ${escapeSqlString(b.mapUrl)},
    ${b.lat !== undefined ? b.lat : 'NULL'},
    ${b.lng !== undefined ? b.lng : 'NULL'}
) ON CONFLICT (id) DO UPDATE SET
    cn_number = EXCLUDED.cn_number,
    name = EXCLUDED.name,
    address = EXCLUDED.address,
    district = EXCLUDED.district,
    city = EXCLUDED.city,
    phone = EXCLUDED.phone,
    region = EXCLUDED.region,
    map_url = EXCLUDED.map_url,
    lat = EXCLUDED.lat,
    lng = EXCLUDED.lng;
`;
}

seedSql += `\n-- 2. Insert Jobs\n`;

for (const j of JOBS_DATA) {
  seedSql += `
INSERT INTO public.jobs (
    id, slug, title, category, badge, badges,
    salary_display, min_salary, max_salary, salary_unit,
    locations, age_requirement, work_type, work_type_display,
    work_hours, experience_display, experience_requirements,
    description_html, concise_post, responsibilities, requirements, benefits,
    date_posted, valid_through, is_urgent, is_active, contact_zalo,
    images, video_url, video_poster
) VALUES (
    ${escapeSqlString(j.id)},
    ${escapeSqlString(j.slug)},
    ${escapeSqlString(j.title)},
    ${escapeSqlString(j.category)},
    ${escapeSqlString(j.badge)},
    ${escapeJson(j.badges || [])},
    ${escapeSqlString(j.salaryDisplay)},
    ${j.minSalary !== undefined ? j.minSalary : 'NULL'},
    ${j.maxSalary !== undefined ? j.maxSalary : 'NULL'},
    ${escapeSqlString(j.salaryUnit || 'MONTH')},
    ${escapeJson(j.locations || [])},
    ${escapeSqlString(j.ageRequirement)},
    ${escapeSqlString(j.workType)},
    ${escapeSqlString(j.workTypeDisplay)},
    ${escapeSqlString(j.workHours)},
    ${escapeSqlString(j.experienceDisplay)},
    ${escapeSqlString(j.experienceRequirements)},
    ${escapeSqlString(j.descriptionHtml)},
    ${escapeJson(j.concisePost)},
    ${escapeJson(j.responsibilities || [])},
    ${escapeJson(j.requirements || [])},
    ${escapeJson(j.benefits || [])},
    ${escapeSqlString(j.datePosted)},
    ${escapeSqlString(j.validThrough)},
    ${j.isUrgent ? 'true' : 'false'},
    ${j.isActive ? 'true' : 'false'},
    ${escapeSqlString(j.contactZalo || '0981256712')},
    ${escapeJson(j.images || [])},
    ${escapeSqlString(j.videoUrl)},
    ${escapeSqlString(j.videoPoster)}
) ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    badge = EXCLUDED.badge,
    badges = EXCLUDED.badges,
    salary_display = EXCLUDED.salary_display,
    min_salary = EXCLUDED.min_salary,
    max_salary = EXCLUDED.max_salary,
    salary_unit = EXCLUDED.salary_unit,
    locations = EXCLUDED.locations,
    age_requirement = EXCLUDED.age_requirement,
    work_type = EXCLUDED.work_type,
    work_type_display = EXCLUDED.work_type_display,
    work_hours = EXCLUDED.work_hours,
    experience_display = EXCLUDED.experience_display,
    experience_requirements = EXCLUDED.experience_requirements,
    description_html = EXCLUDED.description_html,
    concise_post = EXCLUDED.concise_post,
    responsibilities = EXCLUDED.responsibilities,
    requirements = EXCLUDED.requirements,
    benefits = EXCLUDED.benefits,
    date_posted = EXCLUDED.date_posted,
    valid_through = EXCLUDED.valid_through,
    is_urgent = EXCLUDED.is_urgent,
    is_active = EXCLUDED.is_active,
    contact_zalo = EXCLUDED.contact_zalo,
    images = EXCLUDED.images,
    video_url = EXCLUDED.video_url,
    video_poster = EXCLUDED.video_poster;
`;
}

// 3. Write out files
const fullSql = `${schemaSql}\n\n-- ==============================================================================\n-- SEED DATA\n-- ==============================================================================\n${seedSql}`;

fs.writeFileSync(path.join(process.cwd(), "supabase", "schema.sql"), schemaSql, "utf8");
fs.writeFileSync(path.join(process.cwd(), "supabase", "seed.sql"), seedSql, "utf8");
fs.writeFileSync(path.join(process.cwd(), "supabase", "full_setup.sql"), fullSql, "utf8");

console.log("Generated supabase/schema.sql, supabase/seed.sql, and supabase/full_setup.sql successfully!");
