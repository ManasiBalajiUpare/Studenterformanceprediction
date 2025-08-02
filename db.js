// db.js
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

// Create a pool for better performance and auto-management
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // You can adjust this
  queueLimit: 0
});

pool.getConnection()
  .then(() => {
    console.log("Database connected successfully (via pool).");
  })
  .catch((err) => {
    console.error(" Database connection failed:", err.message);
  });

module.exports = pool;
