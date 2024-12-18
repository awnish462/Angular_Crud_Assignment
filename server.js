const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'Awnish@#$000', // Change this to your MySQL password
    database: 'synonymsdb',
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database!');
});

// CRUD Endpoints

// Add a synonym
app.post('/add', (req, res) => {
    const { Synonym, AltSynonyms, TechWord } = req.body;
    const sql = 'INSERT INTO synonyms (Synonym, AltSynonyms, TechWord) VALUES (?, ?, ?)';
    db.query(sql, [Synonym, AltSynonyms, TechWord], (err, result) => {
        if (err) throw err;
        res.send('Synonym added successfully!');
    });
});

// View all synonyms
app.get('/view', (req, res) => {
    const sql = 'SELECT * FROM synonyms';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a synonym
app.put('/update', (req, res) => {
    const { Synonym, AltSynonyms, TechWord } = req.body;
    const sql = 'UPDATE synonyms SET AltSynonyms = ?, TechWord = ? WHERE Synonym = ?';
    db.query(sql, [AltSynonyms, TechWord, Synonym], (err, result) => {
        if (err) throw err;
        res.send('Synonym updated successfully!');
    });
});

// Delete a synonym
app.delete('/delete', (req, res) => {
    const { Synonym } = req.body;
    const sql = 'DELETE FROM synonyms WHERE Synonym = ?';
    db.query(sql, [Synonym], (err, result) => {
        if (err) throw err;
        res.send('Synonym deleted successfully!');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
