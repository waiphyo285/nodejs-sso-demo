const config = require("..");

const { ALGO, SECRET, SIGN_OPTION, CREDENTIAL } = config.JWT;

module.exports = {
  encodeAlg: ALGO,
  jwtSecret: SECRET,
  jwtExpiry: SIGN_OPTION.EXP1,
  mockedUsername: CREDENTIAL.USER,
  mockedPassword: CREDENTIAL.PASS,

  signOption: {
    issuer: SIGN_OPTION.ISSR,
    subject: SIGN_OPTION.SUBJ,
    audience: SIGN_OPTION.AUDI,
    expiresIn: SIGN_OPTION.EXP2,
    algorithm: SIGN_OPTION.ALGO,
  },
};
