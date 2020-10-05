const Article = require('../models/Article');

const getAll = async () => {
  try {
    const articles = await Article.find();
    return articles;
  } catch (e) {
    showError(e);
  }
}

const create = async (data) => {
  try {
    const article = new Article(data);
    return await article.save();  
  } catch (e) {
    showError(e);
  }
}

const update = async (data) => {
  try {
    const {id, title, body} = data;
    await Article.findByIdAndUpdate(id, {title, body});
    return Article.findById(id);
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
  update
};