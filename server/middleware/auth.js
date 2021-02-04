const jwt = require("jsonwebtoken");
const authenticate = function (req, res, next) {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    req.decoded = decoded;
    next()
  } catch (err) {
    // res.status(401).json({ msg: "Invalid token" });
    next(err)
  }
};

module.exports = authenticate;