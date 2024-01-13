const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the structure of a user object in the database
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: Object,
    required: false,
    contains: {
      url: {
        type: String
      },
      publicID: {
        type: String
      }
    }
  },
  highscores: [
    {
      quiz: {
        type: String,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    }
  ],
  createdOn: {
    type: Date,
    default: new Date()
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

module.exports = User = mongoose.model('Users', UserSchema);
