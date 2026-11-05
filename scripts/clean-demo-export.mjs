import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");
const leadsPath = path.resolve("data/leads.json");

const filesToDelete = [
  path.join(outDir, "demo.html"),
  path.join(outDir, "demo.txt"),
  path.join(outDir, "demo", "__placeholder.html"),
  path.join(outDir, "demo", "__placeholder.txt"),
  path.join(outDir, "demo", "__placeholder"),
];

for (const file of filesToDelete) {
  if (fs.existsSync(file)) {
    const stat = fs.statSync(file);
    if (stat.isDirectory()) {
      fs.rmSync(file, { recursive: true, force: true });
    } else {
      fs.unlinkSync(file);
    }
  }
}

const demoMetaTree = path.join(outDir, "demo", "__next._tree.txt");
const demoMetaFull = path.join(outDir, "demo", "__next._full.txt");
const demoMetaDir = path.join(outDir, "demo", "__next.demo");

for (const item of [demoMetaTree, demoMetaFull]) {
  if (fs.existsSync(item)) {
    fs.unlinkSync(item);
  }
}
if (fs.existsSync(demoMetaDir)) {
  fs.rmSync(demoMetaDir, { recursive: true, force: true });
}

if (!fs.existsSync(leadsPath)) {
  console.log("data/leads.json not found. Demo pages were skipped.");
  process.exit(0);
}

console.log("Production export privacy cleanup complete.");
