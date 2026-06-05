### 📋 PHIẾU BÀI TẬP 09
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 — DOM Tree:
* 1. DOM tree
```
div#app
 ├── header
 │    ├── h1
 │    └── nav
 │         ├── a.active
 │         ├── a
 │         └── a
 └── main
      ├── form#todoForm
      │    ├── input#todoInput
      │    └── button
      └── ul#todoList
           ├── li.todo-item
           └── li.todo-item.completed
```
* 2. querySelector

```javascript
document.querySelector('h1');                   // Chọn thẻ <h1>
document.querySelector('#todoInput');           // Chọn input trong form
document.querySelectorAll('.todo-item');        // Chọn tất cả .todo-item
document.querySelector('a.active');             // Chọn link đang active
document.querySelector('#todoList li');         // Chọn <li> đầu tiên trong #todoList
document.querySelectorAll('nav a');             // Chọn tất cả <a> bên trong <nav>
```

------------

# Câu A2 — innerHTML vs textContent:

* 1. innerHTML vs textContent:

textContent: Xử lý nội dung dưới dạng văn bản thuần túy (plain text). Mọi thẻ HTML đều bị xem là chuỗi ký tự.

Khi nào dùng: Dùng khi hiển thị văn bản, đặc biệt là dữ liệu do người dùng nhập vào để đảm bảo an toàn.

innerHTML: Xử lý nội dung dưới dạng mã HTML. Trình duyệt sẽ phân tích (parse) và render thành các phần tử DOM.

Khi nào dùng: Dùng khi cần tạo cấu trúc HTML (thêm thẻ <b>, <img>...) từ một nguồn dữ liệu đáng tin cậy.

* 2. Tại sao innerHTML gây XSS?
Bởi vì innerHTML bắt buộc trình duyệt phải phân tích cú pháp HTML. Nếu kẻ tấn công nhập đoạn script độc hại (ví dụ thẻ <img> có thuộc tính onerror), trình duyệt sẽ hiểu đó là mã HTML hợp lệ và lập tức thực thi đoạn mã JavaScript bên trong thuộc tính đó.

* 3. Cách sửa mã:

```javascript
const userInput = document.querySelector("#search").value;

// SỬA: Thay innerHTML bằng textContent
document.querySelector("#result").textContent = userInput;
```
----------

# Câu A3 — Event Bubbling:

 * Khi click vào button:

Output:
```
BUTTON
INNER
OUTER
```

**Giải thích:** Event bubbling - sự kiện nổi bọt từ trong ra ngoài (button → inner → outer)

Nếu uncomment stopPropagation():

Output:
```
BUTTON
```

Giải thích: `stopPropagation()` ngăn event lan truyền lên parent, nên chỉ có BUTTON được log.

----------

## PHẦN C - DEBUG & PHÂN TÍCH:

# Câu C1 — Debug DOM Code:
1. Lỗi 1: `addEventListener("onclick"` → sai syntax
```javascript
// SAI
document.querySelector("#decrementBtn").addEventListener("onclick", function() {

// ĐÚNG
document.querySelector("#decrementBtn").addEventListener("click", function() {
```

2. Lỗi 2: `countDisplay = count` → thiếu property
```javascript
// SAI
countDisplay = count;

// ĐÚNG
countDisplay.textContent = count;
```

3. Lỗi 3: `innerHTML = null` → nên dùng ""
```javascript
// SAI
historyList.innerHTML = null;

// ĐÚNG
historyList.innerHTML = "";
```

4. Lỗi 4: `item.remove` → thiếu ()
```javascript
// SAI
item.remove;

// ĐÚNG
item.remove();
```

5. Lỗi 5: localStorage trả về string, cần parse
```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
count = parseInt(localStorage.getItem("count")) || 0;
```

6. Lỗi 6: Decrement không thêm history
```javascript
// THIẾU - cần thêm code lưu history giống increment
```

7. Lỗi 7: Không kiểm tra null khi load
```javascript
// SAI
count = localStorage.getItem("count");

// ĐÚNG
const savedCount = localStorage.getItem("count");
if (savedCount !== null) {
    count = parseInt(savedCount);
}
```
----------

# Câu C2 — Performance:
** 1. 
- *Tại sao bind 1000 events riêng lẻ là Bad Practice?* Tốn rất nhiều bộ nhớ trình duyệt vì phải tạo 1000 hàm (functions) khác nhau. Làm chậm trang web và không hoạt động với các phần tử được tạo thêm sau này (dynamic elements).

- *Event Delegation giải quyết thế nào?* Chỉ gắn một sự kiện duy nhất lên phần tử cha chứa chúng. Lợi dụng cơ chế Event Bubbling (sự kiện nổi bọt), khi con bị click, sự kiện sẽ lan lên cha. Ta dùng e.target để kiểm tra chính xác phần tử con nào được click.

** 2. Refactor dùng DocumentFragment:

```javascript
// Tạo fragment
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);  // Thêm vào fragment (trong memory)
}

document.body.appendChild(fragment);  // Chỉ 1 lần append vào DOM
```

Tại sao nhanh hơn:
- Tồn tại trong RAM: Là DOM node ảo, hoàn toàn tách biệt với cây DOM thực.

- Không gây Reflow/Repaint: Mọi thao tác thêm/sửa phần tử trên nó đều diễn ra ngầm, không bắt trình duyệt phải tính toán lại bố cục hay vẽ lại màn hình.

- Tối ưu hiệu năng: Quá trình reflow (rất tốn tài nguyên) chỉ xảy ra đúng 1 lần duy nhất khi ta gắn toàn bộ fragment vào DOM thực ở bước cuối cùng.