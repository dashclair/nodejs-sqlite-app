import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./test.sqlite')

db.serialize(()=>{
    db.run(`PRAGMA foreign_keys = ON;`);
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT,
            name TEXT
        )
    `)

    db.run(`
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS userCart (
            userId INTEGER,
            itemId INTEGER,
            amount INTEGER,
            PRIMARY KEY (userId, itemId),
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS reservedItems (
            itemId INTEGER PRIMARY KEY,
            amount INTEGER,
            FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS warehouse (
            itemId INTEGER PRIMARY KEY,
            amount INTEGER,
            FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE
        )
    `);

})
// const sql = `INSERT INTO warehouse(itemId, amount) VALUES(?,?)`
// const sql = `DELETE FROM items WHERE id= ?`
// const sql = `UPDATE warehouse SET amount = amount - ? WHERE itemId = ? `

db.run(`DELETE FROM userCart WHERE userId = ? AND itemId`,[2, 1], (err) => {
    if (err) return console.error(err.message);
  })


// db.all('DROP TABLE warehouse')


export default db;