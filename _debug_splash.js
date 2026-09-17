const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => errors.push(m.type() + ": " + m.text()));
  page.on("requestfailed", (r) => console.log("REQUEST FAILED:", r.url(), r.failure()?.errorText));
  page.on("response", (r) => { if (r.url().includes("logo")) console.log("LOGO RESPONSE:", r.url(), r.status()); });

  await page.goto("http://localhost:3001", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const info = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll(".splash-icon img"));
    return imgs.map(img => ({
      src: img.src,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      displayWidth: img.getBoundingClientRect().width,
    }));
  });
  console.log(JSON.stringify(info, null, 2));
  console.log("CONSOLE:", JSON.stringify(errors));
})();
