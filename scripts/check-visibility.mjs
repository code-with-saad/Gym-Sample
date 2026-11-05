import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const outDir = path.resolve("out");
const PORT = 4123;
const CDP_PORT = 9222;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function resolveBrowserPath() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const platform = process.platform;
  const candidates = [];

  if (platform === "win32") {
    const localAppData = process.env.LOCALAPPDATA || "";
    const programFiles = process.env.ProgramFiles || "C:\\Program Files";
    const programFilesX86 = process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)";

    candidates.push(
      path.join(programFiles, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(programFilesX86, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(localAppData, "Google", "Chrome", "Application", "chrome.exe"),
      path.join(programFiles, "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(programFilesX86, "Microsoft", "Edge", "Application", "msedge.exe"),
      path.join(localAppData, "Microsoft", "Edge", "Application", "msedge.exe")
    );
  } else if (platform === "darwin") {
    candidates.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
    );
  } else {
    candidates.push(
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium",
      "/usr/bin/chromium-browser",
      "/snap/bin/chromium",
      "/usr/bin/microsoft-edge"
    );
  }

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) {
      return candidate;
    }
  }

  console.error("Error: Chrome, Chromium, or Edge executable not found.");
  console.error("Set the CHROME_PATH environment variable to your browser executable path, for example:");
  if (platform === "win32") {
    console.error('  $env:CHROME_PATH="C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"');
  } else {
    console.error('  export CHROME_PATH="/usr/bin/google-chrome"');
  }
  process.exit(1);
}

function createServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURIComponent(req.url.split("?")[0].split("#")[0]);
      let filePath;

      if (reqPath === "/" || reqPath === "") {
        filePath = path.join(outDir, "index.html");
      } else {
        const clean = reqPath.replace(/^\//, "");
        const htmlFile = path.join(outDir, clean + ".html");
        const indexHtml = path.join(outDir, clean, "index.html");
        const exactFile = path.join(outDir, clean);

        if (fs.existsSync(htmlFile) && fs.statSync(htmlFile).isFile()) {
          filePath = htmlFile;
        } else if (fs.existsSync(indexHtml) && fs.statSync(indexHtml).isFile()) {
          filePath = indexHtml;
        } else if (fs.existsSync(exactFile) && fs.statSync(exactFile).isFile()) {
          filePath = exactFile;
        } else {
          filePath = exactFile;
        }
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
          "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
          "Cache-Control": "no-cache",
        });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found: " + reqPath);
      }
    });

    server.listen(PORT, "127.0.0.1", () => {
      resolve(server);
    });
  });
}

