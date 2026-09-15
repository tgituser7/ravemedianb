const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.evaluate(() => window.scrollTo(0, 1));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const val = await page.evaluate(() => {
    const el = document.querySelector('.font-mono');
    return el ? getComputedStyle(el).opacity : "not-found";
  });
  console.log("opacity after scroll-wake + 300ms:", val);
})();
