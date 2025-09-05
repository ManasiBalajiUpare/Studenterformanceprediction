const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginusermodel = require("../models/loginusermodel");
const pool = require("../../db.js");

// Show login form
exports.login = (req, res) => {
  res.render("login", { msg: null });
};

// Validate login credentials and issue JWT
exports.validateLoginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await loginusermodel.validateUser(email);

    if (!userData) {
      return res.render("login", { msg: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.render("login", { msg: "Incorrect password" });
    }

    // Create JWT token
    // Add role: userData.role to token
const token = jwt.sign(
  {
    user_id: userData.user_id,
    name: userData.name,
    email: userData.email,
    photo: userData.photo,
    role: userData.role, 
  },
  process.env.JWT_SECRET,
  { expiresIn: "1d" }
);


    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.render("login", { msg: "Something went wrong. Try again." });
  }
};

exports.dashboard = (req, res) => {
  const role = req.user.role; // ✅ Use actual role from JWT

  console.log("Role=" + role);

  if (role === "admin") {
    res.render("admindashboard", {
      loginUserName: req.user.name,
      user: req.user, 
    });
  } else {
    res.render("userdashboard", {
      loginUserName: req.user.name,
      user: req.user, 
    });
  }
};

// Show profile
exports.viewProfile = (req, res) => {
  res.render("viewprofile", {
    loginUserName: req.user.name,
    user: req.user,
  });
};

// Show update form
exports.updateProfileForm = (req, res) => {
  res.render("updateprofile", {
    loginUserEmail: req.user.email,
    user: req.user,
  });
};

// Handle profile update
exports.updateProfile = async (req, res) => {
  const userId = req.user.user_id;
  const {
    name,
    email,
    contact,
    address,
    qualification,
    course,
    skills,
  } = req.body;

  const photo = req.file ? req.file.filename : req.user.photo;

  try {
    const sql = `UPDATE users 
      SET name=?, email=?, contact=?, address=?, qualification=?, course=?, skills=?, photo=? 
      WHERE user_id=?`;

    await pool.query(sql, [
      name,
      email,
      contact,
      address,
      qualification,
      course,
      skills,
      photo,
      userId,
    ]);

    // Regenerate JWT with updated info
    const [updatedUserRows] = await pool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );

    const updatedUser = updatedUserRows[0];
    const newToken = jwt.sign(updatedUser, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", newToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect("/viewprofile");
  } catch (err) {
    console.error("Update error:", err);
    res.send("Something went wrong.");
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};