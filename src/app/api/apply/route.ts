import { NextResponse } from "next/server";
import { z } from "zod";
import { sendTelegramLeadNotification } from "@/lib/telegram";

const ApplySchema = z.object({
  fullName: z.string().min(2, "Họ và tên tối thiểu 2 ký tự"),
  age: z.string().min(1, "Vui lòng nhập tuổi"),
  phoneZalo: z.string().regex(/^(0|\+84)[0-9]{9,10}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(3, "Vui lòng nhập khu vực/địa chỉ sinh sống"),
  positionId: z.string().min(1, "Vui lòng chọn vị trí ứng tuyển"),
  positionTitle: z.string().min(1, "Vị trí không hợp lệ"),
  preferredBranch: z.string().optional(),
  note: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = ApplySchema.parse(body);

    // Bắn tin nhắn Telegram tức thì cho HR
    const telegramResult = await sendTelegramLeadNotification(validatedData);

    return NextResponse.json({
      success: true,
      message: "Nộp hồ sơ thành công! Bộ phận Tuyển Dụng sẽ liên hệ bạn sớm nhất.",
      telegramNotified: telegramResult.success,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Dữ liệu không hợp lệ",
          details: error.errors.map((e) => e.message),
        },
        { status: 400 }
      );
    }

    console.error("Apply API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Đã có lỗi xảy ra khi gửi đơn ứng tuyển. Vui lòng thử lại sau.",
      },
      { status: 500 }
    );
  }
}
