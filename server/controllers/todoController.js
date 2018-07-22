const mongoose = require('mongoose');
const todo = require('../models/todo');
const user = require('../models/user');
var jwt = require('jsonwebtoken');
require('dotenv');

class TodoController {
  static create(req, res) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    todo.create({
      content: req.body.content,
      owner: decoded._id,
    }, function (err, response) {
      if (err) {
        res
          .status(500)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static update(req, res) {
    todo.findByIdAndUpdate(req.params.id, {
      content: req.body.content,
    }, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static delete(req, res) {
    todo.findByIdAndDelete(req.params.id, function (err, response) {
      if (err) {
        res
          .status(400)
          .send(err);
      } else {
        res
          .status(200)
          .send(response);
      }
    });
  }

  static read(req, res) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    todo.find({
      owner: decoded._id,
    })
    .then((todoData) => {
      res
        .status(200)
        .send(todoData);
    })
    .catch((err) => {
      res
        .status(400)
        .send(todoData);
    });
  }
}

module.exports = TodoController;
