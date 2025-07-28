let registermodel=require("../models/registermodel");
const bcrypt = require("bcrypt");

exports.register=(req,res)=>{
    res.render("register");
    console.log("hello");
}
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, confirm_password, address, contact, qualification, course, skills } = req.body;

    // Password match validation
    if (password !== confirm_password) {
      return res.send("Passwords do not match");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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

    registerModel.insertUser(userData, (err, result) => {
      if (err) {
        console.error(err);
        return res.send("Error inserting user");
      }
      res.send("User registered successfully!");
    });

  } catch (err) {
    console.error(err);
    res.send("Something went wrong");
  }
};
