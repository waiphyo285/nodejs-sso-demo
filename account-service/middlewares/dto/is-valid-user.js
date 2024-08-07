const checkAuth = (req, res, next) => {
  //   req.isAuthenticated()
  //     ? ((req.headers.userrole = req.user.role), next())
  //     : ((req.session.redirectTo = req.url), res.redirect("/login"));

  const redirectUrl = req.query.webhook || "";
  req.isAuthenticated()
    ? next()
    : res.redirect(`/login?webhook=${redirectUrl}`);
};

module.exports = checkAuth;
