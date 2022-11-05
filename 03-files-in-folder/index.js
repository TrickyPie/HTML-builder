const fs = require('fs');
const {readdir} = require('fs/promises');
const path = require('path');

const secretFolderWay = path.join(__dirname, 'secret-folder');

readdir(secretFolderWay, {withFileTypes: true})
  .then(files => {
    for (let file of files){
      if (file.isFile()) {
        const secretFolderChildWay = path.join(secretFolderWay, file.name);
        fs.stat(secretFolderChildWay, (err, stats) => {
          if (err) console.log(err);
          const fileName = path.parse(secretFolderChildWay).name;
          const fileType = path.extname(secretFolderChildWay).slice(1);
          const fileSize = stats.size;
          console.log(`${fileName} - ${fileType} - ${fileSize}b`);
        })
    }
  }
})