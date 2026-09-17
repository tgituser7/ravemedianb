const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";
  await page.goto("http://localhost:3000", { waitUntil: "commit" });

  const stamps = [1400, 2000, 2600, 3200, 3800, 4400, 5000, 5600, 6200];
  let elapsed = 0;
  for (const target of stamps) {
    await page.waitForTimeout(target - elapsed);
    elapsed = target;
    try {
      await page.screenshot({ path: dir + `slowflip-${String(elapsed).padStart(5,"0")}.png`, timeout: 10000 });
    } catch (e) {
      console.log("FAILED at", elapsed, String(e).slice(0,100));
    }
  }
})();
