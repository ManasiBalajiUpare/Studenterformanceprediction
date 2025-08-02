let express=require("express");
const dotenv=require("dotenv");
let pool=require("../db.js");
const path = require("path");
dotenv.config();
let session=require("express-session");

let router=require("./routes/route.js");




let bodyparser=require("body-parser");
let app=express();
app.use(express.static("public"));//inbuilt middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use(session({
   secret:"manzaipri04051819",
    resave:false,
    saveUninitialized:true

}))
app.set("view engine","ejs");
app.use("/",router);

module.exports=app;