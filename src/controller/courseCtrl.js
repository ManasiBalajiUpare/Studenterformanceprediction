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
        res.render("courses", { message: "Course Added Succesfuly......." });
    });
};
exports.viewallcourses = (req, res) => {
    const sql = "SELECT * FROM COURSES ";
    db.query(sql, (err, results) => {
        if (err) {
            console.err("Err fetching courses", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.render("viewcourses", { courses: results })
    });
};
exports.deletecourse = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM COURSES WHERE course_id=?";
    db.query(sql, [id], (err, result) => {

        res.redirect("/viewallcourses?msg=Course Deleted Successfully.....");
    });
};
exports.updatecourse = (req, res) => {
    const { id } = req.params;
    const { course_name, description, total_credits } = req.body;

    const sql = "UPDATE courses SET course_name = ?, description = ?, total_credits = ? WHERE course_id = ?";

    db.query(sql, [course_name, description, total_credits, id], (err, result) => {
        if (err) {
            console.error("Error updating course:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course updated successfully.........." });
    });
};
exports.addedcourse = (req, res) => {
    res.render("courses.ejs");

}