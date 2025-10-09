const pool = require('../../db.js'); // your database connection

// Add new performance
exports.addPerformance = async (data) => {
    return pool.query(
        `INSERT INTO performance 
        (user_id, attendance, assignments_completed, machine_test_marks, aptitude_test_marks, mock_interview_score, theory, communication, behavior)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            data.user_id,
            data.attendance,
            data.assignments_completed,
            data.machine_test_marks,
            data.aptitude_test_marks,
            data.mock_interview_score,
            data.theory,
            data.communication,
            data.behavior
        ]
    );
};

// Update performance
exports.updatePerformance = async (data, user_id) => {
    return pool.query(
        `UPDATE performance SET 
        attendance=?, assignments_completed=?, machine_test_marks=?, aptitude_test_marks=?, mock_interview_score=?, theory=?, communication=?, behavior=?
        WHERE user_id=?`,
        [
            data.attendance,
            data.assignments_completed,
            data.machine_test_marks,
            data.aptitude_test_marks,
            data.mock_interview_score,
            data.theory,
            data.communication,
            data.behavior,
            user_id
        ]
    );
};

// Get performance by user
exports.getPerformanceByUserId = async (user_id) => {
    const [rows] = await pool.query("SELECT * FROM performance WHERE user_id = ?", [user_id]);
    return rows[0];
};

// Add prediction
exports.addPrediction = async (user_id, predicted_percentage) => {
    return pool.query(
        "INSERT INTO predictions (user_id, predicted_percentage) VALUES (?, ?)",
        [user_id, predicted_percentage]
    );
};

// Update prediction
exports.updatePrediction = async (user_id, predicted_percentage) => {
    return pool.query(
        "UPDATE predictions SET predicted_percentage=? WHERE user_id=?",
        [predicted_percentage, user_id]
    );
};

// Get all performances with predicted_percentage
exports.getAllPerformances = async () => {
    const [rows] = await pool.query(`
        SELECT p.*, pr.predicted_percentage
        FROM performance p
        LEFT JOIN predictions pr ON p.user_id = pr.user_id
    `);
    return rows;
};
