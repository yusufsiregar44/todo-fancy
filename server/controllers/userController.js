const mongoose = require('mongoose');
const FB = require('fb');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcrypt');

class UserController {
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

  static loginWithFB(req, res) {
    let userFbAccessToken = req.body.token;

    FB.api('me', {
      fields: ['id', 'name', 'email'],
      access_token: userFbAccessToken
    }, function (response) {
      user.find({
          where: {
            fbId: response.id,
          },
        })
        .then((userData) => {
          console.log('logging in');
          jwt.sign({
            userId: userData._id,
          }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
            if (err) {
              res
                .send(err)
                .status(400);
            } else {
              res
                .send(newlyCreatedJwtToken)
                .status(200);
            }
          });
        })
        .catch(() => {
          console.log('registering');
          user.create({
              email: response.email,
              name: response.name,
              fbid: response.id,
              password: response.name + '12345678',
            })
            .then((newlyRegistredUserData) => {
              jwt.sign({
                userId: newlyRegistredUserData._id,
              }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
                if (err) {
                  res
                    .send(err)
                    .status(400);
                } else {
                  res
                    .send(newlyCreatedJwtToken)
                    .status(200);
                }
              });
            });
        })
    });
  }

  static login(req, res) {
    user.find({
      where: {
        email: req.body.email,
      }
    })
    .then((userData) => {
      
    })
    .catch((err) => {
      res.status(400);
    })
  }
}

module.exports = UserController;
