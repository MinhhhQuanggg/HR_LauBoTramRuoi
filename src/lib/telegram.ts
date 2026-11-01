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

  const region =
    candidate.appliedRegion || candidate.address || "Gần nhà nhất (HR tự xếp)";
  const cvStatus = candidate.cvFileName
    ? `✅ Đã đính kèm (${candidate.cvFileName})`
    : "Chưa đính kèm (Ứng tuyển nhanh)";

  const message = `
🔥 <b>ỨNG VIÊN MỚI - LẨU BÒ TRĂM RƯỠI</b> 🔥
━━━━━━━━━━━━━━━━━━
💼 <b>Vị trí ứng tuyển:</b> ${candidate.positionTitle}
👤 <b>Họ và tên:</b> ${candidate.fullName}
🎂 <b>Tuổi:</b> ${candidate.age}
📱 <b>SĐT / Zalo:</b> <code>${candidate.phoneZalo}</code>
📍 <b>Khu vực ứng tuyển:</b> ${region}
📄 <b>CV:</b> ${cvStatus}
${candidate.note ? `📝 <b>Ghi chú:</b> ${candidate.note}` : ""}
━━━━━━━━━━━━━━━━━━
⚡ <i>HR liên hệ phỏng vấn: <a href="tel:${candidate.phoneZalo}">${candidate.phoneZalo}</a> | <a href="https://zalo.me/${candidate.phoneZalo}">Nhắn Zalo</a></i>
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

    // Nếu ứng viên có đính kèm file CV, gửi file document đến Telegram
    if (candidate.cvBase64 && candidate.cvFileName) {
      try {
        const base64Data = candidate.cvBase64.includes(",")
          ? candidate.cvBase64.split(",")[1]
          : candidate.cvBase64;
        const buffer = Buffer.from(base64Data, "base64");
        const blob = new Blob([buffer], {
          type: candidate.cvFileType || "application/octet-stream",
        });

        const formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("document", blob, candidate.cvFileName);
        formData.append(
          "caption",
          `📄 CV của ${candidate.fullName} (${candidate.phoneZalo}) - ${candidate.positionTitle}`
        );

        await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
          method: "POST",
          body: formData,
        });
      } catch (fileErr) {
        console.error("Gửi file CV qua Telegram thất bại:", fileErr);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return { success: false, error: (error as Error).message };
  }
}
