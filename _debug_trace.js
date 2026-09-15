const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });

  const samples = [];
  const times = [50, 100, 200, 400, 700];
  let last = 0;
  for (const t of times) {
    await page.waitForTimeout(t - last);
    last = t;
    const val = await page.evaluate(() => {
      const el = document.querySelector('.font-mono');
      return el ? getComputedStyle(el).opacity : "not-found";
    });
    samples.push({ t, opacity: val });
  }
  console.log(JSON.stringify(samples, null, 2));
})();
