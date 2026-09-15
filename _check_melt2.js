const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  await page.waitForTimeout(500);
  await page.screenshot({ path: dir + "v2-a-scramble.png" });

  await page.waitForTimeout(600);
  await page.screenshot({ path: dir + "v2-b-meltstart.png" });

  await page.waitForTimeout(250);
  await page.screenshot({ path: dir + "v2-c-meltmid.png" });

  await page.waitForTimeout(300);
  await page.screenshot({ path: dir + "v2-d-meltend.png" });

  await page.waitForTimeout(300);
  await page.screenshot({ path: dir + "v2-e-scatter.png" });

  await page.waitForTimeout(800);
  await page.screenshot({ path: dir + "v2-f-settled.png" });

  console.log("ERRORS:", JSON.stringify(errors));
})();
