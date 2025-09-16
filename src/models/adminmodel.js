const pool = require("../../db.js");

// Get admin by email
exports.getAdminByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows[0];  // Returns single admin object or undefined
};

// Add new admin (password stored as plain text for now)
exports.addAdmin = async (name, email, password) => {
    await pool.query(
        "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)",
        [name, email, password]
    );
};

// Get pending students
exports.getPendingStudents = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE status = "pending"', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Approve student by ID
exports.approveStudentById = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'UPDATE users SET status="approved" WHERE user_id=?',
            [user_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// Get student by ID
exports.getStudentById = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query(
            'SELECT * FROM users WHERE user_id=?',
            [user_id],
            (err, result) => {
                if (err) return reject(err);
                resolve(result[0]);  // Single student object
            }
        );
    });
};
