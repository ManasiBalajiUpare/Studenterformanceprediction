//const db = require("../db"); // ✅ correct relative path to db.js

//exports.getAllStudents = (callback) => {
  //const sql = "SELECT * FROM students";
  //db.query(sql, (err, results) => {
    //if (err) return callback(err, null);
    //callback(null, results);
  //});
//};


const db = require("../db");

exports.getAllStudents = (callback) => {
  const sql = "SELECT * FROM students";
  db.query(sql, (err, results) => {
    callback(err, results);
  });
};
