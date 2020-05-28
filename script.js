const root_url = 'https://nocovidhere.herokuapp.com';

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
      console.log(data);

      // Wilson- you can start manipulating the DOM here
      // Data is an array of news article objects
      let list = document.getElementById('news');
      list.removeChild(document.querySelector('#spinner'));
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
        
        let contentEl = document.createElement('p');
        contentEl.setAttribute('id', `content${i}`);
        // content.style.backgroundColor = 'blue'
        contentEl.style.height = '200px';
        contentEl.style.overflow = 'hidden';
        contentEl.style.textAlign = "left";

        let dates = document.createElement('h6');
        dates.innerHTML =`Posted on ${data[i].addedOn.substring(0,10)}`
        dates.style.marginTop = '10px';
        container.appendChild(dates);

        let link = document.createElement('a');
        link.setAttribute('href', data[i].url);
        link.setAttribute('target', '_blank');
        link.innerHTML = data[i].url;
        link.style.fontSize = '10px'
        link.style.color ='black'
        container.appendChild(link);


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
        // reference.setAttribute('href', data[i].url);
        // reference.setAttribute('target', '_blank');

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

        list.appendChild(container);


      }
      let contentWrapper = document.getElementById('pgx');
      contentWrapper.appendChild(page);



      

      // let count = data.length - 1
    })
    .catch((err) => console.log(err));

  //Pagination
  $(document).ready(function () {
    var numOfPage = 5,
      wrapper = 'content',
      itemClass = 'news-div',
      pgID = 'pagination-container',
      pgClass = 'pgCursor',
      pgColor = '#fefefe',
      pgColorActive = '#dfdfdf',
      pgCustomClass = 'customPagination';

    function paginate() {
      if ($('#' + pgID).children().length > 8) {
        var a = $('.activePagination').attr('data-valor');
        if (a >= 4) {
          var i = parseInt(a) - 3,
            o = parseInt(a) + 2;
          $('.paginacaoValor').hide(),
            (exibir2 = $('.paginacaoValor').slice(i, o).show());
        } else
          $('.paginacaoValor').hide(),
            (exibir2 = $('.paginacaoValor').slice(0, 5).show());
      }
    }
    paginate(), $('#beforePagination').hide(), $('.' + itemClass).hide();
    for (
      var tamanhotabela = $('.' + wrapper).children().length,
        porPagina = numOfPage,
        paginas = Math.ceil(tamanhotabela / porPagina),
        i = 1;
      i <= paginas;

    )
      $('#' + pgID).append(
        "<p class='paginacaoValor " +
          pgCustomClass +
          "' data-valor=" +
          i +
          '>' +
          i +
          '</p>'
      ),
        i++,
        $('.paginacaoValor').hide(),
        (exibir2 = $('.paginacaoValor').slice(0, 5).show());
    $('.paginacaoValor:eq(0)')
      .css('background', '' + pgColorActive)
      .addClass('activePagination');
    var exibir = $('.' + itemClass)
      .slice(0, porPagina)
      .show();
    $('.paginacaoValor').on('click', function () {
      $('.paginacaoValor')
        .css('background', '' + pgColor)
        .removeClass('activePagination'),
        $(this)
          .css('background', '' + pgColorActive)
          .addClass('activePagination');
      var a = $(this).attr('data-valor'),
        i = a * porPagina,
        o = i - porPagina;
      $('.' + itemClass).hide(),
        (exibir = $('.' + itemClass)
          .slice(o, i)
          .show()),
        '1' === a
          ? $('#beforePagination').hide()
          : $('#beforePagination').show(),
        a === '' + $('.paginacaoValor:last').attr('data-valor')
          ? $('#afterPagination').hide()
          : $('#afterPagination').show(),
        paginate();
    }),
      $('.paginacaoValor').last().after($('#afterPagination')),
      $('#beforePagination').on('click', function () {
        var a = $('.activePagination').attr('data-valor'),
          i = parseInt(a) - 1;
        $('[data-valor=' + i + ']').click(), paginate();
      }),
      $('#afterPagination').on('click', function () {
        var a = $('.activePagination').attr('data-valor'),
          i = parseInt(a) + 1;
        $('[data-valor=' + i + ']').click(), paginate();
      }),
      $('.paginacaoValor').css('float', 'left'),
      $('.' + pgClass).css('float', 'left');
  });
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
