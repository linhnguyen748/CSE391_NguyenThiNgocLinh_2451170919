// Các DOM elements
const refreshBtn = document.getElementById('refreshBtn');
const loadTimeDisplay = document.getElementById('loadTime');
const globalLoading = document.getElementById('globalLoading');

// Hàm hỗ trợ fetch dữ liệu, ép ném lỗi nếu HTTP response không phải 2XX (để test Promise.allSettled)
const fetchWithCheck = (url) => {
    return fetch(url).then(r => {
        if (!r.ok) throw new Error(`Lỗi HTTP ${r.status}`);
        return r.json();
    });
};

// Hàm bắt buộc theo yêu cầu bài toán
async function loadDashboard() {
    const startTime = Date.now();
    
    // Hiện Loading tổng thể
    globalLoading.classList.remove('hidden');
    
    // ĐÃ XÓA DÒNG `return;` Ở ĐÂY

    // Gọi song song 3 API dùng Promise.allSettled
    const results = await Promise.allSettled([
        fetchWithCheck("https://randomuser.me/api/?results=3"), 
        
        // ĐÃ SỬA LẠI LINK CHUẨN (BỎ CHỮ "-loi")
        fetchWithCheck("https://dog.ceo/api/breeds/image/random/2"), 
        
        fetchWithCheck("https://jsonplaceholder.typicode.com/posts?_limit=3") 
    ]);
    
    // Xử lý hiển thị từng Widget dựa trên trạng thái của Promise
    results.forEach((result, index) => {
        if (result.status === "fulfilled") {
            renderWidget(index, result.value);
        } else {
            renderWidgetError(index, result.reason.message);
        }
    });
    
    // Ẩn loading và hiện thời gian fetch
    globalLoading.classList.add('hidden');
    const fetchTime = Date.now() - startTime;
    loadTimeDisplay.innerText = `Data loaded in ${fetchTime} ms`;
    console.log(`Loaded in ${fetchTime}ms`);
}

// Render nội dung thành công
function renderWidget(index, data) {
    const widgetBody = document.getElementById(`widget-${index}`);
    widgetBody.innerHTML = ''; 
    
    if (index === 0) {
        // Render Users
        data.results.forEach(user => {
            widgetBody.innerHTML += `
                <div class="user-item">
                    <img src="${user.picture.thumbnail}" alt="User">
                    <div>
                        <strong>${user.name.first} ${user.name.last}</strong>
                        <div style="font-size: 0.8rem; color: #666;">${user.email}</div>
                    </div>
                </div>
            `;
        });
    } else if (index === 1) {
        // Render Dogs
        data.message.forEach(imgUrl => {
            widgetBody.innerHTML += `<img src="${imgUrl}" class="dog-image" alt="Dog">`;
        });
    } else if (index === 2) {
        // Render Posts
        data.forEach(post => {
            widgetBody.innerHTML += `
                <div class="post-item">
                    <h4>${post.title}</h4>
                    <p>${post.body.substring(0, 60)}...</p>
                </div>
            `;
        });
    }
}

// Render thông báo lỗi riêng cho Widget bị fail
function renderWidgetError(index, errorMessage) {
    const widgetBody = document.getElementById(`widget-${index}`);
    widgetBody.innerHTML = `
        <div class="error-message">
            <strong>Lỗi tải dữ liệu API:</strong><br>
            ${errorMessage}
        </div>
    `;
}

// Gắn sự kiện
refreshBtn.addEventListener('click', loadDashboard);

// Tự động load lần đầu khi mở trang
window.addEventListener('DOMContentLoaded', loadDashboard);