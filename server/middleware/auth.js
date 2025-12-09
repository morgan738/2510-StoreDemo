const { findUserByToken } = require("../db/auth");

const isLoggedIn = async (req, res, next) => {
  const user = await findUserByToken(req.headers.authorization);
  req.user = user;
  next();
};

module.exports = {
  isLoggedIn,
};
