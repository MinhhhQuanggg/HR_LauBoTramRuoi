import { cookies } from "next/headers";
import crypto from "crypto";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "laubotramruoi-admin-secret-key-2026";
const COOKIE_NAME = "admin_session";

export interface AdminUser {
  id?: string;
  email: string;
  name?: string;
  role?: string;
}

/**
 * Hash password sử dụng thuật toán PBKDF2 chuẩn với random salt
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * So khớp mật khẩu với hash trong database
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  if (!password || !storedHash) return false;
  try {
    if (storedHash.includes(":")) {
      const [salt, originalHash] = storedHash.split(":");
      const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
      return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
    }
    // Hỗ trợ sha256 thuần hoặc so khớp trực tiếp trong trường hợp khởi tạo
    const simpleHash = crypto.createHash("sha256").update(password).digest("hex");
    return storedHash === simpleHash || storedHash === password;
  } catch {
    return false;
  }
}

/**
 * Kiểm tra tài khoản và mật khẩu từ bảng admin_users trong database
 */
export async function verifyAdminCredentials(
  emailInput: string,
  passwordInput: string
): Promise<AdminUser | null> {
  const normalizedEmail = emailInput?.trim().toLowerCase();
  if (!normalizedEmail || !passwordInput) return null;

  // 1. Kiểm tra trực tiếp trong Supabase Database
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data: user, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("email", normalizedEmail)
          .eq("is_active", true)
          .single();

        if (!error && user && user.password_hash) {
          const isMatch = verifyPassword(passwordInput, user.password_hash);
          if (isMatch) {
            // Cập nhật thời điểm đăng nhập cuối cùng
            try {
              await supabase
                .from("admin_users")
                .update({ last_login_at: new Date().toISOString() })
                .eq("id", user.id);
            } catch {
              // Bỏ qua lỗi cập nhật last_login_at nếu có
            }

            return {
              id: user.id,
              email: user.email,
              name: user.full_name || "Quản trị viên",
              role: user.role || "admin",
            };
          }
          return null;
        }
      }
    } catch (err) {
      console.warn("Lỗi truy vấn admin_users từ Supabase, fallback kiểm tra dự phòng:", err);
    }
  }

  // 2. Dự phòng an toàn qua biến môi trường (nếu chưa cấu hình DB hoặc chưa chạy migration)
  const envAdminEmail = process.env.ADMIN_EMAIL;
  const envAdminPassword = process.env.ADMIN_PASSWORD;

  if (envAdminEmail && envAdminPassword) {
    if (
      normalizedEmail === envAdminEmail.trim().toLowerCase() &&
      passwordInput === envAdminPassword
    ) {
      return {
        email: envAdminEmail,
        name: "Quản trị viên hệ thống",
        role: "super_admin",
      };
    }
  }

  return null;
}

/**
 * Tạo token JWT session lưu cookie
 */
export function createToken(email: string, userId?: string): string {
  const timestamp = Date.now().toString();
  const data = `${email}:${userId || "admin"}:${timestamp}`;
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64")}.${signature}`;
}

/**
 * Xác thực token
 */
export function verifyToken(
  token: string | undefined | null
): { valid: boolean; email?: string; userId?: string } {
  if (!token) return { valid: false };
  try {
    const [dataBase64, signature] = token.split(".");
    if (!dataBase64 || !signature) return { valid: false };

    const data = Buffer.from(dataBase64, "base64").toString("utf8");
    const expectedSignature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");

    if (signature !== expectedSignature) return { valid: false };

    const [email, userId, timestamp] = data.split(":");
    if (!email || !timestamp) return { valid: false };

    // Hạn token: 7 ngày
    const age = Date.now() - parseInt(timestamp, 10);
    if (age > 7 * 24 * 60 * 60 * 1000) {
      return { valid: false };
    }

    return { valid: true, email, userId };
  } catch {
    return { valid: false };
  }
}

/**
 * Lấy thông tin user đã đăng nhập từ Cookie
 */
export function getAuthenticatedUser(): { email: string; userId?: string } | null {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const result = verifyToken(token);
    if (result.valid && result.email) {
      return { email: result.email, userId: result.userId };
    }
  } catch {
    // Không thể đọc cookie
  }
  return null;
}

/**
 * Kiểm tra xem người dùng hiện tại đã đăng nhập quyền Admin chưa
 */
export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const result = verifyToken(token);
    return result.valid;
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
