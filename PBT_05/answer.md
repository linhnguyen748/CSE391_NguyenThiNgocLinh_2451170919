### 📋 PHIẾU BÀI TẬP 05
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 — Viewport & Mobile-First:
1. Thẻ meta viewport chuẩn:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

- `name="viewport"` — Cung cấp cho trình duyệt biết rằng thẻ meta này dùng để kiểm soát cách hiển thị (kích thước và tỷ lệ) của trang web trên các thiết bị khác nhau.
- `content="width=device-width"` — Yêu cầu trình duyệt thiết lập chiều rộng của trang web bằng đúng với chiều rộng vật lý của màn hình thiết bị (thay vì một kích thước cố định).
- `initial-scale=1.0` — Đặt mức độ phóng to/thu nhỏ (zoom) ban đầu là 100% khi trang web vừa được tải xong, giữ nguyên kích thước gốc của các phần tử.

2. Nếu thiếu thẻ `<meta viewport>`, Trình duyệt sẽ render trang web theo kích thước Desktop (thường là 980px) rồi thu nhỏ toàn bộ lại để nhét vừa màn hình điện thoại.

Hậu quả: Chữ li ti, các nút bấm quá nhỏ, người dùng buộc phải tự phóng to (zoom) và cuộn ngang/dọc mới đọc được nội dung.

3. Mobile-First: Viết CSS mặc định cho Mobile trước. Dùng @media (min-width) để bổ sung giao diện khi màn hình lớn dần.

```css
.box { width: 100%; } 
@media (min-width: 768px) { 
  .box { width: 50%; } 
}
```
Desktop-First: Viết CSS mặc định cho Desktop trước. Dùng @media (max-width) để ghi đè, giấu bớt giao diện cho vừa màn hình nhỏ.

```css
.box { width: 50%; } 
@media (max-width: 767px) { 
  .box { width: 100%; } 
}
```

* Mobile-First được khuyên dùng vì:
- Tốc độ tải nhanh hơn: Điện thoại chỉ cần đọc phần CSS cơ bản, không phải xử lý lượng code lớn dùng để "ghi đè" của Desktop.

- Tư duy tập trung: Không gian nhỏ buộc bạn phải ưu tiên hiển thị những nội dung cốt lõi nhất.

- Code sạch hơn: Việc "thêm" style cho màn hình lớn (min-width) ít gây lỗi xung đột hơn việc phải "xóa/ẩn" style (max-width).

----------

# Câu A2 — Breakpoints:

| Tên | Kích thước  | Thiết bị đại diện | Lưới sản phẩm nên mấy cột? |
|-----|-----------|----------|--------------------------|
| **xs** | < 576px | Điện thoại dọc | 1 cột |
| **sm** | ≥ 576px | Điện thoại ngang | 1-2 cột |
| **md** | ≥ 768px | Tablet | 2 cột |
| **lg** | ≥ 992px | Desktop nhỏ | 3 cột |
| **xl** | ≥ 1200px | Desktop lớn | 4 cột |

----------

# Câu A3 — Media Queries:

- 375px: 100% (Nhỏ hơn 576px nên chỉ nhận CSS mặc định ban đầu.)
- 600px: 540px (Rơi vào khoảng ≥ 576px và < 768px.)
- 800px: 720px (Rơi vào khoảng ≥ 768px và < 992px.)
- 1000px: 960px (Rơi vào khoảng ≥ 992px và < 1200px.)
- 1400px: 1140px (Lớn hơn 1200px, nhận giá trị của breakpoint lớn nhất (≥ 1200px).)

----------

# Câu A4 — SCSS Basics:

1. Giải thích và Ví dụ 4 tính năng chính của SCSS

1. Variables (Biến)
- Giải thích: Cho phép lưu trữ các giá trị thường dùng lặp đi lặp lại (như màu sắc, font chữ, khoảng cách, kích thước...) vào một biến bắt đầu bằng dấu $. Khi cần thay đổi, chỉ cần sửa giá trị biến ở một nơi, toàn bộ CSS sẽ tự động cập nhật

```scss
$primary-color: #2563eb;
$font-base: 'Arial', sans-serif;

.button {
  background-color: $primary-color;
  font-family: $font-base;
}
```

2. Nesting (Lồng nhau)
- Giải thích: Cho phép viết các selector lồng vào nhau theo đúng cấu trúc phân cấp của HTML. Việc này giúp code gọn gàng, dễ đọc, tránh phải viết lặp lại tên class cha nhiều lần.

```scss
.navbar {
  background: #333;
  padding: 10px;

  /* Thẻ ul nằm trong .navbar */
  ul {
    list-style: none;
  }
  
  /* Thẻ a nằm trong .navbar, dấu & đại diện cho cha (.navbar a) */
  a {
    color: white;
    &:hover { color: yellow; } /* .navbar a:hover */
  }
}
```

