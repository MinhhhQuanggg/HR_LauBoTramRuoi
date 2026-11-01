export type RegionType =
  | "thu-duc-khu-dong"
  | "go-vap-phu-nhuan"
  | "trung-tam";

export interface Branch {
  id: string;
  cnNumber: number;
  name: string;
  address: string;
  district: string;
  city: string;
  phone?: string;
  region: RegionType;
  mapUrl?: string;
  lat?: number;
  lng?: number;
  isActive?: boolean;
}

export interface BranchGroup {
  region: RegionType;
  title: string;
  description?: string;
  branches: Branch[];
}
