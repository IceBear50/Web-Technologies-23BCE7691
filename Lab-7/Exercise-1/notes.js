const notesContainer = document.getElementById('notesContainer');

async function fetchNotes() {
    const res = await fetch('/notes');
    const notes = await res.json();
    renderNotes(notes);
}

function renderNotes(notes) {
    notesContainer.innerHTML = '';
    notes.forEach(note => {
        const div = document.createElement('div');
        div.className = 'note-card';
        div.innerHTML = `
            <span class="subject-tag">${note.subject}</span>
            <h3>${note.title}</h3>
            <p>${note.description}</p>
            <div class="actions">
                <button onclick="editNote('${note._id}', '${note.title}', '${note.description}')">Edit</button>
                <button onclick="deleteNote('${note._id}')">Delete</button>
            </div>
        `;
        notesContainer.appendChild(div);
    });
}

document.getElementById('noteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        title: document.getElementById('title').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value
    };
    await fetch('/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    e.target.reset();
    fetchNotes();
});

async function deleteNote(id) {
    await fetch(`/notes/${id}`, { method: 'DELETE' });
    fetchNotes();
}

async function editNote(id, t, d) {
    const title = prompt("New Title:", t);
    const description = prompt("New Description:", d);
    if (title && description) {
        await fetch(`/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        fetchNotes();
    }
}
fetchNotes();

function downloadJSON() {
    window.location.href = '/download-notes';
}