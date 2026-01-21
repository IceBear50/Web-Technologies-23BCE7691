const questions = [
  {
    id: "q1",
    text: "What is your name?",
    type: "text",
    required: true,
    maxLength: 20
  },
  {
    id: "q2",
    text: "Your preferred role?",
    type: "radio",
    required: true,
    options: ["Student", "Teacher", "Professional"]
  },
  {
    id: "q3",
    text: "Skills you know",
    type: "checkbox",
    required: true,
    minSelect: 1,
    maxSelect: 2,
    options: ["JavaScript", "Python", "Java", "C++"]
  }
]

const form = document.getElementById("surveyForm")

questions.forEach(q => {
  const div = document.createElement("div")
  div.className = "question"
  div.id = q.id

  let html = `<label>${q.text}</label>`

  if (q.type === "text") {
    html += `<input type="text" maxlength="${q.maxLength}">`
  }

  if (q.type === "radio") {
    html += `<div class="options">`
    q.options.forEach(o => {
      html += `<label><input type="radio" name="${q.id}" value="${o}"> ${o}</label>`
    })
    html += `</div>`
  }

  if (q.type === "checkbox") {
    html += `<div class="options">`
    q.options.forEach(o => {
      html += `<label><input type="checkbox" value="${o}"> ${o}</label>`
    })
    html += `</div>`
  }

  html += `<div class="error"></div>`
  div.innerHTML = html
  form.appendChild(div)
})

const validate = () => {
  let valid = true

  questions.forEach(q => {
    const qDiv = document.getElementById(q.id)
    const error = qDiv.querySelector(".error")
    error.textContent = ""

    if (q.type === "text") {
      const input = qDiv.querySelector("input")
      if (q.required && !input.value.trim()) {
        error.textContent = "This field is required"
        valid = false
      }
    }

    if (q.type === "radio") {
      const checked = qDiv.querySelector("input:checked")
      if (q.required && !checked) {
        error.textContent = "Please select one option"
        valid = false
      }
    }

    if (q.type === "checkbox") {
      const checked = qDiv.querySelectorAll("input:checked").length
      if (checked < q.minSelect || checked > q.maxSelect) {
        error.textContent = `Select between ${q.minSelect} and ${q.maxSelect} options`
        valid = false
      }
    }
  })

  return valid
}

document.getElementById("submitBtn").addEventListener("click", e => {
  e.preventDefault()
  if (validate()) alert("Survey submitted successfully")
})
