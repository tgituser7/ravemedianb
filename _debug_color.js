const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const el = Array.from(document.querySelectorAll("div")).find(d => d.textContent.trim() === "PALLET ROSS");
    if (!el) return { found: false };
    const cs = getComputedStyle(el);
    return {
      found: true,
      color: cs.color,
      opacity: cs.opacity,
      filter: cs.filter,
      transform: cs.transform,
      html: el.outerHTML.slice(0, 300),
    };
  });
  console.log(JSON.stringify(info, null, 2));
})();
