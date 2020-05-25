const {
    getNews
} = require('../scrape')

const getArticles = (req, res) => {
    getNews().then((data) => {
        console.log(data)
        res.send(data)
    })
    .catch((err) => console.log(err))
} 

module.exports = { getArticles }