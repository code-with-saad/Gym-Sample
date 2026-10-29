import fs from "node:fs";
import path from "node:path";

const outDir = path.join(process.cwd(), "out");

const filesToDelete = [
  path.join(outDir, "demo.html"),
  path.join(outDir, "demo.txt"),
  path.join(outDir, "demo", "__placeholder.html"),
  path.join(outDir, "demo", "__placeholder.txt"),
];

for (const file of filesToDelete) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Removed ${path.relative(process.cwd(), file)}`);
  }
}

// Remove __next.demo or empty demo internal files in out/demo if needed, but preserve out/demo/<slug>.html
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
console.log("Production export privacy cleanup complete.");
