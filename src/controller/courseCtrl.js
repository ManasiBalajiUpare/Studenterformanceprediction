const db = require("../../db.js");

exports.renderAddCourseForm = (req, res) => {
    res.render("courses", { message: "" });
};

// Add course
exports.addcourse = async(req, res) => {
    try {
        const { course_name, description, total_credits } = req.body;

        if (!course_name || !total_credits) {
            return res.render("courses", { message: "Course name and credits are required" });
        }

        const sql = "INSERT INTO courses (course_name, description, total_credits) VALUES (?, ?, ?)";
        await db.query(sql, [course_name, description, total_credits]);

        res.render("courses", { message: "Course Added Successfully....." });
    } catch (err) {
        console.error("Error adding course:", err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.render("courses", { message: "Course already exists......." });
        }
        res.render("courses", { message: "Database error. Please try again." });
    }
};
// View all courses
exports.viewallcourses = async(req, res) => {
    try {
        const [results] = await db.query("SELECT * FROM COURSES");
        res.render("viewcourses", { courses: results });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ message: "Database error" });
    }
};

// Delete course
exports.deletecourse = async(req, res) => {
    const { id } = req.params;
    try {
        await db.query("DELETE FROM COURSES WHERE course_id = ?", [id]);

        const [courses] = await db.query("SELECT * FROM COURSES");
        res.render("viewcourses", {
            courses,
            message: "Course Deleted Successfully......."
        });
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).send("Database error");
    }
};

// Edit course
exports.editcourse = async(req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query("SELECT * FROM courses WHERE course_id = ?", [id]);

        if (result.length === 0) {
            console.warn("No course found with ID:", id);
            return res.send("Course not found");
        }

        res.render('editcourse', { course: result[0] });
    } catch (err) {
        console.error("Database error while fetching course:", err);
        res.send("Update Failed");
    }
};

// Update course
exports.updatecourse = async(req, res) => {
    const { id } = req.params;
    const { course_name, description, total_credits } = req.body;

    try {
        await db.query(
            "UPDATE courses SET course_name=?, description=?, total_credits=? WHERE course_id=?", [course_name, description, total_credits, id]
        );

        const [courses] = await db.query("SELECT * FROM courses");
        res.render("viewcourses", {
            courses,
            message: "Course updated successfully......."
        });
    } catch (err) {
        console.error("Error updating course:", err);
        res.send("Update failed");
    }
};
// Search course
/*exports.searchCourseByUsingName = ((req, res) => {
let course_name = req.query.course_name;
let promise = coursemodel.getsearchCourseByName(course_name);
promise.then((result) => {
res.json(result);
}).catch((err) => {
res.send("Something went wrong");
})
}); */
// Search course
exports.searchCourseByUsingName = (req, res) => {
    let course_name = req.query.course_name;

    coursemodel.getSearchCourseByName(course_name)
        .then((result) => {
            res.json(result); // return results as JSON
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Something went wrong");
        });
};