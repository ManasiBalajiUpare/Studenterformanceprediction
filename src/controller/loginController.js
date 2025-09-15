const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUserModel = require("../models/loginUserModel");

// Show login page
exports.login = (req, res) => {
  res.render("login", { msg: null });
};

// Validate login
exports.validateLoginUser = async (req, res) => {
  const email = req.body.email.trim();
  const password = req.body.password;

  const userData = await loginUserModel.validateUser(email);
  if (!userData) return res.render("login", { msg: "Invalid email or password" });

  const isMatch = await bcrypt.compare(password, userData.password);
  if (!isMatch) return res.render("login", { msg: "Incorrect password" });

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

  res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.redirect("/dashboard");
};

// Dashboard
exports.dashboard = (req, res) => {
  if (req.user.role === "admin") {
    res.render("admindashboard", { loginUserName: req.user.name, user: req.user });
  } else {
    res.render("userdashboard", { loginUserName: req.user.name, user: req.user });
  }
};

// View Profile


exports.viewProfile = async (req, res) => {
  const userId = req.user.user_id;

  try {
    const userData = await loginUserModel.getUserById(userId);

    if (!userData) {
      return res.send("User not found");
    }

    res.render("viewprofile", { loginUserName: userData.name, user: userData });
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.send("Something went wrong");
  }
};


// Show Update Form
// Show Update Profile Form
exports.updateProfileForm = (req, res) => {
  res.render("updateprofile", { loginUserEmail: req.user.email, user: req.user, msg: null });
};

// Handle Profile Update
exports.updateProfile = async (req, res) => {
  const userId = req.user.user_id;
  const photo = req.file ? req.file.filename : req.user.photo;

  const data = {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    qualification: req.body.qualification,
    course: req.body.course,
    skills: req.body.skills,
    photo: photo,
  };

  try {
    const updatedUser = await loginUserModel.updateUser(userId, data);

    const newToken = jwt.sign(
      {
        user_id: updatedUser.user_id,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", newToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.redirect("/viewprofile");
  } catch (err) {
    console.error("Profile update error:", err);
    res.render("updateprofile", {
      loginUserEmail: req.user.email,
      user: req.user,
      msg: "Error updating profile. Please try again.",
    });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
// Logout
