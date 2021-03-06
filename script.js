const root_url = 'https://nocovidhere.herokuapp.com';

const weather_url = 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/'
const brisbane = ['24741', 'Brisbane']
const goldCoast = ['13978', 'Gold Coast']
const perth = ['26797', 'Perth']
const sydney = ['22889', 'Sydney']
const melbourne = ['26216', 'Melbourne']
const adelaide = ['25257', 'Adelaide']
const darwin = ['13718', 'Darwin']
const api = '?apikey=yxnvCofyk65LhE6NzsCGpnCoVHcDVsh7&metric=true'
const icon = 'https://www.accuweather.com/images/weathericons/'

let filteredWords = []

const page = document.createElement('div');
page.setAttribute('id', 'pagination-container');
const pageNum1 = document.createElement('p');
const pageNum2 = document.createElement('p');
pageNum1.setAttribute('class', 'pgCursor');
pageNum1.innerHTML = '<';
pageNum1.setAttribute('id', 'beforePagination');
pageNum2.setAttribute('id', 'afterPagination');
pageNum2.innerHTML = '>';
pageNum2.setAttribute('class', 'pgCursor');
page.appendChild(pageNum1);
page.appendChild(pageNum2);

const loadNews = async function () {
  await fetch(root_url + `/news`)
    .then((response) => response.json())
    .then((data) => {

      let regexFilter = `(${filteredWords.join("|")})`
      const secondFilter = new RegExp(regexFilter, 'i');
      if (filteredWords.length > 0) {
        data = data.filter((article) => !secondFilter.test(article.content) && !secondFilter.test(article.headline))
        // console.log(test)
      }

      // Wilson- you can start manipulating the DOM here
      // Data is an array of news article objects

      let list = document.getElementById('news');
      if (document.querySelector('#spinner')) {
        list.removeChild(document.querySelector('#spinner'));
      }
      for (i = data.length - 1; i >= 0; i--) {

        // if (!secondFilter.test(data[i].content && !secondFilter.test(data[i].headline))) {
        //   console.log(data[i])
        // }

        let container = document.createElement('div');
        container.setAttribute('class', 'news-div');
        container.setAttribute('id', `item${i + 1}`);
        container.style.padding = '3rem';
        container.style.wordWrap = 'break-word';
        // container.style.border = 'thin solid #000';
        container.style.borderBottom = 'solid 1px lightgrey'
        container.style.margin = ' 2rem 1rem';
        // container.style.backgroundColor = '#dfdfdf';
        let headlines = document.createElement('h2');
        headlines.innerHTML = data[i].headline;
        container.appendChild(headlines);

        let image = document.createElement('img');
        image.style.height = '350px';
        image.style.width = 'auto';
        image.style.paddingTop = '2rem';
        if (
          data[i].image !== 'No Images' &&
          data[i].image.includes('data:image/gif') === false
        ) {
          image.setAttribute('src', data[i].image);
          container.appendChild(image);
          let breakEl = document.createElement('br');
          container.appendChild(breakEl);
        } else {
          let image = document.createElement('img');
          image.style.height = '150px';
          image.style.width = 'auto';
          image.style.paddingTop = '2rem';
          if (data[i].from === 'abc') {
            image.setAttribute(
              'src',
              'https://www.growfree.org.au/wp-content/uploads/2017/05/abc-news-logo-01.png'
            );
            container.appendChild(image);
            let breakEl = document.createElement('br');
            container.appendChild(breakEl);
          } else {
            image.setAttribute(
              'src',
              'https://www.news.com.au/wp-content/themes/vip/newscorpau-nca/assets/dist/img/common/favicon/favicon-1024x1024.png'
            );
            container.appendChild(image);
            let breakEl = document.createElement('br');
            container.appendChild(breakEl);
          }
        }

        let contentEl = document.createElement('p');
        contentEl.setAttribute('id', `content${i}`);
        // content.style.backgroundColor = 'blue'
        contentEl.style.height = '200px';
        contentEl.style.overflow = 'hidden';
        contentEl.style.textAlign = 'left';
        // contentEl.style.borderBottom = '1px solid lightgrey'

        let dates = document.createElement('h6');

        dates.innerHTML = `Posted on ${data[i].addedOn.substring(0, 10)}`;
        dates.style.marginTop = '10px';
        container.appendChild(dates);

        let link = document.createElement('a');
        link.setAttribute('href', data[i].url);
        link.setAttribute('target', '_blank');
        link.innerHTML = data[i].url;
        link.style.fontSize = '10px';
        link.style.color = 'black';
        container.appendChild(link);

        dates.innerHTML = `Posted on ${data[i].addedOn.substring(0, 10)}`;
        dates.style.margin = '15px';
        container.appendChild(dates);

        // let counter = 0;
        for (sentence of data[i].content) {
          contentEl.innerHTML = contentEl.innerHTML + ' ' + sentence;
          if (
            data[i].content.indexOf(sentence) % 5 === 0 &&
            data[i].content.indexOf(sentence) !== 0
          ) {
            contentEl.innerHTML = contentEl.innerHTML + '<br/><br/>';
          }
        }
        container.appendChild(contentEl);

        let reference = document.createElement('a');
        reference.setAttribute('id', `read-more-${i}`);
        reference.setAttribute('class', 'expand-btn');
        reference.setAttribute('type', 'button');

        reference.innerHTML = 'Read More';
        container.appendChild(reference);
        reference.addEventListener('click', () => {
          if (reference.innerHTML == 'Read More') {
            contentEl.style.height = 'auto';
            reference.innerHTML = 'close';
          } else {
            contentEl.style.height = '200px';
            reference.innerHTML = 'Read More';
          }
        });
        //comment

        let comments = data[i].comments
        let articleId = data[i]._id
        let commentDiv = document.createElement('div')

        let commentButton = document.createElement('a');
        commentButton.setAttribute('type', 'button')
        commentButton.innerHTML = 'View all comments<br>';
        let breakEl = document.createElement('br');
        commentDiv.appendChild(breakEl);

        for (comment of comments) {
          let listComment = document.createElement('p');
          listComment.setAttribute('class', 'user-comments');
          listComment.innerHTML = `<span>${comment.username}</span>: ${comment.comment}`;
          commentDiv.appendChild(listComment);
        }
        commentDiv.style.height = '100px';
        commentDiv.style.overflow = 'hidden';
        commentDiv.setAttribute('id', 'comment-content')


        let inputComment = document.createElement('textarea')
        let inputUsername = document.createElement('input')
        inputComment.setAttribute("placeholder", 'Type your comment here')
        inputComment.setAttribute("class", 'comment-input')
        inputUsername.setAttribute("placeholder", 'Type a username')
        inputUsername.setAttribute("class", 'username-input')
        // commentDiv.appendChild(inputUsername)
        inputComment.addEventListener('keyup', (event) => {

          // http://localhost:5000/articles/comment/5eccc5f7c81c8c355401cde2?
          if (event.key === 'Enter') {
            const data = {
              username: inputUsername.value,
              comment: inputComment.value
            }
            fetch(root_url + `/articles/comment/${articleId}`, {
                method: 'put',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

              }).then((response) => response.json())
              .then((article) => {
                let listComment = document.createElement('p')
                listComment.setAttribute('id', 'user-comments')
                listComment.innerHTML = `${data.username}: ${data.comment}`
                listComment.setAttribute('class', 'user-comments')
                commentDiv.appendChild(listComment)
              })
              .catch((err) => console.log(err))
            inputComment.value = ''
            inputUsername.value = ''
          }
        })
        // commentDiv.appendChild(inputComment)
        commentButton.addEventListener('click', () => {
          if (commentButton.innerHTML == 'View all comments<br>') {
            commentDiv.style.height = 'auto';
            commentButton.innerHTML = 'close<br>';
          } else {
            commentDiv.style.height = '100px';
            commentButton.innerHTML = 'View all comments<br>';
          }
        })
        if (comments.length > 0) {
          container.appendChild(commentDiv)
        }
        if (comments.length > 2) {
          container.appendChild(commentButton)
        }
        let spaceEl = document.createElement('br')
        container.appendChild(spaceEl)
        container.appendChild(inputUsername)
        container.appendChild(breakEl)
        container.appendChild(inputComment)
        list.appendChild(container);
      }
      let contentWrapper = document.getElementById('pgx');
      contentWrapper.appendChild(page);

      // let count = data.length - 1
    })
    .catch((err) => console.log(err));


  //Pagination


  $(document).ready(function () {

    var perPage = 5,
      pgWrapper = 'xxx',
      pgItems = 'news-div';
    pgId = 'pagination-container',
      arrowClass = 'pgCursor',
      pgColor = '#fefefe',
      pgColorActive = '#dfdfdf',
      pgCustomClass = 'customPagination';

    function paginationShow() {
      if ($("#" + pgId).children().length > 8) {
        var a = $(".activePagination").attr("data-valor");
        if (a >= 4) {
          var i = parseInt(a) - 3,
            o = parseInt(a) + 2;
          $(".paginacaoValor").hide(), ex2 = $(".paginacaoValor").slice(i, o).show()
        } else $(".paginacaoValor").hide(), ex2 = $(".paginacaoValor").slice(0, 5).show()
      }
    }
    paginationShow(), $("#beforePagination").hide(), $("." + pgItems).hide();
    for (var abc = $("." + pgWrapper).children().length, perPage = perPage, page = Math.ceil(abc / perPage), i = 1; i <= page;) $("#" + pgId).append("<p class='paginacaoValor " + pgCustomClass + "' data-valor=" + i + ">" + i + "</p>"), i++, $(".paginacaoValor").hide(), ex2 = $(".paginacaoValor").slice(0, 5).show();
    $(".paginacaoValor:eq(0)").css("background", "" + pgColorActive).addClass("activePagination");
    var ex = $("." + pgItems).slice(0, perPage).show();
    $(".paginacaoValor").on("click", function () {
      $(".paginacaoValor").css("background", "" + pgColor).removeClass("activePagination"), $(this).css("background", "" + pgColorActive).addClass("activePagination");
      var a = $(this).attr("data-valor"),
        i = a * perPage,
        o = i - perPage;
      $("." + pgItems).hide(), ex = $("." + pgItems).slice(o, i).show(), "1" === a ? $("#beforePagination").hide() : $("#beforePagination").show(), a === "" + $(".paginacaoValor:last").attr("data-valor") ? $("#afterPagination").hide() : $("#afterPagination").show(), paginationShow()
    }), $(".paginacaoValor").last().after($("#afterPagination")), $("#beforePagination").on("click", function () {
      var a = $(".activePagination").attr("data-valor"),
        i = parseInt(a) - 1;
      $("[data-valor=" + i + "]").click(), paginationShow()
    }), $("#afterPagination").on("click", function () {
      var a = $(".activePagination").attr("data-valor"),
        i = parseInt(a) + 1;
      $("[data-valor=" + i + "]").click(), paginationShow()
    }), $(".paginacaoValor").css("float", "left"), $("." + arrowClass).css("float", "left");
  })
};

