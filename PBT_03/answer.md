Câu A1

1. Inline CSS
```html
<h1 style="color: red;">Tiêu đề</h1>
```
Ưu điểm:
- Thay đổi nhanh, tiện debug.
- Không cần file ngoài.
Nhược điểm:
- Khó bảo trì khi nhiều element.
- Không tái sử dụng được.
- Độ ưu tiên cao nhất, dễ gây override không mong muốn.
Khi nào dùng:
- Chỉ dùng tạm để debug nhanh hoặc override ở chỗ đặc biệt.

2. Internal CSS
```html
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
```
Ưu điểm:
- Có thể viết CSS ngay trong HTML.
- Dễ dùng cho prototype hoặc trang đơn giản.
Nhược điểm:
- Không tái sử dụng cho nhiều trang.
- File HTML to hơn.
Khi nào dùng:
- Dùng cho bản mẫu nhanh, demo, prototype nhỏ.

3. External CSS
```html
<head>
  <link rel="stylesheet" href="styles.css">
</head>
```
Ưu điểm:
- Tách biệt HTML và CSS.
- Dễ tái sử dụng, dễ bảo trì.
- Browser cache được file CSS.
Nhược điểm:
- Cần thêm request HTTP (nhỏ với file local).
Khi nào dùng:
- Dự án thực tế, production, nhiều trang dùng chung style.

- Nếu cùng 1 element có 3 cách áp dụng thì inline thắng, sau đó internal và external. Bởi vì inline có specificity cao hơn mọi selector trong stylesheet; internal và external cùng specificity thì cái nào xuất hiện sau sẽ override lên cái trước.

Câu A2

1. `h1` Chọn: ShopTLU
2. `.price` Chọn: 25.990.000đ, 45.990.000đ
3. `#app header` Chọn: toàn bộ thẻ `<header class="top-bar dark">` chứa ShopTLU và menu nav.
4. `nav a:first-child` Chọn: Home
5. `.product.featured h2` Chọn: MacBook Pro
6. `article > p` Chọn: các thẻ `<p>` trực tiếp con của mỗi `article`:
   - 25.990.000đ
   - Mô tả sản phẩm...
   - 45.990.000đ
   - Mô tả sản phẩm...
7. `a[href="/"]` Chọn: Home
8. `.top-bar.dark h1` Chọn: ShopTLU

Câu A3

Trường hợp 1: content-box
- width: 400px
- padding: 20px hai bên = 40px
- border: 5px hai bên = 10px
- margin: 10px hai bên = 20px

- Chiều rộng hiển thị = 400 + 40 + 10 = 450px
- Không gian chiếm trên trang = 450 + 20 = 470px

Trường hợp 2: border-box
- width: 400px là kích thước hộp bao gồm padding và border
- padding: 20px hai bên = 40px
- border: 5px hai bên = 10px
- margin: 10px hai bên = 20px

- Chiều rộng hiển thị = 400px
- Kích thước content thực tế = 400 - 40 - 10 = 350px
- Không gian chiếm trên trang = 400 + 20 = 420px

Trường hợp 3: Margin collapse
- `.box-a` margin-bottom: 25px
- `.box-b` margin-top: 40px

- Khoảng cách giữa box-a và box-b = 40px

Do margin dọc của hai block liền kề bị collapse, không cộng lại. CSS lấy giá trị lớn hơn trong hai margin để làm khoảng cách.

Nếu `.box-a` margin-bottom: -10px, `.box-b` margin-top: 40px thì khoảng cách = 30px

Do margin dọc đối dấu sẽ cộng lại khi collapse, nên 40 + (-10) = 30.

Câu A4

Các rule:
- Rule A `p { color: black; }`: specificity: 0,0,1
- Rule B `.price { color: blue; }`: specificity: 0,1,0
- Rule C `#main-price { color: red; }`: specificity: 1,0,0
- Rule D `p.price { color: green; }`: specificity: 0,1,1

Màu cuối cùng của element: `<p class="price" id="main-price">`: red.
Lý do: rule C có specificity cao nhất (ID selector) nên thắng.

Nếu thêm `style="color: orange;"` lên element:
- Inline style có priority lớn hơn rule stylesheet thông thường.
- Màu sẽ là orange.

Nếu Rule A thêm `!important`:
- `p { color: black !important; }` sẽ thắng tất cả rule thông thường.
- Màu sẽ là black.
- Vì `!important` ưu tiên vượt trên tất cả, bất kể specificity thấp hơn.

Câu C1

