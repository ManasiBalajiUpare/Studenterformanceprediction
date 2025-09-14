const db = require('../../db.js');

exports.getAdminByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM admins WHERE email = ?', [email], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

exports.getPendingStudents = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE status = "pending"', (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.approveStudentById = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE users SET status = "approved" WHERE user_id = ?', [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.getStudentById = (user_id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE user_id = ?', [user_id], (err, result) => {
            if (err) return reject(err);
            resolve(result[0]);
        });
    });
};

exports.addAdmin = (name, email, password) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO admins (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
