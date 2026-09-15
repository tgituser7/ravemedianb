const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(600);
  const val = await page.evaluate(() => {
    const spans = Array.from(document.querySelectorAll('span')).filter(s => s.textContent.trim() === "+");
    return spans.map(s => getComputedStyle(s).opacity);
  });
  console.log("plus mark opacities at 600ms:", JSON.stringify(val));
})();
