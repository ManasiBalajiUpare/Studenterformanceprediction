const jwt = require("jsonwebtoken");

/**
 * Middleware to verify JWT token for admin or user
 * @param {string} [role] Optional: "admin" or "user" to restrict access
 */
const verifyToken = (role = null) => {
  return (req, res, next) => {
    let token = req.cookies.token || req.headers["authorization"];

    if (!token) {
      // redirect to login based on role
      if (role === "admin") return res.redirect("/adminlogin");
      return res.redirect("/login");
    }

    // Remove "Bearer " prefix if token comes from header
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Role-based check
      if (role && decoded.role !== role) {
        if (role === "admin") return res.redirect("/adminlogin");
        return res.redirect("/login");
      }

      // Attach decoded info to request
      if (decoded.role === "admin") req.admin = decoded;
      else req.user = decoded;

      next();
    } catch (err) {
      console.error("[JWT ERROR]", err);

      // Clear invalid/expired token
      res.clearCookie("token");

      // Redirect based on role
      if (role === "admin") return res.redirect("/adminlogin");
      return res.redirect("/login");
    }
  };
};

module.exports = verifyToken;
