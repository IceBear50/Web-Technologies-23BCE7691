let students = [];

async function init() {
    try {
        const res = await fetch('students.json');
        if (!res.ok) throw new Error("Network response was not ok");
        students = await res.json();
        renderTable();
    } catch (e) {
        document.getElementById('msgBox').textContent = "Error loading data";
        document.getElementById('msgBox').style.display = "block";
    }
}

function renderTable() {
    const tbody = document.getElementById('studentTable');
    tbody.innerHTML = students.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${s.name}</td>
            <td>${s.course}</td>
            <td>${s.marks}</td>
            <td>
                <button class="warning" onclick="editStudent('${s.id}')">Edit</button>
                <button class="danger" onclick="deleteStudent('${s.id}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

document.getElementById('studentForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('sId').value;
    const name = document.getElementById('sName').value;
    const course = document.getElementById('sCourse').value;
    const marks = parseInt(document.getElementById('sMarks').value);

    const idx = students.findIndex(s => s.id === id);
    if (idx > -1) {
        students[idx] = { id, name, course, marks };
    } else {
        students.push({ id, name, course, marks });
    }
    
    e.target.reset();
    renderTable();
});

window.editStudent = function(id) {
    const s = students.find(s => s.id === id);
    document.getElementById('sId').value = s.id;
    document.getElementById('sName').value = s.name;
    document.getElementById('sCourse').value = s.course;
    document.getElementById('sMarks').value = s.marks;
}

window.deleteStudent = function(id) {
    students = students.filter(s => s.id !== id);
    renderTable();
}

init();