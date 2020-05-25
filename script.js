const root_url = 'http://localhost:5000'

let articles = null

fetch(root_url+'/news').then((response) => {
    articles = response
    console.log(articles)

    // Wilson do your JS adding the articles in here
    // articles should be populated
})
