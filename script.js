const root_url = 'http://localhost:5000';

let country = 'au'

fetch(root_url+`/news/${country}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        // Wilson- you can start manipulating the DOM here
        // Data is an array of news article objects

    })
    .catch((err) => console.log(err))