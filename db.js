const mysql = require("mysql2");
const dotenv = require("dotenv");


dotenv.config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,        
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


conn.connect((err) => {
  if (err) {
    console.error(" Database connection failed: ", err.message);
  } else {
    console.log(" Database connected successfully.");
  }
});

module.exports = conn;
