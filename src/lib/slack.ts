import { CandidateApplication } from "@/types/job";

export interface SlackNotificationResult {
  success: boolean;
  error?: string;
}

/**
 * Gửi thông báo đơn ứng tuyển mới tức thì đến Slack thông qua Incoming Webhook.
 * Cấu hình biến môi trường SLACK_WEBHOOK_URL trong file .env hoặc .env.local
 */
export async function sendSlackApplicationNotification(
  candidate: CandidateApplication
): Promise<SlackNotificationResult> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    const msg =
      "⚠️ SLACK_WEBHOOK_URL chưa được cấu hình trong file .env. Bỏ qua gửi thông báo Slack.";
    console.warn(msg);
    return {
      success: false,
      error: "SLACK_WEBHOOK_URL not configured",
    };
  }

  // Kiểm tra nếu người dùng vô tình dán link trang quản lý Slack App (thay vì Webhook URL thực tế)
  if (webhookUrl.includes("api.slack.com/apps/")) {
    const msg =
      "⚠️ URL cấu hình SLACK_WEBHOOK_URL là trang cài đặt Slack App (api.slack.com/apps/...). Bạn hãy copy URL thực tế có dạng 'https://hooks.slack.com/services/...' tại mục Incoming Webhooks.";
    console.warn(msg);
    return {
      success: false,
      error: "Invalid Slack Webhook URL (looks like Slack app settings URL)",
    };
  }

  const region =
    candidate.appliedRegion || candidate.address || "Gần nhà nhất (HR tự xếp)";
  const cleanPhone = candidate.phoneZalo.replace(/[^0-9+]/g, "");
  const zaloPhone = cleanPhone.startsWith("+84")
    ? "0" + cleanPhone.slice(3)
    : cleanPhone;

  const cvStatus = candidate.cvFileName
    ? `📎 Đã đính kèm (${candidate.cvFileName})`
    : "📝 Nộp nhanh (Chưa kèm file CV)";

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

  // Tạo Slack Block Kit payload chuyên nghiệp, thu hút HR
  const slackPayload = {
    text: `🚨 ỨNG VIÊN MỚI: ${candidate.fullName} (${candidate.phoneZalo}) - ${candidate.positionTitle}`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "🍲 ỨNG VIÊN MỚI - LẨU BÒ TRĂM RƯỠI",
          emoji: true,
        },
      },
      {
        type: "divider",
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*👤 Họ và tên:*\n${candidate.fullName}`,
          },
          {
            type: "mrkdwn",
            text: `*🎂 Tuổi:*\n${candidate.age}`,
          },
          {
            type: "mrkdwn",
            text: `*💼 Vị trí ứng tuyển:*\n*${candidate.positionTitle}*`,
          },
          {
            type: "mrkdwn",
            text: `*📱 SĐT / Zalo:*\n*${candidate.phoneZalo}*`,
          },
          {
            type: "mrkdwn",
            text: `*📍 Khu vực / Chi nhánh:*\n${region}`,
          },
          {
            type: "mrkdwn",
            text: `*🕒 Thời gian nộp:*\n${formattedTime}`,
          },
        ],
      },
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*📄 Hồ sơ CV:* ${cvStatus}${
            candidate.note ? `\n*📝 Ghi chú ứng viên:* _"${candidate.note}"_` : ""
          }`,
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "📞 Gọi điện thoại ngay",
              emoji: true,
            },
            style: "primary",
            url: `tel:${cleanPhone}`,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "💬 Chat Zalo phỏng vấn",
              emoji: true,
            },
            url: `https://zalo.me/${zaloPhone}`,
          },
        ],
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: "⚡ *Hệ thống Tuyển Dụng Lẩu Bò Trăm Rưỡi* • Vui lòng liên hệ ứng viên trong vòng 30 phút!",
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Slack Webhook Error (${response.status}):`, errorText);
      return {
        success: false,
        error: `Slack Webhook returned HTTP ${response.status}: ${errorText}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Slack Notification Exception:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}
