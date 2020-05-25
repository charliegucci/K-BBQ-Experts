const root_url = 'http://localhost:5000';

let articles = null;

  header.classList.toggle('sticky', window.scrollY > 0);
window.addEventListener('scroll', function () {
  var header = document.querySelector('header');
});

  var header = document.querySelector('header');
function toggle() {
  header.classList.toggle('active');
}

const listArticles = async function () {
  const articles = await fetch(root_url + '/news').then((response) =>
    response.json()
  );
  console.log(articles);
  return articles;
};

listArticles().then((response) => {
  let newsEle = document.getElementById('news');
  newsEle.innerHTML = response;
});
