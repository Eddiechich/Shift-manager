const bcrypt = require("bcryptjs");
//A library to help you hash passwords.
//Optimized bcrypt in JavaScript with zero dependencies. Compatible to the C++ bcrypt binding on node.js and also working in the browser.
function generateHashPassword(pass) {
  return bcrypt.hashSync(pass, 12);
}

function comparePassword(password, anotherPassword) {
  return bcrypt.compareSync(password, anotherPassword);
}

module.exports = { generateHashPassword, comparePassword };