function launchChrome(browserPath) {
  return spawn(browserPath, [
    "--headless=new",
    `--remote-debugging-port=${CDP_PORT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-extensions",
    "--disable-component-update",
    "--disable-sync",
    "--mute-audio",
    "--window-size=1440,900",
  ], { stdio: "ignore" });
}

function createCdpClient(wsUrl) {
  let id = 0;
  const callbacks = new Map();
  const ws = new WebSocket(wsUrl);

  return new Promise((resolve, reject) => {
    ws.onopen = () => {
      resolve({
        send(method, params = {}) {
          return new Promise((res, rej) => {
            const msgId = ++id;
            callbacks.set(msgId, { res, rej });
            ws.send(JSON.stringify({ id: msgId, method, params }));
          });
        },
        close() {
          try { ws.close(); } catch {}
        }
      });
    };
    ws.onerror = reject;
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { res, rej } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) rej(data.error);
        else res(data.result);
      }
    };
  });
}

async function waitForHttp(url, attempts = 30) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Failed to connect to ${url}`);
}

const GENERIC_PAGES = [
  "/",
  "/about",
  "/programs",
  "/gallery",
  "/contact",
];

const SUBPAGES = ["", "/about", "/programs", "/gallery", "/contact"];

function getPagesToTest() {
  const pages = [...GENERIC_PAGES];
  const leadsPath = path.resolve("data/leads.json");

  if (!fs.existsSync(leadsPath)) {
    console.log("data/leads.json not found. Testing generic site only (demo pages skipped).");
    return pages;
  }

  try {
    const raw = fs.readFileSync(leadsPath, "utf8");
    const leads = JSON.parse(raw);
    const selectedLeads = process.env.CHECK_ALL === "1" ? leads : leads.slice(0, 3);

    for (const lead of selectedLeads) {
      if (!lead.slug) continue;
      for (const sub of SUBPAGES) {
        pages.push(`/demo/${lead.slug}${sub}`);
      }
    }
  } catch {
    console.warn("Failed to parse data/leads.json. Testing generic site only.");
  }

  return pages;
}

const VIEWPORTS = [
  { width: 1440, height: 900, name: "1440px" },
  { width: 375, height: 667, name: "375px" },
];

async function main() {
  const browserPath = resolveBrowserPath();
  const pagesToTest = getPagesToTest();

  console.log(`Starting static server on port ${PORT}...`);
  const server = await createServer();

  console.log(`Launching browser on CDP port ${CDP_PORT}...`);
  const chromeProcess = launchChrome(browserPath);

  let hasFailures = false;
  const results = [];

  try {
    await waitForHttp(`http://127.0.0.1:${CDP_PORT}/json/version`);

    const newTargetRes = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new`, { method: "PUT" });
    const targetData = await newTargetRes.json();
    const cdp = await createCdpClient(targetData.webSocketDebuggerUrl);

    await cdp.send("Page.enable");
    await cdp.send("Runtime.enable");

    console.log(`\nRunning automated visibility checks on ${pagesToTest.length} pages x ${VIEWPORTS.length} viewports (${pagesToTest.length * VIEWPORTS.length} runs)...\n`);

    for (const vp of VIEWPORTS) {
      await cdp.send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 1,
        mobile: vp.width < 768,
      });

      for (const pagePath of pagesToTest) {
        const fullUrl = `http://127.0.0.1:${PORT}${pagePath}`;
        
        await cdp.send("Page.navigate", { url: fullUrl });
        await new Promise((r) => setTimeout(r, 600));

        await cdp.send("Runtime.evaluate", {
          awaitPromise: true,
          expression: `(async () => {
            const vh = window.innerHeight;
            const scrollSteps = Math.ceil(document.body.scrollHeight / vh);
            for (let i = 1; i <= scrollSteps; i++) {
              window.scrollTo({ top: i * vh, behavior: 'instant' });
              await new Promise(r => setTimeout(r, 1500));
            }
            window.scrollTo({ top: 0, behavior: 'instant' });
            await new Promise(r => setTimeout(r, 400));
          })()`,
        });

        const evalRes = await cdp.send("Runtime.evaluate", {
          returnByValue: true,
          expression: `(() => {
            const cards = Array.from(document.querySelectorAll('[data-card]'));
            return cards.map(el => {
              const cs = window.getComputedStyle(el);
              const rect = el.getBoundingClientRect();
              const op = parseFloat(cs.opacity);
              return {
                opacity: isNaN(op) ? 1 : op,
                height: rect.height,
                display: cs.display,
                visibility: cs.visibility,
                textSnippet: (el.textContent || '').trim().slice(0, 30)
              };
            });
          })()`,
        });

        const cards = evalRes.result?.value || [];
        const cardCount = cards.length;

        let pass = true;
        let minOpacity = 1.0;
        let minHeight = 999999;
        let reason = "";

        if (cardCount === 0) {
          minOpacity = 1.0;
          minHeight = 0;
        } else {
          for (const c of cards) {
            if (c.opacity < minOpacity) minOpacity = c.opacity;
            if (c.height < minHeight) minHeight = c.height;

            if (c.opacity < 0.99) {
              pass = false;
              reason = `Opacity below 0.99 (${c.opacity})`;
            }
            if (c.height <= 0) {
              pass = false;
              reason = `Height is zero (${c.height}px)`;
            }
          }
        }

        if (!pass) hasFailures = true;

        results.push({
          viewport: vp.name,
          page: pagePath,
          cardCount,
          minOpacity: minOpacity.toFixed(2),
          minHeight: cardCount > 0 ? `${Math.round(minHeight)}px` : "N/A",
          status: pass ? "PASS" : `FAIL (${reason})`,
        });

        process.stdout.write(pass ? "." : "F");
      }
    }

    console.log("\n\n=== CARD VISIBILITY AUDIT RESULTS ===\n");
    console.table(results);

    cdp.close();
  } finally {
    try { chromeProcess.kill(); } catch {}
    try { server.close(); } catch {}
  }

  if (hasFailures) {
    console.error("\nFAIL: One or more cards failed the visibility requirement.\n");
    process.exit(1);
  } else {
    console.log(`\nSUCCESS: All cards across ${pagesToTest.length} pages and ${VIEWPORTS.length} viewports are fully visible (opacity >= 0.99, height > 0).\n`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
