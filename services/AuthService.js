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

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

module.exports = {handlerPasswordToHash, validatePassword, uuidv4};