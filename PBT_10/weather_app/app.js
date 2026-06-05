// Các DOM Elements
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const historyList = document.getElementById('historyList');

// Các DOM Elements cho 3 States
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const successState = document.getElementById('successState');

// Biến hằng số và LocalStorage
const LOCAL_STORAGE_KEY = 'weather_history';
let searchHistory = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

// 1. Quản lý hiển thị 3 States
function setUIState(state, errorMessage = '') {
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    successState.classList.add('hidden');

    if (state === 'LOADING') {
        loadingState.classList.remove('hidden');
    } else if (state === 'ERROR') {
        errorState.classList.remove('hidden');
        document.getElementById('errorMessage').innerText = errorMessage;
    } else if (state === 'SUCCESS') {
        successState.classList.remove('hidden');
    }
}

// 2. Map icon thời tiết dựa trên mô tả của wttr.in
function getWeatherIcon(desc) {
    const d = desc.toLowerCase();
    if (d.includes('rain') || d.includes('shower')) return '🌧️';
    if (d.includes('cloud') || d.includes('overcast')) return '☁️';
    if (d.includes('sun') || d.includes('clear')) return '☀️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('thunder')) return '⛈️';
    return '⛅';
}

// 3. Hàm fetch API chính
async function fetchWeather(city) {
    if (!city.trim()) return;

    // Chuyển sang state LOADING
    setUIState('LOADING');

    try {
        // Gọi API wttr.in và Parse JSON
        const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
        
        if (!response.ok) {
            throw new Error('Thành phố không tồn tại hoặc lỗi máy chủ.');
        }

        const data = await response.json();
        const current = data.current_condition[0];

        // Đổ dữ liệu vào UI Success
        document.getElementById('cityName').innerText = city;
        document.getElementById('temperature').innerText = `${current.temp_C}°C`;
        document.getElementById('humidity').innerText = current.humidity;
        
        const weatherDesc = current.weatherDesc[0].value;
        document.getElementById('description').innerText = weatherDesc;
        document.getElementById('weatherIcon').innerText = getWeatherIcon(weatherDesc);

        // Chuyển sang state SUCCESS
        setUIState('SUCCESS');

        // Lưu lịch sử
        saveToHistory(city);
    } catch (error) {
        // Chuyển sang state ERROR nếu mất mạng hoặc lỗi API
        setUIState('ERROR', error.message || 'Mất kết nối mạng, vui lòng thử lại!');
    }
}

// 4. Xử lý LocalStorage (Tối đa 5 thành phố)
function saveToHistory(city) {
    // Chuẩn hóa tên thành phố để tránh trùng lặp hoa/thường
    const cleanCity = city.trim();
    
    // Xóa thành phố đã tồn tại để đưa lên đầu danh sách
    searchHistory = searchHistory.filter(c => c.toLowerCase() !== cleanCity.toLowerCase());
    
    // Thêm vào đầu mảng
    searchHistory.unshift(cleanCity);
    
    // Giữ lại đúng 5 phần tử
    if (searchHistory.length > 5) {
        searchHistory.pop(); 
    }

    // Cập nhật LocalStorage và Render lại UI
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(searchHistory));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = '';
    searchHistory.forEach(city => {
        const li = document.createElement('li');
        li.innerText = city;
        // Bấm vào lịch sử -> Tìm lại
        li.addEventListener('click', () => {
            cityInput.value = city;
            fetchWeather(city);
        });
        historyList.appendChild(li);
    });
}

// 5. Khởi tạo sự kiện
searchBtn.addEventListener('click', () => fetchWeather(cityInput.value));

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchWeather(cityInput.value);
});

// Chạy lần đầu khi load trang
renderHistory();