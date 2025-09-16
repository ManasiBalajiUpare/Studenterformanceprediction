const db = require("../../db.js");

// Insert prediction
exports.insertPrediction = async (user_id, predicted_marks) => {
  const insertSql = `INSERT INTO predictions (user_id, predicted_marks) VALUES (?, ?)`;
  await db.query(insertSql, [user_id, predicted_marks]);
};

// Update prediction
exports.updatePrediction = async (user_id, predicted_marks) => {
  const updateSql = `UPDATE predictions SET predicted_marks = ?, prediction_date = CURRENT_TIMESTAMP WHERE user_id = ?`;
  await db.query(updateSql, [predicted_marks, user_id]);
};
