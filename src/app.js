let express=require("express");
const dotenv=require("dotenv");
let conn=require("../db.js");
const path = require("path");

let router=require("./routes/route.js");



dotenv.config();
let bodyparser=require("body-parser");
let app=express();
app.use(express.static("public"));//inbuilt middleware
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use("/",router);

module.exports=app;