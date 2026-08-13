// Connects to a headless Chrome debugging port and inspects the running app.
// Usage: node scripts/browser-check.mjs <url>
const url = process.argv[2] ?? "http://localhost:3000/";
const port = 9222;

async function main() {
  // Create a new tab.
  const create = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT",
  });
  const tab = await create.json();

  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  const pending = new Map();
  let nextId = 1;
  const events = [];

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = nextId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    } else if (msg.method) {
      events.push(msg);
    }
  };

  await new Promise((resolve) => (ws.onopen = resolve));

  // Capture page errors + console.
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Log.enable");
  await send("Runtime.evaluate", {
    expression: `
      window.__pageErrors = [];
      window.addEventListener("error", (e) => window.__pageErrors.push(String(e.message || e.error)));
      window.addEventListener("unhandledrejection", (e) => window.__pageErrors.push("unhandledrejection: " + String(e.reason)));
      console._error = console.error;
      console.error = (...a) => { window.__pageErrors.push("console.error: " + a.map(String).join(" ")); console._error(...a); };
      "installed";
    `,
  });

  await send("Page.navigate", { url });
  await new Promise((r) => setTimeout(r, 4000)); // real wait for hydration + QR draw

  const result = await send("Runtime.evaluate", {
    expression: `JSON.stringify({
      title: document.title,
      qrSvgLength: (document.querySelector(".qr-svg")?.innerHTML || "").length,
      qrSvgHasSvg: !!document.querySelector(".qr-svg svg"),
      qrViewBox: document.querySelector(".qr-svg svg")?.getAttribute("viewBox") || null,
      qrDots: document.querySelectorAll(".qr-svg path, .qr-svg rect, .qr-svg circle").length,
      emptyState: !!document.querySelector(".qr-svg")?.parentElement?.textContent?.includes("will appear here"),
      errors: window.__pageErrors || [],
      theme: document.documentElement.className,
    }, null, 2)`,
    returnByValue: true,
  });
  console.log(result.result.result.value);
  ws.close();
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
