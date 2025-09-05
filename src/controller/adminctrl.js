const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../db.js");

// Show Admin Login Page
exports.adminLogin = (req, res) => {
  res.render("adminlogin", { msg: null });
};

// Admin Login
exports.validateAdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM admins WHERE email = ?", [email]);
    const admin = rows[0];

    if (!admin) {
      return res.render("adminlogin", { msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.render("adminlogin", { msg: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { admin_id: admin.admin_id, name: admin.name, email: admin.email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Store token in cookie
    res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.redirect("/admin/dashboard");
  } catch (err) {
    console.error("🔥 Admin Login error:", err);
    res.render("adminlogin", { msg: "Something went wrong. Try again." });
  }
};

// Admin Dashboard
exports.adminDashboard = (req, res) => {
  // req.user should be set via middleware that validates JWT
  if (!req.user) return res.redirect("/admin/login");

  res.render("admindashboard", {
    loginUserName: req.user.name,
    user: req.user,
  });
};
