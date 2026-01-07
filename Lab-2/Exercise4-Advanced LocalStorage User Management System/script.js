const form = document.getElementById("userForm")
const table = document.getElementById("userTable")

const getUsers = () => JSON.parse(localStorage.getItem("users")) || []

const saveUsers = users => localStorage.setItem("users", JSON.stringify(users))

const renderUsers = () => {
  table.innerHTML = ""
  getUsers().forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.mobile}</td>
        <td><button onclick="deleteUser(${i})">Delete</button></td>
      </tr>
    `
  })
}

form.onsubmit = e => {
  e.preventDefault()

  const name = form.name.value.trim()
  const email = form.email.value.trim()
  const mobile = form.mobile.value.trim()
  const password = form.password.value.trim()

  if (!name || !email || !mobile || !password) {
    alert("All fields are mandatory")
    return
  }

  if (!/^\d{10}$/.test(mobile)) {
    alert("Mobile number must be 10 digits")
    return
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters")
    return
  }

  const users = getUsers()

  if (users.some(u => u.email === email)) {
    alert("Email already registered")
    return
  }

  users.push({ name, email, mobile, password })
  saveUsers(users)
  form.reset()
  renderUsers()
}

function deleteUser(i) {
  const users = getUsers()
  users.splice(i, 1)
  saveUsers(users)
  renderUsers()
}

function clearAll() {
  localStorage.removeItem("users")
  renderUsers()
}

renderUsers()
