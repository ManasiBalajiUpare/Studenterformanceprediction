let express = require("express");
let navbarCtrl = require("../controller/navbarCtrl");
let courseCtrl = require("../controller/courseCtrl");
let registerctrl=require("../controller/registerctrl");
let loginctrl=require("../controller/loginctrl");
let upload= require("../middlleware/upload");
let router = express.Router();
router.get("/addnavbar", navbarCtrl.navbar);
router.post("/addcourse", courseCtrl.addcourse);
router.get("/register",registerctrl.register);
router.post("/register", upload.single("photo"), registerctrl.registerUser);
router.get("/login",loginctrl.login);

module.exports = router;