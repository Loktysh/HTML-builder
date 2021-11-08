const path = require('path');
const fs = require('fs');
// const { stats } = require()
const readline = require('readline');
const templatePath = path.join(__dirname, 'template.html');
const distPath = path.join(__dirname, 'project-dist');
const outputHtml = path.join(distPath, 'index.html');
let templateBuffer = '';
const readTemplate = readline.createInterface({
  input: fs.createReadStream(templatePath),
  console: false,
});
const readComponent = fs.createReadStream(
  path.join(__dirname, '/components/articles.html'),
  'utf-8'
);
// readComponent.on('data', (chunk) => {e = chunk})
// const outputHtml = fs.createWriteStream('GGGGG.txt');
// (async function () {
//   let getArticle = await template();
//   await readTemplate.on('line', function (line) {
//     if (/{{header}}|{{articles}}|{{footer}}/.test(line)) {
//        template();
//       // readComponent.on('finish', (component) => {a.write(component);});
//       // fs.createReadStream(path.join(__dirname, '/components/articles.html'), 'utf-8').pipe(a);
//     } else {
//       templateBuffer += line + '\n';
//       console.log('f');
//       a.write(line + '\n');
//     }
//     console.log(templateBuffer);
//   });
// })();


(async function () {
  const getAllStyles = async () =>
    fs.promises
      .readdir(__dirname + '/styles/', { withFileTypes: true }, (err, data) => data)
      .then((data) =>
        data.filter((item) => item.isFile() && path.extname(item.name) === '.css')
      )
      .then((data) => data.map((item) => item.name));
  const allStyles = await getAllStyles();
  fs.truncate(distPath + '/style.css', 0, function(){console.log('Rewrite bundle.css');});
  allStyles.forEach(style => {
    console.log(style);
    fs.createReadStream(path.join(__dirname + '/styles/', style)).pipe(fs.createWriteStream(distPath + '/style.css', { flags: 'a' }));
  });
  try {
    mkDir = await fs.promises.mkdir(distPath, {recursive: true}, (e) => e).then(e => {
      if (e === undefined) {
        fs.readdir(distPath,{ withFileTypes: true },(err, files) => {
          if (err) throw err;
          for (const file of files) {
            if (!file.isDirectory()) {
              fs.unlink(path.join(distPath, file.name), err => {
                if (err) throw err;
              });
            }
          }
        });
      }
    });
    
    fs.promises
      .mkdir(distPath + '/assets/fonts/', { recursive: true })
      .then(() => {
        fs.readdir(__dirname + '/assets/fonts/', { withFileTypes: true }, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(file => {
              fs.copyFile(__dirname + '/assets/fonts/' + file.name, distPath + '/assets/fonts/' + file.name, (err) => {console.log('Copy Complete' || err);});
            });
          }
        });
      })
      .catch((error) => console.log(error.message));
    fs.promises
      .mkdir(distPath + '/assets/img/', { recursive: true })
      .then(() => {
        fs.readdir(__dirname + '/assets/img/', { withFileTypes: true }, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(file => {
              fs.copyFile(__dirname + '/assets/img/' + file.name, distPath + '/assets/img/' + file.name, (err) => {console.log('Copy Complete' || err);});
            });
          }
        });
      })
      .catch((error) => console.log(error.message));
    fs.promises
      .mkdir(distPath + '/assets/svg/', { recursive: true })
      .then(() => {
        fs.readdir(__dirname + '/assets/svg/', { withFileTypes: true }, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            files.forEach(file => {
              fs.copyFile(__dirname + '/assets/svg/' + file.name, distPath + '/assets/svg/' + file.name, (err) => {console.log('Copy Complete' || err);});
            });
          }
        });
      })
      .catch((error) => console.log(error.message));
    fs.copyFile(
      __dirname + '/template.html',
      outputHtml, (err) => {console.log(err);}
    );
    isAbout = await fs.promises.readdir(path.join(__dirname, '/components/'), (e) => e).then(e => e.length > 3 ? true : false);
    articles = await fs.promises.readFile(path.join(__dirname, '/components/articles.html'),'utf-8', (err, data) => data).then(data => data);
    footer = await fs.promises.readFile(path.join(__dirname, '/components/footer.html'),'utf-8', (err, data) => data).then(data => data);
    header = await fs.promises.readFile(path.join(__dirname, '/components/header.html'),'utf-8', (err, data) => data).then(data => data);
    if (isAbout) {
      about = await fs.promises.readFile(path.join(__dirname, '/components/about.html'),'utf-8', (err, data) => data).then(data => data);
    }
    html = await fs.promises.readFile(outputHtml,'utf-8', (err, data) => data)
      .then(data => data.replaceAll(/{{articles}}/ig, articles))
      .then(data => data.replaceAll(/{{footer}}/ig, footer))
      .then(data => data.replaceAll(/{{header}}/ig, header));
    fs.createWriteStream(path.join(distPath, 'index.html'), 'utf-8').write(html);
    
  
    // console.log(e);
    // fs.writeFile(outputHtml, '222', (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });
    // await readTemplate.on('line', function (line) {
    //   console.log(line)
    //   if (/{{header}}|{{articles}}|{{footer}}/.test(line)) {
    //     readComponent.on('data', (component) => {a.write(component);});
    //     a.write('123123');
    //   } else {
    //     templateBuffer += line + '\n';
    //     console.log('f');
    //     a.write(line + '\n');
    //   }
    //   console.log(templateBuffer);
    // });
  }
  catch (err) { console.error( err ); }
})();