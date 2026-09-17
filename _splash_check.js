const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto("http://localhost:3001", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  await page.waitForTimeout(150);
  await page.screenshot({ path: dir + "splash-a-idle.png" });

  await page.waitForTimeout(600);
  await page.screenshot({ path: dir + "splash-b-flipping.png" });

  await page.waitForTimeout(1100);
  await page.screenshot({ path: dir + "splash-c-done.png" });

  await page.waitForTimeout(2500);
  await page.screenshot({ path: dir + "splash-d-settled.png" });

  console.log("ERRORS:", JSON.stringify(errors));
})();
