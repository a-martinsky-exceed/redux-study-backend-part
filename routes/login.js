const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthController = require('../controllers/AuthController');

router.post('/register', async (req, res) => {
  try {
    const {login, password, username} = req.body;
    const hash = await AuthController.handlerPasswordToHash(password);
    const pwd = hash.pwdHash;
    const {salt} = hash;
    const userObj = {login, pwd, salt, username};
    const newUser = await UserController.register(userObj);
    res.send({username: newUser.username});
  } catch (e) {
    console.log(e);
    res.send(e)
  }
});

router.post('/', async (req, res) => {
  try {
    const {login, password} = req.body;
    const user = await UserController.findByLogin(login);
    if (user) {
      const {pwd, salt} = user;
      const result = AuthController.validatePassword(password, pwd, salt);
      res.send(result);
    } else {
      res.status(404).send({result: `Find no users by login ${login}`});
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})

module.exports = router;