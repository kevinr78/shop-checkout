const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: "root",
  database: "node-checkout",
  password: "Kevinr78",
});

module.exports = pool.promise();
