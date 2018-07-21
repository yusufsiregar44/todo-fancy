const mongoose = require('mongoose');
const post = require('../models/post');
const user = require('../models/user')
var jwt = require('jsonwebtoken');

class TodoController {
  static addNewTodo(req, res) {
    let token = req.headers.token;
    jwt.verify(token, "secret", (err, decoded) => {
      user.find({
        id: decoded.username
      }, (err, currentUser) => {
        // console.log('hahaha ', currentUser)
        let id = currentUser[0].id;
        post.create({
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

  static getTodoByUserfunction(req, res) {
    postController.addNewTodo(req, res);
  }
  Id(req, res) {
    post.find({
        owner: req.params.userId,
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
  }

}

module.exports = TodoController;
