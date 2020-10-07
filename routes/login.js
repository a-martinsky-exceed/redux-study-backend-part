const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const AuthService = require('../services/AuthService');

router.post('/register', async (req, res) => {
  try {
    const {login, password, username} = req.body;
    const hash = await AuthService.handlerPasswordToHash(password);
    const pwd = hash.pwdHash;
    const {salt} = hash;
    const userObj = {login, pwd, salt, username};
    const newUser = await UserController.register(userObj);
    res.send({result: {success: true, username: newUser.username}});
  } catch (e) {
    console.log(e.message);
    if (e.name === 'MongoError' && e.code === 11000) {
      return res.status(422).send({result: { succes: false, message: 'User already exist!' }});
    }
    res.status(422).send({ message: e.message})
  }
});

router.post('/', async (req, res) => {
  try {
    const {login, password} = req.body;
    const user = await UserController.findByLogin(login);
    if (user) {
      const {pwd, salt} = user;
      const result = AuthService.validatePassword(password, pwd, salt);
      res.send({result: {validate: result}});
    } else {
      res.status(404).send({result: {validate: false, message: `Find no users by login ${login}`}});
    }
  } catch (e) {
    console.log(e.message);
    res.status(422).send({ result: {validate: false, message: e.message}})
  }
})

module.exports = router;