const root_url = 'http://localhost:5000';

fetch(root_url + `/scrape`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Wilson- you can start manipulating the DOM here
    // Data is an array of news article objects
    let list = document.getElementById('news');
    for (i = 0; i < data.length; i++) {
      let headlines = document.createElement('h2');
      headlines.innerHTML = data[i].heading;
      list.appendChild(headlines);
      let content = document.createElement('p');
      content.innerHTML = data[i].content;
      list.appendChild(content);
      let reference = document.createElement('a');
      reference.setAttribute('href', data[i].url);
      reference.setAttribute('target', '_blank');
      reference.innerHTML = data[i].url;
      list.appendChild(reference);
    }
  })
  .catch((err) => console.log(err));

window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggle() {
  var header = document.querySelector('header');
  header.classList.toggle('active');
}
