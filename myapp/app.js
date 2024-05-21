// app.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let db = new sqlite3.Database('./products.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the products database.');
});

app.get('/prices', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/add-product', (req, res) => {
    const { date, name, price } = req.body;
    const sql = 'INSERT INTO products (date, name, price) VALUES (?, ?, ?)';
    db.run(sql, [date, name, price], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
