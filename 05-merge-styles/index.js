const path = require('path');
// const { promises: fs} = require("fs");
const fs = require('fs');
const folderPath = path.join(__dirname, 'styles');
const outputStyle = path.join(__dirname + '/project-dist', 'bundle.css');
// const getAllFiles = () =>
//   new Promise((res, rej) => {
//     fs.readdir(folderPath, { withFileTypes: true }, (err, data) => {
//       if (err) {
//         rej(err);
//       }
//       res(data);
//     });
//   });

// const r = async () => {
//   const result = Promise.allSettled([getAllFiles()]);
//   result.then(data => {console.log(data)});
//   console.log(result);
// };
// r()
const getAllStyles = async () =>
  fs.promises
    .readdir(folderPath, { withFileTypes: true }, (err, data) => data)
    .then((data) =>
      data.filter((item) => item.isFile() && path.extname(item.name) === '.css')
    )
    .then((data) => data.map((item) => item.name))
// const writeStyles = async (styles) => {

// }
let b = '';
(async function () {
  const allStyles = await getAllStyles();
  fs.truncate(outputStyle, 0, function(){console.log('Rewrite bundle.css')})
  allStyles.forEach(style => {
    fs.createReadStream(path.join(folderPath, style)).pipe(fs.createWriteStream(outputStyle, { flags: 'a' }));
  });
  // fs.createWriteStream(outputStyle).write
  console.log('Finish writing bundle.css');
})();
// fs.promises.readdir(folderPath, { withFileTypes: true }, (err, data) => data).then(data => console.log(folderPath + data[0].name));
// fs.createReadStream(textPath, 'utf-8').on('data', (chunk) => {process.stdout.write(chunk)});

// const readStyle = fs.createReadStream(path.join(folderPath, style), 'utf8');
//     readStyle.on('readable', function(){
//       var data = readStyle.read();
//       console.log(data);
//     });