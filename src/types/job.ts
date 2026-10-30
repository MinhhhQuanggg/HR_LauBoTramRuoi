export type JobCategory =
  | "Học nghề có lương"
  | "Part-time, Thời vụ"
  | "Full-time"
  | "Trưởng, Quản lý";

export type EmploymentType = "FULL_TIME" | "PART_TIME" | "TEMPORARY" | "CONTRACTOR";

export interface JobItem {
  id: string;
  slug: string;
  title: string;
  category: JobCategory;
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
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  datePosted: string;
  validThrough: string;
  isUrgent?: boolean;
  isActive: boolean;
  contactZalo?: string;
}

export interface CandidateApplication {
  fullName: string;
  age: string;
  phoneZalo: string;
  address: string;
  positionId: string;
  positionTitle: string;
  preferredBranch?: string;
  note?: string;
}
