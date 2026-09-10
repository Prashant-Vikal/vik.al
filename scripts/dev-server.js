/* ============================================================================
   Local dev server for vik.al

   The site itself has no build step — it is plain HTML, CSS, and JS that can
   be deployed by copying the folder. This is only here so `npm run dev` gives
   you a local URL with live reload. It uses nothing but the Node standard
   library, so it runs without `npm install`.

     npm run dev            → http://localhost:4173
     PORT=8080 npm run dev  → http://localhost:8080
   ========================================================================= */

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json",
  ".woff2": "font/woff2"
};

/* --- Live reload ---------------------------------------------------------
   Every open page holds a server-sent-events connection. When a source file
   changes we tell them all to reload. The snippet is injected as the HTML is
   served, so it never touches the file on disk or the deployed site. */

const clients = new Set();

const RELOAD_SNIPPET = `
<script>
  (function () {
    var es = new EventSource("/__reload");
    es.onmessage = function () { location.reload(); };
    es.onerror = function () { es.close(); setTimeout(function () { location.reload(); }, 1200); };
  })();
</script>
`;

let reloadTimer = null;
function scheduleReload(file) {
  clearTimeout(reloadTimer);
  reloadTimer = setTimeout(() => {
    console.log(`  ↻ ${file} — reloading ${clients.size} client${clients.size === 1 ? "" : "s"}`);
    for (const res of clients) res.write("data: reload\n\n");
  }, 60);
}

try {
  fs.watch(ROOT, { recursive: true }, (_event, filename) => {
    if (!filename) return;
    if (filename.startsWith("node_modules") || filename.startsWith(".git")) return;
    if (!/\.(html|css|js|svg)$/.test(filename)) return;
    scheduleReload(filename);
  });
} catch (err) {
  console.warn("  ! live reload unavailable:", err.message);
}

/* --- Server -------------------------------------------------------------- */

http
  .createServer((req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname === "/__reload") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      });
      res.write("retry: 1000\n\n");
      clients.add(res);
      req.on("close", () => clients.delete(res));
      return;
    }

    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const file = path.join(ROOT, pathname);

    /* Never serve anything outside the project folder. */
    if (file !== ROOT && !file.startsWith(ROOT + path.sep)) {
      res.writeHead(403, { "Content-Type": "text/plain" });
      return res.end("403 forbidden");
    }

    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("404 not found — " + pathname);
      }

      const ext = path.extname(file);
      const headers = {
        "Content-Type": TYPES[ext] || "application/octet-stream",
        "Cache-Control": "no-store, max-age=0"
      };

      if (ext === ".html") {
        const withReload = buf.toString("utf8").replace("</body>", RELOAD_SNIPPET + "</body>");
        res.writeHead(200, headers);
        return res.end(withReload);
      }

      res.writeHead(200, headers);
      res.end(buf);
    });
  })
  .listen(PORT, () => {
    console.log(`\n  vik.al — dev server`);
    console.log(`  http://localhost:${PORT}`);
    console.log(`  watching for changes. ctrl-c to stop.\n`);
  });
