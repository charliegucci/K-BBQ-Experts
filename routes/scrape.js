const express = require('express');
const router = express.Router();
const Article = require('../models/Article.js');
const getNews = require('../scrape');

router.get('/', async (req, res) => {
  console.log('scraping...');
  await getNews()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
