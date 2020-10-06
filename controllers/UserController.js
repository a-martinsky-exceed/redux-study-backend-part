const User = require('../models/User');

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

const showError = (e) => {
  console.log(`Error in User Controller: ${e}`);
  throw new Error(e);
};

module.exports = {register, findByLogin};