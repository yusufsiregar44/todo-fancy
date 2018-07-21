var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.token;
  console.log(token);
  next();
}

module.exports = verifyToken;
