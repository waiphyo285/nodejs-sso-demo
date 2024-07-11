const checkAuth = (req, res, next) => {
  //   req.isAuthenticated()
  //     ? ((req.headers.userrole = req.user.role), next())
  //     : ((req.session.redirectTo = req.url), res.redirect("/login"));

  req.isAuthenticated() ? next() : res.redirect("/login");
};

module.exports = checkAuth;