loadNews();

// header
window.addEventListener('scroll', function () {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

function toggle() {
  const header = document.querySelector('header');
  header.classList.toggle('active');
}

// countdown

window.onload = function () {
  countUpFromTime('Mar 11, 2020 12:00:00', 'countfrom');
};

function countUpFromTime(countFrom, id) {
  countFrom = new Date(countFrom).getTime();
  var now = new Date(),
    countFrom = new Date(countFrom),
    timeDifference = now - countFrom;

  var secondsInADay = 60 * 60 * 1000 * 24,
    secondsInAHour = 60 * 60 * 1000;

  days = Math.floor((timeDifference / secondsInADay) * 1);
  hours = Math.floor(((timeDifference % secondsInADay) / secondsInAHour) * 1);
  mins = Math.floor(
    (((timeDifference % secondsInADay) % secondsInAHour) / (60 * 1000)) * 1
  );
  secs = Math.floor(
    ((((timeDifference % secondsInADay) % secondsInAHour) % (60 * 1000)) /
      1000) *
    1
  );

  var idEl = document.getElementById(id);
  idEl.getElementsByClassName('days')[0].innerHTML = days;
  idEl.getElementsByClassName('hours')[0].innerHTML = hours;
  idEl.getElementsByClassName('minutes')[0].innerHTML = mins;
  idEl.getElementsByClassName('seconds')[0].innerHTML = secs;

  clearTimeout(countUpFromTime.interval);
  countUpFromTime.interval = setTimeout(function () {
    countUpFromTime(countFrom, id);
  }, 1000);
}

// button

const mybutton = document.getElementById('myBtn');
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    mybutton.style.display = 'block';
  } else {
    mybutton.style.display = 'none';
  }
}

