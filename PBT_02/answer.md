### 📋 PHIẾU BÀI TẬP 02
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 - Input Types: 
1. type="email": Ô nhập text, tự kiểm tra có @ và format email, dùng cho form đăng ký/đăng nhập
2. type="password": Ô nhập text, ẩn ký tự nhập vào, dùng cho form đăng nhập, đặt lại mật khẩu
3. type="tel": Ô nhập text, hiển thị bàn phím số trên mobile, dùng cho số điện thoại liên hệ
4. type="number": Ô nhập số, có nút tăng/giảm, dùng cho số lượng sản phẩm, giá tiền
5. type="date": Hiển thị date picker, dùng cho ngày sinh, ngày đặt hàng, ngày giao hàng
6. type="color": Hiển thị color picker, dùng cho tùy chọn màu sắc sản phẩm
7. type="range": Thanh trượt, dùng cho bộ lọc giá, mức độ satisfaction
8. type="file": Nút chọn file, dùng cho upload ảnh đại diện, tài liệu đính kèm
9. type="url": Ô nhập text, tự kiểm tra http:// hoặc https:// , dùng cho link website, social media
10. type="search": Ô tìm kiếm có nút X để xóa, dùng cho ô tìm kiếm sản phẩm

# Câu A2 -  Validation Attributes:
Trường hợp 1: `<input type="text" required value="">` user để trống
→ Fail: Vi phạm thuộc tính 'required'(ô nhập liệu bị để trống).

Trường hợp 2: `<input type="email" value="abc">` user gõ "abc"
→ Fail: Sai định dạng 'type="email"' (thiếu ký tự @ và tên miền).

Trường hợp 3: `<input type="number" min="1" max="10" value="15">` user gõ 15
→ Fail: Vượt quá giới hạn 'max="10"' (giá trị 15 lớn hơn mức cho phép).

Trường hợp 4: `<input type="text" pattern="[0-9]{10}" value="abc123">` user gõ "abc123"
→ Fail: : Không khớp mẫu pattern (yêu cầu 10 chữ số, nhưng nhập cả chữ và số).

Trường hợp 5: `<input type="password" minlength="8" value="123">` user gõ "123"
→ Fail: Không đủ độ dài minlength="8" (mới chỉ có 3 ký tự).

# Câu A3 - Accessibility:

1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader?
   - Định danh ô nhập liệu: Screen reader không "nhìn" thấy giao diện. Nếu không có label được kết nối bằng for, khi tab vào ô input, nó chỉ đọc là "Edit text, blank" (Ô nhập liệu trống). Có label, nó sẽ đọc: "Email, edit text".

   - Mở rộng vùng bấm: Giúp người dùng (đặc biệt là người run tay hoặc dùng mobile) dễ dàng click vào dòng chữ để focus vào ô nhập liệu thay vì phải bấm chính xác vào cái ô nhỏ.

2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.
   - Dùng để nhóm các input có liên quan chặt chẽ với nhau về mặt ngữ nghĩa, giúp người dùng hiểu bối cảnh của nhóm đó. Ví dụ:
   ```html
  <fieldset>
    <legend>Phương thức thanh toán</legend>
    <input type="radio" id="visa" name="payment"> <label for="visa">Visa</label>
    <input type="radio" id="momo" name="payment"> <label for="momo">Momo</label>
</fieldset>

3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?
   - `aria-label`:Dùng cho các phần tử không có văn bản hiển thị trên màn hình nhưng cần mô tả cho screen reader. 
   - Không dùng chung với `<label>` vì:* Gây nhiễu: aria-label sẽ ghi đè hoàn toàn nội dung của <label>. Nếu dùng cả hai, screen reader chỉ đọc cái aria-label, dẫn đến mất đồng bộ giữa cái người dùng nhìn thấy và cái họ nghe thấy.

# Câu A4 - Media:

1. `loading="lazy"` trên thẻ `<img>`:
   - Chỉ tải ảnh khi nó xuất hiện trong viewport (người dùng kéo trang đến). 
   - Cải thiện: 
      + Tốc độ tải trang
      + Tiết kiệm băng thông
      + Tăng điểm hiệu năng
   - Không nên dùng khi: Ảnh ở phía trên cùng : Không dùng cho logo, ảnh banner chính  mà người dùng thấy ngay khi vừa vào trang. Việc lazy load các ảnh này sẽ làm chậm quá trình hiển thị nội dung chính.

2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`?
   - Vì các browser hỗ trợ format video khác nhau. Cung cấp nhiều source đảm bảo video chơi được trên mọi browser.
   - 3 format video web phổ biến: MP4, WebM, OGG.

