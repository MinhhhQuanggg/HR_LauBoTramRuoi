export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      branches: {
        Row: {
          id: string;
          cn_number: number;
          name: string;
          address: string;
          district: string;
          city: string;
          phone: string | null;
          region: string;
          map_url: string | null;
          lat: number | null;
          lng: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          cn_number: number;
          name: string;
          address: string;
          district: string;
          city?: string;
          phone?: string | null;
          region: string;
          map_url?: string | null;
          lat?: number | null;
          lng?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          cn_number?: number;
          name?: string;
          address?: string;
          district?: string;
          city?: string;
          phone?: string | null;
          region?: string;
          map_url?: string | null;
          lat?: number | null;
          lng?: number | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      jobs: {
        Row: {
          id: string;
          slug: string;
          title: string;
          category: string;
          badge: string | null;
          badges: Json | null;
          salary_display: string;
          min_salary: number | null;
          max_salary: number | null;
          salary_unit: string | null;
          locations: Json | null;
          age_requirement: string | null;
          work_type: string;
          work_type_display: string;
          work_hours: string | null;
          experience_display: string | null;
          experience_requirements: string | null;
          description_html: string | null;
          concise_post: Json | null;
          responsibilities: Json | null;
          requirements: Json | null;
          benefits: Json | null;
          date_posted: string;
          valid_through: string;
          is_urgent: boolean;
          is_active: boolean;
          contact_zalo: string | null;
          images: Json | null;
          video_url: string | null;
          video_poster: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          slug: string;
          title: string;
          category: string;
          badge?: string | null;
          badges?: Json | null;
          salary_display: string;
          min_salary?: number | null;
          max_salary?: number | null;
          salary_unit?: string | null;
          locations?: Json | null;
          age_requirement?: string | null;
          work_type: string;
          work_type_display: string;
          work_hours?: string | null;
          experience_display?: string | null;
          experience_requirements?: string | null;
          description_html?: string | null;
          concise_post?: Json | null;
          responsibilities?: Json | null;
          requirements?: Json | null;
          benefits?: Json | null;
          date_posted?: string;
          valid_through: string;
          is_urgent?: boolean;
          is_active?: boolean;
          contact_zalo?: string | null;
          images?: Json | null;
          video_url?: string | null;
          video_poster?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          category?: string;
          badge?: string | null;
          badges?: Json | null;
          salary_display?: string;
          min_salary?: number | null;
          max_salary?: number | null;
          salary_unit?: string | null;
          locations?: Json | null;
          age_requirement?: string | null;
          work_type?: string;
          work_type_display?: string;
          work_hours?: string | null;
          experience_display?: string | null;
          experience_requirements?: string | null;
          description_html?: string | null;
          concise_post?: Json | null;
          responsibilities?: Json | null;
          requirements?: Json | null;
          benefits?: Json | null;
          date_posted?: string;
          valid_through?: string;
          is_urgent?: boolean;
          is_active?: boolean;
          contact_zalo?: string | null;
          images?: Json | null;
          video_url?: string | null;
          video_poster?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      applications: {
        Row: {
          id: string;
          full_name: string;
          age: string;
          phone_zalo: string;
          applied_region: string | null;
          address: string | null;
          position_id: string | null;
          position_title: string;
          preferred_branch: string | null;
          cv_file_name: string | null;
          cv_base64: string | null;
          cv_file_url: string | null;
          cv_file_size: number | null;
          cv_file_type: string | null;
          note: string | null;
          status: string;
          telegram_notified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          age: string;
          phone_zalo: string;
          applied_region?: string | null;
          address?: string | null;
          position_id?: string | null;
          position_title: string;
          preferred_branch?: string | null;
          cv_file_name?: string | null;
          cv_base64?: string | null;
          cv_file_url?: string | null;
          cv_file_size?: number | null;
          cv_file_type?: string | null;
          note?: string | null;
          status?: string;
          telegram_notified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          age?: string;
          phone_zalo?: string;
          applied_region?: string | null;
          address?: string | null;
          position_id?: string | null;
          position_title?: string;
          preferred_branch?: string | null;
          cv_file_name?: string | null;
          cv_base64?: string | null;
          cv_file_url?: string | null;
          cv_file_size?: number | null;
          cv_file_type?: string | null;
          note?: string | null;
          status?: string;
          telegram_notified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "applications_position_id_fkey";
            columns: ["position_id"];
            isOneToOne: false;
            referencedRelation: "jobs";
            referencedColumns: ["id"];
          }
        ];
      };
      life_videos: {
        Row: {
          id: string;
          title: string;
          author: string;
          platform: string;
          thumbnail: string;
          tag: string;
          url: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          title: string;
          author?: string;
          platform?: string;
          thumbnail: string;
          tag?: string;
          url: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          author?: string;
          platform?: string;
          thumbnail?: string;
          tag?: string;
          url?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string | null;
          role: string;
          is_active: boolean;
          last_login_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name?: string | null;
          role?: string;
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string | null;
          role?: string;
          is_active?: boolean;
          last_login_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };

    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
