const { validateToken } = require("../tools/authentication");
const { error } = require("../tools/response");

const authenticate = ({ cookies: { access_token } }, res, next) => {
  try {
    validateToken(access_token);
    next();
  } catch (e) {
    res.status(401).send(error(e.message));
  }
};

module.exports = { authenticate };
