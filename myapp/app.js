const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./eggs.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the database.');
    }
});

// Ensure the products table exists
db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  date TEXT,
  name TEXT,
  price REAL
)`);

// Add product API
app.post('/add-product', (req, res) => {
    const { date, name, price } = req.body;
    const sql = 'INSERT INTO products (date, name, price) VALUES (?, ?, ?)';
    db.run(sql, [date, name, price], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Product added successfully', id: this.lastID });
    });
});

// Fetch all prices API
app.get('/prices', (req, res) => {
    const sql = 'SELECT * FROM products ORDER BY date';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
