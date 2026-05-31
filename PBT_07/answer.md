### 📋 PHIẾU BÀI TẬP 07
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 — — var / let / const:
1. Đoạn 1:
```javascript
console.log(x);  //  undefined
var x = 5;
```
- Giải thích: `var` bị*hoisting — JavaScript tự động "kéo" khai báo lên đầu scope.
Thực chất JS đọc như:
```javascript
var x;           // khai báo được kéo lên, giá trị = undefined
console.log(x);  //  undefined (khai báo rồi nhưng chưa gán = 5)
x = 5;
```

2. Đoạn 2:
```javascript
console.log(y);  //  ReferenceError: Cannot access 'y' before initialization
let y = 10;
```
- Giải thích: `let` cũng bị hoisting NHƯNG không được khởi tạo — nằm trong Temporal Dead Zone (TDZ) từ đầu block đến dòng khai báo. Truy cập trong TDZ → ReferenceError.

3. Đoạn 3:
```javascript
const z = 15;
z = 20;          //  TypeError: Assignment to constant variable.
console.log(z);  // Dòng này KHÔNG chạy vì dòng trên đã throw error
```
- Giải thích: `const` không cho phép gán lại giá trị sau khi đã khai báo.

Đoạn 4:
```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```
- Giải thích:`const` chỉ ngăn reassign (gán lại biến), KHÔNG ngăn mutate (thay đổi nội dung). `arr` vẫn trỏ vào cùng 1 array trong bộ nhớ, chỉ là array đó được thêm phần tử. Nếu viết `arr = [1,2,3,4]` thì mới lỗi.


Đoạn 5:
```javascript
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```
- Giải thích: `let` có block scope. `let a = 2` bên trong `{}` là biến KHÁC hoàn toàn với `let a = 1` bên ngoài. Hai biến cùng tên nhưng sống ở phạm vi khác nhau.

# Câu A2 — Data Types & Coercion:

- `typeof null`      -> `"object"` *(Lỗi lịch sử của JS)*
- `typeof undefined` -> `"undefined"`
- `typeof NaN`       -> `"number"` *(Not-a-Number vẫn thuộc kiểu số)*
- `"5" + 3`          -> `"53"`
- `"5" - 3`          -> `2`
- `"5" * "3"`        -> `15`
- `true + true`      -> `2` *(true = 1)*
- `[] + []`          -> `""` *(Mảng ép thành chuỗi rỗng)*
- `[] + {}`          -> `"[object Object]"`
- `{} + []`          -> `"[object Object]"`

## Giải thích "5" + 3 và "5" - 3
- **`"5" + 3 = "53"`**: Toán tử `+` ưu tiên **nối chuỗi** nếu có ít nhất một toán hạng là String. Số `3` bị ép kiểu thành chuỗi `"3"`.
- **`"5" - 3 = 2`**: Toán tử `-` (và `*`, `/`) chỉ dùng cho **số học**. JS ngầm định ép kiểu chuỗi `"5"` thành số `5` để làm phép trừ.

----------

# Câu A3 — So sánh == vs ===:

- `5 == "5"`             -> `true` *(Ép kiểu chuỗi "5" thành số 5)*
- `5 === "5"`            -> `false` *(Khác kiểu dữ liệu: Number vs String)*
- `null == undefined`    -> `true` *(Quy tắc đặc biệt của JS)*
- `null === undefined`   -> `false` *(Khác kiểu dữ liệu)*
- `NaN == NaN`           -> `false` *(Quy tắc đặc biệt: NaN không bao giờ bằng chính nó)*
- `0 == false`           -> `true` *(Ép boolean `false` thành số 0)*
- `0 === false`          -> `false` *(Khác kiểu dữ liệu)*
- `"" == false`          -> `true` *(Cả hai đều bị ép kiểu về số 0)*

## Quy tắc: Nên dùng == hay ===
- **Nên dùng:** Luôn luôn sử dụng **`===`** (So sánh nghiêm ngặt - Strict Equality).
- **Giải thích** - `===` so sánh cả **Giá trị** và **Kiểu dữ liệu**, tuyệt đối không xảy ra hiện tượng ép kiểu ngầm định.
  - Sử dụng `===` giúp code an toàn hơn, dễ dự đoán hơn và tránh được những lỗi logic "bóng ma" do cơ chế ép kiểu (Type Coercion) kỳ quặc của `==` gây ra (như việc `"" == false` lại trả về `true`).

