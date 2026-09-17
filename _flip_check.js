const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";
  await page.goto("http://localhost:3000", { waitUntil: "commit" });

  // Focus tightly on the exit/flip window (starts at 4000ms) to check
  // for the color-shift artifact frame by frame.
  const stamps = [1500, 3900, 4050, 4150, 4250, 4350, 4450, 4550, 4650, 4750, 4850, 5100];
  let elapsed = 0;
  for (const target of stamps) {
    await page.waitForTimeout(target - elapsed);
    elapsed = target;
    try {
      await page.screenshot({ path: dir + `flip-${String(elapsed).padStart(5,"0")}.png`, timeout: 10000 });
    } catch (e) {
      console.log("FAILED at", elapsed, String(e).slice(0,100));
    }
  }
  console.log("ERRORS:", JSON.stringify(errors));
})();
