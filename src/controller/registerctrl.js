const bcrypt = require("bcrypt");
const registermodel = require("../models/registermodel");

exports.register = (req, res) => {
  res.render("register"); // render register page
};

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

    if (password !== confirm_password) {
      return res.send("Passwords do not match");
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

    res.send("User registered successfully!");
  } catch (err) {
    console.error("Registration Error:", err);
    res.send("Something went wrong");
  }
};
