const galleryGrid = document.querySelector('#galleryGrid');
const loadingIndicator = document.querySelector('#loading');
const loadTrigger = document.querySelector('#load-trigger');
const lightbox = document.querySelector('#lightbox');
const lightboxImg = document.querySelector('#lightbox-img');
const closeBtn = document.querySelector('.close-btn');

let currentPage = 1;
let isFetching = false;

// 1. Hàm Load More Photos
async function loadMorePhotos() {
    if (isFetching) return; // Tránh gọi API liên tục khi đang tải
    isFetching = true;
    loadingIndicator.classList.add('active');

    try {
        // Gọi API chuẩn, KHÔNG có chữ "-loi"
        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=20`);
        const photos = await response.json();
        
        renderPhotos(photos);
        currentPage++; 
    } catch (error) {
        console.error("Lỗi kết nối:", error);
    } finally {
        isFetching = false;
        // Trả lại lệnh tắt loading sau khi tải xong
        loadingIndicator.classList.remove('active'); 
    }
}

// 2. Render HTML và gán Observer cho ảnh (Lazy Loading)
function renderPhotos(photos) {
    photos.forEach(photo => {
        const div = document.createElement('div');
        div.className = 'img-item';
        
        const img = document.createElement('img');
        // Tạo URL ảnh thumb (nhẹ hơn) và ảnh gốc (full size)
        const thumbUrl = `https://picsum.photos/id/${photo.id}/400/300`;
        const fullUrl = `https://picsum.photos/id/${photo.id}/1200/900`;
        
        // Gán data-src thay vì src để trình duyệt KHÔNG tải ảnh ngay lập tức
        img.dataset.src = thumbUrl;
        img.dataset.fullSrc = fullUrl;
        img.alt = `Photo by ${photo.author}`;

        div.appendChild(img);
        galleryGrid.appendChild(div);

        // Gắn imageObserver để lazy load tấm ảnh này
        imageObserver.observe(img);
    });
}

// 3. Image Lazy Loading Observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // Khi ảnh xuất hiện trong viewport
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Đưa data-src vào src thực tế
            
            // Lắng nghe khi ảnh tải xong để thêm hiệu ứng mượt mà
            img.onload = () => {
                img.classList.add('loaded');
            };
            
            // Đã load xong thì ngừng theo dõi tấm ảnh này
            observer.unobserve(img);
        }
    });
}, { 
    rootMargin: '100px 0px', // Bắt đầu load trước khi ảnh xuất hiện trên màn hình 100px 
    threshold: 0.1 
});

// 4. Infinite Scroll Observer (Yêu cầu kỹ thuật)
const scrollObserver = new IntersectionObserver((entries) => {
    // Nếu thẻ trigger (mỏ neo) lọt vào viewport và không phải đang fetch
    if (entries[0].isIntersecting && !isFetching) {
        loadMorePhotos();
    }
}, {
    rootMargin: '200px' // Load sớm trước khi user chạm hẳn vào đáy trang
});

scrollObserver.observe(loadTrigger);

// 5. Lightbox Event Listeners
galleryGrid.addEventListener('click', (e) => {
    // Nếu phần tử click vào là ảnh
    if (e.target.tagName === 'IMG') {
        const fullSrc = e.target.dataset.fullSrc;
        lightboxImg.src = fullSrc;
        lightbox.classList.remove('hidden');
    }
});

// Đóng lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = ''; // Clear bộ nhớ đệm hình ảnh
});

lightbox.addEventListener('click', (e) => {
    // Click ra ngoài background để đóng
    if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightboxImg.src = ''; 
    }
});