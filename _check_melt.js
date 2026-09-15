const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  await page.waitForTimeout(500); // mid scramble
  await page.screenshot({ path: dir + "melt-a-scramble.png" });

  await page.waitForTimeout(600); // into hold, near start of melt
  await page.screenshot({ path: dir + "melt-b-start.png" });

  await page.waitForTimeout(250); // mid melt
  await page.screenshot({ path: dir + "melt-c-mid.png" });

  await page.waitForTimeout(300); // end of melt / just gone
  await page.screenshot({ path: dir + "melt-d-end.png" });

  await page.waitForTimeout(300); // scatter text mid-assembly
  await page.screenshot({ path: dir + "melt-e-scatter.png" });

  await page.waitForTimeout(800); // fully settled
  await page.screenshot({ path: dir + "melt-f-settled.png" });

  console.log("ERRORS:", JSON.stringify(errors));
})();
