let inventory = [];

async function loadInventory() {
    const res = await fetch('inventory.json');
    inventory = await res.json();
    renderInventory(inventory);
}

function renderInventory(data) {
    const tbody = document.getElementById('invTable');
    let total = 0;
    
    tbody.innerHTML = data.map(p => {
        total += p.price * p.stock;
        const rowClass = p.stock < 5 ? 'low-stock' : '';
        return `
        <tr class="${rowClass}">
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>$${parseFloat(p.price).toFixed(2)}</td>
            <td>${p.stock}</td>
            <td>
                <button class="warning" onclick="editProduct('${p.id}')">Edit</button>
                <button class="danger" onclick="deleteProduct('${p.id}')">Del</button>
            </td>
        </tr>`;
    }).join('');
    
    document.getElementById('totalValue').textContent = total.toFixed(2);
}

document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = inventory.filter(p => p.category.toLowerCase().includes(term));
    renderInventory(filtered);
});

document.getElementById('invForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('pId').value;
    const name = document.getElementById('pName').value;
    const category = document.getElementById('pCat').value;
    const price = parseFloat(document.getElementById('pPrice').value);
    const stock = parseInt(document.getElementById('pStock').value);

    const idx = inventory.findIndex(p => p.id === id);
    if (idx > -1) {
        inventory[idx] = { id, name, category, price, stock };
    } else {
        inventory.push({ id, name, category, price, stock });
    }
    
    e.target.reset();
    renderInventory(inventory);
});

window.editProduct = function(id) {
    const p = inventory.find(p => p.id === id);
    document.getElementById('pId').value = p.id;
    document.getElementById('pName').value = p.name;
    document.getElementById('pCat').value = p.category;
    document.getElementById('pPrice').value = p.price;
    document.getElementById('pStock').value = p.stock;
}

window.deleteProduct = function(id) {
    inventory = inventory.filter(p => p.id !== id);
    renderInventory(inventory);
}

loadInventory();