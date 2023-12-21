export {};
// const mysql2 = require("mysql2/promise");
// const db = mysql2.createPool({
//   host: `${process.env.DB_HOST}`,
//     port: `${process.env.DB_PORT}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PW}`,
//     database: `${process.env.DB_NAME}`,
//   dateStrings: "date",
// });
// module.exports = db;
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
// const mysql2 = require("mysql2/promise");
// const connection = mysql2.createPool({
//   host: "10.225.35.124",
//   port: 3306,
//   user: "root",
//   password: "Kolmar12#$",
//   database: "rms",
//   dateStrings: "date",
// });
