let draggedTask = null

document.getElementById("addBtn").onclick = () => {
  const input = document.getElementById("taskInput")
  const text = input.value.trim()
  if (!text) return

  const task = document.createElement("div")
  task.className = "task"
  task.draggable = true
  task.ondragstart = () => draggedTask = task

  const date = new Date().toLocaleDateString()
  task.innerHTML = `${text}<small>${date}</small>`

  document.getElementById("todo").appendChild(task)
  input.value = ""
}

document.querySelectorAll(".tasks").forEach(col => {
  col.ondragover = e => e.preventDefault()
  col.ondrop = e => {
    e.preventDefault()
    if (!draggedTask) return
    col.appendChild(draggedTask)

    if (col.id === "done") {
      draggedTask.classList.add("completed")
      showToast()
    } else {
      draggedTask.classList.remove("completed")
    }

    draggedTask = null
  }
})

function showToast() {
  const toast = document.getElementById("toast")
  toast.classList.add("show")
  setTimeout(() => toast.classList.remove("show"), 2000)
}

let total = 1500
let remaining = total
let interval = null
const circle = document.querySelector(".progress")
const timeText = document.getElementById("time")
const circumference = 440

function updateTimer() {
  const m = Math.floor(remaining / 60)
  const s = remaining % 60
  timeText.textContent = `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`
  circle.style.strokeDashoffset = circumference * (1 - remaining / total)
}

function startTimer() {
  if (interval) return
  interval = setInterval(() => {
    if (remaining <= 0) {
      clearInterval(interval)
      interval = null
      return
    }
    remaining--
    updateTimer()
  }, 1000)
}

function pauseTimer() {
  clearInterval(interval)
  interval = null
}

function resetTimer() {
  pauseTimer()
  remaining = total
  updateTimer()
}

updateTimer()
