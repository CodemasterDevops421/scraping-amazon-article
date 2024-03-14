import { CheerioCrawler, CheerioCrawlingContext, log } from 'crawlee';
import { handleCaptchaBlocking } from './blocking-detection.js';
import { extractProductDetails } from './scraper.js';

/**
 * Performs the logic of the crawler. It is called for each URL to crawl.
 * - Passed to the crawler in the `requestHandler` option.
 */
const requestHandler = async (context: CheerioCrawlingContext) => {
    const { request, $ } = context;
    const { url } = request;

    handleCaptchaBlocking($); // Alternatively, we can put this into the crawler's `postNavigationHooks`

    log.info(`Scraping product page`, { url });
    const extractedProduct = extractProductDetails($);

    log.info(`Scraped product details for "${extractedProduct.title}", saving...`, { url });
    crawler.pushData(extractedProduct);
};

/**
 * The crawler instance. Crawlee provides a few different crawlers, but we'll use CheerioCrawler, as it's very fast and simple to use.
 * - Alternatively, we could use a full browser crawler like `PlaywrightCrawler` to imitate a real browser.
 */
const crawler = new CheerioCrawler({ requestHandler });

await crawler.run(['https://www.amazon.com/dp/B0BV7XQ9V9']);
