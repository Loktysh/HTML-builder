const path = require('path');
const { promises: fs } = require('fs');
const folderPath = path.join(__dirname, 'secret-folder');
process.stdout.write(folderPath + '\n');
(async function (path) {
  try {
    const files = await fs.readdir(path, { withFileTypes: true });
    for (const file of files) {
      await fs
        .stat(path + '/' + file.name)
        .then((e) => (e.isFile() ? e : undefined))
        .then((e) => {
          if (e) {
            process.stdout.write(file.name + ' | ' + e.size + '\n');
          }
        });
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
})(folderPath);