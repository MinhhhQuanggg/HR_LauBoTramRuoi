import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import CurvedWaveDivider from "@/components/common/CurvedWaveDivider";
import {
  ChevronRight,
  ShieldCheck,
  Building2,
  FileText,
  Lock,
  Database,
  Scale,
  UserCheck,
  Clock,
  Mail,
  Phone,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Share2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Thông Tin Ứng Viên | Tuyển Dụng Lẩu Bò Trăm Rưỡi",
  description:
    "Chính sách bảo mật thông tin hồ sơ ứng viên tại Hệ thống Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu theo Luật Bảo vệ dữ liệu cá nhân 2025.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero Header - Gradient phủ đều: Nhẹ (#a82323) -> Trung (#6B1414) -> Đậm (#2a0505) */}
      <section className="bg-gradient-to-r from-[#a82323] via-[#6B1414] to-[#2a0505] text-white pt-10 pb-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-xs text-amber-200/80 mb-5">
            <Link href="/" className="hover:text-white transition">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-amber-300/60" />
            <span className="text-white font-medium">Chính sách bảo mật</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Tuân thủ Luật Bảo vệ dữ liệu cá nhân 2025</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            CHÍNH SÁCH BẢO MẬT THÔNG TIN ỨNG VIÊN
          </h1>
          <p className="text-sm sm:text-base text-amber-100/85 max-w-3xl leading-relaxed">
            Cam kết bảo vệ dữ liệu cá nhân và quyền riêng tư của người tìm việc, ứng viên ứng tuyển tại Hệ thống Chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-amber-200/70">
            <span>Phiên bản: 2.0 (Áp dụng từ năm 2026)</span>
            <span>•</span>
            <span>Cập nhật lần cuối: Tháng 10/2026</span>
          </div>
        </div>
      </section>

      <CurvedWaveDivider fillColor="#F8F9FA" className="w-full" />

      {/* Main Content Area */}
      <div className="bg-[#F8F9FA] py-10 -mt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Main Card */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-200/80 space-y-8 text-gray-700 leading-relaxed text-sm sm:text-base">
            
            {/* Quick Notice Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3.5 text-amber-900 text-sm">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-amber-950 mb-1">
                  Lưu ý quan trọng về hồ sơ ứng tuyển & Chính sách tuyển dụng 0 đồng:
                </strong>
                <p className="leading-relaxed text-amber-900/90">
                  Hệ thống Lẩu Bò Trăm Rưỡi (thuộc {siteConfig.companyName}) <strong>tuyệt đối không thu bất kỳ khoản phí nào</strong> (không phí nộp hồ sơ, không phí đào tạo bếp, không phí đồng phục, không tiền cọc). Mọi thông tin ứng viên cung cấp được bảo mật và chỉ sử dụng cho mục đích tuyển dụng, sắp xếp lịch phỏng vấn và phân bổ chi nhánh làm việc phù hợp nhất.
                </p>
              </div>
            </div>

            {/* Mục 1: Mục đích thu thập dữ liệu ứng viên */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <FileText className="w-6 h-6 text-brand-800" />
                <h2>1. Mục đích thu thập dữ liệu ứng viên</h2>
              </div>
              <p className="text-justify">
                {siteConfig.companyName} vận hành Cổng thông tin tuyển dụng chính thức tại địa chỉ{" "}
                <Link href={siteConfig.url} className="text-brand-700 font-semibold underline hover:text-brand-900">
                  tuyendung.laubotramruoi.vn
                </Link>{" "}
                (&ldquo;Website Tuyển Dụng&rdquo;) nhằm kết nối các ứng viên tiềm năng với cơ hội việc làm ngành dịch vụ ẩm thực (F&B) tại chuỗi 13 chi nhánh nhà hàng Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu tại TP. Hồ Chí Minh và Đồng Nai.
              </p>
              <p className="text-justify">
                Trong quá trình tiếp nhận thông tin ứng tuyển, chúng tôi thu thập và xử lý dữ liệu cá nhân của ứng viên (bao gồm thông tin đăng ký nhanh và hồ sơ xin việc nếu có). Chính sách này quy định rõ nguyên tắc và cách thức bảo vệ dữ liệu, hoàn toàn phù hợp với:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Luật Bảo vệ dữ liệu cá nhân 2025</strong> (Luật số 91/2025/QH15)</li>
                <li><strong>Nghị định 356/2025/NĐ-CP</strong> và các văn bản hướng dẫn thi hành liên quan</li>
                <li><strong>Bộ luật Lao động 2019</strong> về quyền của người lao động và bảo vệ thông tin ứng viên</li>
              </ul>
            </section>

            {/* Mục 2: Bên Kiểm Soát Dữ Liệu Cá Nhân */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Building2 className="w-6 h-6 text-brand-800" />
                <h2>2. Bên Kiểm Soát Dữ Liệu Cá Nhân</h2>
              </div>
              <p className="text-justify">
                Đơn vị chịu trách nhiệm kiểm soát và xử lý dữ liệu cá nhân của ứng viên là:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900 w-1/3">Tên tổ chức</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        Hệ thống Tiệm Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Email Tuyển dụng</td>
                      <td className="px-4 py-3 text-gray-700">
                        <a href="mailto:tuyendung@laubotramruoi.vn" className="text-brand-700 underline font-medium">
                          tuyendung@laubotramruoi.vn
                        </a>{" "}
                        /{" "}
                        <a href="mailto:hr@laubotramruoi.vn" className="text-brand-700 underline font-medium">
                          hr@laubotramruoi.vn
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Hotline / Zalo Nhân sự</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        <a href={siteConfig.hrContact.zaloUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-bold hover:underline">
                          {siteConfig.hrContact.phone}
                        </a>{" "}
                        ({siteConfig.hrContact.name} - Trưởng phòng Tuyển dụng)
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Website tuyển dụng</td>
                      <td className="px-4 py-3 text-gray-700">
                        <Link href={siteConfig.url} className="text-brand-700 underline">
                          {siteConfig.url}
                        </Link>
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </section>

            {/* Mục 3: Dữ liệu cá nhân được thu thập */}
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Database className="w-6 h-6 text-brand-800" />
                <h2>3. Dữ liệu cá nhân được thu thập</h2>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.1. Dữ liệu do ứng viên cung cấp trực tiếp</h3>
                <p className="text-justify mb-3">
                  Khi đăng ký ứng tuyển qua form trên Website hoặc nhắn tin trực tiếp qua Hotline/Zalo, chúng tôi thu thập các thông tin sau:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-brand-950 text-white font-semibold">
                      <tr>
                        <th className="px-4 py-3 w-1/4">Loại dữ liệu</th>
                        <th className="px-4 py-3 w-1/2">Chi tiết thông tin</th>
                        <th className="px-4 py-3 w-1/4">Mức độ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Họ và tên</td>
                        <td className="px-4 py-3 text-gray-700">Họ tên đầy đủ, danh xưng (Anh/Chị)</td>
                        <td className="px-4 py-3 text-red-600 font-semibold">Bắt buộc</td>
                      </tr>
                      <tr className="bg-gray-50/70">
                        <td className="px-4 py-3 font-semibold text-gray-900">Số điện thoại / Zalo</td>
                        <td className="px-4 py-3 text-gray-700">Số điện thoại liên hệ chính dùng để gửi lịch hẹn phỏng vấn</td>
                        <td className="px-4 py-3 text-red-600 font-semibold">Bắt buộc</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Năm sinh / Độ tuổi</td>
                        <td className="px-4 py-3 text-gray-700">Xác nhận đủ độ tuổi lao động hợp pháp theo quy định (từ đủ 18 tuổi trở lên)</td>
                        <td className="px-4 py-3 text-red-600 font-semibold">Bắt buộc</td>
                      </tr>
                      <tr className="bg-gray-50/70">
                        <td className="px-4 py-3 font-semibold text-gray-900">Vị trí ứng tuyển</td>
                        <td className="px-4 py-3 text-gray-700">Học việc bếp, Phụ bếp, Thu ngân, Phục vụ bàn, Tiếp thực, Bảo vệ...</td>
                        <td className="px-4 py-3 text-red-600 font-semibold">Bắt buộc</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Chi nhánh mong muốn</td>
                        <td className="px-4 py-3 text-gray-700">Lựa chọn chi nhánh gần nơi cư trú nhất trong 13 chi nhánh để tiện đi lại</td>
                        <td className="px-4 py-3 text-red-600 font-semibold">Bắt buộc</td>
                      </tr>
                      <tr className="bg-gray-50/70">
                        <td className="px-4 py-3 font-semibold text-gray-900">Hình thức làm việc</td>
                        <td className="px-4 py-3 text-gray-700">Đăng ký ca Full-time (toàn thời gian) hoặc Part-time (linh hoạt theo ca)</td>
                        <td className="px-4 py-3 text-gray-700 font-semibold">Tùy chọn</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 font-semibold text-gray-900">Hồ sơ xin việc (CV)</td>
                        <td className="px-4 py-3 text-gray-700">File đính kèm PDF, DOC, DOCX hoặc ảnh chụp CV (nếu có)</td>
                        <td className="px-4 py-3 text-gray-700 font-semibold">Tùy chọn</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.2. Dữ liệu trong CV và hồ sơ bổ sung</h3>
                <p className="text-justify mb-2">
                  Trường hợp ứng viên gửi kèm CV hoặc tóm tắt kinh nghiệm làm việc:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                  <li><strong>Dữ liệu cơ bản:</strong> Kinh nghiệm làm bếp hoặc nhà hàng F&B trước đây, kỹ năng nghề, bằng cấp chứng chỉ (nếu có), thông tin người tham chiếu.</li>
                  <li><strong>Điều kiện đặc thù ngành F&B:</strong> Tình trạng sức khỏe đáp ứng quy định về vệ sinh an toàn thực phẩm theo Bộ Y tế khi làm việc tại khu vực bếp và chế biến thực phẩm.</li>
                </ul>
                <div className="mt-2.5 p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm text-gray-600">
                  <strong>Khuyến nghị từ {siteConfig.shortName}:</strong> Ứng viên chỉ nên cung cấp các thông tin thiết yếu phục vụ công việc. Chúng tôi <strong>không yêu cầu</strong> cung cấp số CCCD khi nộp hồ sơ online, tài khoản ngân hàng, thông tin tôn giáo hay quan điểm chính trị.
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.3. Dữ liệu kỹ thuật thu thập tự động</h3>
                <p className="text-justify">
                  Nhằm bảo vệ hệ thống trước hành vi spam form nộp hồ sơ ảo hoặc tấn công mạng, website tự động ghi nhận các dữ liệu kỹ thuật ở mức tối thiểu: địa chỉ IP ẩn danh, loại trình duyệt, loại thiết bị (di động / máy tính) và nhật ký gửi đơn thành công.
                </p>
              </div>
            </section>

            {/* Mục 4: Mục Đích và Cơ Sở Pháp Lý Xử Lý Dữ Liệu */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Scale className="w-6 h-6 text-brand-800" />
                <h2>4. Mục Đích và Cơ Sở Pháp Lý Xử Lý Dữ Liệu</h2>
              </div>
              <p className="text-justify">
                Mọi hoạt động xử lý dữ liệu của Lẩu Bò Trăm Rưỡi đều có mục đích rõ ràng và căn cứ pháp lý theo quy định của Luật Bảo vệ dữ liệu cá nhân 2025:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-3 w-1/3">Mục đích xử lý</th>
                      <th className="px-4 py-3 w-1/3">Dữ liệu sử dụng</th>
                      <th className="px-4 py-3 w-1/3">Cơ sở pháp lý xử lý dữ liệu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Tiếp nhận, thẩm tra & đánh giá độ phù hợp của hồ sơ ứng tuyển
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Họ tên, năm sinh, vị trí ứng tuyển, kinh nghiệm nghề, chi nhánh chọn
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Xử lý cần thiết phục vụ quá trình tuyển dụng theo thỏa thuận tiền hợp đồng lao động
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Liên hệ hẹn lịch phỏng vấn và sắp xếp chi nhánh làm việc gần nhất
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Họ tên, Số điện thoại / Zalo, Chi nhánh mong muốn
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Thực hiện các bước giao tiếp cần thiết trước khi ký hợp đồng lao động
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Sắp xếp chương trình đào tạo nghề bếp miễn phí
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Kinh nghiệm bếp, nguyện vọng học việc từ cơ bản đến nâng cao
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Sự đồng thuận của ứng viên theo cam kết đào tạo nghề tại Lẩu Bò Trăm Rưỡi
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Lưu trữ hồ sơ cho các chi nhánh chuẩn bị khai trương
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Thông tin ứng tuyển và lịch sử liên hệ
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Sự đồng ý của ứng viên (ứng viên có quyền yêu cầu xóa bất kỳ lúc nào)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Bảo đảm an toàn hệ thống, phòng chống hành vi giả mạo, spam đơn ảo
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Nhật ký truy cập, IP, thời điểm nộp hồ sơ
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Lợi ích hợp pháp của hệ thống và tuân thủ Luật An ninh mạng
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mục 5: Chia Sẻ Dữ Liệu Trong Hệ Thống Chuỗi */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Share2 className="w-6 h-6 text-brand-800" />
                <h2>5. Chia Sẻ Dữ Liệu Trong Nội Bộ Hệ Thống Lẩu Bò Trăm Rưỡi</h2>
              </div>
              <p className="text-justify">
                Nhằm tạo điều kiện tốt nhất cho ứng viên được làm việc tại chi nhánh gần nhà và đúng chuyên môn, thông tin ứng viên có thể được chuyển tiếp trong nội bộ giữa các bộ phận trực thuộc:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900 w-1/3">Ban Nhân Sự Trung Tâm</td>
                      <td className="px-4 py-3 text-gray-700">
                        Tiếp nhận hồ sơ ban đầu, sàng lọc thông tin và liên hệ phỏng vấn sơ bộ qua điện thoại/Zalo.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Quản Lý 13 Chi Nhánh (Store Manager)</td>
                      <td className="px-4 py-3 text-gray-700">
                        Tiếp nhận ứng viên được phân bổ về chi nhánh để trực tiếp gặp gỡ, xếp ca làm việc và hướng dẫn nhận việc.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Bếp Trưởng & Ban Đào Tạo Bếp</td>
                      <td className="px-4 py-3 text-gray-700">
                        Đối với ứng viên học việc bếp hoặc phụ bếp: Bếp trưởng tiếp nhận để hướng dẫn nghề thực chiến theo giáo trình Triều Châu.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 italic">
                * Cam kết: Tất cả các cá nhân và chi nhánh tiếp nhận đều tuân thủ nguyên tắc bảo mật và chỉ sử dụng thông tin vào mục đích công việc.
              </p>
            </section>

            {/* Mục 6: Cam kết không bán dữ liệu & Chia sẻ bên thứ ba */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Lock className="w-6 h-6 text-brand-800" />
                <h2>6. Chia Sẻ Dữ Liệu Với Bên Thứ Ba</h2>
              </div>
              <p className="text-justify">
                Lẩu Bò Trăm Rưỡi <strong>tuyệt đối không bán, không cho thuê, không chia sẻ thông tin ứng viên cho bất kỳ bên thứ ba nào vì mục đích thương mại, quảng cáo hay tài chính đa cấp</strong>.
              </p>
              <p className="text-justify">
                Chúng tôi chỉ sử dụng các dịch vụ công nghệ tiêu chuẩn quốc tế phục vụ vận hành:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
                <li><strong>Hạ tầng máy chủ lưu trữ (Cloud Hosting):</strong> Đảm bảo dữ liệu được mã hóa lưu trữ an toàn tại trung tâm dữ liệu bảo mật cao.</li>
                <li><strong>Cơ quan nhà nước có thẩm quyền:</strong> Chỉ cung cấp khi có văn bản yêu cầu chính thức theo quy định của pháp luật Việt Nam.</li>
              </ul>
            </section>

            {/* Mục 7: Thời Gian Lưu Trữ Dữ Liệu */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Clock className="w-6 h-6 text-brand-800" />
                <h2>7. Thời Gian Lưu Trữ Dữ Liệu</h2>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-3 w-1/2">Tình trạng hồ sơ</th>
                      <th className="px-4 py-3 w-1/2">Thời gian lưu trữ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Ứng viên chưa phù hợp (không đồng ý lưu lại)
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Xóa dữ liệu sau 06 tháng kể từ khi kết thúc đợt tuyển dụng.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Ứng viên tiềm năng (đồng ý lưu cho đợt tuyển sau)
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Tối đa 24 tháng hoặc đến khi ứng viên yêu cầu xóa thông tin.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Ứng viên trúng tuyển và nhận việc
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Chuyển vào hồ sơ nhân viên chính thức, lưu trữ theo quy định của Bộ luật Lao động.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        Dữ liệu kỹ thuật nhật ký hệ thống
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        Tối đa 12 tháng phục vụ an ninh mạng.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mục 8: Quyền Của Ứng Viên */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <UserCheck className="w-6 h-6 text-brand-800" />
                <h2>8. Quyền Của Ứng Viên Theo Pháp Luật</h2>
              </div>
              <p className="text-justify">
                Theo quy định của Luật Bảo vệ dữ liệu cá nhân 2025, ứng viên có đầy đủ các quyền hợp pháp sau:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-3 w-1/4">Tên quyền</th>
                      <th className="px-4 py-3 w-3/4">Nội dung chi tiết & Cách thực hiện</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền được biết</td>
                      <td className="px-4 py-3 text-gray-700">
                        Được thông báo minh bạch về mục đích thu thập và việc xử lý dữ liệu ngay khi đăng ký ứng tuyển.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền truy cập & kiểm tra</td>
                      <td className="px-4 py-3 text-gray-700">
                        Yêu cầu xem lại thông tin cá nhân và chi nhánh mình đã đăng ký trên hệ thống.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền chỉnh sửa</td>
                      <td className="px-4 py-3 text-gray-700">
                        Yêu cầu cập nhật số điện thoại Zalo mới, đổi vị trí hoặc chuyển chi nhánh mong muốn.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền xóa dữ liệu (Quyền được lãng quên)</td>
                      <td className="px-4 py-3 text-gray-700">
                        Yêu cầu xóa toàn bộ hồ sơ ứng tuyển khỏi cơ sở dữ liệu khi bạn không còn nhu cầu tìm việc.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền rút lại sự đồng ý</td>
                      <td className="px-4 py-3 text-gray-700">
                        Rút lại việc đồng ý lưu hồ sơ cho các đợt tuyển dụng sau mà không ảnh hưởng đến quyền lợi khác.
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Quyền khiếu nại, phản ánh</td>
                      <td className="px-4 py-3 text-gray-700">
                        Được quyền gửi khiếu nại trực tiếp đến Ban Quản trị nếu phát hiện bất kỳ dấu hiệu vi phạm bảo mật dữ liệu.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Cách thức thực hiện quyền:</strong> Ứng viên chỉ cần nhắn tin Zalo hoặc gọi đến Hotline:{" "}
                  <strong>{siteConfig.hrContact.phone}</strong> hoặc gửi email về{" "}
                  <strong>tuyendung@laubotramruoi.vn</strong>. Bộ phận Nhân sự sẽ tiếp nhận và xử lý yêu cầu trong vòng <strong>3 đến 5 ngày làm việc</strong>.
                </div>
              </div>
            </section>

            {/* Mục 9: Biện Pháp Bảo Mật An Toàn Thông Tin */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <ShieldCheck className="w-6 h-6 text-brand-800" />
                <h2>9. Biện Pháp Bảo Mật An Toàn Dữ Liệu</h2>
              </div>
              <p className="text-justify">
                {siteConfig.companyName} áp dụng các giải pháp kỹ thuật và quy trình quản trị nghiêm ngặt:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li><strong>Mã hóa đường truyền (HTTPS/TLS):</strong> Bảo vệ toàn bộ thông tin truyền tải từ trình duyệt của bạn tới máy chủ, ngăn chặn nghe lén hoặc đánh cắp dữ liệu trên mạng.</li>
                <li><strong>Phân quyền truy cập nội bộ (Role-based Access):</strong> Chỉ những nhân sự được phân công phỏng vấn và quản lý nhà hàng trực tiếp mới có quyền truy cập hồ sơ ứng viên tại chi nhánh của mình.</li>
                <li><strong>Giám sát & Nhật ký (Audit Log):</strong> Mọi thao tác truy xuất thông tin đều được ghi nhận để kiểm tra định kỳ.</li>
                <li><strong>Cam kết bảo mật của nhân viên:</strong> 100% nhân viên tuyển dụng ký cam kết bảo mật thông tin nội bộ của công ty và dữ liệu của ứng viên.</li>
              </ul>
            </section>

            {/* Mục 10: Thông Tin Liên Hệ & Giải Đáp Thắc Mắc */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <HelpCircle className="w-6 h-6 text-brand-800" />
                <h2>10. Thông Tin Liên Hệ & Tiếp Nhận Khiếu Nại</h2>
              </div>
              <p className="text-justify">
                Nếu bạn có bất kỳ câu hỏi, yêu cầu thực hiện quyền bảo mật hoặc cần khiếu nại về dữ liệu cá nhân, xin vui lòng liên hệ:
              </p>
              <div className="max-w-md">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-gray-900">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Bộ phận Tuyển dụng (HR)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Hotline / Zalo: <strong>{siteConfig.hrContact.phone}</strong>
                  </p>
                  <p className="text-sm text-gray-600">
                    Người phụ trách: {siteConfig.hrContact.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    Email: tuyendung@laubotramruoi.vn
                  </p>
                </div>
              </div>
            </section>

            {/* Mục 11: Cập Nhật Chính Sách & Luật Áp Dụng */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Scale className="w-6 h-6 text-brand-800" />
                <h2>11. Hiệu Lực Thi Hành & Luật Áp Dụng</h2>
              </div>
              <p className="text-justify">
                Chính sách này có hiệu lực từ ngày 01/01/2026 và được điều chỉnh, cập nhật định kỳ nhằm đáp ứng đầy đủ sự thay đổi của pháp luật Việt Nam và nhu cầu thực tiễn mở rộng hệ thống chuỗi nhà hàng.
              </p>
              <p className="text-justify">
                Mọi tranh chấp hoặc khiếu nại liên quan đến bảo vệ dữ liệu cá nhân sẽ được giải quyết dựa trên tinh thần thương lượng và tuân thủ tuyệt đối quy định của pháp luật Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
              </p>
            </section>

            {/* Footer Sign-off */}
            <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
              <div>
                Tuyển Dụng Lẩu Bò Trăm Rưỡi • Chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu.
              </div>
              <Link
                href="/dieu-khoan-su-dung"
                className="text-brand-700 hover:text-brand-900 font-semibold underline"
              >
                Xem Điều khoản sử dụng cổng tuyển dụng →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
