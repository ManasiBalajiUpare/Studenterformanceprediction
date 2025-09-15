const pool = require("../../db.js");
const bcrypt = require("bcrypt");

// Get admin by email
exports.getAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM admins WHERE email = ?", [email], (err, result) => {
            if (err) return reject(err);
            resolve(result.length > 0 ? result[0] : null);
        });
    });
};

// Add new admin
exports.addAdmin = async (name, email, password, role = "admin") => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)",
            [name, email, hashedPassword, role],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
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
        pool.query('UPDATE users SET status="approved" WHERE user_id=?', [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// Get student by ID
exports.getStudentById = (user_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE user_id=?', [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};
