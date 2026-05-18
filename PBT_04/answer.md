### 📋 PHIẾU BÀI TẬP 04
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 - 5 Loại Positioning:
1. Static
+ Chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Mặc định (luồng tài liệu)
+ Cuộn theo trang: Có 
+ Use case: Giá trị mặc định cho mọi phần tử.

2. Relative
+ Chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Vị trí ban đầu của chính nó
+ Cuộn theo trang: Có
+ Use case: Di chuyển nhẹ phần tử hoặc làm gốc cho absolute.

3. Absolute
+ Chiếm chỗ trong flow: Không
+ Tham chiếu vị trí: Tổ tiên gần nhất có position
+ Cuộn theo trang: Có
+ Use case: Đặt phần tử ở vị trí chính xác trong một khung chứa.

4. Fixed
+ Chiếm chỗ trong flow: Không
+ Tham chiếu vị trí: Cửa sổ trình duyệt (Viewport)
+ Cuộn theo trang: Không
+ Use case: Thanh điều hướng (Navbar) hoặc nút "Lên đầu trang".

5. Sticky
+ Chiếm chỗ trong flow: Có
+ Tham chiếu vị trí: Khung chứa gần nhất có thể cuộn
+ Cuộn theo trang: Có/Không
+ Use case: Tiêu đề bảng hoặc menu luôn hiển thị khi cuộn.

* Câu hỏi thêm:

- Khi nào absolute tham chiếu body: absolute sẽ tham chiếu đến body  khi tất cả các phần tử cha/tổ tiên bao quanh nó đều có position: static (giá trị mặc định).

- Khi nào absolute tham chiếu parent: Nó sẽ tham chiếu đến phần tử cha (parent) khi phần tử cha đó có giá trị position khác với static.

-  Giải thích khái niệm "nearest positioned ancestor":

 - Đây là "tổ tiên gần nhất có thiết lập vị trí".
+ Tổ tiên (Ancestor): Là các phần tử bao ngoài (cha, ông, cố...).
+ Có thiết lập vị trí (Positioned): Là bất kỳ phần tử nào có thuộc tính position được đặt là relative, absolute, fixed, hoặc sticky.
+ Gần nhất (Nearest): Trình duyệt sẽ tìm ngược từ dưới lên trên; phần tử đầu tiên thỏa mãn điều kiện "không phải static" sẽ được chọn làm mốc tọa độ để tính toán các giá trị top, right, bottom, left cho phần tử absolute.

----------

# Câu A2 — Flexbox vs Grid:
/* Trường hợp 1 */

+-------------------------------------------------------+
| +----------+  +----------+  +----------+  +----------+|
| |  Item 1  |  |  Item 2  |  |  Item 3  |  |  Item 4  ||
| +----------+  +----------+  +----------+  +----------+|
+-------------------------------------------------------+

/* Trường hợp 2 */

+-------------------------------------------------------+
|   +--------------------+     +--------------------+   |
|   |       Item 1       |     |       Item 2       |   |
|   +--------------------+     +--------------------+   |
|                                                       |
|   +--------------------+     +--------------------+   |
|   |       Item 3       |     |       Item 4       |   |
|   +--------------------+     +--------------------+   |
|                                                       |
|   +--------------------+     +--------------------+   |
|   |       Item 5       |     |       Item 6       |   |
|   +--------------------+     +--------------------+   |
+-------------------------------------------------------+

/* Trường hợp 3 */

+-------------------------------------------------------+
|                                                       |
| +--------+                  +--------+       +--------|
| | Item 1 |                  | Item 2 |       | Item 3 |
| +--------+                  +--------+       +--------|
|                                                       |
+-------------------------------------------------------+


/* Trường hợp 4 */

+-------------------------------------------------------+
| +--------+   +--------------------------+   +--------+|
| | Item 1 |   |          Item 2          |   | Item 3 ||
| |(200px) |   |          (1fr)           |   |(200px) ||
| +--------+   +--------------------------+   +--------+|
+-------------------------------------------------------+


/* Trường hợp 5 */

+-------------------------------------------------------+
| +----------+   +----------+   +----------+            |
| |  Item 1  |   |  Item 2  |   |  Item 3  |            |
| +----------+   +----------+   +----------+            |
|                                                       |
| +----------+   +----------+   +----------+            |
| |  Item 4  |   |  Item 5  |   |  Item 6  |            |
| +----------+   +----------+   +----------+            |
|                                                       |
| +----------+                                          |
| |  Item 7  |         (Trống)        (Trống)           |
| +----------+                                          |
+-------------------------------------------------------+

