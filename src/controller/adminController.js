const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AdminModel = require("../models/adminmodel");

// Admin Login Page
exports.adminLogin = (req, res) => {
    res.render("adminlogin", { msg: null });
};

// Validate Admin Login
exports.validateAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.render("adminlogin", { msg: "Please fill all fields" });

    try {
        const admin = await AdminModel.getAdminByEmail(email);
        if (!admin) return res.render("adminlogin", { msg: "Invalid email or password" });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.render("adminlogin", { msg: "Invalid email or password" });

        const token = jwt.sign(
            { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 24*60*60*1000 });
        res.redirect("/admin/dashboard");

    } catch (err) {
        console.error("Admin login error:", err);
        res.send("Something went wrong during login.");
    }
};

// Admin Dashboard
exports.adminDashboard = (req, res) => {
    const admin = req.admin; // comes from middleware
    res.render("admindashboard", { admin });
};

// View Pending Students
exports.viewPendingStudents = async (req, res) => {
    try {
        const students = await AdminModel.getPendingStudents();
        res.render("viewpendingstudent", { students });
    } catch (err) {
        console.error("Failed to load pending students:", err);
        res.send("Error loading pending students");
    }
};

// Approve Student
exports.approveStatus = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        await AdminModel.approveStudentById(user_id);
        const student = await AdminModel.getStudentById(user_id);
        res.render("editstatus", { student });
    } catch (err) {
        console.error("Failed to approve student:", err);
        res.send("Error approving student");
    }
};

// Show Add Admin Form
exports.addAdminForm = (req, res) => {
    res.render("add-admin", { msg: null });
};

// Add Admin
exports.addAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await AdminModel.addAdmin(name, email, password);
        res.render("add-admin", { msg: "Admin added successfully!" });
    } catch (err) {
        console.error("Failed to add admin:", err);
        res.render("add-admin", { msg: "Failed to add admin. Email may already exist." });
    }
};

// Admin Logout
exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/adminlogin");
};
