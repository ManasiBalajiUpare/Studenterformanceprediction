const jwt = require("jsonwebtoken");
const AdminModel = require("../models/adminmodel");

// Show Admin Login Page
exports.adminLogin = (req, res) => {
  res.render("adminlogin", { msg: null });
};

// Admin Login
exports.validateAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminModel.getAdminByEmail(email);

    if (!admin) {
      return res.render("adminlogin", { msg: "Invalid email or password" });
    }

    // Plain-text comparison (remove bcrypt)
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
    console.error("🔥 Admin Login error:", err);
    res.render("adminlogin", { msg: "Something went wrong. Try again." });
  }
};

// Admin Dashboard
exports.adminDashboard = (req, res) => {
  if (!req.user) return res.redirect("/admin/login");

  res.render("admindashboard", {
    loginUserName: req.user.name,
    user: req.user,
  });
};

// View Pending Students
exports.viewPendingStudents = async (req, res) => {
  try {
    const students = await AdminModel.getPendingStudents();
    res.render("viewpendingstudent", { students });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
};

// Approve Student Status and Render Edit Status
exports.approveStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await AdminModel.approveStudentById(id);

    const student = await AdminModel.getStudentById(id);
    if (!student) {
      return res.send("Student not found");
    }

    res.render("editstatus", { student, message: "Student approved successfully" });
  } catch (err) {
    console.error("Error approving student:", err);
    res.status(500).send("Database error");
  }
};

// Approve and Redirect (without rendering, just redirect)
exports.approveAndRedirect = async (req, res) => {
  const { id } = req.params;

  try {
    await AdminModel.approveStudentById(id);
    res.redirect(`/performance/add/${id}`);
  } catch (err) {
    console.error("Error approving student:", err);
    res.status(500).send("Database error");
  }
};
