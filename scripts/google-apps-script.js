/**
 * GOOGLE APPS SCRIPT CHO GOOGLE SHEET "QUẢN LÝ ỨNG VIÊN - LẨU BÒ TRĂM RƯỠI"
 * 
 * Hướng dẫn cài đặt cực nhanh (1 phút):
 * 1. Mở file Google Sheet Quản lý Ứng viên của bạn
 * 2. Trên thanh menu, chọn: Tiện ích mở rộng (Extensions) -> Apps Script
 * 3. Xóa code mặc định và dán toàn bộ đoạn code dưới đây vào
 * 4. Nhấn "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment)
 * 5. Chọn loại: "Ứng dụng web" (Web app)
 * 6. Mục "Người có quyền truy cập" (Who has access): Chọn "Bất kỳ ai" (Anyone)
 * 7. Nhấn "Triển khai" (Deploy) -> Sao chép URL ứng dụng web (Web App URL)
 * 8. Dán URL vừa sao chép vào file .env.local:
 *    GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("UngVien");
    
    // Nếu chưa có tab "UngVien", tự tạo và thêm tiêu đề cột
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("UngVien");
      sheet.appendRow([
        "Thời Gian Nộp",
        "Họ Và Tên",
        "Tuổi",
        "Số Điện Thoại / Zalo",
        "Vị Trí Ứng Tuyển",
        "Khu Vực Ứng Tuyển",
        "Chi Nhánh Ưu Tiên",
        "Trạng Thái CV",
        "Tên File CV",
        "Ghi Chú Ứng Viên",
        "Trạng Thái HR",
        "Ghi Chú Phỏng Vấn HR"
      ]);
      
      // Định dạng header đẹp
      var headerRange = sheet.getRange(1, 1, 1, 12);
      headerRange.setBackground("#B91C1C"); // Đỏ Lẩu Bò Trăm Rưỡi
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var data = JSON.parse(e.postData.contents);
    
    var row = [
      data.timestamp || Utilities.formatDate(new Date(), "GMT+7", "dd/MM/yyyy HH:mm:ss"),
      data.fullName || "",
      data.age || "",
      "'" + (data.phoneZalo || ""), // Thêm nháy đơn để giữ số 0 đầu SĐT
      data.positionTitle || "",
      data.appliedRegion || "",
      data.preferredBranch || "",
      data.hasCv ? "Có CV" : "Nộp nhanh (Không CV)",
      data.cvFileName || "",
      data.note || "",
      data.status || "Chờ liên hệ",
      ""
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: "Đã lưu ứng viên thành công" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
