const express = require('express');
const router = express.Router();
const { getArticles } = require('../controllers/news_controllers');


router.get("/:category", getArticles)
module.exports = router;
