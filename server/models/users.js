const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object,
    required: false,
    contains: {
      url: {
        type: String,
      },
      publicID: {
        type: String,
      },
    },
  },
  createdOn: {
    type: Date,
    default: new Date(),
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = User = mongoose.model('Users', UserSchema);
