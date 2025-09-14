const express = require("express");
const homepageController = require("../controller/homepageController.js");
const registerController=require("../controller/registerController.js");
const loginController=require("../controller/loginController.js");
const admincontroller = require("../controller/adminController.js");
const verifyToken = require("../middleware/verifytoken");
const { isadmin, isUser } = require("../middleware/rolecheck");
const upload = require("../middleware/upload.js");
const courseCtrl = require("../controller/courseCtrl");
const navbarCtrl = require("../controller/navbarCtrl");
const studentController = require("../controller/studentController");
const router = express.Router();

// Home & Auth Routes
router.get("/",homepageController.homepage);
router.get("/register", registerController.register);
router.post("/register", upload.single("photo"), registerController.registerUser);
router.get("/login",loginController.login);
router.post("/validateuser",loginController.validateLoginUser);
router.get("/adminlogin",admincontroller.adminLogin);
router.post("/adminlogin",admincontroller.validateAdminLogin);
router.get("/viewprofile", verifyToken,loginController.viewProfile);
router.get("/dashboard", verifyToken,loginController.dashboard);
router.get("/admin/dashboard", verifyToken,loginController.dashboard);
router.get("/updateprofile", verifyToken,loginController.updateProfileForm);
router.post("/updateprofile", verifyToken, upload.single("photo"),loginController.updateProfile);
router.get("/logout",loginController.logout);
router.get("/about",homepageController.aboutPage);
router.get("/contact",homepageController.contactPage);

// Admin - Add Admin
router.get("/admin/add-admin", verifyToken, admincontroller.addAdminForm);
router.post("/admin/add-admin", verifyToken, admincontroller.addAdmin);

// Admin - View Pending Students & Approve
router.get("/admin/viewpendingstudent", verifyToken,admincontroller.viewPendingStudents);
router.get("/admin/approvestatus/:user_id", verifyToken,admincontroller.approveStatus);
//router.get("/admin/approve/:user_id", verifyToken,admincontroller.approveAndRedirect);

// Admin - Performance


// Navbar & Courses
router.get("/addnavbar", navbarCtrl.navbar);
router.get("/admin/addcourse", courseCtrl.renderAddCourseForm);
router.post("/admin/addcourse", courseCtrl.addCourse);
router.get("/admin/viewcourses", courseCtrl.viewallcourses);
router.get("/deletecourse/:id", courseCtrl.deletecourse);
router.post("/deletecourse/:id", courseCtrl.deletecourse);
router.get("/editcourse/:id", courseCtrl.editcourse);
router.post("/updatecourse/:id", courseCtrl.updatecourse);

// Students
router.get("/admin/viewstudent", studentController.viewStudents);
router.get("/deletestudent/:id", studentController.deleteStudent);
router.post("/students/delete/:id", studentController.deleteStudent);
router.post("/editstudent/:id", studentController.editStudent);
router.get("/editstudent/:id", studentController.editStudent);
router.post("/students/update/:id", studentController.updateStudent);

module.exports = router;
//main
