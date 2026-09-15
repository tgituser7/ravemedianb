const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const info = await page.evaluate(() => {
    let rafFired = false;
    return new Promise((resolve) => {
      requestAnimationFrame(() => { rafFired = true; });
      setTimeout(() => {
        resolve({
          reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
          rafFired,
        });
      }, 100);
    });
  });
  console.log(JSON.stringify(info));
})();
