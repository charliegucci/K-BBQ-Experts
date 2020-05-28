const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('32ef6b88f45042758d911b23df94e868');
const re = new RegExp('(covid\-19|coronavirus|corona|covid)', 'i')

const getArticles = (req, res) => {
    newsapi.v2.topHeadlines({
        language: 'en',
        category: req.params.category
        }).then((data) => {
            let filtered = []
            for (article of data.articles) {
                if (!re.test(article.title) && !re.test(article.content)) {
                    filtered.push(article)
                }
            }
            // console.log(filtered)
            // console.log(filtered.length)
            res.send(filtered)
        });
} 

module.exports = { getArticles }