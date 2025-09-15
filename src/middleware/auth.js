const jwt = require("jsonwebtoken");

module.exports = function(role) {
  return (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (role && decoded.role !== role) return res.status(403).send("Forbidden");
      req.user = decoded;
      next();
    } catch (err) {
      console.error("JWT error:", err);
      res.redirect("/login");
    }
  };
};
