const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  profileImage: {
    type: String,
    require: true
  },
  catalogs: [{
    type: String
  }],
},{timestamps: true});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel