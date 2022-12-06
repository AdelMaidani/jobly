const jwt = require("jsonwebtoken");

const VerifyAuth = function (req, res, next) {
  const cookie = req.cookies.Jobly;

  try {
    const token = jwt.verify(cookie, process.env.TOKEN);
    res.locals = {
      _id: token._id,
      userType: token.type,
    };
    next();
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = VerifyAuth;