function topFunction() {
  document.body.scrollTop = 900;
  document.documentElement.scrollTop = 900;
}

let topHeadlineDiv = document.querySelector('#top-headline-content');

const getTopHeadlines = (category) => {
  fetch(root_url + `/top-headlines/${category}`)
    .then((response) => response.json())
    .then((news) => {
      for (article of news) {
        let articleDiv = document.createElement('div');
        let linkToArticle = document.createElement('a');
        linkToArticle.style.textDecoration = 'none';
        articleDiv.setAttribute('class', 'top-news-item');
        linkToArticle.setAttribute('href', article.url);
        linkToArticle.setAttribute('target', 'blank');
        let title = document.createElement('p');
        title.style.width = '300px';
        title.style.fontWeight = '700';
        title.innerHTML = article.title;
        articleDiv.appendChild(title);
        title.style.color = 'black';

        if (article.urlToImage) {
          let articleImage = document.createElement('img');
          articleImage.src = article.urlToImage;
          articleImage.style.width = '100px';
          articleImage.style.height = '100px';
          articleImage.style.borderRadius = '15px';
          articleDiv.appendChild(articleImage);
        }
        linkToArticle.appendChild(articleDiv);
        // linkToArticle.style.borderBottom = 'solid 1px lightgrey'
        topHeadlineDiv.appendChild(linkToArticle);
      }
    });
};

