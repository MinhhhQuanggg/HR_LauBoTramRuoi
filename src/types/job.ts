export type JobCategory =
  | "Học nghề có lương"
  | "Part-time, Thời vụ"
  | "Full-time"
  | "Trưởng, Quản lý";

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "TEMPORARY" | "CONTRACTOR";

export interface ConcisePoint {
  icon: string;
  label?: string;
  content: string;
}

export interface ConciseJobPost {
  headline: string;
  intro: string;
  points: ConcisePoint[];
  zalo: string;
}

export interface JobItem {
  id: string;
  slug: string;
  title: string;
  category: JobCategory;
  badge?: string;
  badges?: string[];
  salaryDisplay: string;
  minSalary?: number;
  maxSalary?: number;
  salaryUnit?: "MONTH" | "HOUR";
  locations: string[]; // List of districts or locations
  ageRequirement: string;
  workType: EmploymentType;
  workTypeDisplay: string;
  workHours?: string;
  experienceDisplay: string;
  experienceRequirements: string;
  descriptionHtml?: string;
  concisePost?: ConciseJobPost;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  datePosted: string;
  validThrough: string;
  isUrgent?: boolean;
  isActive: boolean;
  contactZalo?: string;
  images?: string[]; // 4 hình ảnh
  videoUrl?: string; // 1 video
  videoPoster?: string;
}

export interface CandidateApplication {
  fullName: string;
  age: string;
  phoneZalo: string;
  appliedRegion?: string;
  address?: string;
  positionId: string;
  positionTitle: string;
  preferredBranch?: string;
  cvFileName?: string;
  cvBase64?: string;
  cvFileSize?: number;
  cvFileType?: string;
  note?: string;
}

