const bcrypt = require('bcrypt');

const handlerPasswordToHash = async (password) => {
  const salt = bcrypt.genSaltSync(10);
  const pwdHash = bcrypt.hashSync(password, salt);
  return { pwdHash, salt }
};

const validatePassword = (password, pwdHash, salt) => {
  const hash = bcrypt.hashSync(password, salt);
  return pwdHash === hash;
};

module.exports = {handlerPasswordToHash, validatePassword};