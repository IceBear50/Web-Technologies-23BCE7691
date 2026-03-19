const form = document.getElementById('marksForm');
const resultDisplay = document.getElementById('resultDisplay');

const calculateAverage = (m1, m2, m3) => (m1 + m2 + m3) / 3;
const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let studentName = document.getElementById('nameInput').value;
    let mark1 = parseFloat(document.getElementById('m1').value);
    let mark2 = parseFloat(document.getElementById('m2').value);
    let mark3 = parseFloat(document.getElementById('m3').value);

    let total = calculateTotal(mark1, mark2, mark3);
    let average = calculateAverage(mark1, mark2, mark3);

    resultDisplay.innerHTML = `
        <h3>Results:</h3>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Total Marks:</strong> ${total}</p>
        <p><strong>Average Marks:</strong> ${average.toFixed(2)}</p>
    `;
});