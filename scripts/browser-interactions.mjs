// End-to-end interaction checks against the running app (headless Chrome via CDP).
// Usage: node scripts/browser-interactions.mjs <url>
const url = process.argv[2] ?? "http://localhost:3000/";
const port = 9222;
const downloadDir = "/tmp/qrstudio-downloads";

import { mkdirSync, readdirSync, rmSync, existsSync } from "node:fs";

rmSync(downloadDir, { recursive: true, force: true });
mkdirSync(downloadDir, { recursive: true });

let failures = 0;
const ok = (name, cond, detail = "") => {
  if (cond) console.log(`  ✓ ${name}`);
  else {
    failures += 1;
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
};

const tab = await (
  await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, { method: "PUT" })
).json();
const ws = new WebSocket(tab.webSocketDebuggerUrl);
let nextId = 0;
const pending = new Map();

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const id = ++nextId;
    pending.set(id, resolve);
    ws.send(JSON.stringify({ id, method, params }));
  });
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
await new Promise((resolve) => (ws.onopen = resolve));

await send("Runtime.enable");
await send("Page.enable");
await send("Browser.setDownloadBehavior", { behavior: "allow", downloadPath: downloadDir, eventsEnabled: true });

const evalJs = async (expression) => {
  const res = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (res.result?.exceptionDetails) {
    throw new Error(`Page threw: ${JSON.stringify(res.result.exceptionDetails.exception?.description ?? res.result.exceptionDetails)}`);
  }
  return res.result?.result?.value;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Start from a clean profile so earlier runs don't leak restored settings.
await evalJs(`localStorage.clear(); location.reload(); 1;`);
await sleep(2500);

await evalJs(`window.__pageErrors = [];
window.addEventListener("error", (e) => window.__pageErrors.push(String(e.message || e.error)));
window.addEventListener("unhandledrejection", (e) => window.__pageErrors.push("unhandledrejection: " + String(e.reason)));
1;`);

const state = () => evalJs(`JSON.stringify({
  svg: !!document.querySelector(".qr-svg svg"),
  dots: document.querySelectorAll(".qr-svg svg path, .qr-svg svg rect, .qr-svg svg circle").length,
  empty: !!Array.from(document.querySelectorAll(".qr-svg ~ * , .qr-svg")).some(el => el.textContent && el.textContent.includes("will appear here")),
  errorText: document.querySelector('[role="alert"]')?.textContent || null,
  wifiField: !!document.getElementById("qr-ssid"),
  textField: !!document.getElementById("qr-text"),
  logoImage: !!document.querySelector(".qr-svg svg image"),
  historyItems: document.querySelectorAll('section[aria-labelledby="history-heading"] button').length,
  historyLabels: Array.from(document.querySelectorAll('section[aria-labelledby="history-heading"] button')).map(b => b.textContent?.trim().slice(0, 40)),
  theme: document.documentElement.classList.contains("light") ? "light" : "dark",
})`);

const setInput = (id, value) => evalJs(`(() => {
  const el = document.getElementById(${JSON.stringify(id)});
  if (!el) return false;
  const proto = el.tagName === "TEXTAREA" ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, ${JSON.stringify(value)});
  el.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
})()`);

const clickRadio = (label) => evalJs(`(() => {
  const btn = Array.from(document.querySelectorAll('[role="radio"]')).find(b => b.textContent.includes(${JSON.stringify(label)}));
  if (!btn) return false;
  btn.click();
  return true;
})()`);

const clickButtonByText = (text) => evalJs(`(() => {
  const btn = Array.from(document.querySelectorAll("button")).find(b => b.textContent.trim().includes(${JSON.stringify(text)}));
  if (!btn) return false;
  btn.click();
  return true;
})()`);

console.log("Initial state");
{
  const s = JSON.parse(await state());
  ok("QR rendered on load", s.svg && s.dots > 200, JSON.stringify(s).slice(0, 200));
}

console.log("URL content → live update");
{
  ok("URL input present", await evalJs(`!!document.getElementById("qr-url")`));
  await setInput("qr-url", "https://github.com/vercel");
  await sleep(900);
  const s = JSON.parse(await state());
  ok("history records the new URL", (s.historyLabels ?? []).some((l) => l.includes("github.com/vercel")), JSON.stringify(s.historyLabels));

  await setInput("qr-url", "definitely not a url");
  await sleep(400);
  const s2 = JSON.parse(await state());
  ok("invalid URL shows Turkish error", s2.errorText?.includes("Geçersiz URL"), s2.errorText);
}

console.log("Text QR");
{
  await clickRadio("Metin");
  await sleep(300);
  ok("textarea appears", await evalJs(`!!document.getElementById("qr-text")`));
  await setInput("qr-text", "Hello, world!");
  await sleep(500);
  const s = JSON.parse(await state());
  ok("text QR renders", s.svg);
}

console.log("Wi-Fi QR");
{
  await clickRadio("Wi-Fi");
  await sleep(300);
  ok("ssid field appears", await evalJs(`!!document.getElementById("qr-ssid")`));
  await setInput("qr-ssid", "MyNetwork");
  await setInput("qr-password", "secret123");
  await sleep(700);
  const s = JSON.parse(await state());
  ok("wifi QR renders", s.svg);
  ok("history has wifi", (s.historyLabels ?? []).some((l) => l.includes("MyNetwork")));
}

console.log("Email / Phone");
{
  await clickRadio("E-posta");
  await sleep(300);
  await setInput("qr-email", "hello@example.com");
  await sleep(500);
  ok("email QR renders", JSON.parse(await state()).svg);

  await clickRadio("Telefon");
  await sleep(300);
  await setInput("qr-phone", "+1 555 123 4567");
  await sleep(500);
  ok("phone QR renders", JSON.parse(await state()).svg);
}

console.log("Logo upload");
{
  await clickRadio("URL");
  await sleep(300);
  await setInput("qr-url", "https://example.com");
  await sleep(500);
  const uploaded = await evalJs(`(async () => {
    const input = document.querySelector('input[type="file"]');
    if (!input) return "no input";
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#7c3aed"/><text x="32" y="42" font-size="28" text-anchor="middle" fill="white" font-family="sans-serif">Q</text></svg>';
    const file = new File([svg], "logo.svg", { type: "image/svg+xml" });
    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return "ok";
  })()`);
  await sleep(1200);
  const s = JSON.parse(await state());
  ok("logo upload accepted", uploaded === "ok" && s.logoImage, `upload=${uploaded} logo=${s.logoImage}`);
}

console.log("Language switch (TR → EN → TR)");
{
  const clickByLabel = (label) =>
    evalJs(`(() => { const b = document.querySelector('button[aria-label=${JSON.stringify(label)}]'); if (!b) return false; b.click(); return true; })()`);
  ok("language button present", await clickByLabel("Dili değiştir"));
  await sleep(300);
  const picked = await evalJs(`(() => {
    const btn = Array.from(document.querySelectorAll('[role="option"]')).find(b => b.textContent.includes("English"));
    if (!btn) return false; btn.click(); return true;
  })()`);
  ok("English option selectable", picked);
  await sleep(500);
  const enState = JSON.parse(await state());
  ok("UI switches to English", enState.theme !== undefined && (await evalJs(`!!Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("Download PNG"))`)));
  const storedLang = await evalJs(`localStorage.getItem("qr-studio:lang")`);
  ok("language persisted", storedLang === "en");
  ok("html lang updates", (await evalJs(`document.documentElement.lang`)) === "en");
  // Back to Turkish
  await clickByLabel("Change language");
  await sleep(300);
  await evalJs(`(() => { const btn = Array.from(document.querySelectorAll('[role="option"]')).find(b => b.textContent.includes("Türkçe")); btn?.click(); return !!btn; })()`);
  await sleep(500);
  ok("switches back to Turkish", await evalJs(`!!Array.from(document.querySelectorAll("button")).find(b => b.textContent.includes("PNG İndir"))`));
}

console.log("Theme toggle");
{
  const clickByLabel = (label) =>
    evalJs(`(() => { const b = document.querySelector('button[aria-label=${JSON.stringify(label)}]'); if (!b) return false; b.click(); return true; })()`);
  const before = JSON.parse(await state()).theme;
  ok("theme toggle button present", await clickByLabel("Açık temaya geç"));
  await sleep(400);
  const after = JSON.parse(await state()).theme;
  ok("theme toggles to light", before === "dark" && after === "light");
  const stored = await evalJs(`localStorage.getItem("qr-studio:theme")`);
  ok("theme persisted to localStorage", stored === "light");
  await clickByLabel("Koyu temaya geç");
  await sleep(300);
}

console.log("Downloads");
{
  const clickByLabel = (label) =>
    evalJs(`(() => { const b = document.querySelector('button[aria-label=${JSON.stringify(label)}]'); if (!b) return false; b.click(); return true; })()`);
  ok("PNG button clickable", await clickByLabel("QR kodunu PNG olarak indir"));
  await sleep(1500); // wait for the PNG pipeline to finish so buttons re-enable
  ok("SVG button clickable", await clickByLabel("QR kodunu SVG olarak indir"));
  await sleep(1500);
  ok("WebP button clickable", await clickByLabel("QR kodunu WebP olarak indir"));
  // Poll until downloads finish.
  for (let i = 0; i < 12; i += 1) {
    await sleep(1000);
    const files = existsSync(downloadDir) ? readdirSync(downloadDir) : [];
    if (
      files.some((f) => f.endsWith(".png")) &&
      files.some((f) => f.endsWith(".svg")) &&
      files.some((f) => f.endsWith(".webp"))
    ) {
      break;
    }
  }
  const files = existsSync(downloadDir) ? readdirSync(downloadDir) : [];
  ok("PNG downloaded", files.some((f) => f.endsWith(".png")), files.join(","));
  ok("SVG downloaded", files.some((f) => f.endsWith(".svg")), files.join(","));
  ok("WebP downloaded", files.some((f) => f.endsWith(".webp")), files.join(","));
  const svgFile = files.find((f) => f.endsWith(".svg"));
  if (svgFile) {
    const fs = await import("node:fs");
    const content = fs.readFileSync(`${downloadDir}/${svgFile}`, "utf8");
    ok("SVG contains QR markup", content.includes("<svg") && content.includes("clipPath"));
  }
}

console.log("Reset + history clear");
{
  await clickButtonByText("Sıfırla");
  await sleep(600);
  const s = JSON.parse(await state());
  ok("reset restores default URL field", await evalJs(`document.getElementById("qr-url")?.value === "https://example.com"`));
  ok("history preserved after reset", (s.historyLabels ?? []).length > 0);
  await clickButtonByText("Geçmişi temizle");
  await sleep(400);
  const s2 = JSON.parse(await state());
  ok("history cleared", (s2.historyLabels ?? []).length === 0, JSON.stringify(s2.historyLabels));
}

console.log("No page errors");
{
  const errors = await evalJs(`window.__pageErrors ?? []`);
  ok("no console/page errors", Array.isArray(errors) && errors.length === 0, JSON.stringify(errors).slice(0, 400));
}

ws.close();
if (failures > 0) {
  console.error(`\n${failures} interaction check(s) failed`);
  process.exit(1);
}
console.log("\nAll interaction checks passed");
process.exit(0);
