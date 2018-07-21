const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  importance: {
    type: Number,
    required: true,
    enum: [1, 2, 3],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// content character limit will be decided later on

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
