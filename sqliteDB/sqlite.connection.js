const sqlite = require("sqlite3");
const path = require('path');
let dbPath = path.resolve(__dirname, "../sqliteData/adEat.db");

// console.log(dbPath);
const conn = new sqlite.Database(dbPath);

module.exports = {
    conn
}
