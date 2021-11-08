const fs = require('fs');
const path = require('path');
const textPath = path.join(__dirname, 'files');
fs.promises
  .mkdir(__dirname + '/files-copy', { recursive: true })
  .then(() => {
    fs.readdir(textPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.log(err);
      } else {
        files.forEach(file => {
          fs.copyFile(textPath + '/' + file.name, __dirname + '/files-copy/' + file.name, (err) => {console.log('Copy Complete' || err)});
        });
      }
    });
  })
  .catch((error) => console.log(error.message));
        
