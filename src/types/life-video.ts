export interface LifeVideo {
  id: string;
  title: string;
  author: string;
  platform: string; // "TikTok" | "Facebook" | "YouTube" | "Instagram" | string
  thumbnail: string;
  tag: string;
  url: string;
  displayOrder?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
