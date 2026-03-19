const student = {
    id: 101,
    name: "Priya",
    department: "CSE",
    marks: 92
};

const { id, name, department, marks } = student;

const destructuredDiv = document.getElementById("destructuredData");
destructuredDiv.innerHTML = `
    <p><strong>ID:</strong> ${id}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Department:</strong> ${department}</p>
    <p><strong>Marks:</strong> ${marks}</p>
`;

const updatedStudent = {
    ...student,
    grade: "A"
};

const objectDisplay = document.getElementById("objectDisplay");
objectDisplay.textContent = JSON.stringify(updatedStudent, null, 4);

console.log(id, name, department, marks);
console.log(updatedStudent);