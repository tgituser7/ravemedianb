const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 500 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/home-with-nav2.png" });
})();
