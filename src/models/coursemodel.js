const db = require("../../db.js"); // make sure this is your MySQL connection

//Add Course
const addCourse = async(course_name, description, total_credits) => {
    if (!course_name || isNaN(total_credits)) {
        throw new Error("Invalid input");
    }
    const sql =
        "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)";
    await db.query(sql, [course_name, description, total_credits]);
};

// View all courses
const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM courses";
        db.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Get course by ID
const getCourseById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM courses WHERE course_id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// Update course
const updateCourse = (id, course_name, description, total_credits) => {
    return new Promise((resolve, reject) => {
        const sql = "UPDATE courses SET course_name=?, description=?, total_credits=? WHERE course_id=?";
        db.query(sql, [course_name, description, total_credits, id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

// Delete course
const deleteCourse = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM courses WHERE course_id=?";
        db.query(sql, [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

module.exports = {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
};