----------

# Câu A4 — Truthy & Falsy:

- 6 giá trị FALSY trong JavaScript:
```
false, 0, "", null, undefined, NaN
```
(Ngoài 6 cái này, TẤT CẢ còn lại đều truthy — kể cả "0", [], {}, -1)

| Biểu thức | Truthy/Falsy | In ra không? |
|---|---|---|
| `if ("0")` | Truthy — string không rỗng dù là "0" |  In "A" |
| `if ("")` | Falsy — string rỗng |  Không in "B" |
| `if ([])` | Truthy — array rỗng VẪN truthy! |  In "C" |
| `if ({})` | Truthy — object rỗng VẪN truthy! |  In "D" |
| `if (null)` | Falsy |  Không in "E" |
| `if (0)` | Falsy |  Không in "F" |
| `if (-1)` | Truthy — số âm vẫn truthy (chỉ 0 là falsy) |  In "G" |
| `if (" ")` | Truthy — space không phải empty string |  In "H" |

----------

# Câu A5 — — Template Literals:

```javascript
// Cách 1:
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3 — template literal giúp tránh hoàn toàn escape quote:
const html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

----------

## PHẦN C — SUY LUẬN:

# Câu C1 — Debug JavaScript:

```javascript
//  CODE GỐC (có lỗi)
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        return "Phần trăm giảm không hợp lệ"
    }
    
    var giamGia = giaBan * phanTramGiam / 100        // LỖI 1, 2
    let giaSauGiam = giaBan - giamGia
    
    if (giaSauGiam = 0) {                             // LỖI 3
        console.log("Sản phẩm miễn phí!")
    }
    
    return giaSauGiam
}

const gia = tinhGiaGiamGia("100000", 20)              // LỖI 4
console.log("Giá sau giảm: " + gia + "đ")

const gia2 = tinhGiaGiamGia(50000, 110)
console.log("Giá: " + gia2)

for (var i = 0; i < 5; i++) {                         // LỖI 5 (ẩn!)
    setTimeout(function() {
        console.log("Item " + i)                       // LỖI 6
    }, 1000)
}
```

---

LỖI 1 — Dùng `var` thay vì `const`/`let`:
```javascript
var giamGia = giaBan * phanTramGiam / 100;
// Sửa thành:
const giamGia = giaBan * phanTramGiam / 100;
```
`var` có function scope và hoisting → dễ gây bug. Luôn dùng `const`/`let`.

LỖI 2 — Không validate input là số:
```javascript
// giaBan = "100000" (string) — hàm không kiểm tra
// Sửa: thêm validation ở đầu hàm
if (isNaN(giaBan) || isNaN(phanTramGiam)) {
    return "Lỗi: Input phải là số";
}
```

LỖI 3 — Assignment thay vì so sánh (nghiêm trọng nhất):
```javascript
if (giaSauGiam = 0) {    // GÁN giaSauGiam = 0, luôn falsy → không bao giờ vào if
// Sửa thành:
if (giaSauGiam === 0) {  // SO SÁNH
```
Đây là lỗi rất nguy hiểm vì JS không báo lỗi, chỉ âm thầm chạy sai.

LỖI 4 — Không convert string sang number:
```javascript
tinhGiaGiamGia("100000", 20)
// "100000" * 20 = 2000000 (type coercion tự làm), nhưng giaBan - giamGia:
// "100000" - 20000 = 80000 (JS convert, may mắn vẫn đúng vì dùng -)
// Tuy nhiên đây là BAD PRACTICE và thiếu validation
// Nên gọi: tinhGiaGiamGia(100000, 20)  hoặc tinhGiaGiamGia(Number("100000"), 20)
```

LỖI 5+6 — `var i` trong vòng lặp với setTimeout (LỖI ẨN):
```javascript
// Code gốc:
for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // In ra "Item 5" năm lần!
    }, 1000)
}
```
- `var i` có function scope (không phải block scope). Khi setTimeout chạy sau 1 giây, vòng lặp đã chạy xong, `i` = 5. Tất cả 5 callback cùng tham chiếu đến biến `i` đó → in ra "Item 5" × 5 lần.

```javascript
// Sửa bằng let:
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i)  // In ra Item 0, 1, 2, 3, 4
    }, 1000)
}
```
`let` có block scope → mỗi vòng lặp tạo ra một biến `i` riêng → closure capture đúng giá trị.

----------

# Câu C2 — Bài toán thực tế:
```javascript
// Dữ liệu đầu vào
const dsMon = [
    { ten: "Phở bò", soLuong: 2, gia: 65000 },
    { ten: "Trà đá", soLuong: 3, gia: 5000 },
    { ten: "Bún chả", soLuong: 1, gia: 55000 }
];

