const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(300);
  const footer = await page.$("footer");
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await footer.screenshot({
    path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/e6308b94-1a77-4508-881a-9d79d316534a/scratchpad/footer-v1.png",
  });
  console.log("ERRORS:", JSON.stringify(errors));
})();
