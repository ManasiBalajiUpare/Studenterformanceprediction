const pool = require("../../db.js");

exports.validateUser = async function (uemail) {
  try {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [uemail]); // ✅ use pool.query directly
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    console.error("DB Error in validateUser:", err);
    throw err;
  }
};