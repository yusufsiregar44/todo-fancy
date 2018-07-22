var jwt = require('jsonwebtoken');
require('dotenv');

function verifyToken(req, res, next) {
  const token = req.headers.token;
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        next();
      }
    }
  );
}

module.exports = verifyToken;
