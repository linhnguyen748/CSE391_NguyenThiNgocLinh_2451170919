function pipe(...fns) {
    // Trả về một hàm nhận vào giá trị ban đầu (x)
    // Dùng reduce để truyền kết quả của hàm trước vào hàm sau
    return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const process = pipe(
    x => x * 2,        // 5 -> 10
    x => x + 10,       // 10 -> 20
    x => x.toString(), // 20 -> "20"
    x => "Kết quả: " + x
);
console.log("=== THỬ NGHIỆM PIPE ===");
console.log(process(5)); // -> "Kết quả: 20"


// ==========================================
// 2. memoize() — Cache kết quả
// ==========================================
function memoize(fn) {
    const cache = {}; // Object dùng để lưu kết quả
    return function (...args) {
        // Chuyển mảng tham số thành chuỗi để làm key
        const key = JSON.stringify(args); 
        if (cache[key] !== undefined) {
            return cache[key]; // Trả về kết quả từ cache nếu đã tính
        }
        const result = fn(...args); // Tính toán nếu chưa có
        cache[key] = result;        // Lưu vào cache
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});

console.log("\n=== THỬ NGHIỆM MEMOIZE ===");
console.log(expensiveCalc(1000000)); // Lần 1: In "Đang tính..." -> 499999500000
console.log(expensiveCalc(1000000)); // Lần 2: Lấy thẳng từ cache (không in "Đang tính...")


// ==========================================
// 3. debounce() — Chờ user ngừng gõ mới thực hiện
// ==========================================
function debounce(fn, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId); // Hủy bỏ bộ hẹn giờ cũ nếu user gọi lại hàm
        timeoutId = setTimeout(() => {
            fn(...args); // Thiết lập bộ hẹn giờ mới
        }, delay);
    };
}

console.log("\n=== THỬ NGHIỆM DEBOUNCE ===");
const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Gọi liên tục 3 lần, nhưng chỉ lần gọi cuối cùng được chạy sau 500ms
search("a");
search("ap");
search("apple"); 


// ==========================================
// 4. retry() — Thử lại nếu lỗi (Async function)
// ==========================================
async function retry(fn, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn(); // Thử chạy hàm
        } catch (error) {
            console.log(`Lần thử ${attempt} thất bại...`);
            if (attempt === maxAttempts) {
                throw new Error(`Đã thử ${maxAttempts} lần nhưng vẫn lỗi: ${error.message}`);
            }
        }
    }
}

console.log("\n=== THỬ NGHIỆM RETRY ===");
// Hàm giả lập gọi API thỉnh thoảng bị lỗi
let attemptCount = 0;
const mockFetch = async () => {
    attemptCount++;
    if (attemptCount < 3) {
        throw new Error("Lỗi mạng giả lập");
    }
    return "Lấy dữ liệu thành công!";
};

// Chạy thử hàm retry
retry(mockFetch, 3)
    .then(result => console.log("Kết quả:", result))
    .catch(err => console.error(err.message));