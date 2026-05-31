### 📋 PHIẾU BÀI TẬP 06 - CSS FRAMEWORKS — Bootstrap 5 / TailwindCSS
## TRACK A — BOOTSTRAP 5

* PHẦN A — ĐỌC HIỂU: 
# Câu A1 — Grid System: 

+-----------------+----------+---------------------------------+
| Kích thước      | Số cột   | Box layout (Minh họa)           |
+-----------------+----------+---------------------------------+
| < 768px         | 12       | +-----------------------------+ |
|                 |          | | Box 1                       | |
|                 |          | +-----------------------------+ |
|                 |          | | Box 2                       | |
|                 |          | +-----------------------------+ |
|                 |          | | Box 3                       | |
|                 |          | +-----------------------------+ |
|                 |          | | Box 4                       | |
|                 |          | +-----------------------------+ |
+-----------------+----------+---------------------------------+
| 768px - 991px   | 6        | +-------------+ +-------------+ |
|                 |          | | Box 1       | | Box 2       | |
|                 |          | +-------------+ +-------------+ |
|                 |          | | Box 3       | | Box 4       | |
|                 |          | +-------------+ +-------------+ |
+-----------------+----------+---------------------------------+
| >= 992px        | 3        | +---+ +---+ +---+ +---+         |
|                 |          | |Bx1| |Bx2| |Bx3| |Bx4|         |
|                 |          | +---+ +---+ +---+ +---+         |
+-----------------+----------+---------------------------------+

* CÂU HỎI THÊM:
1. col-md-6 nghĩa là gì?
- col: Là Cột (Column).
- md (Medium): Kích thước màn hình trung bình.
- 6: Chiếm 6 phần trên tổng số 12 cột (tương đương 50% chiều rộng).
=> Ý nghĩa: Từ màn hình Tablet trở lên, phần tử này sẽ chiếm 50% chiều rộng (mỗi hàng chứa được 2 box).

2. Tại sao không cần viết col-sm-12?
- Theo nguyên tắc "Mobile-first", class "col-12" (chiếm 100%) được áp dụng từ màn hình nhỏ nhất và sẽ kế thừa (giữ nguyên tác dụng) lên các màn hình lớn hơn (bao gồm cả màn hình sm).
- Nó chỉ thay đổi khi gặp breakpoint lớn hơn chặn lại (ở đây là md).
=> Do class "col-12" đã bao hàm luôn tác dụng cho màn hình sm nên việc viết thêm "col-sm-12" là thừa.

----------

# Câu A2 — Utilities & Components:

1. Class: d-none d-md-block
- Ẩn khi: Màn hình < 768px (Mobile).
- Hiển thị khi: Màn hình >= 768px (Tablet, Desktop).
- Giải thích: "d-none" ẩn phần tử mặc định. "d-md-block" ghi đè, hiển thị lại phần tử dạng block từ màn hình md trở lên.

2. 5 Spacing Utilities (Khoảng cách)
- mt-3: Margin-Top (cỡ 3) -> Tạo khoảng cách bên ngoài ở phía trên.
- px-4: Padding-X (cỡ 4) -> Tạo khoảng cách bên trong ở 2 bên trái & phải.
- mb-auto: Margin-Bottom (auto) -> Khoảng cách dưới tự động, thường dùng để đẩy nội dung xuống đáy trong Flexbox.
- py-2: Padding-Y (cỡ 2) -> Tạo khoảng cách bên trong ở trên & dưới.
- mx-auto: Margin-X (auto) -> Tự động chia đều lề trái/phải, dùng để căn giữa phần tử.

3. Phân biệt Container
- .container: Chiều rộng tối đa (max-width) cố định, thay đổi theo từng nấc màn hình. Luôn có lề 2 bên.
- .container-fluid: Chiều rộng luôn là 100%, tràn viền ở mọi kích thước màn hình.
- .container-md: Chiều rộng 100% trên màn hình nhỏ (<768px). Từ màn hình md (>=768px) trở lên, nó sẽ co lại và có lề giống như .container.

--------------------------------------------------------

## PHẦN C — PHÂN TÍCH:

# Câu C1 — Phân tích trang web thực:

1. Quy trình đổi màu $primary sang #E63946
- Công cụ: Cần trình biên dịch SASS (VD: extension Live Sass Compiler trên VS Code) và source code Bootstrap SASS.
- File cần modify: Tự tạo file mới (VD: custom.scss), KHÔNG sửa file gốc.
- Quy trình code:
  $primary: #E63946; // Bước 1: Khai báo màu mới TRƯỚC.
  @import "../node_modules/bootstrap/scss/bootstrap"; // Bước 2: Import Bootstrap gốc SAU.
  => Sau đó biên dịch file này ra CSS và link vào HTML.