3. Thuộc tính `alt` trên `<img>`:
   - Dùng để mô tả nội dung ảnh cho screen reader và SEO. Hiển thị khi ảnh lỗi.
   - Ví dụ alt tốt:
     - Ảnh sản phẩm: "iPhone 16 Pro Max 256GB màu titan tự nhiên, màn hình 6.9 inch"
     - Ảnh trang trí: `alt=""` (để trống vì là ảnh trang trí)
     - Ảnh biểu đồ: "Biểu đồ doanh thu Q1/2026 tăng 25% so với Q4/2025, đạt 150 tỷ đồng"

# Câu A5 - So sánh <figure> vs <img>:

Cách 1 (chỉ dùng `<img>`):
- Khi ảnh là nội dung chính, không cần caption
- Khi ảnh đứng độc lập, không cần nhóm với text giải thích
- Ví dụ: ảnh sản phẩm trong danh sách, ảnh minh họa trong bài viết đơn giản

Cách 2 (dùng `<figure>` + `<figcaption>`):
- Khi ảnh cần caption để giải thích thêm
- Khi ảnh và text đi cùng nhau tạo thành đơn vị nội dung hoàn chỉnh
- Ví dụ: biểu đồ + giải thích, ảnh sản phẩm + giá tiền, sơ đồ + chú thích

Câu C1
Lỗi 1: Dòng 2 — Input "Tên" không có id và label, vi phạm accessibility
Sửa: `<label for="name">Tên:</label> <input type="text" id="name" name="name" required>`

Lỗi 2: Dòng 3 — Input email không có id và label, vi phạm accessibility  
Sửa: `<label for="email">Email:</label> <input type="email" id="email" name="email" placeholder="Email của bạn" required>`

Lỗi 3: Dòng 4 — Input password không có id và label
Sửa: `<label for="password">Mật khẩu:</label> <input type="password" id="password" name="password" placeholder="Mật khẩu" required>`

Lỗi 4: Dòng 5 — Input xác nhận password không có id và label
Sửa: `<label for="confirm_password">Nhập lại mật khẩu:</label> <input type="password" id="confirm_password" name="confirm_password" placeholder="Nhập lại mật khẩu" required>`

Lỗi 5: Dòng 6 — Input phone dùng type="text" thay vì type="tel", không có id và label
Sửa: `<label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567" pattern="[0-9]{10}" required>`

Lỗi 6: Dòng 7-10 — Select không có id, label, và option đầu tiên không có value=""
Sửa: `<label for="city">Thành phố:</label> <select id="city" name="city" required> <option value="">-- Chọn thành phố --</option> <option>Hà Nội</option> <option>TP.HCM</option> </select>`

Lỗi 7: Dòng 11-12 — Checkbox không có id, label bao quanh text nhưng không có for/id matching
Sửa: `<label for="agree"> <input type="checkbox" id="agree" name="agree" required> Tôi đồng ý điều khoản </label>`

Lỗi 8: Dòng 13 — Submit button nên dùng `<button type="submit">` thay vì `<input type="submit">`
Sửa: `<button type="submit">Gửi</button>`

Câu C2
1. Viết `pattern` regex:
   - CMND/CCCD (12 chữ số): `pattern="[0-9]{12}"`
   - Số tài khoản (10-15 chữ số): `pattern="[0-9]{10,15}"`

2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa?
   - CHƯA ĐỦ. HTML5 validation chỉ là tầng validation phía client (frontend), dễ bị bypass bằng cách tắt JavaScript, chỉnh sửa DOM, hoặc gửi request trực tiếp qua cURL/Postman. Ngân hàng cần validate ở cả client VÀ server để đảm bảo dữ liệu hợp lệ.

3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript):
   - So sánh 2 trường (confirm password = password)
   - Validate theo dữ liệu từ server (email đã tồn tại chưa, mã giảm giá có hợp lệ không)
   - Custom validation logic phức tạp (kiểm tra tuổi > 18 dựa trên ngày sinh, validate theo business rules)

4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend:
   - Tấn công SQL Injection: hacker gửi dữ liệu độc hại qua request trực tiếp
   - Tấn công XSS: chèn script vào input không được sanitize
   - Dữ liệu không nhất quán: frontend có thể bị bypass, dữ liệu rác vào database.

Câu B1
HTML không thể confirm password vì:
- HTML chỉ kiểm tra input riêng lẻ, không so sánh giá trị giữa 2 input khác nhau.