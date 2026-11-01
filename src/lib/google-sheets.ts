import crypto from "crypto";
import { CandidateApplication } from "@/types/job";

export interface SheetAppendResult {
  success: boolean;
  error?: string;
  method?: "service_account" | "webhook";
}

let cachedAccessToken: { token: string; expiresAt: number } | null = null;

/**
 * Trích xuất Google Spreadsheet ID từ chuỗi ID hoặc link đầy đủ Google Sheet
 */
function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed;
}

/**
 * Lấy OAuth2 Access Token từ Google Service Account thông qua JWT Assertion
 */
async function getGoogleAccessToken(
  clientEmail: string,
  privateKeyRaw: string
): Promise<string> {
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (cachedAccessToken && cachedAccessToken.expiresAt > nowSeconds + 120) {
    return cachedAccessToken.token;
  }

  // Chuẩn hóa private key (xử lý escape \n và dấu ngoặc kép)
  let privateKey = privateKeyRaw.trim();
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claimSet = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: nowSeconds + 3600,
    iat: nowSeconds,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedClaimSet = Buffer.from(JSON.stringify(claimSet)).toString("base64url");
  const signInput = `${encodedHeader}.${encodedClaimSet}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signInput);
  const signature = signer.sign(privateKey, "base64url");

  const assertionJwt = `${signInput}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: assertionJwt,
    }),
  });

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.text();
    throw new Error(
      `Google OAuth2 Token Error (${tokenRes.status}): ${errorBody}`
    );
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token as string;
  const expiresIn = (tokenData.expires_in as number) || 3600;

  cachedAccessToken = {
    token: accessToken,
    expiresAt: nowSeconds + expiresIn,
  };

  return accessToken;
}

/**
 * Ghi thông tin ứng viên mới vào Google Sheet Quản lý Ứng viên.
 * Hỗ trợ 2 phương thức:
 * 1. Google Sheets API v4 chính thức qua Service Account (GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_PRIVATE_KEY + GOOGLE_SHEET_ID)
 * 2. Google Apps Script Webhook (GOOGLE_SHEET_WEBHOOK_URL)
 */
export async function appendCandidateToGoogleSheet(
  candidate: CandidateApplication
): Promise<SheetAppendResult> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.trim();
  const sheetIdRaw = process.env.GOOGLE_SHEET_ID?.trim();
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();
  const tabName = process.env.GOOGLE_SHEET_TAB_NAME?.trim() || "UngVien";

  const region =
    candidate.appliedRegion || candidate.address || "Gần nhà nhất (HR tự xếp)";

  const now = new Date();
  const formattedTime = new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(now);

  const rowValues = [
    formattedTime, // Cột A: Thời gian nộp
    candidate.fullName, // Cột B: Họ và tên
    candidate.age, // Cột C: Tuổi
    candidate.phoneZalo, // Cột D: Số điện thoại / Zalo
    candidate.positionTitle, // Cột E: Vị trí ứng tuyển
    region, // Cột F: Khu vực ứng tuyển
    candidate.preferredBranch || "", // Cột G: Chi nhánh mong muốn
    candidate.cvFileName ? "Có CV" : "Nộp nhanh (Không CV)", // Cột H: Trạng thái CV
    candidate.cvFileName || "", // Cột I: Tên file CV
    candidate.note || "", // Cột J: Ghi chú của ứng viên
    "Chờ liên hệ", // Cột K: Trạng thái xử lý HR
    "", // Cột L: Ghi chú phỏng vấn (HR điền)
  ];

  // 1. Ưu tiên: Google Sheets API v4 bằng Service Account
  if (serviceAccountEmail && privateKey && sheetIdRaw) {
    try {
      const sheetId = extractSpreadsheetId(sheetIdRaw);
      const accessToken = await getGoogleAccessToken(
        serviceAccountEmail,
        privateKey
      );

      // Endpoint append của Google Sheets API v4
      const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
        tabName
      )}!A:L:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

      const appendRes = await fetch(appendUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [rowValues],
        }),
      });

      if (!appendRes.ok) {
        const errorText = await appendRes.text();
        console.error(
          `Google Sheets API Error (${appendRes.status}):`,
          errorText
        );
        return {
          success: false,
          error: `Google Sheets API Error: ${errorText}`,
          method: "service_account",
        };
      }

      return {
        success: true,
        method: "service_account",
      };
    } catch (apiErr) {
      console.error("Google Sheets Service Account Exception:", apiErr);
      return {
        success: false,
        error: (apiErr as Error).message,
        method: "service_account",
      };
    }
  }

  // 2. Phương thức 2: Google Apps Script Webhook (nếu được cấu hình)
  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          timestamp: formattedTime,
          fullName: candidate.fullName,
          age: candidate.age,
          phoneZalo: candidate.phoneZalo,
          positionTitle: candidate.positionTitle,
          appliedRegion: region,
          preferredBranch: candidate.preferredBranch || "",
          hasCv: Boolean(candidate.cvFileName),
          cvFileName: candidate.cvFileName || "",
          note: candidate.note || "",
          status: "Chờ liên hệ",
          rowValues,
        }),
      });

      if (!webhookRes.ok) {
        const errorText = await webhookRes.text();
        return {
          success: false,
          error: `Google Apps Script Webhook returned HTTP ${webhookRes.status}: ${errorText}`,
          method: "webhook",
        };
      }

      return {
        success: true,
        method: "webhook",
      };
    } catch (webErr) {
      console.error("Google Apps Script Webhook Exception:", webErr);
      return {
        success: false,
        error: (webErr as Error).message,
        method: "webhook",
      };
    }
  }

  // Nếu chưa cấu hình biến môi trường
  console.warn(
    "⚠️ Google Sheets API chưa được cấu hình. Cần GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET_ID hoặc GOOGLE_SHEET_WEBHOOK_URL trong .env.local"
  );
  return {
    success: false,
    error: "Google Sheets credentials not configured",
  };
}
