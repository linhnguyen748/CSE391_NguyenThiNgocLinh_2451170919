### 📋 PHIẾU BÀI TẬP 10
## 📋 PHẦN A - KIỂM TRA ĐỌC HIỂU

# Câu A1 — Sync vs Async:
  
1. Thứ tự output:
```
1 - Start
4 - End
3 - Promise
6 - Promise 2
2 - Timeout 0ms
7 - Nested timeout
5 - Timeout 100ms
```
- Giải thích Event Loop:

1. Call Stack (Ngăn xếp): Nơi thực thi code đồng bộ (sync)
2. Microtask Queue (Hàng đợi vi nhiệm vụ): 
   - Chứa các callback của Promise (.then, .catch, .finally)
   - Được ưu tiên thực thi TRƯỚC Macrotask
3. Macrotask Queue (Hàng đợi nhiệm vụ):
   - Chứa callback của setTimeout, setInterval, I/O
   - Chỉ được thực thi SAU KHI Microtask Queue rỗng

Quá trình thực thi:

| Bước | Code thực thi | Call Stack | Microtask Queue | Macrotask Queue |
|------|---------------|------------|-----------------|-----------------|
| 1 | `console.log("1 - Start")` | In "1 - Start" | - | - |
| 2 | `setTimeout(..., 0)` | - | - | [callback "2"] |
| 3 | `Promise.resolve().then()` | - | [callback "3"] | [callback "2"] |
| 4 | `console.log("4 - End")` | In "4 - End" | [callback "3"] | [callback "2"] |
| 5 | `setTimeout(..., 100)` | - | [callback "3"] | [callback "2", callback "5"] |
| 6 | `Promise.resolve().then()` | - | [callback "3", callback "6"] | [callback "2", callback "5"] |
| 7 | Microtask "3" | In "3 - Promise" | [callback "6"] | [callback "2", callback "5"] |
| 8 | Microtask "6" | In "6 - Promise 2" | - | [callback "2", callback "5", callback "7"] |
| 9 | Macrotask "2" | In "2 - Timeout 0ms" | - | [callback "5", callback "7"] |
| 10 | Macrotask "7" | In "7 - Nested timeout" | - | [callback "5"] |
| 11 | Macrotask "5" (sau 100ms) | In "5 - Timeout 100ms" | - | - |


------------

# Câu A2 — Fetch API:

**1. `await fetch(...)`**
- *Trả về gì?* Trả về một `Promise` chứa đối tượng `Response`.
- **Tại sao cần `await`?** Để tạm dừng thực thi nhánh hiện tại, chờ lấy kết quả từ mạng về mà không làm đơ giao diện (non-blocking).

**2. `response.ok`**
- *Khi nào `false`?* Khi HTTP status code nằm ngoài khoảng `200 - 299`.
- **3 status codes tương ứng:** `404` (Not Found), `403` (Forbidden), `500` (Internal Server Error).

**3. `response.json()`**
- *Tại sao cần `await` lần nữa?* Vì hàm này cũng trả về `Promise`. Việc đọc luồng dữ liệu (stream) và phân tích (parse) thành JSON cần thời gian, do đó bắt buộc phải chờ.

**4. `try...catch` bắt những lỗi gì?**
- *Network error:* Lỗi mạng, đứt kết nối, sai domain (khiến fetch thất bại ngay lập tức).
- **Lỗi HTTP (404, 500...):** Được bắt do trong code ta chủ động ném lỗi bằng `throw new Error(...)`.
- **JSON parse error:** Bắt lỗi khi server trả về dữ liệu không đúng chuẩn JSON (VD: trả về HTML) khiến `response.json()` thất bại.

----------

# Câu A3 — Promise States:

 
- Sơ đồ 3 trạng thái Promise:

```
+-------------------------+
                             |        PENDING          |
                             |  (Khởi tạo, đang chờ)   |
                             +------------+------------+
                                          |
                      +-------------------+-------------------+
                      |                                       |
    (Thao tác thành công) gọi resolve(value)       (Thao tác thất bại) gọi reject(error)
                      |                                       |
                      v                                       v
          +-------------------------+             +-------------------------+
          |       FULFILLED         |             |        REJECTED         |
          | (Thành công, trả về data|             | (Thất bại, trả về lỗi)  |
          +-------------------------+             +-------------------------+

```
Callback Hell là gì?
- Callback Hell là một thuật ngữ trong JavaScript chỉ tình trạng các hàm callback bị lồng vào nhau quá nhiều cấp độ khi xử lý nhiều tác vụ bất đồng bộ liên tiếp.

