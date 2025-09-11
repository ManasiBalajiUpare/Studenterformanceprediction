const bcrypt = require("bcrypt");
const registermodel = require("../models/registermodel");

// Show registration page
exports.register = (req, res) => {
  res.render("register", { msg: null, showLoginLink: false });
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

    // 1. Check if email already exists
    const existingUser = await registermodel.getUserByEmail(email);
    if (existingUser) {
      return res.render("register", {
        msg: "User already exists. Please login.",
        showLoginLink: true
      });
    }

    // 2. Check password match
    if (password !== confirm_password) {
      return res.render("register", {
        msg: "Passwords do not match.",
        showLoginLink: false
      });
    }

    // 3. Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // 4. Prepare user data
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

    // 5. Insert user into database
    await registermodel.insertUser(userData);

    // 6. On success → redirect to login page
    return res.render("login", { msg: "Registration successful. Please login." });

  } catch (err) {
    console.error("Registration Error:", err);
    return res.render("register", {
      msg: "Something went wrong during registration.",
      showLoginLink: false
    });
  }
};




// Shubham Logics 

