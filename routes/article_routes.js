const Articles = require('../models/Article');
const express = require('express');
const router = express.Router();

router.put('/like/:id', async function (req, res) {

    let article = await Articles.findById(req.params.id)
    article.likes.push('liked')
    
    Articles.findByIdAndUpdate(req.params.id, article, {
        new: true
    }).exec((err, article) => {
        res.send(article)
    })

})

router.put('/comment/:id', async function (req, res) {
    let article = await Articles.findById(req.params.id)
    let newComment = {
        username: req.body.username,
        comment: req.body.comment
    }
    article.comments.push(newComment)
    Articles.findByIdAndUpdate(req.params.id, article, {
        new:true
    }).exec((err, article) => {
        res.send(article)
    })
})

module.exports = router