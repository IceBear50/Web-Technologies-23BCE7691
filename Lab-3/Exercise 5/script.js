const stages = document.querySelectorAll(".stage")
const progressBar = document.getElementById("progressBar")
const toastBox = document.getElementById("toast-container")

const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirmPassword")
const ageInput = document.getElementById("age")
const roleInput = document.getElementById("role")
const skillsInput = document.getElementById("skills")

const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")

let currentStage = 0
const formData = {}

const toast = (msg, type = "error") => {
  const t = document.createElement("div")
  t.className = `toast ${type}`
  t.textContent = msg
  toastBox.appendChild(t)
  setTimeout(() => t.remove(), 3000)
}

const showStage = () => {
  stages.forEach(s => s.classList.remove("active"))
  stages[currentStage].classList.add("active")
  progressBar.style.width = `${(currentStage + 1) * 25}%`
}

const emailValid = email => /@(gmail|yahoo|outlook)\.com$/.test(email)

const validateStage = () => {
  let valid = true
  stages[currentStage]
    .querySelectorAll("input, select")
    .forEach(i => i.classList.remove("invalid"))

  if (currentStage === 0) {
    if (!nameInput.value.trim()) {
      nameInput.classList.add("invalid")
      toast("Name is required")
      valid = false
    }
    if (!emailValid(emailInput.value)) {
      emailInput.classList.add("invalid")
      toast("Invalid email domain")
      valid = false
    }
    if (valid) {
      formData.name = nameInput.value
      formData.email = emailInput.value
    }
  }

  if (currentStage === 1) {
    if (passwordInput.value.length < 8) {
      passwordInput.classList.add("invalid")
      toast("Password must be at least 8 characters")
      valid = false
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmPasswordInput.classList.add("invalid")
      toast("Passwords do not match")
      valid = false
    }
    if (valid) formData.password = passwordInput.value
  }

  if (currentStage === 2) {
    if (ageInput.value < 18) {
      ageInput.classList.add("invalid")
      toast("Age must be at least 18")
      valid = false
    }
    if (!roleInput.value) {
      roleInput.classList.add("invalid")
      toast("Please select a role")
      valid = false
    }
    if (valid) {
      formData.age = ageInput.value
      formData.role = roleInput.value
    }
  }

  if (currentStage === 3) {
    if (!skillsInput.value.trim()) {
      skillsInput.classList.add("invalid")
      toast("Please enter at least one skill")
      valid = false
    }
    if (valid) formData.skills = skillsInput.value
  }

  return valid
}

nextBtn.onclick = () => {
  if (!validateStage()) return

  if (currentStage < stages.length - 1) {
    currentStage++
    showStage()
  } else {
    toast("Form submitted successfully", "success")
    console.log(formData)
  }
}

prevBtn.onclick = () => {
  if (currentStage > 0) {
    currentStage--
    showStage()
  }
}

showStage()
