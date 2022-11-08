const fs = require("fs/promises");
const path = require("path");

const destination = path.join(__dirname, "files-copy");
const initial = path.join(__dirname, "files");

async function copyFile(initialWay, destinationWay) {
  const newDir = await fs.mkdir(destinationWay);
  const files = await fs.readdir(initialWay, { withFileTypes: true });
  for (let file of files) {
    const assetsPath = path.join(initialWay, file.name);
    const destPath = path.join(destinationWay, file.name);
    if (file.isDirectory()) {
      await copyFile(assetsPath, destPath);
    } else {
      await fs.copyFile(assetsPath, destPath);
    }
  }
}

(async function init() {
  try {
    await fs.rm(destination, { recursive: true, force: true });
    copyFile(initial, destination);
    console.log("Folder copy created.");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
