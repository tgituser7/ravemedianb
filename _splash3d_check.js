const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  // Repeated screenshots force real paint frames (headless Chromium here
  // doesn't otherwise reliably fire rAF), which also drives the WebGL
  // canvas's own render loop.
  const stamps = Array(16).fill(150);
  let elapsed = 0;
  for (const d of stamps) {
    await page.waitForTimeout(d);
    elapsed += d;
    await page.screenshot({ path: dir + `splash3d-${String(elapsed).padStart(5,"0")}.png` });
  }
  console.log("ERRORS:", JSON.stringify(errors, null, 2));
})();
