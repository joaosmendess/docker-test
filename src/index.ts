import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Adicione esta linha

const dbPromise = open({
    filename: './database.db',
    driver: sqlite3.Database
});

// Rotas para a API
app.get('/users', async (req, res) => {
    const db = await dbPromise;
    const users = await db.all('SELECT * FROM users');
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    const db = await dbPromise;
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    res.json({ id: result.lastID });
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const db = await dbPromise;
    await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    res.sendStatus (200);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const db = await dbPromise;
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    res.sendStatus (200);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
