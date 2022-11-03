const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(textPath, 'utf8');

readableStream.on('error', function (error) {
  console.log(`Error: ${error.message}`);
})

readableStream.on('data', (textData) => {
  console.log(textData);
})
