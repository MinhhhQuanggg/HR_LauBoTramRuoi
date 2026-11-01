# Website Tuyển Dụng - Lẩu Bò Trăm Rưỡi (Lẩu Bò Triều Châu)
> Dự án cổng thông tin và tuyển dụng chính thức của chuỗi F&B Lẩu Bò Trăm Rưỡi – Lẩu Bò Triều Châu.

---

## 📌 1. Mục Tiêu Dự Án & Tầm Nhìn Kỹ Thuật

1. **Làm chủ nguồn ứng viên trực tiếp (Direct Traffic - Google Jobs)**:
   * Chiếm lĩnh vị trí hiển thị trên Google Jobs với nút **`Apply on tuyendung.laubotramruoi.vn`** thay thế hoàn toàn các sàn trung gian (Việc Làm Tốt, TopCV...).
2. **Chiếm lĩnh AI Search (AEO / GEO)**:
   * Đảm bảo Google AI Overview, ChatGPT, Gemini, Perplexity trích xuất chính xác bảng lương, độ tuổi, đãi ngộ và danh sách chi nhánh từ website chính thức.
3. **Trải nghiệm ứng tuyển siêu tốc (30s UX)**:
   * Thiết kế tối giản, thân thiện với lao động F&B (18 – 30 tuổi), chuyển đổi nhanh qua Zalo/SĐT.
   * Lead được bắn tức thì qua Telegram/Zalo cho HR trong vòng 3 giây.
4. **Hiệu năng & Tối ưu chuẩn SEO**:
   * Google PageSpeed Mobile $\ge$ 90 điểm.
   * Google Rich Results Test đạt chuẩn 100% hợp lệ cho `JobPosting`.

---

## 📋 2. Quy Tắc & Tiêu Chuẩn Phát Triển Code (Engineering Guidelines)

Để đảm bảo chất lượng source code, khả năng mở rộng, hiệu năng tối đa và tính bảo trì lâu dài, toàn bộ mã nguồn của dự án bắt buộc phải tuân thủ nghiêm ngặt các quy tắc sau:

### 2.1. Tech Stack & Kiến Trúc Tổng Thể

* **Framework**: `Next.js 14+` (App Router) với mô hình **SSG (Static Site Generation)** kết hợp **ISR (Incremental Static Regeneration)**.
* **Ngôn ngữ**: `TypeScript` (Strict Mode 100%).
* **Styling**: `Tailwind CSS` (Mobile-First, utility classes, đồng bộ design token).
* **Icons**: `lucide-react` (icon tối giản, hiện đại, tree-shakeable).
* **Validation**: `zod` (Xác thực dữ liệu form và request payload ở cả Client & Server).
* **Tích hợp bên ngoài**: Slack Incoming Webhook (Realtime alert cho HR), Google Sheets API (Lưu trữ / Storage ứng viên), Telegram Bot API.

---

### 2.2. Quy Tắc Tổ Chức File & Đặt Tên (Naming & Structure Conventions)

1. **Cấu trúc thư mục chuẩn**:
   ```text
   src/
   ├── app/                    # Next.js App Router (pages, layouts, route handlers)
   │   ├── api/                # API Routes (apply, revalidate...)
   │   ├── viec-lam/[slug]/    # Chi tiết công việc (SSG)
   │   ├── layout.tsx          # Root Layout (Navbar, Footer, Font, Meta)
   │   └── page.tsx            # Trang chủ
   ├── components/             # Reusable UI Components
   │   ├── common/             # Button, Badge, Modal, WaveDivider...
   │   ├── home/               # HeroSection, JobGrid, LifeAtTramRuoi...
   │   ├── job-detail/         # JobDetailContent, StickyJobSidebar...
   │   └── layout/             # Header, Navigation, Footer, FloatingCTA...
   ├── config/                 # Site configuration, navigation, brand assets
   ├── data/                   # Dữ liệu tĩnh dự phòng, mock jobs, branches list
   ├── lib/                    # Helper libraries, telegram client, google sheets client
   ├── types/                  # TypeScript definitions & interfaces
   └── styles/                 # Global styles, Tailwind direct imports
   ```

2. **Quy tắc đặt tên (Case Conventions)**:
   * **Thư mục & Route files**: Dùng `kebab-case` (ví dụ: `viec-lam`, `job-detail`, `quick-apply-modal`).
   * **React Components**: Dùng `PascalCase` cho file và tên component (ví dụ: `JobCard.tsx`, `HeaderNavigation.tsx`, `ApplyFormModal.tsx`).
   * **Utility files / Hooks**: Dùng `camelCase` (ví dụ: `formatSalary.ts`, `useScrollPosition.ts`, `telegram.ts`).
   * **Types / Interfaces**: Dùng `PascalCase` (ví dụ: `JobPostingType`, `CandidateApplyPayload`, `BranchLocation`).

---

### 2.3. Quy Chuẩn React & Next.js (App Router)

1. **Server Components theo mặc định (Server First)**:
   * Mặc định mọi component là Server Component (`async function Component()`).
   * **Chỉ** thêm `'use client'` khi thực sự cần: React State (`useState`), Effects (`useEffect`), Form submission, Modal Toggle, Event Listeners.
   * Tách nhỏ client logic: Đưa phần tương tác vào Client Component con, giữ nguyên Server Component bao bọc ngoài để bảo toàn lợi thế SSR/SSG cho SEO.

2. **Khả năng hiển thị HTML cho Bot (Crawler Resilience)**:
   * Toàn bộ nội dung việc làm (tiêu đề, mức lương, mô tả chi tiết, địa chỉ chi nhánh) **bắt buộc phải có sẵn trong mã nguồn HTML tĩnh** trả về từ server.
   * Tuyệt đối không để dữ liệu quan trọng phụ thuộc vào việc fetch dữ liệu ở Client (`useEffect`) khiến Bot tìm kiếm không đọc được.

