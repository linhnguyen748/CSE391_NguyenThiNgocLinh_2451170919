const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const countSpan = document.getElementById('todo-count');
const filtersUl = document.getElementById('filters');
const clearBtn = document.getElementById('clear-completed');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

// Lưu và Render
const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    render();
};

const render = () => {
    list.replaceChildren(); // Xóa list cũ (thay thế an toàn cho innerHTML = '')

    const filtered = todos.filter(t => 
        currentFilter === 'active' ? !t.completed : 
        currentFilter === 'completed' ? t.completed : true
    );

    filtered.forEach(todo => {
        // Dùng createElement 100%, không innerHTML
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.dataset.id = todo.id;

        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = todo.text;

        const editInput = document.createElement('input');
        editInput.className = 'edit-input';
        editInput.value = todo.text;
        editInput.style.display = 'none';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.append(textSpan, editInput, deleteBtn);
        list.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    countSpan.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    clearBtn.style.display = todos.some(t => t.completed) ? 'block' : 'none';
};

// 1. Thêm Todo
form.addEventListener('submit', e => {
    e.preventDefault();
    const text = input.value.trim();
    if (text) {
        todos.push({ id: Date.now().toString(), text, completed: false });
        input.value = '';
        save();
    }
});

// 2. Event Delegation: Xóa & Toggle
list.addEventListener('click', e => {
    const id = e.target.closest('li')?.dataset.id;
    if (!id) return;

    if (e.target.classList.contains('delete-btn')) {
        todos = todos.filter(t => t.id !== id);
        save();
    } else if (e.target.classList.contains('todo-text')) {
        const todo = todos.find(t => t.id === id);
        todo.completed = !todo.completed;
        save();
    }
});

// 3. Event Delegation: Double Click để Edit
list.addEventListener('dblclick', e => {
    if (e.target.classList.contains('todo-text')) {
        const li = e.target.closest('li');
        e.target.style.display = 'none';
        const input = li.querySelector('.edit-input');
        input.style.display = 'block';
        input.focus();
    }
});

// 4. Event Delegation: Nhấn Enter để Save Edit
list.addEventListener('keydown', e => {
    if (e.target.classList.contains('edit-input')) {
        if (e.key === 'Enter') {
            const id = e.target.closest('li').dataset.id;
            const newText = e.target.value.trim();
            if (newText) {
                todos.find(t => t.id === id).text = newText;
            } else {
                todos = todos.filter(t => t.id !== id); // Xóa nếu input rỗng
            }
            save();
        } else if (e.key === 'Escape') {
            render(); // Hủy edit
        }
    }
});

// 5. Filter
filtersUl.addEventListener('click', e => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        render();
    }
});

// 6. Clear Completed
clearBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    save();
});

// Khởi chạy lần đầu
render();