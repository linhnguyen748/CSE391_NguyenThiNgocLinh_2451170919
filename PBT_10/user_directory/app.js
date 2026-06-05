// ==========================================
// 1. API LAYER
// ==========================================
const api = {
    baseURL: "https://jsonplaceholder.typicode.com",
    
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            if (!response.ok) throw new Error(`Lỗi HTTP: ${response.status}`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },
    getUsers() { return this.request('/users'); },
    getUser(id) { return this.request(`/users/${id}`); },
    createUser(data) {
        return this.request('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
    },
    updateUser(id, data) {
        return this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
    },
    deleteUser(id) {
        return this.request(`/users/${id}`, { method: 'DELETE' });
    }
};

// ==========================================
// 2. UI LAYER
// ==========================================
const ui = {
    container: document.getElementById('usersContainer'),
    toastContainer: document.getElementById('toastContainer'),
    
    renderUsers(users) {
        this.container.innerHTML = '';
        if (users.length === 0) {
            this.container.innerHTML = '<p>Không tìm thấy người dùng nào.</p>';
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p>📧 ${user.email}</p>
                <p>📱 ${user.phone || 'N/A'}</p>
                <div class="card-actions">
                    <button class="btn btn-edit" onclick="app.editUser(${user.id})">Edit</button>
                    <button class="btn btn-danger" onclick="app.deleteUser(${user.id})">Delete</button>
                </div>
            `;
            this.container.appendChild(card);
        });
    },

    showLoading() {
        this.container.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            this.container.innerHTML += `<div class="skeleton"></div>`;
        }
    },

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerText = message;
        this.toastContainer.appendChild(toast);
        
        // Tự động ẩn sau 3 giây
        setTimeout(() => { toast.remove(); }, 3000);
    },

    showError(message) { this.showToast(message, 'error'); },
    showSuccess(message) { this.showToast(message, 'success'); }
};

// ==========================================
// 3. APPLICATION LOGIC
// ==========================================
const app = {
    localUsers: [], // Quản lý state client-side
    
    // DOM Elements form
    form: document.getElementById('userForm'),
    formTitle: document.getElementById('formTitle'),
    submitBtn: document.getElementById('submitBtn'),
    cancelBtn: document.getElementById('cancelBtn'),
    searchInput: document.getElementById('searchInput'),
    
    async init() {
        this.bindEvents();
        await this.loadUsers();
    },

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.resetForm());
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    },

    // [READ] Lấy danh sách
    async loadUsers() {
        ui.showLoading();
        try {
            const data = await api.getUsers();
            this.localUsers = data; // Lưu vào state
            ui.renderUsers(this.localUsers);
        } catch (error) {
            ui.showError("Không thể tải danh sách người dùng!");
        }
    },

    // [CREATE / UPDATE] Xử lý submit form
    async handleSubmit(e) {
        e.preventDefault();
        
        const id = document.getElementById('userId').value;
        const userData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
        };

        try {
            if (id) {
                // UPDATE (Cập nhật)
                await api.updateUser(id, userData);

                // Cập nhật state local
                this.localUsers = this.localUsers.map(u => 
                    u.id == id ? { ...u, ...userData } : u
                );
                ui.showSuccess("Cập nhật thành công!");
            } else {
                // CREATE (Thêm mới)
                const newUser = await api.createUser(userData);
                // JSONPlaceholder luôn trả id=11, ta tạo fake ID để client xử lý trơn tru
                newUser.id = Date.now(); 
                this.localUsers.unshift(newUser); // Thêm lên đầu danh sách
                ui.showSuccess("Thêm user mới thành công!");
            }
            
            this.resetForm();
            ui.renderUsers(this.localUsers); // Re-render không reload
        } catch (error) {
            ui.showError(id ? "Lỗi khi cập nhật!" : "Lỗi khi thêm mới!");
        }
    },

    // Chuẩn bị form để sửa
    editUser(id) {
        const user = this.localUsers.find(u => u.id == id);
        if (!user) return;

        document.getElementById('userId').value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone || '';

        this.formTitle.innerText = "Cập nhật User";
        this.submitBtn.innerText = "Lưu Thay Đổi";
        this.cancelBtn.classList.remove('hidden');
    },

    // [DELETE] Xóa user
    async deleteUser(id) {
        if (!confirm("Bạn có chắc chắn muốn xóa người dùng này?")) return;

        try {
            await api.deleteUser(id);
            // Cập nhật state local
            this.localUsers = this.localUsers.filter(u => u.id != id);
            ui.renderUsers(this.localUsers);
            ui.showSuccess("Đã xóa user thành công!");
        } catch (error) {
            ui.showError("Xóa thất bại!");
        }
    },

    // [SEARCH] Client-side filter
    handleSearch(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        const filtered = this.localUsers.filter(user => 
            user.name.toLowerCase().includes(lowerKeyword) || 
            user.email.toLowerCase().includes(lowerKeyword)
        );
        ui.renderUsers(filtered);
    },

    resetForm() {
        this.form.reset();
        document.getElementById('userId').value = '';
        this.formTitle.innerText = "Thêm User Mới";
        this.submitBtn.innerText = "Thêm";
        this.cancelBtn.classList.add('hidden');
    }
};

// Khởi chạy ứng dụng
app.init();