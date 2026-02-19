let xmlDoc = null;

function fetchBooks() {
    fetch('books.xml')
        .then(res => res.text())
        .then(str => {
            xmlDoc = new window.DOMParser().parseFromString(str, "text/xml");
            renderBooks();
        });
}

function renderBooks() {
    const tbody = document.getElementById('bookTable');
    tbody.innerHTML = '';
    const books = xmlDoc.getElementsByTagName("book");
    
    for (let i = 0; i < books.length; i++) {
        const id = books[i].getElementsByTagName("id")[0].textContent;
        const title = books[i].getElementsByTagName("title")[0].textContent;
        const author = books[i].getElementsByTagName("author")[0].textContent;
        const status = books[i].getElementsByTagName("status")[0].textContent;
        
        tbody.innerHTML += `
            <tr>
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${status}</td>
                <td>
                    <button class="danger" onclick="deleteBook('${id}')">Delete</button>
                </td>
            </tr>
        `;
    }
}

document.getElementById('bookForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('bId').value;
    const title = document.getElementById('bTitle').value;
    const author = document.getElementById('bAuthor').value;
    const status = document.getElementById('bStatus').value;

    const books = xmlDoc.getElementsByTagName("book");
    let exists = false;

    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].getElementsByTagName("title")[0].textContent = title;
            books[i].getElementsByTagName("author")[0].textContent = author;
            books[i].getElementsByTagName("status")[0].textContent = status;
            exists = true;
            break;
        }
    }

    if (!exists) {
        const newBook = xmlDoc.createElement("book");
        ['id', 'title', 'author', 'status'].forEach(tag => {
            const node = xmlDoc.createElement(tag);
            node.textContent = eval(tag);
            newBook.appendChild(node);
        });
        xmlDoc.getElementsByTagName("library")[0].appendChild(newBook);
    }
    
    e.target.reset();
    renderBooks();
});

window.deleteBook = function(id) {
    const books = xmlDoc.getElementsByTagName("book");
    for (let i = 0; i < books.length; i++) {
        if (books[i].getElementsByTagName("id")[0].textContent === id) {
            books[i].parentNode.removeChild(books[i]);
            renderBooks();
            break;
        }
    }
}

fetchBooks();