let db = [
    { id: 101, name: "Alice Johnson", dept: "CS", marks: 92 },
    { id: 102, name: "Bob Smith", dept: "Eng", marks: 78 },
    { id: 103, name: "Charlie Davis", dept: "Math", marks: 85 },
    { id: 104, name: "Diana Evans", dept: "Sci", marks: 91 },
    { id: 105, name: "Ethan Foster", dept: "CS", marks: 74 },
    { id: 106, name: "Fiona Green", dept: "Eng", marks: 88 },
    { id: 107, name: "George Harris", dept: "Hist", marks: 67 },
    { id: 108, name: "Hannah Irving", dept: "Math", marks: 95 },
    { id: 109, name: "Ian Jenkins", dept: "Sci", marks: 82 },
    { id: 110, name: "Julia King", dept: "CS", marks: 79 },
    { id: 111, name: "Kevin Lewis", dept: "Eng", marks: 60 },
    { id: 112, name: "Laura Miller", dept: "Arts", marks: 93 }
];

const api = {
    get: () => Promise.resolve([...db]),
    post: (data) => {
        const newRecord = { ...data, id: Date.now().toString().slice(-4) };
        db.push(newRecord);
        return Promise.resolve(newRecord);
    },
    put: (id, data) => {
        const idx = db.findIndex(s => s.id == id);
        if (idx > -1) db[idx] = { ...db[idx], ...data };
        return Promise.resolve(db[idx]);
    },
    delete: (id) => {
        db = db.filter(s => s.id != id);
        return Promise.resolve(true);
    }
};

const el = {
    form: document.getElementById('crudForm'),
    table: document.getElementById('tableBody'),
    toast: document.getElementById('toast'),
    btn: document.getElementById('mainBtn')
};

let editingId = null;

const notify = (msg, type = 'success') => {
    el.toast.textContent = msg;
    el.toast.style.color = type === 'error' ? 'var(--error)' : 'var(--success)';
    setTimeout(() => el.toast.textContent = '', 3000);
};

const render = async () => {
    const students = await api.get();
    el.table.innerHTML = students.map(s => `
        <tr>
            <td>#${s.id}</td>
            <td>${s.name}</td>
            <td>${s.dept}</td>
            <td>${s.marks}</td>
            <td>
                <button class="action-btn" onclick="startEdit('${s.id}')">Edit</button>
                <button class="action-btn delete-btn" onclick="remove('${s.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
};

el.form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        name: document.getElementById('name').value,
        dept: document.getElementById('dept').value,
        marks: document.getElementById('marks').value
    };

    try {
        if (editingId) {
            await api.put(editingId, data);
            notify('Student updated successfully');
            editingId = null;
            el.btn.textContent = 'Add';
            el.btn.style.backgroundColor = 'var(--primary)';
        } else {
            await api.post(data);
            notify('Student added successfully');
        }
        el.form.reset();
        render();
    } catch (err) {
        notify('Operation failed', 'error');
    }
});

window.startEdit = async (id) => {
    const students = await api.get();
    const s = students.find(x => x.id == id);
    document.getElementById('name').value = s.name;
    document.getElementById('dept').value = s.dept;
    document.getElementById('marks').value = s.marks;
    editingId = id;
    el.btn.textContent = 'Update';
    el.btn.style.backgroundColor = 'var(--success)';
};

window.remove = async (id) => {
    if(!confirm("Are you sure?")) return;
    await api.delete(id);
    notify('Record deleted');
    render();
};

render();