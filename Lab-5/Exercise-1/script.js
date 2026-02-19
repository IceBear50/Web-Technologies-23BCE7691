let xmlDoc = null;
const form = document.getElementById('empForm');
const tbody = document.getElementById('empTable');
const msgBox = document.getElementById('msgBox');

function showMsg(msg, isError = false) {
    msgBox.textContent = msg;
    msgBox.style.display = 'block';
    msgBox.style.backgroundColor = isError ? '#fef2f2' : '#ecfdf5';
    msgBox.style.color = isError ? 'var(--danger)' : 'var(--success)';
    setTimeout(() => msgBox.style.display = 'none', 3000);
}

function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "employees.xml", true);
    xhr.onload = function() {
        if (xhr.status === 200 && xhr.responseXML) {
            xmlDoc = xhr.responseXML;
            renderTable();
        } else {
            showMsg("Failed to load XML", true);
        }
    };
    xhr.send();
}

function renderTable() {
    tbody.innerHTML = '';
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        const id = employees[i].getElementsByTagName("id")[0].textContent;
        const name = employees[i].getElementsByTagName("name")[0].textContent;
        const dept = employees[i].getElementsByTagName("department")[0].textContent;
        const salary = employees[i].getElementsByTagName("salary")[0].textContent;
        
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${name}</td>
                <td>${dept}</td>
                <td>$${salary}</td>
                <td>
                    <button class="danger" onclick="deleteEmp('${id}')">Delete</button>
                </td>
            </tr>
        `;
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('empId').value;
    const name = document.getElementById('empName').value;
    const dept = document.getElementById('empDept').value;
    const salary = document.getElementById('empSalary').value;

    const existing = Array.from(xmlDoc.getElementsByTagName("employee")).find(
        emp => emp.getElementsByTagName("id")[0].textContent === id
    );

    if (existing) {
        existing.getElementsByTagName("name")[0].textContent = name;
        existing.getElementsByTagName("department")[0].textContent = dept;
        existing.getElementsByTagName("salary")[0].textContent = salary;
        showMsg("Employee updated");
    } else {
        const newEmp = xmlDoc.createElement("employee");
        
        const idNode = xmlDoc.createElement("id");
        idNode.textContent = id;
        const nameNode = xmlDoc.createElement("name");
        nameNode.textContent = name;
        const deptNode = xmlDoc.createElement("department");
        deptNode.textContent = dept;
        const salaryNode = xmlDoc.createElement("salary");
        salaryNode.textContent = salary;

        newEmp.appendChild(idNode);
        newEmp.appendChild(nameNode);
        newEmp.appendChild(deptNode);
        newEmp.appendChild(salaryNode);

        xmlDoc.getElementsByTagName("employees")[0].appendChild(newEmp);
        showMsg("Employee added");
    }
    
    form.reset();
    renderTable();
});

window.deleteEmp = function(id) {
    const employees = xmlDoc.getElementsByTagName("employee");
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].getElementsByTagName("id")[0].textContent === id) {
            employees[i].parentNode.removeChild(employees[i]);
            showMsg("Employee deleted");
            renderTable();
            break;
        }
    }
}

loadXML();