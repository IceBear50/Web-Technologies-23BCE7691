const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'Exercise-1')));
app.use('/ex2', express.static(path.join(__dirname, 'Exercise-2')));

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
let db;

async function start() {
    try {
        await client.connect();
        db = client.db('studentDB');
        app.listen(3000, () => console.log("Server: http://localhost:3000 (Ex 1) & http://localhost:3000/ex2 (Ex 2)"));
    } catch (e) { console.error(e); }
}
start();

app.post('/notes', async (req, res) => {
    const note = { ...req.body, created_date: new Date().toISOString().split('T')[0] };
    await db.collection('notes').insertOne(note);
    res.sendStatus(201);
});

app.get('/notes', async (req, res) => {
    const notes = await db.collection('notes').find().toArray();
    res.json(notes);
});

app.put('/notes/:id', async (req, res) => {
    await db.collection('notes').updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { title: req.body.title, description: req.body.description } }
    );
    res.sendStatus(200);
});

app.delete('/notes/:id', async (req, res) => {
    await db.collection('notes').deleteOne({ _id: new ObjectId(req.params.id) });
    res.sendStatus(200);
});

app.get('/books/search', async (req, res) => {
    const books = await db.collection('books').find({
        title: { $regex: req.query.title, $options: 'i' }
    }).toArray();
    res.json(books);
});

app.get('/books/category/:cat', async (req, res) => {
    const books = await db.collection('books').find({ category: req.params.cat }).toArray();
    res.json(books);
});

app.get('/books/sort/:field', async (req, res) => {
    const field = req.params.field;
    const order = (field === 'price') ? 1 : -1;
    const books = await db.collection('books').find().sort({ [field]: order }).toArray();
    res.json(books);
});

app.get('/books/top', async (req, res) => {
    const books = await db.collection('books').find({ rating: { $gte: 4 } }).limit(5).toArray();
    res.json(books);
});

app.get('/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * 5;
    const books = await db.collection('books').find().skip(skip).limit(5).toArray();
    res.json(books);
});

app.get('/download-notes', async (req, res) => {
    try {
        const notes = await db.collection('notes').find().toArray();
        const jsonData = JSON.stringify(notes, null, 2);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=notes.json');
        res.send(jsonData);
    } catch (e) {
        res.status(500).send("Error generating file");
    }
});

app.get('/download-books', async (req, res) => {
    try {
        const books = await db.collection('books').find().toArray();
        const jsonData = JSON.stringify(books, null, 2);
        
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=books_list.json');
        res.send(jsonData);
    } catch (e) {
        res.status(500).send("Error exporting books data");
    }
});