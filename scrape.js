const puppeteer = require('puppeteer');
const re = new RegExp('(covid-19|coronavirus|corona|covid)', 'i');

async function getNews() {
  const articles = [];

  //async function for abc.com.au
  async function headlinesABC() {
    const browser1 = await puppeteer.launch({ headless: true });
    const page = await browser1.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'script') request.abort();
      else request.continue();
    });

    const navigationPromise = page.waitForNavigation();
    await page.goto('https://www.abc.net.au/news/justin/');
    //   await page.setViewport({ width: 1200, height: 800 })

    let title;

    for (i = 0; i < 10; i++) {
      await page.waitForSelector(
        '.GvLLo > ._27tpe > ._6TJ0W > ._3XQNk > ._1cg3S'
      );
      await page.click('.GvLLo > ._27tpe > ._6TJ0W > ._3XQNk > ._1cg3S');
    }

    for (i = 1; i < 8; i++) {
      await navigationPromise;

      await page.waitForSelector(
        `.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`
      );
      await page.click(
        `.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`
      );
      await page.waitForSelector('title');
      await page.waitForSelector('p');
      title = await page.$eval('title', (title) => title.innerHTML);
      const textsJoined = await page.evaluate(() =>
        [...document.querySelectorAll('p')]
          .map((elem) => elem.innerText)
          .join('\n')
      );
      if ((await re.test(textsJoined)) === false) {
        articles.push({
          heading: title,
          content: await page.evaluate(() =>
            [...document.querySelectorAll('p')].map((elem) => elem.innerText)
          ),
          url: page.url(),
        });
      }

      await navigationPromise;
      await page.goBack();
    }

    await browser1.close();
    console.log(articles.length);
  }

  //async function for news.com.au
  async function headlinesNEWS() {
    const browser2 = await puppeteer.launch({ headless: true });
    const page = await browser2.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'script') request.abort();
      else request.continue();
    });

    const navigationPromise = page.waitForNavigation();
    await page.goto('https://www.news.com.au/national/breaking-news');
    //   await page.setViewport({ width: 1200, height: 800 })

    let title;

    for (i = 100; i > 92; i--) {
      await navigationPromise;

      await page.waitForSelector(
        `.module-content > .cirpos-${i} > .story-block > .heading > a`
      );
      await page.click(
        `.module-content > .cirpos-${i} > .story-block > .heading > a`
      );

      await page.waitForSelector('title');
      await page.waitForSelector('p');
      title = await page.$eval('title', (title) => title.innerHTML);
      const textsJoined = await page.evaluate(() =>
        [...document.querySelectorAll('p')]
          .map((elem) => elem.innerText)
          .join('\n')
      );
      if ((await re.test(textsJoined)) === false) {
        articles.push({
          heading: title,
          content: await page.evaluate(() =>
            [...document.querySelectorAll('p')].map((elem) => elem.innerText)
          ),
          url: page.url(),
        });
      }

      await navigationPromise;
      await page.goBack();
    }

    await browser2.close();

    console.log(articles.length);
  }

  await headlinesABC();
  await headlinesNEWS();

  return articles;
}

module.exports = getNews;

// getNews().then((data) =>{

//     console.log(data)
// })
