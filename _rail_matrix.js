const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000/studio", { waitUntil: "load" });
  await page.waitForTimeout(1000);
  const navH = await page.evaluate(() => document.querySelector("header").getBoundingClientRect().height);
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/rail-matrix.png", clip: { x: 0, y: Math.round(navH), width: 280, height: 741 } });
  console.log("ERRORS:", JSON.stringify(errors));
  await browser.close();
})();
