const root_url = 'https://nocovidhere.herokuapp.com';

fetch(root_url + `/news`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Wilson- you can start manipulating the DOM here
    // Data is an array of news article objects
    let list = document.getElementById('news');

    for (i = data.length - 1; i >= 0; i--) {
      let container = document.createElement('div');
      container.setAttribute('id', 'news-item');
      container.style.padding = '3rem';
      container.style.wordWrap = 'break-word';
      container.style.border = 'thin solid #000';
      container.style.margin = ' 2rem 1rem';
      container.style.backgroundColor = '#dfdfdf';
      let headlines = document.createElement('h2');
      headlines.innerHTML = data[i].headline;
      container.appendChild(headlines);
      let content = document.createElement('p');
      content.setAttribute('id', `content${i}`);
      // content.style.backgroundColor = 'blue'
      content.style.height = '190px';
      content.style.overflow = 'hidden';
      for (sentence of data[i].content) {
        content.innerHTML = content.innerHTML + ' ' + sentence;
      }
      container.appendChild(content);
      let reference = document.createElement('a');
      reference.setAttribute('id', `read-more-${i}`);
      reference.setAttribute('class', 'expand-btn');
      // reference.setAttribute('href', data[i].url);
      // reference.setAttribute('target', '_blank');
      reference.setAttribute('type', 'button');

      reference.innerHTML = '...Read More';
      container.appendChild(reference);
      reference.addEventListener('click', () => {
        if (reference.innerHTML == '...Read More') {
          content.style.height = 'auto';
          reference.innerHTML = 'close';
          let link = document.createElement('a');
          link.setAttribute('href', data[i].url);
          link.setAttribute('target', '_blank');
          content.appendChild(link);
        } else {
          content.style.height = '190px';
          reference.innerHTML = '...Read More';
        }
      });
      list.appendChild(container);
    }

    // let count = data.length - 1
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
