const Course = require("../models/coursemodel");

// Render add course form
exports.renderAddCourseForm = (req, res) => {
    res.render("courses", { message: "", messageType: "" });
};

// Add Course
exports.addCourse = async(req, res) => {
    try {
        const { course_name, description, total_credits } = req.body;
        await Course.addCourse(course_name, description, total_credits);

        res.render("courses", {
            message: "Course Added Successfully",
            messageType: "success",
        });
    } catch (err) {
        console.error("Error adding course:", err);
        res.render("courses", {
            message: "Error adding course",
            messageType: "danger",
        });
    }
};

// View all courses
exports.viewAllCourses = async(req, res) => {
    try {
        const courses = await Course.getAllCourses();
        res.render("viewcourses", { courses });
    } catch (err) {
        console.error("Error fetching courses:", err);
        res.status(500).json({ message: "Database error" });
    }
};

// Delete course
exports.deleteCourse = async(req, res) => {
    const { id } = req.params;
    try {
        await Course.deleteCourse(id);
        const courses = await Course.getAllCourses();

        res.render("viewcourses", {
            courses,
            message: "Course Deleted Successfully.......",
        });
    } catch (err) {
        console.error("Error deleting course:", err);
        res.status(500).send("Database error");
    }
};

// Edit course (show edit form)
exports.editCourse = async(req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.getCourseById(id);

        if (course.length === 0) {
            return res.send("Course not found");
        }

        res.render("editcourse", { course: course[0] });
    } catch (err) {
        console.error("Database error while fetching course:", err);
        res.send("Update Failed");
    }
};

// Update course
exports.updateCourse = async(req, res) => {
    const { id } = req.params;
    const { course_name, description, total_credits } = req.body;

    try {
        await Course.updateCourse(id, course_name, description, total_credits);
        const courses = await Course.getAllCourses();

        res.render("viewcourses", {
            courses,
            message: "Course updated successfully.......",
        });
    } catch (err) {
        console.error("Error updating course:", err);
        res.send("Update failed");
    }
};

// View courses for user
exports.viewCoursesForUser = async(req, res) => {
    try {
        const courses = await Course.getAllCourses();
        res.render("viewcourseuser", { courses });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving courses");
    }
};
exports.searchCourses = async(req, res) => {
    const { query } = req.query;

    try {
        const courses = await Course.searchCourses(query);
        res.json(courses); // Must return JSON
    } catch (err) {
        console.error("Error searching courses:", err);
        res.status(500).json({ message: "Database error" });
    }
};