----------


----------

## PHẦN C - SUY LUẬN:

# Câu C1 — Flexbox vs Grid::
1. Navigation bar ngang (logo + menu + buttons)

Giải pháp: Flexbox

Giải thích: Navbar là một bố cục 1 chiều (chỉ theo chiều ngang). Flexbox sinh ra để giải quyết hoàn hảo bài toán này. Nó giúp bạn dễ dàng căn chỉnh các phần tử trên cùng một hàng (VD: đẩy logo sang trái, menu ra giữa, button sang phải bằng justify-content), đồng thời căn giữa tất cả theo chiều dọc vô cùng đơn giản với align-items: center.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

Giải pháp: Grid

Giải thích: Lưới ảnh là bố cục 2 chiều (gồm cả hàng và cột). Grid kiểm soát cực tốt hệ thống lưới này bằng cách khai báo grid-template-columns: repeat(3, 1fr). Khi số lượng ảnh tăng lên, Grid sẽ tự động tạo ra các hàng mới (auto-placement) với khoảng cách đều tăm tắp thông qua thuộc tính gap mà không cần tính toán phức tạp.

3. Layout blog: main content + sidebar

Giải pháp: Grid (Hoặc kết hợp)

Giải thích: Đây là cấu trúc layout vĩ mô (macro-layout) của trang. Grid cực kỳ lý tưởng để chia tỷ lệ khung xương (ví dụ: grid-template-columns: 3fr 1fr). Nếu bạn cần thiết lập phần header, footer ôm trọn phía trên và dưới cấu trúc này, Grid xử lý sẽ gọn gàng và ít code hơn Flexbox rất nhiều.

4. Footer với 4 cột thông tin (Về chúng tôi, Liên kết, Hỗ trợ, Liên hệ)

Giải pháp: Grid (Khuyên dùng) hoặc Flexbox

Giải thích: Bạn có thể dùng Flexbox, nhưng Grid ưu việt hơn trong trường hợp này. Dùng grid-template-columns: repeat(4, 1fr) sẽ đảm bảo 4 cột luôn có chiều rộng bằng nhau một cách cứng cáp và thẳng hàng, bất kể nội dung chữ bên trong mỗi cột dài ngắn ra sao.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

Giải pháp: Flexbox

Giải thích: Cấu trúc bên trong của một card sản phẩm là bố cục 1 chiều theo trục dọc. Bạn chỉ cần thiết lập display: flex; flex-direction: column; cho container của card. Điểm "ăn tiền" nhất của Flexbox ở đây là bạn có thể gán margin-top: auto cho nút bấm, nó sẽ tự động đẩy nút này dính chặt vào đáy card dù phần text bên trên có ngắn hay dài.

----------

# Câu C2 — Debug Flexbox:
1. Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống
- Nguyên nhân: .card không dùng Flexbox column, nên chiều cao mỗi card phụ thuộc vào content bên trong (ảnh, tiêu đề dài/ngắn, mô tả...). Nút "Mua" không được "ghim" xuống đáy.

```css
.card-container { display: flex; flex-wrap: wrap; }
.card {
  width: 30%;
  margin: 1.5%;
  display: flex;
  flex-direction: column;
}
.card img { width: 100%; height: 200px; object-fit: cover;}
.card h3 { font-size: 18px; }
.card .btn {
  padding: 10px;
  margin-top: auto;
}
```

2. Lỗi 2: Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên
- Nguyên nhân: Thiếu justify-content: center và align-items: center. display: flex mặc định là justify-content: flex-start và align-items: stretch.

```css
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.hero-content {
  text-align: center;
}
```

3. Lỗi 3: Sidebar bị co lại khi content quá dài
- Nguyên nhân: Khi dùng display: flex các phần tử bên trong sẽ thành flex item và có thuộc tính mặc định là flex-shrink: 1 (tự động thu nhỏ nếu container không đủ chỗ). Khi .content chứa nội dung quá dài flexbox phải chia lại không gian như là thu nhỏ sidebar.

```css
.layout { display: flex; background-color: yellowgreen;}
.sidebar {
  width: 250px;
  flex-shrink: 0;
  background-color: aquamarine;
}
.content { flex: 1; background-color: chartreuse;}
```