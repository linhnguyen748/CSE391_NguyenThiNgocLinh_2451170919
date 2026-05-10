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

----------

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

* So sánh với dự đoán: Kết quả thực tế khá khớp với dự đoán.

----------

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

----------

# Câu A4 - Media:

1. `loading="lazy"` trên thẻ `<img>`:
   - Chỉ tải ảnh khi nó xuất hiện trong viewport (người dùng kéo trang đến). 
   - Cải thiện: 
      + Tốc độ tải trang
      + Tiết kiệm băng thông
      + Tăng điểm hiệu năng
   - Không nên dùng khi: Ảnh ở phía trên cùng : Không dùng cho logo, ảnh banner chính  mà người dùng thấy ngay khi vừa vào trang. Việc lazy load các ảnh này sẽ làm chậm quá trình hiển thị nội dung chính.

2. Tại sao nên cung cấp nhiều `<source>` trong thẻ `<video>`?
   - Đảm bảo tính tương thích vì mỗi trình duyệt hỗ trợ các định dạng video khác nhau. Trình duyệt sẽ tự chọn định dạng đầu tiên mà nó hỗ trợ.
   - 3 format video web phổ biến: MP4, WebM, OGG.

3. Thuộc tính `alt` trên `<img>`:
   - Mô tả nội dung ảnh cho trình đọc màn hình (hỗ trợ người khiếm thị), hiển thị thay thế khi ảnh lỗi và hỗ trợ SEO.
   - Ví dụ alt tốt:
     - Ảnh sản phẩm: `alt="Điện thoại iPhone 16 màu xanh nhìn từ mặt trước"`
     - Ảnh trang trí: `alt=""` (để trống vì là ảnh trang trí)
     - Ảnh biểu đồ: `alt="Biểu đồ cột cho thấy doanh thu Quý 1 năm 2026 tăng trưởng 15%"`

----------

# Câu A5 - So sánh <figure> vs <img>:
1. Phân tích: 
   - Cách 1 (`<img>` đứng độc lập): Chỉ dùng để chèn một hình ảnh đơn thuần vào nội dung. Ảnh này thường mang tính chất minh họa trực tiếp hoặc là một phần không thể tách rời của dòng văn bản (inline).
   - Cách 2 (`<figure>` và `<figcaption>`): Dùng để bao bọc một nội dung độc lập (hình ảnh, biểu đồ, sơ đồ) kèm theo chú thích. Khối này có thể được di chuyển ra vị trí khác trong tài liệu mà không làm thay đổi ý nghĩa của nội dung chính.
2. Khi nào nên dùng?
* Cách 1:
   - Khi ảnh là một phần bổ trợ nhỏ, không cần chú thích riêng hoặc là các biểu tượng (icon) trang trí.
Ví dụ thực tế: 
1. Ảnh đại diện (avatar) nhỏ bên cạnh tên người dùng.
2. Các icon mạng xã hội ở chân trang (footer).

* Cách :
   - Khi ảnh cần có chú thích rõ ràng, số thứ tự (Hình 1, Hình 2) hoặc là nội dung chính cần được tách biệt để người đọc chú ý.
Ví dụ thực tế: 
1. Ảnh sản phẩm trong bài viết review kèm tên và giá tiền.
2. Biểu đồ thống kê trong báo cáo cần có tiêu đề phía dưới.

----------

## PHẦN B - THỰC HÀNH CODE:

# Bài B1 — Form Đăng ký Tài khoản:
* Tại sao HTML thuần không thể validate "Confirm Password"?
   - Thiếu tính năng so sánh: Các thuộc tính HTML5 (required, pattern) chỉ kiểm tra dữ liệu nội tại của một thẻ. HTML không có thuộc tính hỗ trợ so sánh giá trị giữa hai thẻ khác nhau.

   - Ngôn ngữ tĩnh: HTML là ngôn ngữ đánh dấu, không có logic điều kiện (if-else). Việc so sánh hai chuỗi ký tự đòi hỏi logic lập trình mà chỉ JavaScript hoặc Server-side mới thực hiện được.

   - Giới hạn của Regex: Thuộc tính pattern chỉ kiểm tra định dạng dữ liệu (như độ dài, ký tự đặc biệt) chứ không thể tham chiếu đến giá trị động của một ô nhập liệu khác.

----------

## PHẦN C - PHÂN TÍCH & SUY LUẬN:

# Câu C1 — Debug Form:
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

----------

# Câu C2 — Thiết kế chiến lược Validation:
1. Regex Pattern:
   - CMND/CCCD (12 chữ số): `pattern="[0-9]{12}"`
   - Số tài khoản (10-15 chữ số): `pattern="[0-9]{10,15}"`

2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
   - Trả lời: KHÔNG.
   - Giải thích: HTML5 validation chỉ là lớp bảo vệ bề nổi nhằm cải thiện trải nghiệm người dùng (UX). Người dùng có thể dễ dàng vô hiệu hóa hoặc vượt qua nó bằng cách sử dụng DevTools (F12) để xóa thuộc tính `required`, `pattern`, hoặc sử dụng các công cụ như Postman/CURL để gửi dữ liệu trực tiếp đến server mà không qua trình duyệt.

3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JavaScript)
   - So sánh các trường dữ liệu: Ví dụ kiểm tra "Xác nhận mật khẩu" có trùng khớp với "Mật khẩu" hay không.

   - Kiểm tra tính khả dụng: Ví dụ kiểm tra xem Email hoặc Username đã tồn tại trong cơ sở dữ liệu hay chưa (cần gọi API).

   - Logic nghiệp vụ phức tạp: Ví dụ kiểm tra số thẻ ngân hàng có hợp lệ theo thuật toán Luhn hoặc giới hạn ngày sinh phải đủ 18 tuổi dựa trên thời gian thực.
4. 2 rủi ro bảo mật nếu chỉ validate trên Frontend mà không validate Backend
   - Tấn công SQL Injection: hacker gửi dữ liệu độc hại qua request trực tiếp
   - Tấn công XSS: chèn script vào input không được sanitize
   - Dữ liệu không nhất quán: frontend có thể bị bypass, dữ liệu rác vào database.