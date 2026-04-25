### 📋 PHIẾU BÀI TẬP 01
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 - HTTP & Browser: (Tài liệu 01_instroduction_html_universe.md)
### 1. Thứ tự 5 bước khi gõ `https://shopee.vn`:
    - DNS: Trình duyệt tra cứu địa chỉ IP của shopee.vn 
    - TCP: Sau khi có IP, trình duyệt kết nối tới server
    - HTTP: Trình duyệt gửi request đến server để yêu cầu nội dung
    - Server Response: Server xử lý request xong và gửi trả về một gói tin 200 OK kèm dữ liệu HTML/CSS
    - Browser Render: Render dữ liệu HTML/CSS
### 2.  Trong DevTools của Chrome, tab Network cho biết:
- Danh sách Request: Toàn bộ các yêu cầu tệp tin được gửi từ trình duyệt đến máy chủ.
- Status Code: Mã trạng thái phản hồi. 
- Danh sách tài nguyên (HTML, CSS, JS, Img...).
- Kích thước file.
- Thời gian phản hồi và tải từng tài nguyên riêng lẻ.
- Waterfall timeline thể hiện tiến trình tải
- Thông số tổng kết: Tổng số request, tổng dung lượng và thời gian trang web load xong hoàn toàn.

![Ảnh màn hình tab Network](screenshots/tab-network.png)

----------

# Câu A2 - Semantic HTML: (Tài liệu: 04_visible_part_html.md)
* 1. Tại sao trang web bị Google đánh giá SEO thấp?
- Trang web đánh giá thấp vì mắc lỗi lạm dụng thẻ div mà không có thẻ semantic nào để định hình bố cục của web.

* 2. Các lỗi semantic:
- Lỗi 1: Dùng <div class="header"> thay vì <header>
- Lỗi 2: Dùng <div class="menu"> thay vì <nav>
- Lỗi 3: Dùng <div class="main"> thay vì <main>
- Lỗi 4: Dùng <div class="product"> thay vì <article>
- Lỗi 5: Dùng <div class="title"> thay vì <h1>
- Lỗi 6: <img> thiếu alt

* 3. Code sửa lại chuẩn: 
```html
<header>
    <div class="logo">ShopTLU</div>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/products">Sản phẩm</a></li>
        </ul>
    </nav>
</header>

<main>
    <article class="product">
        <h1>iPhone 16 Pro</h1>
        <p class="price">25.990.000đ</p>
        <figure class="image">
            <img src="iphone.jpg" alt="Điện thoại iPhone 16 Pro màu Titan Tự Nhiên">
        </figure>
    </article>
</main>

<footer>© 2026 ShopTLU</footer>
```
----------

# Câu A3 - Block vs Inline: (Tài liệu: 04_visible_part_html.md)

```html
[Hộp 1]
Text A Text B
[Hộp 2]
Text C Text D
[Hộp 3]
```
# 2. Giải thích:

- Thẻ `<div>` là phần tử **block-level**: Luôn tự động xuống dòng và chiếm trọn chiều ngang của trang. Vì vậy `Hộp 1`, `Hộp 2`, `Hộp 3` nằm ở các dòng riêng.

- Thẻ `<span>` & `<strong>` là phần tử **inline-level**: Không xuống dòng, chỉ chiếm không gian vừa đủ nội dung. Do đó, `Text A`, `Text B` nằm cùng dòng; `Text C`, `Text D` cũng nằm cùng dòng.

----------

# Câu A4 — Table: (Tài liệu: 05_tables_hyperlinks.md)

 ## 1. Sự khác nhau giữa `<thead>`, `<tbody>`, `<tfoot>`
 + `<thead>`: Phần đầu bảng, chứa tiêu đề cột.
 + `<tbody>`: Phần thân bảng, chứa dữ liệu chính.
 + `<tfoot>`: Phần chân bảng, chứa tổng kết(tổng cộng, ghi chú).

 ## 2. Lý do không nên dùng `<table>` để tạo layout trang web:
* **Sai mục đích**: Table sinh ra để hiển thị dữ liệu dạng hàng/cột, không phải để dàn trang.
* **Khó Responsive**: Table có cấu trúc khung cứng nhắc, không thể linh hoạt trên điện thoại như CSS Grid hay Flexbox.
* **Code rối & Khó bảo trì**: Lồng nhiều lớp  `<tr>`, `<td>` khiến mã nguồn cồng kềnh, khó đọc và tốn nhiều thời gian khi muốn thay đổi giao diện.
* **Tốc độ tải chậm**: Trình duyệt phải tính toán toàn bộ kích thước của các ô trong bảng rồi mới hiển thị, gây trễ trải nghiệm người dùng.