2. Tại sao KHÔNG nên override trực tiếp (VD: .btn-primary { background: red; })?
- Mất đồng bộ: Biến $primary chi phối toàn hệ thống (text, bg, border, alert...). Đè CSS thuần chỉ đổi được 1 chỗ, các chỗ khác vẫn màu cũ.
- Mất tính tự động: Khi dùng SASS, Bootstrap tự tính toán sinh ra các màu sắc nhạt/đậm cho :hover, :active. Dùng CSS thuần phải viết tay từng trạng thái rất cực.
- Code rác, nặng file: Trình duyệt phải tải lớp màu gốc (xanh) rồi mới tải lớp ghi đè (đỏ), làm phình to file CSS và khó bảo trì.

----------

# Câu C2 — — So sánh:
 
1. Mã CSS thuần (Minh họa rút gọn cho Navbar & Product Card):
/* Navbar Responsive */
.navbar { display: flex; justify-content: space-between; padding: 15px; }
.nav-menu { display: flex; list-style: none; gap: 20px; }
@media (max-width: 768px) {
  .nav-menu { display: none; flex-direction: column; } /* Cần JS để mở menu */
  .hamburger { display: block; }
}
/* Product Card */
.card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
.card img { width: 100%; aspect-ratio: 1/1; object-fit: cover; }
.card-body { padding: 15px; display: flex; flex-direction: column; gap: 10px; }

2. So sánh CSS thuần (Vanilla CSS) với Bootstrap:

* Số dòng CSS cần viết:
- CSS thuần: Rất nhiều (phải viết hàng trăm dòng để xử lý dàn trang, hiệu ứng và responsive cho các loại màn hình).
- Bootstrap: ~0 dòng (Không cần viết thêm CSS, chỉ việc gọi tên các class trực tiếp vào thẻ HTML).

* Thời gian phát triển:
- CSS thuần: Chậm (tốn thời gian tự tính toán kích thước, test lỗi responsive trên nhiều thiết bị).
- Bootstrap: Rất nhanh (có sẵn mọi component, tự động responsive, tiết kiệm 70-80% thời gian code giao diện).

* Khả năng tùy biến:
- CSS thuần: Cực kỳ cao (Làm chủ 100% từng pixel, không bị giới hạn bởi framework).
- Bootstrap: Thấp đến Trung bình (Dễ bị hội chứng "trông giống hệt Bootstrap". Muốn sửa giao diện khác biệt hẳn thì phải can thiệp sâu vào SASS rất mất công).

3. 
* NÊN DÙNG KHI:
- Cần làm MVP, Prototype nhanh để ra mắt sản phẩm sớm (chạy deadline).
- Xây dựng các trang quản trị (Admin Dashboard), công cụ nội bộ không đòi hỏi thiết kế quá đặc biệt.
- Team thiếu UI/UX Designer, cần một bộ khung chuẩn, gọn gàng, có sẵn tính năng tương tác (Modal, Dropdown).

* KHÔNG NÊN DÙNG KHI:
- Dự án có thiết kế UI/UX độc đáo, phá cách, các hiệu ứng animation phức tạp không theo chuẩn Grid thông thường.
- Yêu cầu khắt khe về hiệu năng (Performance) và tốc độ tải trang (vì file Bootstrap chứa rất nhiều code dư thừa mà web không dùng tới).
- Team muốn tự xây dựng một Design System (Hệ thống thiết kế) riêng biệt cho thương hiệu từ con số không.

----------

## TRACK B — TAILWINDCSS:

* PHẦN A — ĐỌC HIỂU: 

# Câu A1 — Utility Classes: 

1. Thẻ <div> ngoài cùng (Card Container):
- flex → display: flex
- items-center → align-items: center
- justify-between → justify-content: space-between
- p-4 → padding: 1rem (16px)
- bg-white → background-color: rgb(255 255 255)
- shadow-md → box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)... (Đổ bóng vừa)
- rounded-lg → border-radius: 0.5rem (8px) (Bo góc lớn)
- hover:shadow-xl → Đổ bóng lớn hơn (shadow-xl) khi di chuột vào (hover)
- transition-shadow → transition-property: box-shadow (Kích hoạt hiệu ứng chuyển đổi cho bóng)
- duration-300 → transition-duration: 300ms (Thời gian chuyển đổi là 0.3 giây)

