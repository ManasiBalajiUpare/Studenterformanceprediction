const pool = require("../../db.js");

// INSERT user into DB using async/await
exports.insertUser = async (userData) => {
  const sql = `
    INSERT INTO users 
      (name, email, password, address, contact, qualification, course, skills, photo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    userData.name,
    userData.email,
    userData.password,
    userData.address,
    userData.contact,
    userData.qualification,
    userData.course,
    userData.skills,
    userData.photo
  ];

  const [result] = await pool.query(sql, values);
  return result;
};

// Check if user already exists by email
exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};
