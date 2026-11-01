import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_CREDENTIALS = {
  email: "tuyendung.admin@gmail.com",
  password: "laubotramruoi123#",
};

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "laubotramruoi-admin-secret-key-2026";
const COOKIE_NAME = "admin_session";

export function createToken(): string {
  const timestamp = Date.now().toString();
  const data = `${ADMIN_CREDENTIALS.email}:${timestamp}`;
  const signature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64")}.${signature}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const [dataBase64, signature] = token.split(".");
    if (!dataBase64 || !signature) return false;

    const data = Buffer.from(dataBase64, "base64").toString("utf8");
    const expectedSignature = crypto.createHmac("sha256", SECRET_KEY).update(data).digest("hex");

    if (signature !== expectedSignature) return false;

    const [email, timestamp] = data.split(":");
    if (email !== ADMIN_CREDENTIALS.email) return false;

    // Session valid for 7 days
    const age = Date.now() - parseInt(timestamp, 10);
    return age < 7 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifyToken(token);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
