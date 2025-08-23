const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
    
  }
  console.log("isadmin"); 
  return res.status(403).send("Access denied. Admins only.");
};
const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res.status(403).send("Access denied. Users only.");
};
