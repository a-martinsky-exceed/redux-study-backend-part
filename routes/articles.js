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
    const {title, body} = req.body;
    const article = await ArticleController.create({title, body});
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


router.post('/delete', async (req, res) => {
  try {
    const {_id} = req.body;
    await ArticleController.deleteArticle(_id);
    res.send({_id, deleted: true});
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})

module.exports = router;