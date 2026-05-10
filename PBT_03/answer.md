### 📋 PHIẾU BÀI TẬP 03 
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 - 3 Cách nhúng CSS: 
 1. Inline CSS
- Ví dụ:
```html
<h1 style="color: blue; font-size: 20px;">Chào mừng bạn!</h1>
```
- Ưu điểm: Áp dụng nhanh, có độ ưu tiên cao nhất, không cần tạo file hay viết thêm thẻ `<style>`.

- Nhược điểm: Khó bảo trì (muốn sửa 10 thẻ `<h1>` phải sửa 10 lần), làm file HTML trở nên rác và nặng, không thể tái sử dụng code.

- Khi nào dùng: Chỉ dùng khi cần override (ghi đè) khẩn cấp hoặc khi dùng JavaScript để thay đổi style trực tiếp cho một phần tử cụ thể.

 2. Internal CSS
 - Ví dụ:
```html
<head>
    <style>
        p { color: red; line-height: 1.5; }
    </style>
</head>
```
- Ưu điểm: Tất cả style nằm gọn trong 1 file HTML, dễ quản lý hơn Inline CSS cho các trang web đơn giản.

- Nhược điểm: Chỉ có tác dụng trong duy nhất trang đó. Nếu web có 100 trang, phải copy đoạn code này 100 lần.

- Khi nào dùng: Dùng cho các trang **Single-page (trang đơn)**, làm **Prototype (bản nháp)** nhanh, hoặc các trang đích (Landing Page) cần load style thật nhanh mà không muốn đợi tải file ngoài.

 3. External CSS
- Ví dụ:
```html
<!-- Trong file index.html -->
    <head>
        <link rel="stylesheet" href="style.css">
    </head>

    /* Trong file style.css */
    body { background-color: #f0f0f0; }
```
- Ưu điểm:  Tách biệt hoàn toàn cấu trúc (HTML) và giao diện (CSS). Dễ bảo trì (sửa 1 file đổi cả website), giúp trình duyệt Caching (tải nhanh hơn ở lần sau).

- Nhược điểm: Cần thêm một yêu cầu gửi tới server để tải file CSS về.

- Khi nào dùng: Dùng cho mọi dự án thực tế, các website có từ 2 trang trở lên.

* Câu hỏi thêm: 
  - Inline CSS sẽ "thắng" (có độ ưu tiên cao nhất).
  - Giải thích: Trong CSS có một khái niệm gọi là **Specificity** (Độ ưu tiên cụ thể).
1.  **Inline CSS** có độ ưu tiên cao nhất vì nó nằm "sát" nhất với phần tử HTML.
2.  **Internal và External CSS** có độ ưu tiên ngang nhau về mặt kỹ thuật. Tuy nhiên, nếu cùng chọn 1 phần tử, trình duyệt sẽ áp dụng luật **"Người đến sau sẽ thắng"** (nghĩa là lệnh nào nằm dưới cùng trong file hoặc trong thẻ `<head>` sẽ được thực thi).

----------

# Câu A2 - CSS Selectors — Dự đoán kết quả:
1. `h1` → Chọn: ShopTLU
2. `.price`  → Chọn: 25.990.000đ, 45.990.000đ
3. `#app header`  → Chọn: toàn bộ thẻ `<header class="top-bar dark">` chứa ShopTLU và menu nav.
4. `nav a:first-child`  → Chọn: Home
5. `.product.featured h2`  → Chọn: MacBook Pro
6. `article > p`  → Chọn: các thẻ `<p>` trực tiếp con của mỗi `article`:
   - 25.990.000đ
   - Mô tả sản phẩm...
   - 45.990.000đ
   - Mô tả sản phẩm...
7. `a[href="/"]`  → Chọn: Home
8. `.top-bar.dark h1`  → Chọn: ShopTLU

----------

# Câu A3 - Box Model — Tính toán kích thước:

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

 Khi hai lề dọc (top/bottom) của hai khối kề nhau, chúng không cộng dồn lại thành 65px mà bị "collapse". Trình duyệt sẽ so sánh và lấy giá trị lớn nhất trong hai lề để áp dụng ($40 > 25$).

* Nâng cao: Nếu `.box-a` margin-bottom: -10px, `.box-b` margin-top: 40px thì khoảng cách = 30px.
Do margin dọc đối dấu sẽ cộng lại khi collapse, nên 40 + (-10) = 30.

----------

# Câu A4 - Specificity (Độ ưu tiên):
1. Tính Specificity Score (a, b, c) cho mỗi rule

- Rule A `p { color: black; }`: specificity: (0,0,1)
- Rule B `.price { color: blue; }`: specificity: (0,1,0)
- Rule C `#main-price { color: red; }`: specificity: (1,0,0)
- Rule D `p.price { color: green; }`: specificity: (0,1,1)

2. Element sẽ có màu gì? Giải thích

- Element sẽ có màu: Đỏ (Red).

- Giải thích: Trong CSS, trình duyệt sẽ so sánh điểm ưu tiên từ trái sang phải (cột a trước, sau đó đến b, cuối cùng là c).
  + Rule C có điểm ở cột a (ID) là 1, trong khi tất cả các Rule khác đều có điểm ở cột này là 0.
  + Vì 1 > 0, nên Rule C thắng tuyệt đối, bất kể các Rule khác có bao nhiêu Class hay Element selector đi chăng nữa.

