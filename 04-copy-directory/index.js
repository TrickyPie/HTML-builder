const fs = require('fs/promises');
const path = require('path');

const copyWay = path.join(__dirname, 'files-copy');
const initialWay = path.join(__dirname, 'files');

async function copyDir(){
  await fs.rm(copyWay, { recursive: true, force: true });
  await fs.mkdir(copyWay, { recursive: true });

  await fs.readdir(initialWay)
  .then((files) => {
    files.forEach((file => {
      const initial = path.join(initialWay, file);
      const destination = path.join(copyWay, file);
      fs.copyFile(initial, destination);
    }))
  })
}

try {
  copyDir();
  console.log('Folder copy created.');
} catch (error){
  console.log(`Error: ${error}`);
}
