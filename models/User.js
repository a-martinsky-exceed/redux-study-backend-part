const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {type: String, max: 25, require: true, unique: true},
  pwd: {type: String, require: true},
  salt: {type: String, require: true},
  username: {type: String, max: 25, require: true, unique: true}
});

module.exports = mongoose.model('User', UserSchema);