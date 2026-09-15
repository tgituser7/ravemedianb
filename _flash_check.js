const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  // Repeated screenshots keep forcing real paint frames so the sequence
  // actually advances in sync with wall-clock, like a real browser.
  const stamps = Array(20).fill(100);
  let elapsed = 0;
  for (const d of stamps) {
    await page.waitForTimeout(d);
    elapsed += d;
    await page.screenshot({ path: dir + `flash-${String(elapsed).padStart(5,"0")}.png` });
  }
  console.log("ERRORS:", JSON.stringify(errors));
})();
