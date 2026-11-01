import { sendSlackApplicationNotification } from "../src/lib/slack";
import { appendCandidateToGoogleSheet } from "../src/lib/google-sheets";
import { CandidateApplication } from "../src/types/job";

async function runTest() {
  console.log("=================================================");
  console.log("KIỂM TRA TÍCH HỢP SLACK VÀ GOOGLE SHEETS API");
  console.log("=================================================");

  const sampleCandidate: CandidateApplication = {
    fullName: "Trần Minh Quân (Test Ứng Tuyển)",
    age: "24",
    phoneZalo: "0981256712",
    positionId: "job-phuc-vu",
    positionTitle: "Nhân Viên Phục Vụ Bàn",
    appliedRegion: "Chi nhánh 1 - Gò Vấp",
    preferredBranch: "CN1 - 123 Phan Văn Trị, Gò Vấp",
    note: "Có kinh nghiệm 1 năm phục vụ nhà hàng, sẵn sàng đi làm ngay ca tối.",
  };

  console.log("\n1. Đang kiểm tra gửi thông báo Slack...");
  const slackResult = await sendSlackApplicationNotification(sampleCandidate);
  if (slackResult.success) {
    console.log("✅ Gửi Slack Webhook thành công!");
  } else {
    console.log("⚠️ Gửi Slack:", slackResult.error);
  }

  console.log("\n2. Đang kiểm tra ghi Google Sheet...");
  const sheetResult = await appendCandidateToGoogleSheet(sampleCandidate);
  if (sheetResult.success) {
    console.log(`✅ Ghi dữ liệu vào Google Sheet thành công (${sheetResult.method})!`);
  } else {
    console.log("⚠️ Ghi Google Sheet:", sheetResult.error);
  }

  console.log("\n=================================================");
  console.log("HOÀN TẤT KIỂM TRA");
  console.log("=================================================");
}

runTest();
