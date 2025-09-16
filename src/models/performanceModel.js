// const pool = require("../../db");

// const Performance = {};

// // Insert performance data
// Performance.add = async (data) => {
//   const query = `
//     INSERT INTO performance 
//     (user_id, attendance, assignments_completed, machine_test_marks, aptitude_test_marks,
//      mock_interview_score, theory_performance, practice_performance, communication_score, behavior_score)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   const values = [
//     data.user_id,
//     data.attendance,
//     data.assignments_completed,
//     data.machine_test_marks,
//     data.aptitude_test_marks,
//     data.mock_interview_score,
//     data.theory_performance,
//     data.practice_performance,
//     data.communication_score,
//     data.behavior_score
//   ];
//   const [result] = await pool.query(query, values);
//   return result;
// };

// // Fetch all performances with user info
// Performance.getAll = async () => {
//   const [rows] = await pool.query(
//     `SELECT p.*, u.name, u.email 
//      FROM performance p 
//      JOIN users u ON p.user_id = u.user_id`
//   );
//   return rows;
// };

// module.exports = Performance;
const db = require("../../db.js");

// Insert new performance record
exports.insertPerformance = async (data) => {
  const insertSql = `INSERT INTO performance 
    (user_id, attendance, assignments_completed, machine_test_marks, aptitude_test_marks, mock_interview_score, theory_performance, practice_performance, communication_score, behavior_score) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const [result] = await db.query(insertSql, [
    data.user_id,
    data.attendance,
    data.assignments_completed,
    data.machine_test_marks,
    data.aptitude_test_marks,
    data.mock_interview_score,
    data.theory_performance,
    data.practice_performance,
    data.communication_score,
    data.behavior_score,
  ]);

  return result.insertId;
};

// Fetch historical performance by user_id
exports.getPerformanceByUser = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM performance WHERE user_id = ?",
    [user_id]
  );
  return rows;
};

// Fetch a single performance by performance_id
exports.getPerformanceById = async (performance_id) => {
  const [[record]] = await db.query(
    "SELECT * FROM performance WHERE performance_id = ?",
    [performance_id]
  );
  return record;
};

// Update performance record
exports.updatePerformance = async (performance_id, data) => {
  const updateSql = `UPDATE performance SET 
    attendance = ?, assignments_completed = ?, machine_test_marks = ?, aptitude_test_marks = ?, mock_interview_score = ?, theory_performance = ?, practice_performance = ?, communication_score = ?, behavior_score = ? 
    WHERE performance_id = ?`;

  await db.query(updateSql, [
    data.attendance,
    data.assignments_completed,
    data.machine_test_marks,
    data.aptitude_test_marks,
    data.mock_interview_score,
    data.theory_performance,
    data.practice_performance,
    data.communication_score,
    data.behavior_score,
    performance_id,
  ]);
};