2. Thẻ <img> (Avatar):
- w-16 → width: 4rem (64px)
- h-16 → height: 4rem (64px)
- rounded-full → border-radius: 9999px (Bo tròn hoàn toàn thành hình tròn)
- object-cover → object-fit: cover (Cắt ảnh vừa khít khung mà không bị méo)

3. Thẻ <div> chứa thông tin (Text Wrapper):
- ml-4 → margin-left: 1rem (16px)
- flex-1 → flex: 1 1 0% (Cho phép phần tử co giãn chiếm hết khoảng trống còn lại)

4. Thẻ <h3> và <p> (Tên và Chức danh):
- text-lg → font-size: 1.125rem (18px), line-height: 1.75rem
- font-semibold → font-weight: 600 (In đậm vừa phải)
- text-gray-800 → color: rgb(31 41 55) (Màu xám đậm)
- truncate → overflow: hidden; text-overflow: ellipsis; white-space: nowrap (Cắt chữ bị dài quá và thêm dấu "...")
- text-sm → font-size: 0.875rem (14px), line-height: 1.25rem
- text-gray-500 → color: rgb(107 114 128) (Màu xám nhạt)

5. Thẻ <button> (Nút Follow):
- px-4 → padding-left: 1rem (16px) và padding-right: 1rem (16px)
- py-2 → padding-top: 0.5rem (8px) và padding-bottom: 0.5rem (8px)
- bg-blue-500 → background-color: rgb(59 130 246) (Nền màu xanh dương)
- text-white → color: rgb(255 255 255) (Chữ màu trắng)
- rounded-md → border-radius: 0.375rem (6px) (Bo góc vừa)
- hover:bg-blue-600 → Đổi màu nền thành xanh dương đậm hơn khi hover
- focus:ring-2 → Tạo viền ngoài (ring/box-shadow) dày 2px khi người dùng click/focus vào nút
- focus:ring-blue-300 → Màu của viền ring lúc focus là màu xanh dương nhạt

----------

# Câu A2 — Responsive & States: 

1. Giải thích Prefix Responsive (Điểm ngắt màn hình)
- Tuân theo nguyên tắc "Mobile-first", các class không có prefix sẽ áp dụng cho màn hình nhỏ nhất (điện thoại).
- md: Áp dụng từ màn hình Tablet trở lên (thường >= 768px).
- lg: Áp dụng từ màn hình Desktop/Laptop trở lên (thường >= 1024px).
- xl: Áp dụng từ màn hình PC cỡ lớn trở lên (thường >= 1280px).
=> VD: "md:grid-cols-2 lg:grid-cols-4" nghĩa là: Từ màn hình máy tính bảng thì dàn layout thành lưới 2 cột; khi màn hình rộng tới mức desktop thì giãn ra thành lưới 4 cột.

2. Giải thích State Modifiers (Trạng thái tương tác)
- hover: Kích hoạt khi người dùng đưa con trỏ chuột lên trên phần tử.
- focus: Kích hoạt khi phần tử được "tập trung" (nhấp chuột vào hoặc dùng phím Tab chọn đến), thường dùng cho ô input form.
- active: Kích hoạt đúng tại thời điểm phần tử đang bị nhấp và giữ chuột (như lúc đang nhấn nút bấm xuống).
- group-hover: Áp dụng lên phần tử CON, nhưng kích hoạt khi người dùng hover vào phần tử CHA. (Lưu ý: Phải gắn thêm class "group" ở thẻ cha).

3. Dịch "d-none d-md-flex" sang Tailwind
- Class Tailwind: hidden md:flex
- Giải thích: "hidden" sẽ đặt display: none mặc định trên màn hình nhỏ. Khi màn hình đạt mốc md (>= 768px), "md:flex" sẽ ghi đè và đổi thành display: flex.

--------------------------------------------------------

## PHẦN C — PHÂN TÍCH:

# Câu C1 — Tailwind vs CSS thuần:

1. Ví dụ minh họa Component (Product Card)
- HTML CSS thuần: <div class="product-card">...</div>
- HTML Tailwind:  <div class="bg-white rounded-lg shadow-md p-4 hover:shadow-xl...">...</div>

