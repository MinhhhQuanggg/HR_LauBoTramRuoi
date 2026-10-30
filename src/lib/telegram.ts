import { CandidateApplication } from "@/types/job";

export async function sendTelegramLeadNotification(
  candidate: CandidateApplication
): Promise<{ success: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn(
      "⚠️ TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID chưa được cấu hình. Bỏ qua gửi tin Telegram."
    );
    return { success: false, error: "Telegram credentials not configured" };
  }

  const message = `
🔥 <b>ỨNG VIÊN MỚI - LẨU BÒ TRĂM RƯỠI</b> 🔥
━━━━━━━━━━━━━━━━━━
👤 <b>Họ và tên:</b> ${candidate.fullName}
🎂 <b>Tuổi:</b> ${candidate.age}
📱 <b>SĐT / Zalo:</b> <code>${candidate.phoneZalo}</code>
📍 <b>Địa chỉ nơi ở:</b> ${candidate.address}
💼 <b>Vị trí ứng tuyển:</b> ${candidate.positionTitle}
🏪 <b>Chi nhánh ưu tiên:</b> ${candidate.preferredBranch || "Tùy sắp xếp"}
${candidate.note ? `📝 <b>Ghi chú:</b> ${candidate.note}` : ""}
━━━━━━━━━━━━━━━━━━
⚡ <i>HR gọi điện phỏng vấn ngay: <a href="tel:${candidate.phoneZalo}">${candidate.phoneZalo}</a> | <a href="https://zalo.me/${candidate.phoneZalo}">Nhắn Zalo</a></i>
`.trim();

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      }
    );

    const result = await response.json();
    if (!result.ok) {
      console.error("Telegram API Error:", result);
      return { success: false, error: result.description };
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return { success: false, error: (error as Error).message };
  }
}
