const ObjectID = require('mongodb').ObjectID;
const Article = require('../models/Article');

const getAll = async () => {
  try {
    const articles = await Article.find();
    return articles;
  } catch (e) {
    showError(e);
  }
}

const create = async (content) => {
  try {
    const article = new Article(content);
    return await article.save();
  } catch (e) {
    showError(e);
  }
}

const update = async (body) => {
  try {
    const {_id, data} = body;
    const filter = {_id: new ObjectID(_id)};
    await Article.findByIdAndUpdate(filter, data);
    return Article.findById(filter);
  } catch (e) {
    showError(e);
  }
}

const deleteArticle = async (_id) => {
  try {
    return await Article.findOneAndDelete({_id});
  } catch (e) {
    showError(e);
  }
}

const showError = (e) => {
  console.log(`Error in Article Controller: ${e}`);
  throw new Error(e);
}

module.exports = {
  getAll,
  create,
  update,
  deleteArticle
};