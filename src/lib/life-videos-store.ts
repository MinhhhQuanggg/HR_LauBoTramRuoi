import fs from "fs";
import path from "path";
import { LifeVideo } from "@/types/life-video";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "life-videos.json");

function readLocalVideos(): LifeVideo[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
      return JSON.parse(data) as LifeVideo[];
    }
  } catch (err) {
    console.error("Error reading life-videos.json:", err);
  }
  return [];
}

function writeLocalVideos(videos: LifeVideo[]) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(videos, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing life-videos.json:", err);
  }
}

export async function getLifeVideosList(onlyActive = false): Promise<LifeVideo[]> {
  // 1. Try Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        let query = supabase
          .from("life_videos")
          .select("*")
          .order("display_order", { ascending: true });

        if (onlyActive) {
          query = query.eq("is_active", true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            title: item.title,
            author: item.author || "@tiemlaubotramruoi",
            platform: item.platform || "TikTok",
            thumbnail: item.thumbnail,
            tag: item.tag,
            url: item.url,
            displayOrder: item.display_order ?? 0,
            isActive: item.is_active ?? true,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          }));
        }
      }
    } catch (err) {
      console.warn("Supabase load in getLifeVideosList failed, fallback to local:", err);
    }
  }

  // 2. Fallback to local JSON file
  let localList = readLocalVideos();
  if (onlyActive) {
    localList = localList.filter((v) => v.isActive !== false);
  }
  return localList.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
}

export async function getLifeVideoById(id: string): Promise<LifeVideo | null> {
  const list = await getLifeVideosList(false);
  return list.find((v) => v.id === id) || null;
}

export async function upsertLifeVideo(video: LifeVideo): Promise<LifeVideo> {
  const now = new Date().toISOString();
  const videoToSave: LifeVideo = {
    ...video,
    id: video.id || `VID-${Date.now().toString(36).toUpperCase()}`,
    author: video.author || "@tiemlaubotramruoi",
    platform: video.platform || "TikTok",
    displayOrder: Number(video.displayOrder) || 0,
    isActive: video.isActive !== undefined ? video.isActive : true,
    updatedAt: now,
    createdAt: video.createdAt || now,
  };

  // Try updating Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const payload = {
          id: videoToSave.id,
          title: videoToSave.title,
          author: videoToSave.author,
          platform: videoToSave.platform,
          thumbnail: videoToSave.thumbnail,
          tag: videoToSave.tag,
          url: videoToSave.url,
          display_order: videoToSave.displayOrder,
          is_active: videoToSave.isActive,
          updated_at: now,
        };
        const { error } = await supabase.from("life_videos").upsert(payload);
        if (error) {
          console.warn("Supabase upsert life_videos notice:", error.message);
        }
      }
    } catch (err) {
      console.warn("Supabase upsert life_videos failed:", err);
    }
  }

  // Update local JSON file
  const localList = readLocalVideos();
  const existingIdx = localList.findIndex((v) => v.id === videoToSave.id);
  if (existingIdx >= 0) {
    localList[existingIdx] = videoToSave;
  } else {
    localList.push(videoToSave);
  }
  writeLocalVideos(localList);

  return videoToSave;
}

export async function deleteLifeVideo(id: string): Promise<boolean> {
  // Try deleting from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("life_videos").delete().eq("id", id);
      }
    } catch (err) {
      console.warn("Supabase delete life_videos error:", err);
    }
  }

  // Delete from local JSON file
  const localList = readLocalVideos();
  const filtered = localList.filter((v) => v.id !== id);
  writeLocalVideos(filtered);

  return true;
}
