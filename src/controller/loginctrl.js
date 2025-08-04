const bcrypt = require("bcrypt");
const loginusermodel = require("../models/loginusermodel");
const pool = require("../../db.js"); // mysql2.createPool()

// Show login form
exports.login = (req, res) => {
  res.render("login", { msg: null });
};

// Validate login credentials
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

    // Set session values
    req.session.loginUserId = userData.user_id;
    req.session.loginUserEmail = userData.email;
    req.session.user = userData;

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    res.render("login", { msg: "Something went wrong. Try again." });
  }
};

// Show dashboard
exports.dashboard = (req, res) => {
  res.render("userdashboard", {
    loginUserName: req.session.loginUserName,
  });
};

// Show user profile
exports.viewProfile = (req, res) => {
  res.render("viewprofile", {
    loginUserName: req.session.loginUserName,
    user: req.session.user,
  });
};





// Show update profile form
exports.updateProfileForm = (req, res) => {
  res.render("updateprofile", {
    loginUserEmail: req.session.loginUserEmail,
    user: req.session.user,
  });
};

// Handle profile update
exports.updateProfile = async (req, res) => {
  const userId = req.session.loginUserId;
  const {
    name,
    email,
    contact,
    address,
    qualification,
    course,
    skills,
  } = req.body;

  const photo = req.file ? req.file.filename : req.session.user.photo;

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

    // Get updated data from DB
    const [updatedUserRows] = await pool.query(
      "SELECT * FROM users WHERE user_id = ?",
      [userId]
    );

    req.session.user = updatedUserRows[0]; // update session

    res.redirect("/viewprofile");
  } catch (err) {
    console.error("Update error:", err);
    res.send("Something went wrong.");
  }
};



// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) console.error("Logout error:", err);
    res.redirect("/login");
  });
};
