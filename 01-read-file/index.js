const path = require('path');
const fs = require('fs');
const textPath = path.join(__dirname, 'text.txt');
const read = fs.createReadStream(textPath, 'utf-8');
read.on('data', (chunk) => {process.stdout.write(chunk)});
// fs.createReadStream(textPath, 'utf-8').on('data', (chunk) => {process.stdout.write(chunk)});

