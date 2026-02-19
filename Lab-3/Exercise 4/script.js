const logDiv = document.getElementById("log")
const warningDiv = document.getElementById("warning")
const activityLog = []
let clickCount = 0
let clickTimer = Date.now()

const logActivity = (type, target, phase) => {
  const entry = {
    type,
    target: target.tagName,
    phase,
    time: new Date().toLocaleTimeString()
  }

  activityLog.push(entry)
  render()

  if (type === "click") {
    clickCount++
    if (Date.now() - clickTimer < 2000 && clickCount > 5) {
      warningDiv.textContent = "Suspicious activity detected: Too many clicks"
    }
    if (Date.now() - clickTimer > 2000) {
      clickTimer = Date.now()
      clickCount = 1
    }
  }
}

const render = () => {
  logDiv.innerHTML = ""
  activityLog.slice(-50).forEach(a => {
    logDiv.innerHTML += `
      <div class="entry">
        [${a.time}] ${a.type.toUpperCase()} on ${a.target} (${a.phase})
      </div>
    `
  })
}

document.addEventListener("click", e => logActivity("click", e.target, "capturing"), true)
document.addEventListener("click", e => logActivity("click", e.target, "bubbling"))

document.addEventListener("keydown", e =>
  logActivity(`key:${e.key}`, e.target, "bubbling")
)

document.addEventListener("focusin", e =>
  logActivity("focus", e.target, "bubbling")
)

document.getElementById("reset").onclick = () => {
  activityLog.length = 0
  logDiv.innerHTML = ""
  warningDiv.textContent = ""
}

document.getElementById("export").onclick = () => {
  const text = activityLog
    .map(a => `[${a.time}] ${a.type} on ${a.target} (${a.phase})`)
    .join("\n")

  const blob = new Blob([text], { type: "text/plain" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = "activity-log.txt"
  link.click()
}
