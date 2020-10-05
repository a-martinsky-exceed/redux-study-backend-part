const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  title: {type: String, require: true, max: 100, trim: true},
  body: {type: String, require: true, trim: true},
});

module.exports = mongoose.model('Article', ArticleSchema);
