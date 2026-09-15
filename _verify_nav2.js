const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  await page.screenshot({ path: dir + "nav-check2-scroll800.png" });

  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(300);
  await page.screenshot({ path: dir + "nav-check2-scroll1800.png" });
})();
