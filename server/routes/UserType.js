const route = require("express").Router();
const VerifyAuth = require("../middlewares/VerifyAuth");

route.get("/", VerifyAuth, (req, res) => {
  const UserInfo = res.locals;
  res.send(UserInfo);
});

module.exports = route;
