const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 700 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(200);
  await page.screenshot({
    path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/e6308b94-1a77-4508-881a-9d79d316534a/scratchpad/ecom-hero-v4.png",
  });
  console.log("done");
})();
