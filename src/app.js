/* let express=require("express");
const dotenv=require("dotenv");
let pool=require("../db.js");
const path = require("path");
dotenv.config();
let cookieparser=require("cookie-parser");
let router=require("./routes/route.js");




let bodyparser=require("body-parser");
const cookieParser = require("cookie-parser");
let app=express();
app.use(express.static("public"));//inbuilt middleware
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.set("view engine","ejs");
app.use("/",router);

module.exports=app; */
let express = require("express");
const dotenv = require("dotenv");
let pool = require("../db.js");
const path = require("path");
dotenv.config();
let cookieparser = require("cookie-parser");
let router = require("./routes/route.js");
let bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

let app = express();

// Serve static files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));

// Parse URL-encoded bodies (form submissions)
app.use(bodyparser.urlencoded({ extended: true }));

// Only parse JSON for API routes (avoid GET/EJS pages issue)
app.use("/api", express.json());

// Parse cookies
app.use(cookieParser());

// View engine
app.set("view engine", "ejs");

// Main router
app.use("/", router);

// Handle invalid JSON globally without breaking app
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
  next();
});

module.exports = app;
