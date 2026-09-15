const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";
  let elapsed = 0;
  for (let i = 0; i < 16; i++) {
    await page.waitForTimeout(300);
    elapsed += 300;
    await page.screenshot({ path: dir + `ease-${String(elapsed).padStart(5,"0")}.png` });
  }
})();
