const cart = []
let couponValue = 0

const headphoneProducts = [
  { name: "Sony WH-1000XM5", price: 29999, category: "electronics" },
  { name: "Bose QC45", price: 27999, category: "electronics" },
  { name: "JBL Live 660NC", price: 14999, category: "electronics" },
  { name: "Sennheiser HD 450BT", price: 17999, category: "electronics" },
  { name: "Boat Rockerz 550", price: 4999, category: "electronics" }
]

const productsDiv = document.getElementById("products")
const cartDiv = document.getElementById("cart")
const couponInput = document.getElementById("coupon")

const totalEl = document.getElementById("total")
const discountEl = document.getElementById("discount")
const finalEl = document.getElementById("final")

document.getElementById("addForm").addEventListener("submit", e => {
  e.preventDefault()
  cart.push({
    name: pname.value,
    price: +pprice.value,
    qty: 1,
    category: pcategory.value
  })
  e.target.reset()
  render()
})

const addHeadphone = p => {
  const item = cart.find(i => i.name === p.name)
  item ? item.qty++ : cart.push({ ...p, qty: 1 })
  render()
}

const updateQty = (i, v) => {
  cart[i].qty = Math.max(0, cart[i].qty + v)
  render()
}

const renderProducts = () => {
  productsDiv.innerHTML = ""
  headphoneProducts.forEach(p => {
    productsDiv.innerHTML += `
      <div class="product">
        <span>${p.name} ₹${p.price}</span>
        <button onclick='addHeadphone(${JSON.stringify(p)})'>Add</button>
      </div>
    `
  })
}

const render = () => {
  cartDiv.innerHTML = ""
  cart.forEach((p, i) => {
    cartDiv.innerHTML += `
      <div class="item">
        <span>${p.name} ₹${p.price}</span>
        <div class="controls">
          <button onclick="updateQty(${i},-1)">-</button>
          ${p.qty}
          <button onclick="updateQty(${i},1)">+</button>
        </div>
      </div>
    `
  })
  calculate()
}

couponInput.addEventListener("input", e => {
  const code = e.target.value.trim().toUpperCase()
  couponValue = code === "HAPPY50" ? 0.9 : 0
  calculate()
})

const calculate = () => {
  let total = 0
  let discount = 0
  const hour = new Date().getHours()

  cart.forEach(p => {
    total += p.price * p.qty
    if (p.qty >= 3) discount += p.price * p.qty * 0.1
    if (p.category === "electronics") discount += p.price * p.qty * 0.05
  })

  if (hour >= 18 && hour <= 22) {
    discount += total * 0.05
  }

  if (couponValue > 0) {
    discount += total * couponValue
  }

  discount = Math.min(discount, total)

  totalEl.textContent = total.toFixed(0)
  discountEl.textContent = discount.toFixed(0)
  finalEl.textContent = (total - discount).toFixed(0)
}

renderProducts()
