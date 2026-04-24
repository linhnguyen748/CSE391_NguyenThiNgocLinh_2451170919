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