----------

## PHẦN B - THỰC HÀNH CODE:

# Câu B3 — Debug HTML:
* Danh sách các lỗi trong bài:
- Lỗi 1: Dòng 1 — `<!DOCTYPE>` thiếu html — Cách sửa: Đổi thành `<!DOCTYPE html>`.

- Lỗi 2: Dòng 2 — Thẻ `<html>` thiếu thuộc tính ngôn ngữ — Cách sửa: Thêm `lang="vi"`.

- Lỗi 3: Dòng 4 — Thẻ `<title>` chưa đóng — Cách sửa: Thêm `</title>`.

- Lỗi 4: Dòng 5 — Thuộc tính charset viết sai định dạng `(utf8)` — Cách sửa: Sửa thành `"UTF-8"`.

- Lỗi 5: Dòng 5 — Thiếu thẻ `<meta name="viewport">` — Cách sửa: Thêm thẻ viewport để hỗ trợ hiển thị trên mobile.

- Lỗi 6: Dòng 8 — Thẻ `<h1>` đóng sai bằng `<h1>` — Cách sửa: Đổi thành `</h1>`.

- Lỗi 7: Dòng 12 — Thẻ `<a>` đóng sai bằng `<a>` — Cách sửa: Đổi thành `</a>`.

- Lỗi 8: Dòng 12 — — Thẻ `<a>` đầu tiên đóng sai cú pháp — Cách sửa:`</a>`.

- Lỗi 9: Dòng 21 — Thẻ `<img>` thiếu dấu ngoặc kép cho src và thiếu thuộc tính alt — Cách sửa: Thêm `src="iphone.jpg"` và `alt="iPhone 16 Pro"`.

- Lỗi 10: Dòng 23 — Sai thứ tự đóng thẻ `<b>` mở sau `<p>` nhưng lại đóng sau `<p>`  — Cách sửa: Sửa thành `<b>...</b></p>`.

- Lỗi 11: Dòng 28-37 - `<table>` thiếu cấu trúc `<thead>` và `<tbody>` — Cách sửa: Bổ sung các thẻ phân đoạn bảng.

- Lỗi 12: Dòng 41 — Sử dụng hai thẻ `<main>` trên cùng một trang (sai chuẩn HTML5) — Cách sửa: `<main>` thứ hai thành `<aside>`.

- Lỗi 13: Dòng 42 — Thẻ `<footer>` chưa đóng — Cách sửa: Thêm `</footer>`.

----------

# Câu B4 - Phân tích trang web thật



----------

## 📋 PHẦN C - SUY LUẬN
# Câu C1 - Thiết kế cấu trúc 

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chi tiết sản phẩm - iPhone 16 Pro Max</title>
</head>
<body>

<header>
    <nav>
        <ul>
            <li><a href="/">Trang chủ</a></li>
            <li><a href="/san-pham">Sản phẩm</a></li>
            <li><a href="/gio-hang">Giỏ hàng</a></li>
        </ul>
    </nav>
</header>

<nav aria-label="breadcrumb">
    <ol>
        <li><a href="/">Trang chủ</a></li>
        <li><a href="/dien-thoai">Điện thoại</a></li>
        <li>iPhone 16</li>
    </ol>
</nav>

