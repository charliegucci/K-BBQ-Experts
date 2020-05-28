const Articles = require('../models/Article');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  Articles.find((err, articles) => {
    if (err) {
      return res.json({
        error: err.message,
      });
    }
    res.send(articles);
  });
});

module.exports = router;
