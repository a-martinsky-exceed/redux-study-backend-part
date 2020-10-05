const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');

router.get('/', async (_, res) => {
  try {
    const list = await ArticleController.getAll();
    res.send(list);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})

router.post('/add', async (req, res) => {
  try {
    const article = await ArticleController.create(req.body);
    res.send(article);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})

router.post('/update', async (req, res) => {
  try {
    const article = await ArticleController.update(req.body);
    res.send(article);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})


module.exports = router;