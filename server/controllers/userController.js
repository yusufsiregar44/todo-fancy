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
          .status(500)
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
            id: userData._id,
            name: userData.name,
            email: userData.email,
            fbid: userData.fbid
          }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
            if (err) {
              res
                .status(500)
                .send(err)
            } else {
              res
                .status(200)
                .send(newlyCreatedJwtToken)
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
                id: newlyRegistredUserData._id,
                name: newlyRegistredUserData.name,
                email: newlyRegistredUserData.email,
                fbid: newlyRegistredUserData.fbid,
              }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
                if (err) {
                  res
                    .status(500)
                    .send(err)
                } else {
                  res
                    .status(200)
                    .send(newlyCreatedJwtToken)
                }
              });
            });
        })
    });
  }

  static login(req, res) {
    user.find({
      email: req.body.email,
    })
    .then((userData) => {
      bcrypt.compare(req.body.password, userData[0].password, function (err, response) {
        console.log(response);
        if (err) {
          res
            .status(500)
            .send(err)
        } else {
          if (response === false) {
            res
              .status(401)
              .send(err)
          } else {
            jwt.sign({
              id: userData[0]._id,
              name: userData[0].name,
              email: userData[0].email,
            }, process.env.JWT_SECRET_KEY, function (err, newlyCreatedJwtToken) {
              if (err) {
                res
                  .status(500)
                  .send(err)
              } else {
                console.log(newlyCreatedJwtToken);
                res
                  .status(200)
                  .send(newlyCreatedJwtToken)
              }
            });
          }
        }
      });
    })
    .catch((err) => {
      res
        .status(400)
        .send(err)
    })
  }
}

module.exports = UserController;
