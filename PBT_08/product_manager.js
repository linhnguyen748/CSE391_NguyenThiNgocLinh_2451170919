const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];

// Hàm 1: Lọc sản phẩm còn hàng (stock > 0)
function getInStock(products) {
    // dùng filter, chỉ giữ lại sp có stock > 0
    const result = products.filter(p => p.stock > 0);
    return result;
}

// Hàm 2: Lọc theo category VÀ khoảng giá
function filterProducts(products, category, minPrice, maxPrice) {
    // lọc theo category trước, rồi theo giá
    const result = products.filter(p => {
        const dung_loai = p.category === category;
        const trong_khoang_gia = p.price >= minPrice && p.price <= maxPrice;
        return dung_loai && trong_khoang_gia;
    });
    return result;
}

// Hàm 3: Sắp xếp theo giá (tăng hoặc giảm)
function sortByPrice(products, order = "asc") {
    // dùng spread để không làm thay đổi mảng gốc
    const copy = [...products];
    if (order === "asc") {
        // tăng dần: a - b
        copy.sort((a, b) => a.price - b.price);
    } else {
        // giảm dần: b - a
        copy.sort((a, b) => b.price - a.price);
    }
    return copy;
}

// Hàm 4: Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) {
    // dùng reduce để gom từng category lại
    const result = products.reduce((acc, p) => {
        // nếu chưa có category này hoặc sp hiện tại rẻ hơn → cập nhật
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p;
        }
        return acc;
    }, {});
    return result;
}

// Hàm 5: Tính tổng giá trị kho (price × stock)
function totalInventoryValue(products) {
    const total = products.reduce((sum, p) => {
        // tổng = tổng cũ + giá * số lượng
        return sum + p.price * p.stock;
    }, 0);
    return total;
}

// Hàm 6: Tạo mảng { name, formattedPrice }
function formatProductList(products) {
    const result = products.map(p => {
        return {
            name: p.name,
            formattedPrice: p.price.toLocaleString("vi-VN") + "đ"
        };
    });
    return result;
}

// Hàm 7: Tính rating trung bình
function averageRating(products) {
    // cộng hết rating lại chia cho số lượng
    const tongRating = products.reduce((sum, p) => sum + p.rating, 0);
    const trungBinh = tongRating / products.length;
    // làm tròn 2 chữ số thập phân cho đẹp
    return Math.round(trungBinh * 100) / 100;
}

// Hàm 8: Tìm sản phẩm theo keyword
function searchProducts(products, keyword) {
    // chuyển cả 2 về lowercase để so sánh không phân biệt chữ hoa thường
    const tukhoa = keyword.toLowerCase();
    const result = products.filter(p => p.name.toLowerCase().includes(tukhoa));
    return result;
}

// TEST
console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== SẮP XẾP GIÁ TĂNG DẦN ===");
const sortedAsc = sortByPrice(products, "asc");
sortedAsc.forEach(p => console.log(p.name, "-", p.price.toLocaleString("vi-VN") + "đ"));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

console.log("\n=== FORMATTED PRODUCT LIST ===");
console.log(formatProductList(products));

console.log("\n=== AVERAGE RATING ===");
console.log("Rating trung bình:", averageRating(products));

console.log("\n=== TÌM KIẾM 'pro' ===");
console.log(searchProducts(products, "pro"));