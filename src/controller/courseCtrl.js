const db = require("../../db.js");
exports.addcourse = (req, res) => {
    const { course_name, description, total_credits } = req.body;
    if (!course_name || !total_credits) {
        return res.status(400).json({ message: "Course name and credits are required" });
    }
    const sql = "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)";
    db.query(sql, [course_name, description, total_credits], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Course added", course_id: result.insertId });
    });
};
exports.viewallcourses = (req, res) => {
    const sql = "SELECT * FROM COURSES ";
    db.query(sql, (err, results) => {
        if (err) {
            console.err("Err fetching courses", err);
            return res.status(500).json({ message: "Database error" });
        }

        res.status(200).json(results);


    });
};