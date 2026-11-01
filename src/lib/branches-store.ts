import fs from "fs";
import path from "path";
import { Branch, RegionType } from "@/types/branch";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "branches.json");

function readLocalBranches(): Branch[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf8");
      return JSON.parse(data) as Branch[];
    }
  } catch (err) {
    console.error("Error reading branches.json:", err);
  }
  return [];
}

function writeLocalBranches(branches: Branch[]) {
  try {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(branches, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing branches.json:", err);
  }
}

export async function getBranchesList(onlyActive = false): Promise<Branch[]> {
  // 1. Try Supabase first if configured
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        let query = supabase
          .from("branches")
          .select("*")
          .order("cn_number", { ascending: true });

        if (onlyActive) {
          query = query.eq("is_active", true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((b) => ({
            id: b.id,
            cnNumber: b.cn_number,
            name: b.name,
            address: b.address,
            district: b.district,
            city: b.city,
            phone: b.phone || "0981256712",
            region: b.region as RegionType,
            mapUrl: b.map_url || undefined,
            lat: b.lat ?? undefined,
            lng: b.lng ?? undefined,
            isActive: b.is_active ?? true,
          }));
        }
      }
    } catch (err) {
      console.warn("Supabase load in getBranchesList failed, fallback to local:", err);
    }
  }

  // 2. Fallback to local JSON file
  let localList = readLocalBranches();
  if (onlyActive) {
    localList = localList.filter((b) => b.isActive !== false);
  }
  return localList.sort((a, b) => a.cnNumber - b.cnNumber);
}

export async function getBranchById(id: string): Promise<Branch | null> {
  const list = await getBranchesList(false);
  return list.find((b) => b.id === id) || null;
}

export async function upsertBranch(branch: Branch): Promise<Branch> {
  const branchToSave: Branch = {
    ...branch,
    id: branch.id || `cn-${branch.cnNumber.toString().padStart(2, "0")}`,
    city: branch.city || "Hồ Chí Minh",
    phone: branch.phone || "0981256712",
    region: branch.region || "trung-tam",
    isActive: branch.isActive !== undefined ? branch.isActive : true,
  };

  // Try updating Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const payload = {
          id: branchToSave.id,
          cn_number: branchToSave.cnNumber,
          name: branchToSave.name,
          address: branchToSave.address,
          district: branchToSave.district,
          city: branchToSave.city,
          phone: branchToSave.phone,
          region: branchToSave.region,
          map_url: branchToSave.mapUrl,
          lat: branchToSave.lat,
          lng: branchToSave.lng,
          is_active: branchToSave.isActive,
          updated_at: new Date().toISOString(),
        };
        const { error } = await supabase.from("branches").upsert(payload);
        if (error) {
          console.warn("Supabase upsert branches notice:", error.message);
        }
      }
    } catch (err) {
      console.warn("Supabase upsert branches failed:", err);
    }
  }

  // Update local JSON file
  const localList = readLocalBranches();
  const existingIdx = localList.findIndex((b) => b.id === branchToSave.id);
  if (existingIdx >= 0) {
    localList[existingIdx] = branchToSave;
  } else {
    localList.push(branchToSave);
  }
  writeLocalBranches(localList);

  return branchToSave;
}

export async function deleteBranch(id: string): Promise<boolean> {
  // Try deleting from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase.from("branches").delete().eq("id", id);
      }
    } catch (err) {
      console.warn("Supabase delete branch error:", err);
    }
  }

  // Delete from local JSON file
  const localList = readLocalBranches();
  const filtered = localList.filter((b) => b.id !== id);
  writeLocalBranches(filtered);

  return true;
}
