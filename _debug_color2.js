const { chromium } = require("playwright");
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 600 } });
  await page.goto("http://localhost:3000", { waitUntil: "commit" });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll("div")).filter(d => d.textContent.includes("PALLET") || d.textContent.trim().length && /^[A-Z ]+$/.test(d.textContent.trim()));
    const el = els.find(d => d.className.includes("font-mono"));
    if (!el) return { found: false, candidates: els.map(e=>e.textContent) };
    const cs = getComputedStyle(el);
    return { found: true, text: el.textContent, opacity: cs.opacity, transform: cs.transform };
  });
  console.log(JSON.stringify(info, null, 2));
  await page.screenshot({ path: "C:/Users/256262/AppData/Local/Temp/claude/d--RaveNew/scratchpad2/v4-fixed.png" });
})();
