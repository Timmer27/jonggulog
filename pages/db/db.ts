export {};
const mysql = require("mysql2");
let db;
try {
  db = mysql.createConnection({
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PW}`,
    database: `${process.env.DB_NAME}`
  });
} catch (err) {
  console.error(err);
}
module.exports = db;