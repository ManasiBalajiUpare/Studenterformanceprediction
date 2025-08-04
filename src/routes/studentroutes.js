const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

//app.use("/students", studentRoutes);
//const studentRoutes = require('./src/routes/studentRoute');
//app.use('/', studentRoutes);

router.get('/', studentController.homepage);
router.get("/viewstudent", studentController.viewStudents);
//router.get("/addstudent", studentController.addStudentForm);
//router.post("/addstudent", studentController.addStudent);
router.post('/deletestudent/:id', studentController.deleteStudent);
router.get('/editstudent/:id', studentController.editStudent);
router.post('/updatestudent/:id', studentController.updateStudent);
module.exports = router;