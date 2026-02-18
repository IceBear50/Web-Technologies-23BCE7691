const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');
const loader = document.getElementById('loader');

let controller;

const render = (products) => {
    if (products.length === 0) {
        resultsDiv.innerHTML = `<div style="text-align:center; color:gray;">No products found</div>`;
        return;
    }
    resultsDiv.innerHTML = products.map(p => `
        <div class="product-card">
            <div>
                <h4>${p.name}</h4>
                <span class="badge">${p.category}</span>
            </div>
            <strong>$${p.price}</strong>
        </div>
    `).join('');
};

const fetchProducts = async (query) => {
    if (controller) controller.abort();
    controller = new AbortController();

    loader.style.display = 'block';
    resultsDiv.innerHTML = '';

    try {
        await new Promise(r => setTimeout(r, 400));
        
        const res = await fetch('products.json', { signal: controller.signal });
        const data = await res.json();
        
        const filtered = data.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.category.toLowerCase().includes(query)
        );
        
        render(filtered);
    } catch (err) {
        if (err.name !== 'AbortError') {
            resultsDiv.innerHTML = `<div style="color:var(--error)">Failed to load data</div>`;
        }
    } finally {
        loader.style.display = 'none';
    }
};

let debounceTimer;
searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    clearTimeout(debounceTimer);
    if (!val) {
        resultsDiv.innerHTML = '';
        return;
    }
    debounceTimer = setTimeout(() => fetchProducts(val), 300);
});