Ví dụ Callback Hell 4 cấp:

```javascript
// Hàm mô phỏng Callback Hell 4 cấp
function getProductInfoFromUser(userId) {
    // Cấp 1: Lấy thông tin user
    getUser(userId, function(userError, user) {
        if (userError) return console.error("Lỗi lấy User:", userError);
        
        // Cấp 2: Lấy danh sách đơn hàng của user đó
        getOrders(user.id, function(orderError, orders) {
            if (orderError) return console.error("Lỗi lấy Đơn hàng:", orderError);
            
            // Cấp 3: Lấy chi tiết đơn hàng đầu tiên
            getOrderDetails(orders[0].id, function(detailError, orderDetail) {
                if (detailError) return console.error("Lỗi lấy Chi tiết:", detailError);
                
                // Cấp 4: Lấy thông tin sản phẩm từ chi tiết đơn hàng
                getProductInfo(orderDetail.productId, function(productError, product) {
                    if (productError) return console.error("Lỗi lấy Sản phẩm:", productError);
                    
                    console.log("Thông tin sản phẩm cuối cùng là:", product.name);
                });
            });
        });
    });
}
```
- Refactor thành async/await:

```javascript
// Các hàm bất đồng bộ giờ đây giả định sẽ trả về Promise
async function getProductInfoFromUserAsync(userId) {
    try {
        // Luồng code phẳng (flat), chạy tuần tự từ trên xuống
        const user = await getUserAsync(userId);
        const orders = await getOrdersAsync(user.id);
        const orderDetail = await getOrderDetailsAsync(orders[0].id);
        const product = await getProductInfoAsync(orderDetail.productId);
        
        console.log("Thông tin sản phẩm cuối cùng là:", product.name);
        
    } catch (error) {
        // Quản lý lỗi tập trung: Mọi lỗi từ bất kỳ bước await nào 
        // cũng sẽ rơi thẳng vào khối catch này.
        console.error("Đã xảy ra lỗi trong quá trình xử lý:", error);
    }
}
```

----------

## PHẦN C - PHÂN TÍCH:

# Câu C1 — Error Handling Strategy:
1. Network errors:

```javascript
async function fetchWithNetworkHandling(url) {
  try {
    return await fetch(url);
  } catch (error) {
    // Khi mất mạng, fetch tự động ném ra TypeError
    console.error("Lỗi mạng: Vui lòng kiểm tra lại kết nối.");
    throw error;
  }
}
```

***Giải thích***: Bắt lỗi TypeError trong catch để thông báo cho user (Toast/Alert), chặn các tác vụ tiếp theo hoặc lưu LocalStorage để đồng bộ sau (Offline Sync).

2. API Errors:

```javascript
async function fetchWithApiHandling(url) {
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) throw new Error("404: Không tìm thấy (Dừng lại)");
    if (res.status === 500) throw new Error("500: Lỗi Server (Cần Retry)");
    if (res.status === 429) throw new Error("429: Spam API (Đợi rồi Retry)");
  }
  return res;
}
```

***Giải thích***: fetch không tự quăng lỗi với mã HTTP, phải check res.ok.

404: Dừng lại, báo lỗi UI. Không retry.

500: Báo server bận. Cần retry.

429: Bị giới hạn rate limit. Cần retry kèm theo thời gian chờ (delay/backoff).

3. Timeout (API chậm > 10 giây):

```javascript
async function fetchWithTimeout(url, ms = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId); // Xóa bộ đếm nếu chạy xong sớm
    return res;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error(`Timeout sau ${ms}ms`);
    throw error;
  }
}
```
***Giải thích***: Dùng AbortController kết hợp setTimeout. Nếu sau 10s server chưa trả về, controller.abort() sẽ chủ động ngắt request để tránh treo giao diện.

