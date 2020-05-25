const root_url = 'http://localhost:5000';

fetch(root_url + `/scrape`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Wilson- you can start manipulating the DOM here
    // Data is an array of news article objects
  })
  .catch((err) => console.log(err));
