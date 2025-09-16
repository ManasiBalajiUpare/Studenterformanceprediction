const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminmodel");

exports.adminLogin = (req, res) => {
    res.render("adminlogin", { msg: null });
};

exports.validateAdminLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.render("adminlogin", { msg: "Please fill all fields" });

    try {
        const admin = await AdminModel.getAdminByEmail(email);
        if (!admin || admin.password !== password) {
            return res.render("adminlogin", { msg: "Invalid email or password" });
        }

        const token = jwt.sign(
            { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.redirect("/admin/dashboard");

    } catch (err) {
        console.error(err);
        res.send("Something went wrong.");
    }
};

exports.adminDashboard = (req, res) => {
    const admin = req.admin;
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

// // Approve Student
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

// // Show Add Admin Form
exports.addAdminForm = (req, res) => {
     res.render("add-admin", { msg: null });
 };

// // Add Admin
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







exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/adminlogin");
};

