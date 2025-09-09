const pool = require("../../db.js");

const AdminModel = {};

// Fetch admin by email
AdminModel.getAdminByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
  return rows[0];
};

// Get all pending students
AdminModel.getPendingStudents = async () => {
  const [rows] = await pool.query("SELECT * FROM users WHERE status = 'pending'");
  return rows;
};

// Approve student by ID
AdminModel.approveStudentById = async (id) => {
  const [result] = await pool.query("UPDATE users SET status = 'approved' WHERE user_id = ?", [id]);
  return result;
};

// Get student by ID (optional: in case needed)
AdminModel.getStudentById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user_id = ?", [id]);
  return rows[0];
};

module.exports = AdminModel;
