const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(100);
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/wake-test.png" });
  await page.waitForTimeout(300);
  const val = await page.evaluate(() => {
    const el = document.querySelector('.font-mono');
    return el ? getComputedStyle(el).opacity : "not-found";
  });
  console.log("opacity after screenshot-wake:", val);
})();