2. So sánh HTML File Size (Kích thước file)
- CSS thuần: File HTML rất nhỏ, code ngắn gọn, sạch sẽ. Tuy nhiên, nó đi kèm một (hoặc nhiều) file .css riêng biệt ngày càng phình to theo thời gian.
- Tailwind: File HTML lớn hơn đáng kể do phải nhồi nhét hàng tá utility classes. Tuy nhiên, khi đưa lên thực tế (Production), tổng dung lượng tải trang lại cực kỳ nhẹ vì Tailwind có cơ chế tự động xóa toàn bộ các class không được sử dụng (PurgeCSS).

3. Maintainability (Bảo trì: Dễ đọc? Dễ sửa?)
- CSS thuần: HTML rất dễ đọc. Nhưng khi cần sửa giao diện, lập trình viên phải nhảy qua nhảy lại giữa file HTML và CSS (Context switching). Việc sửa một class CSS dùng chung rất dễ gây vỡ layout ở những trang khác (Side-effects).
- Tailwind: File HTML ban đầu nhìn rối mắt. Nhưng việc sửa đổi lại CỰC KỲ dễ dàng và an toàn. Bạn biết chính xác thẻ HTML này đang có style gì ngay tại chỗ, sửa thẻ nào ăn thẻ đó, không bao giờ sợ ảnh hưởng (side-effect) đến phần tử khác.

4. Reusability (Tính tái sử dụng & Directive @apply)
- CSS thuần: Khả năng tái sử dụng nguyên thủy rất cao, chỉ cần gắn lại tên class (VD: class="btn-primary") cho thẻ HTML khác là xong.
- Tailwind: Khả năng tái sử dụng kém nếu chỉ code HTML thuần, vì bạn phải copy-paste một chuỗi dài các utility classes nhiều lần, gây lặp code (Vi phạm nguyên tắc DRY).
- Cách khắc phục (Cách dùng lại trong Tailwind):
  Dùng directive @apply trong file CSS để "gom" các utility classes lại thành 1 class truyền thống.
  VD: 
  .btn-primary { 
      @apply bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded; 
  }
  => Lúc này, bạn gọi class="btn-primary" trong HTML. Cách này giúp giữ HTML gọn gàng như CSS thuần nhưng vẫn tận dụng được hệ thống biến màu sắc/kích thước đồng bộ của Tailwind.

----------

# Câu C2  — Performance:

1. 
- Bootstrap mặc định tải một file CSS khổng lồ chứa MỌI style, MỌI component (Grid, Button, Modal, Carousel...) ngay cả khi trang web của bạn không hề sử dụng chúng (Dead code).
- Tailwind hoạt động theo nguyên lý "Dùng gì tạo nấy". Dù HTML có viết 1000 class, Tailwind cũng chỉ tạo ra chính xác 1000 dòng CSS tương ứng. Các utility khác không được gọi tên sẽ không bị đưa vào file CSS. Do đó, file CSS của Tailwind luôn được tối ưu ở mức cực nhỏ (thường chỉ vài KB).

2. 
- Cách hoạt động: JIT compiler (Trình biên dịch tức thời) sẽ quét toàn bộ các file mã nguồn của bạn (HTML, JS, Vue, React...). Nó tìm kiếm chính xác các class name mà bạn đã gõ.
- Nó loại bỏ gì?: Nó loại bỏ (thực chất là không thèm sinh ra) hàng chục ngàn class tiện ích có sẵn trong thư viện mặc định của Tailwind. Nó chỉ sinh ra mã CSS cho những class ĐÃ ĐƯỢC TÌM THẤY trong bước quét mã nguồn.

3. 
- Tình huống 1: Cần xây dựng siêu tốc một MVP (Sản phẩm khả dụng tối thiểu) với các tính năng UI phức tạp.
  Lý do: Tailwind không có sẵn logic JavaScript (như click để mở Modal, Carousel slide, Dropdown). Nếu dùng Bootstrap, bạn chỉ cần copy code là chạy. Với Tailwind, bạn phải tự code JS hoặc mất công tích hợp thư viện ngoài (như HeadlessUI, Alpine.js).
- Tình huống 2: Làm việc với nội dung động sinh ra từ Rich Text Editor (ví dụ: bài viết WordPress, Markdown).
  Lý do: Các trình soạn thảo sinh ra thẻ HTML thuần (ví dụ <h1>, <p>) mà không hề có class Tailwind đi kèm. Do Tailwind đã "reset" toàn bộ CSS mặc định của trình duyệt, các thẻ này sẽ hiển thị rất trần trụi và xấu xí. Việc fix style cho trường hợp này bằng Tailwind khá cồng kềnh (thường phải cài thêm plugin @tailwindcss/typography).

----------