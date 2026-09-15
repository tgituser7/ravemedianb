const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(800); // well past scramble+fade, before melt (940ms)
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/v3-stable-preemelt.png" });
})();
