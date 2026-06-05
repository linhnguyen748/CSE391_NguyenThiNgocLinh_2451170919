// 1. DATA KHỞI TẠO
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 28990000, category: "phone", image: "https://placehold.co/200?text=iPhone+16", rating: 4.8, inStock: true },
    { id: 2, name: "Samsung Galaxy S24", price: 23990000, category: "phone", image: "https://placehold.co/200?text=S24", rating: 4.7, inStock: true },
    { id: 3, name: "MacBook Pro M3", price: 39990000, category: "laptop", image: "https://placehold.co/200?text=MacBook", rating: 4.9, inStock: true },
    { id: 4, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200?text=XPS+15", rating: 4.5, inStock: false },
    { id: 5, name: "iPad Pro M4", price: 26990000, category: "tablet", image: "https://placehold.co/200?text=iPad", rating: 4.8, inStock: true },
    { id: 6, name: "Galaxy Tab S9", price: 19990000, category: "tablet", image: "https://placehold.co/200?text=Tab+S9", rating: 4.6, inStock: true },
    { id: 7, name: "AirPods Pro 2", price: 6200000, category: "accessory", image: "https://placehold.co/200?text=AirPods", rating: 4.7, inStock: true },
    { id: 8, name: "Sony WH-1000XM5", price: 7990000, category: "accessory", image: "https://placehold.co/200?text=Sony+XM5", rating: 4.8, inStock: true },
    { id: 9, name: "Xiaomi 14", price: 18990000, category: "phone", image: "https://placehold.co/200?text=Xiaomi+14", rating: 4.4, inStock: true },
    { id: 10, name: "ThinkPad X1", price: 37990000, category: "laptop", image: "https://placehold.co/200?text=ThinkPad", rating: 4.7, inStock: true },
    { id: 11, name: "Apple Watch S9", price: 9990000, category: "accessory", image: "https://placehold.co/200?text=Apple+Watch", rating: 4.6, inStock: true },
    { id: 12, name: "Xiaomi Pad 6", price: 8990000, category: "tablet", image: "https://placehold.co/200?text=Xiaomi+Pad", rating: 4.3, inStock: true }
];

let cartCount = 0;

// 2. TẠO KHUNG GIAO DIỆN CHÍNH (HTML SKELETON BẰNG JS)
document.getElementById('app').innerHTML = `
    <header>
        <h1>TechStore</h1>
        <div class="actions">
            <button id="theme-btn">🌓 Thể giao diện</button>
            <div id="cart">🛒 <span id="cart-badge">0</span></div>
        </div>
    </header>
    <main>
        <div class="controls">
            <input type="text" id="search-input" placeholder="Tìm kiếm sản phẩm...">
            <div id="category-filters"></div>
            <select id="sort-select">
                <option value="default">Sắp xếp mặc định</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
                <option value="name-asc">Tên: A - Z</option>
                <option value="rating-desc">Đánh giá cao nhất</option>
            </select>
        </div>
        <div id="product-list" class="grid"></div>
    </main>
`;

// DOM Elements
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const filterContainer = document.getElementById('category-filters');
const formatVND = price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

// 3. RENDER PRODUCTS BẰNG TẠO ELEMENT (KHÔNG DÙNG INNERHTML CHO ITEM)
function renderProducts(items) {
    productList.replaceChildren(); // Xóa sạch danh sách cũ

    if (items.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Không tìm thấy sản phẩm phù hợp.</p>';
        return;
    }

    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const img = document.createElement('img');
        img.src = product.image;
        
        const name = document.createElement('h3');
        name.textContent = product.name;
        
        const price = document.createElement('p');
        price.className = 'price';
        price.textContent = formatVND(product.price);
        
        const rating = document.createElement('p');
        rating.className = 'rating';
        rating.textContent = `⭐ ${product.rating}`;
        
        card.append(img, name, price, rating);
        card.addEventListener('click', () => openModal(product)); // Click mở modal
        
        productList.appendChild(card);
    });
}

// 4. TẠO NÚT CATEGORY
function renderCategories() {
    const categories = ["all", "phone", "laptop", "tablet", "accessory"];
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${cat === 'all' ? 'active' : ''}`;
        btn.dataset.category = cat;
        btn.textContent = cat === 'all' ? 'Tất cả' : cat.toUpperCase();
        
        btn.addEventListener('click', e => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            applyFiltersAndSort(); // Gọi hàm tổng hợp
        });
        filterContainer.appendChild(btn);
    });
}

// 5. LỌC & TÌM KIẾM & SẮP XẾP (Chung 1 luồng xử lý)
function applyFiltersAndSort() {
    const keyword = searchInput.value.toLowerCase();
    const sortType = sortSelect.value;
    const activeCat = document.querySelector('.filter-btn.active').dataset.category;

    // Filter
    let result = products.filter(p => 
        (activeCat === 'all' || p.category === activeCat) && 
        p.name.toLowerCase().includes(keyword)
    );

    // Sort
    if (sortType === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortType === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortType === 'name-asc') result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === 'rating-desc') result.sort((a, b) => b.rating - a.rating);

    renderProducts(result);
}

// 6. MODAL BẰNG THUẦN JS
function openModal(product) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    
    const content = document.createElement('div');
    content.className = 'modal-content';
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.textContent = '✖';
    closeBtn.onclick = () => overlay.remove();
    
    const img = document.createElement('img');
    img.src = product.image;
    
    const name = document.createElement('h2');
    name.textContent = product.name;
    
    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = formatVND(product.price);
    
    const status = document.createElement('p');
    status.textContent = product.inStock ? '✅ Còn hàng' : '❌ Hết hàng';
    status.style.color = product.inStock ? '#198754' : '#dc3545';
    status.style.fontWeight = 'bold';
    
    const addBtn = document.createElement('button');
    addBtn.className = 'add-cart-btn';
    addBtn.textContent = 'Thêm vào giỏ hàng';
    addBtn.disabled = !product.inStock;
    addBtn.onclick = () => {
        document.getElementById('cart-badge').textContent = ++cartCount;
        overlay.remove(); // Tự đóng modal sau khi thêm
    };
    
    content.append(closeBtn, img, name, price, status, addBtn);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    // Đóng khi click ngoài mờ
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove() });
}

// 7. SỰ KIỆN LẮNG NGHE CHÍNH
searchInput.addEventListener('input', applyFiltersAndSort); // Realtime search
sortSelect.addEventListener('change', applyFiltersAndSort); // Sort changes
document.getElementById('theme-btn').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode'); // Dark Mode
});

// Chạy lần đầu tiên
renderCategories();
renderProducts(products);