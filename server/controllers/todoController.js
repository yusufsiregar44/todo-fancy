const mongoose = require('mongoose');
const todo = require('../models/todo');
const user = require('../models/user');
var jwt = require('jsonwebtoken');
require('dotenv');

class TodoController {
  static addNewTodo(req, res) {
    let token = req.headers.token;
    jwt.verify(token, process, (err, decoded) => {
      user.find({
        username: decoded.username
      }, (err, currentUser) => {
        // console.log('hahaha ', currentUser)
        let id = currentUser[0].id;
        todo.create({
            content: req.body.content,
            owner: mongoose.Types.ObjectId(id),
          })
          .then((response) => {
            res.json(response);
          })
          .catch((err) => {
            res
              .status(400)
              .send(err);
          });

      })
    })
  }

}

module.exports = TodoController;
