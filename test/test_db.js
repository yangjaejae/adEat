const DBObject = require("../sqliteDB/sqlite.execute").SqlQueryObj;

const db = new DBObject();

console.log(db.create_tb_user())
// console.log(db.create_tb_video())
// const crypto = require('crypto');
// let encry_pass = crypto.createHash('sha512').update('1234').digest('base64');
// db.put_user_info("yang", "yang@ref.com", encry_pass).then(console.log)
// db.get_user_pass("hh").then(console.log)
