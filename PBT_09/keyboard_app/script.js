const DOM = {
    img: document.getElementById('main-img'), indicator: document.getElementById('img-indicator'),
    playBtn: document.getElementById('play-btn'), dialog: document.getElementById('cmd-palette'),
    cmdInput: document.getElementById('cmd-input'), cmdList: document.getElementById('cmd-list')
};

const TOTAL_IMG = 9;
let currentIdx = 1;
let isPlaying = false;
let playInterval = null;
let cmdSelectedIndex = 0;

// Data Command Palette
const commands = [
    { id: 'next', label: 'Gallery: Xem ảnh tiếp theo' },
    { id: 'prev', label: 'Gallery: Xem ảnh trước đó' },
    { id: 'play', label: 'Gallery: Phát/Tạm dừng Slideshow' },
    { id: 'theme', label: 'Hệ thống: Chế độ tối/sáng' }
];

// --- GALLERY LOGIC ---
const updateImg = (idx) => {
    if (idx < 1) idx = TOTAL_IMG;
    if (idx > TOTAL_IMG) idx = 1;
    currentIdx = idx;
    DOM.img.src = `https://placehold.co/600x400/0d6efd/ffffff?text=Image+${idx}`;
    DOM.img.alt = `Ảnh số ${idx} trong bộ sưu tập`;
    DOM.indicator.textContent = `${idx} / ${TOTAL_IMG}`;
};

const togglePlay = () => {
    isPlaying = !isPlaying;
    DOM.playBtn.innerHTML = isPlaying ? '⏸ Pause' : '▶ Play';
    if (isPlaying) playInterval = setInterval(() => updateImg(currentIdx + 1), 2000);
    else clearInterval(playInterval);
};

document.getElementById('prev-btn').onclick = () => updateImg(currentIdx - 1);
document.getElementById('next-btn').onclick = () => updateImg(currentIdx + 1);
DOM.playBtn.onclick = togglePlay;

// --- COMMAND PALETTE LOGIC ---
const executeCmd = (id) => {
    DOM.dialog.close();
    if (id === 'next') updateImg(currentIdx + 1);
    if (id === 'prev') updateImg(currentIdx - 1);
    if (id === 'play') togglePlay();
    if (id === 'theme') document.body.style.filter = document.body.style.filter ? '' : 'invert(1) hue-rotate(180deg)';
};

const renderCmds = (query = '') => {
    const filtered = commands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));
    if (cmdSelectedIndex >= filtered.length) cmdSelectedIndex = 0;
    
    DOM.cmdList.innerHTML = filtered.map((c, i) => 
        `<li role="option" aria-selected="${i === cmdSelectedIndex}" data-id="${c.id}">${c.label}</li>`
    ).join('');
};

DOM.cmdInput.addEventListener('input', e => {
    cmdSelectedIndex = 0;
    renderCmds(e.target.value);
});

DOM.cmdList.addEventListener('click', e => {
    const id = e.target.closest('li')?.dataset.id;
    if (id) executeCmd(id);
});

// --- KEYBOARD NAVIGATION (Sự kiện chính) ---
window.addEventListener('keydown', e => {
    // 1. Mở Command Palette (Ctrl + K)
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        DOM.dialog.showModal();
        DOM.cmdInput.value = '';
        renderCmds();
        DOM.cmdInput.focus();
        return;
    }

    // 2. Điều hướng bên trong Command Palette khi đang mở
    if (DOM.dialog.open) {
        const items = DOM.cmdList.querySelectorAll('li');
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            cmdSelectedIndex = (cmdSelectedIndex + 1) % items.length;
            renderCmds(DOM.cmdInput.value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            cmdSelectedIndex = (cmdSelectedIndex - 1 + items.length) % items.length;
            renderCmds(DOM.cmdInput.value);
        } else if (e.key === 'Enter' && items.length > 0) {
            executeCmd(items[cmdSelectedIndex].dataset.id);
        }
        return; // Chặn phím tắt Gallery khi modal đang mở
    }

    // 3. Phím tắt Gallery
    if (e.key === 'ArrowLeft') updateImg(currentIdx - 1);
    if (e.key === 'ArrowRight') updateImg(currentIdx + 1);
    if (e.key === ' ' && document.activeElement.tagName !== 'BUTTON') { 
        e.preventDefault(); // Tránh scroll màn hình
        togglePlay(); 
    }
    if (e.key >= '1' && e.key <= '9') updateImg(parseInt(e.key));
});

// Khởi chạy lần đầu
updateImg(currentIdx);