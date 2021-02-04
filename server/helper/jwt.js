const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, 'secretKey');
}

module.exports = { generateToken };