4. Retry Logic (Thử lại 3 lần):

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  try {
    const res = await fetch(url); // Thực tế sẽ dùng fetchWithTimeout ở đây
    
    // Ném lỗi để bắt vào catch nếu là 500 hoặc 429
    if (!res.ok) {
      if (res.status >= 500 || res.status === 429) throw new Error("ServerIssue");
      throw new Error("ClientError"); // Các lỗi 4xx khác thì dừng
    }
    return res;

  } catch (error) {
    // Chỉ retry nếu còn lượt và KHÔNG phải lỗi ClientError (404, 400...)
    if (maxRetries > 0 && error.message !== "ClientError") {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Delay 1 giây
      return fetchWithRetry(url, maxRetries - 1); // Đệ quy thử lại
    }
    throw new Error("Thất bại hoàn toàn.");
  }
}
```
***Giải thích***: Dùng đệ quy. Bắt lỗi (mất mạng hoặc lỗi 500/429 từ block try). Nếu maxRetries > 0, hàm sẽ tạm dừng 1s (setTimeout) rồi tự gọi lại chính nó, đồng thời trừ đi 1 lượt thử.

----------

# Câu C2 — Promise.all vs Promise.allSettled vs Promise.race:

| Method | Khi nào resolve? | Khi nào reject? | Use case |
|--------|------------------|-----------------|----------|
| `Promise.all()` | Khi TẤT CẢ promises fulfill | Khi BẤT KỲ promise reject | Load nhiều dữ liệu cần ĐỦ (trang sản phẩm cần cả info + giá + ảnh) |
| `Promise.allSettled()` | Luôn resolve (sau khi tất cả xong) | KHÔNG BAO GIỜ reject | Dashboard hiện nhiều widget - 1 widget lỗi không ảnh hưởng widget khác |
| `Promise.race()` | Khi promise ĐẦU TIÊN settle (fulfill hoặc reject) | Khi promise đầu tiên reject | Implement timeout, đua giữa fetch và timer |
| `Promise.any()` | Khi BẤT KỲ promise fulfill | Khi TẤT CẢ promises reject | Load từ nhiều server, lấy server nhanh nhất |

- Ví dụ Code thực tế cho từng Method:

1. Promise.all()

```javascript
async function loadDashboard(userId) {
    try {
        const [userData, settingsData] = await Promise.all([
            fetch(`/api/users/${userId}`).then(r => r.json()),
            fetch(`/api/settings/${userId}`).then(r => r.json())
        ]);
        renderDashboard(userData, settingsData);
    } catch (error) {
        showErrorPage("Lỗi hệ thống: 1 trong các API quan trọng đã sập.");
    }
}
```

2. Promise.allSettled()

```javascript
async function crossPost(postData) {
    const results = await Promise.allSettled([
        postToFacebook(postData),
        postToTwitter(postData),
        postToLinkedIn(postData)
    ]);

    results.forEach((res, index) => {
        if (res.status === "rejected") {
            console.error(`Nền tảng thứ ${index + 1} bị lỗi:`, res.reason);
        }
    });
}
```

3. Promise.race()

```javascript
async function fetchWithTimeout(url) {
    const fetchPromise = fetch(url).then(r => r.json());
    
    // Tạo 1 promise tự động reject sau 5 giây
    const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Request Timeout")), 5000)
    );

    try {
        // Ai xong trước người đó thắng
        const data = await Promise.race([fetchPromise, timeoutPromise]);
        console.log("Dữ liệu tải thành công:", data);
    } catch (error) {
        console.error("Lỗi:", error.message); // In ra "Request Timeout" nếu quá 5s
    }
}

```
4. Promise.any()
```javascript
async function loadHeroImage() {
    try {
        const imageResponse = await Promise.any([
            fetch('[https://cdn1.example.com/hero.jpg](https://cdn1.example.com/hero.jpg)'),
            fetch('[https://cdn2.example.com/hero.jpg](https://cdn2.example.com/hero.jpg)'),
            fetch('[https://cdn3.example.com/hero.jpg](https://cdn3.example.com/hero.jpg)')
        ]);
        
        displayImage(await imageResponse.blob());
    } catch (error) {
        // Rơi vào đây khi CẢ 3 server CDN đều sập (AggregateError)
        console.error("Không thể tải ảnh từ bất kỳ nguồn nào.", error.errors);
    }
}

```