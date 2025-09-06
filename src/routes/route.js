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
//*************************************  Manasi Routes***************************************/
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
router.post("/performance/add", performanctrl.addPerformance);
router.get("/list", performanctrl.listPerformances);
router.get("/performance",performanctrl.renderAddForm);

//**********************************Priyanka Routes************************** */

router.get("/addnavbar", navbarCtrl.navbar);
router.get("/admin/addcourse",courseCtrl.renderAddCourseForm);
router.post("/admin/addcourse", courseCtrl.addcourse);
router.get("/admin/viewcourses", courseCtrl.viewallcourses);
router.get("/deletecourse/:id", courseCtrl.deletecourse);
router.post("/deletecourse/:id", courseCtrl.deletecourse);
router.get("/editcourse/:id", courseCtrl.editcourse);
router.post("/updatecourse/:id", courseCtrl.updatecourse);
//*********************************************Jainab Routes****************************************** */
router.get("/admin/viewstudent",studentController.viewStudents);
router.get("/deletestudent/:id", studentController.deleteStudent);
router.post("/students/delete/:id",studentController.deleteStudent)
router.post("/editstudent/:id", studentController.editStudent);
router.get("/editstudent/:id", studentController.editStudent);
router.post("/students/update/:id", studentController.updateStudent);
router.post("/students/toggle/:id",studentController.toggleStudentStatus);




module.exports = router;