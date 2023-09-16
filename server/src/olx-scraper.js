import puppeteer from 'puppeteer';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// puppeteer.use(StealthPlugin());

export async function scrapeOlx(searchTerm) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.olx.ro/');

    await page.setViewport({ width: 1080, height: 1024 });

    await page.waitForSelector('#onetrust-accept-btn-handler');

    await page.click('#onetrust-accept-btn-handler');

    await page.waitForSelector('#headerSearch');

    await page.type('#headerSearch', searchTerm);

    const searchResultSelector = '.suggestsearchmain li:nth-child(4) a';

    await page.waitForSelector(searchResultSelector);

    await page.click(searchResultSelector);

    await page.waitForSelector('[data-testid="listing-grid"]');

    await autoScroll(page);

    let result = [];
    const titles = await page.$$('.css-16v5mdi');
    const prices = await page.$$('[data-testid="ad-price"]');
    const images = await page.$$('.css-gl6djm img');
    const links = await page.$$('.css-rc5s2u');

    for (let i = 0; i < titles.length; i++) {
      const titleElement = titles[i];
      const priceElement = prices[i];
      const imageElement = images[i];
      const linkElement = links[i];

      const title = await page.evaluate(
        (titleElement) => titleElement.textContent,
        titleElement
      );

      const price = await page.evaluate(
        (priceElement) => priceElement.innerText,
        priceElement
      );

      const image = await page.evaluate(
        (imageElement) => imageElement.src,
        imageElement
      );

      const link = await page.evaluate(
        (linkElement) => linkElement.href,
        linkElement
      );

      result.push({ name: title, image: image, price: price, link });
    }

    await browser.close();
    console.log('closed');
    return result;
  } catch (error) {
    console.error(error);
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      let distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
