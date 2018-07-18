const mongoose = require('mongoose');
const FB = require('fb');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcrypt');

class userController {
  static registerWithFB(req, res) {
    let userFbAccessToken = req.body.token;

    FB.api('me', {
      fields: ["id", "name", "email"],
      access_token: userFbAccessToken
    }, function(response) {
      user.create({
          email: response.email,
          name: response.name,
          fbId: response.id,
        })
        .then((newlyRegistredUserData) => {
          jwt.sign({
            userId: newlyRegistredUserData._id,
          }, process.env.JWT_SECRET_KEY, function(err, newlyCreatedJwtToken) {
            if (err) {
              res.send(err)
              res.status(500);
            }
            res
              .send(newlyCreatedJwtToken)
              .status(200);
          })
        })
    })
  }

  static registerWithForm(req, res) {
    let encryptedPsw = bcrypt.hash(req.password, 10, function (err, hash) {
      return hash;
    })
    user.create({
      email: req.email,
      name: req.name,
      password: encryptedPsw,
    })
    .then((newlyRegistredUserData) => {
      jwt.sign({
        userId: newlyRegistredUserData._id,
      }, process.env.JWT_SECRET_KEY, function(err, newlyCreatedJwtToken) {
        if (err) {
          res
            .send(err)
            .status(500);
        }
        res
          .send(newlyCreatedJwtToken)
          .status(200);
      })
    })
    .catch((err) => {
      res
        .send(err)
        .status(400);
    })
  }
}
