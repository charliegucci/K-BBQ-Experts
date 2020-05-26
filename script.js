const root_url = 'http://localhost:5000';

fetch(root_url + `/news`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    // Wilson- you can start manipulating the DOM here
    // Data is an array of news article objects
    let list = document.getElementById('news');

    for (i = 0; i < data.length; i++) {
      let container = document.createElement('div');
      container.style.padding = '3rem';
      container.style.wordWrap = 'break-word';
      container.style.border = 'thin solid #000';
      container.style.margin = ' 2rem 1rem';
      container.style.backgroundColor = '#dfdfdf';
      let headlines = document.createElement('h2');
      headlines.innerHTML = data[i].headline;
      container.appendChild(headlines);
      let content = document.createElement('p');
      for (sentence of data[i].content) {
        content.innerHTML = content.innerHTML + ' ' + sentence;
      }
      container.appendChild(content);
      let reference = document.createElement('a');
      reference.setAttribute('href', data[i].url);
      reference.setAttribute('target', '_blank');
      reference.innerHTML = data[i].url;
      container.appendChild(reference);
      list.appendChild(container);
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
