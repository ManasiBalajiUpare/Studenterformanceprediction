const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const router = require("./routes/route.js");  // Your routes file

dotenv.config();

const app = express();

// Serve static files (optional: avoid duplicates)
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

// Body parsers
app.use(express.urlencoded({ extended: true }));  // For form submissions
app.use(express.json());                         // For JSON APIs

// Parse cookies
app.use(cookieParser());

// Set EJS as view engine
app.set("view engine", "ejs");

// Main routing
app.use("/", router);

// Global error handler for invalid JSON (optional but good)
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({ error: "Invalid JSON format" });
    }
    next();
});

module.exports = app;
