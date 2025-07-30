//const studentModel = require("../models/studentModel"); // ✅ correct path

//exports.viewStudents = (req, res) => {
  //studentModel.getAllStudents((err, students) => {
    //if (err) {
      //return res.status(500).send("Database error");
    //}
    //res.render("viewStudents", { students });
  //});
//};

//const db = require("../db"); // adjust based on your actual db file
//const studentModel = require("../models/studentModel");
//exports.viewStudents = (req, res) => {
  //const sql = "SELECT * FROM students"; // use your actual table name

  //db.query(sql, (err, result) => {
    //if (err) {
      //console.log("Error fetching students:", err);
      //return res.status(500).send("Database error");
    //}
    //res.render("viewstudent", { students: result });
  //});
//};
const studentModel = require("../models/studentModel");

exports.viewStudents = (req, res) => {
  studentModel.getAllStudents((err, data) => {
    if (err) {
      return res.status(500).send("DB Error");
    }
    res.render("viewstudent", { students: data });
  });
};
