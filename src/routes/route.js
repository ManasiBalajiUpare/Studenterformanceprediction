/*const express = require("express");
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
console.log(admincontroller);


// Home & Auth Routes
router.get("/",homepageController.homepage);
router.get("/register", registerController.register);
router.post("/register", upload.single("photo"), registerController.registerUser);
router.get("/login",loginController.login);
router.post("/validateuser",loginController.validateLoginUser);
router.get("/viewprofile", verifyToken,loginController.viewProfile);
router.get("/dashboard", verifyToken,loginController.dashboard);
router.get("/updateprofile", verifyToken,loginController.updateProfileForm);
router.post("/updateprofile", verifyToken, upload.single("photo"),loginController.updateProfile);
router.get("/logout",loginController.logout);
router.get("/about",homepageController.aboutPage);
router.get("/contact",homepageController.contactPage);

// Admin - Add Admin
router.get("/adminlogin",admincontroller.adminLogin);
router.post("/adminlogin",admincontroller.validateAdminLogin);
router.get("/admin/dashboard",admincontroller.adminDashboard);
router.get("/admin/add-admin", verifyToken, admincontroller.addAdminForm);
router.post("/admin/add-admin", verifyToken, admincontroller.addAdmin);
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
//main*/
const express = require("express");
const router = express.Router();

const homepageController = require("../controller/homepageController.js");

const registerController = require("../controller/registerController.js");
const loginController = require("../controller/loginController.js");
const admincontroller = require("../controller/adminController");
const courseCtrl = require("../controller/courseCtrl");
const studentController = require("../controller/studentController");
const navbarCtrl = require("../controller/navbarCtrl");
const perCtrl=require("../controller/performanceController.js");
const upload = require("../middleware/upload.js");
const verifyToken = require("../middleware/verifyToken");

// ----------------- Home & Auth -----------------
router.get("/addnavbar", navbarCtrl.navbar);
router.get("/", homepageController.homepage);
router.get("/register", registerController.register);
router.post("/register", upload.single("photo"), registerController.registerUser);

router.get("/login", loginController.login);
router.post("/validateuser", loginController.validateLoginUser);

// ----------------- User Routes -----------------
router.get("/dashboard", verifyToken("user"), loginController.dashboard);
router.get("/viewprofile", verifyToken("user"), loginController.viewProfile);
router.get("/updateprofile", verifyToken("user"), loginController.updateProfileForm);
router.post("/updateprofile", verifyToken("user"), upload.single("photo"), loginController.updateProfile);

router.get("/logout", verifyToken("user"), loginController.logout);

// ----------------- Static Pages -----------------
router.get("/about", homepageController.aboutPage);
router.get("/contact", homepageController.contactPage);

// ----------------- Admin Routes -----------------
router.get("/adminlogin", admincontroller.adminLogin);
router.post("/adminlogin", admincontroller.validateAdminLogin);

router.get("/admin/dashboard", verifyToken("admin"), admincontroller.adminDashboard);
router.get("/admin/add-admin", verifyToken("admin"), admincontroller.addAdminForm);
router.post("/admin/add-admin", verifyToken("admin"), admincontroller.addAdmin);

router.get("/admin/viewpendingstudent", verifyToken("admin"), admincontroller.viewPendingStudents);
router.get("/admin/approvestatus/:user_id", verifyToken("admin"), admincontroller.approveStatus);
router.get("/admin/logout", verifyToken("admin"), admincontroller.logout);

// ----------------- Admin Courses ----------------- priyanka
router.get("/admin/addcourse", verifyToken("admin"), courseCtrl.renderAddCourseForm);
router.post("/admin/addcourse", verifyToken("admin"), courseCtrl.addCourse);
router.get("/admin/viewcourses",verifyToken("admin"), courseCtrl.viewAllCourses);
router.post("/admin/deletecourse/:id", verifyToken("admin"), courseCtrl.deleteCourse);
router.post("/admin/updatecourse/:id", verifyToken("admin"), courseCtrl.updateCourse);
router.get("/deletecourse/:id",verifyToken("admin"),courseCtrl.deleteCourse);
router.get("/editcourse/:id", verifyToken("admin"),courseCtrl.editCourse);
router.post("/updatecourse/:id",verifyToken("admin"), courseCtrl.updateCourse);
router.get("/viewallcourses",courseCtrl.viewAllCourses);
router.get("/user/view",courseCtrl.viewCoursesForUser);

// ----------------- Admin Students -----------------
router.get("/admin/viewstudent", verifyToken("admin"), studentController.viewStudents);
router.post("/admin/deletestudent/:id", verifyToken("admin"), studentController.deleteStudent);
router.post("/admin/updatestudent/:id", verifyToken("admin"), studentController.updateStudent);
router.post("/performance",perCtrl.addPerformance);
module.exports = router;

