const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(2800);
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/final-settled.png" });
  console.log("ERRORS:", JSON.stringify(errors));
})();
