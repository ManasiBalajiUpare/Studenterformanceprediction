const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");


router.get("/viewstudent", studentController.viewStudents);

module.exports = router;
