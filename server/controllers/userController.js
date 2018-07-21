const mongoose = require('mongoose');
const FB = require('fb');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
  static registerWithFB(req, res) {
    let userFbAccessToken = req.body.token;

    FB.api('me', {
      fields: ["id", "name", "email"],
      access_token: userFbAccessToken
    }, function (response) {
      user.create({
          email: response.email,
          name: response.name,
          fbId: response.id,
        })
        .then((newlyRegistredUserData) => {
          jwt.sign({
            userId: newlyRegistredUserData._id,
          }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
            if (err) {
              res
                .send(err)
                .status(500);
            } else {
              res
                .send(newlyCreatedJwtToken)
                .status(200);
            }
          });
        });
    });
  }

  static registerWithForm(req, res) {
    bcrypt.hash(req.body.password, 10)
      .then((encryptedPsw) => {
        user.create({
          email: req.body.email,
          name: req.body.name,
          password: encryptedPsw,
        })
        .then((response) => {
          res
            .status(200)
            .send(response);
        })
        .catch((err) => {
          res
            .status(400)
            .send(err);
        });
      })
      .catch((err) => {
        res
          .status(400)
          .send(err);
      });
  }

  static signIn(req, res) {
    
  }
}

module.exports = UserController;
