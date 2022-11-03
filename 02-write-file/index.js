const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'text.txt');
const { stdin, stdout } = process;

const writableStream = fs.createWriteStream(textPath, 'utf-8');

stdout.write(`\nPsss... Hey dude... Wanna write some lines?\nDon't worry, nobody will know about it.\nJust do it right here:\n\n`);

stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    sayGoodbye()
  }
  writableStream.write(data);
});

process.on('SIGINT', () => {
  sayGoodbye()
});

function sayGoodbye(){
  console.log('\nMmm, nice! I like it.\nI wonder how much this might cost to sell at the black market...\nSee you later!')
  process.exit();
}
