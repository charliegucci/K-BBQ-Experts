const express = require('express');
const router = express.Router();
const { 
    getArticles
} = require('../controllers/news_controllers')


router.get("/", setConnectionTimeout('12h'), getArticles)



module.exports = router