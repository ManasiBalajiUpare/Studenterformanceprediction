const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.cookies.token || req.headers["authorization"];

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).redirect("/login");
  }
};




