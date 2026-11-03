import fs from "fs";
import path from "path";

const outDir = path.resolve("out");
const htmlFiles = [];

function findHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtml(full);
    } else if (entry.name.endsWith(".html")) {
      htmlFiles.push(full);
    }
  }
}
findHtml(outDir);

let errors = 0;
let checkedLinks = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, "utf8");
  // Match standard anchor tags with href
  const regex = /<a\s+[^>]*href="([^"]+)"/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const href = match[1];
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("tel:") ||
      href.startsWith("mailto:") ||
      href.startsWith("#") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }
    checkedLinks++;
    const [pathname] = href.split("#");
    
    let targetPath;
    if (pathname === "" || pathname === "/") {
      targetPath = path.join(outDir, "index.html");
    } else {
      const cleanPath = pathname.replace(/^\//, "");
      targetPath = path.join(outDir, cleanPath + ".html");
      if (!fs.existsSync(targetPath)) {
        targetPath = path.join(outDir, cleanPath, "index.html");
      }
    }

    if (!fs.existsSync(targetPath)) {
      console.error(`404 Anchor in ${path.relative(outDir, file)}: ${href} -> missing ${targetPath}`);
      errors++;
    }
  }
}

// Item 1: Verify all 15 x 5 demo pages exist
const leadsPath = path.resolve("data/leads.json");
if (fs.existsSync(leadsPath)) {
  const leads = JSON.parse(fs.readFileSync(leadsPath, "utf8"));
  const subroutes = ["", "about", "programs", "gallery", "contact"];
  let demoCount = 0;
  for (const lead of leads) {
    for (const sub of subroutes) {
      demoCount++;
      const p1 = sub
        ? path.join(outDir, "demo", lead.slug, sub, "index.html")
        : path.join(outDir, "demo", lead.slug, "index.html");
      const p2 = sub
        ? path.join(outDir, "demo", lead.slug, sub + ".html")
        : path.join(outDir, "demo", lead.slug + ".html");
      if (!fs.existsSync(p1) && !fs.existsSync(p2)) {
        console.error(`Missing expected demo page (${demoCount}/75): /demo/${lead.slug}/${sub}`);
        errors++;
      }
    }
  }
  console.log(`Verified existence of all ${demoCount} demo pages.`);
}

console.log(`Crawl completed: ${checkedLinks} navigation links checked across ${htmlFiles.length} pages. 404 count: ${errors}`);
if (errors > 0) process.exit(1);
