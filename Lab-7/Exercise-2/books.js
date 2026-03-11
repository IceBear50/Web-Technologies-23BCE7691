let page = 1;
const container = document.getElementById('bookResults');

async function display(url, append = false) {
    const res = await fetch(url);
    const books = await res.json();
    if (!append) container.innerHTML = '';
    books.forEach(b => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `<h3>${b.title}</h3><p>${b.author}</p><b>$${b.price} | ⭐${b.rating}</b>`;
        container.appendChild(div);
    });
}

function searchBooks() { display(`/books/search?title=${document.getElementById('search').value}`); }
function filterBooks() { display(`/books/category/${document.getElementById('cat').value}`); }
function sort(field) { display(`/books/sort/${field}`); }
function topRated() { display('/books/top'); }
function loadMore() { page++; display(`/books?page=${page}`, true); }

display('/books');

function downloadBooksJSON() {
    window.location.href = '/download-books';
}