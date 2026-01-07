// --------------------------------------
// FORM SUBMISSION
// --------------------------------------
function submitForm() {
    let regno = document.getElementById("regno").value.trim();
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let email = document.getElementById("email").value.trim();
    let msg = document.getElementById("msg");

    if (regno === "" || name === "" || mobile === "" || email === "") {
        msg.style.color = "red";
        msg.innerText = "All fields are required!";
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        msg.style.color = "red";
        msg.innerText = "Enter a valid 10-digit mobile number!";
        return;
    }

    msg.style.color = "green";
    msg.innerText = "Registration Successful!";

    // Clear fields
    document.getElementById("regno").value = "";
    document.getElementById("name").value = "";
    document.getElementById("mobile").value = "";
    document.getElementById("email").value = "";
}

// --------------------------------------
// THEME TOGGLE (Dark / Light Mode)
// --------------------------------------
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeToggle");

    if (document.body.classList.contains("dark-mode")) {
        button.innerText = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        button.innerText = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme preference
window.onload = () => {
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("themeToggle").innerText = "☀️ Light Mode";
    }
};
