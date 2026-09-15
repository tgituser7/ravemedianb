const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });

  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  const dir = "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/";

  // Repeated screenshots at short intervals keep forcing real paint frames,
  // simulating continuous rendering the way a real browser does.
  const stamps = [100,100,100,100,100,150,150,150,150,150,150,150,300,300,300,300,300,300];
  let elapsed = 0;
  const shots = [];
  for (const d of stamps) {
    await page.waitForTimeout(d);
    elapsed += d;
    await page.screenshot({ path: dir + `final-${String(elapsed).padStart(5,"0")}.png` });
    shots.push(elapsed);
  }
  console.log("shots:", JSON.stringify(shots));
  console.log("ERRORS:", JSON.stringify(errors));
})();
