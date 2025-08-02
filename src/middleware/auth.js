

exports.isAuthenticated= (req, res, next) => {
  if (!req.session.loginUserId) {
    // User is not logged in
    return res.redirect("/login");
  }
  
  next();
};
