const mongoose = require('mongoose');
const todo = require('../models/todo');
const user = require('../models/user');
var jwt = require('jsonwebtoken');
require('dotenv');

class TodoController {
  static createTodo(req, res) {
    let token = req.headers.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    todo.create({
      content: req.body.content,
      owner: decoded.id,
    }, function (err, response) {
      if (err) {
        res
          .status(500)
          .send(err);
      } else {
        res
          .status(200)
          .send(response)
      }
    });
  }

}

module.exports = TodoController;
