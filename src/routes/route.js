let express = require("express");

//let courseCtrl = require("../controller/courseCtrl");
let registerctrl = require("../controller/registerctrl");
let loginctrl = require("../controller/loginctrl");
let upload = require("../middleware/upload");
let homepagectrl = require("../controller/homepagectrl");
let navbarCtrl = require("../controller/navbarCtrl");
console.log("navbarCtrl:", navbarCtrl);


let router = express.Router(); 
router.get("/", homepagectrl.homepage);
router.get("/navbar", navbarCtrl.navbar);
router.get("/register", registerctrl.register);
router.post("/register", upload.single("photo"), registerctrl.registerUser);
router.get("/login", loginctrl.login);
router.post("/validateuser", loginctrl.validateLoginUser);
router.get("/viewprofile", loginctrl.viewProfile);
router.get("/dashboard", loginctrl.dashboard);
//router.post("/addcourse", courseCtrl.addcourse);
router.get("/logout", loginctrl.logout);
router.get("/updateprofile", loginctrl.updateProfileForm);
router.post("/updateprofile", upload.single("photo"), loginctrl.updateProfile);

module.exports = router;
