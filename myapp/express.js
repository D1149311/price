const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/sqlite.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});
db.run('CREATE TABLE IF NOT EXISTS CREATE TABLE egg (id INTEGER PRIMARY KEY AUTOINCREMENT,year INTEGER NOT NULL,price DECIMAL(5, 2) NOT NULL ');