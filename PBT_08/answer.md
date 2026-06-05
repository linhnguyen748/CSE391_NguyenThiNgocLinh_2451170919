### 📋 PHIẾU BÀI TẬP 08
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 — Function Declaration vs Expression vs Arrow:

Hàm tính thuế: nếu lương > 11 triệu thì thuế = 10%, còn lại = 0%
Trả về object gồm thuong (thuế) và thuc_nhan (lương thực nhận)

1. Cách 1 — Function Declaration:
```javascript
function tinhThueBaoHiem(luong) {
    let thuong = 0;
    if (luong > 11000000) {
        thuong = luong * 0.1;
    }
    let thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
}
```

2. Cách 2 — Function Expression:
```javascript
const tinhThueBaoHiem = function(luong) {
    let thuong = 0;
    if (luong > 11000000) {
        thuong = luong * 0.1;
    }
    let thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
};
```

3. Cách 3 — Arrow Function:
```javascript
const tinhThueBaoHiem = (luong) => {
    let thuong = 0;
    if (luong > 11000000) {
        thuong = luong * 0.1;
    }
    let thuc_nhan = luong - thuong;
    return { thuong, thuc_nhan };
};
```

4. Câu hỏi: 3 cách có khác nhau về Hoisting không?

- Có, khác nhau!

- Function Declaration thì được HOISTING (kéo lên đầu). Tức là mình có thể GỌI hàm TRƯỚC khi khai báo, JS không báo lỗi:
```javascript
console.log(tinhThueBaoHiem(15000000));

function tinhThueBaoHiem(luong) {
}
```

- Function Expression và Arrow Function thì KHÔNG được hoisting (vì nó gán vào biến `const`/`let`). Nếu gọi trước khi khai báo sẽ bị lỗi:
```javascript
console.log(tinhThueBaoHiem(15000000));
const tinhThueBaoHiem = (luong) => {
};
```

# Câu A2 — Scope & Closure:

**Đoạn 1 (Counter):**
- `c.increment()` -> `1`
- `c.increment()` -> `2`
- `c.increment()` -> `3`
- `c.decrement()` -> `2`
- `c.getCount()`  -> `2`

**Đoạn 2 (setTimeout):**
- `var: 3`
- `var: 3`
- `var: 3`
- `let: 0`
- `let: 1`
- `let: 2`

## 2. Giải thích
Sự khác biệt nằm ở phạm vi biến (Scope) và cơ chế Closure:

- **`var`:** Tạo ra một biến `i` duy nhất dùng chung cho cả vòng lặp. Khi `setTimeout` thực thi (sau 100ms), vòng lặp đã chạy xong và `i` đã tăng lên `3`. Do đó, cả 3 callback đều tham chiếu đến cùng biến `i` mang giá trị `3`.
- **`let`:** Ở mỗi bước lặp, JavaScript tạo ra một vùng nhớ `j` hoàn toàn mới và độc lập. Nhờ Closure, mỗi callback của `setTimeout` sẽ "ghi nhớ" chính xác giá trị `j` tại vòng lặp tương ứng của nó (lần lượt là 0, 1, 2).

----------

# Câu A3 — Array Methods:

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const soChans = nums.filter(n => n % 2 === 0);
// → [2, 4, 6, 8, 10]

// 2. Nhân mỗi số với 3
const nhanBa = nums.map(n => n * 3);
// → [3, 6, 9, 12, 15, 18, 21, 24, 27, 30]

// 3. Tính tổng tất cả
const tongCong = nums.reduce((sum, n) => sum + n, 0);
// → 55

// 4. Tìm số đầu tiên > 7
const timDuoc = nums.find(n => n > 7);
// → 8

// 5. Kiểm tra CÓ số > 10 không
const coSoLon = nums.some(n => n > 10);
// → false

// 6. Kiểm tra TẤT CẢ đều > 0
const tatCaDuongKhong = nums.every(n => n > 0);
// → true

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const danhSachChanLe = nums.map(n => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
// → ["Số 1 là lẻ", "Số 2 là chẵn", ...]

// 8. Đảo ngược mảng (không mutate gốc)
const daoNguoc = [...nums].reverse();
// → [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
```
----------

# Câu A4 — Object Destructuring & Spread:

## 1. Dự đoán Output

**Destructuring:**
- `console.log(name, price, ram, color);` -> `"iPhone 16" 25990000 8 "Titan"`
- `console.log(specs);` -> **Lỗi `ReferenceError: specs is not defined`** *(Vì cú pháp `specs: { ram, color }` chỉ trích xuất `ram` và `color`, không tạo ra biến `specs`).*

**Spread:**
- `console.log(updated.price);` -> `23990000` *(Bị ghi đè bởi giá trị mới)*
- `console.log(updated.sale);`  -> `true` *(Thuộc tính mới được thêm vào)*
- `console.log(product.price);` -> `25990000` *(Object gốc không bị ảnh hưởng)*

**Spread gotcha:**
- `console.log(product.specs.ram);` -> `16`

## 2. Giải thích "Spread gotcha" 
- Toán tử Spread (`...`) chỉ thực hiện **Shallow Copy (Copy cạn)**.
- Nghĩa là nó chỉ copy giá trị của các thuộc tính ở cấp độ thứ nhất. Đối với các thuộc tính lồng nhau (nested object) như `specs`, nó chỉ copy **địa chỉ tham chiếu (vùng nhớ)**.
- Do đó, `copy.specs` và `product.specs` vẫn đang trỏ về chung một object trong bộ nhớ. Khi sửa `copy.specs.ram = 16`, thì `product.specs.ram` cũng thay đổi theo.

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

# Câu C1 — Refactor Codet:
Code sau khi refactor (dưới 10 dòng):

```javascript
function processOrders(orders) {
    return orders
        .filter(order => order.status === "completed" && order.total > 100000)
        .map(({ id, customer, total }) => ({
            id,
            customer,
            total,
            discount: total * 0.1,
            finalTotal: total - total * 0.1
        }))
        .sort((a, b) => b.finalTotal - a.finalTotal);
}
```

So sánh trước và sau:

| Trước | Sau |
|---|---|
| Dùng `var` (không tốt) | Dùng `const/let` + arrow function |
| 2 vòng `for` lồng nhau để sort | Dùng `.sort()` 1 dòng |
| Tạo object thủ công từng trường | Dùng destructuring + shorthand |
| ~25 dòng | ~9 dòng |
| Khó đọc | Đọc như tiếng Anh tự nhiên |

----------

# Câu C2 — Thiết kế API:

```javascript
const miniArray = {
    // map: chạy qua từng phần tử, áp dụng fn, thêm vào mảng mới
    map(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },

    // filter: chạy qua từng phần tử, nếu fn trả true thì giữ lại
    filter(arr, fn) {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },

    // reduce: gom tất cả lại thành 1 giá trị
    reduce(arr, fn, initialValue) {
        let acc = initialValue;
        for (let i = 0; i < arr.length; i++) {
            acc = fn(acc, arr[i], i, arr);
        }
        return acc;
    }
};

// Test:
console.log(miniArray.map([1,2,3], x => x * 2));           // → [2, 4, 6]
console.log(miniArray.filter([1,2,3,4], x => x > 2));       // → [3, 4]
console.log(miniArray.reduce([1,2,3,4], (a, b) => a + b, 0)); // → 10
```