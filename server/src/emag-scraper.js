import puppeteer from 'puppeteer';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// puppeteer.use(StealthPlugin());

export async function scrapeEmag(searchTerm) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.emag.ro/');

    await page.setViewport({ width: 1080, height: 1024 });

    await page.type('#searchboxTrigger', searchTerm);

    const searchResultSelector = '.searchbox-suggestion-result';

    await page.waitForSelector(searchResultSelector);

    await page.click(searchResultSelector);

    await page.waitForSelector('.card-v2-info');

    let result = [];
    const titles = await page.$$('.card-v2-title');
    const prices = await page.$$('.product-new-price');
    const images = await page.$$('.card-v2-thumb-inner img');
    const links = await page.$$('.js-product-url');

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
        (priceElement) => priceElement.textContent,
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

      result.push({ name: title, price, image, link });
    }

    await browser.close();
    console.log('closed');
    return result;
  } catch (error) {
    console.error(error);
  }
}
