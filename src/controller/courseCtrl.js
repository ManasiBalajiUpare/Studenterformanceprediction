const db = require("../../db.js");
exports.renderAddCourseForm = (req, res) => {
    res.render("courses", { message: "" });
};

exports.addcourse = (req, res) => {
    const { course_name, description, total_credits } = req.body;

    if (!course_name || !total_credits) {
        return res.render("courses", { message: "Course name and credits are required" });
    }

    const sql = "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)";
    db.query(sql, [course_name, description, total_credits], (err, result) => {
        if (err) {
            console.error(err);

            // Check for duplicate entry error
            if (err.code === 'ER_DUP_ENTRY') {
                return res.render("courses", { message: "Course already exists......." });
            }

            return res.render("courses", { message: "Database error. Please try again." });
        }

        res.render("courses", { message: "Course Added Successfully....." });
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
    const sql = "DELETE FROM COURSES WHERE course_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {

            console.error("Error updating course:", err);
            return res.status(500).send('Database error');
        }

        db.query("SELECT * FROM COURSES", (err2, courses) => {
            res.render('viewcourses', {
                courses,
                message: "Course Deleted Successfully......."
            });
        });
    });
};

exports.editcourse = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM courses WHERE course_id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Database error while fething course:", err);
            return res.send("Update Failed");
        }
        if (result.length === 0) {
            console.warn("No course found with ID:", id);
            return res.send("Course not found");
        }
        console.log(result);
        console.log('isArray result:', Array.isArray(result));
        res.render('editcourse', { course: result[0] });
    });
};
exports.updatecourse = (req, res) => {
    const { id } = req.params;
    const { course_name, description, total_credits } = req.body;

    const sql = "UPDATE courses SET course_name=?, description=?, total_credits=? WHERE course_id=?";
    db.query(sql, [course_name, description, total_credits, id], (err, result) => {
        if (err) {
            console.error("Error updating course:", err);
            return res.send("Update failed");
        }
        db.query("SELECT * FROM courses", (err, result) => {
            if (err) {
                console.error("Error fetching courses:", err);
                return res.send("Error fetching data");
            }

            res.render("viewcourses", {
                courses: result,
                message: "Course updated successfully......."
            });
        });
    });
};