3. Mixins (@mixin, @include)
- Giải thích: Hoạt động như một "hàm" trong lập trình. Nó cho phép nhóm nhiều dòng CSS lại thành một khối có thể tái sử dụng ở nhiều nơi, thậm chí có thể truyền tham số (arguments) vào để thay đổi linh hoạt.

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  @include flex-center; 
  width: 200px;
}
```
4. @extend / Inheritance (Kế thừa)
- Giải thích: Cho phép một class chia sẻ (kế thừa) toàn bộ thuộc tính CSS của một class khác. Khác với Mixin (copy code dán vào nhiều nơi), @extend sẽ gộp các selector lại với nhau trong file CSS cuối cùng, giúp giảm dung lượng file.

```scss
.message {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.success-message {
  @extend .message; /* Kế thừa toàn bộ từ .message */
  background-color: lightgreen;
}
```

2. Tại sao trình duyệt KHÔNG đọc được file .scss?

- Trình duyệt web (Chrome, Safari, Edge...) được lập trình chỉ để hiểu 3 ngôn ngữ cốt lõi: HTML, CSS và JavaScript. SCSS là một ngôn ngữ tiền xử lý (preprocessor) có chứa các cú pháp logic (như biến, vòng lặp, hàm) mà công cụ vẽ (render engine) của trình duyệt không hề biết cách biên dịch hay xử lý.

3. Cần bước gì để chuyển SCSS → CSS?

Vì trình duyệt không hiểu SCSS, ta bắt buộc phải có một bước gọi là Compile (Biên dịch).

Mô tả: Quá trình compile sẽ đọc code SCSS của bạn, tính toán các biến, giải quyết các mixin, gỡ bỏ các lớp lồng nhau và tạo ra (generate) một file .css thuần túy, hợp lệ.

Công cụ: Việc compile này thường được thực hiện tự động bằng các công cụ như: Extension Live Sass Compiler trên VS Code, hoặc các trình đóng gói như Webpack, Vite, Node-sass khi chạy dự án. Sau đó, ta dùng thẻ <link> trong HTML để gọi file .css (đã được compile) chứ không gọi file .scss.

----------

## PHẦN C — PHÂN TÍCH:

# Câu C1 — Phân tích trang web thực:

- Shoppe

Mobile (375px — iPhone SE):
- Header: Chỉ hiển thị logo + icon tìm kiếm + icon giỏ hàng. Navigation ẩn hoàn toàn.
- Hamburger menu ☰ ở góc trái để mở danh mục
- Lưới sản phẩm: 2 cột (không phải 1 — Shopee ưu tiên hiện nhiều sp)
- Banner hero: Full width, ảnh thay đổi tỉ lệ
- Flash sale: Scroll ngang (horizontal scroll)
- Footer: Thu gọn, ẩn nhiều links không quan trọng

Tablet (768px):
- Header: Hiện thanh search rộng hơn, một số nav items xuất hiện
- Lưới sản phẩm: 3-4 cột
- Sidebar danh mục: Bắt đầu xuất hiện ở một số trang
- Flash sale: Hiện nhiều item hơn

**Desktop (1440px):
- Header: Full navigation ngang, search bar to, icons
- Lưới sản phẩm: 5-6 cột
- Sidebar trái: Danh mục đầy đủ
- Layout 2 cột (sidebar + content)

# Câu C2 — Thiết kế Responsive Strategy:
1. Mobile (Màn hình < 768px)

┌──────────────────────────────────────┐
│ [Logo]                       [📞]    │ <- Header
├──────────────────────────────────────┤
│                                      │
│           HERO IMAGE                 │
│                                      │
├──────────────────────────────────────┤
│           GRID 6 MÓN ĂN              │
│      [Ảnh 1]        [Ảnh 2]          │ <- 2 cột x 3 hàng
│      [Ảnh 3]        [Ảnh 4]          │
│      [Ảnh 5]        [Ảnh 6]          │
├──────────────────────────────────────┤
│         FORM ĐẶT BÀN                 │ <- Nằm dưới món ăn
├──────────────────────────────────────┤
│         BẢN ĐỒ GOOGLE MAPS           │
├──────────────────────────────────────┤
│              FOOTER                  │
└──────────────────────────────────────┘

- Những gì bị ẩn? Trên mobile, phần chữ (text) của số điện thoại (vd: "Hotline: 098...") trên Header sẽ bị ẩn, chỉ giữ lại Icon điện thoại 📞 để tối ưu không gian.

- Form nằm đâu? Form nằm ngay bên dưới khu vực Grid món ăn, trải dài 100% chiều rộng để người dùng dễ thao tác trên màn hình cảm ứng.

2. Tablet (Màn hình 768px - 1023px)

┌──────────────────────────────────────┐
│ [Logo]           [📞 Hotline: 098..] │ <- Hiện lại text SĐT
├──────────────────────────────────────┤
│           HERO IMAGE                 │
├──────────────────────────────────────┤
│           GRID 6 MÓN ĂN              │
│   [Ảnh 1]    [Ảnh 2]    [Ảnh 3]      │ <- 3 cột x 2 hàng
│   [Ảnh 4]    [Ảnh 5]    [Ảnh 6]      │
├──────────────────┬───────────────────┤
│                  │                   │
│   FORM ĐẶT BÀN   │   GOOGLE MAPS     │ <- Xếp cạnh nhau
│                  │                   │
├──────────────────┴───────────────────┤
│              FOOTER                  │
└──────────────────────────────────────┘

- Grid ảnh mấy cột? Lưới ảnh chuyển thành 3 cột để tận dụng chiều ngang rộng hơn.

- Bản đồ nằm đâu? Bản đồ được đẩy lên nằm ngang hàng (side-by-side) với Form đặt bàn (mỗi bên chiếm 50% chiều rộng).

3. Desktop (Màn hình ≥ 1024px)

┌──────────────────────────────────────┐
│ [Logo]           [📞 Hotline: 098..] │
├──────────────────────────────────────┤
│           HERO IMAGE                 │
├───────────────────────┬──────────────┤
│    GRID 6 MÓN ĂN      │  SIDEBAR:    │
│  [Ảnh] [Ảnh] [Ảnh]    │              │
│  [Ảnh] [Ảnh] [Ảnh]    │  FORM        │ <- Form cố định (Sticky)
├───────────────────────┤  ĐẶT BÀN     │
│    GOOGLE MAPS        │              │
├───────────────────────┴──────────────┤
│              FOOTER                  │
└──────────────────────────────────────┘

- Layout bao nhiêu cột? Bố cục chính (phần dưới Hero image) chia làm 2 cột (Cột trái 70% chứa Ảnh + Map, Cột phải 30% chứa Form).

- Sidebar có không? Có. Form đặt bàn được tách ra làm một Sidebar cố định (Sticky Sidebar) bên tay phải. Khi cuộn chuột xem ảnh món ăn hay bản đồ, Form vẫn luôn ghim ở đó để khách dễ dàng đặt bàn bất cứ lúc nào.

* CSS Skeleton (Grid + Mobile-First)
```css
/* =========================================
   1. MOBILE-FIRST BASE (< 768px)
   ========================================= */
* { box-sizing: border-box; }

/* Header */
.header {
    display: flex;
    justify-content: space-between;
}
.header .phone-text {
    display: none; /* Ẩn text SĐT trên mobile */
}

/* Bố cục nội dung chính (Mặc định 1 cột xếp dọc) */
.main-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* Grid Món ăn (Mobile: 2 cột) */
.food-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

/* Khu vực chứa Form và Map (Mobile: xếp dọc 1 cột) */
.form-map-wrapper {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

/* =========================================
   2. TABLET BREAKPOINT (≥ 768px)
   ========================================= */
@media (min-width: 768px) {
    /* Hiện lại text số điện thoại */
    .header .phone-text {
        display: inline-block;
    }

    /* Grid Món ăn: Chuyển thành 3 cột */
    .food-grid {
        grid-template-columns: repeat(3, 1fr);
    }

    /* Đưa Form và Map lên xếp cạnh nhau (2 cột) */
    .form-map-wrapper {
        grid-template-columns: 1fr 1fr;
    }
}

/* =========================================
   3. DESKTOP BREAKPOINT (≥ 1024px)
   ========================================= */
@media (min-width: 1024px) {
    /* Layout chính chia 2 cột: Cột trái (Grid + Map) & Cột phải (Sidebar Form) */
    .main-wrapper {
        grid-template-columns: 2fr 1fr; /* Trái 2 phần, Phải 1 phần */
        align-items: start; /* Cần thiết để sticky hoạt động */
    }

    /* Đưa Map quay lại xếp dọc dưới Food Grid trong cột trái */
    .form-map-wrapper {
        display: contents; /* Hủy lưới tablet của wrapper này */
    }
    
    .map-container {
        grid-column: 1 / 2; /* Ép Map nằm ở cột trái */
        margin-top: 20px;
    }

    /* Biến Form thành Sidebar cố định bên phải */
    .reservation-form {
        grid-column: 2 / 3; /* Ép Form nằm ở cột phải */
        position: sticky;
        top: 20px;
    }
}
```