const conn=require("../../db.js");

exports.insertUser = (userData, callback) => {
  const sql = `INSERT INTO users 
    (name, email, password, address, contact, qualification, course, skills, photo) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    userData.name,
    userData.email,
    userData.password,
    userData.address,
    userData.contact,
    userData.qualification,
    userData.course,
    userData.skills,
    userData.photo
  ];

  db.query(sql, values, callback);
};
