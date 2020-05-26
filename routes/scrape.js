const express = require('express');
const router = express.Router();
const Article = require('../models/Article.js');
const getNews = require('../scrape');

router.get('/', async (req, res) => {
  console.log('scraping...');
  //   await getNews()
  //     .then((data) => {
  //       console.log(data);
  //       res.send(data);
  //     })
  //     .catch((err) => console.log(err));
  await getNews()
    .then(async function (data) {
      console.log(data);
      for (article of data) {
        let checkHeading = await article.heading;
        let articleContent = await article.content;
        let articleUrl = await article.url;
        Article.findOne({ headline: checkHeading }, (err, article) => {
          if (err) {
            console.log(err);
          }
          if (article) {
            console.log('article saved', checkHeading);
          } else {
            let newArticle = new Article({
              headline: checkHeading,
              content: articleContent,
              url: articleUrl,
            });
            newArticle
              .save()
              .then((item) => {
                console.log('saved', item);
              })
              .catch((err) => console.log(err));
          }
        });
      }
      res.send('hello');
    })
    .catch((err) => console.log(err));
});

module.exports = router;
