const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const vis = await page.evaluate(() => ({
    hidden: document.hidden,
    visibilityState: document.visibilityState,
    hasFocus: document.hasFocus(),
  }));
  console.log("visibility:", JSON.stringify(vis));

  await page.bringToFront();
  await page.waitForTimeout(400);
  const val = await page.evaluate(() => {
    const el = document.querySelector('.font-mono');
    return el ? getComputedStyle(el).opacity : "not-found";
  });
  console.log("opacity after bringToFront + 400ms:", val);
})();
