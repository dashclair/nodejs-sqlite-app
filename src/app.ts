import db from './database'


db.all(`SELECT * FROM users`, [], (err, rows) => {
    if (err) { console.error(err.message)}
    rows.forEach(element => {
        console.log(element)
    });
});

db.all(`SELECT * FROM items`, [], (err, rows) => {
    if (err) { console.error(err.message)}
    rows.forEach(element => {
        console.log(element)
    });
});

db.all(`SELECT * FROM warehouse`, [], (err, rows) => {
    if (err) { console.error(err.message)}
    rows.forEach(element => {
        console.log(element)
    });
});

db.all(`SELECT * FROM userCart`, [], (err, rows) => {
    if (err) { console.error(err.message)}
    rows.forEach(element => {
        console.log(element)
    });
});