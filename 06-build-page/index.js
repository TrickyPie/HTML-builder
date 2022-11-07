const {createWriteStream } = require("fs");
const {readdir, mkdir, copyFile, readFile, writeFile, rm} = require("fs/promises");
const path = require("path");

// Destination variables
const destinationPath = path.join(__dirname, "project-dist");
const destinationCssPath = path.join(destinationPath, "style.css");
const destinationHtmlPath = path.join(destinationPath, "index.html");
const destinationAssetsPath = path.join(destinationPath, "assets");

// Initial path variables
const initialCssPath = path.join(__dirname, "styles");
const initailAssetsPath = path.join(__dirname, "assets");
const initialTemplateHtmlPath = path.join(__dirname, "template.html");
const initialHtmlComponentsPath = path.join(__dirname, "components");

// create HTML file from components and template
async function createHtml() {
  try {
    let templateHtml = await readFile(initialTemplateHtmlPath, 'utf8');

    const htmlComponents = await readdir(initialHtmlComponentsPath, { withFileTypes: true });
    for (file of htmlComponents) {
      if (path.extname(file.name).slice(1) === 'html' && file.isFile()) {
        const componentsPath = path.join(initialHtmlComponentsPath, file.name);
        const componentsContent =  await readFile(componentsPath, 'utf-8')
        const nameWithBrackets = `{{${path.parse(componentsPath).name}}}`
        templateHtml = templateHtml.replace(nameWithBrackets, componentsContent);
      }
    }
    await writeFile(destinationHtmlPath, templateHtml);
  } catch(err) {
    console.log(err.message);
  }
}

// create CSS file from styles directory
async function createCss() {
  try {
    const cssComponents = await readdir(initialCssPath, { withFileTypes: true });
    const writableStream = createWriteStream(destinationCssPath, 'utf-8');

    for (file of cssComponents) {
      if (path.extname(file.name).slice(1) === 'css' && file.isFile()) {
        const cssFilePath = path.join(initialCssPath, file.name);
        const cssContent = await readFile(cssFilePath, 'utf-8');
        writableStream.write(`${cssContent}\n`);
      }
    }
  } catch(err) {
    console.log(err.message);
  }
}

// create directory for assets
async function createAssetsDir() {
  try {
    await rm(destinationAssetsPath, { recursive: true, force: true });
    copyDirectory(initailAssetsPath, destinationAssetsPath)
  } catch(err) {
    console.log(err.message);
  }
}

// copy assets
async function copyDirectory(initialWay, destinationWay){
  const newDir = await mkdir(destinationWay)
  const files = await readdir(initialWay, { withFileTypes: true });
    for (let file of files) {
      const assetsPath = path.join(initialWay, file.name);
      const destPath = path.join(destinationWay, file.name);
      if (file.isDirectory()) {
        await copyDirectory(assetsPath, destPath);
      }
      else {
        await copyFile(assetsPath, destPath);
      }
    }
  };

//create dist directory
(async function createDist() {
  await rm(destinationPath, { recursive: true, force: true });
  await mkdir(destinationPath);
  await createHtml();
  await createCss();
  await createAssetsDir();
})()