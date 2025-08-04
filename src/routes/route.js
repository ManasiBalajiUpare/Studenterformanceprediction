let express = require("express");

let courseCtrl = require("../controller/courseCtrl");
let registerctrl = require("../controller/registerctrl");
let loginctrl = require("../controller/loginctrl");
let upload = require("../middlleware/upload.js");
let homepagectrl = require("../controller/homepagectrl");
let navbarCtrl = require("../controller/navbarCtrl");
let studentController= require("../controller/studentController.js");
let router = express.Router(); 
//*************************************  Manasi Routes***************************************/
router.get("/", homepagectrl.homepage);

router.get("/register", registerctrl.register);
router.post("/register", upload.single("photo"), registerctrl.registerUser);
router.get("/login", loginctrl.login);
router.post("/validateuser", loginctrl.validateLoginUser);
router.get("/viewprofile", loginctrl.viewProfile);
router.get("/dashboard", loginctrl.dashboard);
router.get("/logout", loginctrl.logout);
router.get("/updateprofile", loginctrl.updateProfileForm);
router.post("/updateprofile", upload.single("photo"), loginctrl.updateProfile);




//**********************************Priyanka Routes************************** */

router.get("/addnavbar", navbarCtrl.navbar);
router.get("/addcourse",courseCtrl.renderAddCourseForm);
router.post("/addcourse", courseCtrl.addcourse);
router.get("/viewallcourses", courseCtrl.viewallcourses);
router.get("/deletecourse/:id", courseCtrl.deletecourse);
router.post("/deletecourse/:id", courseCtrl.deletecourse);
router.get("/editcourse/:id", courseCtrl.editcourse);
router.post("/updatecourse/:id", courseCtrl.updatecourse);
//*********************************************Jainab Routes****************************************** */
//router.get("/viewstudent",studentController.viewStudents);
//router.get("/deletestudent/:id", studentController.deleteStudent);
//router.post("/editstudent/:id", studentController.editStudent);
//router.get("/editstudent/:id", studentController.editStudent);
//router.post("/updatestudent/:id", studentController.updateStudent);



module.exports = router;
