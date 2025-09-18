const pool = require("../../db");

// Add Course
const addCourse = async(course_name, description, total_credits) => {
    if (!course_name || isNaN(total_credits)) {
        throw new Error("Invalid input");
    }
    const sql =
        "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)";
    const [result] = await pool.query(sql, [
        course_name,
        description,
        total_credits,
    ]);
    return result;
};

// View all courses
const getAllCourses = async() => {
    const sql = "SELECT * FROM courses";
    const [rows] = await pool.query(sql);
    return rows;
};

// Get course by ID
const getCourseById = async(id) => {
    const sql = "SELECT * FROM courses WHERE course_id = ?";
    const [rows] = await pool.query(sql, [id]);
    return rows;
};

// Update course
const updateCourse = async(id, course_name, description, total_credits) => {
    const sql =
        "UPDATE courses SET course_name=?, description=?, total_credits=? WHERE course_id=?";
    const [result] = await pool.query(sql, [
        course_name,
        description,
        total_credits,
        id,
    ]);
    return result;
};

// Delete course
const deleteCourse = async(id) => {
    const sql = "DELETE FROM courses WHERE course_id=?";
    const [result] = await pool.query(sql, [id]);
    return result;
};
const searchCourses = async(query) => {
    const sql = "SELECT * FROM courses WHERE course_name LIKE ?";
    const [rows] = await pool.query(sql, [`%${query}%`]);
    return rows;
};
module.exports = {
    addCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    searchCourses,

};