3. **Tối ưu hình ảnh & Asset**:
   * Bắt buộc dùng `next/image` thay cho thẻ `<img>` truyền thống.
   * Khai báo đầy đủ `alt`, `width`, `height` và `sizes`.
   * Đối với hình ảnh Above-the-fold (Hero/Logo): Đặt thuộc tính `priority`.
   * Sử dụng định dạng ảnh hiện đại WebP/AVIF.

---

### 2.4. Quy Chuẩn Giao Diện (UI/UX & Design Tokens)

1. **Hệ màu sắc thương hiệu (Theme Tokens)**:
   * **Màu chủ đạo (Primary Brand)**: Đỏ đậm Triều Châu / Nâu đỏ Lẩu Bò Trăm Rưỡi (`#8B1E1E` - `#991B1B`).
   * **Màu nhấn (Accent/Gold)**: Vàng đồng / Cam ấm (`#D97706` - `#F59E0B`).
   * **Màu nền thân trang**: Xám trắng thanh lịch (`#F8F9FA` / `#F3F4F6`).
   * **Thẻ việc làm (Job Card)**: Màu trắng tinh `#FFFFFF`, bo tròn góc `rounded-2xl` (16px), đổ bóng nhẹ mềm mại (`shadow-sm hover:shadow-md transition-shadow`).
2. **Hình khối OmiGroup Reference**:
   * Duy trì đường cong vòm lượn sóng (**Curved Wave Divider**) ở chân Header và đầu Footer bằng vector SVG chuẩn xác, không bị méo tỉ lệ khi co giãn màn hình.
3. **Quy tắc nhúng Video/Mạng xã hội (PageSpeed Defense)**:
   * Phần "Đời sống Trăm Rưỡi" (TikTok / Facebook feed): **Áp dụng Facade Pattern**.
   * Chỉ hiển thị poster ảnh tĩnh kèm nút play giả lập.
   * Chỉ thực sự tải iframe / SDK mạng xã hội khi người dùng cuộn đến gần hoặc tương tác bấm xem video để bảo vệ điểm số **Google PageSpeed Mobile $\ge$ 90**.

---

### 2.5. Quy Chuẩn SEO, Dữ Liệu Cấu Trúc & AEO

1. **Schema `JobPosting` (Bắt buộc 100% hợp lệ)**:
   * Mọi trang `/viec-lam/[slug]` phải nhúng đoạn script `application/ld+json`.
   * Phải chứa đầy đủ các trường: `title`, `description`, `identifier`, `datePosted`, `validThrough`, `employmentType`, `hiringOrganization`, `jobLocation`, `baseSalary` (với `currency: "VND"` và `unitText: "MONTH"` hoặc `"HOUR"`), và đặc biệt `"directApply": true`.
2. **Tối ưu AI Search (AEO / GEO)**:
   * Duy trì tệp `/public/llms.txt` định dạng Markdown cấu trúc rõ ràng: tóm tắt triết lý tuyển dụng "Học nghề miễn phí có lương đủ", bảng lương chi tiết, danh sách chi nhánh và thông tin liên hệ HR.
   * Cấu hình tệp `robots.txt` cho phép các AI crawler (`Google-Extended`, `GPTBot`, `PerplexityBot`, `ClaudeBot`) lập chỉ mục đầy đủ.
   * Sinh tự động `sitemap.xml` chứa URL trang chủ và toàn bộ URL bài tuyển dụng.

---

### 2.6. Quy Chuẩn Xử Lý Form & Tích Hợp API

1. **Quy trình tiếp nhận ứng viên**:
   * Form chỉ gồm thông tin trọng yếu: `Họ tên`, `Năm sinh / Tuổi`, `SĐT Zalo`, `Địa chỉ / Chi nhánh đăng ký`, `Vị trí ứng tuyển`.
   * Client-side & Server-side validation bằng thư viện `Zod`.
2. **Non-blocking Lead Dispatch**:
   * Khi gọi API route `/api/apply`, hệ thống phải ưu tiên gửi cảnh báo đến **Telegram Bot của HR** trong $\le$ 3 giây để gọi ngay cho ứng viên.
   * Ghi dữ liệu vào Google Sheet chạy bất đồng bộ để tránh làm nghẽn phản hồi của ứng viên.
3. **Bảo mật & Biến môi trường**:
   * Không lưu token, bot key hoặc service account credentials vào Git.
   * Tạo tệp `.env.example` làm mẫu cấu hình.

---

### 2.7. Quy Chuẩn Git & Commit Message

Tuân thủ nghiêm ngặt chuẩn **Conventional Commits**:
* `feat:` Tính năng mới (ví dụ: `feat: add sticky quick apply floating button`).
* `fix:` Sửa lỗi (ví dụ: `fix: correct JobPosting schema salary currency format`).
* `ui:` Cập nhật styling/giao diện (ví dụ: `ui: implement curved wave divider for footer`).
* `perf:` Tối ưu hiệu năng (ví dụ: `perf: lazy load tiktok social feed with facade`).
* `docs:` Tài liệu (ví dụ: `docs: update coding guidelines in README`).
* `refactor:` Tái cấu trúc mã nguồn không làm thay đổi hành vi người dùng.

---

## 🚀 3. Hướng Dẫn Cài Đặt & Khởi Chạy (Dành Cho Developer)

```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Tạo file cấu hình môi trường
cp .env.example .env.local

# 3. Chạy môi trường phát triển (Development)
npm run dev

# 4. Build kiểm tra sản phẩm & SEO
npm run build
npm run start
```