getTopHeadlines('business');

let categorySelect = document.getElementsByClassName('option-button')

for (option of categorySelect) {

  let buttonEl = option

  buttonEl.addEventListener('click', () => {
    topHeadlineDiv.innerHTML = '';
    getTopHeadlines(buttonEl.innerHTML.toLowerCase())
  })

}

//share

function actionToggle() {
  var action = document.querySelector('.action');
  action.classList.toggle('active');
}

// weather
const weatherApiCall = async function (weather, location, api) {
    await fetch(weather + location[0] + api)
      .then((response) => response.json())
      .then((data) => {
        let minTemp = data.DailyForecasts[0].Temperature.Minimum.Value;
        let maxTemp = data.DailyForecasts[0].Temperature.Maximum.Value;
        let iconNum = data.DailyForecasts[0].Day.Icon;
        let iconPhrase = data.DailyForecasts[0].Day.IconPhrase;

        let cityDiv = document.createElement('div');
        cityDiv.setAttribute('class', 'weather-item')


        let cityName = document.createElement('p');
        cityName.innerHTML = location[1];
        let iconImage = document.createElement('img');
        iconImage.setAttribute('src', icon + iconNum + ".svg");
        iconImage.style.width = '50px';
        iconImage.style.heigth = '50px';
        let maxTempDisplay = document.createElement('p');
        maxTempDisplay.innerHTML = maxTemp
        maxTempDisplay.style.fontWeight = 'bold';
        // maxTempDisplay.style.fontSize = '20px'
        let minTempDisplay = document.createElement('p');
        minTempDisplay.innerHTML = `/ ${minTemp}`;
        let weatherPhrase = document.createElement('p');
        weatherPhrase.innerHTML = iconPhrase;
        weatherPhrase.style.paddingLeft = '20px'


        cityDiv.appendChild(cityName);
        cityDiv.appendChild(iconImage);
        cityDiv.appendChild(maxTempDisplay);
        cityDiv.appendChild(minTempDisplay);
        cityDiv.appendChild(weatherPhrase);



        let weatherContent = document.getElementById('top-weather-content');
        weatherContent.appendChild(cityDiv);


      }).catch((err) => console.log(err))
  }

  weatherApiCall(weather_url, brisbane, api)
  weatherApiCall(weather_url, goldCoast, api)
  weatherApiCall(weather_url, perth, api)
  weatherApiCall(weather_url, sydney, api)
  weatherApiCall(weather_url, melbourne, api)
  weatherApiCall(weather_url, adelaide, api)
  weatherApiCall(weather_url, darwin, api)

  //robojeb
  ! function (t, e) {
    t.artibotApi = {
      l: [],
      t: [],
      on: function () {
        this.l.push(arguments)
      },
      trigger: function () {
        this.t.push(arguments)
      }
    };
    var a = !1,
      i = e.createElement("script");
    i.async = !0, i.type = "text/javascript", i.src = "https://app.artibot.ai/loader.js", e.getElementsByTagName("head").item(0).appendChild(i), i.onreadystatechange = i.onload = function () {
      if (!(a || this.readyState && "loaded" != this.readyState && "complete" != this.readyState)) {
        new window.ArtiBot({
          i: "d156dc30-98a2-4cd2-a5f8-969fdcd86fae"
        });
        a = !0
      }
    }
  }(window, document);


let filterInput = document.querySelector('#filter-input')
let filterDisplay = document.querySelector('#filter-word-display')

filterInput.addEventListener('keyup', (event) => {
  if (event.key === "Enter") {
    let word = document.createElement('span')
    word.setAttribute('class', 'filter-bubble')
    word.innerHTML = filterInput.value
    filterDisplay.appendChild(word)
    filteredWords.push(filterInput.value)
    console.log(`(${filteredWords.join("|")})`)
    filterInput.value = ''
    let newsContainer = document.getElementById('news')
    newsContainer.innerHTML = ""
    loadNews()
  }
})



let resetFilter = document.querySelector('#reset-filter-button')
resetFilter.addEventListener('click', () => {
  filteredWords = []
  let newsContainer = document.getElementById('news')
  newsContainer.innerHTML = ""
  let wordDisplay = document.getElementById('filter-word-display')
  wordDisplay.innerHTML = ""
  loadNews();
})
filterInput.addEventListener('focus', function (event) {
  filterInput.setAttribute('placeholder', 'Enter keywords you dont want to see')
})

filterInput.addEventListener('focusout', function (event) {
  filterInput.value = null;
  filterInput.removeAttribute('placeholder')
})