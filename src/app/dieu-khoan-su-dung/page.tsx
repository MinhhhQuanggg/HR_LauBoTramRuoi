import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import CurvedWaveDivider from "@/components/common/CurvedWaveDivider";
import {
  ChevronRight,
  FileText,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Scale,
  Ban,
  BadgeAlert,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Điều Khoản Sử Dụng Cổng Tuyển Dụng | Lẩu Bò Trăm Rưỡi",
  description:
    "Quy định và điều khoản sử dụng cổng thông tin tuyển dụng Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu (Quang Nguyen Group). Cam kết tuyển dụng miễn phí 100%.",
};

export default function TermsOfUsePage() {
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
            <span className="text-white font-medium">Điều khoản sử dụng</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Quy chế sử dụng & Quyền lợi ứng viên</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3">
            ĐIỀU KHOẢN SỬ DỤNG CỔNG TUYỂN DỤNG
          </h1>
          <p className="text-sm sm:text-base text-amber-100/85 max-w-3xl leading-relaxed">
            Quy định chung dành cho người tìm việc, ứng viên khi truy cập và ứng tuyển tại Hệ thống Chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu ({siteConfig.companyName}).
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
            
            {/* Cam Kết Vàng 0 Đồng */}
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-200/90 text-red-950 text-sm sm:text-base space-y-2">
              <div className="flex items-center gap-2.5 font-bold text-red-900 text-base sm:text-lg">
                <BadgeAlert className="w-6 h-6 text-red-600 shrink-0" />
                <span>CAM KẾT BẮT BUỘC: TUYỂN DỤNG HOÀN TOÀN MIỄN PHÍ (0 ĐỒNG)</span>
              </div>
              <p className="leading-relaxed text-gray-800 text-justify">
                Hệ thống Lẩu Bò Trăm Rưỡi ({siteConfig.companyName}) <strong>tuyệt đối không thu bất kỳ khoản phí nào</strong> đối với người tìm việc (không phí hồ sơ, không thu tiền cọc, không phí giữ chỗ, không bán đồng phục, đào tạo nghề bếp miễn phí vẫn hưởng đủ lương tháng). Mọi hành vi yêu cầu đóng tiền nhân danh Lẩu Bò Trăm Rưỡi đều là hành vi <strong>lừa đảo giả mạo</strong>.
              </p>
            </div>

            {/* Mục 1: Giới thiệu */}
            <section className="space-y-3 pt-2">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Building2 className="w-6 h-6 text-brand-800" />
                <h2>1. Giới thiệu</h2>
              </div>
              <p className="text-justify">
                Cổng thông tin tuyển dụng tại địa chỉ{" "}
                <Link href={siteConfig.url} className="text-brand-700 font-semibold underline hover:text-brand-900">
                  https://tuyendung.laubotramruoi.vn
                </Link>{" "}
                (&ldquo;Website&rdquo;) thuộc quyền sở hữu và vận hành bởi <strong>{siteConfig.companyName}</strong> (Hệ thống Chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu).
              </p>
              <p className="text-justify">
                Website được xây dựng nhằm cung cấp thông tin việc làm chính thức, minh bạch về các vị trí tuyển dụng (Học việc bếp Triều Châu, Phụ bếp, Thu ngân, Phục vụ bàn, Tiếp thực, Bảo vệ...), chế độ đãi ngộ và tiếp nhận hồ sơ ứng tuyển của người lao động tại 13 chi nhánh nhà hàng ở TP. Hồ Chí Minh và Đồng Nai.
              </p>
              <p className="text-justify">
                Việc người sử dụng (ứng viên) truy cập, tìm kiếm việc làm hoặc nộp đơn ứng tuyển trên Website đồng nghĩa với việc bạn đã đọc kỹ, hiểu rõ và đồng ý tuân thủ toàn bộ các nội dung của Điều khoản sử dụng này. Trường hợp không đồng ý, vui lòng ngừng truy cập và sử dụng dịch vụ trên Website.
              </p>
            </section>

            {/* Mục 2: Phạm vi sử dụng */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <CheckCircle2 className="w-6 h-6 text-brand-800" />
                <h2>2. Phạm vi sử dụng</h2>
              </div>
              <p className="text-justify font-medium text-gray-900">
                Ứng viên được phép sử dụng Website cho các mục đích hợp pháp, bao gồm:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Tra cứu thông tin tuyển dụng, mô tả công việc, mức lương, quyền lợi tại 13 chi nhánh Lẩu Bò Trăm Rưỡi;</li>
                <li>Nộp hồ sơ ứng tuyển trực tuyến qua form đăng ký nhanh hoặc liên hệ Hotline/Zalo;</li>
                <li>Tìm hiểu lộ trình đào tạo nghề bếp Triều Châu miễn phí và chế độ thăng tiến trong hệ thống;</li>
                <li>Liên hệ với Ban Nhân Sự để được hướng dẫn lịch phỏng vấn và nhận việc.</li>
              </ul>
              <p className="text-justify font-medium text-gray-900 pt-2">
                Người sử dụng nghiêm cấm thực hiện các hành vi sau:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Cung cấp thông tin giả mạo, sai lệch về bản thân hoặc mạo danh người khác khi nộp hồ sơ;</li>
                <li>Spam đơn ứng tuyển liên tục hoặc gửi dữ liệu rác gây nghẽn hệ thống;</li>
                <li>Thu thập, trích xuất dữ liệu trái phép (sử dụng web crawler, bot tự động);</li>
                <li>Thực hiện bất kỳ hành vi nào gây ảnh hưởng tiêu cực đến uy tín thương hiệu hoặc hoạt động vận hành của chuỗi nhà hàng.</li>
              </ul>
            </section>

            {/* Mục 3: Thông tin ứng viên và dữ liệu cá nhân */}
            <section className="space-y-4">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <ShieldCheck className="w-6 h-6 text-brand-800" />
                <h2>3. Thông tin ứng viên và dữ liệu cá nhân</h2>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.1. Thu thập và mục đích sử dụng</h3>
                <p className="text-justify mb-2">
                  Khi ứng tuyển, chúng tôi thu thập các thông tin cơ bản:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-justify">
                  <li>Họ tên, số điện thoại Zalo liên lạc;</li>
                  <li>Năm sinh/Độ tuổi (xác nhận đủ tuổi lao động theo quy định pháp luật);</li>
                  <li>Vị trí ứng tuyển, ca làm việc mong muốn (Full-time / Part-time);</li>
                  <li>Chi nhánh mong muốn làm việc tại TP.HCM hoặc Đồng Nai;</li>
                  <li>Hồ sơ xin việc (CV), kinh nghiệm nghề bếp hoặc dịch vụ nhà hàng (nếu có).</li>
                </ul>
                <p className="text-justify mt-2">
                  Dữ liệu trên chỉ được dùng cho mục đích: (i) Tiếp nhận và đánh giá hồ sơ; (ii) Liên hệ hẹn lịch phỏng vấn; (iii) Bố trí làm việc tại chi nhánh gần nhất để thuận tiện đi lại cho ứng viên; (iv) Ký hợp đồng lao động khi trúng tuyển.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.2. Bảo vệ dữ liệu cá nhân</h3>
                <p className="text-justify">
                  Hệ thống cam kết thực hiện việc thu thập và xử lý dữ liệu cá nhân hoàn toàn phù hợp với <strong>Luật Bảo vệ dữ liệu cá nhân 2025</strong> và Bộ luật Lao động 2019. Thông tin được mã hóa, bảo mật trong nội bộ và tuyệt đối không chia sẻ cho bên thứ ba vì mục đích thương mại. Chi tiết được quy định tại{" "}
                  <Link href="/chinh-sach-bao-mat" className="text-brand-700 font-semibold underline">
                    Chính sách bảo mật thông tin ứng viên
                  </Link>.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3.3. Trách nhiệm của ứng viên</h3>
                <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                  <li>Cung cấp thông tin trung thực, chính xác và chịu trách nhiệm pháp lý về tính xác thực của hồ sơ;</li>
                  <li>Đảm bảo đủ độ tuổi lao động hợp pháp theo quy định (từ đủ 18 tuổi trở lên đối với các vị trí vận hành nhà hàng);</li>
                  <li>Không sử dụng thông tin của người khác khi chưa có sự đồng ý.</li>
                </ul>
              </div>
            </section>

            {/* Mục 4: Chính sách tuyển dụng minh bạch, không thu phí */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Sparkles className="w-6 h-6 text-brand-800" />
                <h2>4. Chính Sách Tuyển Dụng Không Thu Phí (Quy Định Đặc Biệt)</h2>
              </div>
              <p className="text-justify">
                Để bảo vệ quyền lợi chính đáng của người lao động, {siteConfig.shortName} thực thi chính sách tuyển dụng minh bạch:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-brand-950 text-white font-semibold">
                    <tr>
                      <th className="px-4 py-3 w-1/3">Quy định</th>
                      <th className="px-4 py-3 w-2/3">Chi tiết cam kết của thương hiệu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Chi phí nộp hồ sơ</td>
                      <td className="px-4 py-3 text-emerald-700 font-bold">Hoàn toàn MIỄN PHÍ 100%</td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Đào tạo nghề bếp</td>
                      <td className="px-4 py-3 text-gray-700">
                        Được Bếp trưởng kèm cặp đào tạo miễn phí từ chưa biết gì đến thạo nghề, <strong>vẫn hưởng đủ lương tháng</strong>.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Tiền cọc / Giữ chân</td>
                      <td className="px-4 py-3 text-emerald-700 font-bold">TUYỆT ĐỐI KHÔNG THU TIỀN CỌC</td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Đồng phục & Dụng cụ</td>
                      <td className="px-4 py-3 text-gray-700">
                        Cấp phát theo quy định của nhà hàng khi chính thức nhận việc, không bắt ứng viên mua trước.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Mục 5: Quy định về hành vi sử dụng và an ninh mạng */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Ban className="w-6 h-6 text-brand-800" />
                <h2>5. Quy định về hành vi sử dụng và an toàn hệ thống</h2>
              </div>
              <p className="text-justify">
                Người sử dụng truy cập Website cam kết không thực hiện bất kỳ hành vi nào sau đây:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Phát tán virus, phần mềm gián điệp, mã độc nhằm phá hoại hoạt động của Website Tuyển Dụng;</li>
                <li>Tấn công từ chối dịch vụ (DDoS) hoặc can thiệp trái phép vào cơ sở dữ liệu tiếp nhận hồ sơ;</li>
                <li>Mạo danh nhân sự Lẩu Bò Trăm Rưỡi nhằm mục đích lừa đảo người tìm việc hoặc thu tiền trái phép;</li>
                <li>Đăng tải nội dung quảng cáo, tin nhắn rác hoặc thông tin vi phạm thuần phong mỹ tục, pháp luật Việt Nam.</li>
              </ul>
              <p className="text-justify text-sm text-gray-600">
                Ban Quản Trị có quyền thu thập bằng chứng kỹ thuật và chuyển giao cho cơ quan an ninh mạng xử lý theo quy định nếu phát hiện hành vi cố tình xâm nhập, phá hoại.
              </p>
            </section>

            {/* Mục 6: Quyền sở hữu trí tuệ */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Scale className="w-6 h-6 text-brand-800" />
                <h2>6. Quyền sở hữu trí tuệ</h2>
              </div>
              <p className="text-justify">
                Toàn bộ nội dung hiển thị trên Website, bao gồm nhưng không giới hạn:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Nhãn hiệu thương mại: &ldquo;Lẩu Bò Trăm Rưỡi&rdquo;, &ldquo;Lẩu Bò Triều Châu&rdquo;, logo và slogan nhận diện;</li>
                <li>Toàn bộ hình ảnh món ăn, không gian 13 chi nhánh, video đào tạo bếp thực chiến;</li>
                <li>Nội dung bài viết tuyển dụng, văn hóa doanh nghiệp và quy trình làm việc;</li>
                <li>Giao diện thiết kế website và mã nguồn độc quyền của {siteConfig.companyName}.</li>
              </ul>
              <p className="text-justify">
                Nghiêm cấm sao chép, chỉnh sửa, phát hành lại hoặc sử dụng bất kỳ tài sản trí tuệ nào nêu trên cho mục đích thương mại hoặc giả mạo tuyển dụng mà chưa có sự chấp thuận trước bằng văn bản của {siteConfig.companyName}.
              </p>
            </section>

            {/* Mục 7: Miễn trừ trách nhiệm */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <AlertTriangle className="w-6 h-6 text-brand-800" />
                <h2>7. Miễn trừ trách nhiệm</h2>
              </div>
              <p className="text-justify">
                Trong phạm vi pháp luật cho phép:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Thông tin tuyển dụng (số lượng cần tuyển, ca làm việc) tại từng chi nhánh có thể được cập nhật liên tục theo nhu cầu kinh doanh thực tế và không cấu thành cam kết bắt buộc nhận việc nếu ứng viên không đáp ứng tiêu chuẩn phỏng vấn;</li>
                <li>Chúng tôi nỗ lực duy trì hệ thống hoạt động ổn định 24/7, tuy nhiên không đảm bảo Website hoàn toàn không bị gián đoạn do sự cố đường truyền mạng internet từ bên ngoài;</li>
                <li>Lẩu Bò Trăm Rưỡi <strong>không chịu trách nhiệm</strong> đối với các thiệt hại, rủi ro tài chính phát sinh khi ứng viên liên hệ hoặc nộp tiền cho các đối tượng mạo danh không thuộc hệ thống kênh chính thức của thương hiệu.</li>
              </ul>
            </section>

            {/* Mục 8: Quyền của Lẩu Bò Trăm Rưỡi */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <ShieldCheck className="w-6 h-6 text-brand-800" />
                <h2>8. Quyền của Ban Tuyển Dụng Lẩu Bò Trăm Rưỡi</h2>
              </div>
              <p className="text-justify">
                Ban Tuyển Dụng bảo lưu các quyền sau:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-gray-700 text-justify">
                <li>Sàng lọc, từ chối tiếp nhận hoặc hủy kết quả tuyển dụng đối với hồ sơ phát hiện có hành vi gian lận thông tin;</li>
                <li>Chủ động điều phối, gợi ý chi nhánh làm việc gần nhất cho ứng viên dựa trên nhu cầu nhân sự thực tế;</li>
                <li>Tạm ngừng hoặc chặn địa chỉ IP truy cập có hành vi vi phạm an ninh hệ thống;</li>
                <li>Sửa đổi, cập nhật nội dung Điều khoản sử dụng này bất kỳ lúc nào để phù hợp với pháp luật và quy chuẩn vận hành chuỗi.</li>
              </ul>
            </section>

            {/* Mục 9: Luật áp dụng và giải quyết tranh chấp */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <Scale className="w-6 h-6 text-brand-800" />
                <h2>9. Luật áp dụng và giải quyết tranh chấp</h2>
              </div>
              <p className="text-justify">
                Điều khoản sử dụng này được giải thích và điều chỉnh bởi pháp luật Nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.
              </p>
              <p className="text-justify">
                Mọi tranh chấp hoặc bất đồng phát sinh liên quan đến việc sử dụng Cổng tuyển dụng trước hết sẽ được ưu tiên giải quyết thông qua thương lượng, hòa giải trên tinh thần thiện chí giữa các bên. Trường hợp không thể thương lượng thành công, tranh chấp sẽ được chuyển đến Cơ quan Tòa án có thẩm quyền tại TP. Hồ Chí Minh giải quyết theo quy định.
              </p>
            </section>

            {/* Mục 10: Thông tin liên hệ chính thức */}
            <section className="space-y-3">
              <div className="flex items-center gap-2.5 text-brand-900 font-bold text-lg sm:text-xl border-b border-gray-100 pb-3">
                <HelpCircle className="w-6 h-6 text-brand-800" />
                <h2>10. Kênh liên hệ chính thức</h2>
              </div>
              <p className="text-justify">
                Mọi thắc mắc về điều khoản sử dụng hoặc phản ánh dấu hiệu lừa đảo tuyển dụng, xin vui lòng liên hệ ngay với Ban Nhân Sự:
              </p>
              <div className="overflow-x-auto rounded-2xl border border-gray-200">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900 w-1/3">Đơn vị chủ quản</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        Hệ thống Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu ({siteConfig.companyName})
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Văn phòng tiếp nhận</td>
                      <td className="px-4 py-3 text-gray-700">
                        701 Phan Văn Trị, Phường 7, Quận Gò Vấp, TP. Hồ Chí Minh
                      </td>
                    </tr>
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Hotline / Zalo Nhân sự</td>
                      <td className="px-4 py-3 text-gray-700 font-bold text-emerald-700">
                        <a href={siteConfig.hrContact.zaloUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {siteConfig.hrContact.phone}
                        </a>{" "}
                        ({siteConfig.hrContact.name})
                      </td>
                    </tr>
                    <tr>
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
                    <tr className="bg-gray-50/70">
                      <td className="px-4 py-3 font-semibold text-gray-900">Website chính thức</td>
                      <td className="px-4 py-3 text-gray-700">
                        <Link href={siteConfig.url} className="text-brand-700 underline">
                          {siteConfig.url}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Kênh TikTok tuyển dụng</td>
                      <td className="px-4 py-3 text-gray-700">
                        <a href={siteConfig.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
                          {siteConfig.socials.tiktokHandle}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Footer Sign-off */}
            <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
              <div>
                Tuyển Dụng Lẩu Bò Trăm Rưỡi • Chuỗi F&B Lẩu Bò Trăm Rưỡi - Lẩu Bò Triều Châu.
              </div>
              <Link
                href="/chinh-sach-bao-mat"
                className="text-brand-700 hover:text-brand-900 font-semibold underline"
              >
                Xem Chính sách bảo mật thông tin ứng viên →
              </Link>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
