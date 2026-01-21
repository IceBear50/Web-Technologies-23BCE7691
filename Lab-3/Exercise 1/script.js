const form = document.getElementById("registerForm")
const inputs = document.querySelectorAll("input, select")
const role = document.getElementById("role")
const skills = document.getElementById("skills")
const toastContainer = document.getElementById("toast-container")

skills.classList.add("hidden")

const showToast = (msg, type = "error") => {
  const t = document.createElement("div")
  t.className = `toast ${type}`
  t.textContent = msg
  toastContainer.appendChild(t)
  setTimeout(() => t.remove(), 3000)
}

const emailValid = email => /@(gmail|yahoo|outlook)\.com$/.test(email)

const passwordStrength = (pwd, role) => {
  if (role === "student") return pwd.length >= 6
  if (role === "teacher") return pwd.length >= 8 && /\d/.test(pwd)
  if (role === "admin") return pwd.length >= 10 && /[A-Z]/.test(pwd) && /\d/.test(pwd) && /[\W]/.test(pwd)
  return false
}

const validate = (showMessages = false) => {
  let valid = true
  inputs.forEach(i => i.classList.remove("invalid"))

  if (!emailValid(email.value)) {
    email.classList.add("invalid")
    showMessages && showToast("Invalid email domain")
    valid = false
  }

  if (!passwordStrength(password.value, role.value)) {
    password.classList.add("invalid")
    showMessages && showToast("Password does not meet role requirements")
    valid = false
  }

  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("invalid")
    showMessages && showToast("Passwords do not match")
    valid = false
  }

  if (role.value === "teacher" && !skills.value.trim()) {
    skills.classList.add("invalid")
    showMessages && showToast("Skills are required for teachers")
    valid = false
  }

  if (role.value === "admin" && age.value < 21) {
    age.classList.add("invalid")
    showMessages && showToast("Admin must be at least 21 years old")
    valid = false
  }

  return valid
}

role.addEventListener("change", () => {
  role.value === "teacher"
    ? skills.classList.remove("hidden")
    : skills.classList.add("hidden")
})

inputs.forEach(i =>
  i.addEventListener("input", () => validate(false))
)

form.addEventListener("submit", e => {
  if (!validate(true)) {
    e.preventDefault()
  } else {
    showToast("Account created successfully", "success")
  }
})
