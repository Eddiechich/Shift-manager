const chalk = require("chalk");

const { verifyToken } = require("../services/token");

function adminAuthorizationMiddlware(req, res, next) {
  const tokenFromClient = req.header("x-auth-token");

  if (!tokenFromClient) {
    console.log(
      chalk.redBright("Authorization Error: User did not sent token!")
    );
    return res.status(401).json("Please Login");
  }
  const userInfo = verifyToken(tokenFromClient);

  if (!userInfo) {
    console.log(chalk.redBright("Authorization Error: Invalid Token!"));
    return res.status(401).json("Invalid  Token!");
  }

  // Extract isAdmin field from userInfo
  req.isAdmin = userInfo.isAdmin;

  return next();
}

module.exports = adminAuthorizationMiddlware;
