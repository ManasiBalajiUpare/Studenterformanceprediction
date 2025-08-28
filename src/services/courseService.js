const pool = require("../db");

async function addCourse(course, description, credits) {
    const [result] = await pool.query(
        "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)", [course, description, credits]
    );
    return result;
}

module.exports = { addCourse };