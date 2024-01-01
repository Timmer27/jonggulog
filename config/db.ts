const mysql = require("mysql2");
let db;
try {
  db = mysql.createConnection({
    host: `${process.env.NEXT_PUBLIC_DB_HOST}`,
    port: `${process.env.NEXT_PUBLIC_DB_PORT}`,
    user: `${process.env.NEXT_PUBLIC_DB_USER}`,
    password: `${process.env.NEXT_PUBLIC_DB_PW}`,
    database: `${process.env.NEXT_PUBLIC_DB_NAME}`
  });
} catch (err) {
  console.error(err);
}
module.exports = db;