<main>
    <article>
        <section id="product-gallery">
            <h2>Bộ sưu tập hình ảnh</h2>
            
            <figure>
                <img src="https://placehold.co/600x400" alt="iPhone 16 - Ảnh chính diện" width="600" height="400">
                <figcaption>Ảnh chính diện sản phẩm</figcaption>
            </figure>

            <div class="thumbnails">
                <figure>
                    <img src="https://placehold.co/150x100" alt="iPhone 16 - Mặt lưng" width="150" height="100">
                    <figcaption>Mặt lưng</figcaption>
                </figure>
                <figure>
                    <img src="https://placehold.co/150x100" alt="iPhone 16 - Cạnh bên" width="150" height="100">
                    <figcaption>Cạnh bên</figcaption>
                </figure>
                <figure>
                    <img src="https://placehold.co/150x100" alt="iPhone 16 - Cụm camera" width="150" height="100">
                    <figcaption>Cụm camera</figcaption>
                </figure>
                <figure>
                    <img src="https://placehold.co/150x100" alt="iPhone 16 - Mở hộp" width="150" height="100">
                    <figcaption>Hộp sản phẩm</figcaption>
                </figure>
            </div>
        </section>

        <section id="product-info">
            <h1>iPhone 16 Pro Max 256GB</h1> <p class="price"><strong>25.990.000đ</strong></p> <div class="rating" aria-label="Đánh giá 5 sao">
                <span>⭐⭐⭐⭐⭐</span> (1.200 đánh giá)
            </div>

            <div class="description">
                <h2>Mô tả sản phẩm</h2>
                <p>iPhone 16 Pro Max với chip A18 Pro mạnh mẽ, thiết kế Titan bền bỉ...</p>
            </div>
        </section>

        <section id="specifications">
            <h2>Thông số kỹ thuật</h2>
            <table>
                <thead>
                    <tr>
                        <th>Đặc tính</th>
                        <th>Thông tin chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Màn hình</td>
                        <td>6.9 inch, Super Retina XDR</td>
                    </tr>
                    <tr>
                        <td>Chipset</td>
                        <td>Apple A18 Pro</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section id="reviews">
            <h2>Đánh giá từ khách hàng</h2>
            <article class="user-comment">
                <h3>Người dùng: Nguyễn Văn A</h3>
                <p>Máy rất đẹp, pin trâu và chụp ảnh cực đỉnh!</p>
            </article>
        </section>

    </article>

    <aside>
        <h2>Sản phẩm tương tự</h2>
        <ul>
            <li>
                <a href="/samsung-s24">Samsung Galaxy S24 Ultra</a>
            </li>
            <li>
                <a href="/iphone-15">iPhone 15 Pro Max</a>
            </li>
        </ul>
    </aside>

</main>

<footer>
    <p>&copy; 2026 ShopTLU. Bản quyền thuộc về Gemini Studio.</p>
</footer>

</body>
</html>

```

## Câu C2 - So sánh & Tranh luận

*  Việc cho rằng chỉ cần dùng `<div>` kết hợp với class để tiết kiệm thời gian là một sai lầm phổ biến, dẫn đến việc tạo ra những trang web "rỗng" về mặt ngữ nghĩa và gây ra hai vấn đề kỹ thuật nghiêm trọng:

- Về **SEO**: Các công cụ tìm kiếm như Google phân loại nội dung dựa trên cấu trúc thẻ. Nếu dùng `<div>`, Google sẽ khó xác định đâu là nội dung chính, đâu là điều hướng. Sử dụng các thẻ như `<main>`, `<article>` hay `<nav>` giúp nội dung được lập chỉ mục chính xác hơn, từ đó cải thiện thứ hạng hiển thị.

- Về **Accessibility**: Những người dùng sử dụng trình đọc màn hình (Screen Reader) phụ thuộc vào các thẻ semantic để điều hướng. Các thẻ này đóng vai trò như các "cột mốc". Nếu mọi thứ đều là `<div>`, trình đọc sẽ không thể thông báo cho người dùng đâu là đầu trang, chân trang hay một danh sách, khiến họ gặp khó khăn cực lớn khi truy cập web.

* Ví dụ cụ thể: Khi dùng thẻ `<button>`, trình duyệt mặc định hỗ trợ tương tác bằng bàn phím (phím Enter/Space) và các thuộc tính hỗ trợ người khuyết tật. Nếu dùng `<div class="button">`, sẽ tốn rất nhiều công sức viết thêm JavaScript và các thuộc tính aria-label để bắt chước những tính năng mà thẻ semantic vốn đã có sẵn.

* Trường hợp `<div>` vẫn phù hợp: `<div>` không hề vô dụng; nó vẫn là lựa chọn tốt nhất khi cần một "thẻ bọc" trung tính chỉ để phục vụ mục đích trình bày (styling) hoặc tạo bố cục với Flexbox/Grid mà khối đó không mang ý nghĩa nội dung cụ thể nào.

Kết luận: Sử dụng Semantic HTML không phải là "tốn thời gian học", mà là cách để xây dựng một sản phẩm bền vững, chuyên nghiệp và thân thiện với mọi đối tượng người dùng.