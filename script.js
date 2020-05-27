const root_url = 'https://nocovidhere.herokuapp.com';

fetch(root_url + `/news`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    // Wilson- you can start manipulating the DOM here
    // Data is an array of news article objects
    let list = document.getElementById('news');
    for (i = 0; i < data.length; i++) {
      let page = document.createElement('a');
      page.setAttribute('href', '#');
      page.setAttribute('onclick', `showPage(${i + 1} ); return false;`);
      page.innerHTML = i + 1 + ' ';
      list.appendChild(page);
    }
    for (i = data.length - 1; i >= 0; i--) {
      let container = document.createElement('div');
      container.setAttribute('class', 'news-div');
      container.setAttribute('id', `item${i + 1}`);
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
      content.style.height = '200px';
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
        } else {
          content.style.height = '200px';
          reference.innerHTML = '...Read More';
        }
      });
      list.appendChild(container);
    }

    // let count = data.length - 1
  })
  .catch((err) => console.log(err));

window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggle() {
  const header = document.querySelector('header');
  header.classList.toggle('active');
}

window.showPage = function (item) {
  $('.content #news .news-div:not(#item' + item + ')').hide();
  $('.content #news .news-div#item' + item).show();
};

$(document).ready(function () {
  showPage(1);
});
