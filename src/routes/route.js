let express = require("express");
let navbarCtrl = require("../controller/navbarCtrl");
let courseCtrl = require("../controller/courseCtrl");
let router = express.Router();
router.get("/addnavbar", navbarCtrl.navbar);
router.post("/addcourse", courseCtrl.addcourse);
module.exports = router;