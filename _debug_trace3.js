const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  const errs = [];
  page.on("console", m => { if (m.type()==="error") errs.push(m.text()); });
  page.on("pageerror", e => errs.push(String(e)));
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(300);
  const val = await page.evaluate(() => {
    const el = document.querySelector('.font-mono');
    return el ? { opacity: getComputedStyle(el).opacity, html: el.outerHTML.slice(0,200) } : { found: false };
  });
  console.log("result:", JSON.stringify(val));
  console.log("console errors:", JSON.stringify(errs));
})();
