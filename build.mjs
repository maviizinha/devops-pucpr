import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dist = path.join(root, "dist");

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, "src"), { recursive: true });

for (const file of ["index.html", "styles.css"]) {
  fs.copyFileSync(path.join(root, file), path.join(dist, file));
}

for (const file of ["core.js", "app.js"]) {
  fs.copyFileSync(path.join(root, "src", file), path.join(dist, "src", file));
}

console.log("Build gerado em dist/");
