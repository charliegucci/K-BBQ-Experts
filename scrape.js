const puppeteer = require('puppeteer');
const reCovid = new RegExp('(covid-19|coronavirus|corona|covid)', 'i');
const reImg = new RegExp('(.jpg|.jpeg|.png|)');
const numAritcle = 15;
const headTF = true;

async function getNews() {
  const articles = [];

  //async function for abc.com.au
  async function headlinesABC() {
    const browser = await puppeteer.launch({ headless: headTF });
    const page = await browser.newPage();
    const navigationPromise = page.waitForNavigation();

    await page.goto('https://www.abc.net.au/news/justin/');

    //removes pagination from the ABC news site
    // for (i = 0; i < 10; i++) {
    //     await page.waitForSelector('.GvLLo > .\_27tpe > .\_6TJ0W > .\_3XQNk > .\_1cg3S')
    //     await page.click('.GvLLo > .\_27tpe > .\_6TJ0W > .\_3XQNk > .\_1cg3S')
    // }

    for (i = 1; i < numAritcle; i++) {
      await navigationPromise;
      await page.waitForSelector(
        `.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`
      );
      await page.click(
        `.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`
      );
      await page.waitForSelector('title');
      await page.waitForSelector('p');
      await page.waitForSelector('img');

      const textsJoined = await page.evaluate(() =>
        [...document.querySelectorAll('p')]
          .map((elem) => elem.innerText)
          .join('\n')
      );

      if ((await reCovid.test(textsJoined)) === false) {
        //gets all of the first articles on the page, however it only returns the first image that is either a .jpg, .jpeg, or .png
        let img;
        try {
          const imgs = await page.evaluate(() =>
            Array.from(document.images, (e) => e.src)
          );
          for (ig of imgs) {
            if ((await reImg.test(ig)) === true) {
              img = ig;
              break;
            }
          }
        } catch {
          console.log('No Images');
          img = 'No Images';
        }

        articles.push({
          from: 'abc',
          heading: await page.$eval('title', (title) => title.innerHTML),
          content: await page.evaluate(() =>
            [...document.querySelectorAll('p')].map((elem) => elem.innerText)
          ),
          url: page.url(),
          img: img,
        });
      }

      await navigationPromise;
      await page.goBack();
    }

    await browser.close();
    console.log(articles.length);
  }

  //async function for news.com.au
  async function headlinesNEWS() {
    const browser = await puppeteer.launch({ headless: headTF });
    const page = await browser.newPage();

    // remove javascript functionality to improve the speed
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'script') request.abort();
      else request.continue();
    });

    const navigationPromise = page.waitForNavigation();
    await page.goto('https://www.news.com.au/national/breaking-news');

    for (i = 100; i > 100 - numAritcle; i--) {
      await navigationPromise;
      await page.waitForSelector(
        `.module-content > .cirpos-${i} > .story-block > .heading > a`
      );
      await page.click(
        `.module-content > .cirpos-${i} > .story-block > .heading > a`
      );
      await page.waitForSelector('title');
      await page.waitForSelector('p');
      let title = await page.$eval('title', (title) => title.innerHTML);
      const textsJoined = await page.evaluate(() =>
        [...document.querySelectorAll('p')]
          .map((elem) => elem.innerText)
          .join('\n')
      );
      if ((await reCovid.test(textsJoined)) === false) {
        articles.push({
          from: 'news',
          heading: title,
          content: await page.evaluate(() =>
            [...document.querySelectorAll('p')].map((elem) => elem.innerText)
          ),
          url: page.url(),
          img: 'No Images',
        });
      }

      await navigationPromise;
      await page.goBack();
    }

    await browser.close();
    console.log(articles.length);
  }

  await headlinesABC();
  await headlinesNEWS();

  return articles;
}

module.exports = { getNews };

// getNews().then((data) => {
//   console.log(data);
// });

///////////////////////////////////
////Previous Verison///////////////
///////////////////////////////////

// const puppeteer = require('puppeteer');
// const re = new RegExp('(covid\-19|coronavirus|corona|covid)', 'i')

// async function getNews () {

//     const articles = []

//     //async function for abc.com.au
//     async function headlinesABC () {

//     const browser1 = await puppeteer.launch({headless:true})
//     const page = await browser1.newPage()

//     await page.setRequestInterception(true);
//     page.on('request', request => {
//         if (request.resourceType() === 'script')
//         request.abort();
//         else
//         request.continue();
//     });

//     const navigationPromise = page.waitForNavigation()
//     await page.goto('https://www.abc.net.au/news/justin/')
//     //   await page.setViewport({ width: 1200, height: 800 })

//     let title

//     for (i = 0; i < 10; i++) {
//         await page.waitForSelector('.GvLLo > .\_27tpe > .\_6TJ0W > .\_3XQNk > .\_1cg3S')
//         await page.click('.GvLLo > .\_27tpe > .\_6TJ0W > .\_3XQNk > .\_1cg3S')
//     }

//     for (i = 1; i < 8; i++ ){

//         await navigationPromise

//         await page.waitForSelector(`.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`)
//         await page.click(`.\_2kqX-:nth-child(${i}) > .\_1E-Sb > .\_38hRP > div > .\_2HoMm > .zT1nT > .MLQqg`)
//         await page.waitForSelector('title')
//         await page.waitForSelector('p')
//         title = await page.$eval('title', title => title.innerHTML);
//         const textsJoined = await page.evaluate(() => [...document.querySelectorAll('p')].map(elem => elem.innerText).join('\n'));
//         if (await re.test(textsJoined) === false) {
//             articles.push({'heading':title,
//                         'content': await page.evaluate(() => [...document.querySelectorAll('p')].map(elem => elem.innerText)),
//                         'url': page.url()
//                         })
//         }

//         await navigationPromise
//         await page.goBack()

//     }

//     await browser1.close()
//     console.log(articles.length)

//     }

//     //async function for news.com.au
//     async function headlinesNEWS () {

//     const browser2 = await puppeteer.launch({headless:true})
//     const page = await browser2.newPage()

//     await page.setRequestInterception(true);
//     page.on('request', request => {
//         if (request.resourceType() === 'script')
//         request.abort();
//         else
//         request.continue();
//     });

//     const navigationPromise = page.waitForNavigation()
//     await page.goto('https://www.news.com.au/national/breaking-news')
//     //   await page.setViewport({ width: 1200, height: 800 })

//     let title

//     for (i = 100; i > 92; i-- ){

//         await navigationPromise

//         await page.waitForSelector(`.module-content > .cirpos-${i} > .story-block > .heading > a`)
//         await page.click(`.module-content > .cirpos-${i} > .story-block > .heading > a`)

//         await page.waitForSelector('title')
//         await page.waitForSelector('p')
//         title = await page.$eval('title', title => title.innerHTML);
//         const textsJoined = await page.evaluate(() => [...document.querySelectorAll('p')].map(elem => elem.innerText).join('\n'));
//         if (await re.test(textsJoined) === false) {
//             articles.push({'heading':title,
//                         'content': await page.evaluate(() => [...document.querySelectorAll('p')].map(elem => elem.innerText)),
//                         'url': page.url()
//                         })
//         }

//         await navigationPromise
//         await page.goBack()

//     }

//     await browser2.close()

//     console.log(articles.length)

//     }

//    await headlinesABC()
//    await headlinesNEWS()

//    return articles

// }

// module.exports = { getNews }

// getNews().then((data) =>{

//     console.log(data)
// })
