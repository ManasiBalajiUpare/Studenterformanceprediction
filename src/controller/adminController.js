const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminmodel");

// Admin Login Page
exports.adminLogin = (req, res) => {
    res.render("adminlogin", { msg: null });
};

// Validate Admin Login
exports.validateAdminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminModel.getAdminByEmail(email);

        if (!admin) {
            return res.render("adminlogin", { msg: "Invalid email or password" });
        }

        if (password !== admin.password) {
            return res.render("adminlogin", { msg: "Incorrect password" });
        }

        const token = jwt.sign(
            { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.redirect("/admin/dashboard");
    } catch (err) {
        console.error("Admin Login error:", err);
        res.render("adminlogin", { msg: "Something went wrong. Try again." });
    }
};

// Admin Dashboard
exports.adminDashboard = (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.redirect("/adminlogin");
    }

    res.render("admindashboard", {
        loginUserName: req.user.name,
        user: req.user,
    });
};

// View Pending Students
exports.viewPendingStudents = async (req, res) => {
    const students = await AdminModel.getPendingStudents();
    res.render("viewpendingstudent", { students });
};

// Approve Status
exports.approveStatus = async (req, res) => {
    const user_id = req.params.user_id;

    await AdminModel.approveStudentById(user_id);

    const student = await AdminModel.getStudentById(user_id);

    res.render("editstatus", { student, message: "Student approved successfully" });
};

// Add Admin Form
exports.addAdminForm = (req, res) => {
    res.render("add-admin", { message: "", messageType: "" });
};

// Add Admin Action
exports.addAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    await AdminModel.addAdmin(name, email, password);

    res.render("add-admin", {
        message: "Admin added successfully!",
        messageType: "success",
    });
};
//admin