function inHoaDon(danhSachMon, ngayTrongTuan, coTip = true) {
    // 1. TÍNH TOÁN CÁC CON SỐ
    let tongCong = 0;
    danhSachMon.forEach(mon => {
        tongCong += mon.gia * mon.soLuong;
    });

    // Xác định phần trăm giảm theo hóa đơn
    let phanTramGiam = 0;
    if (tongCong > 1000000) {
        phanTramGiam = 15;
    } else if (tongCong > 500000) {
        phanTramGiam = 10;
    }

    // Thứ 3 (Quy ước theo hàm Date.getDay() của JS: 3 = Wednesday)
    if (ngayTrongTuan === 3) {
        phanTramGiam += 5;
    }

    let tienGiam = tongCong * (phanTramGiam / 100);
    let tongSauGiam = tongCong - tienGiam;
    
    // VAT và Tip thường được tính trên số tiền đã trừ khuyến mãi
    let tienVAT = tongSauGiam * 0.08;
    let tienTip = coTip ? tongSauGiam * 0.05 : 0;
    
    let thanhToan = tongSauGiam + tienVAT + tienTip;

    // 2. HIỂN THỊ (VẼ GIAO DIỆN HÓA ĐƠN)
    const W = 38; // Chiều rộng không gian bên trong (không tính 2 ký tự viền)
    const formatTien = (tien) => tien.toLocaleString('vi-VN') + 'đ';

    console.log("╔" + "═".repeat(W) + "╗");
    
    // In Header Căn Giữa
    const tieuDe = "HÓA ĐƠN NHÀ HÀNG";
    const spaceLe = Math.floor((W - tieuDe.length) / 2);
    console.log("║" + " ".repeat(spaceLe) + tieuDe + " ".repeat(W - tieuDe.length - spaceLe) + "║");
    console.log("╠" + "═".repeat(W) + "╣");

    // In Danh Sách Món
    danhSachMon.forEach((mon, index) => {
        let cot1 = `${index + 1}. ${mon.ten}`.padEnd(15);
        let cot2 = `x${mon.soLuong}`.padEnd(6);
        let cot3 = `@${mon.gia / 1000}k`.padEnd(6);
        let cot4 = `= ${(mon.gia * mon.soLuong) / 1000}k`;
        
        let dong = `${cot1}${cot2}${cot3}${cot4}`;
        console.log("║ " + dong.padEnd(W - 2) + " ║");
    });

    console.log("╠" + "═".repeat(W) + "╣");

    // Hàm phụ trợ in các dòng tổng kết
    const inDongTong = (nhan, giaTri) => {
        let strGiaTri = formatTien(giaTri);
        console.log("║ " + nhan.padEnd(W - strGiaTri.length - 2) + strGiaTri + " ║");
    };

    // In Khối Tổng
    inDongTong("Tổng cộng:", tongCong);
    inDongTong(`Giảm giá (${phanTramGiam}%):`, tienGiam);
    inDongTong("VAT (8%):", tienVAT);
    if (coTip) inDongTong("Tip (5%):", tienTip);

    console.log("╠" + "═".repeat(W) + "╣");
    inDongTong("THANH TOÁN:", thanhToan);
    console.log("╚" + "═".repeat(W) + "╝");
}
```