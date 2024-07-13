const jwt = require("jsonwebtoken");
const authConfig = require("@config/settings/auth");

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers["authorization"];

    token =
      token && token.startsWith("Bearer ")
        ? token.slice(7, token.length)
        : undefined;

    return jwt.verify(token, authConfig.jwtSecret, (err, decode) =>
      err ? res.json({ err }) : next()
    );
  },
  signToken: (payload) => {
    return jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiry,
    });
  },
};
