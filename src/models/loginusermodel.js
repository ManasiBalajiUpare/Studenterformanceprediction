const pool = require("../../db.js");

// Validate user by email
exports.validateUser = async function (email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length > 0 ? rows[0] : null;
};

// Get user by user ID
exports.getUserById = async function (userId) {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
  return rows.length > 0 ? rows[0] : null;
};

// Update user
exports.updateUser = async function (userId, data) {
  const sql = `
    UPDATE users 
    SET name=?, email=?, contact=?, address=?, qualification=?, course=?, skills=?, photo=? 
    WHERE user_id=?`;

  await pool.query(sql, [
    data.name,
    data.email,
    data.contact,
    data.address,
    data.qualification,
    data.course,
    data.skills,
    data.photo,
    userId,
  ]);

  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [userId]);
  return rows[0];
};
