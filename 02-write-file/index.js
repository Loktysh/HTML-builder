const fs = require('fs');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
let writeStream = fs.createWriteStream(__dirname + '/' + 'hello.txt');
const rl = readline.createInterface({ input, output });
rl.question('Введите текст: ', (answer) => {
  if (answer === 'exit') {
    rl.close();
  } else {
    writeStream.write(answer);
  }
});
rl.on('SIGINT', () => {
  process.stdout.write('Работа с вводом завершена.');
  rl.close();
});
