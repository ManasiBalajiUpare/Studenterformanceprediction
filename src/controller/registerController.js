const bcrypt = require("bcrypt");
const registermodel = require("../models/registermodel");
const courseModel = require("../models/coursemodel");

// Show registration page with courses
exports.register = async (req, res) => {
  try {
    const courses = await courseModel.getAllCourses();  // Fetch all courses from DB
    res.render("register", {
      msg: null,
      showLoginLink: false,
      courses  // Pass courses to EJS
    });
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.send("Error loading registration page.");
  }
};

// Handle user registration
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      confirm_password,
      address,
      contact,
      qualification,
      course,
      skills
    } = req.body;

    const existingUser = await registermodel.getUserByEmail(email);
    if (existingUser) {
      return res.render("register", {
        msg: "User already exists. Please login.",
        showLoginLink: true,
        courses: await courseModel.getAllCourses()  // Reload courses
      });
    }

    if (password !== confirm_password) {
      return res.render("register", {
        msg: "Passwords do not match.",
        showLoginLink: false,
        courses: await courseModel.getAllCourses()  // Reload courses
      });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const userData = {
      name,
      email,
      password: hashedPassword,
      address,
      contact,
      qualification,
      course,
      skills,
      photo: req.file ? req.file.filename : null
    };

    await registermodel.insertUser(userData);

    return res.render("login", { msg: "Registration successful. Please login." });

  } catch (err) {
    console.error("Registration Error:", err);
    res.render("register", {
      msg: "Something went wrong during registration.",
      showLoginLink: false,
      courses: await courseModel.getAllCourses()  // Reload courses
    });
  }
};
