const express = require("express");

const courseCtrl = require("../controller/courseCtrl");
const registerController = require("../controller/registerController.js");
const loginController= require("../controller/loginController.js");
const upload = require("../middleware/upload.js");
const homepageController = require("../controller/homepageController.js");
const navbarCtrl = require("../controller/navbarCtrl");
const studentController = require("../controller/studentController");
const adminController = require("../controller/adminController.js");
const verifyToken = require("../middleware/verifytoken");
const { isadmin, isUser } = require("../middleware/rolecheck");
console.log("=== Controllers Check ===");
console.log("courseCtrl:", courseCtrl);
console.log("registerController:", registerController);
console.log("loginController:", loginController);
console.log("homepageController:", homepageController);
console.log("navbarCtrl:", navbarCtrl);
console.log("studentController:", studentController);
console.log("adminController:", adminController);

const router = express.Router();

//homepagecontroller actions
router.get("/",homepageController.homepage);
router.get("/about",homepageController.aboutPage);
router.get("/contact",homepageController.contactPage);
//registercontroller
router.get("/register",registerController.register);
router.post("/register", upload.single("photo"),registerController.registerUser);
//logincontroller
router.get("/login",loginController.login);
router.post("/validateuser",loginController.validateLoginUser);
router.get("/viewprofile", verifyToken,loginController.viewProfile);
router.get("/dashboard", verifyToken, loginController.dashboard);
router.get("/admin/dashboard", verifyToken, loginController.dashboard);
router.get("/updateprofile", verifyToken,loginController.updateProfileForm);
router.post("/updateprofile", verifyToken, upload.single("photo"),loginController.updateProfile);
router.get("/logout",loginController.logout);
//admincontroller
router.get("/adminlogin",adminController.adminLogin);
router.post("/adminlogin",adminController.validateAdminLogin);
router.get("/admin/add-admin", verifyToken, adminController.addAdminForm);
router.post("/admin/add-admin", verifyToken,adminController.addAdmin);
router.get("/admin/viewpendingstudent", verifyToken,adminController.viewPendingStudents);
//router.get("/admin/approvestatus/:user_id", verifyToken,adminController.approveStatus);
//router.get("/admin/approve/:user_id", verifyToken,adminController.approveAndRedirect);
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

<<<<<<< Updated upstream



module.exports = router;  */
let express = require("express");

let courseCtrl = require("../controller/courseCtrl");
let registerctrl = require("../controller/registerctrl");
let loginctrl = require("../controller/loginctrl");
let upload = require("../middlleware/upload.js");
let homepagectrl = require("../controller/homepagectrl");
let navbarCtrl = require("../controller/navbarCtrl");
let studentController= require("../controller/studentController.js");
let admincontroller=require("../controller/adminctrl.js")
let verifyToken=require("../middleware/verifytoken.js");
const {isadmin,isUser}=require("../middleware/rolecheck.js");
let performanctrl=require("../controller/performanctrl.js")



let router = express.Router(); 
//*************************************  Manasi Routes*/
router.get("/", homepagectrl.homepage);

router.get("/register", registerctrl.register);
router.post("/register", upload.single("photo"), registerctrl.registerUser);
router.get("/login", loginctrl.login);
router.post("/validateuser", loginctrl.validateLoginUser);
router.get("/adminlogin",admincontroller.adminLogin);
router.post("/adminlogin", admincontroller.validateAdminLogin);
router.get("/viewprofile", verifyToken,loginctrl.viewProfile);
router.get("/dashboard",verifyToken,loginctrl.dashboard);
router.get("/admin/dashboard",verifyToken,loginctrl.dashboard);
router.get("/updateprofile", verifyToken,loginctrl.updateProfileForm);
router.post("/updateprofile",verifyToken,upload.single("photo"), loginctrl.updateProfile);
router.get("/logout",loginctrl.logout);
router.get("/about",homepagectrl.aboutPage);
router.get("/contact",homepagectrl.contactPage);
router.get("/admin/performance/add/:user_id", performanctrl.renderAddForm);
router.post("/admin/performance/add", performanctrl.addPerformance);
router.get("/admin/performance/list", performanctrl.listPerformances);

//*Priyanka Routes************************* */

router.get("/addnavbar", navbarCtrl.navbar);
router.get("/admin/addcourse",courseCtrl.renderAddCourseForm);
router.post("/admin/addcourse", courseCtrl.addCourse);
router.get("/admin/viewcourses", courseCtrl.viewAllCourses);
router.get("/deletecourse/:id", courseCtrl.deleteCourse);
router.post("/deletecourse/:id", courseCtrl.deleteCourse);
router.get("/editcourse/:id", courseCtrl.editCourse);
router.post("/updatecourse/:id", courseCtrl.updateCourse);
//Jainab Routes***************************************** */
router.get("/admin/viewstudent",studentController.viewStudents);
router.get("/admin/viewpendingstudent",admincontroller.viewPendingStudents);
router.get("/admin/approvestatus/:id",admincontroller.approveStatus);
router.get("/admin/approve/:id", admincontroller.approveAndRedirect);


// router.post("/admin/reject/:id",);
router.get("/deletestudent/:id", studentController.deleteStudent);+
router.post("/students/delete/:id",studentController.deleteStudent)
router.post("/editstudent/:id", studentController.editStudent);
router.get("/editstudent/:id", studentController.editStudent);
router.post("/students/update/:id", studentController.updateStudent);
//router.post("/students/toggle/:id",studentController.toggleStudentStatus);

module.exports = router;
=======
module.exports = router;
>>>>>>> Stashed changes
