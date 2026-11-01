import fs from "fs";
import path from "path";
import { QuickApplyConfig } from "@/types/quick-apply";

const CONFIG_FILE_PATH = path.join(process.cwd(), "src", "data", "quick-apply-config.json");

const DEFAULT_CONFIG: QuickApplyConfig = {
  formTitle: "Ứng Tuyển Lẩu Bò Trăm Rưởi",
  formSubtitle: "Đào tạo nghề miễn phí có lương • Phỏng vấn đi làm ngay",
  hrName: "Nguyễn Trung Kiên (Kiên HR)",
  hrPhone: "0981256712",
  zaloUrl: "https://zalo.me/0981256712",
  successTitle: "Nộp Hồ Sơ Thành Công!",
  successMessage:
    "Thông tin của bạn đã được chuyển thẳng tới Bộ phận Tuyển dụng (HR). Anh Kiên sẽ gọi điện hoặc nhắn tin Zalo cho bạn trong ít phút!",
  successNote:
    "Vui lòng để ý chuông điện thoại từ số 0981256712 để không bỏ lỡ lịch phỏng vấn nhé.",
  bannerHeadline: "Liên hệ với chúng tôi để nhận thông tin tuyển dụng",
  bannerSub: "Hỗ Trợ Ứng Viên 24/7",
  allowCvUpload: true,
};

export function getQuickApplyConfig(): QuickApplyConfig {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf8");
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error("Error reading quick-apply-config.json:", err);
  }
  return DEFAULT_CONFIG;
}

export function saveQuickApplyConfig(config: Partial<QuickApplyConfig>): QuickApplyConfig {
  try {
    const current = getQuickApplyConfig();
    const updated: QuickApplyConfig = {
      ...current,
      ...config,
      formTitle: config.formTitle?.trim() || current.formTitle,
      formSubtitle: config.formSubtitle?.trim() || current.formSubtitle,
      hrName: config.hrName?.trim() || current.hrName,
      hrPhone: config.hrPhone?.trim() || current.hrPhone,
      zaloUrl: config.zaloUrl?.trim() || current.zaloUrl,
      successTitle: config.successTitle?.trim() || current.successTitle,
      successMessage: config.successMessage?.trim() || current.successMessage,
      successNote: config.successNote?.trim() || current.successNote,
      bannerHeadline: config.bannerHeadline?.trim() || current.bannerHeadline,
      bannerSub: config.bannerSub?.trim() || current.bannerSub,
      allowCvUpload: config.allowCvUpload !== undefined ? Boolean(config.allowCvUpload) : current.allowCvUpload,
    };

    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), "utf8");
    return updated;
  } catch (err) {
    console.error("Error writing quick-apply-config.json:", err);
    throw err;
  }
}
