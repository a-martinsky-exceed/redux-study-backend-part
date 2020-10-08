const ObjectID = require('mongodb').ObjectID;
const User = require('../models/User');
const AuthService = require('../services/AuthService');

const register = async (data) => {
  try {
    const user = new User(data);
    return await user.save();
  } catch (e) {
    showError(e);
  }
};

const findByLogin = async (login) => {
  try {
    return await User.findOne({login});
  } catch (e) {
    showError(e);
  }
};

const updateUser = async (data) => {
  try {
    const {_id, login} = data;
    const user = findByLogin(login);
    const filter = {_id: ObjectID(_id)};
    return await User.findByIdAndUpdate(filter, data);
  } catch (e) {
    showError(e);
  }
}

const showError = (e) => {
  console.log(`Error in User Controller: ${e}`);
  throw new Error(e);
};

module.exports = {register, findByLogin, updateUser};