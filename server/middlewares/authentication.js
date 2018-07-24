var jwt = require('jsonwebtoken');

class Authentication {
  static verifyToken(req, res, next) {
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

  static decodeToken(req, res) {
    const token = req.headers.token;
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(decoded);
          console.log(decoded);
      }
    });
  }
}

module.exports = Authentication;
