const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true,
  },
  content: [
    {
      type: String,
      required: true,
    },
  ],
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  likes: [
    {
      type: String,
    },
  ],
  comments: [
    {
      username: String,
      comment: String,
    },
  ],
});

module.exports = Article = mongoose.model('Article', ArticleSchema);
