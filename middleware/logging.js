const { validateToken } = require("../tools/authentication");
const { error } = require("../tools/response");

const logging = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  // TODO: log to file
  next();
};

module.exports = { logging };
