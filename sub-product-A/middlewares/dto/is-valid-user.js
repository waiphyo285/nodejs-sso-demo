const config = require("@config");

const SSO_HOST = config.SSO.SIGN_IN;
const SSO_WEBHOOK = config.SSO.WEBHOOK;

const checkAuth = (req, res, next) => {
  //   req.isAuthenticated()
  //     ? ((req.headers.userrole = req.user.role), next())
  //     : ((req.session.redirectTo = req.url), res.redirect("/login"));

  req.isAuthenticated()
    ? next()
    : res.redirect(`${SSO_HOST}/sso?webhook=${SSO_WEBHOOK}`);
};

module.exports = checkAuth;