1. Tính chiều rộng thực tế:
- `.sidebar`: width 300px + padding 20px hai bên + border 1px hai bên = 300 + 40 + 2 = 342px
- `.content`: width 660px + padding 30px hai bên + border 1px hai bên = 660 + 60 + 2 = 722px
- Tổng = 342 + 722 = 1064px > 960px

2. Layout bị vỡ vì:
- Vì box-sizing mặc định là `content-box`, nên `width` chỉ tính phần nội dung.
- Padding và border vẫn được cộng vào ngoài width.
- Do đó tổng chiều rộng của hai cột lớn hơn container 960px, nên content bị đẩy xuống dòng mới.

3. Cách sửa:
- Cách 1 (dùng `border-box`):
  - Thêm `* { box-sizing: border-box; }`
  - Giữ `.sidebar { width: 300px; }` và `.content { width: 660px; }`
  - Khi đó padding/border được tính trong 300px và 660px nên tổng vừa vặn.

- Cách 2 (không dùng `border-box`):
  - Giảm width để bù padding và border.
  - Ví dụ: `.sidebar { width: 258px; }` và `.content { width: 598px; }`.
  - Khi đó tổng thực tế là 960px:
    - sidebar = 258 + 40 + 2 = 300
    - content = 598 + 60 + 2 = 660

Câu C2

1. Sản phẩm A (h2)
- `font-size`: 20px: `.card .title { font-size: 20px; }`
- `color`: green: `.highlight { color: green !important; }`
- Giải thích: `.title` không đặt màu, nên h2 sẽ nhận màu từ rule `.highlight` vì nó có `!important`.

2. Mô tả sản phẩm (p trong card featured)
- `color`: blue
- Giải thích: rule `.card { color: blue; }` áp dụng cho phần tử cha `.card`, và `p` có `color: inherit;`, nên nó nhận màu từ parent là blue.

3. Sản phẩm B (h2)
- `font-size`: 20px: `.card .title`
- `color`: blue
- Giải thích: không có rule màu cho `.title` hoặc `h2`, nên h2 kế thừa màu từ `.card { color: blue; }`.

4. Mô tả sản phẩm B (p.highlight)
- `color`: green
- Giải thích: rule `.highlight { color: green !important; }` có `!important`, nên thắng mọi rule bình thường, kể cả màu inherit từ parent.

Câu B2
Hộp 1 (content-box): chiều rộng thực tế = 350px
- Width CSS: 300px
- Padding: 20px × 2 = 40px
- Border: 5px × 2 = 10px
- Tổng: 300 + 40 + 10 = 350px

Hộp 2 (border-box): chiều rộng thực tế = 300px
- Width CSS: 300px (đã bao gồm padding + border)
- Padding: 20px × 2 = 40px
- Border: 5px × 2 = 10px
- Content width thực tế: 300 - 40 - 10 = 250px

Sự khác biệt:
- content-box: width chỉ là phần content, padding và border thêm vào ngoài. Tổng width = width + padding + border
- border-box: width bao gồm content + padding + border. Tổng width = width (không thay đổi dù thêm padding/border)

Không có border-box:
- Cột trái: 250px + 15px×2 + 1px×2 = 282px
- Cột giữa: 500px + 20px×2 + 1px×2 = 542px
- Cột phải: 250px + 15px×2 + 1px×2 = 282px
- Tổng: 282 + 542 + 282 = 1106px > 1000px

Có border-box:
- Tất cả cột giữ nguyên width (250px + 500px + 250px = 1000px)
- Padding và border tính vào trong width nên tổng vẫn là 1000px

Câu B3
1.
```css
1. p { color: orange; }: 0,0,1
2. body p { color: red; }: 0,0,2
3. .text { color: yellow; }: 0,1,0 
4. .highlight { color: green; }: 0,1,0
5. p.text { color: blue; }: 0,1,1
6. .text.highlight { color: violet; }: 0,2,0
7. p.text.highlight { color: pink; }: 0,2,1
8. #demo { color: purple; }: 1,0,0
9. p#demo { color: brown; }: 1,0,1
10. #demo.text { color: aqua; }: 1,1,0
```
2. Element cuối cùng hiển thị màu `aqua` (rule số 10) vì rule số 10 có specificity cao nhất (1,1,0): 1 id + 1 class + 0 element
4. Thay đổi thứ tự rules trong file kết quả không đổi vì specificity quyết định, không phải thứ tự. Rule có specificity cao hơn luôn thắng, bất kể vị trí trong CSS file.