3. Nếu thêm <p class="price" id="main-price" style="color: orange;">, element có màu gì?

 - Màu Cam (Orange).
 - Inline Style có độ ưu tiên cao hơn tất cả các selector nằm trong file CSS bên ngoài hoặc thẻ `<style>`. 

4. Nếu Rule A thêm `!important`, element có màu gì? Tại sao?

 - Màu Đen (Black).
 - Vì `!important` ưu tiên vượt trên tất cả, bất kể specificity thấp hơn.
 
----------

## PHẦN B - THỰC HÀNH CODE:

# Bài B1  — Style trang Profile:
1. Universal Selector (*): Dùng ở đầu file để reset box-sizing: border-box cho toàn bộ các phần tử trên trang.

2. Element Selector (`body`, `nav`, `footer`): Dùng để thiết lập các định dạng cơ bản cho các thẻ HTML.

3. ID Selector (#main-header): Dùng để định vị chính xác phần Header duy nhất của trang để đổ màu Gradient.

4. Class Selector (.skills-table, .active): Dùng để style cho bảng kỹ năng và đánh dấu trạng thái link hiện hành.

5. Descendant Selector (nav a, .skills-table th): Chọn các thẻ <a> nằm bên trong nav hoặc các thẻ <th> nằm trong bảng để định dạng riêng biệt.

6. Pseudo-class Selector (a:hover, tr:nth-child(even), tr:hover): Dùng để tạo hiệu ứng tương tác khi di chuột và tạo màu sọc dưa (zebra striping) cho bảng.

----------

# Bài B2  — Box Model Lab:
- Hộp 1 (content-box):
  + Chiều rộng thực tế: 350px (đo từ DevTools)
- Hộp 2 (border-box):
  + Chiều rộng thực tế: 300px (đo từ DevTools)

* Sự khác biệt:
- content-box (Mặc định): Thuộc tính width chỉ tính cho phần nội dung. Nếu thêm padding hoặc border, hộp sẽ bị phình to ra ngoài.

- border-box: Thuộc tính width là kích thước cuối cùng của hộp. Padding và border sẽ được đẩy vào bên trong, giúp việc kiểm soát layout chính xác và dễ dàng hơn.

----------

# Bài B3 — Specificity Battle:
1. Danh sách 10 Rules và Specificity Score:
* `{ color: gray; }`
Specificity: 0,0,0 (Universal Selector)

* `p { color: brown; }`
Specificity: 0,0,1 (1 Element)

* `.text { color: orange; }`
Specificity: 0,1,0 (1 Class)

* `p.text { color: pink; }`
Specificity: 0,1,1 (1 Element + 1 Class)

* `.text.highlight { color: red; }`
Specificity: 0,2,0 (2 Classes)

* `#demo { color: blue; }`
Specificity: 1,0,0 (1 ID)

* `p#demo { color: purple; }`
Specificity: 1,0,1 (1 ID + 1 Element)

* `#demo.text { color: green; }`
Specificity: 1,1,0 (1 ID + 1 Class)

* `#demo.text.highlight { color: navy; }`
Specificity: 1,2,0 (1 ID + 2 Classes)

* `p#demo.text.highlight { color: cyan; }`
Specificity: 1,2,1 (1 ID + 2 Classes + 1 Element) 

2. - Element cuối cùng hiển thị màu Cyan.
   - Vì Selector `p#demo.text.highlight` có độ ưu tiên cao nhất . Trình duyệt sẽ áp dụng rule có điểm số cao nhất bất kể thứ tự xuất hiện trong file.

3. Thay đổi thứ tự Rules
  - Kết quả KHÔNG thay đổi
  - Vì trong CSS, thứ tự viết chỉ có tác dụng khi hai Selector có **cùng điểm Specificity**. Vì 10 rules trên đều có điểm số khác nhau, rule số 10 sẽ luôn thắng dù bạn có chuyển nó lên đầu file CSS.

  ----------

## PHẦN C - DEBUG & SUY LUẬN:
# Câu C1 — Debug CSS Layout:
1. Chiều rộng thực tế của sidebar và content 
- `.sidebar`: width 300px + padding 20px hai bên + border 1px hai bên = 300 + 40 + 2 = 342px
- `.content`: width 660px + padding 30px hai bên + border 1px hai bên = 660 + 60 + 2 = 722px
- Tổng = 342 + 722 = 1064px > 960px

2.  Vì 1064px lớn hơn chiều rộng của container (960px), nên không đủ chỗ để hai khối nằm cạnh nhau trên cùng một hàng. Do đó, khối content bị đẩy xuống dòng mới.

3. 2 cách sửa:
Cách 1: Dùng `border-box`
+ Giải pháp: Thêm `box-sizing: border-box`; cho `.sidebar` và `.content.`
Kết quả: Padding và border tính vào trong `width`. Tổng chiều rộng: 300px + 660px = 960px.

Cách 2: Không dùng `border-box` (Tính lại `width`)
+ Giải pháp: Giảm `width` thủ công để bù trừ cho padding và border.
  * Sidebar: Sửa thành `width: 258px;` (300 - 40 - 2). 
  * Content: Sửa thành `width: 598px;` (660 - 60 - 2).
Kết quả: Tổng chiều rộng thực tế sau khi cộng padding/border quay về đúng 960px.
