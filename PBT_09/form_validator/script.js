const DOM = {
    name: document.getElementById('name'), nameIcon: document.getElementById('name-icon'),
    email: document.getElementById('email'), emailErr: document.getElementById('email-error'),
    phone: document.getElementById('phone'), phoneErr: document.getElementById('phone-error'),
    pass: document.getElementById('password'), strBar: document.getElementById('str-bar'), strText: document.getElementById('str-text'),
    confirm: document.getElementById('confirm-password'), confirmErr: document.getElementById('confirm-error'),
    btn: document.getElementById('submit-btn'), form: document.getElementById('register-form'),
    modal: document.getElementById('modal'), userInfo: document.getElementById('user-info'), closeBtn: document.getElementById('close-btn')
};

const state = { name: false, email: false, phone: false, pass: false, confirm: false };

const checkSubmit = () => {
    DOM.btn.disabled = !Object.values(state).every(val => val === true);
};

// 1. Name validate (2-50 chars)
DOM.name.addEventListener('input', e => {
    const val = e.target.value.trim();
    state.name = val.length >= 2 && val.length <= 50;
    DOM.nameIcon.textContent = val.length === 0 ? '' : (state.name ? '✅' : '❌');
    checkSubmit();
});

// 2. Email validate
DOM.email.addEventListener('input', e => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    state.email = regex.test(e.target.value);
    DOM.emailErr.textContent = (e.target.value === '' || state.email) ? '' : 'Email không đúng định dạng!';
    checkSubmit();
});

// 3. Phone auto-format (0901-234-567)
DOM.phone.addEventListener('input', e => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 10);
    if (val.length > 4) val = val.slice(0, 4) + '-' + val.slice(4);
    if (val.length > 8) val = val.slice(0, 8) + '-' + val.slice(8);
    e.target.value = val;
    
    state.phone = val.replace(/-/g, '').length === 10;
    DOM.phoneErr.textContent = (val === '' || state.phone) ? '' : 'Số điện thoại phải đủ 10 số!';
    checkSubmit();
});

// 4. Password Strength Meter
DOM.pass.addEventListener('input', e => {
    const val = e.target.value;
    let score = 0;
    
    if (val.length >= 8) {
        if (/[A-Za-z]/.test(val) && /[0-9]/.test(val)) score = 1;
        if (/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(val)) score = 2;
    }

    if (val.length === 0) {
        DOM.strBar.style.width = '0'; DOM.strText.textContent = '';
        state.pass = false;
    } else if (score === 0) {
        DOM.strBar.style = 'width: 33%; background: #dc3545;';
        DOM.strText.textContent = 'Yếu'; DOM.strText.style.color = '#dc3545';
        state.pass = false;
    } else if (score === 1) {
        DOM.strBar.style = 'width: 66%; background: #ffc107;';
        DOM.strText.textContent = 'Trung bình'; DOM.strText.style.color = '#ffc107';
        state.pass = true; // Yêu cầu >= 8 và có chữ+số là hợp lệ
    } else {
        DOM.strBar.style = 'width: 100%; background: #28a745;';
        DOM.strText.textContent = 'Mạnh'; DOM.strText.style.color = '#28a745';
        state.pass = true;
    }
    
    // Check lại confirm password khi pass thay đổi
    DOM.confirm.dispatchEvent(new Event('input'));
    checkSubmit();
});

// 5. Confirm Password
DOM.confirm.addEventListener('input', e => {
    state.confirm = e.target.value === DOM.pass.value && e.target.value !== '';
    DOM.confirmErr.textContent = (e.target.value === '' || state.confirm) ? '' : 'Mật khẩu không khớp!';
    checkSubmit();
});

// 6. Submit & Modal
DOM.form.addEventListener('submit', e => {
    e.preventDefault();
    if (!DOM.btn.disabled) {
        DOM.userInfo.textContent = `Tên: ${DOM.name.value}\nEmail: ${DOM.email.value}\nSĐT: ${DOM.phone.value}`;
        DOM.modal.style.display = 'flex';
    }
});

DOM.closeBtn.addEventListener('click', () => {
    DOM.modal.style.display = 'none';
    DOM.form.reset();
    Object.keys(state).forEach(k => state[k] = false);
    DOM.nameIcon.textContent = '';
    DOM.strBar.style.width = '0';
    DOM.strText.textContent = '';
    checkSubmit();
});